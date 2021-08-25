import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService, IClient} from '../../shared/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {IFeatureClient, ISubscription, ISubscriptionGroup} from './subscription-list-model';

@Component({
  selector: 'bd-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  clientList: Array<IClient> = [];
  clientSubscriptions: Array<IFeatureClient> = [];
  allSubscriptions: Array<ISubscription> = [];
  subscriptionGroups: Array<ISubscriptionGroup> = [];
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService) {
    this.commonServ.pageTitle = 'Subscription Listings';
  }

  ngOnInit(): void {
    this.loadSubscriptions();
  }
  loadSubscriptions(): void {
    this.pendingRequest = this.httpService.makeGetRequest('getSubscriptionsList').subscribe(
      (data: any) => {
        if (data.result){
          this.allSubscriptions = (data.result.all_features.sort(this.utilService.dynamicSort('description')) || []).filter(e => e.feature_group !== 'BASIC');
          this.clientSubscriptions = data.result.client_features || [];
          this.buildClients();
          this.buildSubscriptionGroups();
        }
      }
    );
  }
  buildClients(): void {
    const clients = [];
    for (const ef of this.clientSubscriptions) {
      const found = clients.find(e => e.bh_client_id === ef.bh_client_id);
      if (!found) {
        clients.push({bh_client_id: ef.bh_client_id,  org_id: ef.org_id, org_name: ef.org_name});
      }
    }
    this.clientList = Object.assign([], clients);
  }
  buildSubscriptionGroups(): void {
    const groups: Array<ISubscriptionGroup> = [];
    for (const f of this.allSubscriptions) {
      const found = groups.find(e => e.groupName === f.feature_group);
      if (!found) {
        groups.push({ groupName:  f.feature_group, subscriptions: [f], records: []});
      } else {
        found.subscriptions.push(f);
      }
    }
    for (const group of groups) {
      for (const rec of this.clientList) {
        const client = { bh_client_id: rec.bh_client_id, org_name: rec.org_name, org_id: rec.org_id};
        this.buildClientSubscriptions(client, group.subscriptions);
        group.records.push(client);
      }

    }
    this.subscriptionGroups = Object.assign([], groups);
  }
  buildClientSubscriptions(client: any, groupSubscriptions: Array<ISubscription>): void {
    for (const gs of groupSubscriptions) {
      const found = this.clientSubscriptions.find( e => e.bh_client_id === client.bh_client_id && e.feature_id === gs.id);
      const fieldName = 'feature_' + gs.id.toString();
      client[fieldName] = found ? found.ef_id : null;
    }
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
