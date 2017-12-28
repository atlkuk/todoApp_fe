import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  todos: any = null;

  list: any = null;

  private baseUrl = 'http://localhost:8000/api/';

  loadTodos(id): void {
    this.http.get(this.baseUrl + 'mylists/' + id + '/items').subscribe(data => {
      // Read the result field from the JSON response.
      this.todos = data;
    });
    console.log(id);
  }

  getListDetails(id): void {
    this.http.get(this.baseUrl + 'mylists/' + id).subscribe(data => {
      // Read the result field from the JSON response.
      this.list = data;
      console.log(data);
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getListDetails(id);
    this.loadTodos(id);
  }

}
