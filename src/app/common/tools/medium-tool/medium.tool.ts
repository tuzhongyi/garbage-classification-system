import { PicturesUrl } from '../../network/url/aiop/medium/pictures/pictures.url';

export class MediumTool {
  private static default =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  static img(url?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!url) {
        resolve(this.default);
        return;
      }
      let img = PicturesUrl.jpg(url);
      var image = new Image();
      image.src = img;
      image.onerror = () => {
        resolve(this.default);
        reject(url);
      };
      image.onload = () => {
        resolve(img);
      };
    });
  }
}
