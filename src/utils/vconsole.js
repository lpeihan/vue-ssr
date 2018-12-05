import { getQueryString, loadScript } from './index';

const url = 'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js';
const query = getQueryString('vconsole');
let vconsole;

if (query) {
  loadScript(url, function() {
    if (typeof vconsole === 'undefined') {
      // eslint-disable-next-line
      vconsole = new VConsole();

      query === 'show' &&
        addEventListener('load', function() {
          try {
            vconsole.show();
          } catch (__) {}
        });
    }
  });
}
