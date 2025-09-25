import { Injectable } from '@angular/core';
import { Division } from '../network/model/garbage-station/division.model';
import { DivisionRequestService } from '../network/request/garbage/division/division-request.service';

export class DivisionViewModel extends Division {
  Parent?: Promise<DivisionViewModel>;
}

@Injectable({
  providedIn: 'root',
})
export class DivisionViewModelConverter {
  constructor(private service: DivisionRequestService) {}
  convert(data: Division) {
    let vm = new DivisionViewModel();
    vm = Object.assign(vm, data);
    if (data.ParentId) {
      vm.Parent = this.service.cache
        .get(data.ParentId)
        .then((d) => this.convert(d));
    }
    return vm;
  }
}
