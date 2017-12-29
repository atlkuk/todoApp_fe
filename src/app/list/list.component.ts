import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGlobals } from '../../shared/app.globals';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private _global: AppGlobals) { }

  todos: any = null;

  list: any = {title: ''};

  loadTodos(id): void {
    this.http.get(this._global.baseAppUrl + 'mylists/' + id + '/items').subscribe(data => {
      // Read the result field from the JSON response.
      this.todos = data;
    });
    console.log(id);
  }

  getListDetails(id): void {
    this.http.get(this._global.baseAppUrl + 'mylists/' + id).subscribe(data => {
      // Read the result field from the JSON response.
      this.list = data;
      this._global.list = data;
    });
  }

  deleteTodo(todo): void {
    this.http.delete(this._global.baseAppUrl + 'items/' + todo.id).subscribe(data => {
      this.loadTodos(todo.list_id);
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getListDetails(id);
    this.loadTodos(id);
  }

}
