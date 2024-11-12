import { CommonModule } from '@angular/common';
import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { TodoListComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-panel',
  standalone: true,
  imports: [TodoListComponent, CommonModule, FormsModule],
  templateUrl: './todo-panel.component.html',
})
export class TodoPanelComponent implements OnChanges {
  // @Input({ required: true }) todoList!: Todo[];
  // @Output() todoListChange = new EventEmitter<Todo[]>();

  todoList: Todo[] = [];
  inputTodo: string = '';
  currentTab: string = 'all';

  todoService: TodoService = inject(TodoService);

  constructor(private todoservice: TodoService) {
    this.todoList = this.todoService.getTodoList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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
