import { CameraImageUrlTool } from './camera/camera-image-url.tool';
import { CameraPictureUrlTool } from './camera/camera-picture-url.tool';
import { CameraTool } from './camera/camera.tool';
import { GisPointTool } from './gis-point.tool';
import { GarbageDropEventRecordTool } from './record/garbage-drop-event-record.tool';
import { GarbageFullEventRecordTool } from './record/garbage-full-event-record.tool';
import { IllegalDropEventRecordTool } from './record/illegal-drop-event-record.tool';
import { MixedIntoEventRecordTool } from './record/mixed-into-event-record.tool';

export class ObjectModelTool {
  GisPoint = new GisPointTool();

  record = {
    garbagedrop: new GarbageDropEventRecordTool(),
    illegaldrop: new IllegalDropEventRecordTool(),
    mixedinto: new MixedIntoEventRecordTool(),
    garbagefull: new GarbageFullEventRecordTool(),
  };

  camera = {
    get: new CameraTool(),
    picture: new CameraPictureUrlTool(),
    image: new CameraImageUrlTool(),
  };
}
