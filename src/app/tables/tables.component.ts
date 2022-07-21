import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IRootObject } from 'src/app/Interfaces/rootObject';
import { FormControl } from '@angular/forms';
import { FetchDataFromApiService } from 'src/app/services/fetch-data-from-api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit,OnDestroy {
  newSubscription?: Subscription;
  public data?: IRootObject;
  public rawData?: any;
  public dataSource!: MatTableDataSource<any>;
  private paginator!: MatPaginator;
  private sort!: MatSort;
  public additionalHeader: Array<string> = [];
  public deSelectionHeader: Array<string> = [];
  public disableSelect = new FormControl({ value: '', disabled: true });
  public deSelectorFlag: boolean = false;
  public headings = new FormControl('');
  public deHeadings = new FormControl('');

  public headers: Array<any> = [
    'Admin2',
    'Province_State',
    'Last_Update',
    'Confirmed',
    'Deaths',
    'Recovered',
    'Active',
    'Combined_Key',
    'Incident_Rate',
  ];
  public rawDataHeader: string[] = [
    'FIPS',
    'Country_Region',
    'Lat',
    'Long_',
    'Case_Fatality_Ratio',
  ];
  public lenInitial = this.rawDataHeader.length;
  constructor(private _fetchDataFromAPI: FetchDataFromApiService) { }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  ngOnInit() {
    this.newSubscription=this._fetchDataFromAPI.getData().subscribe((res) => {
      this.data = res;
      this.rawData = this.data['rawData'];
      this.dataSource = new MatTableDataSource(this.rawData);
    });
  }
  checkColoumns() {
    this.additionalHeader.forEach((e) => {
      if (!this.rawDataHeader.includes(e)) {
        this.rawDataHeader.push(e);
        this.deSelectorFlag = true;
        this.deSelectionHeader.push(e);
      }
      console.log('de selection:', this.deSelectionHeader);
    });
  }

  addColoumns() {
    console.log('on add click', this.additionalHeader);
    this.checkColoumns();
    if (!(this.additionalHeader.join() === this.deSelectionHeader.join())) {
      console.log('hello');
      this.rawDataHeader = this.rawDataHeader.slice(0, this.lenInitial);
      console.log(this.rawDataHeader);
      this.checkColoumns();
    }
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSelectOption(event: any, selected: boolean) {
    console.log(event);

    if (selected) {
      console.log('present header values', this.headings.value);
      this.additionalHeader.push(
        (event.currentTarget as HTMLInputElement).innerText
      );
      console.log('additional headers', this.additionalHeader);
    } else {
      const index = this.additionalHeader.indexOf(
        (event.currentTarget as HTMLInputElement).innerText
      );
      this.additionalHeader.splice(index, 1);
      console.log('new additional header', this.additionalHeader);
    }
  }
  ngOnDestroy(): void {
    this.newSubscription?.unsubscribe();
    
  }
}
