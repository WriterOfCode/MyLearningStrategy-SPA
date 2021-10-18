import { Inject, Injectable } from '@angular/core';
import { TransferProgressEvent } from '@azure/core-http';
import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { BlockBlobClient } from '@azure/storage-blob';
import { from, Observable, Subscriber } from 'rxjs';
import { distinctUntilChanged, scan, startWith } from 'rxjs/operators';
import {
  BlobContainerRequest,
  BlobStorageClientFactory
} from '../types/azure-storage';
import { BLOB_STORAGE_TOKEN } from './token';

@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {
  constructor(
    @Inject(BLOB_STORAGE_TOKEN)
    private getBlobClient: BlobStorageClientFactory
  ) {}

  getContainers(request: BlobContainerRequest) {
    const blobServiceClient = this.buildClient(request);
    return this.asyncToObservable(blobServiceClient.listContainers());
  }

  listBlobsInContainer(request: BlobContainerRequest) {
    const containerClient = this.getContainerClient(request);
    return this.asyncToObservable(containerClient.listBlobsFlat());
  }

  downloadBlobItem(request: BlobContainerRequest) {
    const blockBlobClient = this.getBlockBlobClient(request);
    return from(blockBlobClient.download());
  }

  deleteBlobItem(request: BlobContainerRequest) {
    const blockBlobClient = this.getBlockBlobClient(request);
    return from(blockBlobClient.delete());
  }

  uploadToBlobStorage(request: BlobContainerRequest,file: File) {
    const blockBlobClient = this.getBlockBlobClient(request);
    return this.uploadFile(blockBlobClient, file);
  }

  private getBlockBlobClient(request: BlobContainerRequest) {
    const containerClient = this.getContainerClient(request);
    return containerClient.getBlockBlobClient(request.cloudFileName);
  }

  private getContainerClient(request: BlobContainerRequest) {
    const blobServiceClient = this.buildClient(request);
    return blobServiceClient.getContainerClient(request.containerName);
  }

  private buildClient(options: BlobContainerRequest) {
    return this.getBlobClient(options);
  }

  private uploadFile(blockBlobClient: BlockBlobClient, file: File) {
    return new Observable<any>(observer => {
      blockBlobClient
        .uploadBrowserData(file, {
          onProgress: this.onProgress(observer),
          blobHTTPHeaders: {
            blobContentType: file.type
          }
        })
        .catch(this.onUploadError(observer))
        .then(this.onUploadComplete(observer, file));
    }).pipe(distinctUntilChanged());
  }

  public onUploadError(observer: Subscriber<any>) {
    return (error: any) => observer.error(error);
  }

  public onUploadComplete(observer: Subscriber<any>, file: File) {
    return () => {
      observer.next(file.size);
      observer.complete();
    };
  }

  public onProgress(observer: Subscriber<any>) {
    return (progress: TransferProgressEvent) =>
      observer.next(progress.loadedBytes);
  }

  private asyncToObservable<T, TService>(
    iterable: PagedAsyncIterableIterator<T, TService>
  ) {
    return new Observable<T>(
      observer =>
        void (async () => {
          try {
            for await (const item of iterable as AsyncIterable<T>) {
              if (observer.closed) { return; }
              observer.next(item);
            }
            observer.complete();
          } catch (e) {
            observer.error(e);
          }
        })()
    ).pipe(
      scan<T, T[]>((items, item) => [...items, item], []),
      startWith([] as T[])
    );
  }
}
