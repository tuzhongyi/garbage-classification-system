import { EventEmitter } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { Flags } from '../../../../../../common/tools/flags';
import { Language } from '../../../../../../common/tools/language';
import { GarbageStationViewModel } from '../../../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementMapAMapInfoEvent } from './garbage-management-map-amap-marker-info.model';

export class GarbageManagementMapAMapInfoDetailsController {
  event: GarbageManagementMapAMapInfoEvent = {
    camera: new EventEmitter<GarbageStationViewModel>(),
    mixedinto: new EventEmitter<GarbageStationViewModel>(),
    illegaldrop: new EventEmitter<GarbageStationViewModel>(),
    garbagefull: new EventEmitter<GarbageStationViewModel>(),
    garbagedrop: new EventEmitter<GarbageStationViewModel>(),
    error: new EventEmitter<GarbageStationViewModel>(),
  };
  show = false;

  constructor(private map: AMap.Map, zooms?: [number, number]) {
    this.marker = this.init(zooms);
  }

  private marker: AMap.Marker;

  private init(zooms: [number, number] = [0, 50]) {
    return new AMap.Marker({
      anchor: 'bottom-center',
      offset: [0, -80],
      zooms: zooms,
    });
  }

  private content?: InfoContent;

  private regist(content: InfoContent) {
    content.camera.subscribe((data) => {
      this.event.camera.emit(data);
    });
    content.mixedinto.subscribe((data) => {
      this.event.mixedinto.emit(data);
    });
    content.illegaldrop.subscribe((data) => {
      this.event.illegaldrop.emit(data);
    });
    content.garbagefull.subscribe((data) => {
      this.event.garbagefull.emit(data);
    });
    content.garbagedrop.subscribe((data) => {
      this.event.garbagedrop.emit(data);
    });
    content.error.subscribe((data) => {
      this.event.error.emit(data);
    });
  }

  async add(data: GarbageStationViewModel) {
    if (data && data.GisPoint) {
      let location: [number, number] = [
        data.GisPoint.Longitude,
        data.GisPoint.Latitude,
      ];
      this.content = new InfoContent(data);
      this.regist(this.content);
      let content = await this.content.load();
      this.marker.setContent(content);
      this.marker.setPosition(location);
      this.map.add(this.marker);
      this.show = true;
    }
    return undefined;
  }

  remove() {
    this.map.remove(this.marker);
    this.show = false;
  }

  set = {
    position: (position: [number, number]) => {
      this.marker.setPosition(position);
    },
  };
}

class InfoContent implements GarbageManagementMapAMapInfoEvent {
  camera = new EventEmitter<GarbageStationViewModel>();
  mixedinto = new EventEmitter<GarbageStationViewModel>();
  illegaldrop = new EventEmitter<GarbageStationViewModel>();
  garbagefull = new EventEmitter<GarbageStationViewModel>();
  garbagedrop = new EventEmitter<GarbageStationViewModel>();
  error = new EventEmitter<GarbageStationViewModel>();

  constructor(private data: GarbageStationViewModel) {}
  async load() {
    let window = document.createElement('window');
    window.className = 'amap-info-window';

    let content = document.createElement('div');
    content.className = 'amap-info-window-content amap-garbage-station';

    content.appendChild(this.head(this.data));
    content.appendChild(await this.info(this.data));
    content.appendChild(this.hr());
    content.appendChild(this.statistic(this.data));
    window.appendChild(content);

    let sharp = document.createElement('div');
    sharp.className = 'amap-info-sharp';
    window.appendChild(sharp);

    return window;
  }
  private hr() {
    let div = document.createElement('div');
    div.className = 'hr';
    return div;
  }
  private head(data: GarbageStationViewModel) {
    let head = document.createElement('div');
    head.className = 'amap-garbage-station-head';

    let title = document.createElement('div');
    title.className = 'amap-garbage-station-head-title';
    title.innerText = data.Name;
    head.appendChild(title);

    head.appendChild(this.state(data));

    return head;
  }

  private state(data: GarbageStationViewModel) {
    let state = document.createElement('div');
    state.className = 'amap-garbage-station-head-state';

    let flags = new Flags(data.StationState);

    if (flags.contains(StationState.Error)) {
      let error = document.createElement('div');
      error.className = 'amap-garbage-station-head-state-item button text-gray';
      error.innerText = '异常';
      error.addEventListener('click', () => {
        this.error.emit(this.data);
      });
      state.appendChild(error);
    }
    if (flags.contains(StationState.Full)) {
      let full = document.createElement('div');
      full.className =
        'amap-garbage-station-head-state-item button text-yellow';
      full.innerText = '满溢';
      full.addEventListener('click', () => {
        this.garbagefull.emit(this.data);
      });
      state.appendChild(full);
    }

    if (data.StationState === 0) {
      let normal = document.createElement('div');
      normal.className = 'amap-garbage-station-head-state-item text-green';
      normal.innerText = '正常';
      state.appendChild(normal);
    }
    return state;
  }

  private async info(data: GarbageStationViewModel) {
    let html = document.createElement('div');
    html.className = 'amap-garbage-station-info';

    if (data.Division) {
      let divison = await data.Division;

      if (divison.Parent) {
        let parent = await divison.Parent;
        html.appendChild(
          this.item.info('howell-icon-neighborhood', parent.Name)
        );
      }

      html.appendChild(this.item.info('howell-icon-Village', divison.Name));
    }

    if (data.Address) {
      html.appendChild(this.item.info('howell-icon-map4', data.Address));
    }

    return html;
  }

  private statistic(data: GarbageStationViewModel) {
    let html = document.createElement('div');
    html.className = 'amap-garbage-station-statistic';

    let camera = this.item.statistic(
      'howell-icon-video text-icon',
      data.Cameras?.length ?? 0
    );
    camera.title = '查看摄像机视频';
    camera.addEventListener('click', () => {
      this.camera.emit(this.data);
    });
    html.appendChild(camera);

    if (data.Statistic) {
      let time = Language.Time(data.Statistic.CurrentGarbageTime, 'minute');
      let _time = this.item.statistic(
        'howell-icon-garbagebags text-orange',
        time || '0分钟'
      );
      _time.title = '查看垃圾滞留信息';
      _time.addEventListener('click', () => {
        this.garbagedrop.emit(this.data);
      });
      html.appendChild(_time);

      if (data.Statistic.TodayEventNumbers) {
        let mixedinto = data.Statistic.TodayEventNumbers.find(
          (x) => x.EventType === EventType.MixedInto
        );
        if (mixedinto) {
          let _mixedinto = this.item.statistic(
            'howell-icon-mixlittering text-pink',
            mixedinto.DayNumber
          );
          _mixedinto.title = '查看混合投放信息';
          _mixedinto.addEventListener('click', () => {
            this.mixedinto.emit(this.data);
          });
          html.appendChild(_mixedinto);
        }
        let illegaldrop = data.Statistic.TodayEventNumbers.find(
          (x) => x.EventType === EventType.IllegalDrop
        );
        if (illegaldrop) {
          let _illegaldrop = this.item.statistic(
            'howell-icon-nolittering text-cyan',
            illegaldrop.DayNumber
          );
          _illegaldrop.title = '查看垃圾乱倒信息';
          _illegaldrop.addEventListener('click', () => {
            this.illegaldrop.emit(this.data);
          });
          html.appendChild(_illegaldrop);
        }
      }
    }

    return html;
  }

  private item = {
    info: (icon: string, content: string) => {
      let item = document.createElement('div');
      item.className = 'amap-garbage-station-info-item';

      let _icon = document.createElement('div');
      _icon.className = `amap-garbage-station-info-item-icon ${icon}`;
      item.appendChild(_icon);

      let _content = document.createElement('div');
      _content.className = 'amap-garbage-station-info-item-content';
      _content.innerText = content;
      item.appendChild(_content);

      return item;
    },
    statistic: <T>(icon: string, content: T) => {
      let button = document.createElement('div');
      button.className = 'amap-garbage-station-statistic-item button';

      let _icon = document.createElement('div');
      _icon.className = `amap-garbage-station-statistic-item-icon ${icon}`;
      button.appendChild(_icon);

      let _content = document.createElement('div');
      _content.className = 'amap-garbage-station-statistic-item-content';
      _content.innerText = `${content}`;
      button.appendChild(_content);

      return button;
    },
  };
}
