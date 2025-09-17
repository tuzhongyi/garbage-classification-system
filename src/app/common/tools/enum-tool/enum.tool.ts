import { CameraClassification } from '../../enum/camera-classification.enum';
import { DivisionTypeEnumTool } from './division-type-enum.tool';
import { ResourceTypeEnumTool } from './resource-type-enum.tool';

export class EnumTool {
  constructor() {}

  static resource = new ResourceTypeEnumTool();
  static division = new DivisionTypeEnumTool();

  static CameraIgnore(c?: CameraClassification) {
    let ignores = [CameraClassification.thermal];
    return !!c && ignores.includes(c);
  }

  static values<T>(_enum: T): Array<T[keyof T]> {
    return Object.keys(_enum as any)
      .filter((key) => isNaN(Number(key)))
      .map((key) => _enum[key as keyof T]);
  }
}
