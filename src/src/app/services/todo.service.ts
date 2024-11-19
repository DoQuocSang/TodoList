import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { loremIpsum } from 'lorem-ipsum';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Tab } from '../models/tab';
import { Todo } from '../models/todo';

type State = {
  items: Todo[];
  filterType: Tab;
};

const initialState = {
  items: [],
  filterType: Tab.All,
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: Todo[] = [];
  http: HttpClient = inject(HttpClient);
  limit: number = 0;

  private _state: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState
  );

  state$: Observable<State> = this._state.asObservable();

  constructor() {
    this.limit = 10;
    for (let i = 0; i < 8; i++) {
      this._state.value.items.push({
        id: uuidv4(),
        title: loremIpsum(),
        completed: i % 2 === 0,
      });
    }
  }

  loadData() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
        params: { _limit: this.limit },
      })
      .subscribe((data) => {
        // console.log(data);
        this._state.value.items = data;
      });
  }

  getTodoList(): Todo[] {
    return this._state.value.items;
  }

  isEmptyTodoList(): boolean {
    return this.todoList.length === 0;
  }

  getNumberItemsLeft() {
    return this.todoList.filter((item) => !item.completed).length;
  }

  getNumberItemsCompleted() {
    return this.todoList.filter((item) => item.completed).length;
  }

  checkCompletedItems() {
    return this.todoList.filter((item) => item.completed).length > 0;
  }

  getTotoListByTab(tab: string) {
    switch (tab) {
      case Tab.Completed: {
        return this.todoList.filter((item) => item.completed);
      }
      case Tab.Active: {
        return this.todoList.filter((item) => !item.completed);
      }
      case Tab.All: {
        return this.todoList;
      }
      default: {
        return this.todoList;
      }
    }
  }

  completeAllItems() {
    if (
      this.getNumberItemsCompleted() === 0 ||
      this.getNumberItemsLeft() === 0
    ) {
      this.todoList.forEach((item) => {
        item.completed = !item.completed;
      });
    } else {
      this.todoList
        .filter((item) => !item.completed)
        .forEach((item) => {
          item.completed = !item.completed;
        });
    }
  }

  createNewItem(input: string) {
    if (input === '') {
      return;
    }

    // this.todoList.push({
    //   id: uuidv4(),
    //   title: input,
    //   completed: false,
    // });

    this.http
      .post<Todo>('https://jsonplaceholder.typicode.com/todos', {
        id: uuidv4(),
        title: input,
        completed: false,
      })
      .subscribe(
        (data) => {
          console.log('Create item successfully!', data);
        },
        (error) => {
          console.error('Error create item', error);
        }
      );
  }

  deleteItem(id: string) {
    const deleteIndex = this.todoList.map((item) => item.id).indexOf(id);
    this.todoList.splice(deleteIndex, 1);
  }

  updateItem(updateValue: Todo) {
    const index = this.todoList.findIndex((item) => item.id === updateValue.id);
    this.todoList[index] = updateValue;
  }

  deleteAllCheckedItems() {
    this.todoList = this.todoList.filter((item) => !item.completed);
  }
}
