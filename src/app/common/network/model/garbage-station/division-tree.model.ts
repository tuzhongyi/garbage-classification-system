import { Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../model.interface';
import { Division } from './division.model';

/** 区划树形结构 */
export class DivisionTree implements IModel {
  /**	String	根名称，默认：根区划	M */
  Name: string = '';
  /**	DivisionNode[]	子区划节点	O */
  @Type(() => DivisionNode)
  Nodes: DivisionNode[] = [];
}
/** 区划节点 */
export class DivisionNode extends Division {
  /**	DivisionNode[]	子区划节点	O */
  @Type(() => DivisionNode)
  Nodes: DivisionNode[] = [];
}
