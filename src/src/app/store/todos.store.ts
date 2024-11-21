import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ComponentStore } from '@ngrx/component-store';

import { Tab } from '../models/tab';
import { Todo } from '../models/todo';

interface State {
  todos: Todo[];
  filterType: Tab;
  limit: number;
}

const initialState: State = {
  todos: [],
  filterType: 'all',
  limit: 10,
};

@Injectable({ providedIn: 'root' })
export class TodosStore extends ComponentStore<State> {
  constructor() {
    super(initialState);
    this.loadData();
  }

  http: HttpClient = inject(HttpClient);

  readonly vm$ = this.select(({ todos, filterType }) => {
    let filteredItems: Todo[] = todos;

    switch (filterType) {
      case 'active':
        filteredItems = todos.filter((item) => !item.completed);
        break;
      case 'completed':
        filteredItems = todos.filter((item) => item.completed);
        break;
    }

    let activeCount = todos.filter((item) => item.completed).length;

    return { filteredItems, filterType, activeCount };
  });

  // ================================================
  // CRUD FUNCTION
  // ================================================

  readonly loadData = this.effect<void>((source$) =>
    source$.pipe(
      tap(
        this.http
          .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
            params: { _limit: this.state().limit },
          })
          .pipe(
            tap({
              next: (data) => this.patchState({ todos: data }),
              error: (error: HttpErrorResponse) => console.log(error),
            })
          )
      )
    )
  );

  readonly toggleItem = this.updater((state, id: string) => ({
    ...state,
    todos: state.todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : { ...item }
    ),
  }));

  readonly setTabFilter = this.updater((state, tab: Tab) => ({
    ...state,
    filterType: tab,
  }));

  readonly completeAllItems = this.updater((state) => ({
    ...state,
    todos: state.todos.map((item) => {
      if (
        this.getNumberItemsCompleted() === 0 ||
        this.getNumberItemsLeft() === 0 ||
        !item.completed
      ) {
        return {
          ...item,
          completed: !item.completed,
        };
      } else {
        return item;
      }
    }),
  }));

  readonly addItem = this.updater((state, input: string) => ({
    ...state,
    todos: this.createNewItem(input),
  }));

  readonly updateItem = this.updater((state, updateValue: Todo) => ({
    ...state,
    todos: [...state.todos].map((item) => {
      return item.id === updateValue.id ? (item = updateValue) : item;
    }),
  }));

  readonly deleteItem = this.updater((state, id: string) => ({
    ...state,
    todos: [...state.todos].filter((item) => item.id !== id),
  }));

  readonly deleteAllCheckedItems = this.updater((state) => ({
    ...state,
    todos: [...state.todos].filter((item) => !item.completed),
  }));

  // ================================================
  // HELPER FUNCTION
  // ================================================
  readonly getNumberItemsLeft = () => {
    return this.state().todos.filter((item) => !item.completed).length;
  };

  readonly getNumberItemsCompleted = () => {
    return this.state().todos.filter((item) => item.completed).length;
  };

  readonly checkCompletedItems = () => {
    return this.state().todos.filter((item) => item.completed).length > 0;
  };

  readonly createNewItem = (input: string) => {
    if (input === '') {
      return [...this.state().todos];
    }

    const newItems: Todo = {
      id: uuidv4(),
      title: input,
      completed: false,
    };

    return [...this.state().todos, newItems];
  };
}
