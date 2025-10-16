import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'howell-garbage-drop-event-panel',
  imports: [CommonModule],
  templateUrl: './garbage-drop-event-panel.component.html',
  styleUrls: ['./garbage-drop-event-panel.component.less'],
})
export class GarbageDropEventPanelComponent {
  @Input() src?: string;

  constructor() {}
}
