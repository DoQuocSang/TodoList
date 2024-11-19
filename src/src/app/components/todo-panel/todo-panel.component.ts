import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  todoList: Todo[] = [];
  inputTodo: string = '';
  currentTab: string = 'all';

  todoService: TodoService = inject(TodoService);

  constructor() {
    this.todoList = this.todoService.getTodoList();
  }

  ngOnInit() {
    this.todoService.loadData();
  }

  changecurrentTab(tab: string) {
    this.currentTab = tab.trim().toLocaleLowerCase();
  }

  handleCreateItem() {
    this.todoService.createNewItem(this.inputTodo);
    this.inputTodo = '';
  }

  handleDeleteAllCheckedItems() {
    this.todoService.deleteAllCheckedItems();
  }
}
