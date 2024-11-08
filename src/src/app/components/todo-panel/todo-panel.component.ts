import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Todo } from '../../models/todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-panel',
  standalone: true,
  imports: [TodoItemComponent, CommonModule],
  templateUrl: './todo-panel.component.html',
})
export class TodoPanelComponent {
  TodoList: Todo[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      this.TodoList.push({
        id: 1,
        name: 'This is demo',
        status: false,
      });
    }
  }

  formatNumber(num: number) {
    return num > 10 ? num : '0' + num;
  }

  removeItem() {}

  addItem() {}
}
