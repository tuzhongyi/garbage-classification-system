import { StreamType } from '../../../enum/stream-type.enum';
import { VideoProtocol } from '../../../enum/video-protocol.enum';
import { DurationParams, IParams } from '../IParams.interface';

export class GetPreviewUrlParams implements IParams {
  /**	String	监控点ID	M */
  CameraId!: string;
  /**	Int32	流类型：1-主码流，2-子码流	M */
  StreamType: StreamType = StreamType.main;
  /**
   * 	String	协议类型：
   *  rtmp, rtsp, hls, ws-flv, ws-ps
   *  网页插件播放请使用ws-ps	M
   */
  Protocol: VideoProtocol = VideoProtocol.ws_ps;
}

export class GetVodUrlParams extends DurationParams implements IParams {
  /**	String	监控点ID	M */
  CameraId!: string;
  /**	Int32	流类型：1-主码流，2-子码流	M */
  StreamType: StreamType = StreamType.main;
  /**
   * 	String	协议类型：
   *  rtmp, rtsp, hls, ws-flv, ws-ps
   *  网页插件播放请使用ws-ps	M
   */
  Protocol: VideoProtocol = VideoProtocol.ws_ps;
}
