import { CollectionPointClassification } from '../../../enum/collection-point-classification.enum';

/** 分类数量 */
export class ClassificationNumber {
  /**	Int32	分类类型	M */
  Classification!: CollectionPointClassification;
  /**	Int32	数量	M */
  Number!: number;
}
