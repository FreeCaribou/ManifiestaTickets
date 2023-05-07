import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { SellersService } from 'src/app/shared/services/api/sellers.service';
import { simpleCompare } from 'src/app/shared/utils/simple-compare.utils';
import { sortData } from 'src/app/shared/utils/sort-data.utils';

@Component({
  selector: 'app-page-departments',
  templateUrl: './page-departments.component.html',
  styleUrls: ['./page-departments.component.scss']
})
export class PageDepartmentsComponent implements OnInit {

  displayedDepartmentColumns: string[] = ['departmentId', 'department', 'details', 'quantity'];
  sellerDepartmentInformationsAll: any[] = [];
  sellingInformationsAmountTickets!: number;
  sortedData: any[] = [];

  constructor(
    private sellersService: SellersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sellersService.getAllDepartmentSellingInformation().subscribe(data => {
      this.sellerDepartmentInformationsAll = data.data;
      this.sellingInformationsAmountTickets = data.totalAmountTicket;
      this.sortedData = this.sellerDepartmentInformationsAll.slice();
    });
  }

  sortingData(sort: Sort) {
    this.sortedData = sortData(sort, this.sellerDepartmentInformationsAll);
  }

  details(element: any) {
    const dialogRef = this.dialog.open(DepartmentSellingModal, {
      data: element,
    });
  }

}

@Component({
  selector: 'app-department-selling-modal',
  templateUrl: 'department-selling-modal.html',
})
export class DepartmentSellingModal {
  constructor(
    public dialogRef: MatDialogRef<DepartmentSellingModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}
