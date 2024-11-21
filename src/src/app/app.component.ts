import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoPanelComponent } from './components/todo-panel/todo-panel.component';
import { TodosStore } from './store/todos.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TodoPanelComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'TodoList';

  todosStore: TodosStore = inject(TodosStore);

  ngOnInit() {
    this.todosStore.loadData();
  }
}
