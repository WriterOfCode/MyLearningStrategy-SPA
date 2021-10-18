import { Injectable } from '@angular/core';
import { BlobDeleteResponse } from '@azure/storage-blob';
import { OperatorFunction, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { BlobContainerRequest, BlobItemUpload } from '../types/azure-storage';
import { BlobSharedViewStateService } from './blob-shared-view-state.service';
import { BlobStorageService } from './blob-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BlobDeletesViewStateService {
  private deleteQueueInner$ = new Subject<string>();

  deletedItems$ = this.deleteQueue$.pipe(
    mergeMap(filename => this.deleteFile(filename)),
    this.blobState.scanEntries()
  );

  get deleteQueue$() {
    return this.deleteQueueInner$.asObservable();
  }

  constructor(
    private blobStorage: BlobStorageService,
    private blobState: BlobSharedViewStateService
  ) {}

  deleteItem(filename: string): void {
    this.deleteQueueInner$.next(filename);
  }

  private deleteFile = (filename: string) =>
    this.blobState.getStorageOptions(filename).pipe(
      switchMap(options =>
        this.blobStorage
          .deleteBlobItem({
            ...options,
            filename
          })
          .pipe(
            this.mapDeleteResponse(filename, options),
            this.blobState.finaliseBlobChange(options.containerName)
          )
      )
    )

  private mapDeleteResponse = (
    filename: string,
    options: BlobContainerRequest
  ): OperatorFunction<BlobDeleteResponse, BlobItemUpload> => source =>
    source.pipe(
      map(() => ({
        filename,
        cloudFileName: options.cloudFileName,
        containerName: options.containerName,
        storageUri: options.storageUri,
        progress:0
      })),
      startWith({
        filename,
        cloudFileName: options.cloudFileName,
        containerName: options.containerName,
        storageUri: options.storageUri,
        progress:0
      })
    )
}
