import config from 'config';
import {authHeader} from "../_helpers";
import {auth_account} from "../_store/_auth/auth_account.module";

export const categoryService = {
    getForUser,
    getDefault,
    add,
    update,
    delete: _delete
};

function getForUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/category/getAll/` + auth_account.state.user.user_id, requestOptions).then(handleResponse);
}

function getDefault() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/category/default`, requestOptions).then(handleResponse);
}

function add(account) {
    return fetch(`${config.apiUrl}/category/addTo/${auth_account.state.all.user.id}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth_account.state.all.user.accessToken
        },
        body: JSON.stringify(account)
    }).then(handleResponse);
}

function update(editAccount, user) {
    /*let updatedAccount = {
        name: editAccount.name,
        description: editAccount.description,
        currency: {
            code: editAccount.currency.code
        }
    };
    let accountId = editAccount.id;

    return fetch(`${config.apiUrl}/account/${accountId}/update`, {
        method: 'put',
        headers: {
            'Accept': 'application/json, text/plain, *!/!*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.accessToken
        },
        body: JSON.stringify(updatedAccount)
    }).then(handleResponse);
*/}

function _delete(account_id, user_id) {
    /*fetch(`${config.apiUrl}`, {
        method: 'delete',
        headers: authHeader()
    }).then(handleResponse);*/
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}