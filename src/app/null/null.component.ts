import { Component, OnInit } from '@angular/core';

import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-null',
  templateUrl: './null.component.html',
  styleUrls: ['./null.component.css'],
})
export class NullComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  public NrawDataHeader!: string[];
  public disableSelect = new FormControl({ value: '', disabled: true });
  public headings = new FormControl('');
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
  onSelectOption(ev: Event,selected:boolean) {
    console.log('present header values', this.headings.value);
    if (this.headings.value) 
    {
      this.NrawDataHeader.push(this.headings.value);
      console.log(this.headings.value);
      // console.log("updated raw header",this.rawDataHeader);
      // console.log("last of raw header",this.rawDataHeader[this.rawDataHeader.length-1])
      this.NrawDataHeader = this.NrawDataHeader.flat();
      console.log('flat raw header', this.NrawDataHeader);
    } 
    else !this.headings.value;
    {
      this.NrawDataHeader.pop();
    }
  }
 
  onInitialRawDataHeader(data: string[]) {
    
    console.log('data', data);
    console.log("On Initial Raw data header",this.NrawDataHeader)
    this.NrawDataHeader = data;
    this.NrawDataHeader = this.NrawDataHeader.flat();
    console.log(this.NrawDataHeader);
  }
}
