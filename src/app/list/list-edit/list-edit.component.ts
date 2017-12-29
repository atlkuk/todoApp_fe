import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppGlobals } from '../../../shared/app.globals';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  list: any = { title: '', expire_date: '' };

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private _global: AppGlobals) { }

  getTodoDetails(id): void {
    this.http.get(this._global.baseAppUrl + 'mylists/' + id).subscribe(data => {
      // Read the result field from the JSON response.
      this.list = data;
    });
  }

  saveList(): void {
    // se non ho l'id creo nuovo todo
    if (this.list.title) {
      if (!this.route.snapshot.paramMap.get('id_list')) {
        this.http.post(this._global.baseAppUrl + 'mylists', this.list).subscribe(data => {
          this.router.navigateByUrl('/list/' + this.list.id);
        });
      } else { // altrimenti update
        this.list.user_id = 1;
        this.http.patch(this._global.baseAppUrl + 'mylists/' + this.list.id, this.list).subscribe(data => {
          this.router.navigateByUrl('/lists');
        });
      }
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id_list');
    if (this.route.snapshot.paramMap.get('id_list')) {
      this.getTodoDetails(id);
    }
  }

}
