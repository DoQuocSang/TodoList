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

import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
})
export class TodoListComponent implements OnChanges {
  @Input({ required: true }) todoList!: Todo;
  @Output('deleteFunction') deleteItemEvent = new EventEmitter<string>(); // delete by id
  @Output('updateFunction') updateItemEvent = new EventEmitter<Todo>(); // update by obj

  editable: boolean = false;
  inputName: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.inputName = this.todoList.name;
  }

  deleteItem() {
    this.deleteItemEvent.emit(this.todoList.id);
  }

  toggleEdit() {
    this.editable = !this.editable;
  }

  updateItem() {
    // console.log((e.target as HTMLParagraphElement).textContent);
    this.toggleEdit();
    this.todoList.name = this.inputName;
    this.updateItemEvent.emit(this.todoList);
  }
}
