import {Entery, Tracktor, Field} from '../user-data/models';

export interface AppStore {
  enteries: Entery[];
  tracktors: Tracktor[];
  fields: Field[];
};