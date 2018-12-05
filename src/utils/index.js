export function loadScript(src, cb, remove = false) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;

  let flag = false; // 防止 IE9/10 中执行两次

  script.onload = script.onreadystatechange = function() {
    if (
      flag === false &&
      (!this.readyState || this.readyState === 'complete')
    ) {
      flag = true;
      cb && cb();
    }
  };

  const target = document.getElementsByTagName('script')[0] || document.head;
  target.parentNode.insertBefore(script, target);

  // 这个主要是为了清除加载的大量的多余的script标签,比如 jsonp
  remove && setTimeout(() => {
    target.parentNode.removeChild(script);
  });
}

export function getQueryString(name) {
  const res = location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i')
  );

  if (res == null || res.length < 1) {
    return null;
  }

  return res[1];
}
