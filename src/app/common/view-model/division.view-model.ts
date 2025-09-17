import { Division } from '../network/model/garbage-station/division.model';

export class DivisionViewModel extends Division {
  Parent?: Promise<DivisionViewModel>;
}
