import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
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
export class TodoListComponent implements OnChanges {
  @Input({ required: true }) todoList!: Todo;
  // @Output('deleteFunction') deleteItemEvent = new EventEmitter<string>(); // delete by id
  // @Output('updateFunction') updateItemEvent = new EventEmitter<Todo>(); // update by obj

  editable: boolean = false;
  inputName: string = '';

  todoService: TodoService = inject(TodoService);

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.inputName = this.todoList.name;
  }

  toggleEdit() {
    this.editable = !this.editable;
  }

  handleUpdateItem() {
    // console.log((e.target as HTMLParagraphElement).textContent);
    this.toggleEdit();
    this.todoList.name = this.inputName;
    this.todoService.updateItem(this.todoList);
  }

  handleDeleteItem() {
    this.todoService.deleteItem(this.todoList.id);
  }
}
