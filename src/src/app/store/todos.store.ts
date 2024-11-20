import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { tap } from 'rxjs';

import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

import { Tab } from '../models/tab';
import { Todo } from '../models/todo';

interface TodosState {
  todos: Todo[];
  filterType: Tab;
}

const initialState = {
  todos: [],
  filterType: 'all' as Tab,
};

const demoState = {
  todos: [
    {
      id: '1abc',
      title: 'This is demo 1',
      completed: false,
    },
    {
      id: '2abc',
      title: 'This is demo 2',
      completed: true,
    },
  ],
  filterType: 'all' as Tab,
};

@Injectable({ providedIn: 'root' })
export class TodosStore extends ComponentStore<TodosState> {
  http: HttpClient = inject(HttpClient);

  private _limit = 5;

  constructor() {
    super(demoState);
  }

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

  readonly loadData = this.effect<void>((source$) =>
    source$.pipe(
      tap(
        this.http
          .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
            params: { _limit: this._limit },
          })
          .pipe(
            tapResponse({
              next: (data) => this.patchState({ todos: data }),
              error: (error: HttpErrorResponse) => console.log(error),
              finalize: () => {},
            })
          )
      )
    )
  );
  // loadData() {
  //   this.http
  //     .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
  //       params: { _limit: this._limit },
  //     })
  //     .pipe(tap((data) => {}))
  //     .subscribe();
  // }
}
