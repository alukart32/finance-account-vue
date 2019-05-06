import config from 'config';
import {authHeader} from "../_helpers";
import {auth_account} from "../_store/_auth/auth_account.module";

export const txnService = {
    getAll,
    submit,
    delete: _delete
};

function getAll(account_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/account/${account_id}/txn/getAll`, requestOptions).then(handleResponse);
}

function submit(txn, accountId) {
    fetch(`${config.apiUrl}/account/${accountId}/txn/makeTxn`, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth_account.state.user.accessToken
        },
        body: JSON.stringify(txn)
    }).then(handleResponse);
}

function _delete() {
    fetch(`${config.apiUrl}`, {
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