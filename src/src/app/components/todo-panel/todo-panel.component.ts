import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Tab } from '../../models/tab';
import { TodosStore } from '../../store/todos.store';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-panel',
  standalone: true,
  imports: [TodoItemComponent, CommonModule, FormsModule],
  templateUrl: './todo-panel.component.html',
  providers: [TodosStore],
})
export class TodoPanelComponent {
  // @Input({ required: true }) todoList!: Todo[];
  // @Output() todoListChange = new EventEmitter<Todo[]>();

  inputTodo: string = '';

  todosStore: TodosStore = inject(TodosStore);

  vm$ = this.todosStore.vm$;

  changeCurrentTab(filterType: Tab) {
    this.todosStore.setTabFilter(filterType);
  }

  handleCreateItem() {
    this.todosStore.addItem(this.inputTodo);
    this.inputTodo = '';
  }

  handleDeleteAllCheckedItems() {
    this.todosStore.deleteAllCheckedItems();
  }
}
