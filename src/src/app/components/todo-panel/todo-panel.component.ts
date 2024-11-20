import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { Tab } from '../../models/tab';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
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

  todoService: TodoService = inject(TodoService);
  todosStore: TodosStore = inject(TodosStore);

  filteredItems$: Observable<Todo[]> = this.todoService.filteredItems$;
  vm$ = this.todosStore.vm$;

  ngOnInit() {
    this.todosStore.loadData();
    this.vm$.subscribe((item) => console.log(item));
  }

  changeCurrentTab(filterType: Tab) {
    this.todoService.setTabFilter(filterType);
  }

  handleCreateItem() {
    this.todoService.createNewItem(this.inputTodo);
    this.inputTodo = '';
  }

  handleDeleteAllCheckedItems() {
    this.todoService.deleteAllCheckedItems();
  }
}
