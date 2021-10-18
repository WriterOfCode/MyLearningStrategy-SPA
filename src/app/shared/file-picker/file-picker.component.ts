import { Component, EventEmitter,  Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlobUploadsViewStateService } from 'src/app/azure-storage/services/blob-uploads-view-state.service';
import { BlobItemUpload } from 'src/app/azure-storage/types/azure-storage';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { BlobStorageService } from 'src/app/azure-storage/services/blob-storage.service';

const noop = () => {};
@Component({
  selector: 'mls-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:FilePickerComponent
    },
    {
      provide:NG_VALIDATORS,
      multi:true,
      useExisting:FilePickerComponent
    }
  ]
})
export class FilePickerComponent implements ControlValueAccessor , Validator {
  
  imageSrc: any;
  filesUploadSucess: boolean = false;
  
  @Output() ClowdFileNameChanged = new EventEmitter<string>();
  @Output() SelectedFileName = new EventEmitter<string>();

  selectedFiles: FileList;
  selectedFile: File;
  selectedFileName: string;
  selectedClowdFile:string;

  private uploadedItem$ = new BehaviorSubject<BlobItemUpload[]>([]);
  get uploadedItemsList$() { return this.uploadedItem$.asObservable(); }
  get countUploadedItems() { return this.uploadedItem$.getValue().length}

  constructor(public blobUpload: BlobUploadsViewStateService,
    private blobStorage: BlobStorageService) {  
    this.blobUpload.uploadedItems$
    .subscribe(
      images =>{ 
        this.uploadedItem$.next(images);
        if (images[0].progress==100){
          this.selectedClowdFile =images[0].storageUri + "/" + images[0].containerName + "/" + images[0].cloudFileName;
          this.value = this.selectedClowdFile;
        }
      }
    );
  }

  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
      return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeCallback(v);
      }
  }
  //From ControlValueAccessor interface
  writeValue(value: any) {
      if (value !== this.innerValue) {
          this.innerValue = value;
          this.imageSrc = value;
      }
  }
  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }
  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  disabled: boolean = false;
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValidatorChange = () =>{};
  validate(control: AbstractControl): ValidationErrors | null{
    if (this.filesUploadSucess) return null;
    let errors: any = { }
    if (!this.filesUploadSucess) {
      errors.fileUploadFaild = true;
    }
  }

  registerOnValidatorChange?(onValidatorChange: () => void){
    this.onValidatorChange = onValidatorChange;
  }
  
  onClick = (fileUpload: HTMLInputElement)=>{
    fileUpload.click();
  };

  loadImageFromSelectedFile() {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile); // read file as data url   
  }
  
  onFileSelected(event){
    if (event){
      this.selectedFiles = event.target.files;
      this.selectedFile = event.target.files[0];
      this.loadImageFromSelectedFile();
      this.blobUpload.uploadItems(this.selectedFiles);
    } else {
      this.selectedFiles = null;
      this.selectedFile = null;
      this.selectedFileName = '';  
      this.SelectedFileName.emit('');
    }
  }

}

