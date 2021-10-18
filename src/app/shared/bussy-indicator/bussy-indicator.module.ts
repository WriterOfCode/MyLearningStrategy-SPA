import { NgModule } from '@angular/core';
import { BussyIndicatorComponent } from './bussy-indicator.component';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ BussyIndicatorComponent ],
  imports: [
    NgxSpinnerModule,
  ],
  exports:[BussyIndicatorComponent,NgxSpinnerModule],
  providers:[NgxSpinnerService]
})
export class BussyIndicatorModule { }
