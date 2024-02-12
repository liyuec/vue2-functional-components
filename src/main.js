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
import elementOmit from './packages/omit/elementOmit.vue'
import outSideComponent from './packages/outSide/outSide.vue'
import vueMethodDecorator from './packages/vueMethodDecorator/vueMethodDecorator.vue'



const components = [
  debunceComponet,
  throttleComponet,
  elementElCascader,
  elementOmit,
  outSideComponent,
  vueMethodDecorator
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
  elementElCascader,
  elementOmit,
  outSideComponent,
  vueMethodDecorator
 };