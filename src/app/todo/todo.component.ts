import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppGlobals } from '../../shared/app.globals';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo: any = {title: '', expire_date: ''};

  list: any = null;

  lists: any = null;

  id_list: string = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private _global: AppGlobals) { }

  getTodoDetails(id): void {
    this.http.get(this._global.baseAppUrl + 'items/' + id).subscribe(data => {
      // Read the result field from the JSON response.
      this.todo = data;
      this.todo.expire_date = new Date(this.todo.expire_date);
      this.list = {'id': this.todo.list_id};
      // console.log(this.todo);
    });
  }

  saveTodo(): void {
    const timezone = this.todo.expire_date.getTimezoneOffset() * 60000;
    this.todo.expire_date = (new Date((this.todo.expire_date - timezone))).toISOString().slice(0, 19).replace('T', ' ');
    console.log(this.todo);
    // se non ho l'id creo nuovo todo
    if (!this.route.snapshot.paramMap.get('id_todo')) {
      this.http.post(this._global.baseAppUrl + 'items', this.todo).subscribe(data => {
        this.router.navigateByUrl('/list/' + this.todo.list_id);
      });
    }else { // altrimenti update
      this.http.patch(this._global.baseAppUrl + 'items/' + this.todo.id, this.todo).subscribe(data => {
        this.router.navigateByUrl('/list/' + this.todo.list_id);
      });
    }
  }

  deleteTodo(): void {
    this.http.delete(this._global.baseAppUrl + 'items/' + this.todo.id).subscribe(data => {
      this.router.navigateByUrl('/list/' + this.list.id);
    });
  }

  ngOnInit() {
    this.lists = JSON.parse(localStorage.getItem('lists'));

    const id = this.route.snapshot.paramMap.get('id_todo');
    if (this.route.snapshot.paramMap.get('id_todo')) {
      this.getTodoDetails(id);
    }
  }

}
