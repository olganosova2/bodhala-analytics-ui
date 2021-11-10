import {Component, Input, OnInit} from '@angular/core';
import {IQbrRecommendation, IQbrRecommendationSection, IQbrReport, QbrType, QbrRecommendationsType, INotableMetric} from '../qbr-model';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {QbrService} from '../qbr.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-qbr-recommendation',
  templateUrl: './qbr-recommendation.component.html',
  styleUrls: ['../qbr-css.scss', './qbr-recommendation.component.scss']
})
export class QbrRecommendationComponent implements OnInit {
  qbrType: any = QbrType.YoY;
  currentOverviewMetric: any;
  compareOverviewMetric: any;
  practiceAreaSetting: string;
  section: IQbrRecommendationSection;
  pageNumber: number;
  @Input() qbrRecommendationType: QbrRecommendationsType;
  @Input() recommendations: Array<any> = [];
  @Input() qbrData: any;
  @Input() qbr: IQbrReport;
  @Input() zoom: boolean;
  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public qbrService: QbrService,
              public utilService: UtilService) {
    this.practiceAreaSetting = this.commonServ.getClientPASetting();
    this.section = {sectionTitle: '', sectionSubTitle: '', sectionAddInfo: '', recommendations: []};
  }

  ngOnInit(): void {
    this.setUpSection();
  }
  setUpSection(): void {
    switch (this.qbrRecommendationType) {
      case QbrRecommendationsType.Insights:
        this.pageNumber = 7;
        this.section.sectionTitle = 'Insights & opportunities';
        this.section.sectionSubTitle = 'Where you should focus your energy';
        this.section.sectionAddInfo = 'Here’s how your actions impacted your spend and effort over the past quarter.';
        break;
      default:
        break;
    }
    for (const recommendation of this.recommendations) {
      this.section.recommendations.push(this.buildRecommendation(recommendation, this.qbrRecommendationType));
    }
  }
  buildRecommendation(recommendation: any, recType: QbrRecommendationsType): IQbrRecommendation {
    const rec = {} as IQbrRecommendation;
    rec.headline = recommendation.title;
    rec.opportunity = recommendation.opportunity;
    this.formatIconLine(rec, recommendation, recType);
    rec.subhead = recommendation.subtitle;
    rec.notableMetrics = [];
    if (recType === QbrRecommendationsType.Insights) {
      rec.recommendation = recommendation.why_it_matters;
      this.formatLeftRightMetrics(rec, recommendation, recType);
    } else if (recType === QbrRecommendationsType.NextSteps) {
      rec.recommendation = recommendation.recommendation;
      this.formatPotentialSavings(rec, recommendation, recType);
    }
    return rec;
  }
  formatIconLine(rec: IQbrRecommendation, recommendation: any, recType: QbrRecommendationsType): void {
    if (recommendation.practice_area && recommendation.firm_id) {
      rec.icon = 'image_house';
      rec.title = recommendation.firm_name + ' : ' + recommendation.practice_area;
    } else if (recommendation.practice_area) {
      rec.icon = 'image_target';
      rec.title = recommendation.practice_area;
    } else if (recommendation.firm_id) {
      rec.icon = 'image_house';
      rec.title = recommendation.firm_name;
    } else {
      rec.icon = 'image_hammer';
      rec.title = 'General';
    }
  }
  formatLeftRightMetrics(rec: IQbrRecommendation, recommendation: any, recType: QbrRecommendationsType): void {
      if (recommendation.recommendation) {
        const lines = recommendation.recommendation.split('\n');
        if (lines && lines.length >= 2) {
          const sliced = lines.slice(0, 2);
          this.formatNotableMetric(sliced, rec.notableMetrics);
        }
        if (lines && lines.length >= 4) {
          const sliced = lines.slice(2);
          this.formatNotableMetric(sliced, rec.notableMetrics);
        }
      }
  }
  formatNotableMetric(line: Array<any>, metrics: Array<INotableMetric>): void {
    const metric = {} as INotableMetric;
    metric.direction = 1;
    metric.amount = line[0];
    if (line[0] && line[0].length > 1) {
      const sign = line[0].substring(0, 1);
      if (sign === '-') {
        metric.direction = -1;
        metric.amount = line[0].substring(1);
      }
    }
    metric.label = line[1];
    metrics.push(metric);
  }
  formatPotentialSavings(rec: IQbrRecommendation, recommendation: any, recType: QbrRecommendationsType): void {
    const metric = {} as INotableMetric;
    metric.label = 'Potential savings';
    metric.amount = recommendation.potential_savings || 0;
  }

}
