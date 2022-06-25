import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchDataFromApiService } from '../services/fetch-data-from-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  public data?: any;
  public rawDataHeader: string[] = [
    'FIPS',
    'Admin2',
    'Province_State',
    'Country_Region',
    'Last_Update',
    'Lat',
    'Long_',
    'Confirmed',
    'Deaths',
    'Recovered',
    'Active',
    'Combined_Key',
    'Incident_Rate',
    'Case_Fatality_Ratio',
  ];
  public rawData?: any;
  dataSource!: MatTableDataSource<any>;

  constructor(private _fetchDataFromAPI: FetchDataFromApiService) {}

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort
  ngOnInit() {
    this._fetchDataFromAPI.getData().subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.rawData = this.data['rawData'];
      console.log(this.rawData);
      this.dataSource = new MatTableDataSource(this.rawData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.matSort;

    });
  }
}
