import { InjectionToken } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import {
  BlobStorageClientFactory,
  BlobContainerRequest
} from '../types/azure-storage';

export const BLOB_STORAGE_TOKEN = new InjectionToken<BlobStorageClientFactory>(
  'BLOB_STORAGE_TOKEN'
);

export function azureBlobStorageFactory(): BlobStorageClientFactory {
  const buildConnectionString = (options: BlobContainerRequest) => {
    return (
      `BlobEndpoint=${options.blobEndpointUri};` +
      `SharedAccessSignature=${options.storageAccessToken}`
    );
  };

  return options =>
    BlobServiceClient.fromConnectionString(buildConnectionString(options));
}
