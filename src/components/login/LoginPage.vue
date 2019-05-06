<template>
    <div class="row justify-content-md-center">
        <div class="col-md-6">
            <form class="form-signup signup-wrapper inputbg border rounded border-light" @submit.prevent="handleSubmit">
                <h2>Вход</h2>
                <div class="form-group">
                    <label for="usrname">Username</label>
                    <input type="text" v-model="username" name="usrname" class="form-control"
                           id="usrname" :class="{ 'is-invalid': submitted && !username }" />
                    <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                </div>
                <div class="form-group">
                    <label For="password">Пароль</label>
                    <input type="password" v-model="password" name="password" class="form-control"
                           id="password" :class="{ 'is-invalid': submitted && !password }" />
                    <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="status.loggingIn">Вход</button>
                    <router-link to="/register" class="btn btn-link">Регистрация</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('auth_account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('auth_account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password });
                this.getPerson(localStorage.getItem('user'));
            }
        }
    }
};
</script>

<style lang="css">
    inputbg {
        background: #cfcac3;
    }

    .signup-wrapper {
        background: #fff;
        width: 30%;
        margin: 12% auto;
    }
    .form-signup {
        width: 100%;
        max-width: 350px;
        padding: 15px;
    }
    .form-signup .form-signin-heading,
    .form-signup .checkbox {
        margin-bottom: 10px;
    }
    .form-signup .checkbox {
        font-weight: normal;
    }
    .form-signup .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }
    .form-signup .form-control:focus {
        z-index: 2;
    }
</style>