import {Injectable} from '@angular/core';
import {UtilService} from 'bodhala-ui-common';
import {YoYMetricTypes} from './yoy-rate-increase-model';
import {CommonService} from '../../shared/services/common.service';
import {TrendChart} from '../../firm/score-trend/score-trend.component';
import {AgGridService} from 'bodhala-ui-elements';

@Injectable({
  providedIn: 'root'
})
export class YoyRateIncreaseService {
  defaultColumn: any;
  constructor(private utilService: UtilService,
              public commonServ: CommonService,
              public agGridService: AgGridService) {
    this.defaultColumn = this.agGridService.getDefaultColumn();
  }
  buildColumns(defs: Array<any>, type: string, years: Array<number>): void {
    const groupColumn = {headerName: this.getHeaderGroupName(type), marryChildren: true, children: []};
    let cnt = 0;
    for (const y of years) {
      if ((y === years[0] && type === YoYMetricTypes.Increase) || (y === years[years.length - 1] && type === YoYMetricTypes.Spend)) {
        continue;
      }
      const header = y.toString();
      const fieldName = y.toString() + '_' + type;
      const renderer = type === YoYMetricTypes.Increase ? this.agGridService.roundToPercentNumberCellRenderer : this.agGridService.roundCurrencyCellRenderer;
      const col = {headerName: header, field: fieldName, cellRenderer: renderer, ...this.defaultColumn, floatingFilter: true, width: 105};
      if (cnt === 0) {
        col.cellStyle = {'border-left': '1px solid lightgray'};
      }
      col.cellClass = type === YoYMetricTypes.Increase ? this.getIncreaseClass : null;
      groupColumn.children.push(col);
      cnt++;
    }
    defs.push(groupColumn);
  }

  calculaterateIncrease(line: any, years: Array<number>): void {
    for (let ix = 0; ix < years.length - 1; ix++) {
      const y = years[ix];
      const prop1 = y.toString() + '_' + YoYMetricTypes.Rate;
      const prop2 = (y + 1).toString() + '_' + YoYMetricTypes.Rate;
      const propIncrease = (y + 1).toString() + '_' + YoYMetricTypes.Increase;
      const prevYearRate = line[prop1] || 0;
      const currentYearRate = line[prop2] || 0;
      if (!prevYearRate || !currentYearRate) {
        continue;
      }
      line[propIncrease] = ((Math.round(currentYearRate) - Math.round(prevYearRate)) / Math.round(prevYearRate)) * 100;
    }
  }

  getHeaderGroupName(word: string): string {
    let result = '';
    switch (word) {
      case  YoYMetricTypes.Rate:
        result = 'Rates';
        break;
      case  YoYMetricTypes.Spend:
        result = 'Total Spend';
        break;
      case  YoYMetricTypes.Increase:
        result = '% Rate Increase';
        break;
      default:
        result = 'Rates';
        break;
    }
    return result;
  }

  getHeaderName(word: string, year: number): string {
    return this.commonServ.capitalize(word) + ' ' + year.toString();
  }

  calculateAggFunc(nodes: any): any {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    const result = {};
    const firstLine = nodes[0].group ? nodes[0].aggData : nodes[0].data;
    const columnNames = [];
    const counts = {};
    for (const key in firstLine) {
      if (firstLine.hasOwnProperty(key)) {
        const year = Number(key.substring(0, 4));
        if (!isNaN(year)) {
          result[key] = 0;
          counts[key] = 0;
          columnNames.push(key);
        }
      }
    }
    for (const node of nodes) {
      const data = node.group ? node.aggData : node.data;
      for (const col of columnNames) {
        const val = data[col] || 0;
        if (val) {
          counts[col] ++;
        }
        result[col] += Number(data[col]);
      }
    }
    for (const col of columnNames) {
      const cnt = counts[col] || 1;
      if (col.indexOf('spend') < 0) {
        result[col] = result[col] / cnt;
      }
    }
    return result;
  }
  firmNameCellRenderer(params: any) {
    if (!params.data) {
      return '--';
    }
    return params.data.firm_name + ' (' + params.data.firm_id + ')';
  }
  tkNameCellRenderer(params: any) {
    if (!params.value) {
      return '--';
    }
    let result = 'UNKNOWN';
    switch (params.value) {
      case 'JR ASS':
        result = 'Junior Associate';
        break;
      case 'MID ASS':
        result = 'Mid Associate';
        break;
      case 'SR ASS':
        result = 'Senior Associate';
        break;
      case 'JR PART':
        result = 'Junior Partner';
        break;
      case 'MID PART':
        result = 'Mid Partner';
        break;
      case 'SR PART':
        result = 'Senior Partner';
        break;
      default:
        break;
    }
    return result;
  }
  getIncreaseClass(params: any) {
    let result = null;
    if (params.value > 0) {
      result = 'color-red';
    }
    if (params.value < 0) {
      result = 'font-green';
    }
    return result;
  }

}
