import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SellersService } from 'src/app/shared/services/api/sellers.service';

@Component({
  selector: 'app-page-sellings-tickets',
  templateUrl: './page-sellings-tickets.component.html',
  styleUrls: ['./page-sellings-tickets.component.scss']
})
export class PageSellingsTicketsComponent implements OnInit {

  displayedDepartmentColumns: string[] = ['type', 'clientName', 'channel', 'zip', 'date', 'price', 'sellerName', 'workGroup'];
  sellingInformationsAll: any[] = [];
  sellingInformationsAmountTickets!: number;

  constructor(
    private sellersService: SellersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sellersService.getAllFinishSellingsInformationTickets().subscribe(data => {
      console.log('data ?', data)
      this.sellingInformationsAll = data;
      this.sellingInformationsAmountTickets = this.sellingInformationsAll.length;
    });
  }

}
