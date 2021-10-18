import { Component, OnInit } from '@angular/core';
import { InteractionType } from "@azure/msal-browser";
import { MsalService } from '@azure/msal-angular';
import { GraphService, ProviderOptions } from '../../app/shared/services/graph.service';
import { protectedResources } from '../../environments/environment';
import { IUserProfile } from '../shared/models/user-profile';
import { HttpClient } from '@angular/common/http';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'mls-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  userData: IUserProfile;
  profile!: ProfileType;
  displayedColumns: string[] = ['claim', 'value'];
  dataSourcePrfile: any =[];
  dataSourceTenant: any =[];

  constructor(private graphService: GraphService,private http: HttpClient , private authService: MsalService) { }

  ngOnInit() {

    const providerOptions: ProviderOptions = {
      account: this.authService.instance.getActiveAccount()!,
      scopes: protectedResources.graphMe.scopes,
      interactionType: InteractionType.Popup
    };



    this.getProfile(providerOptions);
  }

  getProfile(providerOptions: ProviderOptions) {
    this.graphService.getGraphClient(providerOptions)
    .api('/me').get()
    .then((profileResponse: ProfileType) => {
      this.dataSourcePrfile = [
        {id: 1, claim: "Name", value: profileResponse ? profileResponse['givenName'] : null},
        {id: 2, claim: "Surname", value: profileResponse ? profileResponse['surname'] : null},
        {id: 3, claim: "User Principal Name (UPN)", value: profileResponse ? profileResponse['userPrincipalName'] : null},
        {id: 4, claim: "ID", value: profileResponse ? profileResponse['id']: null}
      ];
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getTenant() {
    this.http.get(protectedResources.armTenants.endpoint + '?api-version=2020-01-01')
      .subscribe((tenant: any) => {
        this.dataSourceTenant = [
          {id: 1, claim: "Display Name", value: tenant ? tenant.value[0]['displayName'] : null},
          {id: 2, claim: "Default Domain", value: tenant ? tenant.value[0]['defaultDomain'] : null},
          {id: 3, claim: "Tenant Id", value: tenant ? tenant.value[0]['tenantId'] : null},
          {id: 3, claim: "Tenant Type", value: tenant ? tenant.value[0]['tenantType'] : null},
        ];
      });
  }
}
