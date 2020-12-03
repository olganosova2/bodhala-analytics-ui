import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {IClient} from '../../services/common.service';
import {HttpService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-client-drop-down',
  templateUrl: './client-drop-down.component.html',
  styleUrls: ['./client-drop-down.component.scss']
})
export class ClientDropDownComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  errorMessage: any;
  @Input() selectedClient: IClient;
  filteredOptions: Array<IClient> = [];
  clients: Array<IClient> = [];
  @Output() clientSelected: EventEmitter<IClient> = new EventEmitter<IClient>();
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getClients();
  }
  getClients(): void {
    this.pendingRequest = this.httpService.makeGetRequest('getAnalyticsClients').subscribe(
      (data: any) => {
        this.clients = data.result || [];
        this.filteredOptions = Object.assign([], this.clients);
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  public filterClients(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredOptions = Object.assign(this.clients.filter(option => option.org_name.toLowerCase().indexOf(filterValue) === 0));
  }
  selectClient(client: any): void {
    this.clientSelected.emit(client);
  }
  public displayProperty(value: IClient): string {
    if (value) {
      return value.org_name;
    }
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
