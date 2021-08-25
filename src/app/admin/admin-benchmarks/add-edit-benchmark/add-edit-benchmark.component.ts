import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService, IBenchmarkFirm, IClient} from '../../../shared/services/common.service';
import {BenchmarkService} from '../../../benchmarks/benchmark.service';
import {Subscription} from 'rxjs';
import {IAdminBenchmark, IBenchmarkPracticeArea} from '../admin-benchmarks-model';

@Component({
  selector: 'bd-add-edit-benchmark',
  templateUrl: './add-edit-benchmark.component.html',
  styleUrls: ['./add-edit-benchmark.component.scss']
})
export class AddEditBenchmarkComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  selectedClient: IClient;
  selectedFirm: IBenchmarkFirm;
  benchmarkId: string;
  benchmark: IAdminBenchmark;
  editMode: string;
  firms: Array<any> = [];
  filteredFirms: Array<IBenchmarkFirm> = [];

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public benchmarkServ: BenchmarkService) {
    this.commonServ.pageTitle = 'Admin Benchmarks';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.benchmarkId = params.get('id');
      let pageSubtitle = '';
      if (this.benchmarkId) {
        this.editMode = 'edit';
        this.loadBenchmark();
        pageSubtitle = 'Edit Benchmark';
      } else {
        pageSubtitle = 'Add Benchmark';
        this.editMode = 'add';
        this.createNew();
      }
      setTimeout(() => {
        this.commonServ.pageSubtitle = pageSubtitle;
      });
    });
  }

  loadBenchmark(): void {
    const params = {id: this.benchmarkId};
    this.pendingRequest = this.httpService.makeGetRequest('getAdminBenchmark', params).subscribe(
      (data: any) => {
        this.benchmark = data.result;
      }
    );
  }

  createNew(): void {
    this.benchmark = {
      client: '',
      client_id: null,
      firm_id: null,
      firm: '',
      id: null,
      practice_areas: [],
      year: null
    };
  }

  filterFirms(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredFirms = Object.assign(this.firms.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0));
  }

  selectClient(evt: IClient): void {
    this.selectedClient = Object.assign({}, evt);
    this.benchmark.client_id = this.selectedClient.bh_client_id;
    this.benchmark.client = this.selectedClient.org_name;
    this.getFirms();
  }
   getFirms(): void {
     const params = {to_dict: true, name: ''};
     this.pendingRequest = this.httpService.makeGetRequest('getFirmsForBenchmark', params).subscribe(
       (data: any) => {
         this.firms = data.result || [];
       }
     );
   }
  selectFirm(evt: IBenchmarkFirm): void {
    this.benchmark.firm = evt.name;
    this.benchmark.firm_id = evt.id;
  }

  public displayProperty(value: IBenchmarkFirm): string {
    if (value) {
      return value.name;
    }
  }
  reset(): void {
    this.selectedClient = null;
    this.selectedFirm = null;
    this.firms = [];
    this.filteredFirms = [];
    this.createNew();
  }
  cancel(): void {
    this.router.navigate(['analytics-ui/admin/benchmarks']);
  }
  save(): void {
    for (const pa of this.benchmark.practice_areas) {
      this.savePA(pa);
    }
    this.router.navigate(['analytics-ui/admin/benchmarks']);
  }
  savePA(pa: IBenchmarkPracticeArea): void {
    this.httpService.makePostRequest('updateBenchmarkPA', pa).subscribe(
      (data: any) => {
      }
    );
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
