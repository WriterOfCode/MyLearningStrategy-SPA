import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
/* NgRx */
import { Store } from '@ngrx/store';
import { CategoriesPageActions, CategoriesApiActions } from './state/actions/categories-actions-index';
import { categoryPageReducer, getCurrentCategory } from './state/categories.entity.selectors'
import { IUserProfile } from '../shared/models/user-profile';
import { ApplicationActions } from '../shared/state/actions';
import { AlertDuration,AlertTheam} from '../shared/models/Alert'
import { Category } from '../shared/models/category';

@Component({
  selector: 'mls-category-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {
  @ViewChild(NgForm) categoryEditForm: NgForm;
  pageTitle = 'Edit';

  private originalCategory: Category;
  currentCategory: Category;
  userProfile: IUserProfile;

  get isDirty(): boolean {
    return JSON.stringify(this.originalCategory) !== JSON.stringify(this.currentCategory);
  }

  get isValid(): boolean {
    return true;
  }

  constructor( private store: Store<categoryPageReducer>,
              private router: Router) {   }

  ngOnInit() {
    this.store.select(getCurrentCategory)
      .subscribe(data => this.originalCategory = data);
    this.currentCategory = JSON.parse(JSON.stringify(this.originalCategory));
    if (!this.currentCategory) {
      this.pageTitle = 'Category not found';
    } else {
      if (this.currentCategory.id > 0) {
        this.pageTitle = 'Edit Category';
      } else {
        this.pageTitle = `Add Category:`;
      }
    }
  }
  onCancel(){
    this.router.navigate(['/categories']);
  }

  onDelete(): void {
    if (this.currentCategory && this.currentCategory.id !== 0){
      if (confirm(`Do you realy want to detete the Category:  ${this.currentCategory.categoryName}?`)) {
        this.store.dispatch(CategoriesApiActions.deleteCategory({CategoryId: this.currentCategory.id}));
        this.store.dispatch(ApplicationActions
          .AleartMessage({ alert:
            {duration:AlertDuration.Closable, 
              theam: AlertTheam.danger,
             title:'Category',
             message:'Category',
             debug:JSON.stringify(`${this.currentCategory.categoryName} was deleted`)}}));
        // Navigate back to the strategies list
        this.router.navigate(['/categories']);
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(CategoriesPageActions.clearCurrentCategory());
      this.store.dispatch(ApplicationActions
        .AleartMessage({ alert:
          {duration:AlertDuration.SelfClosing, 
            theam: AlertTheam.success,
           title:'Category',
           message:'Category',
           debug:JSON.stringify(`${this.currentCategory.categoryName} was deleted`)}}));

      // Navigate back to the strategies list
      this.router.navigate(['/categories']);
    }
  }

  onSave(): void {
      if (this.currentCategory.id > 0) {
        this.store.dispatch(CategoriesApiActions.updateCategory({ Category: this.currentCategory  }));

      } else {
        this.store.dispatch(CategoriesApiActions.createCategory({ Category: this.currentCategory  }));

      }
      // Navigate back to the strategies list
      this.router.navigate(['/categories']);
  }

}
