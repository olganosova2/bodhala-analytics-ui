import { environment } from '../../environments/environment';
import * as config from '../shared/services/config';

const actions = {
  goToView(row): void {
    const w = window.parent ? window.parent : window;
    w.location.href = environment.host + config.outerAppLinks.viewMatter + row.id;
  }
};

export const columns = {
  topMatters: [
    { name: 'Matter', format: 'link', field: 'name' },
    { name: 'Spend', format: 'currency', field: 'total_spend' },
    { name: 'Lead Partner', format: 'lawyer', field: 'lead_partner_name', avatar: 'bio_image_url'},
    { name: 'Practice Area', format: 'link', field: 'client_matter_type', action: (row) => actions.goToView(row)}
  ]
};

export const cards = [
  { header: 'Top Matters by Spend', request: 'topMatters', columns: columns.topMatters },
  { header: 'Top Firms by Spend', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters }
];
