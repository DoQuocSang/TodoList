import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { loremIpsum } from 'lorem-ipsum';
import { v4 as uuidv4 } from 'uuid';

import { Tab } from '../../models/tab';
import { Todo } from '../../models/todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-panel',
  standalone: true,
  imports: [TodoItemComponent, CommonModule, FormsModule],
  templateUrl: './todo-panel.component.html',
})
export class TodoPanelComponent {
  TodoList: Todo[] = [];
  InputTodo: string = '';
  CurrentTab: string = 'all';

  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      this.TodoList.push({
        id: uuidv4(),
        name: loremIpsum(),
        status: i % 2 === 0,
      });
    }
  }

  getItemsLeft() {
    return this.TodoList.filter((item) => !item.status).length;
  }

  checkCompletedItems() {
    return this.TodoList.filter((item) => item.status).length > 0;
  }

  changeCurrentTab(tab: string) {
    this.CurrentTab = tab.trim().toLocaleLowerCase();
  }

  getTotoListByTab(tab: string) {
    switch (tab) {
      case Tab.Completed: {
        return this.TodoList.filter((item) => item.status);
      }
      case Tab.Active: {
        return this.TodoList.filter((item) => !item.status);
      }
      case Tab.All: {
        return this.TodoList;
      }
      default: {
        return this.TodoList;
      }
    }
  }

  createNewItem() {
    this.TodoList.push({
      id: uuidv4(),
      name: this.InputTodo,
      status: false,
    });

    this.InputTodo = '';
  }

  deleteItem(id: string) {
    const deleteIndex = this.TodoList.map((item) => item.id).indexOf(id);
    this.TodoList.splice(deleteIndex, 1);
  }

  updateItem(updateValue: Todo) {
    const index = this.TodoList.findIndex((item) => item.id === updateValue.id);
    this.TodoList[index] = updateValue;
  }

  deleteAllCheckedItems() {
    this.TodoList = this.TodoList.filter((item) => !item.status);
  }

  toggleAllActiveItems() {
    this.TodoList = this.TodoList.filter((item) => !item.status);
  }

  addItem() {}
}
