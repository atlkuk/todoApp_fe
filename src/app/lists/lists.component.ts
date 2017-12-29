import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../shared/app.globals';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})

export class ListsComponent implements OnInit {

  constructor(private http: HttpClient, private _global: AppGlobals) { }

  lists: any = null;

  loadLists(): void {
    this.http.get(this._global.baseAppUrl + 'mylists').subscribe(data => {
      // Read the result field from the JSON response.
      this._global.lists = data;
      this.lists = this._global.lists;
    });
  }

  ngOnInit() {
    this.loadLists();
  }

}
