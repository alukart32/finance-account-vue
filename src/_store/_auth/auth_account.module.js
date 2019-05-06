import { userService } from '../../_services/index';
import { router } from '../../_helpers/index';
import {accounts} from "../_model/_account/accounts.module";

const user = JSON.parse(localStorage.getItem('user'));

const state = user
    ? { status: { loggedIn: true }, user, person: {} }
    : { status: {loggedIn: false}, user: null, person: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });

        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    getPerson({ commit }) {
        userService.getLogedIn(auth_account.state.user)
            .then(
                person => commit('getPersonSuccess', person),
                error => commit('getPersonFailure', error)
            );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    },
    getPersonSuccess(state, person){
        state.person = person;
    },
    getPersonError(state, error){
        state.person = {};
    }
};

export const auth_account = {
    namespaced: true,
    state,
    actions,
    mutations
};