import { Injectable } from '@angular/core';
import * as _moment from 'moment';
import {IPayloadDates, IPayloadQuarterDates, QbrType} from './qbr-model';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class QbrService {
  firstReport: boolean;
  yoyStartDate: any;

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

  constructSelectableQuarterDates(startDate): any {
    const result = {
      monthNumbers: null,
      formattedQuarterDates: null
    };
    const monthNumbers = [];
    const formatted = [];

    const firstQuarter = moment(startDate).format('MM');
    const secondQuarter = moment(startDate).add(3, 'months').format('MM');
    const thirdQuarter = moment(startDate).add(6, 'months').format('MM');
    const fourthQuarter = moment(startDate).add(9, 'months').format('MM');

    const firstQuarterFormatted = moment(startDate).format('MM-DD');
    const secondQuarterFormatted = moment(startDate).add(3, 'months').format('MM-DD');
    const thirdQuarterFormatted = moment(startDate).add(6, 'months').format('MM-DD');
    const fourthQuarterFormatted = moment(startDate).add(9, 'months').format('MM-DD');

    formatted.push(firstQuarterFormatted);
    formatted.push(secondQuarterFormatted);
    formatted.push(thirdQuarterFormatted);
    formatted.push(fourthQuarterFormatted);

    monthNumbers.push(Number(firstQuarter));
    monthNumbers.push(Number(secondQuarter));
    monthNumbers.push(Number(thirdQuarter));
    monthNumbers.push(Number(fourthQuarter));

    result.monthNumbers = monthNumbers;
    result.formattedQuarterDates = formatted;

    return result;
  }
}
