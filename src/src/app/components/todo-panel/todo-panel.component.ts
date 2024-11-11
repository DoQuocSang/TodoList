import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { Tab } from '../../models/tab';
import { Todo } from '../../models/todo';
import { TodoListComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-panel',
  standalone: true,
  imports: [TodoListComponent, CommonModule, FormsModule],
  templateUrl: './todo-panel.component.html',
})
export class TodoPanelComponent implements OnChanges {
  @Input({ required: true }) todoList!: Todo[];
  @Output() todoListChange = new EventEmitter<Todo[]>();
  inputTodo: string = '';
  currentTab: string = 'all';

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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

  changecurrentTab(tab: string) {
    this.currentTab = tab.trim().toLocaleLowerCase();
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

  createNewItem() {
    this.todoList.push({
      id: uuidv4(),
      name: this.inputTodo,
      status: false,
    });

    this.inputTodo = '';
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
    this.todoListChange.emit(this.todoList);
  }

  toggleAllActiveItems() {
    this.todoList = this.todoList.filter((item) => !item.status);
  }

  addItem() {}
}
