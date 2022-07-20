import { IRootObject } from "../Interfaces/rootObject";
import { FetchDataFromApiService } from "../services/fetch-data-from-api.service";
import { ReadMapJSONService } from "../services/read-map-json.service";

export class RetriveAPIData
{
  public data?:IRootObject;
  Deaths: {[Country: string]: any} = {};
  Confirmed:{[Country: string]: any} = {};
  Case_Fatality_Ratio:{[Country: string]: any} = {};
  Incident_Rate:{[Country: string]: any} = {};

  constructor(private _readMapDataService:ReadMapJSONService,
    private _fetchDataFromAPI:FetchDataFromApiService){}

   public  getDataFromAPI()
  {
    this._fetchDataFromAPI.getData().subscribe(
      (res)=>{
        this.data=res;
        // console.log(this.data);
        // console.log(this.data['rawData'].length);
        this.data.rawData.forEach(element => {
          if(!this.Deaths[element.Country_Region] && !this.Confirmed[element.Country_Region]
            && !this.Case_Fatality_Ratio[element.Country_Region] && !this.Incident_Rate[element.Country_Region])
          {
            this.Deaths[element.Country_Region]=Number(element.Deaths);
            this.Confirmed[element.Country_Region]=Number(element.Confirmed);
            this.Case_Fatality_Ratio[element.Country_Region]=Number(element.Case_Fatality_Ratio);
            this.Incident_Rate[element.Country_Region]=Number(element.Incident_Rate);
          }
          else{
            this.Deaths[element.Country_Region]=Number(this.Deaths[element.Country_Region])+Number(element.Deaths);
            this.Confirmed[element.Country_Region]=Number(this.Confirmed[element.Country_Region])+Number(element.Confirmed);
            this.Case_Fatality_Ratio[element.Country_Region]=Number(this.Case_Fatality_Ratio[element.Country_Region])+Number(element.Case_Fatality_Ratio);
            this.Incident_Rate[element.Country_Region]=Number(this.Incident_Rate[element.Country_Region])+Number(element.Incident_Rate);
            
          }
          // console.log(element.Combined_Key);
          // console.log(element['Deaths']);
          // console.log(element['Confirmed']);
          // console.log(element['Case_Fatality_Ratio']);
          // console.log("*******************************")
        });
        console.log(this.Deaths);
        // console.log(this.Incident_Rate);
        // console.log(this.Confirmed);
        // console.log(this.Case_Fatality_Ratio);
      }
    );
  }
}