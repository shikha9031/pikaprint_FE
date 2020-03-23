import { Action } from '@ngrx/store';

export const SELECTED_ITEM = 'item-selected';
export const OPEN_FILTER_OPTIONS = 'show-filter-options';

export class SelectFilterOptions implements Action {
    readonly type = SELECTED_ITEM;
    constructor(public payload: number) {}
  }
  export class FilterOptionsToggle implements Action {
    readonly type = OPEN_FILTER_OPTIONS;
    constructor(public payload: boolean) {}
  }

  export type actions = SelectFilterOptions | FilterOptionsToggle;
