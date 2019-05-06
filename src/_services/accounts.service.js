import config from 'config';
import {authHeader} from "../_helpers";

export const accountsService = {
    get,
    add,
    update,
    delete: _delete
};

function get() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/account/getAll`, requestOptions).then(handleResponse);
}

function add(account, user) {
    return fetch(`${config.apiUrl}/account/addTo/${user.user_id}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.accessToken
        },
        body: JSON.stringify(account)
    }).then(handleResponse);
}

function update(editAccount, user) {
    let updatedAccount = {
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
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.accessToken
        },
        body: JSON.stringify(updatedAccount)
    }).then(handleResponse);
}

function _delete(accountId, user) {
    fetch(`${config.apiUrl}/account/${accountId}/removeFrom/${user.user_id}`, {
        method: 'delete',
        headers: authHeader()
    }).then(handleResponse);
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