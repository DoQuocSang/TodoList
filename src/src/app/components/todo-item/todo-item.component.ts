import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) TodoItem!: Todo;
  @Output('deleteFunction') deleteItemEvent = new EventEmitter<string>(); // delete by id
  @Output('updateFunction') updateItemEvent = new EventEmitter<Todo>(); // update by obj

  editable: boolean = false;
  inputName: string = '';

  ngOnInit(): void {
    this.inputName = this.TodoItem.name;
  }

  deleteItem() {
    this.deleteItemEvent.emit(this.TodoItem.id);
  }

  toggleEdit() {
    this.editable = !this.editable;
  }

  updateItem() {
    // console.log((e.target as HTMLParagraphElement).textContent);
    this.toggleEdit();
    this.TodoItem.name = this.inputName;
    this.updateItemEvent.emit(this.TodoItem);
  }
}
