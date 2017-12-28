import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})

export class ListsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  lists: any = null;

  private baseUrl = 'http://localhost:8000/api/';

  loadLists(): void {
    this.http.get(this.baseUrl + 'mylists').subscribe(data => {
      // Read the result field from the JSON response.
      this.lists = data;
    });
  }

  ngOnInit() {
    this.loadLists();
  }

}
