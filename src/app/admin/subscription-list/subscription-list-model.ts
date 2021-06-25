export interface ISubscription {
  id: number;
  name: string;
  description: string;
  feature_group: string;
}
export interface IFeatureClient {
  bh_client_id: number;
  org_name: string;
  org_id: number;
  feature_id: number;
  ef_id: number;
}
export interface ISubscriptionGroup {
  groupName: string;
  subscriptions: Array<ISubscription>;
  records?: Array<any>;
}
