import { Component, OnDestroy, OnInit } from "@angular/core";
import * as Highcharts from "highcharts/highmaps";
import HC_map from 'highcharts/modules/map';
import { concatMap, Subscription, tap } from "rxjs";
import { ICountForMapData, IRootObject } from "../Interfaces/rootObject";
import { FetchDataFromApiService } from "../services/fetch-data-from-api.service";
import { ReadMapJSONService } from "../services/read-map-json.service";

HC_map(Highcharts);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit, OnDestroy {
  newSubscription?: Subscription;
  public data?: IRootObject;
  public countForMapData?: ICountForMapData;
  Deaths: { [Country: string]: any } = {};
  Confirmed: { [Country: string]: any } = {};
  Case_Fatality_Ratio: { [Country: string]: any } = {};
  Incident_Rate: { [Country: string]: any } = {};
  title = "app";

  updateFromInput = false;
  Highcharts = Highcharts;

  chartConstructor = "mapChart";

  worldMap = require('@highcharts/map-collection/custom/world.topo.json');
  chartOptions: any = undefined;

  constructor(private _readMapDataService: ReadMapJSONService,
    private _fetchDataFromAPI: FetchDataFromApiService) {
  }

  ngOnInit(): void {
    this._fetchDataFromAPI.getData().pipe(
      tap((res) => {
        this.data = res;
        this.data.rawData.forEach(element => {
          if (!this.Deaths[element.Country_Region] && !this.Confirmed[element.Country_Region]
            && !this.Case_Fatality_Ratio[element.Country_Region] && !this.Incident_Rate[element.Country_Region]) {
            this.Deaths[element.Country_Region] = Number(element.Deaths);
            this.Confirmed[element.Country_Region] = Number(element.Confirmed);
            this.Case_Fatality_Ratio[element.Country_Region] = Number(element.Case_Fatality_Ratio);
            this.Incident_Rate[element.Country_Region] = Number(element.Incident_Rate);
          }
          else {
            this.Deaths[element.Country_Region] = Number(this.Deaths[element.Country_Region]) + Number(element.Deaths);
            this.Confirmed[element.Country_Region] = Number(this.Confirmed[element.Country_Region]) + Number(element.Confirmed);
            this.Case_Fatality_Ratio[element.Country_Region] = Number(this.Case_Fatality_Ratio[element.Country_Region]) + Number(element.Case_Fatality_Ratio);
            this.Incident_Rate[element.Country_Region] = Number(this.Incident_Rate[element.Country_Region]) + Number(element.Incident_Rate);

          }
        });
        console.log(this.Deaths);

      }), concatMap(res =>
        this._readMapDataService.getJSONData(),

      )).subscribe(data => {
        let dataVal: Array<Array<string | number>> = new Array<Array<string | number>>;
        const len = data.objects.default.geometries.length;
        data.objects.default.geometries.forEach((elementJSON: { properties: { [x: string]: any; }; }) => {
       
          if (Object.keys(this.Deaths).includes(elementJSON.properties["name"])) {
            dataVal.push([elementJSON.properties["hc-key"], this.Deaths[elementJSON.properties["name"]]]);
          }
          else if(elementJSON.properties["hc-key"]==="us")
          {
            dataVal.push([elementJSON.properties["hc-key"],this.Deaths["US"]]);
          }
          else
          {
            dataVal.push([elementJSON.properties["hc-key"], 0]);
          }
          
        });
        this.chartOptions = {
          chart: {
            map: this.worldMap
          },
          title: {
            text: 'Highmaps For Global Covid Deaths'
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              alignTo: 'spacingBox'
            }
          },
          colorAxis: {
            min: 0,
            stops: [
              [0, '#FFCBCB'],
              [0.25, '#EA3C53'],
              [0.5, '#FF3C28'],
              [0.75, '#FF0000'],
              [1, '#8B0000']
            ],

          },

          series: [{
            name: 'Random data',
            states: {
              hover: {
                color: '#BCDA55'
              }
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            },
            allAreas: false,
            data: dataVal
            //mapData: Highcharts.geojson(Highcharts.maps['custom/world']),
          }]
        };
        this.chartOptions.series[0].data.forEach((elementMapData: any) => {
          console.log(elementMapData[0], ":", elementMapData[1]);
        });
      });
  }

  ngOnDestroy(): void {
    this.newSubscription?.unsubscribe();
  }
}
