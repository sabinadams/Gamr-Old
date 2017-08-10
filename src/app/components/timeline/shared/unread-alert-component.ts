import { Component, Input } from '@angular/core';

import * as _ from 'lodash';

// Break post grabbing/polling into a function called by the initiators
@Component({
  selector: 'unread-alert',
  template: `<div class="alert buffer-alert">{{bufferCount}} new posts</div>`,
  styles: [`
      .buffer-alert {
          box-shadow: 0 0 2px rgba(0,0,0,0.8);
          cursor: pointer;
          text-align:center;
      }
  `],
})

export class UnreadAlertComponent {
  @Input() bufferCount: Number = 0;
  constructor(){}
}
