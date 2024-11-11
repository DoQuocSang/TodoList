import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { loremIpsum } from 'lorem-ipsum';
import { v4 as uuidv4 } from 'uuid';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {
  TodoPanelComponent,
} from './components/todo-panel/todo-panel.component';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TodoPanelComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'TodoList';

  todoList: Todo[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      this.todoList.push({
        id: uuidv4(),
        name: loremIpsum(),
        status: i % 2 === 0,
      });
    }
  }
}
