import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DinamicTableModel, DinamicTableItemModel } from 'src/app/components/dinamic-table/dinamic-table.model';
import { PaginatorHelper } from 'src/app/helpers/paginator.helper';
import { DropDownModel } from 'src/app/models/dropdown.model';
import { SentModel } from 'src/app/models/sent.model';
import { NavigationService, UtilitariosService } from 'src/app/services';
import { AwardService } from 'src/app/services/admin/award.service';
import { SentService } from 'src/app/services/admin/sent.service';
import { AwardComponent } from '../award/award.component';

@Component({
  selector: 'app-sent-list',
  templateUrl: './sent-list.component.html',
  styleUrls: ['./sent-list.component.scss']
})
export class SentListComponent implements OnInit {
  title: string = "Envios";
  // Paginação
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  paginatorHelper: typeof PaginatorHelper = PaginatorHelper;
  displayedColumns: string[] = ['customerName', 'mentoredName', 'awardName', 'dateRequest', 'dateSend', 'status', 'action'];
  columnsExport: string[] = ['awardName', 'customerName', 'district', 'street', 'number', 'complement', 'zipCode', 'dateSendExport', 'campaign', 'statusDescription'];
  columnsExportName: string[] = ['Prêmio', 'Aluno', 'Bairro', 'Rua', 'Número', 'Complemento', 'CEP', 'Data de envio', 'Campanha', 'Status'];
  filterProviderValue: number;
  loading: boolean = false;
  dataSource = new MatTableDataSource();
  sents: DropDownModel[] = [];
  status: string[] = [];
  filterStatus: string = "";

  constructor(
    private _utilitariosService: UtilitariosService,
    private _sentService: SentService,
    private _navigationService: NavigationService,
    private _datePipe: DatePipe,

  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.sort != null)
      this.sort.sortChange.subscribe(() => {
        if (this.paginator)
          this.paginator.firstPage();
      });
  }

  ngOnInit(): void {
    this.load();
    this.filterPredicate();
  }

  searchFilter() {
    this.dataSource.filter = Math.random().toString();
  }

  load() {
    this.loading = true;
    this._sentService.get()
      .toPromise()
      .then((ret) => {
        this.dataSource.data = ret;
        this.sents = [];
        this.status = [];
        // Carrega os selects dos filtros
        ret.forEach(item => {
          if (this.sents.findIndex(f => f.id == item.id) < 0)
            this.sents.push(new DropDownModel(item.id, item.customerName));

          if (!this.status.includes(item.statusDescription))
            this.status.push(item.statusDescription);

          item.dateRequestExport = this._datePipe.transform(item.dateRequest?.toString(), 'dd/MM/yyyy');
          item.dateSendExport = this._datePipe.transform(item.dateSend?.toString(), 'dd/MM/yyyy');
          item.dateReceivingExport = this._datePipe.transform(item.dateReceiving?.toString(), 'dd/MM/yyyy');
        });
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        this._utilitariosService.HttpErrorReturn(error, (msg, ret) => {
          this._utilitariosService.SnackAlert(msg, 'error');
        });
      });
  }

  new() {
    this._navigationService.sentNew();
  }

  edit(model: SentModel) {
    this._navigationService.sentEdit(model.id);
  }

  filterPredicate() {
    // filterPredicate É a função do matTable que pesquisa em todas as colunas.
    this.dataSource.filterPredicate = (data: SentModel) => {

      let filterPendency = () => {
        return this.filterProviderValue == null || this.filterProviderValue == 0 ? true : data.id == this.filterProviderValue;
      };

      let filterStatus = () => {
        return this.filterStatus == null || this.filterStatus == ""
          ? true
          : data.statusDescription == this.filterStatus;
      };

      return filterPendency() && filterStatus();
    };
  }

}
