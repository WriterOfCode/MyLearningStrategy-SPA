import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { azureBlobStorageFactory, BLOB_STORAGE_TOKEN } from './services/token';

@NgModule({
  imports: [ HttpClientModule],
  providers: [
    {
      provide: BLOB_STORAGE_TOKEN,
      useFactory: azureBlobStorageFactory
    }
  ],
})
export class AzureStorageModule {}
