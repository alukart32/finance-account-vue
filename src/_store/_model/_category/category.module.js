import {auth_account} from "../../_auth/auth_account.module";
import {categoryService} from "../../../_services/category.service";

const state = {
    all: {}
};

const actions = {
    setUpCategory({commit}){
        categoryService.getForUser()
            .then(
                set => commit('getUserSuccess', set),
                error => commit('getUserFailure', error)
            );
    },
    addCategory({ dispatch, commit }, account){

        categoryService.add(account, auth_account.state.user)
            .then(
                res => {
                    commit('addCategorySuccess', res);
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Added successfully', { root: true });
                    })
                },
                error => {
                    commit('addCategoryFailure', error);
                    // display success message after route change completes
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    editCategory({commit}, editAccount){
        categoryService.update(editAccount, auth_account.state.user)
            .then()
    }
};

const mutations = {
    getUserSuccess(state, set) {
        state.all = {items: set} ;
    }
    ,
    getUserFailure(state, error) {
        state.error = error ;
    },
    addCategorySuccess(state, response){

    },
    addCategoryFailure(state, error){
        state.all = {}
    },
    editCategorySuccess(state, res){

    },
    editCategoryFailure(state, error) {
        state.error = error;
    }
};

export const categories = {
    namespaced: true,
    state,
    actions,
    mutations
};