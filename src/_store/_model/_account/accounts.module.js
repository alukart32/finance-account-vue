import {accountsService} from "../../../_services/index";
import {auth_account} from "../../_auth/auth_account.module";

const state = {
    all: { }
};

const actions = {
    setUpAccount({commit}){
        accountsService.get()
            .then(
                    set => commit('getAllSuccess', set),
                    error => commit('getAllFailure', error)
                );
    },
    addAccount({ dispatch, commit }, account){

        accountsService.add(account, auth_account.state.user)
            .then(
                res => {
                    commit('addAccountSuccess', res);
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Added successfully', { root: true });
                    })
                },
                error => {
                    commit('addAccountFailure', error);
                    // display success message after route change completes
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    editAccount({commit}, editAccount){
        accountsService.update(editAccount, auth_account.state.user);
    },
    removeAccount({commit}, accountID){
        accountsService.delete(accountID, auth_account.state.user);
    }
};

const mutations = {
    getAllSuccess(state, set) {
        state.all = {items: set} ;
    }
    ,
    getAllFailure(state, error) {
        state.error = error ;
    },
    addAccountSuccess(state, response){

    },
    addAccountFailure(state, error){
        state.all = {}
    },
    editAccountSuccess(state, res){

    },
    editAccountFailure(state, error) {
        state.error = error;
    }
};

export const accounts = {
    namespaced: true,
    state,
    actions,
    mutations
};