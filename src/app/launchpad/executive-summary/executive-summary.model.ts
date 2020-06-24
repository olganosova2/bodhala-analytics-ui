import { environment } from '../../../environments/environment';
import * as config from '../../shared/services/config';
import { PillComponent } from './../card/cells/pill/pill.component';
import { LinkComponent } from './../card/cells/link/link.component';
import {leadPartnerChartOptions} from '../../shared/models/top-lead-partner';
import {practicePieChartOptions} from '../../shared/models/practice';
import {mattersChartOptions} from '../../shared/models/top-matters';
import {firmsChartOptions} from '../../shared/models/top-firms';
import { mattersByHighestAverageRateChartOptions } from '../../shared/models/top-average-matters';
import { activeSpendChart } from '../../shared/models/active-spend';
import { blockBillerChart } from '../../shared/models/top-block-billers';
import {iqReportPieChartOptions} from '../../shared/models/invoiceIq';


export interface ISpendOverviewItem {
    total: number;
    name: string;
    format?: string;
    lastCell?: boolean;
}

export const columns = {
    topMatters: [
        { name: 'Matter', field: 'name', component: LinkComponent, isPrimary: true, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${id}' },
        { name: 'Year to Date Cost', format: 'currency', field: 'total_spend'},
        { name: 'Bodhala Price Index', field: 'bpi', format: 'currency'},
        { name: 'Blended Rate', field: 'blended_rate', format: 'currency'},
        { name: 'Block Billing %', field: 'block_billed_per', format: 'percent'},
        { name: 'Block Billed $', field: 'block_billed_amount', format: 'currency'},
        { name: 'Partner % Billed By $', field: 'partner_billed', format: 'percent'}
    ],
    topFirms: [
        { name: 'Firm', field: 'firm_name', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewFirm, route_params: 'id'},
        { name: 'YTD Total Billed', format: 'currency', field: 'total_spend'},
        { name: 'Matters', field: 'num_matters', format: 'number'},
        { name: 'Average Matter Cost', field: 'avg_matter_cost', format: 'currency'},
        { name: 'Blended Attorney Rate', field: 'block_billed_per', format: 'currency'},
        { name: 'Block Billed $', field: 'block_billed_amount', format: 'currency'},
        { name: 'Partner % Billed By $', field: 'partner_billed', format: 'percent'}
    ],
    topTimekeepers: [
        { name: 'Attorney', field: 'name', component: LinkComponent, isPrimary: true, href: `${environment.host}${config.outerAppLinks.viewLeadPartner}` + '${id}/${firm_id}'},
        { name: 'Classification', field: 'bh_classification'},
        { name: 'YTD Total Billed', field: 'total_billed', format: 'currency'},
        { name: 'Matters', field: 'num_matters', format: 'number'},
        { name: 'Average Matter Cost', field: 'avg_matter_cost', format: 'currency'},
        { name: 'Blended Attorney Rate', field: 'block_billed_per', format: 'currency'},
        { name: 'Block Billed $', field: 'block_billed_amount', format: 'currency'},
        { name: 'Partner % Billed By $', field: 'partner_billed', format: 'percent'}
    ],
    firmsYOY: [
        { name: 'Firm', field: 'firm_name', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewFirm, route_params: 'id'},
        { name: 'Average Matter Cost', format: 'currency', field: 'avg_matter_cost'},
        { name: 'Average Matter Cost Trend', format: 'percent', field: 'avg_matter_cost_trend'},
        { name: 'Block Billed %', field: 'block_billed_per', format: 'percent'},
        { name: 'Block Billed % Trend', field: 'block_billed_per_trend', format: 'percent'},
        { name: 'Blended Attorney Rate', field: 'blended_rate', format: 'currency'},
        { name: 'Blended Attorney Rate Trend', format: 'percent', field: 'blended_rate_trend'},
        { name: 'Bodhala Price Index', field: 'bpi', format: 'currency'},
        { name: 'Bodhala Price Index Trend', field: 'bpi_trend', format: 'percent'},
        { name: 'Average Partner Rate', field: 'avg_partner_rate', format: 'currency'},
        { name: 'Average Partner Rate', field: 'avg_partner_rate', format: 'currency'},
        { name: 'Average Partners per Matter', field: 'avg_partners_per_matter', format: 'number'},
    ],
  };

  export const commonCards = [
    // { header: 'Top Matters YTD', request: 'topMatters', columns: columns.topMatters, options: mattersChartOptions, span: 2, order: 1 },
    // { header: 'Top Firms YTD', request: 'topFirms', columns: columns.topFirms, options: firmsChartOptions, span: 2, order: 2 },
    { header: 'Top Timekeepers YTD', request: 'getTopTimekeepers', columns: columns.topTimekeepers, options: leadPartnerChartOptions, span: 2, order: 4 },
    // { header: 'Top Matters YTD', request: 'activeSpend', options: activeSpendChart, span: 2, order: 7 },
    // { header: 'Top Firms YTD', request: 'activeSpend', options: activeSpendChart, span: 2, order: 7 },
    // { header: 'Top Timekeepers YTD', request: 'activeSpend', options: activeSpendChart, span: 2, order: 7 }
  ];