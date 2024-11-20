import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { Tab } from '../../models/tab';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-panel',
  standalone: true,
  imports: [TodoItemComponent, CommonModule, FormsModule],
  templateUrl: './todo-panel.component.html',
})
export class TodoPanelComponent {
  // @Input({ required: true }) todoList!: Todo[];
  // @Output() todoListChange = new EventEmitter<Todo[]>();

  inputTodo: string = '';

  todoService: TodoService = inject(TodoService);
  filteredItems$: Observable<Todo[]> = this.todoService.filteredItems$;

  ngOnInit() {
    this.todoService.loadData();
  }

  // get filteredItems() {
  //   return this.todoService.filteredItems;
  // }

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
