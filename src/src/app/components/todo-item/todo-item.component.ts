import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) TodoItem!: Todo;
  @Output("deleteFunction") deleteItemEvent = new EventEmitter<string>();
  @Output("updateFunction") updateItemEvent = new EventEmitter<string>();

  editable: boolean = false;

  DeleteItem() {
    this.deleteItemEvent.emit(this.TodoItem.id);
  }

  ToggleEdit() {
    this.editable = !this.editable;
  }

  UpdateItem() {
    this.ToggleEdit();
    this.updateItemEvent.emit(this.TodoItem.id);
  }
}
