import { instanceToPlain } from 'class-transformer';
import { CameraAIModel } from '../../../../model/garbage-station/camera-ai.model';
import { ResourcesUrl } from '../../../../url/aiop/resources/resources.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../../base-request-howell.service';
import { BatchResult } from '../../resources-params';
import { BatchCopyRequest } from './resource-camera-ai-model.param';

export class ResourceCameraAIModelService {
  type: HowellBaseTypeRequestService<CameraAIModel>;
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(CameraAIModel);
  }

  array(cameraId: string) {
    let url = ResourcesUrl.camera().aiModel(cameraId).basic();
    return this.type.getArray(url);
  }
  get(cameraId: string, modelId: string) {
    let url = ResourcesUrl.camera().aiModel(cameraId).item(modelId);
    return this.type.get(url);
  }
  binding(cameraId: string, modelId: string) {
    let url = ResourcesUrl.camera().aiModel(cameraId).item(modelId);
    return this.type.post(url);
  }
  delete(cameraId: string, modelId: string) {
    let url = ResourcesUrl.camera().aiModel(cameraId).item(modelId);
    return this.type.delete(url);
  }
  copyTo(cameraId: string, request: BatchCopyRequest) {
    let plain = instanceToPlain(request);
    let url = ResourcesUrl.camera().aiModel(cameraId).copyTo();
    return this.basic.post(url, BatchResult, plain);
  }
}
