import { Injectable } from '@angular/core';
import { from, OperatorFunction, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { BlobContainerRequest, BlobItemUpload } from '../types/azure-storage';
import { BlobSharedViewStateService } from './blob-shared-view-state.service';
import { BlobStorageService } from './blob-storage.service';

function fileExt(filename: string): string {
  if(filename){
    let extStart = filename.lastIndexOf(".");
    if (extStart>0) return filename.substring(extStart)
  } 
  return '';
}
@Injectable({
  providedIn: 'root'
})
export class BlobUploadsViewStateService {
  private uploadQueueInner$ = new Subject<FileList>();
  constructor(
    private blobStorage: BlobStorageService,
    private blobState: BlobSharedViewStateService
  ) {}

  uploadedItems$ = this.uploadQueue$.pipe(
    mergeMap(file => this.uploadFile(file)),
    this.blobState.scanEntries()
  );

  get uploadQueue$() {
    return this.uploadQueueInner$
      .asObservable()
      .pipe(mergeMap(files => from(files)));
  }

  uploadItems(files: FileList): void {
    this.uploadQueueInner$.next(files);
  }

  public uploadFile = (file: File) =>
    this.blobState.getStorageOptions(file.name).pipe(
      switchMap(options =>
        this.blobStorage
          .uploadToBlobStorage({
            ...options,
          },file)
          .pipe(
            this.mapUploadResponse(file, options),
            this.blobState.finaliseBlobChange(options.containerName)
          )
      )
    )

  private mapUploadResponse = (
    file: File,
    options: BlobContainerRequest
  ): OperatorFunction<number, BlobItemUpload> => source =>
    source.pipe(
      map(progress => ({
        ...options,
        progress: parseInt(((progress / file.size) * 100).toString(), 10)
      })),
      startWith({
        ...options,
        progress: 0
      })
    )
}

