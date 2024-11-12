import { Injectable } from '@angular/core';

import { loremIpsum } from 'lorem-ipsum';
import { v4 as uuidv4 } from 'uuid';

import { Tab } from '../models/tab';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: Todo[] = [];

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.todoList.push({
        id: uuidv4(),
        name: loremIpsum(),
        status: i % 2 === 0,
      });
    }
  }

  getTodoList(): Todo[] {
    return this.todoList;
  }

  isEmptyTodoList(): boolean {
    return this.todoList.length === 0;
  }

  getNumberItemsLeft() {
    return this.todoList.filter((item) => !item.status).length;
  }

  getNumberItemsCompleted() {
    return this.todoList.filter((item) => item.status).length;
  }

  checkCompletedItems() {
    return this.todoList.filter((item) => item.status).length > 0;
  }

  getTotoListByTab(tab: string) {
    switch (tab) {
      case Tab.Completed: {
        return this.todoList.filter((item) => item.status);
      }
      case Tab.Active: {
        return this.todoList.filter((item) => !item.status);
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
        item.status = !item.status;
      });
    } else {
      this.todoList
        .filter((item) => !item.status)
        .forEach((item) => {
          item.status = !item.status;
        });
    }
  }

  createNewItem(input: string) {
    if (input === '') {
      return;
    }

    this.todoList.push({
      id: uuidv4(),
      name: input,
      status: false,
    });
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
    this.todoList = this.todoList.filter((item) => !item.status);
  }
}
