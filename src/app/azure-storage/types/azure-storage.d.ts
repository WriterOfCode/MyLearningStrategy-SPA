import { BlobServiceClient } from '@azure/storage-blob';

export interface BlobItemUpload {
  filename: string;
  cloudFileName: string;
  containerName: string;
  storageUri: string;
  progress: number;
}

export interface BlobContainerRequest {
  filename: string;
  cloudFileName: string;
  containerName: string;
  storageUri: string;
  blobEndpointUri: string;
  storageAccessToken: string;
}


export type Dictionary<T> = { [key: string]: T };

export type BlobStorageClientFactory = (
  options: BlobContainerRequest
) => BlobServiceClient;
