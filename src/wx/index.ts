let wxScript = document.createElement('script');
wxScript.src = 'https://cdn.lifesense.com/common/jweixin/1.3.2/jweixin.js';
wxScript.setAttribute('language', 'JavaScript');
setTimeout(() => document.head.appendChild(wxScript), 1000);

let loaded = false;

type Invoke = {
  target: 'mp' | 'wx',
  method: string,
  callback?: any
}

let invokes: Invoke[] = [];

wxScript.onload = function () {
  loaded = true;
  invokes.forEach(i => {
    if (i.target === 'mp') {
      wx.miniProgram[i.method](i.callback)
    } else {
      wx[i.method](i.callback)
    }
  });
};

export const wechat = {
  invoke(method: string, callback?: any) {
    if (loaded) wx[method](callback);
    else invokes.push({
      target: 'wx',
      method,
      callback
    })
  }
};

export const mp = {
  invoke(method: string, callback?: any) {
    if (loaded) wx.miniProgram[method](callback);
    else invokes.push({
      target: 'mp',
      method,
      callback
    })
  }
};