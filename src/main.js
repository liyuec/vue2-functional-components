/* import Vue from 'vue' */

/* 
import debounce from './packages/debounce/debounce.vue'
import throttle from './packages/throttle/throttle.vue'
import elementElCascader from './packages/elementElCascader/elementElCascader.vue'

export {
  debounce,
  throttle,
  elementElCascader
} */


import debunceComponet from './packages/debounce/debounce.vue'
import throttleComponet from './packages/throttle/throttle.vue'
import elementElCascader from './packages/elementElCascader/elementElCascader.vue'

const components = [
  debunceComponet,
  throttleComponet,
  elementElCascader
];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}



export default { 
	install,
	// 按需导出
  debunceComponet,
  throttleComponet,
  elementElCascader
 };