import { Transform, Type } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { GCHAStatus } from './gcha-status.model';
import { RobotStatus } from './robot-status.model';
import { SwitchState } from './switch-state.model';

export class AIGarbageDeviceStatus implements IModel {
  /**	Int32	在线状态 0:正常、1:异常	O	*/
  OnlineState?: number;
  /**	Int32	排风扇开关状态 0:关闭、1:打开	O	*/
  ExhaustFan?: number;
  /**	Double	气泵压强数值，单位：pa	O	*/
  AirPumpPressure?: number;
  /**	Int32	气泵电源状态 0:断电、1:上电	O	*/
  AirPumpPower?: number;
  /**	Int32	RFID读卡器状态 0:正常、1:异常	O	*/
  RfidReader?: number;
  /**	Int32	大门开关状态 0:关闭、1:打开	O	*/
  GateState?: number;
  /**	Int32	香氛喷洒开关状态 0:关闭、1:打开	O	*/
  Spray?: number;
  /**	Double	气体检测传感器数值	O	*/
  GasSensor?: number;
  /**	SwitchState[]	开关状态	O */
  @Type(() => SwitchState)
  SwitchStates?: SwitchState[];
  /**	DateTime	最后更新时间	O	*/
  @Transform(transformDateTime)
  LastUpdateTime?: Date;
  /**	RobotStatus[]	机器人状态	O */
  @Type(() => RobotStatus)
  Robots?: RobotStatus[];
  /**	GCHAStatus	GCHA状态	O */
  @Type(() => GCHAStatus)
  GCHAStatus?: GCHAStatus;
}
