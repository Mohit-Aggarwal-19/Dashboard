export interface Global {
    confirmed: number;
    recovered?: any;
    deaths: number;
}

export interface China {
    confirmed: number;
    recovered: number;
    deaths: number;
}

export interface NonChina {
    confirmed: number;
    recovered?: any;
    deaths: number;
}

export interface SummaryStats {
    global: Global;
    china: China;
    nonChina: NonChina;
}

export interface Cache {
    lastUpdated: string;
    expires: string;
    lastUpdatedTimestamp: number;
    expiresTimestamp: number;
}

export interface DataSource {
    url: string;
    lastGithubCommit: Date;
    publishedBy: string;
    ref: string;
}

export interface RawData {
    FIPS: string;
    Admin2: string;
    Province_State: string;
    Country_Region: string;
    Last_Update: string;
    Lat: string;
    Long_: string;
    Confirmed: string;
    Deaths: string;
    Recovered: string;
    Active: string;
    Combined_Key: string;
    Incident_Rate: string;
    Case_Fatality_Ratio: string;
}

export interface IRootObject {
    summaryStats: SummaryStats;
    cache: Cache;
    dataSource: DataSource;
    apiSourceCode: string;
    rawData: RawData[];
}

export interface ICountForMapData
{
    Death:{[Country: string]: any};
    Confirmed:{[Country: string]: any};
    Case_Fatality_Ratio:{[Country: string]: any};
    Incident_Rate:{[Country: string]: any};
}