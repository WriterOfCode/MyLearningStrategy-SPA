import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Strategy } from "../shared/models/strategy";
import { PickListsService } from '../shared/services/pick-lists.service';
import { PickList } from '../shared/models/pick-list';
import { Router } from '@angular/router';
/* NgRx */
import { Store } from '@ngrx/store';
import { getCurrentStrategy, strategyPageReducer} from './state/strategy.entity.selectors';
import { StrategyApiActions, StrategyPageActions } from './state/actions/strategy-actions-index';
import { IUserProfile } from '../shared/models/user-profile';
import { getCurrentUserProfile } from '../shared/auth/state/auth.selectors';
import { ApplicationActions } from '../shared/state/actions';
import { AlertDuration, AlertTheam } from '../shared/models/Alert';

@Component({
  selector: 'mls-stategy-edit',
  templateUrl: './strategy-edit.component.html',
  styleUrls: ['./strategy-edit.component.css']
})
export class StrategyEditComponent implements OnInit {
  @ViewChild(NgForm) strategyEditForm: NgForm;
  pageTitle = 'Edit';
  errorMessage: string;
  private originalStrategy: Strategy;
  currentStrategy: Strategy;
  questionSortRules: PickList[];
  questionSelections: PickList[];
  responseSelections: PickList[];
  userProfile: IUserProfile;

  get isDirty(): boolean {
    return JSON.stringify(this.originalStrategy) !== JSON.stringify(this.currentStrategy);
  }

  get isValid(): boolean {
    return true;
  }

  constructor(private pickLists: PickListsService,
              private store: Store<strategyPageReducer>,
              private router: Router) {
                this.pickLists.getQuestionSortRules()
                .subscribe(data => (this.questionSortRules = data));

                this.pickLists.getQuestionSelection()
                .subscribe(data => (this.questionSelections = data));

                this.pickLists.getResponseSelection()
                .subscribe(data => (this.responseSelections = data));
              }

  ngOnInit() {
    this.store.select(getCurrentStrategy)
      .subscribe(data => this.originalStrategy = data);
    this.currentStrategy = JSON.parse(JSON.stringify(this.originalStrategy));

    this.store.select(getCurrentUserProfile)
      .subscribe(data=>this.userProfile = data);

    if (!this.currentStrategy) {
      this.pageTitle = 'Strategy not found';
    } else {
      if (this.currentStrategy.id === 0) {
        this.pageTitle = 'Add Strategy';
      } else {
        this.pageTitle = `Edit Strategy:`;
      }
    }
  }


  deleteStrategy(): void {
    if (this.currentStrategy && this.currentStrategy.id > 0){
      if (confirm(`Do you realy want to detete the Strategy:  ${this.currentStrategy.name}?`)) {
        this.store.dispatch(StrategyApiActions.deleteStrategy({StrategyId: this.currentStrategy.id}));
        // this.store.dispatch(ApplicationActions
        //   .AleartMessage({ alert:
        //     {duration:AlertDuration.SelfClosing,
        //       theam: AlertTheam.success,
        //      title:'Strategy',
        //      message:'Strategy',
        //      debug:`The ${this.currentStrategy.name} was deleted`}}));
        // Navigate back to the strategies list
        this.router.navigate(['/strategies']);
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(StrategyPageActions.clearCurrentStrategy());
      this.router.navigate(['/strategies']);
    }
  }

  saveStrategy(): void {
    if (this.isDirty) {
      // Copy over all of the original product properties
      // Then copy over the values from the form
      // This ensures values not on the form, such as the Id, are retained
      const newStrategy = { ...this.originalStrategy, ...this.currentStrategy };
      console.log(newStrategy);
      if (newStrategy.id < 0 ) {
        newStrategy.userProfileId = this.userProfile.userProfileId;
        this.store.dispatch(StrategyApiActions.createStrategy({ Strategy: newStrategy }));
        this.store.dispatch(ApplicationActions
          .AleartMessage({ alert:
            {duration:AlertDuration.SelfClosing,
              theam: AlertTheam.success,
             title:'Strategy',
             message:`The New ${this.currentStrategy.name} was saved`,
             debug:''}}));

        // Navigate back to the strategies list
        this.router.navigate(['/strategies']);
      } else {
        this.store.dispatch(StrategyApiActions.updateStrategy({ Strategy: newStrategy }));
        this.store.dispatch(ApplicationActions
          .AleartMessage({ alert:
            {duration:AlertDuration.SelfClosing,
              theam: AlertTheam.success,
             title:'Strategy',
             message:'Strategy',
             debug:`The updated ${this.currentStrategy.name} was saved`}}));
        this.router.navigate(['/strategies']);
      }
    }
  }
}
