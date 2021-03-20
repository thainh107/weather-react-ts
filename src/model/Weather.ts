
export interface Coordinates {
    lon: number;
    lat: number;
}

export interface System {
    country: string;
}

export interface WindWeatherLocation {
    speed: number;
    deg: number;
}

export interface MailWeatherLocation {
    humidity: number;
    temp: number;
}

export interface WeatherLocation {
    coord: Coordinates;
    id: number;
    name: string;
    sys: System;
    dt: number;
    weather: WeatherConditions[];
    main: MailWeatherLocation;
    wind: WindWeatherLocation;
}

export interface WeatherConditions {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface TempDetails {
    max: number;
    min: number;
    day: number;
    night: number;
}


export interface WeatherDescription {
    main: string;
    icon: string;
}

export interface MainWeatherData {
    dt: number;
    temp: number;
    humidity: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherConditions;
}

export interface WeatherDetail {
    dt: number;
    weather: WeatherConditions[];
    temp: TempDetails;
}

export interface Weather {
    daily: WeatherDetail[];
    current: MainWeatherData;
    dt: number;
}
