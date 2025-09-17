import { formatDate } from '@angular/common';

import { BatteryState } from '../enum/ai-garbage/battery-state.enum';
import { RobotState } from '../enum/ai-garbage/robot-state.enum';
import { CameraAbnormalType } from '../enum/camera-abnormal-type.enum';
import { CameraClassification } from '../enum/camera-classification.enum';
import { CameraState } from '../enum/camera-state.enum';
import { CameraType } from '../enum/camera-type.enum';
import { CameraUsage } from '../enum/camera-usage.enum';
import { ChartType } from '../enum/chart-type.enum copy';
import {
  CollectionDeviceStateCountType,
  CollectionDeviceStateRatioType,
} from '../enum/collection-device-state.enum';
import { CollectionPointClassification } from '../enum/collection-point-classification.enum';
import { CollectionPointScore } from '../enum/collection-point-score.enum';
import {
  DeviceStateCountType,
  DeviceStateRatioType,
} from '../enum/device-state-count.enum';
import { DivisionType } from '../enum/division-type.enum';
import { EventType } from '../enum/event-type.enum';
import { GarbageStationAbnormalType } from '../enum/garbage-station-abnormal-type.enum';
import { GarbageType } from '../enum/garbage-type.enum';
import { Gender } from '../enum/gender.enum';
import { CollectionMemberType, MemberType } from '../enum/member-type.enum';
import { OnlineStatus } from '../enum/online-status.enum';
import { VehiclePositionNo } from '../enum/position-no.enum';
import { RelayState } from '../enum/relay-state.enum';
import { ResourceType, VehicleResourceType } from '../enum/resource-type.enum';
import { RetentionType } from '../enum/retention-type.enum';
import { SearchConditionKey } from '../enum/search-condition.enum';
import { StationState } from '../enum/station-state.enum';
import { StationType } from '../enum/station-type.enum';
import { TimeUnit } from '../enum/time-unit.enum';
import { TrashCanType } from '../enum/trashcan-type.enum';
import { UserLogRecordMessageType } from '../enum/user-log-record-message-type.enum';
import { UserResourceType } from '../enum/user-resource-type.enum';
import { FeedbackUserType } from '../enum/user-type-feedback.enum';
import { UserType } from '../enum/user-type.enum';
import { VehicleRelayOperator } from '../enum/vehicle-relay.enum';
import { VehicleState } from '../enum/vehicle-state.enum';
import { VehicleType } from '../enum/vehicle-type.enum';
import { VideoOperationType } from '../enum/video-operation-type.enum';
import { AIGarbageDeviceEventType } from '../network/model/ai-garbage/device-event-record.model';
import { AIGarbageDropWindowType } from '../network/model/ai-garbage/drop-window.model';
import { FeedbackResult } from '../network/model/garbage-station/garbage-drop-feedback.model';
import {
  GarbageDropSuperVisionLevel,
  SuperviseResult,
  SupervisedState,
} from '../network/model/garbage-station/garbage-drop-super-vision-data.model';
import { DateTimeTool } from './date-time-tool/datetime.tool';
import { Flags } from './flags';
import * as language from './language.json';

export class Language {
  static yyyy = 'yyyy';
  static MM = 'MM';
  static dd = 'dd';
  static HH = 'HH';
  static mm = 'mm';
  static ss = 'ss';

  static yyyyMMdd = `${this.yyyy}-${this.MM}-${this.dd}`;
  static HHmm = `${this.HH}:${this.mm}`;
  static HHmmss = `${this.HH}:${this.mm}:${this.ss}`;
  static yyyyMMddHHmmss = `${this.yyyyMMdd} ${this.HHmmss}`;
  static yyyyMMddHHmm = 'yyyy-MM-dd HH:mm';
  static YearMonthDay = 'yyyy年MM月dd日';
  static YearMonthDayHHmmss = 'yyyy年MM月dd日 HH:mm:ss';
  static MonthDayHHmmss = 'MM月dd日 HH:mm:ss';
  static HHmm_ = "HH:mm'";
  static EEEE = 'EEEE';
  static YearMonthDayWeek = `${this.YearMonthDay} ${this.EEEE}`;

  static GarbageType(type: GarbageType): string {
    switch (type) {
      case GarbageType.Dry:
        return '干垃圾';
      case GarbageType.Wet:
        return '湿垃圾';
      case GarbageType.Recycle:
        return '可回收垃圾';
      case GarbageType.Hazard:
        return '有害垃圾';
      default:
        return Language.json.Unknow;
    }
  }
  static StationState(state: StationState) {
    switch (state) {
      case StationState.Full:
        return Language.json.full;
      case StationState.Error:
        return Language.json.error;
      default:
        return Language.json.normal;
    }
  }

  static TimeUnit(unit: TimeUnit) {
    switch (unit) {
      case TimeUnit.Hour:
        return Language.json.Date.day + Language.json.report;
      case TimeUnit.Day:
        return Language.json.Date.day + Language.json.report;
      case TimeUnit.Week:
        return '周报表';
      case TimeUnit.Month:
        return '月报表';
      case TimeUnit.Year:
        return '年报表';
      default:
        return Language.json.Unknow;
    }
  }

  static Week(day: number | string) {
    if (typeof day === 'number') {
      let name = ['日', '一', '二', '三', '四', '五', '六', '日'];
      return `周${name[day]}`;
    } else {
      switch (day) {
        case 'Monday':
          return '周一';
        case 'Tuesday':
          return '周二';
        case 'Wednesday':
          return '周三';
        case 'Thursday':
          return '周四';
        case 'Friday':
          return '周五';
        case 'Saturday':
          return '周六';
        case 'Sunday':
          return '周日';
        default:
          return Language.json.Unknow;
      }
    }
  }

  static Date(date: Date, unit?: TimeUnit): string {
    let format = '';
    switch (unit) {
      case TimeUnit.Year:
        format = 'yyyy年';
        break;
      case TimeUnit.Month:
        format = 'yyyy年MM月';
        break;
      case TimeUnit.Week:
        let duration = DateTimeTool.allWeek(date);
        return `${Language.Date(
          duration.begin,
          TimeUnit.Day
        )} 至 ${Language.Date(duration.end, TimeUnit.Day)}`;
      case TimeUnit.Day:
      default:
        format = 'yyyy年MM月dd日';
        break;
    }
    return formatDate(date, format, 'en');
  }

  static Duration(begin: Date, end: Date) {
    return `${Language.Date(begin)} 至 ${Language.Date(end)}`;
  }

  static StationStateFlags(flags?: Flags<StationState>) {
    if (!flags) return '';
    if (flags.contains(StationState.Error)) {
      return Language.StationState(StationState.Error);
    } else if (flags.contains(StationState.Full)) {
      return Language.StationState(StationState.Full);
    } else {
      return Language.StationState(0);
    }
  }

  static CameraType(type: CameraType) {
    switch (type) {
      case CameraType.Gun:
        return Language.json.CameraType.Gun;
      case CameraType.Ball:
        return Language.json.CameraType.Ball;
      case CameraType.HalfBall:
        return Language.json.CameraType.HalfBall;
      case CameraType.AIO:
        return Language.json.CameraType.AIO;
      default:
        return Language.json.Unknow;
    }
  }
  static CameraUsage(usage: CameraUsage) {
    switch (usage) {
      case CameraUsage.Volume:
        return Language.json.CameraUsage.Volume;
      case CameraUsage.MixedInto:
        return Language.json.CameraUsage.MixedInto;
      case CameraUsage.IllegalDrop:
        return Language.json.CameraUsage.IllegalDrop;
      case CameraUsage.GarbageFull:
        return Language.json.CameraUsage.GarbageFull;
      default:
        return Language.json.Unknow;
    }
  }
  static CameraUsageList(value?: number) {
    if (value === undefined) {
      return '-';
    }
    let flags = new Flags(value);
    let result = [];
    let values = flags.getValues();
    for (let i = 0; i < values.length; i++) {
      if (flags.contains(values[i])) {
        result.push(values[i]);
      }
    }
    if (result.length === 0) {
      return '-';
    }

    return result.map((x) => Language.CameraUsage(x)).join(',');
  }

  static EventType(type: EventType) {
    switch (type) {
      case EventType.None:
        return Language.json.EventType.None;
      case EventType.IllegalDrop:
        return Language.json.EventType.IllegalDrop;
      case EventType.MixedInto:
        return Language.json.EventType.MixedInto;
      case EventType.GarbageVolume:
        return Language.json.EventType.GarbageVolume;
      case EventType.GarbageFull:
        return Language.json.EventType.GarbageFull;
      case EventType.GarbageDrop:
        return Language.json.EventType.GarbageDrop;
      case EventType.GarbageDropTimeout:
      case EventType.GarbageDropSuperTimeout:
        return Language.json.EventType.GarbageDropTimeout;
      case EventType.GarbageDropHandle:
        return Language.json.EventType.GarbageDropHandle;
      case EventType.IllegalVehicle:
        return '非法清运';
      default:
        return Language.json.EventType.Default;
    }
  }

  static GarbageDropEventType(type: EventType, isTimeout?: boolean) {
    switch (type) {
      case EventType.GarbageDrop:
        return Language.json.wait + Language.json.handle;
      case EventType.GarbageDropTimeout:
      case EventType.GarbageDropSuperTimeout:
        return (
          Language.json.timeout + Language.json.wait + Language.json.handle
        );

      case EventType.GarbageDropHandle:
        if (isTimeout) {
          return Language.json.timeout + Language.json.handle;
        } else {
          return Language.json.did + Language.json.handle;
        }
      // case EventType.GarbageDropTimeoutHandle:
      //   return Language.json.timeout + Language.json.handle;
      default:
        return Language.json.Unknow;
    }
  }

  static GarbageDropEventTypeClassName(type: EventType, isTimeout?: boolean) {
    switch (type) {
      case EventType.GarbageDrop:
        return 'orange-text';
      case EventType.GarbageDropTimeout:
      case EventType.GarbageDropSuperTimeout:
        return 'powder-red-text';
      case EventType.GarbageDropHandle:
        if (isTimeout) {
          return 'sky-blue-text2';
        } else {
          return 'green-text';
        }

      default:
        return Language.json.Unknow;
    }
  }

  static CameraState(state: CameraState) {
    switch (state) {
      case CameraState.DeviceError:
        return Language.json.device + Language.json.fault;
      case CameraState.PlatformError:
        return Language.json.platform + Language.json.fault;
      default:
        return Language.json.Unknow;
    }
  }

  static ResourceType(type?: ResourceType) {
    switch (type) {
      case ResourceType.Camera:
        return Language.json.monitor + Language.json.point;
      case ResourceType.EncodeDevice:
        return Language.json.encode + Language.json.device;

      case ResourceType.IoTSensor:
        return Language.json.IoT + Language.json.sensor;
      case ResourceType.GarbageStation:
        return Language.json.garbage + Language.json.room;
      default:
        return Language.json.Unknow;
    }
  }
  static StationType(type?: StationType) {
    switch (type) {
      case StationType.Garbage:
        return '垃圾投放点';
      case StationType.Construction:
        return '建筑垃圾投放点';
      case StationType.Smart:
        return '智能垃圾厢房';
      case StationType.Plus:
        return '精品厢房';
      case StationType.GarbageDrop:
        return '垃圾偷倒';
      case StationType.VehicleWatching:
        return '';
      default:
        return Language.json.Unknow;
    }
  }
  static DivisionType(type: DivisionType) {
    switch (type) {
      case DivisionType.Province:
        return Language.json.DivisionType.Province;
      case DivisionType.City:
        return Language.json.DivisionType.City;
      case DivisionType.County:
        return Language.json.DivisionType.County;
      case DivisionType.Committees:
        return Language.json.DivisionType.Committees;
      default:
        return Language.json.Unknow;
    }
  }

  static Time(time: number = 0, unit: 'second' | 'minute' = 'second') {
    if (time === 0) return '';
    if (unit === 'second') {
      return this.TimeFromSecond(time);
    } else {
      return this.TimeFromMinute(time);
    }
  }

  private static TimeFromSecond(time?: number) {
    if (time === undefined) return undefined;
    let day = Math.floor(time / 60 / 60 / 24);
    let _time = time - day * 60 * 60 * 24;
    let hour = Math.floor(_time / 60 / 60);
    _time -= hour * 60 * 60;
    let minute = Math.floor(_time / 60);
    _time -= minute * 60;
    let second = Math.floor(_time);
    if (time < 60) {
      return second.toString().padStart(2, '0') + '秒';
    }
    if (time < 60 * 60) {
      return (
        minute.toString().padStart(2, '0') +
        '分钟' +
        (second ? second.toString().padStart(2, '0') + '秒' : '')
      );
    }
    if (time < 60 * 60 * 24) {
      return (
        hour.toString().padStart(2, '0') +
        '小时' +
        (minute ? minute.toString().padStart(2, '0') + '分钟' : '') +
        (second ? second.toString().padStart(2, '0') + '秒' : '')
      );
    }
    return (
      day +
      '天' +
      (hour ? hour.toString().padStart(2, '0') + '小时' : '') +
      (minute ? minute.toString().padStart(2, '0') + '分钟' : '') +
      (second ? second.toString().padStart(2, '0') + '秒' : '')
    );
  }

  private static TimeFromMinute(time?: number) {
    if (time === undefined) return undefined;
    let day = Math.floor(time / 60 / 24);
    let _time = time - day * 60 * 24;
    let hour = Math.floor(_time / 60);
    _time -= hour * 60;
    let minute = Math.ceil(_time);
    if (time < 60) {
      return minute + '分钟';
    }
    if (time < 60 * 24) {
      return hour + '小时' + (minute ? minute + '分钟' : '');
    }
    return (
      day + '天' + (hour ? hour + '小时' : '') + (minute ? minute + '分钟' : '')
    );
  }

  static meter(value: number = 0) {
    if (value >= 1000) {
      return `${value / 1000}公里`;
    }
    return `${value}米`;
  }

  static RetentionType(type: RetentionType, def = Language.json.Unknow) {
    switch (type) {
      case RetentionType.RetentionTime:
        return '滞留时长';
      case RetentionType.RetentionStationNumber:
        return '滞留数量';
      default:
        return def;
    }
  }
  static UserResourceType(type: UserResourceType) {
    switch (type) {
      case UserResourceType.City:
        return '行政区';
      case UserResourceType.County:
        return '街道';
      case UserResourceType.Committees:
        return '居委会';
      case UserResourceType.Station:
        return '投放点';
      default:
        return Language.json.Unknow;
    }
  }

  static DeviceStateCountType(type: DeviceStateCountType) {
    switch (type) {
      case DeviceStateCountType.all:
        return '全部设备数量';
      case DeviceStateCountType.onLine:
        return '在线设备数量';
      case DeviceStateCountType.offLine:
        return '离线设备数量';
      default:
        return Language.json.Unknow;
    }
  }

  static DeviceStateRatioType(type: DeviceStateRatioType) {
    switch (type) {
      case DeviceStateRatioType.bad:
        return '严重';
      case DeviceStateRatioType.mild:
        return '中度';
      case DeviceStateRatioType.good:
        return '正常';
      default:
        return Language.json.Unknow;
    }
  }

  static OnlineStatus(status?: OnlineStatus, def = Language.json.Unknow) {
    switch (status) {
      case OnlineStatus.Online:
        return Language.json.OnlineStatus.online;
      case OnlineStatus.Offline:
        return Language.json.OnlineStatus.Offline;
      default:
        return def;
    }
  }

  static ChartType(type: ChartType) {
    switch (type) {
      case ChartType.bar:
        return '柱状图';
      case ChartType.line:
        return '折线图';
      default:
        return Language.json.Unknow;
    }
  }

  static VehicleType(type: VehicleType) {
    switch (type) {
      case VehicleType.Tricycle:
        return Language.json.VehicleType.Tricycle;
      case VehicleType.Car:
        return Language.json.VehicleType.Car;
      default:
        return Language.json.VehicleType.Default;
    }
  }

  static VehiclePositionNo(type?: VehiclePositionNo) {
    switch (type) {
      case VehiclePositionNo.CarFront:
        return Language.json.VehiclePositionNo.CarFront;
      case VehiclePositionNo.CarEnd:
        return Language.json.VehiclePositionNo.CarEnd;
      case VehiclePositionNo.TrashCan:
        return Language.json.VehiclePositionNo.TrashCan;
      default:
        return Language.json.Unknow;
    }
  }

  static RelayState(type: RelayState) {
    switch (type) {
      case RelayState.Closed:
        return Language.json.RelayState.Closed;
      case RelayState.Opened:
        return Language.json.RelayState.Opened;
      default:
        return Language.json.RelayState.Default;
    }
  }

  static VehicleResourceType(type: VehicleResourceType) {
    switch (type) {
      case VehicleResourceType.Camera:
        return Language.json.VehicleResourceType.Camera;
      case VehicleResourceType.GarbageVehicle:
        return Language.json.VehicleResourceType.GarbageVehicle;
      default:
        return Language.json.VehicleResourceType.Default;
    }
  }

  static CollectionPointScore(type?: CollectionPointScore) {
    switch (type) {
      case CollectionPointScore.Poor:
        return Language.json.CollectionPointScore.Poor;
      case CollectionPointScore.Average:
        return Language.json.CollectionPointScore.Average;
      case CollectionPointScore.Good:
        return Language.json.CollectionPointScore.Good;
      default:
        return Language.json.CollectionPointScore.Default;
    }
  }
  static VehicleRelayOperator(type: VehicleRelayOperator) {
    switch (type) {
      case VehicleRelayOperator.Reset:
        return Language.json.VehicleRelayOperator.Reset;
      case VehicleRelayOperator.Open:
        return Language.json.VehicleRelayOperator.Open;
      case VehicleRelayOperator.Close:
        return Language.json.VehicleRelayOperator.Close;
      default:
        return Language.json.VehicleRelayOperator.Default;
    }
  }

  /**
   *  车辆在线比
   * @param type
   * @returns
   */
  static CollectionDeviceStateRatioType(type: CollectionDeviceStateRatioType) {
    switch (type) {
      case CollectionDeviceStateRatioType.Bad:
        return Language.json.CollectionDeviceStateRatioType.Bad;
      case CollectionDeviceStateRatioType.Mild:
        return Language.json.CollectionDeviceStateRatioType.Mild;
      case CollectionDeviceStateRatioType.Good:
        return Language.json.CollectionDeviceStateRatioType.Good;
      default:
        return Language.json.CollectionDeviceStateRatioType.Default;
    }
  }
  static CollectionDeviceStateRatioTypeColor(
    type: CollectionDeviceStateRatioType
  ) {
    switch (type) {
      case CollectionDeviceStateRatioType.Bad:
        return Language.json.CollectionDeviceStateRatioTypeColor.Bad;
      case CollectionDeviceStateRatioType.Mild:
        return Language.json.CollectionDeviceStateRatioTypeColor.Mild;
      case CollectionDeviceStateRatioType.Good:
        return Language.json.CollectionDeviceStateRatioTypeColor.Good;
      default:
        return Language.json.CollectionDeviceStateRatioTypeColor.Default;
    }
  }

  /**
   *  车辆在线数量
   * @param type
   * @returns
   */
  static CollectionDeviceStateCountType(type: CollectionDeviceStateCountType) {
    switch (type) {
      case CollectionDeviceStateCountType.All:
        return Language.json.CollectionDeviceStateCountType.All;
      case CollectionDeviceStateCountType.Online:
        return Language.json.CollectionDeviceStateCountType.Online;
      case CollectionDeviceStateCountType.Offline:
        return Language.json.CollectionDeviceStateCountType.Offline;
      default:
        return Language.json.CollectionDeviceStateCountType.Default;
    }
  }
  static TrashCanType(type?: TrashCanType) {
    switch (type) {
      case TrashCanType.Dry:
        return Language.json.TrashCanType.Dry;
      case TrashCanType.Wet:
        return Language.json.TrashCanType.Wet;
      case TrashCanType.Recycle:
        return Language.json.TrashCanType.Recycle;
      case TrashCanType.Hazard:
        return Language.json.TrashCanType.Hazard;
      default:
        return Language.json.Unknow;
    }
  }

  static VehicleStateFlags(type?: Flags<VehicleState>) {
    if (type) {
      if (type.contains(VehicleState.Offline)) {
        return Language.json.VehicleState.Offline;
      }
      return Language.json.VehicleState.Online;
    }
    return Language.json.Unknow;
  }

  static VehicleState(type?: VehicleState) {
    switch (type) {
      case VehicleState.Offline:
        return Language.json.OnlineStatus.Offline;

      default:
        return Language.json.Unknow;
    }
  }

  /**
   *  垃圾收运点类型
   * @param type
   */
  static CollectionPointClassification(type: CollectionPointClassification) {
    switch (type) {
      case CollectionPointClassification.Other:
        return Language.json.CollectionPointClassification.Other;
      case CollectionPointClassification.Shop:
        return Language.json.CollectionPointClassification.Shop;
      case CollectionPointClassification.Building:
        return Language.json.CollectionPointClassification.Building;
      case CollectionPointClassification.Residence:
        return Language.json.CollectionPointClassification.Residence;
      case CollectionPointClassification.Unit:
        return Language.json.CollectionPointClassification.Unit;
      case CollectionPointClassification.PublicPlace:
        return Language.json.CollectionPointClassification.PublicPlace;
      default:
        return Language.json.CollectionPointClassification.Default;
    }
  }

  static Gender(gender?: Gender) {
    switch (gender) {
      case Gender.Male:
        return Language.json.Gender.Male;
      case Gender.Female:
        return Language.json.Gender.Female;
      default:
        return Language.json.Unknow;
    }
  }

  static CollectionMemberType(value?: CollectionMemberType): string {
    switch (value) {
      case CollectionMemberType.Collection:
        return Language.json.CollectionMemberType.Collection;
      case CollectionMemberType.Other:
      default:
        return Language.json.other;
    }
  }

  static SearchConditionKey(key?: SearchConditionKey) {
    switch (key) {
      case SearchConditionKey.None:
        return Language.json.SearchConditionKey.None;
      case SearchConditionKey.Name:
        return Language.json.SearchConditionKey.Name;
      case SearchConditionKey.StationName:
        return Language.json.SearchConditionKey.StationName;
      case SearchConditionKey.CommunityName:
        return Language.json.SearchConditionKey.CommunityName;
      default:
        return '';
    }
  }

  static AIGarbageDeviceEventType(type: AIGarbageDeviceEventType) {
    switch (type) {
      case AIGarbageDeviceEventType.PneumaticPumpPowerOff:
        return '气压泵电源断电';
      case AIGarbageDeviceEventType.GasConcentrationAlarm:
        return '排风打开后长时间有害气体浓度异常报警';
      case AIGarbageDeviceEventType.GarbageFull:
        return '垃圾满溢';
      case AIGarbageDeviceEventType.RfidReaderFalut:
        return '读卡器故障';
      case AIGarbageDeviceEventType.WindowStateFault:
        return '窗口状态故障';
      case AIGarbageDeviceEventType.Offline:
        return '离线';
      case AIGarbageDeviceEventType.Online:
        return '上线';
      case AIGarbageDeviceEventType.SpacyOpen:
        return '香氛喷洒';
      case AIGarbageDeviceEventType.SpacyClose:
        return '香氛关闭';
      case AIGarbageDeviceEventType.FanOpen:
        return '风扇打开';
      case AIGarbageDeviceEventType.FanClose:
        return '风扇关闭';
      default:
        return '';
    }
  }

  static DropWindowType(type: AIGarbageDropWindowType) {
    switch (type) {
      case AIGarbageDropWindowType.DryGarbage:
        return '干垃圾';
      case AIGarbageDropWindowType.WetGarbage:
        return '湿垃圾桶';
      case AIGarbageDropWindowType.RecyclableGarbage:
        return '可回收垃圾桶';
      case AIGarbageDropWindowType.HazardousGarbage:
        return '有害垃圾桶';
      case AIGarbageDropWindowType.Other:
      default:
        return '其他';
    }
  }
  static DropWindowState(value?: number) {
    switch (value) {
      case 0:
        return '正常';
      case 1:
        return '异常';
      case 2:
        return '常开';
      default:
        return '其他';
    }
  }

  static GarbageDropSuperVisionLevel(level?: GarbageDropSuperVisionLevel) {
    switch (level) {
      case GarbageDropSuperVisionLevel.one:
        return '一级事件';
      case GarbageDropSuperVisionLevel.two:
        return '二级事件';
      case GarbageDropSuperVisionLevel.three:
        return '三级事件';
      default:
        return Language.json.Unknow;
    }
  }

  static SupervisedState(state?: SupervisedState, handle?: boolean) {
    switch (state) {
      case SupervisedState.no:
        if (handle) {
          return '未督办';
        }
        return '待督办';
      case SupervisedState.yes:
        return '已督办';
      default:
        return Language.json.Unknow;
    }
  }
  static FeedbackResult(state?: FeedbackResult) {
    switch (state) {
      case FeedbackResult.complete:
        return '完成';
      case FeedbackResult.falsealarm:
        return '误报';
      case FeedbackResult.nostandard:
        return '管理不规范';
      default:
        return Language.json.Unknow;
    }
  }

  static MemberType(type?: MemberType) {
    switch (type) {
      case MemberType.other:
        return '其他人员';
      case MemberType.volunteer:
        return '志愿者';
      case MemberType.healthworker:
        return '卫生干部';
      case MemberType.property:
        return '物业';
      case MemberType.thirdpart:
        return '第三方';
      default:
        return Language.json.Unknow;
    }
  }
  static FeedbackUserType(type?: FeedbackUserType) {
    switch (type) {
      case FeedbackUserType.county:
        return '街道管理人员';
      case FeedbackUserType.community:
        return '居委管理人员';
      case FeedbackUserType.volunteer:
        return '志愿者';
      case FeedbackUserType.property:
        return '物业管理人员';
      case FeedbackUserType.other:
        return '其他';
      case FeedbackUserType.thirdparty:
        return '第三方';
      default:
        return Language.json.Unknow;
    }
  }
  static UserType(type?: UserType) {
    switch (type) {
      case UserType.garbage_station_system:
        return '生活垃圾';
      case UserType.garbage_station_system:
        return '垃圾清运';
      case UserType.garbage_station_system:
        return '生活垃圾&垃圾清运';
      default:
        return Language.json.Unknow;
    }
  }

  static SuperviseResult(result?: SuperviseResult) {
    switch (result) {
      case SuperviseResult.complete:
        return '完成';
      case SuperviseResult.misclassified:
        return '误报';
      case SuperviseResult.unorganized:
        return '管理不规范';
      case SuperviseResult.noresponse:
        return '无响应';
      case SuperviseResult.notcompleted:
        return '未按时间完成处置';
      default:
        return Language.json.Unknow;
    }
  }

  static MessageType(type?: UserLogRecordMessageType) {
    switch (type) {
      case UserLogRecordMessageType.Login:
        return '登录成功';
      case UserLogRecordMessageType.Logout:
        return '注销';
      case UserLogRecordMessageType.LoginFailed:
        return '登录失败';
      case UserLogRecordMessageType.CreateUser:
        return '创建用户';
      case UserLogRecordMessageType.DeleteUser:
        return '删除用户';
      case UserLogRecordMessageType.SetUser:
        return '修改用户';
      case UserLogRecordMessageType.CreateRole:
        return '创建角色';
      case UserLogRecordMessageType.DeleteRole:
        return '删除角色';
      case UserLogRecordMessageType.SetRole:
        return '修改角色';
      case UserLogRecordMessageType.ChangePassword:
        return '修改用户密码';
      default:
        return '未知';
    }
  }
  static VideoOperationType(type?: VideoOperationType) {
    switch (type) {
      case VideoOperationType.preview:
        return '视频预览';
      case VideoOperationType.playback:
        return '视频回放';
      default:
        return Language.json.Unknow;
    }
  }

  static RobotState(value?: RobotState, def = Language.json.Unknow) {
    switch (value) {
      case RobotState.None:
        return '正常';
      case RobotState.Busy:
        return '繁忙状态';
      case RobotState.Charging:
        return '充电状态';
      case RobotState.LoBAT:
        return '低电量';
      case RobotState.Error:
        return '故障';
      case RobotState.Upgrading:
        return '升级中';
      case RobotState.Offline:
        return '信号丢失';
      default:
        return def;
    }
  }
  static RobotStates(values: RobotState[]) {
    return values.map((x) => this.RobotState(x)).join(',');
  }

  static BatteryState(value?: BatteryState, def = Language.json.Unknow) {
    switch (value) {
      case BatteryState.Normal:
        return '正常';
      case BatteryState.Charging:
        return '充电中';
      case BatteryState.Unable:
        return '无法充电';
      case BatteryState.UnderVoltage:
        return '欠压、亏电';
      default:
        return def;
    }
  }

  static SwitchState(value?: number, def = Language.json.Unknow) {
    switch (value) {
      case 0:
        return '正常';
      case 1:
        return '异常';
      default:
        return def;
    }
  }
  static PowerState(value?: number, def = Language.json.Unknow) {
    switch (value) {
      case 0:
        return '断电';
      case 1:
        return '上电';
      default:
        return def;
    }
  }

  static CameraPosition(value?: number) {
    if (value === undefined) return '未知';
    if (1 <= value && value <= 10) {
      return '舱外';
    } else if (11 <= value && value <= 20) {
      return '舱内';
    } else if (21 <= value && value <= 30) {
      return '红外';
    } else {
      return '未知';
    }
  }

  static YesOrNo(yes: boolean) {
    if (yes) {
      return '是';
    } else {
      return '否';
    }
  }

  static OpenState(
    value?: number,
    contrary: boolean = false,
    def = Language.json.Unknow
  ) {
    if (value === undefined || value === null) return def;
    switch (value) {
      case 0:
        return contrary ? '关闭' : '打开';
      case 1:
        return contrary ? '打开' : '关闭';
      default:
        return def;
    }
  }

  static GarbageDropState(handle: boolean, timeout: boolean) {
    if (handle) {
      if (timeout) {
        return '超时处置';
      } else {
        return '已处置';
      }
    } else {
      if (timeout) {
        return '超时待处置';
      } else {
        return '待处置';
      }
    }
  }

  static IsHandle(state?: boolean, type = EventType.MixedInto) {
    if (state) {
      if (type === EventType.MixedInto) {
        return '已消失';
      } else {
        return '已处置';
      }
    }
    return '待处置';
  }
  static SceneChange(value?: number) {
    switch (value) {
      case 0:
        return '正常';
      case 1:
        return '稍微偏移';
      case 2:
        return '严重偏移';
      default:
        return '未知';
    }
  }
  static ImageQuality(value?: number): string {
    switch (value) {
      case 0:
        return '正常';
      case 1:
        return '轻微模糊';
      case 2:
        return '严重模糊';
      default:
        return '未知';
    }
  }
  static Brightness(value?: number): string {
    switch (value) {
      case 0:
        return '很暗';
      case 1:
        return '稍暗';
      case 2:
        return '正常';
      case 3:
        return '稍亮';
      case 4:
        return '很亮';
      default:
        return '未知';
    }
  }
  static Aberration(value?: number): string {
    switch (value) {
      case 0:
        return '正常';
      case 1:
        return '轻微偏色';
      case 2:
        return '严重偏色';
      default:
        return '未知';
    }
  }
  static Disturbance(value?: number): string {
    switch (value) {
      case 0:
        return '正常';
      case 1:
        return '条纹干扰';
      default:
        return '未知';
    }
  }
  static CameraClassification(value?: CameraClassification): string {
    switch (value) {
      case CameraClassification.normal:
        return '普通摄像机';
      case CameraClassification.thermal:
        return '热成像摄像机';
      case CameraClassification.gcha:
        return 'GCHA摄像机';
      default:
        return '未知';
    }
  }

  static NBState(value?: number, def = Language.json.Unknow): string {
    switch (value) {
      case 0:
        return '正常';
      case 1:
        return '故障';
      case 2:
        return '220V故障';
      default:
        return def;
    }
  }

  static RecordState(value?: number) {
    switch (value) {
      case 0:
        return '正常';
      case 1:
        return '故障';
      default:
        return '未知';
    }
  }
  static DumpPointType(value?: number): string {
    switch (value) {
      case 1:
        return '多分类垃圾厢房（干，湿，可回收，有毒有害）';
      case 2:
        return '多分类露天垃圾投放点（干，湿，可回收，有毒有害）';
      case 3:
        return '二分类垃圾厢房（干，湿）';
      case 4:
        return '二分类露天垃圾投放点（干，湿）';
      default:
        return '未知';
    }
  }

  static CameraAbnormalType(type?: CameraAbnormalType) {
    switch (type) {
      case CameraAbnormalType.offline:
        return '摄像机离线';
      case CameraAbnormalType.abnormal:
        return '摄像机故障';
      case CameraAbnormalType.record:
        return '摄像机录像故障';
      default:
        return '未知';
    }
  }
  static GarbageStationAbnormalType(type?: GarbageStationAbnormalType) {
    switch (type) {
      case GarbageStationAbnormalType.door:
        return '智能设备离线';
      case GarbageStationAbnormalType.gcha:
        return 'GCHA离线';
      case GarbageStationAbnormalType.nb:
        return 'NB电源箱离线';
      default:
        return '未知';
    }
  }
  static json = language;
}
