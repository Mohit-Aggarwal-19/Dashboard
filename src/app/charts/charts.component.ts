import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IRootObject } from '../Interfaces/rootObject';
import { FetchDataFromApiService } from '../services/fetch-data-from-api.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  Highchart: typeof Highcharts = Highcharts; // required

  pieChartForNonChinaOption = {};
  pieChartForChinaOption = {};
  pieChartForGlobalOption = {};

  chartOptions = {};
  public data?: IRootObject;

  constructor(private _fetchData: FetchDataFromApiService) {}

  ngOnInit(): void {
    this._fetchData.getData().subscribe((res) => {
      this.data = res;
      // console.log(this.summary);
      // console.log(this.summary['global']);
      // console.log(this.summary['nonChina']);
      // console.log(this.summary['china']);
      // this.confirmed = this.summary['nonChina']['conformed'];
      // this.deaths = this.summary['nonChina']['deaths'];
      // this.recovered = this.summary['nonChina']['recovered'];

      if (this.data) {
        const dataForNoChina = [
          {
            name: 'Deaths',
            y: this.data['summaryStats'].nonChina?.deaths,
          },
          {
            name: 'Confirmed',
            y: this.data['summaryStats'].nonChina?.confirmed,
          },
          {
            name: 'Recovered',
            y: this.data['summaryStats'].nonChina?.recovered,
          },
        ];
        const dataForChina = [
          {
            name: 'Deaths',
            y: this.data['summaryStats'].china?.deaths,
          },
          {
            name: 'Confirmed',
            y: this.data['summaryStats'].china?.confirmed,
          },
          {
            name: 'Recovered',
            y: this.data['summaryStats'].china?.recovered,
          },
        ];
        const dataForGlobal = [
          {
            name: 'Deaths',
            y: this.data['summaryStats'].global?.deaths,
          },
          {
            name: 'Confirmed',
            y: this.data['summaryStats'].global?.confirmed,
          },
          {
            name: 'Recovered',
            y: this.data['summaryStats'].global?.recovered,
          },
        ];

        this.pieChartForNonChinaOption = Highcharts.chart('nonChinacontainer', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
          },
          title: {
            text: 'Summary for Non-China',
          },
          subtitle: {
            text: '3D donut in Highcharts',
          },
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 45,
            },
          },
          series: [
            {
              name: 'count',
              data: dataForNoChina,
            },
          ],
        } as any);

        this.pieChartForChinaOption = Highcharts.chart('chinaContainer', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
          },
          title: {
            text: 'Summary for China',
          },
          subtitle: {
            text: '3D donut in Highcharts',
          },
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 45,
            },
          },
          series: [
            {
              name: 'count',
              data: dataForChina,
            },
          ],
        } as any);
        this.pieChartForGlobalOption = Highcharts.chart('globalContainer', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
          },
          title: {
            text: 'Summary for Global',
          },
          subtitle: {
            text: '3D donut in Highcharts',
          },
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 45,
            },
          },
          series: [
            {
              name: 'count',
              data: dataForGlobal,
            },
          ],
        } as any);
      }

      HC_exporting(this.Highchart);
    });
  }
}
