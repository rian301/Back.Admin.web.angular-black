import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PendencyStatusEnum } from 'src/app/enums/pendency-status.enum.ts';
import { SentStatusEnum } from 'src/app/enums/sent-status.enum.ts';
import { OnDestroySubscriptions } from 'src/app/helpers/detroy-subscriptions.helper';
import { CustomerListModel, CustomerModel } from 'src/app/models';
import { AwardModel } from 'src/app/models/award.model';
import { DropDownModel } from 'src/app/models/dropdown.model';
import { SentModel } from 'src/app/models/sent.model';
import { CustomerService, NavigationService, UtilitariosService } from 'src/app/services';
import { AwardService } from 'src/app/services/admin/award.service';
import { SentService } from 'src/app/services/admin/sent.service';
import { UtilService } from 'src/app/services/admin/util.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent extends OnDestroySubscriptions implements OnInit {
  id: number = null;
  form: FormGroup;
  statusEnum: typeof SentStatusEnum = SentStatusEnum;
  title: string = "Novo Envio";
  loading: boolean = false;
  statusCode: number;
  startDate: Date = new Date();
  statusDocFilter: number = 0;
  awards: AwardModel[] = [];
  customers: CustomerListModel[] = [];
  filterText: string = null;
  search: string = null;
  cepDetected: boolean = true;

  constructor(
    private _formbuilder: FormBuilder,
    private _utilService: UtilService,
    private _snackBar: MatSnackBar,
    private _utilitariosService: UtilitariosService,
    private _sentService: SentService,
    private route: ActivatedRoute,
    private _navigationService: NavigationService,
    private _awardService: AwardService,
    private _customerService: CustomerService
  ) {
    super();

    this.form = this._formbuilder.group({
      searchCustomer: [],
      id: [''],
      name: [''],
      awardId: [null, [Validators.required]],
      customerId: [],
      dateRequest: [''],
      dateSend: [''],
      dateReceiving: [''],
      requester: [''],
      campaign: [''],
      statusDescription: [''],
      email: [''],
      code: [''],
      status: [''],
      phone: [''],
      zipCode: [''],
      street: [''],
      number: [''],
      complement: [''],
      district: [''],
      city: [''],
      state: ['']
    });
  }

  searchCustomer(event) {
    // Nome
    setTimeout(() => {
      this.filterText = event;
      if (this.filterText.length >= 3 || this.filterText.length == 0) {
        this.loadCustomers();
      }
    }, 400);
  }

  ngOnInit(): void {
    this.loadAwardList();
    this.loadCustomers();
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        this.id = params['id'];
        if (this.id != null)
          this.load();
      })
    );
  }

  loadCustomers() {
    this.loading = true;
    this._customerService
      .get(
        0,
        25,
        this.filterText,
        null
      )
      .toPromise()
      .then((ret) => {
        this.loading = false;
        this.customers = ret.content;
      })
      .catch((error) => {
        this.loading = false;
        this._utilitariosService.HttpErrorReturn(error, (msg, ret) => {
          this._utilitariosService.SnackAlert(msg, "error");
        });
      });
  }

  loadAwardList() {
    this.loading = true;
    this._awardService
      .get()
      .toPromise()
      .then((resp: AwardModel[]) => {
        this.awards = resp;
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        this._utilitariosService.HttpErrorReturn(error, (msg, ret) => {
          this._utilitariosService.SnackAlert(msg, 'error');
        });
      });
  }

  load() {
    this._sentService.find(this.id)
      .toPromise()
      .then((ret) => {
        this.form.patchValue(ret);
        this.validStatus(ret.status);
        this.title = "Editar Envio";
        this.form.controls.searchCustomer?.setValue(ret?.customerId);
      })
      .catch(error => {
        this.loading = false;
        this._utilitariosService.HttpErrorReturn(error, (msg, ret) => {
          this._utilitariosService.SnackAlert(msg, 'error');
        });
      });
  }

  save() {
    if (!this.form.valid) {
      console.log(this.form);
      this._utilService.FormValidate(this.form);
      return;
    }
    this.form.controls["customerId"].setValue(this.search);

    this.loading = true;
    let model = <SentModel>this.form.value;
    this._sentService.save(model)
      .toPromise()
      .then((resp: SentModel) => {
        if (resp != null) {
          this.loading = false;
          this._snackBar.open(model.id > 0 ? `Envio atualizado com sucesso!` : `Envio salvo com sucesso!`);
          this.id = resp.id;
          this._navigationService.sentList();
        }
      })
      .catch(error => {
        this.loading = false;
        this._utilitariosService.HttpErrorReturn(error, (msg, ret) => {
          this._utilitariosService.SnackAlert(msg, 'error');
        });
      });
  }

  validStatus(statusCode: number) {
    this.statusCode = statusCode;
  }

  cancel() {
    this._navigationService.sentList();
  }

  searchCep(event) {
    let cep = event.target.value;
    if (cep.length === 9) {
      this._utilitariosService
        .BuscarCep(event.target.value)
        .toPromise()
        .then((ret) => {
          this.form.patchValue({
            city: ret.localidade,
            state: ret.uf,
            street: ret.logradouro,
            district: ret.bairro
          });
        })
        .catch((error) => {
          this.cepDetected = false;
          console.error(error);
        });
    }
  }

  IsNullOrUndefined(value: any) {
    return value == null || value == undefined;
  }
}