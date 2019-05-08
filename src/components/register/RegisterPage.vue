<template>
    <div class="row justify-content-md-center">
        <div class="col-md-6" style="background-color: rgba(202,212,213,0.78); border-radius: 15px">
        <form  @submit.prevent="handleSubmit()">
            <h2 style="margin-top: 0.2em">Регистрация</h2>
            <div class="form-group">
                <label for="username">username</label>
                <input type="text" v-model="user.username" v-validate="'required|alpha_dash'"  aria-describedby="usernameHelp"
                       id="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && errors.has('username') }" />
                <small id="usernameHelp" class="form-text text-muted">Это будет вашем никнеймом</small>
                <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div>
            </div>
            <div class="form-group">
                <label for="firstName">Имя</label>
                <input type="text" v-model="user.firstName" v-validate="'required|alpha'"
                       id="firstName" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('firstName') }" />
                <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div>
            </div>
            <div class="form-group">
                <label for="secondName">Фамилия</label>
                <input type="text" v-model="user.secondName" v-validate="'required|alpha'"
                       id="secondName" name="secondName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('secondName') }" />
                <div v-if="submitted && errors.has('secondName')" class="invalid-feedback">{{ errors.first('secondName') }}</div>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" v-model="user.email" v-validate="'required|email'"  aria-describedby="emailHelp"
                       id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
                <small id="emailHelp" class="form-text text-muted">Мы ни с кем не поделимся вашей эл. почтой</small>
                <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" aria-describedby="pswdHelp"
                       id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
                <small id="pswdHelp" class="form-text text-muted">Пароль должен иметь не менее 6 символов</small>
                <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.registering">Отправить</button>
                <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/login" class="btn btn-link">Назад</router-link>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {auth_account} from "../../_store/_auth/auth_account.module";

export default {
    data () {
        return {
            user: {
                firstName: '',
                secondName: '',
                username: '',
                password: '',
                email: ''
            },
            submitted: false
        }
    },
    created(){
        this.submitted = false;
    },
    computed: {
        ...mapState('auth_account', ['status']),
        ...mapState({
            alert: state => state.alert,
        })
    },
    methods: {
        ...mapActions('auth_account', ['register']),
        handleSubmit(e) {
            this.$validator.validate().then(valid => {
                this.submitted = true;
                if (valid) {
                    this.register(this.user);
                    this.goToLogIn();
                }
            });
        },
        goToLogIn(){
            if(this.submitted){
                this.$router.push('/login');
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
        width: 50%;
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