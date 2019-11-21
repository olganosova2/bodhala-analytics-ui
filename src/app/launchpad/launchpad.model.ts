import { environment } from '../../environments/environment';
import * as config from '../shared/services/config';
import { PillComponent } from './card/cells/pill/pill.component';
import { LinkComponent } from './card/cells/link/link.component';

export const columns = {
  topMatters: [
    { name: 'Matter', field: 'name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${id}' },
    { name: 'Spend', format: 'currency', field: 'total_spend', component: PillComponent },
    { name: 'Lead Partner', format: 'lawyer', field: 'lead_partner_name', avatar: 'bio_image_url', component: PillComponent },
    { name: 'Practice Area', field: 'client_matter_type', component: LinkComponent }
  ],
  topFirms: [
    { name: 'Firm', field: 'firm_name', component: LinkComponent },
    { name: 'Total Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: '% of Total Spend', format: 'percent', field: 'total_percent', component: PillComponent }
  ]
};

export const cards = [
  { header: 'Top Matters by Spend', request: 'topMatters', columns: columns.topMatters },
  { header: 'Top Firms by Spend', request: 'topFirms', columns: columns.topFirms },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters }
];
