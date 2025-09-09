// const BaseAiopUrl = '/api/howell/ver10/aiop_service';
// const BaseGarbageUrl = '/api/howell/ver10/aiop_service/garbage_management';
// const BaseUserUrl = '/howell/ver10/data_service/user_system';
// const BaseSmsUrl = '/howell/ver10/data_service/short_message/sms';

// 垃圾清运
// const BaseGarbageVehicleUrl = '/api/howell/ver10/aiop_service/garbage_vehicles';

// export interface InnerUrl {
//   basic(): string;
// }

// export {
//   BaseGarbageUrl,
//   BaseUserUrl,
//   BaseAiopUrl,
//   BaseSmsUrl,
//   BaseGarbageVehicleUrl,
// };

export class HowellUrlNode {
  static api = 'api';
  static howell = 'howell';
  static ver10 = 'ver10';
  static aiop_service = 'aiop_service';
  static data_service = 'data_service';
  static user_system = 'user_system';
  static user_logs = 'user_logs';
  static garbage_management = 'garbage_management';
  static garbage_vehicles = 'garbage_vehicles';
  static short_message = 'short_message';
  static sms = 'sms';
  static device_service = 'device_service';
  static ai_garbage = 'ai_garbage';
  static http2tcp = 'http2tcp';
  static gcha = 'gcha';
  static devices = 'devices';
  static ias_access = 'ias_access';
  static medium = 'medium';
}

export class BaseUrl {
  /** /api/howell/ver10/aiop_service/ */
  static get aiop_service() {
    return `/${HowellUrlNode.api}/${HowellUrlNode.howell}/${HowellUrlNode.ver10}/${HowellUrlNode.aiop_service}`;
  }
  /** /howell/ver10/data_service/ */
  static get data_service() {
    return `/${HowellUrlNode.howell}/${HowellUrlNode.ver10}/${HowellUrlNode.data_service}`;
  }

  /** /howell/ver10/data_service/user_system/ */
  static get user_system() {
    return `${BaseUrl.data_service}/${HowellUrlNode.user_system}`;
  }
  /** /howell/ver10/data_service/user_system/ */
  static get user_logs() {
    return `${BaseUrl.data_service}/${HowellUrlNode.user_logs}`;
  }
  /** /api/howell/ver10/device_service/ai_garbage/ */
  static get ai_garbage() {
    return `/${HowellUrlNode.api}/${HowellUrlNode.howell}/${HowellUrlNode.ver10}/${HowellUrlNode.device_service}/${HowellUrlNode.ai_garbage}`;
  }
  static get garbage() {
    return GarbageBaseUrl;
  }
  /** /api/howell/ver10/device_service/http2tcp/  */
  static get http2tcp() {
    return `/${HowellUrlNode.api}/${HowellUrlNode.howell}/${HowellUrlNode.ver10}/${HowellUrlNode.device_service}/${HowellUrlNode.http2tcp}`;
  }
  static get gcha() {
    return `/${HowellUrlNode.gcha}/${HowellUrlNode.devices}`;
  }
  /** /api/howell/ver10/aiop_service/ias_access/ */
  static get ias_access() {
    return `${this.aiop_service}/${HowellUrlNode.ias_access}`;
  }
  /** /howell/ver10/data_service/medium/ */
  static get medium() {
    return `${this.data_service}/${HowellUrlNode.medium}`;
  }
}
class GarbageBaseUrl {
  /** /api/howell/ver10/aiop_service/garbage_management/ */
  static get garbage_management() {
    return `${BaseUrl.aiop_service}/${HowellUrlNode.garbage_management}`;
  }
  static get garbage_vehicles() {
    return `${BaseUrl.aiop_service}/${HowellUrlNode.garbage_vehicles}`;
  }
  /** /howell/ver10/data_service/user_system/ */
  static get user_system() {
    return BaseUrl.user_system;
  }
  /** /howell/ver10/data_service/short_message/sms/ */
  static get sms() {
    return `${BaseUrl.data_service}/${HowellUrlNode.short_message}/${HowellUrlNode.sms}`;
  }
}

// export class BasicUrl {
//   static get basic() {
//     return '/howell/ver10';
//   }
//   static get api() {
//     return `/api${this.basic}`;
//   }
//   static get aiop() {
//     return `${this.api}/aiop_service`;
//   }
//   static get data() {
//     return `${this.basic}/data_service`;
//   }
//   static get user() {
//     return `${this.data}/user_system`;
//   }
//   static get sms() {
//     return `${this.data}/short_message/sms`;
//   }
//   static get struct() {
//     return `${this.aiop}/struct_service`;
//   }

//   static get device() {
//     return;
//   }

//   private static _garbage?: GarbageBasicUrl;
//   static get garbage() {
//     if (!this._garbage) {
//       this._garbage = new GarbageBasicUrl(this.aiop);
//     }
//     return this._garbage;
//   }
// }

// class GarbageBasicUrl {
//   constructor(private aiop: string) {}

//   private basic = 'garbage_';

//   get management() {
//     return `${this.aiop}/${this.basic}management`;
//   }
//   get vehicle() {
//     return `${this.aiop}/${this.basic}vehicles`;
//   }
// }
