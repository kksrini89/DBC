import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { DataParamsProvider } from '../../providers/data-params';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  isUpdateTabEnabled: Boolean;
  constructor(public paramsService: DataParamsProvider) {
    this.isUpdateTabEnabled = this.paramsService.updateTabEnabled;
  }
}
