import {
  Component,
  EventEmitter,
  Input,
  
  OnInit,
  Output,
  
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IRootObject } from 'src/app/Interfaces/rootObject';

import { FetchDataFromApiService } from 'src/app/services/fetch-data-from-api.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
 
  public data?: IRootObject;
  @Output() ErawDataHeader: EventEmitter<string[]> = new EventEmitter();
  @Input() additionalHeaders:string[]=[];
  public rawDataHeader: string[] = [
    'FIPS',
    'Country_Region',
    'Lat',
    'Long_',
    'Case_Fatality_Ratio',
  ];
  public rawData?: any;
  public dataSource!: MatTableDataSource<any>;
  private paginator!: MatPaginator;
  private sort!: MatSort;

  constructor(private _fetchDataFromAPI: FetchDataFromApiService) {}

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  ngOnInit() {
    this._fetchDataFromAPI.getData().subscribe((res) => {
      this.data = res;
    
      console.log(this.data);
      this.rawData = this.data['rawData'];
      console.log(this.rawData);
      this.dataSource = new MatTableDataSource(this.rawData);
      this.ErawDataHeader.emit(this.rawDataHeader);
      console.log(this.ErawDataHeader)
    });
  }
  // ngOnChanges() {
  //   this.ErawDataHeader.emit(this.rawDataHeader);
  //   this.addColoumns()
  // }
  addColoumns()
  {
    for(let i=0;i<this.additionalHeaders.length;i++)
    {this.rawDataHeader.push(this.additionalHeaders[i]);}
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
