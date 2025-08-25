import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';

import { CameraUsage } from '../../../enum/camera-usage.enum';
import { DumpPointType } from '../../../enum/dump-point-type.enum';
import { StationState } from '../../../enum/station-state.enum';
import { StationType } from '../../../enum/station-type.enum';
import { TrashCanType } from '../../../enum/trashcan-type.enum';
import { IdNameModel } from '../model.interface';
import { TimeRange } from '../time-range.model';
import { transformArraySort, transformDateTime } from '../transform.model';
import { Camera } from './camera.model';
import { ConstructionData } from './construction-data';
import { DropWindow } from './drop-window.model';
import { GarbageDeviceData } from './garbage-device-data.model';
import { GarbageParameters } from './garbage-parameters.model';
import { GisPoint } from './gis-point.model';
import { Member } from './member.model';
import { TrashCan } from './trash-can.model';

/** 垃圾房、投放点 */
export class GarbageStation extends IdNameModel {
  /**	Int32	垃圾房类型	M */
  StationType!: StationType;
  /**	String	描述信息	O */
  Description?: string;
  /**	DateTime	创建时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	GisPoint	GIS点位	O */
  GisPoint?: GisPoint;
  /**	String	所属区划ID	O */
  DivisionId?: string;
  /**	TrashCan[]	垃圾桶列表	O */
  TrashCans?: TrashCan[];
  /**	Camera[]	摄像机列表	O */
  @Type(() => Camera)
  @Transform(transformArraySort)
  Cameras?: Camera[];
  /**	Boolean	干垃圾满溢	O */
  DryFull?: boolean;
  /**	DateTime	干垃圾满溢时间	O */
  @Transform(transformDateTime)
  DryFullTime?: Date;
  /**	Double	干垃圾容积，单位：L	O */
  DryVolume?: number;
  /**	Double	最大干垃圾容积，单位：L	M */
  MaxDryVolume!: number;
  /**	Boolean	湿垃圾满溢	O */
  WetFull?: boolean;
  /**	DateTime	湿垃圾满溢时间	O */
  @Transform(transformDateTime)
  WetFullTime?: Date;
  /**	Double	湿垃圾容积，单位：L	O */
  WetVolume?: number;
  /**	Double	最大湿垃圾容积，单位：L	M */
  MaxWetVolume!: number;
  /**	Int32	垃圾房状态	M */
  StationState!: StationState;
  /**	Int32	评级	O */
  Grade?: number;
  /**	TimeRange[]	计数时间段	O */
  @Type(() => TimeRange)
  CountSchedule?: TimeRange[];
  /**	String	地址	O */
  Address?: string;
  /**	Int32	垃圾投放点类型	O */
  DumpPointType?: DumpPointType;
  /**	Int32[]	停用的事件号列表	O */
  DisableEventTypes?: number[];
  /**	String	所属网格单元ID	O */
  GridCellId?: string;
  /**	GarbageParameters	垃圾相关参数	O */
  @Type(() => GarbageParameters)
  GarbageParameters?: GarbageParameters;
  /**	Member[]	人员列表	O */
  @Type(() => Member)
  Members?: Member[];
  /**	String	IMEI串号	O */
  IMEI?: string;

  /**	String	小区名称	O */
  CommunityName?: string;
  /**	String	小区ID	O */
  CommunityId?: string;
  /**	ConstructionData	建筑垃圾箱体数据	O */
  @Type(() => ConstructionData)
  ConstructionData?: ConstructionData;
  /**	DropWindow[]	投放窗口列表， 只有StationType=2|3, 智能垃圾厢房才有该信息	O */
  @Type(() => DropWindow)
  DropWindows?: DropWindow[];
  /**	GarbageDeviceData	设备数据信息	O */
  @Type(() => GarbageDeviceData)
  GarbageDeviceData?: GarbageDeviceData;
  /**	Int64	厢房能力，1:GCHA(智能主机)2:DOOR(感应门)	O	*/
  Capabilities?: number;

  /**	String	前端设备接入ID	O */
  DeviceAccessId?: string;
  /**	DateTime	NB电源箱最后一次的心跳上传时间	O */
  @Transform(transformDateTime)
  NBHeartbeatTime?: Date;
  /**
   * 	Int32
   *  NB电源箱状态，
   *  0：正常
   *  1：故障
   *  2：220V故障
   * 	O
   */
  NBState?: number;
}

/** 垃圾房类型 */
export class GarbageStationType {
  /**	Int32	垃圾房类型，从1开始 需要服务器分配Type时，请填0	M */
  Type!: number;
  /**	String	类型名称	M */
  Name!: string;
  /**	String	描述信息	O */
  Description?: string;
  /**	GarbageStationWindow[]	垃圾投放窗口列表	O */
  Windows?: GarbageStationWindow[];
  /**	CameraSlot[]	摄像机插槽列表	O */
  CameraSlots?: CameraSlot[];
  /**	DateTime	创建时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDateTime)
  UpdateTime!: Date;
}
/** 垃圾投放窗口 */
export interface GarbageStationWindow {
  /**	Int32	窗口编号，从1开始	M */
  No: number;
  /**	String	名称	O */
  Name?: string;
  /**	Int32	垃圾桶类型	M */
  CanType: TrashCanType;
  /**	Int32	垃圾桶数量，（保留）	O */
  TrashCanNumber?: number;
}
/** 摄像机槽位信息 */
export interface CameraSlot {
  /**	Int32	槽位编号，从1开始	M */
  No: number;
  /**	String	名称	O */
  Name?: string;
  /**	Int32	摄像机用途	M */
  CameraUsage: CameraUsage;
  /**
   * 	Int32	位置编号，
   *  箱外：1-9
   *  箱内：11-19
   *  11,15：干垃圾
   *  12：湿垃圾
   *  13：可回收垃圾
   *  14：有害垃圾	O
   */
  PositionNo?: number;

  /**	Boolean	是否厢房内部	O */
  Inside?: boolean;
  /**	Int32[]	关联的投放窗口编号	O */
  Windows?: number[];
}
