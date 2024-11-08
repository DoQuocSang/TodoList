import { Component, Input } from '@angular/core';

import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) TodoItem!: Todo;
}
