import { Injectable } from '@angular/core';
import { SmsProtocolType } from '../../../enum/sms-protocol-type.enum';
import { AuthCode } from '../../model/garbage-station/auth-code.model';
import { HowellResponse } from '../../model/howell-response.model';
import { SmsUrl } from '../../url/sms/sms.url';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { ServiceHelper } from '../service-helper';

@Injectable({
  providedIn: 'root',
})
export class SmsRequestService {
  constructor(private requestService: HowellAuthHttpService) {}

  async getAuthCodes(PhoneNo: string) {
    let response = await this.requestService.getHowellResponse<AuthCode>(
      SmsUrl.authcodes(PhoneNo)
    );
    return ServiceHelper.HowellResponseProcess(response, AuthCode);
  }
  async postAuthCodes(
    phoneNo: string,
    protocolType: SmsProtocolType = SmsProtocolType.aliyun
  ) {
    let response = await this.requestService.howellPost<
      any,
      HowellResponse<AuthCode>
    >(SmsUrl.authcodes(phoneNo, protocolType));
    return ServiceHelper.HowellResponseProcess(response, AuthCode);
  }
}
