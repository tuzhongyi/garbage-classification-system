import { IModel } from '../model.interface';

/** 录像文件Url */
export class RecordFileUrl implements IModel {
  /**	Boolean	结果，True：成功	M */
  Result!: boolean;
  /**	String	图片URL地址	M */
  Url!: string;
}
