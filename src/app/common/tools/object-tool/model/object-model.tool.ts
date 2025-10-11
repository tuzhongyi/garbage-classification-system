import { CameraTool } from './camera/camera.tool';
import { GarbageStationTool } from './garbage-station.tool';
import { GisPointTool } from './gis-point.tool';
import { GarbageDropEventRecordTool } from './record/garbage-drop-event-record.tool';
import { GarbageFullEventRecordTool } from './record/garbage-full-event-record.tool';
import { IllegalDropEventRecordTool } from './record/illegal-drop-event-record.tool';
import { IllegalVehicleEventRecordTool } from './record/illegal-vehicle-event-record.tool';
import { MixedIntoEventRecordTool } from './record/mixed-into-event-record.tool';

export class ObjectModelTool {
  GisPoint = new GisPointTool();
  GarbageStation = new GarbageStationTool();
  camera = new CameraTool();
  record = {
    garbagedrop: new GarbageDropEventRecordTool(this.camera),
    illegaldrop: new IllegalDropEventRecordTool(this.camera),
    mixedinto: new MixedIntoEventRecordTool(this.camera),
    garbagefull: new GarbageFullEventRecordTool(this.camera),
    illegalvehicle: new IllegalVehicleEventRecordTool(this.camera),
  };
}
