import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction
} from 'rxjs';
import {
  filter,
  finalize,
  map,
  scan,
  switchMap,
} from 'rxjs/operators';
import {
  BlobContainerRequest,
  BlobItemUpload,
  Dictionary
} from '../types/azure-storage';
import { BlobStorageService } from './blob-storage.service';
import { SasGeneratorService } from './sas-generator.service';

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
export class BlobSharedViewStateService {
  private selectedContainerInner$ = new BehaviorSubject<string>(undefined);

  constructor(
    private sasGenerator: SasGeneratorService,
    private blobStorage: BlobStorageService
  ) {}

  containers$ = this.getStorageOptions('').pipe(
    switchMap(options => this.blobStorage.getContainers(options))
  );
  itemsInContainer$ = this.selectedContainer$.pipe(
    filter(containerName => !!containerName),
    switchMap(containerName =>
      this.getStorageOptions('').pipe(
        switchMap(options =>
          this.blobStorage.listBlobsInContainer({
            ...options,
            containerName
          })
        )
      )
    )
  );

  get selectedContainer$() {
    return this.selectedContainerInner$.asObservable();
  }

  getContainerItems(containerName: string): void {
    this.selectedContainerInner$.next(containerName);
  }

  finaliseBlobChange = <T>(
    containerName: string
  ): MonoTypeOperatorFunction<T> => source =>
    source.pipe(
      finalize(
        () =>
          this.selectedContainerInner$.value === containerName &&
          this.selectedContainerInner$.next(containerName)
      )
    )

  scanEntries = <T extends BlobItemUpload>(): OperatorFunction<T, T[]> => source =>
    source.pipe(
      map(item => ({
        [`${item.containerName}-${item.filename}`]: item
      })),
      scan<Dictionary<T>>(
        (items, item) => ({
          ...items,
          ...item
        }),
        {}
      ),
      map(items => Object.values(items))
    )

  getStorageOptions(filename: string): Observable<BlobContainerRequest> {
    return this.sasGenerator.getSasToken().pipe(
      map(bcr => ({
        ...bcr,
        filename: filename,
        cloudFileName: bcr.cloudFileName + fileExt(filename),
      })),
    )
  }
}
