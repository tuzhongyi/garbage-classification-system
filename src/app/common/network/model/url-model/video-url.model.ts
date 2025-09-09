import { IModel } from '../model.interface';

/**
 *  视频Url地址
 *
 *  Url示例：
 *  ws!://116.228.67.70!:8800/ws/video/howellps/live/00310101031111111000096000000000/1/0/live.h264?user=howell&password=pwd123456
 *  ws!://116.228.67.70!:8800/ws/video/howellps/vod/00310101031111111000096000000000/1/0/2021-01-18T05!:29!:24.856Z_2021-01-18T06!:29!:24.856Z/vod.h264?user=howell&password= pwd123456
 *  QueryString中的user，password请使用用户登录的用户名密码，此处示例中的用户名密码不一定是实际项目中的用户名密码
 *
 */
export class VideoUrl implements IModel {
  /**	String	Url地址	M */
  Url!: string;
  /**	String	用户名	O */
  Username?: string;
  /**	String	密码	O */
  Password?: string;
  /**	String	网页Url地址	O */
  WebUrl?: string;
}
