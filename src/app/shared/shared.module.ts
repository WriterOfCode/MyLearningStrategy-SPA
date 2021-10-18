import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import { FilePickerComponent } from './file-picker/file-picker.component';
@NgModule({
  declarations: [
    FilePickerComponent,
  ],
  imports: [
    CommonModule,
    NgbProgressbarModule,
  ],
  exports: [
    FilePickerComponent,
  ]
})
export class SharedModule { }
