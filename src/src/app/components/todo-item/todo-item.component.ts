import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) todoItem!: Todo;
  // @Output('deleteFunction') deleteItemEvent = new EventEmitter<string>(); // delete by id
  // @Output('updateFunction') updateItemEvent = new EventEmitter<Todo>(); // update by obj

  editable: boolean = false;
  inputName: string = '';

  todoService: TodoService = inject(TodoService);

  ngOnInit(): void {
    this.inputName = this.todoItem.title;
  }

  toggleEdit() {
    this.editable = !this.editable;
  }

  handleUpdateItem() {
    // console.log((e.target as HTMLParagraphElement).textContent);
    this.toggleEdit();
    this.todoItem.title = this.inputName;
    this.todoService.updateItem(this.todoItem);
  }

  handleDeleteItem() {
    this.todoService.deleteItem(this.todoItem.id);
  }
}
