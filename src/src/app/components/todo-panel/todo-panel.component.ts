import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

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
  InputTodo: string = "";

  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      this.TodoList.push({
        id: uuidv4(),
        name: 'This is demo',
        status: i%2 === 0,
      });
    }
  }

  formatNumber(num: number) {
    return num >= 10 ? num : '0' + num;
  }

  createNewItem() {
     this.TodoList.push({
      id: uuidv4(),
      name: this.InputTodo,
      status: false,
   });

   this.InputTodo = "";
  }

  deleteItem(id: string) {
    const deleteIndex = this.TodoList.map(item => item.id).indexOf(id);
    this.TodoList.splice(deleteIndex, 1)
  }

  updateItem(id: string) {
   alert("update"+ id)
  }

  deleteAllCheckedItems() {
    this.TodoList = this.TodoList.filter(item => !item.status)
  }

  toggleAllActiveItems() {
    this.TodoList = this.TodoList.filter(item => !item.status)
  }

  addItem() {}
}
