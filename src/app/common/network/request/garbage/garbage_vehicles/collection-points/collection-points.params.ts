import { CollectionPointClassification } from '../../../../../enum/collection-point-classification.enum';
import { CollectionPointScore } from '../../../../../enum/collection-point-score.enum';
import { TrashCanType } from '../../../../../enum/trashcan-type.enum';
import {
  IParams,
  PagedDurationParams,
  PagedParams,
} from '../../../IParams.interface';

export class GetCollectionPointsParams extends PagedParams implements IParams {
  /**	String	垃圾桶ID	O */
  Ids?: string;
  /**	String	地址，LIKE	O */
  Address?: string;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	String	名称，LIKE	O */
  Name?: string;
  /**	Int32	收运点类型	O */
  Classification?: CollectionPointClassification;
}

export class GetTrashCansParams extends PagedParams implements IParams {
  /**	String	垃圾桶ID	O */
  Ids?: string;
  /**	String	地址，LIKE	O */
  Address?: string;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	String	名称，LIKE	O */
  Name?: string;
  /**	String	垃圾桶唯一编号	O */
  No?: string;
  /**	Int32	垃圾桶类型	O */
  CanType?: TrashCanType;
  /**	String[]	垃圾收运点ID	O */
  CollectionPointIds?: string[];
}

export class GetCollectionPointNumberParams implements IParams {
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	Int32[]	分类类型过滤列表	O */
  Classifications?: CollectionPointClassification[];
}

export class GetCollectionPointScoreTopListParams
  extends PagedDurationParams
  implements IParams
{
  /**	Int32	分类评分：1-差评，2-中评，3-好评	M */
  Score!: CollectionPointScore;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];

  /**
   *	Int32[]	分类类型过滤列表，不支持	O
   *  @deprecated
   */
  Classifications?: CollectionPointClassification[];
  /**	Boolean	是否倒序排列	O */
  Desc?: boolean;
}

export class GetCollectionPointWeightTopListParams
  extends PagedDurationParams
  implements IParams
{
  /**	Int32	垃圾类型	O */
  TrashCanType?: TrashCanType;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	Boolean	是否倒序排列	O */
  Desc?: boolean;
}
