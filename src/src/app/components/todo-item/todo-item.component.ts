import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Todo } from '../../models/todo';
import { TodosStore } from '../../store/todos.store';

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

  todosStore: TodosStore = inject(TodosStore);

  ngOnInit(): void {
    this.inputName = this.todoItem.title;
  }

  toggleEdit() {
    this.editable = !this.editable;
  }

  toggleItem() {
    this.todosStore.toggleItem(this.todoItem.id);
  }

  handleUpdateItem() {
    this.toggleEdit();
    this.todoItem.title = this.inputName;
    this.todosStore.updateItem(this.todoItem);
  }

  handleDeleteItem() {
    this.todosStore.deleteItem(this.todoItem.id);
  }
}
