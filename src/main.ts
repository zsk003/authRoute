import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// import 'lib-flexible'
import '@/assets/style/main.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false
/* vue-bus 兄弟组件传值 */
import VueBus from "vue-bus";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
