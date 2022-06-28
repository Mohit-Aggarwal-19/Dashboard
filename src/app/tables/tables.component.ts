import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FetchDataFromApiService } from '../services/fetch-data-from-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IRootObject } from '../Interfaces/rootObject';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit,AfterViewInit {
  public isDataPresent:boolean=false;
  public data?: IRootObject;
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
  public dataSource!: MatTableDataSource<any>;
  private paginator!: MatPaginator;
  private sort!: MatSort;

  constructor(private _fetchDataFromAPI: FetchDataFromApiService) {}

  // @ViewChild('paginator') paginator!: MatPaginator;
  // @ViewChild(MatSort,{static:false}) matSort!:MatSort

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

 
  ngOnInit() {
   
  }
  ngAfterViewInit(): void {
    this._fetchDataFromAPI.getData().subscribe((res) => {
      this.data = res;
      if(this.data)
      {
        this.isDataPresent=true;
      }
      console.log(this.data);
      this.rawData = this.data['rawData'];
      console.log(this.rawData);
      this.dataSource = new MatTableDataSource(this.rawData);
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort=this.matSort;

    });
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // public ngOnChanges(){
  //   this._fetchDataFromAPI.getData().subscribe((res) => {
  //     this.data = res;
  //     if(this.data)
  //     {
  //       this.isDataPresent=true;
  //     }
  //     console.log(this.data);
  //     this.rawData = this.data['rawData'];
  //     console.log(this.rawData);
  //     this.dataSource = new MatTableDataSource(this.rawData);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort=this.matSort;

  //   });
  // }
}
