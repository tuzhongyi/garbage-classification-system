export interface IGarbageManagementManagerCardController {
  left: {
    html: Promise<IGarbageManagementManagerCardElement[]>;
  };
  right: {
    html: Promise<IGarbageManagementManagerCardElement[]>;
  };
}
export interface IGarbageManagementManagerCardElement {
  element: HTMLElement;
  class?: string[];
}
export interface GarbageManagementManagerCardItem {
  component: any;
  args?: any;
  class?: string[];
}
export enum GarbageManagementManagerIndex {
  home,
  street,
  vehicle,
  garbagedrop,
  mixedinto,
}
