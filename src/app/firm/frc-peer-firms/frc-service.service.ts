import {Injectable} from '@angular/core';
import {FiltersService} from '../../shared/services/filters.service';
import {IMatterExecSummary, MetricCardType, MetricGrade} from '../../matters/matter-executive-summary/model';
import {CommonService} from '../../shared/services/common.service';
import {HttpService, UtilService, UserService} from 'bodhala-ui-common';
import {forkJoin} from 'rxjs';
import {IUiAnnotation} from '../../shared/components/annotations/model';
import * as config from '../../shared/services/config';
import * as _moment from 'moment';

const moment = _moment;

export const MOCK_PEER_FIRMS_ALL = [4, 724, 8, 23, 59, 92, 20, 292, 63, 924];
export const MOCK_PEER_FIRMS = [4, 8, 23, 59, 92, 20, 292, 63, 924];
export const CLIENT_CONFIG_KEY_METRICS_NAME = 'frc.key-metrics';
export const barTkPercentOptions = {
  chart: {
    type: 'bar'
  },
  credits: {
    enabled: false
  },
  title: {
    text: null
  },
  xAxis: {
    categories: ['Firm', 'Comparison Firms'],
    labels: {
      style: {
        fontSize: 16,
      }
    }
  },
  yAxis: {
    min: 0,
    max: 100,
    tickInterval: 25,
    title: {
      text: null
    },
    labels: {
      format: '{value}%',
      style: {
        fontSize: 16
      }
    }
  },
  legend: {
    reversed: true,
    align: 'right',
    verticalAlign: 'top',
    x: 0,
    y: 0
  },
  plotOptions: {
    series: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
        // format: '{point.y:,.0f} %',
        formatter() {
          return (this.y !== 0) ? Math.round(this.y) + '%' : '';
        },
        style: {
          textOutline: 'none'
        }
      },
      pointWidth: 40,
      groupPadding: 0.1
    }
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.y:,.0f}%'
  },
  series: [
    {
      name: 'Legal Assistant',
      color: '#FF8B4A',
      dataLabels: {
        color: 'black'
      },
      data: []
    },
    {
      name: 'Paralegal',
      color: '#00D1FF',
      dataLabels: {
        color: 'black'
      },
      data: []
    }, {
      name: 'Associate',
      color: '#FFC907',
      data: []
    }, {
      name: 'Partner',
      color: '#000000',
      data: []
    }]
};

export enum TrendsChartMode  {
  YoY = 'YoY',
  QoQ = 'QoQ'
}
export enum TrendChart {
  TOTAL_SPEND = 'TOTAL_SPEND',
  MATTER_COST = 'MATTER_COST',
  PARTNER_HOURS = 'PARTNER_HOURS',
  ASSOCIATE_HOURS = 'ASSOCIATE_HOURS',
  PARALEGAL_HOURS = 'PARALEGAL_HOURS',
  AVG_MATTER_DURATION = 'AVG_MATTER_DURATION',
  BLENDED_RATE = 'BLENDED_RATE',
  PARTNER_RATE = 'PARTNER_RATE',
  ASSOCIATE_RATE = 'ASSOCIATE_RATE',
  BLOCK_BILLING = 'BLOCK_BILLING'
}
export interface IComparisonFirm {
  id: number;
  name: string;
}

export interface IPeerFirms {
  bh_lawfirm_id: number;
  firm_name: string;
  total_billed: number;
  total_expenses: number;
  total_hours_billed: number;
  total_block_billed: number;
  total_matters: number;
  partner_billed: number;
  partner_writeoff: number;
  associate_billed: number;
  associate_writeoff: number;
  partner_hours: number;
  associate_hours: number;
  partner_writeoff_hours: number;
  associate_writeoff_hours: number;
  paralegal_hours: number;
  legal_assistant_hours: number;
  paralegal_writeoff_hours: number;
  legal_assistant_writeoff_hours: number;
  paralegal_billed: number;
  legal_assistant_billed: number;
  paralegal_writeoff: number;
  legal_assistant_writeoff: number;
  avg_partner_rate: number;
  avg_associate_rate: number;
  avg_legal_assistant_rate: number;
  avg_paralegal_rate: number;
  avg_matter_cost: number;
  avg_matter_cost_including_expenses: number;
  avg_matter_hours: number;
  percent_total_block_billed?: number;
  total_tk_hours?: number;
  blended_rate?: number;
  percent_partner_hours?: number;
  percent_associate_hours?: number;
  percent_legal_assistant_hours?: number;
  percent_paralegal_hours?: number;
  minority_hours?: number;
  female_hours?: number;
  percent_minority_hours?: number;
  percent_female_hours?: number;
  score?: number;
  assessment?: string;
  total_billed_perc?: number;
  total_hours_perc?: number;
  cluster?: number;
}
export interface IYearQuarterSpend {
  year: number;
  partner_rate: number;
  associate_rate: number;
  non_lawyer_rate: number;
  paralegal_rate: number;
  total_billed: number;
  total_partner_billed: number;
  total_associate_billed: number;
  total_partner_writeoff: number;
  total_associate_writeoff: number;
  avg_matter_cost: number;
  total_hours: number;
  partner_hours: number;
  associate_hours: number;
  paralegal_hours: number;
  partner_writeoff_hours: number;
  associate_writeoff_hours: number;
  total_matters: number;
  avg_duration_days: number;
  total_block_billed: number;
  block_billed_percent: number;
}

export enum MetricType {
  AveragePartnerRate = 'avg_partner_rate',
  AverageAssociateRate = 'avg_associate_rate',
  BlendedRate = 'blended_rate',
  TotalSpend = 'total_billed',
  TotalMatters = 'total_matters',
  TotalHours = 'total_hours_billed',
  AvgerageMatterCost = 'avg_matter_cost',
  AvgerageMatterHours = 'avg_matter_hours',
  PartnerHours = 'percent_partner_hours',
  AssociateHours = 'percent_associate_hours',
  ParalegalHours = 'percent_paralegal_hours',
  BlockBilling = 'percent_total_block_billed',
  AverageParalegalRate = 'avg_paralegal_rate',
  AverageLegalAssistant = 'avg_legal_assistant_rate',
  FemaleHours = 'percent_female_hours',
  MinorityHours = 'percent_minority_hours',
  Score = 'score'
}

export enum MetricTypeComparison {
  TotalSpend = 'total_billed',
  TotalMatters = 'total_matters',
  TotalHours = 'total_hours_billed',
  BlendedRate = 'blended_rate',
  AveragePartnerRate = 'avg_partner_rate',
  AverageAssociateRate = 'avg_associate_rate',
  PartnerHours = 'percent_partner_hours',
  AssociateHours = 'percent_associate_hours',
  ParalegalHours = 'percent_paralegal_hours',
  AvgerageMatterCost = 'avg_matter_cost',
  AvgerageMatterHours = 'avg_matter_hours',
  BlockBilling = 'percent_total_block_billed',
  AverageLegalAssistant = 'avg_legal_assistant_rate',
  AverageParalegalRate = 'avg_paralegal_rate',
  FemaleHours = 'percent_female_hours',
  MinorityHours = 'percent_minority_hours'
}
export enum MetricTypeTrends {
  TotalSpend = 'total_billed',
  TotalMatters = 'total_matters',
  TotalHours = 'total_hours_billed',
  AvgerageMatterCost = 'avg_matter_cost',
  AvgerageMatterHours = 'avg_matter_hours',
  BlendedRate = 'blended_rate',
  AveragePartnerRate = 'avg_partner_rate',
  AverageAssociateRate = 'avg_associate_rate',
  PartnerHours = 'percent_partner_hours',
  AssociateHours = 'percent_associate_hours',
  ParalegalHours = 'percent_paralegal_hours',
  BlockBilling = 'percent_total_block_billed',
  AverageLegalAssistant = 'avg_legal_assistant_rate',
  AverageParalegalRate = 'avg_paralegal_rate',
  FemaleHours = 'percent_female_hours',
  MinorityHours = 'percent_minority_hours'
}

export interface IMetricDisplayData {
  metricType?: MetricType;
  icon?: string;
  fieldName?: string;
  label?: string;
  actual?: number;
  firms?: number;
  increase?: number;
  direction?: number;
  grade?: MetricGrade;
  format?: string;
  keyMetric?: boolean;
  lastCell?: boolean;
  selected?: boolean;
}

export interface IFRCTimekeeper {
  tk_id: string;
  first_name: string;
  last_name: string;
  tk_level: string;
  bh_classification: string;
  total_billed: number;
  total_expenses: number;
  total_hours_billed: number;
  avg_rate: number;
  bodhala_classification?: string;
}
export interface IFRCSmartPAs {
  client_matter_type: string;
  total: number;
  expenses: number;
  total_hours: number;
  firm_total: number;
  firm_expenses: number;
  firm_hours: number;
  percent_of_hours?: number;
  percent_of_spend?: number;
  percent_of_firm_hours?: number;
  percent_of_firm_spend?: number;
}
export interface IYearlyFirmTimekeeper {
  year: number;
  lawfirm_id: number;
  firm_name: string;
  firm_rank: number;
  target_rate_pct: number;
  bh_classification: string;
  timekeeper_id: string;
  timekeeper: string;
  total_hours: number;
  total_billed: number;
  total_hours_for_rates: number;
  total_billed_for_rates: number;
  total_adjustments: number;
  effective_rate: number;
  effective_rate_mode: number;
  unit_cost_mode: number;
  effective_rate_adjusted?: number;
}
@Injectable({
  providedIn: 'root'
})
export class FrcServiceService {
  customReport: boolean;
  hasDiversity: boolean = false;

  constructor(public filtersService: FiltersService,
              public utilService: UtilService,
              public userService: UserService,
              public httpService: HttpService,
              public commonServ: CommonService) {
    if (this.userService.config !== undefined) {
      if ('custom.report.card.metic' in this.userService.config) {
        this.customReport = true;
      }
    }
    this.hasDiversity =  userService.hasEntitlement('data.analytics.diversity');
  }

  calculateSingleFirmData(summaryData: IPeerFirms): void {
    const includeExpenses = this.filtersService.includeExpenses;
    const billedByLawyers = summaryData.partner_billed + summaryData.associate_billed;
    summaryData.percent_total_block_billed = summaryData.total_block_billed / (billedByLawyers || 1) * 100;
    const lawyerBilled = (summaryData.partner_billed - summaryData.partner_writeoff) + (summaryData.associate_billed - summaryData.associate_writeoff);
    const lawyerHours = (summaryData.partner_hours) + (summaryData.associate_hours);
    summaryData.blended_rate = lawyerBilled / (lawyerHours || 1);
    summaryData.percent_partner_hours = summaryData.partner_hours / (summaryData.total_hours_billed || 1) * 100;
    summaryData.percent_associate_hours = summaryData.associate_hours / (summaryData.total_hours_billed || 1) * 100;
    summaryData.percent_legal_assistant_hours = summaryData.legal_assistant_hours / (summaryData.total_hours_billed || 1) * 100;
    summaryData.percent_paralegal_hours = summaryData.paralegal_hours / (summaryData.total_hours_billed || 1) * 100;

    summaryData.percent_minority_hours = Math.round(summaryData.minority_hours / (summaryData.total_hours_billed || 1) * 100);
    summaryData.percent_female_hours = Math.round(summaryData.female_hours / (summaryData.total_hours_billed || 1) * 100);
    if (includeExpenses) {
      summaryData.avg_matter_cost = summaryData.avg_matter_cost_including_expenses;
    }
  }
  processExpenses(firmsRecords: Array<IPeerFirms>): void {
    const includeExpenses = this.filtersService.includeExpenses;
    for (const summaryData of firmsRecords) {
      summaryData.total_tk_hours = (summaryData.partner_hours - summaryData.partner_writeoff_hours) + (summaryData.associate_hours - summaryData.associate_writeoff_hours) +
        (summaryData.legal_assistant_hours - summaryData.legal_assistant_writeoff_hours) + (summaryData.paralegal_hours - summaryData.paralegal_writeoff_hours);
      summaryData.total_billed = includeExpenses ? summaryData.total_billed + summaryData.total_expenses : summaryData.total_billed;
      summaryData.partner_hours = summaryData.partner_hours - summaryData.partner_writeoff_hours;
      summaryData.associate_hours = summaryData.associate_hours - summaryData.associate_writeoff_hours;
      summaryData.paralegal_hours = summaryData.paralegal_hours - summaryData.paralegal_writeoff_hours;
    }
  }

  createEmptySingleFirmData(): IPeerFirms {
    return {
      bh_lawfirm_id: 0,
      firm_name: '',
      total_billed: 0,
      total_expenses: 0,
      total_hours_billed: 0,
      total_block_billed: 0,
      total_matters: 0,
      partner_billed: 0,
      partner_writeoff: 0,
      associate_billed: 0,
      associate_writeoff: 0,
      partner_hours: 0,
      associate_hours: 0,
      partner_writeoff_hours: 0,
      associate_writeoff_hours: 0,
      paralegal_hours: 0,
      legal_assistant_hours: 0,
      paralegal_writeoff_hours: 0,
      legal_assistant_writeoff_hours: 0,
      paralegal_billed: 0,
      legal_assistant_billed: 0,
      paralegal_writeoff: 0,
      legal_assistant_writeoff: 0,
      avg_partner_rate: 0,
      avg_associate_rate: 0,
      avg_legal_assistant_rate: 0,
      avg_paralegal_rate: 0,
      avg_matter_cost: 0,
      avg_matter_cost_including_expenses: 0,
      avg_matter_hours: 0,
      percent_total_block_billed: 0,
      total_tk_hours: 0,
      blended_rate: 0,
      percent_partner_hours: 0,
      percent_associate_hours: 0,
      percent_legal_assistant_hours: 0,
      percent_paralegal_hours: 0,
      minority_hours: 0,
      female_hours: 0,
      percent_minority_hours: 0,
      percent_female_hours: 0,
      score: 0,
      assessment: ''
    };
  }

  calculatePeersData(firmsRecords: Array<any>): IPeerFirms {
    const firmData = this.createEmptySingleFirmData();
    const firmsCount = firmsRecords.length;
    if (!firmsCount) {
      return firmData;
    }
    let noTKpercentCount = 0;
    for (const rec of firmsRecords) {
      this.calculateSingleFirmData(rec);
      if (rec.percent_associate_hours === 0 && rec.percent_partner_hours === 0 && rec.percent_paralegal_hours === 0) {
        noTKpercentCount++;
      }
    }
    const firmTKCount = firmsCount - noTKpercentCount;
    firmData.firm_name = 'Comparison Firms';
    const reducerTotalBilled = (previousValue, currentValue) => previousValue.total_billed + currentValue.total_billed;
    firmData.total_billed = firmsRecords.reduce((a, b) => ({total_billed: a.total_billed + b.total_billed})).total_billed / firmsCount;
    firmData.partner_billed = firmsRecords.reduce((a, b) => ({partner_billed: a.partner_billed + b.partner_billed})).partner_billed / firmsCount;
    firmData.associate_billed = firmsRecords.reduce((a, b) => ({associate_billed: a.associate_billed + b.associate_billed})).associate_billed / firmsCount;
    firmData.paralegal_billed = firmsRecords.reduce((a, b) => ({paralegal_billed: a.paralegal_billed + b.paralegal_billed})).paralegal_billed / firmsCount;
    firmData.legal_assistant_billed = firmsRecords.reduce((a, b) => ({legal_assistant_billed: a.legal_assistant_billed + b.legal_assistant_billed})).legal_assistant_billed / firmsCount;
    firmData.avg_associate_rate = firmsRecords.reduce((a, b) => ({avg_associate_rate: a.avg_associate_rate + b.avg_associate_rate})).avg_associate_rate / firmsCount;
    firmData.avg_partner_rate = firmsRecords.reduce((a, b) => ({avg_partner_rate: a.avg_partner_rate + b.avg_partner_rate})).avg_partner_rate / firmsCount;
    firmData.avg_paralegal_rate = firmsRecords.reduce((a, b) => ({avg_paralegal_rate: a.avg_paralegal_rate + b.avg_paralegal_rate})).avg_paralegal_rate / firmsCount;
    firmData.avg_legal_assistant_rate = firmsRecords.reduce((a, b) => ({avg_legal_assistant_rate: a.avg_legal_assistant_rate + b.avg_legal_assistant_rate})).avg_legal_assistant_rate / firmsCount;
    firmData.blended_rate = firmsRecords.reduce((a, b) => ({blended_rate: a.blended_rate + b.blended_rate})).blended_rate / firmsCount;
    firmData.total_hours_billed = firmsRecords.reduce((a, b) => ({total_hours_billed: a.total_hours_billed + b.total_hours_billed})).total_hours_billed / firmsCount;
    firmData.partner_hours = firmsRecords.reduce((a, b) => ({partner_hours: a.partner_hours + b.partner_hours})).partner_hours / firmsCount;
    firmData.associate_hours = firmsRecords.reduce((a, b) => ({associate_hours: a.associate_hours + b.associate_hours})).associate_hours / firmsCount;
    firmData.paralegal_hours = firmsRecords.reduce((a, b) => ({paralegal_hours: a.paralegal_hours + b.paralegal_hours})).paralegal_hours / firmsCount;
    firmData.legal_assistant_hours = firmsRecords.reduce((a, b) => ({legal_assistant_hours: a.legal_assistant_hours + b.legal_assistant_hours})).legal_assistant_hours / firmsCount;
    firmData.partner_writeoff_hours = firmsRecords.reduce((a, b) => ({partner_writeoff_hours: a.partner_writeoff_hours + b.partner_writeoff_hours})).partner_writeoff_hours / firmsCount;
    firmData.associate_writeoff_hours = firmsRecords.reduce((a, b) => ({associate_writeoff_hours: a.associate_writeoff_hours + b.associate_writeoff_hours})).associate_writeoff_hours / firmsCount;
    firmData.paralegal_writeoff_hours = firmsRecords.reduce((a, b) => ({paralegal_writeoff_hours: a.paralegal_writeoff_hours + b.paralegal_writeoff_hours})).paralegal_writeoff_hours / firmsCount;
    firmData.legal_assistant_writeoff_hours = firmsRecords.reduce((a, b) => ({legal_assistant_writeoff_hours: a.legal_assistant_writeoff_hours + b.legal_assistant_writeoff_hours})).legal_assistant_writeoff_hours / firmsCount;
    // firmData.percent_partner_hours = Math.round(firmsRecords.reduce((a, b) => ({percent_partner_hours: a.percent_partner_hours + b.percent_partner_hours})).percent_partner_hours / firmsCount);
    // firmData.percent_associate_hours = Math.round(firmsRecords.reduce((a, b) => ({percent_associate_hours: a.percent_associate_hours + b.percent_associate_hours})).percent_associate_hours / firmsCount);
    // firmData.percent_paralegal_hours = Math.round(firmsRecords.reduce((a, b) => ({percent_paralegal_hours: a.percent_paralegal_hours + b.percent_paralegal_hours})).percent_paralegal_hours / firmsCount);
    // firmData.percent_legal_assistant_hours = Math.round(firmsRecords.reduce((a, b) => ({percent_legal_assistant_hours: a.percent_legal_assistant_hours + b.percent_legal_assistant_hours})).percent_legal_assistant_hours / firmsCount);

    firmData.percent_partner_hours = firmsRecords.reduce((a, b) => ({percent_partner_hours: a.percent_partner_hours + b.percent_partner_hours})).percent_partner_hours / firmTKCount;
    firmData.percent_associate_hours = firmsRecords.reduce((a, b) => ({percent_associate_hours: a.percent_associate_hours + b.percent_associate_hours})).percent_associate_hours / firmTKCount;
    firmData.percent_paralegal_hours = firmsRecords.reduce((a, b) => ({percent_paralegal_hours: a.percent_paralegal_hours + b.percent_paralegal_hours})).percent_paralegal_hours / firmTKCount;
    firmData.percent_legal_assistant_hours = firmsRecords.reduce((a, b) => ({percent_legal_assistant_hours: a.percent_legal_assistant_hours + b.percent_legal_assistant_hours})).percent_legal_assistant_hours / firmTKCount;


    firmData.total_matters = firmsRecords.reduce((a, b) => ({total_matters: a.total_matters + b.total_matters})).total_matters / firmsCount;
    firmData.avg_matter_cost = firmsRecords.reduce((a, b) => ({avg_matter_cost: a.avg_matter_cost + b.avg_matter_cost})).avg_matter_cost / firmsCount;
    firmData.avg_matter_hours = firmsRecords.reduce((a, b) => ({avg_matter_hours: a.avg_matter_hours + b.avg_matter_hours})).avg_matter_hours / firmsCount;
    firmData.avg_matter_hours = firmsRecords.reduce((a, b) => ({avg_matter_hours: a.avg_matter_hours + b.avg_matter_hours})).avg_matter_hours / firmsCount;
    firmData.percent_total_block_billed = firmsRecords.reduce((a, b) => ({percent_total_block_billed: a.percent_total_block_billed + b.percent_total_block_billed})).percent_total_block_billed / firmsCount;
    firmData.minority_hours = firmsRecords.reduce((a, b) => ({minority_hours: a.minority_hours + b.minority_hours})).minority_hours / firmsCount;
    firmData.female_hours = firmsRecords.reduce((a, b) => ({female_hours: a.female_hours + b.female_hours})).female_hours / firmsCount;
    firmData.percent_minority_hours = Math.round(firmsRecords.reduce((a, b) => ({percent_minority_hours: a.percent_minority_hours + b.percent_minority_hours})).percent_minority_hours / firmsCount);
    firmData.percent_female_hours = Math.round(firmsRecords.reduce((a, b) => ({percent_female_hours: a.percent_female_hours + b.percent_female_hours})).percent_female_hours / firmsCount);
    firmData.score = Math.round(firmsRecords.reduce((a, b) => ({score: a.score + b.score})).score / firmsCount);
    const totalTkHours = (firmData.partner_hours - firmData.partner_writeoff_hours) + (firmData.associate_hours - firmData.associate_writeoff_hours) +
     (firmData.legal_assistant_hours - firmData.legal_assistant_writeoff_hours) + (firmData.paralegal_hours - firmData.paralegal_writeoff_hours);

    return firmData;
  }

  formatFRCComparisonFirmsData(records: Array<IPeerFirms>): any {
    const result = [];
    const originals = Object.assign([], records);
    for (const rec of records) {
      const currentFirm = {bh_lawfirm_id: rec.bh_lawfirm_id, firm_name: rec.firm_name, cluster: rec.cluster, frcMetrics: []};
      const summaryData = originals.find(e => e.bh_lawfirm_id === rec.bh_lawfirm_id);
      this.calculateSingleFirmData(summaryData);
      const filtered = Object.assign([], originals); //  originals.filter(e => e.bh_lawfirm_id !== rec.bh_lawfirm_id) || [];
      const internalData = this.calculatePeersData(filtered);
      currentFirm.frcMetrics = this.buildMetrics(summaryData, internalData, filtered);
      result.push(currentFirm);
    }
    return result;
  }

  buildMetrics(summaryData: IPeerFirms, firmData: IPeerFirms, firmsRecords: Array<IPeerFirms>): Array<IMetricDisplayData> {
    const result = [];
    let ix = 0;
    for (const metricName of Object.keys(MetricType)) {
      if (typeof MetricType[metricName] !== 'string') {
        continue;
      }
      if (!this.customReport && metricName === 'Score') {
        continue;
      }
      if (!this.hasDiversity && (metricName === 'FemaleHours' || metricName === 'MinorityHours')) {
        continue;
      }
      const metric = {
        metricType: MetricType[metricName],
        fieldName: MetricType[metricName],
        actual: summaryData[MetricType[metricName]],
        firms: firmData[MetricType[metricName]],
        increase: firmData[MetricType[metricName]] ? ((summaryData[MetricType[metricName]] / firmData[MetricType[metricName]]) - 1) * 100 : 0,
        direction: firmData[MetricType[metricName]] > summaryData[MetricType[metricName]] ? -1 : 1,
        keyMetric: false
      };
      if (metricName === 'BlockBilling' || metricName === 'PartnerHours' || metricName === 'AssociateHours' || metricName === 'ParalegalHours' ||
        metricName === 'FemaleHours' || metricName === 'MinorityHours') {
        metric.increase = summaryData[MetricType[metricName]] - firmData[MetricType[metricName]];
      }
      metric.increase = Math.abs(metric.increase);
      if (ix > 2) {
        metric.keyMetric = true;
      }
      this.getMetricIconAndLabel(metric);
      if (firmsRecords.length === 0) {
        this.getTrendsGrade(metric, summaryData);
      }else{
        this.getGrade(metric, summaryData, firmsRecords);
      }

      result.push(metric);
      ix += 1;
    }
    return result;
  }

  getGrade(tk: IMetricDisplayData, summaryData: IPeerFirms, marketRecords: Array<IPeerFirms>): void {
    const prop = tk.fieldName;
    tk.grade = MetricGrade.NODATA;
    if (marketRecords.length === 0) {
      return;
    }
    if (prop === 'total_billed' || prop === 'total_hours_billed' || prop === 'total_matters' || prop === 'score') {
      return;
    }
    const actual = summaryData[prop];
    const compareRecords = Object.assign([], marketRecords.sort(this.utilService.dynamicSort(prop)));

    const values = compareRecords.map(e => e[prop]);
    const stdRec = this.commonServ.getStandardDeviation(values);
    const avgRec = values.reduce((a, b) => a + b) / (values.length || 1);
    const zRec = (actual - avgRec) / (stdRec || 1);
    if (prop === 'percent_minority_hours' || prop === 'percent_female_hours') {
      if (zRec <= -0.5) {
        tk.grade = MetricGrade.POOR;
      } else if (zRec > -0.5 && zRec < 0.5) {
        tk.grade = MetricGrade.FAIR;
      } else {
        tk.grade = MetricGrade.GOOD;
      }
    } else if (prop !== 'percent_partner_hours' && prop !== 'percent_associate_hours' && prop !== 'percent_paralegal_hours') {
      if (zRec <= -0.5) {
        tk.grade = MetricGrade.GOOD;
      } else if (zRec > -0.5 && zRec < 0.5) {
        tk.grade = MetricGrade.FAIR;
      } else {
        tk.grade = MetricGrade.POOR;
      }
    } else {
      if (zRec >= -0.5 && zRec <= 0.5) {
        tk.grade = MetricGrade.GOOD;
      } else if ((zRec >= -1 && zRec < -0.5) || (zRec > 0.5 && zRec <= 1)) {
        tk.grade = MetricGrade.FAIR;
      } else {
        tk.grade = MetricGrade.POOR;
      }
    }
  }
  getTrendsGrade(tk: IMetricDisplayData, summaryData: IPeerFirms): void {
    const prop = tk.fieldName;
    tk.grade = MetricGrade.NODATA;
    if (prop === 'total_billed' || prop === 'total_hours_billed' || prop === 'total_matters' || prop === 'avg_matter_cost' || prop === 'avg_matter_hours' ||
      prop === 'percent_partner_hours' || prop === 'percent_associate_hours' || prop === 'percent_paralegal_hours') {
      return;
    }
    if (prop === 'percent_female_hours' || prop === 'percent_minority_hours') {
      const delta = (tk.increase / (tk.firms || 1)) * 100;
      if (tk.direction === 1) {
        tk.grade = MetricGrade.GOOD;
        return;
      }
      if (tk.direction === -1 && Math.abs(delta) <= 10) {
        tk.grade = MetricGrade.FAIR;
        return;
      }
      if (tk.direction === -1 && Math.abs(delta) > 10) {
        tk.grade = MetricGrade.POOR;
        return;
      }
    }
    if (tk.direction === -1) {
      tk.grade = MetricGrade.GOOD;
      return;
    }
    let increase =  tk.increase;
    if (prop === 'percent_total_block_billed') {
      increase = (tk.increase / (tk.firms || 1)) * 100;
    }
    if (tk.direction === 1 && Math.abs(increase) <= 10) {
      tk.grade = MetricGrade.FAIR;
      return;
    }
    if (tk.direction === 1 && Math.abs(increase) > 10) {
      tk.grade = MetricGrade.POOR;
      return;
    }
  }

  getMetricIconAndLabel(metric: IMetricDisplayData): void {
    metric.format = null;
    metric.icon = 'bills.svg';
    switch (metric.fieldName) {
      case 'avg_partner_rate':
        metric.label = 'Average Partner Rate';
        metric.format = 'dollar';
        break;
      case 'avg_associate_rate':
        metric.label = 'Average Associate Rate';
        metric.format = 'dollar';
        break;
      case 'total_billed':
        metric.label = 'Overall Spend';
        metric.format = 'dollar';
        break;
      case 'total_matters':
        metric.icon = 'avg_matter_cost.svg';
        metric.label = 'Total Matters';
        break;
      case 'total_hours_billed':
        metric.icon = 'clock-sm.png';
        metric.label = 'Total Hours';
        break;
      case 'avg_matter_cost':
        metric.label = 'Average Matter Cost';
        metric.format = 'dollar';
        break;
      case 'avg_matter_hours':
        metric.label = 'Avg. Matter Hours';
        metric.icon = 'clock-sm.png';
        break;
      case 'blended_rate':
        metric.label = 'Average Blended Rate';
        metric.format = 'dollar';
        break;
      case 'percent_total_block_billed':
        metric.label = 'Block Billing';
        metric.format = 'percent';
        break;
      case 'avg_legal_assistant_rate':
        metric.label = 'Avg. Legal Assistant Rate';
        metric.format = 'dollar';
        break;
      case 'avg_paralegal_rate':
        metric.label = 'Avg. Paralegal Rate';
        metric.format = 'dollar';
        break;
      case 'partner_hours':
        metric.label = 'Partner Hours Worked';
        metric.icon = 'clock-sm.png';
        break;
      case 'associate_hours':
        metric.label = 'Associate Hours Worked';
        metric.icon = 'clock-sm.png';
        break;
      case 'paralegal_hours':
        metric.label = 'Paralegal Hours Worked';
        metric.icon = 'clock-sm.png';
        break;
      case 'percent_partner_hours':
        metric.label = 'Partner Hours Worked';
        metric.icon = 'clock-sm.png';
        metric.format = 'percent';
        break;
      case 'percent_associate_hours':
        metric.label = 'Associate Hours Worked';
        metric.icon = 'clock-sm.png';
        metric.format = 'percent';
        break;
      case 'percent_paralegal_hours':
        metric.label = 'Paralegal Hours Worked';
        metric.icon = 'clock-sm.png';
        metric.format = 'percent';
        break;
      case 'percent_minority_hours':
        metric.label = '% of Work by Minority Attys';
        metric.icon = 'clock-sm.png';
        metric.format = 'percent';
        break;
      case 'percent_female_hours':
        metric.label = '% of Work by Female Attys';
        metric.icon = 'clock-sm.png';
        metric.format = 'percent';
        break;
      case 'score':
        metric.label = 'Score';
        metric.icon = 'bpi.svg';
        metric.format = 'number';
        break;
      default:
        metric.icon = 'bills.svg';
        break;
    }
  }



  formatPercentOfTkWorked(summaryData: IPeerFirms, firmsData: IPeerFirms): Array<IMetricDisplayData> {
    const result = [];
    result.push({label: 'Partner', actual: summaryData.percent_partner_hours, firms: firmsData.percent_partner_hours, fieldName: 'percent_partner_hours'});
    result.push({label: 'Associate', actual: summaryData.percent_associate_hours, firms: firmsData.percent_associate_hours, fieldName: 'percent_associate_hours'});
    result.push({label: 'Paralegal', actual: summaryData.percent_paralegal_hours, firms: firmsData.percent_paralegal_hours, fieldName: 'percent_paralegal_hours'});
    result.push({label: 'Legal Assistant', actual: summaryData.percent_legal_assistant_hours, firms: firmsData.percent_legal_assistant_hours, fieldName: 'percent_legal_assistant_hours'});

    return result;
  }

  processSavedMetrics(keyMetrics: Array<IMetricDisplayData>, isTrends: boolean): Array<IMetricDisplayData> {
    const result = [];
    const savedMetrics = this.commonServ.getClientConfigJson(CLIENT_CONFIG_KEY_METRICS_NAME) || [];
    if (savedMetrics.length === 0) { // no config for visible metrics
      const allKeyMetrics = Object.assign([], keyMetrics);
      for (const saved of allKeyMetrics) {
        if (saved.metricType === 'percent_minority_hours' || saved.metricType === 'percent_female_hours') {
          continue;
        }
        saved.selected = true;
        result.push(saved);
      }
      return result;
    }
    for (const metric of keyMetrics) {
     if (savedMetrics.indexOf(metric.fieldName) >= 0 || (isTrends && ['blended_rate', 'avg_partner_rate', 'avg_associate_rate'].includes(metric.fieldName))) {
       const found = Object.assign({}, metric);
       found.selected = true;
       metric.selected = true;
       result.push(found);
     }
    }
    return result;
  }

  processTotalSpend(records: Array<any>): void {
    for (const rec of records) {
      const includeExpenses = this.filtersService.includeExpenses;
      rec.firm_total = includeExpenses ? rec.firm_total + rec.firm_expenses : rec.firm_total;
      rec.total = includeExpenses ? rec.total + rec.expenses : rec.total;
    }
  }

  processTotals(records: Array<any>, prop: string): number {
    let total = 0;
    for (const rec of records) {
      total += rec[prop];
    }
    return total;
  }

  getPercentOfWork(current: number, total: number): number {
    return current = current / (total || 1) * 100;
  }
  getYearQuarterData(id: any): any {
    const paramsYear = { clientId: this.userService.currentUser.client_info_id, firms: null};
    const arr = [];
    arr.push(id);
    paramsYear.firms = JSON.stringify(arr);
    const paramsQuoter = {firmId: id};
    const quarterResponse = this.httpService.makeGetRequest('spendByQuarter', paramsQuoter);
    const yearResponse = this.httpService.makeGetRequest('getSpendByYear', paramsYear);
    return forkJoin([quarterResponse, yearResponse]);
  }
  calcBlendedRate(rec: any): number {
    const result = 0;
    if (!rec.partner_hours) {
      return result;
    }
    return (rec.total_partner_billed + rec.total_associate_billed - rec.total_partner_writeoff - rec.total_associate_writeoff) / (rec.partner_hours + rec.associate_hours - rec.partner_writeoff_hours - rec.associate_writeoff_hours);
  }
  getReportPageName(report: any): string {
    let result = 'Comparison';
    if (report && report.page_name && report.page_name.includes('Trends')) {
      result = 'Trends';
    }
    return result;
  }
  formatAppliedFilters(filterFirms: boolean = false): Array<any> {
    let result =  Object.assign([], this.filtersService.getSelectedFilters());
    const userFilters = this.filtersService.getCurrentUserCombinedFilters();
    if (userFilters) {
      if ('invoicestartdate' in userFilters && 'invoiceenddate' in userFilters) {
        const invoiceDateFilter = {
          filterName: 'Invoice Date Range',
          filters: []
        };
        invoiceDateFilter.filters.push(userFilters.invoicestartdate + ' to ' + userFilters.invoiceenddate);
        result.push(invoiceDateFilter);
        result = result.filter(f => f.filterName !== 'Date Range');
      }
      if ('datepaidstartdate' in userFilters && 'datepaidenddate' in userFilters) {
        const datePaidFilter = {
          filterName: 'Date Paid Date Range',
          filters: []
        };
        datePaidFilter.filters.push(userFilters.paidstartdate + ' to ' + userFilters.datepaidenddate);
        result.push(datePaidFilter);
        result = result.filter(f => f.filterName !== 'Date Range');
      }

    }
    if (filterFirms) {
      result = result.filter(f => f.filterName !== 'Firms' && f.filterName !== 'Date Range') || [];
    }
    return result;
  }
  formatHistoricalAppliedFilters(filterSet: any): Array<any> {
    const result = [];
    const savedFilters = localStorage.getItem(config.SAVED_FILTERS_NAME + this.userService.currentUser.id);
    if (!savedFilters) {
      return result;
    }
    const serializedQs = JSON.parse(savedFilters);
    const storageFilters = serializedQs.dataFilters || [];
    const excludes = ['threshold', 'clientId', 'firms', 'expenses'];
    for (const propName of Object.keys(filterSet)) {
     if (excludes.includes(propName)) {
       continue;
     }
     let  updatedPropName = propName;
     const exclStr = propName.indexOf('exclude') >= 0 ? ' (Excluded)' : '';
     updatedPropName = updatedPropName.replace('exclude', '');
     updatedPropName = this.commonServ.lowCaseFirstLetter(updatedPropName);
     const found = storageFilters.find(e => e.fieldName === updatedPropName);
     if (found) {
       const currentFilter = { filterName: found.displayName + exclStr, filters: this.filtersService.formatHistoricalAppliedFiltersValues(found, filterSet[propName])};
       result.push(currentFilter);
      }
    }
    if (filterSet.maxMatterCost && filterSet.minMatterCost) {
      const val = filterSet.minMatterCost + ' thru ' + filterSet.maxMatterCost;
      const currentFilter = { filterName: 'Total Matter Cost' , filters: [val]};
      result.push(currentFilter);
    }
    if (filterSet.startdate && filterSet.enddate) {
      const val = moment(filterSet.startdate).format('YYYY-MM-DD') + ' to ' + moment(filterSet.enddate).format('YYYY-MM-DD');
      const currentFilter = { filterName: 'Date Range' , filters: [val]};
      result.push(currentFilter);
    }
    if (filterSet.invoicestartdate && filterSet.invoiceenddate) {
      const val = moment(filterSet.invoicestartdate).format('YYYY-MM-DD') + ' to ' + moment(filterSet.invoiceenddate).format('YYYY-MM-DD');
      const currentFilter = { filterName: 'Invoice Date Range' , filters: [val]};
      result.push(currentFilter);
    }
    if (filterSet.datepaidstartdate && filterSet.datepaidenddate) {
      const val = moment(filterSet.datepaidstartdate).format('YYYY-MM-DD') + ' to ' + moment(filterSet.datepaidenddate).format('YYYY-MM-DD');
      const currentFilter = { filterName: 'Paid Date Range' , filters: [val]};
      result.push(currentFilter);
    }
    return result;
  }
  processTks(timekeepers: Array<any>): void {
    for (const tk of timekeepers) {
      tk.bodhala_classification = this.commonServ.capitalize(tk.bh_classification);
      if (tk.bh_classification === 'partner') {
        if (tk.partner_level === 1) {
          tk.bodhala_classification = 'Junior Partner';
        } else if (tk.partner_level === 2) {
          tk.bodhala_classification = 'Mid-Level Partner';
        } else if (tk.partner_level === 3) {
          tk.bodhala_classification = 'Senior Partner';
        }
      }
      if (tk.bh_classification === 'associate') {
        if (tk.associate_level < 4 && tk.associate_level > 0) {
          tk.bodhala_classification = 'Junior Associate';
        }else if (tk.associate_level >= 4 && tk.associate_level < 7) {
          tk.bodhala_classification = 'Mid-Level Associate';
        } else if (tk.associate_level >= 7) {
          tk.bodhala_classification = 'Senior Associate';
        }
      }
      const includeExpenses = this.filtersService.includeExpenses;
      tk.total_billed = includeExpenses ? tk.total_billed + tk.total_expenses : tk.total_billed;
    }
  }

}
