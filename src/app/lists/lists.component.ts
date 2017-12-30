import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGlobals } from '../../shared/app.globals';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})

export class ListsComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private _global: AppGlobals) { }

  todos: any = null;

  list: any = { title: '' };

  lists: any = null;

  now: any = Date.now();

  ids: Array<any> = [];

  loadTodos(): void {
    this.http.post(this._global.baseAppUrl + 'mylists/items', { 'ids': this.ids }).subscribe(data => {
      // Read the result field from the JSON response.
      this.todos = data;
    });
  }

  deleteTodo(todo): void {
    this.http.delete(this._global.baseAppUrl + 'items/' + todo.id).subscribe(data => {
      this.loadTodos();
    });
  }

  doneTodo(todo): void {
    todo.done = todo.done === true ? 1 : 0;
    console.log(todo.done);
    this.http.patch(this._global.baseAppUrl + 'items/' + todo.id, todo).subscribe();
  }

  loadLists(): void {
    this.http.get(this._global.baseAppUrl + 'mylists').subscribe(data => {
      // Read the result field from the JSON response.
      localStorage.setItem('lists', JSON.stringify(data));
      this.lists = data;
    });
  }

  ngOnInit() {
    this.loadLists();
    this.loadTodos();
  }

}
