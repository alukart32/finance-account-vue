<template>
    <div class="row justify-content-md-center">
        <div class="col-md-6" style="margin-left: 5em">
            <div class="row">
                <div class="col-md-6">
                    <h2>Изменение аккаунта</h2>
                    <div class="form-group">
                        <label for="name">Имя аккаунта</label>
                        <input type="text" v-model="account.name" v-bind="account"  v-validate="'required'" :placeholder="account.name" aria-describedby="accNameHelp"
                               name="name" class="form-control col-md-offset-2" :class="{ 'is-invalid': submitted && errors.has('name') }" />
                        <small id="accNameHelp" class="form-text text-muted">Текущее имя вашего аккаунта</small>
                        <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</div>
                    </div>
                </div>
               </div>
            <div class="row">
                <div class="col-md-10 form-group shadow-textarea">
                    <label for="descr">Описание</label>
                    <textarea class="form-control z-depth-1" v-model="account.description" id="descr" rows="3"
                              :placeholder="account.description"></textarea>
                </div>
            </div>
            <br/>
            <div class="form-group">
                <button class="btn btn-primary" @click="update">Изменить</button>
                <button class="btn btn-outline-info" @click="goToAccount">Назад</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "UpdateAccount",
        created(){
            this.account = this.getCurrentAccount();
        },
        data: function () {
            return{
                accountId: this.$route.params.accountId,
                account: {},
                submitted: true
            }
        },
        computed:{
            ...mapState({
                accountSet: state => state.accounts.all.items
            })
        },
        methods:{
            getCurrentAccount(){
                var a = this.accountSet.find(x => x.accountId === +this.accountId);

                return a;
                if(a !== undefined)
                    return a;
                else
                    return {};
            },
            goToAccount(){
                this.$router.push('/accountDetail/' + this.accountId)
            },
            ...mapActions('accounts', ['editAccount']),
            update(){
                let updatedAccount = {
                    accountId: this.accountId,
                    name: this.account.name,
                    description: this.account.description,
                    currency: {
                        code: this.account.currency.code
                    }
                };

                this.editAccount(updatedAccount);

                this.$router.push('/accountDetail/' + this.accountId);
            }
        }
    }
</script>

<style scoped>

</style>