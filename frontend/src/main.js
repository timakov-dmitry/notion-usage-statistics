import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import VueRouter from 'vue-router'
import Statistics from '@/components/Statistics'
import Graph from '@/components/Graph'
import Upload from '@/components/Upload'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Statistics },
    { path: '/upload', component: Upload },
    { path: '/graph', component: Graph },
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app');
