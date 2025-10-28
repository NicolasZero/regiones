import { type_telephone_service } from '@/lib/utils';

export interface Disability {
  id: number;
  service_type: string;
  subtype: string;
  disability: string;
  age_range: string;
}

export interface Ethnicity {
  id: number;
  service_type: string;
  subtype: string;
  ethnicity: string;
  age_range: string;
}

export interface Service {
  id: number;
  service_type: string;
  subtype: string;
  age_range: string;
}

export interface AttentionType {
  disability: Disability[];
  ethnicity: Ethnicity[];
  service: Service[];
}



export interface AgeRangeData {
  range: number
  women: number
  men: number
}

export interface DisabilityData {
  type: number
  ageRanges: AgeRangeData[]
}

export interface EthnicityData {
  type: number
  ageRanges: AgeRangeData[]
}

export interface AttentionTypeData {
  type: number
  subType: number
  ageRanges: AgeRangeData[]
  disabilities: DisabilityData[]
  ethnicities: EthnicityData[]
}

export interface FormData {
  attentionTypes: AttentionTypeData[]
}

export interface TableProps {
  viewUser?: boolean;
  achievements?: boolean;
  mobileUnits?: boolean;
  columnas: { campo: string; label: string }[];
}


export type Activity = {
  id: number;
  name: string;
  label: string;
};

export interface Worker {
  id: number;
  identity_card: number;
  is_foreign: boolean;
  full_name: string;
  gender_id: number;
  department_id: number;
  position_id: number;
  payroll_type_id: number;
  area_coordination_id: number;
  status: string;
  created: string;
  updated: string | null;
  gender: string;
  department: string;
  position: string;
  payroll_type: string;
  area: string;
  state_id: number | null;
  state: string | null;
  municipality_id: number | null;
  municipality: string | null;
  parish_id: number | null;
  parish: string | null;
  address: string | null;
}

export type Agenda = {
  id: number;
  username: string;
  type_activity: string;
  date: string;
  dateFormatted: string;
  status: "Por completar" | "Completada" | "No completada";
  status_id: number;
  type_action: string;
  management_unit: string;
  state: string;
  municipality: string;
  parish: string;
  responsible: string;
  place: string;
  obs: string;
  n_womans: number;
  n_man: number;
  observation: string;
  observation_schedule: string;
  dateFinished: string;
  country_id: number;
  age: number;
  collection_method: string;
  received: string;
  type_telephone_service_id: number;
  great_mission: string;

};

export type Victims = {
  country_id: number;
  state: string;
  municipality: string;
  parish: string;
  collection_method: string;
  received: string;
  age: number;
  observation: string;
  created_on: string;
}

export type Violence = {
  state: string;
  municipality: string;
  parish: string;
  age_range_id: number;
  type_weapon_id: number;
  type_femicide_id: number;
  killer_status_id: number;
  observation: string;
  created_on: string;
}

export type Atencion0800 = {
  state: string;
  municipality: string;
  parish: string;
  type_telephone_service_id: number;
  great_mission: string;
  observation: string;
  created_on: string;
}


export type OrdenColumna = {
  columna: keyof Agenda | "id";
  direccion: "asc" | "desc";
} | null;

export type OrdenColumnaUser = {
  columna: keyof Usuario | "nombreCompleto";
  direccion: "asc" | "desc";
} | null;


export interface MobileUnit {
  id: number;
  username: string;
  status: string;
  dateFormatted: string;
  num_mobile_units: number;
  num_ultrasounds: number;
  logistical_support: string;
  state: string;
  municipality: string;
  parish: string;
  place: string;
  responsible: string;
  observation1: string;
  date: string;
  approximate: number;
  observation2: string;
  dateFinished: string;
  attentionTypes: AttentionTypeData[];
  dateUpdated: string;
  [key: string]: any;
}

export type Usuario = {
  id: number;
  worker_id: number;
  username: string;
  password: string;
  role_id: number;
  is_active: boolean;
  created: string;
  role: string;
  identity_card: number;
  full_name: string;
  status: boolean;
  gender: string;
  position: string;
  position_id: number;
  gender_id: number;
  department: string;
  department_id: number;
};

export interface QueryData {
  type_action: string;
  type_activity: string;
  finished: string;
  unfinished: string;
  total: string;
}

export interface ApiResponseActivities {
  status: string;
  data: QueryData[];
}