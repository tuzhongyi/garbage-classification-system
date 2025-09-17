export interface IGarbageManagementManagerCard {
  html: Promise<Array<IGarbageManagementManagerCardElement>>;
}
export interface IGarbageManagementManagerCardController {
  left: IGarbageManagementManagerCard;
  right: IGarbageManagementManagerCard;
}
export interface IGarbageManagementManagerCardElement {
  element: HTMLElement;
  class?: string[];
}
export interface GarbageManagementManagerCardItem {
  component: any;
  args?: any;
  class?: string[];
  single?: boolean;
}
export enum GarbageManagementManagerIndex {
  home,
  street,
  vehicle,
  garbagedrop,
  mixedinto,
}
