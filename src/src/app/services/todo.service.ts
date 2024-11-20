import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Tab } from '../models/tab';
import { Todo } from '../models/todo';

type State = {
  items: Todo[];
  filterType: Tab;
};

const initialState = {
  items: [],
  filterType: 'all' as Tab,
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: Todo[] = [];
  http: HttpClient = inject(HttpClient);
  limit: number = 10;

  private _state: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState
  );

  state$: Observable<State> = this._state.asObservable();

  filteredItems$: Observable<Todo[]> = this._state.pipe(
    map(({ items, filterType }) => {
      switch (filterType) {
        case 'active':
          return items.filter((item) => !item.completed);
        case 'completed':
          return items.filter((item) => item.completed);
        default:
          return items;
      }
    })
  );

  // get filteredItems() {
  //   switch (this._state.value.filterType) {
  //     case 'active':
  //       return this._state.value.items.filter((item) => !item.completed);
  //     case 'completed':
  //       return this._state.value.items.filter((item) => item.completed);
  //     default:
  //       return this._state.value.items;
  //   }
  // }

  setTabFilter(filterType: Tab) {
    this.patchState({ filterType });
  }

  loadData() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
        params: { _limit: this.limit },
      })
      .pipe(
        tap((data) => {
          this.patchState({ items: data });
        })
      )
      .subscribe();
  }

  getTodoList(): Todo[] {
    return this._state.value.items;
  }

  isEmptyTodoList(): boolean {
    return this._state.value.items.length === 0;
  }

  getNumberItemsLeft() {
    return this._state.value.items.filter((item) => !item.completed).length;
  }

  getNumberItemsCompleted() {
    return this._state.value.items.filter((item) => item.completed).length;
  }

  checkCompletedItems() {
    return this._state.value.items.filter((item) => item.completed).length > 0;
  }

  toggleItem(id: string) {
    const updatedItems = this._state.value.items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      } else {
        return item;
      }
    });

    this.patchState({ items: updatedItems });
  }

  completeAllItems() {
    const updatedItems = this._state.value.items.map((item) => {
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
    });

    this.patchState({ items: updatedItems });
  }

  createNewItem(input: string) {
    if (input === '') {
      return;
    }

    const newItems: Todo[] = [
      {
        id: uuidv4(),
        title: input,
        completed: false,
      },
      ...this._state.value.items,
    ];

    this.patchState({ items: newItems });
  }

  updateItem(updateValue: Todo) {
    const updatedItems = this._state.value.items.map((item) => {
      return item.id === updateValue.id ? (item = updateValue) : item;
    });

    this.patchState({ items: updatedItems });
  }

  deleteItem(id: string) {
    const updatedItems = this._state.value.items.filter(
      (item) => item.id !== id
    );

    this.patchState({ items: updatedItems });
  }

  deleteAllCheckedItems() {
    const newItems = this._state.value.items.filter((item) => !item.completed);
    this.patchState({ items: newItems });
  }

  private patchState(next: Partial<State>) {
    this._state.next({ ...this._state.value, ...next });

    this._state.subscribe((state) => {
      console.log('State updated:', state.items);
    });
  }
}
