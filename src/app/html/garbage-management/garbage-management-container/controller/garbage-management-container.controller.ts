import { Injectable } from '@angular/core';
import { GarbageManagementContainerCardController } from './card/garbage-management-container-card.controller';

@Injectable()
export class GarbageManagementContainerController {
  constructor(public card: GarbageManagementContainerCardController) {}
}
