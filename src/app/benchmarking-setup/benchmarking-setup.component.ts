import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../shared/services/common.service';
import {AgGridService} from 'bodhala-ui-elements';
import {BenchmarkService} from '../benchmarks/benchmark.service';
import {Subscription} from 'rxjs';
import {SelectItem} from 'primeng/api';
import * as _moment from 'moment';
import {IBenchmarkSetup, IBenchmarkSetupFormatted, IBMPracticeArea, IFirmWithGroupId} from './benchmarking-setup-model';
import {IDropDown} from '../shared/models/prime-ng';
import {IBenchmark, IRowBenchmark} from '../benchmarks/model';
import {IBenchmarkPracticeArea} from '../admin/admin-benchmarks/admin-benchmarks-model';

const moment = _moment;

@Component({
  selector: 'bd-benchmarking-setup',
  templateUrl: './benchmarking-setup.component.html',
  styleUrls: ['./benchmarking-setup.component.scss']
})
export class BenchmarkingSetupComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  pendingRequestBM: Subscription;
  pendingRequestPA: Subscription;
  pendingRequestRates: Subscription;
  errorMessage: any;
  showWizard: boolean = false;
  allBenchmarks: Array<IRowBenchmark> = [];
  yearBenchmarks: Array<IBenchmarkSetupFormatted> = [];
  firmId: any;
  firms: Array<IFirmWithGroupId> = [];
  firmOptions: SelectItem[];
  yearOptions: Array<IDropDown> = [];
  numberOfYears: number = 2;
  selectedYear: string;
  practiceAreasList: Array<string> = [];
  availablePAs: SelectItem[] = [];
  selectedPAs: Array<string> = [];
  benchmark: IBenchmarkSetup;
  noResults: boolean;

  @ViewChild('actionButtons') actionButtons: ElementRef<HTMLElement>;

  currentYear: number = _moment().year(); // TODO remove -1 for prod


  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public benchmarkServ: BenchmarkService) {
    this.commonServ.pageTitle = 'Benchmarking Setup';
  }

  ngOnInit(): void {
    this.getYears();
    this.getPracticeAreas();
    this.loadDataForYear();
    this.createNewBenchmark();
  }
  loadDataForYear(): void {
    this.getBenchmarks();
    this.getFirms();
  }

  getYears(): void {
    for (let i = 0; i < this.numberOfYears; i++) {
      const year = this.currentYear - i;
      this.yearOptions.push({label: year.toString(), value: year.toString()});
    }
    this.selectedYear = this.yearOptions[0].value;
  }
  getBenchmarks(): void {
    this.pendingRequestBM = this.httpService.makeGetRequest('getBenchmarks').subscribe(
      (data: any) => {
        this.allBenchmarks = data.result || [];
        this.yearBenchmarks = this.benchmarkServ.formatBenchmarksForSetup(this.allBenchmarks, this.selectedYear);
        this.noResults = this.yearBenchmarks.length === 0;
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  getFirms(): void {
    const params = {year: this.selectedYear, clientId: this.userService.currentUser.client_info_id };
    this.pendingRequest = this.httpService.makeGetRequest('getFirmsWithGroupId', params).subscribe(
      (data: any) => {
        this.firms = data.result || [];
        this.firmOptions = [];
        const key = 'width';
        for (const firm of this.firms) {
          this.firmOptions.push({label: firm.firm_name, value: firm.bh_lawfirm_id});
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  getPracticeAreas(): void {
    this.pendingRequestPA = this.httpService.makeGetRequest('getPracticeAreas').subscribe(
      (data: any) => {
        this.practiceAreasList = data.result || [];
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  changeYear(evt: string): void {
    this.reset();
    this.loadDataForYear();
  }
  selectFirm(evt: any): void {
    this.selectedPAs = [];
    this.benchmark.firm_name = this.getFirmName(this.benchmark.firm_id);
    this.benchmark.tier = this.benchmarkServ.mapTier(this.getGroupId(this.benchmark.firm_id));
    const founds = this.allBenchmarks.filter(e => e.firm_id === this.benchmark.firm_id && e.year.toString() === this.selectedYear) || [];
    if (founds.length > 0) {
      this.benchmark.benchmark_id = founds[0].id;
    }
    this.availablePAs = [];
    for (const pa of this.practiceAreasList) {
      const found = founds.find(f => f.name === pa);
      if (!found) {
        this.availablePAs.push({label: pa, value: pa});
      }
    }
    this.benchmark.practice_areas = [];
  }
  selectPracticeArea(evt: any): void {
    const found = this.benchmark.practice_areas.find(e => e.name === evt.itemValue);
    if (!found) {
      const pa = { name: evt.itemValue, hasRates: false, rates: {} };
      this.benchmark.practice_areas.push(pa);
      this.checkRate(pa);
    } else {
      const ix = this.benchmark.practice_areas.indexOf(found);
      this.benchmark.practice_areas.splice(ix, 1);
    }

  }
  getFirmName(id: number): string {
    const firm = this.firms.find(e => e.bh_lawfirm_id === id);
    return firm ? firm.firm_name : null;
  }
  getGroupId(id: number): number {
    const firm = this.firms.find(e => e.bh_lawfirm_id === id);
    return firm ? firm.group_id : null;
  }
  createNewBenchmark(): void {
    this.benchmark = {
      benchmark_id: null,
      year: this.selectedYear,
      firm_id: null,
      firm_name: null,
      tier: null,
      peers: [],
      practice_areas: []
    };
  }
  checkRate(newPa: IBMPracticeArea): boolean {
    const params = {clientId: this.userService.currentUser.client_info_id, firmId: this.benchmark.firm_id, pa: newPa.name, year: Number(this.selectedYear)};
    this.pendingRequestRates = this.httpService.makeGetRequest('getRatesForCategoryAndLawyer', params).subscribe(
      (data: any) => {
        const records = data.result || [];
        newPa.hasRates = records.length && records.length > 0;
        newPa.rates = Object.assign({}, this.benchmarkServ.processCollectionRates(records));
      },
      err => {
        this.errorMessage = err;
      }
    );
    return true;
  }
  reset(): void {
    this.selectedPAs = [];
    this.createNewBenchmark();
    this.showWizard = false;
  }
  gotoRfp(pa: string): void {
    window.location.href = '/rfp/add-collection';
  }
  navigate(bm: IBenchmarkSetupFormatted): void {
    this.router.navigate(['/analytics-ui/benchmarking/firm', bm.firmId], { queryParams: { year: this.selectedYear }});
  }
  addNew(): void {
    this.showWizard = true;
    setTimeout(() => {
      this.commonServ.scrollToId(this.actionButtons.nativeElement);
    });
  }
  checkIfHasRates(): boolean{
    const found = this.benchmark.practice_areas.find(e => e.hasRates === true) === null || this.benchmark.practice_areas.find(e => e.hasRates === true) === undefined;
    return found ;
  }
  save(): void {
    const pas = Object.assign([], this.benchmark.practice_areas);
    if (this.benchmark.benchmark_id) {
        this.savePAs();
    } else {
      this.saveBenchmarkAndPAs();
    }
  }
  savePAs(): void {
    const practiceAreas = [];
    for (const pa of this.benchmark.practice_areas) {
      if (!pa.hasRates) {
        continue;
      }
      practiceAreas.push(this.packagePA(pa));
    }
    const params = { practice_areas: practiceAreas};
    this.httpService.makePostRequest('saveBenchmarkPAs', params).subscribe(
      (data: any) => {
        this.reset();
        this.getBenchmarks();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  saveBenchmarkAndPAs(): void {
    const practiceAreas = [];
    for (const pa of this.benchmark.practice_areas) {
      if (!pa.hasRates) {
        continue;
      }
      practiceAreas.push(this.packagePA(pa));
    }
    const params = { firm_id: this.benchmark.firm_id, id: null, client_id: this.userService.currentUser.client_info_id, year: this.selectedYear, practice_areas: practiceAreas};
    // this.httpService.makePostRequest('saveBenchmark', params).subscribe(
    //   (data: any) => {
    //     const bm = data.result;
    //     this.reset();
    //     this.getBenchmarks();
    //   },
    //   err => {
    //     this.errorMessage = err;
    //   }
    // );
  }
  packagePA(pa: IBMPracticeArea): any {
    return { benchmark_id: this.benchmark.benchmark_id, id: null, name: pa.name, peers: [], tier: '$$$', rates: this.benchmarkServ.createBenchmarkRates(pa) };
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestBM) {
      this.pendingRequestBM.unsubscribe();
    }
    if (this.pendingRequestPA) {
      this.pendingRequestPA.unsubscribe();
    }
    if (this.pendingRequestRates) {
      this.pendingRequestRates.unsubscribe();
    }
  }

}
