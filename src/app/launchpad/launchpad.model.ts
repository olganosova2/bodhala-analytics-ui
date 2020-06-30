import { environment } from '../../environments/environment';
import * as config from '../shared/services/config';
import { PillComponent } from './card/cells/pill/pill.component';
import { LinkComponent } from './card/cells/link/link.component';
import {leadPartnerChartOptions} from '../shared/models/top-lead-partner';
import {practicePieChartOptions} from '../shared/models/practice';
import {mattersChartOptions} from '../shared/models/top-matters';
import {firmsChartOptions} from '../shared/models/top-firms';
import { mattersByHighestAverageRateChartOptions } from '../shared/models/top-average-matters';
import { activeSpendChart } from '../shared/models/active-spend';
import { blockBillerChart } from '../shared/models/top-block-billers';
import {iqReportPieChartOptions} from '../shared/models/invoiceIq';

export const columns = {
  topMatters: [
    { name: 'Matter', field: 'name', component: LinkComponent, isPrimary: true, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${id}' },
    { name: 'Spend', format: 'currency', field: 'total_spend', component: PillComponent },
    // { name: 'Lead Partner', format: 'lawyer', field: 'lead_partner_name', avatar: 'bio_image_url', component: PillComponent },
    { name: 'Lead Partner', field: 'lead_partner_name', component: LinkComponent, isPrimary: false, href: `${environment.host}${config.outerAppLinks.viewLeadPartner}` + '${lead_partner_id}/${lawfirm_id}'},
    { name: 'Practice Area', field: 'client_matter_type', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewPracticeAreaDetail, route_params: 'client_matter_type'}
  ],
  topFirms: [
    { name: 'Firm', field: 'firm_name', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewFirm, route_params: 'id'},
    { name: 'Total Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: '% of Total Spend', format: 'percent', field: 'total_percent', component: PillComponent }
  ],
  spendByPracticeArea: [
    { name: 'Practice Area', field: 'practice_area', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewPracticeAreaDetail, route_params: 'practice_area'},
    { name: 'Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: 'Top Firm', field: 'firm_name', component: LinkComponent, isPrimary: false, route: config.outerAppLinks.viewFirm, route_params: 'firm_id'},
    { name: 'Top Matter', field: 'matter_name', component: LinkComponent, isPrimary: false, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${matter_id}'},
  ],
  topLeadPartners: [
    { name: 'Lead Partner', field: 'name', component: LinkComponent, isPrimary: true, href: `${environment.host}${config.outerAppLinks.viewLeadPartner}` + '${id}/${firm_id}'},
    { name: 'Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: 'Practice Area', field: 'top_practice', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewPracticeAreaDetail, route_params: 'top_practice'},
    { name: 'Top Matter', field: 'top_matter_name', component: LinkComponent, isPrimary: false, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${top_matter_id}'},
  ],
  mattersByHighestAverageRate: [
    { name: 'Firm', field: 'firm_name', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewFirm, route_params: 'firm_id' },
    { name: 'Matter', field: 'matter_name', component: LinkComponent, isPrimary: false, href: `${environment.host}${config.outerAppLinks.viewMatter}\${matter_id}` },
    { name: 'Blended Rate', format: 'currency', field: 'blended_rate', component: PillComponent },
    { name: 'Top Timekeeper', format: 'lawyer', field: 'timekeeper_name', component: PillComponent }
  ],
  topBlockBillers: [
    { name: 'Firm', field: 'law_firm', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewFirm, route_params: 'law_firm_id' },
    { name: '% Block Billed by Firm', format: 'percent', field: 'percent', component: PillComponent },
    { name: 'Lead Partner', field: 'name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewLeadPartner}` + '${timekeeper_id}/${law_firm_id}'}
  ],
  invoiceIQReports: [
    { name: 'Report', field: 'report_name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewIQReport}` + '${id}' },
    { name: 'Total Cost of Work', format: 'currency', field: 'total_billed', component: PillComponent }
  ]
};

export const commonCards = [
  { header: 'Top Matters by Spend', request: 'topMatters', columns: columns.topMatters, options: mattersChartOptions, span: 2, order: 1 },
  { header: 'Top Firms by Spend', request: 'topFirms', columns: columns.topFirms, options: firmsChartOptions, span: 2, order: 2 },
  { header: 'Top Lead Partners', request: 'topLeadPartners', columns: columns.topLeadPartners, options: leadPartnerChartOptions, span: 2, order: 4 },
  { header: 'Matters by Highest Average Rate', request: 'mattersByHighestAverageRate', columns: columns.mattersByHighestAverageRate, options: mattersByHighestAverageRateChartOptions, span: 2, order: 6 },
  { header: 'Active Spend', request: 'activeSpend', options: activeSpendChart, span: 2, order: 7 },
];
export const practiceAreaCard = { header: 'Spend By Practice Area', request: 'spendByPractice', columns: columns.spendByPracticeArea, options: practicePieChartOptions, span: 2, order: 3 };
export const topBillersCard = { header: 'Top Block Billers', request: 'topBlockBillers', columns: columns.topBlockBillers, span: 2, options: blockBillerChart, order: 5 };
export const invoiceIQCard =  { header: 'Invoice IQ Reports', request: 'invoiceIQReports', columns: columns.invoiceIQReports,  options: iqReportPieChartOptions, span: 2, order: 8 };
