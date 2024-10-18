
export interface CityDataModel {
    id: number;
    name: string;
    description: string;
    google_maps: string;
    schools: number[]
}

export interface schoolDataModel {
    id: number;
    name: string;
    description: string;
    google_maps: string;
    courses: number[]
    city: number
}

export interface courseDataModel {
    id: number;
    name: string;
    description: string;
    type: number;
    group: string;
    schedule: string;
    hours_per_week: string;
    age: string;
    school: number;
}
