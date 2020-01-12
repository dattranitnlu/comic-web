import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm';
// import PNotifyHistory from 'pnotify/dist/es/PNotifyHistory';
// import PNotifyCallbacks from 'pnotify/dist/es/PNotifyCallbacks';

@Injectable({
  providedIn: 'root'
})
export class PnotifyService {
  constructor() {
    // tslint:disable-next-line: no-unused-expression
    PNotifyButtons;
    // tslint:disable-next-line: no-unused-expression
    PNotifyConfirm;
    PNotify.defaults.styling = 'bootstrap4';
    PNotify.defaults.icons = 'fontawesome4';
    // PNotify.defaults.delay = 500;
   }
   success (title: string, content: string) {
     PNotify.success({
       title: title,
       text: content,
     });
    }
    error(title: string, content: string) {
      PNotify.error({
        title: title,
        text: content,
      });
   }
   showConfirm(title: string, content: string, callback: (boolean) => void) {
     const aNotice = PNotify.notice({
      title: title,
      text: content,
      icon: 'fas fa-question-circle',
      hide: false,
      stack: {
        'dir1': 'down',
        'modal': true,
        'firstpos1': 25
      },
      modules: {
        Confirm: {
          confirm: true
        },
        Buttons: {
          closer: false,
          sticker: false
        },
        History: {
          history: false
        },
      }
     });
    aNotice.on('pnotify.confirm', function() {
      callback(true);
    });
    aNotice.on('pnotify.cancel', function() {
      callback(false);
    });
   }
}
