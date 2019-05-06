import Vue from 'vue';
import Vuex from 'vuex';

import {alert} from './_alert/alert.module';
import {auth_account} from './_auth/auth_account.module';
import {accounts} from './_model/_account/accounts.module';
import {categories} from './_model/_category/category.module';


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        auth_account,
        accounts,
        categories
    }
});
