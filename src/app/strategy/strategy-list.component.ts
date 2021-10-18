import { throwError as _throw} from 'rxjs';
import { Component, ViewChildren, QueryList, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { StrategySort } from './strategy.page.state';
import { Strategy } from "../shared/models/strategy";
import { StrategyListSortDirective } from './strategy-list-sort.directive';
@Component({
  selector: 'mls-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrategyListComponent {
  @ViewChildren(StrategyListSortDirective) headers: QueryList<StrategyListSortDirective>;

  @Output() search = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() strategySelected = new EventEmitter<Strategy>();
  @Output() deleteStrategy = new EventEmitter<number>();
  @Output() editStrategy = new EventEmitter<Strategy>();
  @Output() addStrategy = new EventEmitter<void>();
  @Output() sortStrategies = new EventEmitter<StrategySort>();

  @Input() searchTerm: string;
  @Input() errorMessage: string;
  @Input() strategies: Strategy[];
  @Input() selectedStragegy: Strategy;
  @Input() pageSize: number;
  @Input() strategiesCount: number;
  @Input() currentPage: number;
  @Input() sort: StrategySort;

  constructor() { }

  onSort({column, direction}: StrategySort) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSStrategyListSort !== column) {
        header.direction = '';
      }
    });
    this.sortStrategies.emit({ column, direction } )
  }

  onPageSizeChange(pagesize: number)
  {
    this.pageSizeChange.emit(pagesize);
  }

  onPageChange(page: number)
  {
    this.currentPageChange.emit(page);
  }

  onDeleteStrategy(selectedStrategy: Strategy): void {
    if (confirm(`Do you realy want to detete the Strategy:  ${selectedStrategy.name}?`)) {
      this.deleteStrategy.emit(selectedStrategy.id);
    }
  }

  onEditStrategy(selectedStrategy: Strategy): void {
    this.editStrategy.emit(selectedStrategy);
  }

  onAdd(): void {
    this.addStrategy.emit();
  }

  onSelected(strategy: Strategy): void {
    this.strategySelected.emit(strategy);
  }

  onSearchTermChanged(search: string) {
    this.search.emit(search);
  }
}
