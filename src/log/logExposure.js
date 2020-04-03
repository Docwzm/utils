import logEvent from "./index";

let eventMap = {};

let intersectionObserver = {
  observe: () => { console.warn("not support IntersectionObserver") }
};

import 'intersection-observer';
if (IntersectionObserver) {
  intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0 ) {
        let id = entry.target.id;
        if(!eventMap[id].logged) logEvent(eventMap[id].category, eventMap[id].action)
        eventMap[id].logged = true;
      }
    })
  });
}

/**
 * 记录曝光点
 * @param id dom元素id
 * @param category
 * @param action
 */
export default (id, category, action) => {
  Vue.prototype.$nextTick(() => {
    let node = document.getElementById(id);
    if (node) intersectionObserver.observe(node);
    eventMap[id] = { category, action };
  });
};