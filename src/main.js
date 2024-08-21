import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/scss/app.scss"
import VueFeather from "vue-feather";
import Breadcrumbs from './layout/breadCrumbs.vue';
// 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// 
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';


const options = {
    // Puedes ajustar las opciones según tus necesidades
    // position: POSITION.TOP_RIGHT,
    position: 'bottom-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
  };
const app = createApp(App);

app.use(store);
app.use(router);
app.component(VueFeather.name, VueFeather);
app.component('Breadcrumbs', Breadcrumbs);

// Dispatch the initializeMenu action after the store is set up
store.dispatch('menu/initializeMenu');

app.mount('#app');

app.use(Toast, options);

// createApp(App)
// .use(store)
// .use(router)
// .component(VueFeather.name, VueFeather)
// .component('Breadcrumbs', Breadcrumbs)
// .mount('#app')
 