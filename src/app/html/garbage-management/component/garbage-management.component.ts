import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'howell-garbage-management',
  imports: [RouterOutlet],
  templateUrl: './garbage-management.component.html',
  styleUrl: './garbage-management.component.less',
})
export class GarbageManagementComponent implements OnInit {
  ngOnInit(): void {
    this.regist();
  }

  private regist() {}
}
