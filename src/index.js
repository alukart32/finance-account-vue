import Vue from 'vue';
import VeeValidate from 'vee-validate';

import Dropdown from 'bootstrap-vue/es/components/dropdown'
Vue.use(Dropdown)

import BDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
Vue.component('b-dropdown', BDropdown)

import BDropdownItem from	'bootstrap-vue/es/components/dropdown/dropdown-item'
Vue.component('b-dropdown-item', BDropdownItem)

import BDropdownDivider from'bootstrap-vue/es/components/dropdown/dropdown-divider'
Vue.component('b-dropdown-divider', BDropdownDivider)


import {store} from './_store';
import {router} from './_helpers';
import App from './app/App';

Vue.use(VeeValidate);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
