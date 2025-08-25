import './base64.js';

declare function base64encode(str: string): string;
declare function base64decode(str: string): string;
declare function utf16to8(str: string): string;
declare function utf8to16(str: string): string;

export class Base64 {
  static encode(str: string): string {
    return base64encode(str);
  }
  static decode(str: string): string {
    return base64decode(str);
  }
  static utf16to8(str: string): string {
    return utf16to8(str);
  }
  static utf8to16(str: string): string {
    return utf8to16(str);
  }
}
