import { Injectable } from '@angular/core';
import * as _moment from 'moment';
import {IPayloadDates, QbrType} from './qbr-model';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class QbrService {
  firstReport: boolean;

  constructor() { }

  formatPayloadDates(dtStart: string, qbrType: QbrType): IPayloadDates {
    const result = {
      startDate: '',
      endDate: '',
      comparisonStartDate: '',
      comparisonEndDate: ''
    };
    result.startDate = moment(dtStart).format();
    if (qbrType === QbrType.YoY) {
      result.endDate = moment(dtStart).add(1, 'years').add(-1, 'days').format();
      result.comparisonStartDate = moment(dtStart).add(-1, 'years').format();
      result.comparisonEndDate = moment(dtStart).add(-1, 'days').format();
    }
    if (qbrType === QbrType.QoQAnnual) {
      result.endDate = moment(dtStart).add(3, 'months').add(-1, 'days').format();
      result.comparisonStartDate = moment(dtStart).add(-1, 'years').format();
      result.comparisonEndDate = moment(dtStart).add(-1, 'years').add(3, 'months').add(-1, 'days').format();
    }
    if (qbrType === QbrType.QoQAdjacent) {
      result.endDate = moment(dtStart).add(3, 'months').add(-1, 'days').format();
      result.comparisonStartDate = moment(dtStart).add(-3, 'months').format();
      result.comparisonEndDate = moment(dtStart).add(-1, 'days').format();
    }

    return result;
  }
}
