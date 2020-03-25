import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import { createRouter } from './router';
import { createStore } from './client/store';

import App from './App.vue';

import Autocomplete from 'element-ui/lib/autocomplete'
import Button from 'element-ui/lib/button'
import Input from 'element-ui/lib/input'
import InputNumber from 'element-ui/lib/input-number'
import Select from 'element-ui/lib/select'
import Option from 'element-ui/lib/option'
import Card from 'element-ui/lib/card'
import Row from 'element-ui/lib/row'
import Alert from 'element-ui/lib/alert'
import Table from 'element-ui/lib/table'
import TableColumn from 'element-ui/lib/table-column'
import Dialog from 'element-ui/lib/dialog'
import Main from 'element-ui/lib/main'
import Header from 'element-ui/lib/header'
import Pagination from 'element-ui/lib/pagination'

Vue.use(Autocomplete);
Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
Vue.use(Card);
Vue.use(Row);
Vue.use(Alert);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Main);
Vue.use(Header);
Vue.use(Pagination);

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

export function createApp() {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
