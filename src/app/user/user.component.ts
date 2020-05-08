import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort  } from '@angular/material';
import { ApiService } from 'src/app/core/api.service';
import { CreatUserComponent } from './creat-user/creat-user.component';
import {MatDialog} from '@angular/material/dialog';





export interface UserData {
  name: string;
  address: string;
  city: string;
  state: string;
}

export interface User {
  name: string;
  address: string;
  city: string;
  state: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'city', 'state'];
  dataSource: MatTableDataSource<UserData>;
  total: number;

  usersList = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private apiService: ApiService,
              private _dialog: MatDialog,
        
    ) { 

  }

  ngOnInit() {
    this.apiService.getUsers().subscribe(users => {
      this.usersList = users;
      this.total = users.length;

      const userL = Array.from({length: users.length}, (_, k) => createNewUser(users[k]));
      this.dataSource = new MatTableDataSource(userL.reverse());
      this.dataSource.paginator = this.paginator;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  creatUser(): void {
    let creatUserDialog;
    creatUserDialog = this._dialog.open(CreatUserComponent, {
        width: "50%",
    });

    creatUserDialog.afterClosed().subscribe(result => {
        if (result) {
          location.reload();

        }
    });
}

}

/** Builds and returns a new User. */
function createNewUser(vetorT: any): UserData {


  return {
    name: vetorT["name"],
    address: vetorT["address"],
    city: vetorT["city"],
    state: vetorT["state"]
  };
}
