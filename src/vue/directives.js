import { getQueryString } from '../common'

const hideElement = (el, binding) => {
    let tn = getQueryString(location.href, "tn");
    tn = tn ? tn : 'default';
    let whiteList = {}.toString.call(binding.value) === "[object Array]" ? binding.value : [binding.value];
    if (whiteList.indexOf(tn) > -1) {
        el.style.display = "none";
        // el.parentElement.removeChild(el);
    }
}
const showElement = (el, binding) => {
    let tn = getQueryString(location.href, "tn");
    tn = tn ? tn : 'default';
    let whiteList = {}.toString.call(binding.value) === "[object Array]" ? binding.value : [binding.value];
    if (whiteList.indexOf(tn) === -1) {
        el.style.display = "none";
        // el.parentElement.removeChild(el);
    }
}
const addClass = (el, binding) => {
    let tn = getQueryString(location.href, "tn");
    let classList;
    classList = {}.toString.call(binding.value) === "[object Array]" ? binding.value : [binding.value];
    classList.forEach(item => {
        el.classList.add(`${item}`);
        tn && el.classList.add(`${item}-${tn}`);
    });
}
// 根据租户显示元素
export const TenantShowDirective = {
    inserted(el, binding) {
        showElement(el, binding);
    },
    componentUpdated(el, binding) {
        showElement(el, binding);
    }
}
// 根据租户动态隐藏元素
export const TenantHideDirective = {
    inserted(el, binding) {
        hideElement(el, binding);
    },
    componentUpdated(el, binding) {
        hideElement(el, binding);
    }
}
// 根据指令动态修改DOM样式
export const TenantClassDirective = {
    inserted(el, binding) {
        addClass(el, binding)
    },
    componentUpdated(el, binding) {
        addClass(el, binding)
    }
}