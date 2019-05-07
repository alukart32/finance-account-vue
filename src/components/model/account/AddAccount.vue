<template>
    <div class="row justify-content-md-center">
        <div class="col-md-6" style="background-color: rgba(202,212,213,0.78); border-radius: 15px">
            <div class="row">
                <div class="col-md-8 ml-3 mt-1">
                    <h2>Новый аккаунт</h2>
                    <div class="form-group">
                        <h5 for="name">Имя аккаунта</h5>
                        <input type="text" v-model="account.name" v-validate="'required'"  aria-describedby="accNameHelp"
                               name="name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('name') }" />
                        <small id="accNameHelp" class="form-text text-muted" style="font-size: 15px">Придумаете имя вашего аккаунта</small>
                        <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</div>
                    </div>
                </div>
                <div class="col-md-2 ml-4" style="margin-top: 3.5em" >
                    <h6>Валюта</h6>
                    <select v-model="account.currency.code" style="border-radius: 4px; margin-top: 0.3em">
                        <option v-for="option in currencyList.options" v-bind:value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="col-md-12 form-group shadow-textarea">
                <h5 for="descr">Описание</h5>
                <textarea class="form-control z-depth-1" v-model="account.description" id="descr" rows="3"
                          placeholder="Напишите что-то об аккаунте ..."></textarea>
            </div>
            <br/>
            <div class="form-group justify-content-md-end">
                <button class="btn btn-primary" style="margin-left: 220px" @click="handleAdd" >Добавить</button>
                <button class="btn btn-outline-info ml-1" @click="goToAccounts" >Назад</button>
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
                    this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>