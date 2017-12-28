import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  private baseUrl = 'http://localhost:8000/api/';

  getTodoDetails(id, idList): void {
    this.http.get(this.baseUrl + 'mylists').subscribe(data => {
      // Read the result field from the JSON response.
      this.lists = data;
    });
    this.http.get(this.baseUrl + 'mylists/' + idList).subscribe(data => {
      // Read the result field from the JSON response.
      this.list = data;
    });
    this.http.get(this.baseUrl + 'items/' + id).subscribe(data => {
      // Read the result field from the JSON response.
      this.todo = data;
      this.todo.expire_date = new Date(this.todo.expire_date);
      // console.log(this.todo);
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id_todo');
    this.id_list = this.route.snapshot.paramMap.get('id_list');
    this.getTodoDetails(id, this.id_list);
  }

}
