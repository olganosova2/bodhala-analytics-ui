import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {IClient, IDates, IInsight, IAdminInsightType, ISummary, IClientMatter} from './models';
import {HttpService, MessageType, MessagingService, UserService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import * as _moment from 'moment';
import {TopMattersComponent} from '../../firm/top-matters/top-matters.component';
import {MatterInsightsComponent} from './matter-insights/matter-insights.component';
import {CommonService} from '../../shared/services/common.service';

const moment = _moment;

@Component({
  selector: 'bd-admin-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class AdminInsightsComponent implements OnInit, OnDestroy {
  selectedInsight: IInsight;
  pendingRequest: Subscription;
  pendingRequestInsights: Subscription;
  pendingRequestInsightsSummary: Subscription;
  selectedClientId: number = -1;
  clients: Array<IClient>;
  insights: Array<IInsight> = [];
  matterInsights: Array<IInsight> = [];
  insightIx: number = 0;
  summary: ISummary = {} as ISummary;
  dates: IDates = {} as IDates;
  matters: Array<IClientMatter> = [];
  @Input() page: string = 'Insights';
  @Input() selectedClient: IClient;

  @ViewChild(MatterInsightsComponent) matterInsightsComp: MatterInsightsComponent;

  constructor(private httpService: HttpService,
              public messageService: MessagingService,
              public commonServ: CommonService,
              public userService: UserService) {
  }

  ngOnInit() {
    if (this.page === 'Insights') {
      this.commonServ.pageTitle = 'Launchpad Insights';
      this.loadClients();
    }
    if (this.page === 'BM') {
      this.selectedClientId = this.selectedClient.bh_client_id;
      this.getClientInsights(this.selectedClient);
    }
  }

  loadClients(): void {
    this.pendingRequest = this.httpService.makeGetRequest<IClient>('getAnalyticsClients').subscribe(
      (data: any) => {
        this.clients = data.result;
      }
    );
  }

  getClientInsights(client: IClient): void {
    this.insights = [];
    this.insightIx = 0;
    const clientid = client.bh_client_id;
    this.selectedClientId = clientid;
    this.summary = {} as ISummary;
    const params = {clientId: clientid};
    if (this.matterInsightsComp) {
      this.matterInsightsComp.reset();
    }
    this.loadMatters();
    this.pendingRequestInsights = this.httpService.makeGetRequest<IInsight>('getAdminInsights', params).subscribe(
      (data: any) => {
        this.processInsights(data.result);
      }
    );
    const paramsSum = {clientId: clientid, orgId: client.org_id};
    this.pendingRequestInsightsSummary = this.httpService.makeGetRequest<IInsight>('getInsightsSummary', paramsSum).subscribe(
      (data: any) => {
        if (!data.result || !data.result.max_date) { // No data, new client
          return;
        }
        this.formatData(data.result);
      }
    );
  }
  loadMatters(): void {
    const params = { clientId: this.selectedClientId.toString()};
    this.pendingRequest = this.httpService.makeGetRequest<IClientMatter>('getMatterListByClient', params).subscribe(
      (data: any) => {
        this.matters = data.result || [];
      }
    );
  }

  saveInsight(insight: IInsight): void {
    insight.client_id = this.selectedClientId;
    const params = insight;
    this.pendingRequestInsights = this.httpService.makePostRequest('saveClientInsight', params).subscribe(
      (data: any) => {
        this.selectedInsight.id = data.result.id;
        const successMessage = {status: 'SUCCESS', message: 'Insight successfully saved'};
        this.messageService.messages.push({type: MessageType.SUCCESS, message: successMessage});
        window.scroll(0, 0);
      }
    );
  }

  createNewInsight(type: string): IInsight {
    const result = {
      id: null,
      insight_type: type,
      title: type === 'Matter' ? 'Bodhala Insight' : '',
      description: '',
      client_matter_id: null,
      bh_lawfirm_id: null,
      is_enabled: true,
      client_id: this.selectedClientId,
      created_on: null,
      created_by: null,
      modified_on: null,
      modified_by: null,
      deleted_on: null,
      deleted_by: null
    };
    return result;
  }
  selectMatter(insight: IInsight) {
    if (insight) {
      this.selectedInsight = Object.assign({}, insight);
    } else {
      this.selectedInsight = this.createNewInsight(IAdminInsightType.Matter);
      this.selectedInsight.client_matter_id = this.matterInsightsComp.getMatterId();
      this.selectedInsight.bh_lawfirm_id = this.matterInsightsComp.getFirmId();
    }
    this.insights[0] = Object.assign({}, this.selectedInsight);
  }
  processInsights(insights: Array<IInsight>): void {
    this.insights = [];
    this.matterInsights = insights.filter(e => e.insight_type === IAdminInsightType.Matter) || [];
    for (const type of Object.keys(IAdminInsightType)) {
      const found = insights.find(e => e.insight_type === type);
      if (found && type !== IAdminInsightType.Matter) { // for matter insight always create empty insight on load
        this.insights.push(found);
      } else {
        this.insights.push(this.createNewInsight(type));
      }
    }
    this.selectedInsight = this.insights[0];
  }
  changeTab(evt: any): void {
    this.selectedInsight = this.insights[evt.index];
  }

  formatData(data: ISummary): void {
    this.summary = data;
    this.summary.dates = {} as IDates;
    const currentMonthEnd = moment(this.summary.max_date);
    const currentMonthStart = moment(currentMonthEnd).add(-1, 'M');
    const yearAgoMonthEnd = moment(currentMonthEnd).add(-12, 'M');
    const yearAgoMonthStart = moment(yearAgoMonthEnd).add(-1, 'M');
    this.summary.dates.currentMonthEnd = currentMonthEnd.format('MM/YY');
    this.summary.dates.currentMonthStart = currentMonthStart.format('MM/YY');
    this.summary.dates.yearAgoMonthEnd = yearAgoMonthEnd.format('MM/YY');
    this.summary.dates.yearAgoMonthStart = yearAgoMonthStart.format('MM/YY');
    if (this.summary.BPI_current && this.summary.BPI_last_year &&
      this.summary.BPI_current.bodhala_price_index && this.summary.BPI_last_year.bodhala_price_index) {
      this.summary.increaseYoY = (this.summary.BPI_current.bodhala_price_index * 100 / this.summary.BPI_last_year.bodhala_price_index) - 100;
    }   else {
      this.summary.increaseYoY  = null;
    }
    this.summary.invoiceIQ_current_disallowed = this.summary.invoiceIQ_current.find(e => e.report_name.startsWith('Disallowed'));
    this.summary.invoiceIQ_last_year_disallowed = this.summary.invoiceIQ_last_year.find(e => e.report_name.startsWith('Disallowed'));
  }

  ngOnDestroy() {
    if (this.page === 'Insights') {
      this.commonServ.clearTitles();
    }
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestInsights) {
      this.pendingRequestInsights.unsubscribe();
    }
    if (this.pendingRequestInsightsSummary) {
      this.pendingRequestInsightsSummary.unsubscribe();
    }
  }

}
