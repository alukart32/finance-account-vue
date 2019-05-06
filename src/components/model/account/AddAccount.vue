<template>
    <div class="row justify-content-md-center">
        <div class="col-md-6" style="margin-left: 5em">
            <div class="row">
                <div class="col-md-6">
                    <h2>Добавление аккаунта</h2>
                    <div class="form-group">
                        <label for="name">Имя аккаунта</label>
                        <input type="text" v-model="account.name" v-validate="'required'"  aria-describedby="accNameHelp"
                               name="name" class="form-control col-md-offset-2" :class="{ 'is-invalid': submitted && errors.has('name') }" />
                        <small id="accNameHelp" class="form-text text-muted">Придумаете имя вашего аккаунта</small>
                        <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</div>
                    </div>
                </div>
                <div class="col-md-2" style="margin-top: 3em">
                    <label>Валюта</label>
                    <select v-model="account.currency.code">
                        <option v-for="option in currencyList.options" v-bind:value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
            </div>
        <div class="row">
            <div class="col-md-10 form-group shadow-textarea">
                <label for="descr">Описание</label>
                <textarea class="form-control z-depth-1" v-model="account.description" id="descr" rows="3"
                          placeholder="Напишите что-то об аккаунте ..."></textarea>
            </div>
        </div>
            <br/>
            <div class="form-group">
                <button class="btn btn-primary" @click="handleAdd">Добавить</button>
                <button class="btn btn-outline-info" style="margin-left: 13em; margin-top: 0.3em; margin-bottom: 0.5em" @click="goToAccounts">Назад</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {accounts} from "../../../_store/_model/_account/accounts.module";

    export default {
        name: "AddAccount",
        data: function () {
            return {
                account: {
                    name: '',
                    description: '',
                    currency: {
                        code: ''
                    }
                },
                currencyList:{
                    options: [
                        { text: 'rub', value: 'rub' },
                        { text: 'usd', value: 'usd' },
                        { text: 'eur', value: 'eur' }
                    ]
                },
                submitted: false
            }
        },
        created(){
          this.submitted = false;
        },
        methods: {
            ...mapActions('accounts',['addAccount']),
            handleAdd: function (e) {
                this.$validator.validate().then(valid => {
                    this.submitted = true;
                    if (valid) {
                        this.addAccount(this.account);
                        this.goToAccounts();
                    }
                });
            },
            goToAccounts(){
                if(true) {
                    this.$router.push('/accounts');
                }
            }
        }
    }
</script>

<style scoped>

</style>