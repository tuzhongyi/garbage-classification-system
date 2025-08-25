import { Component } from '@angular/core';
import { GarbageManagementContainerController } from './controller/garbage-management-container.controller';
import { garbageManagementContainerImports } from './garbage-management-container.import';
import { garbageManagementContainerProviders } from './garbage-management-container.provider';

// GarbageManagementMapComponent,
@Component({
  selector: 'howell-garbage-management-container',
  templateUrl: './garbage-management-container.component.html',
  styleUrl: './garbage-management-container.component.less',
  imports: [...garbageManagementContainerImports],
  providers: [...garbageManagementContainerProviders],
})
export class GarbageManagementContainerComponent {
  constructor(private controller: GarbageManagementContainerController) {}
  get card() {
    return this.controller.card;
  }
}
