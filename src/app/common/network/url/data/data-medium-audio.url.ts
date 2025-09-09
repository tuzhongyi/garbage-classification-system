import { AbstractUrl } from '../abstract.url';

export class DataMediumAudioUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}//Audios`);
  }

  from = {
    file: () => {
      return `${this.basic()}/FromFile`;
    },
  };

  data(id: string) {
    return `${this.item(id)}/Data`;
  }

  wav(id: string) {
    return `${this.item(id)}.wav`;
  }
}
