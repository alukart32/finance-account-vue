<template>
    <div class="row justify-content-md-center">
        <div class="col-md-8" style="background-color: rgba(202,212,213,0.78); border-radius: 15px">
            <div class="col-md-12">
                <div class="row mt-2">
                    <div class="col-md-6" style="border: 1px solid gold">
                        <h3>
                            Аккаунт: {{this.account.name}}
                        </h3>
                    </div>
                    <div class="col-md-6" style="border: 1px solid mediumaquamarine">
                        <div class="row justify-content-end">
                            <div class="col" style="border: 1px solid maroon; padding-right: 4px">
                                <h3 style="text-align: end">
                                    {{this.account.balance}}
                                </h3>
                            </div>
                            <div class="col-md-4" style="border: 1px solid purple; padding-left: 4px">
                                <h3 style="text-align: left">
                                    {{this.account.currency.code}}
                                </h3>
                            </div>
                        </div>
                        <div class="col-md-10 mt-1 ml-4" style="border: 1px solid sandybrown; padding-left: 5.5em">
                            <b-dropdown id="dropdown-1" text="Операции" size="sm" variant="info" class="m-md-2">
                                <b-dropdown-item @click="handleOperation('deposit', a)">Пополнить</b-dropdown-item>
                                <b-dropdown-item @click="handleOperation('withdrawal', a)">Снять</b-dropdown-item>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item @click="handleOperation('delete', a)" >Удалить</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                </div>
                <div class="row" style="border: 1px solid firebrick">
                    <div class="col-md-12">
                        <dl>
                            <dt>
                                <h5>
                                    Описание
                                </h5>
                            </dt>
                            <dd style="margin-left: 25px">
                                {{this.account.description}}
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-11">
                            <button class="btn btn-primary" type="button" @click="">
                                Последние операции
                            </button>
                            <button class="btn btn-secondary" type="button" disabled>
                               Графическая выписка
                            </button>
                            <button class="btn btn-secondary" type="button" @click="updateAccount">
                                Изменить
                            </button>
                    </div>
                    <button class="btn btn-outline-info" style="margin-left:25.3em; margin-top: 0.3em;
                    margin-bottom: 0.5em" @click="goBack">Назад</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "AccountDetail",
        created(){
          this.account = this.getCurrentAccount();
        },
        data: function () {
            return{
                accountId: this.$route.params.accountId,
                account: {}
            }
        },
        computed:{
            ...mapState({
                accountSet: state => state.accounts.all.items
            })
        },
        methods:{
            ...mapActions('accounts',{
                delete: 'removeAccount'
            }),
            getCurrentAccount(){
                let a = this.accountSet.find(x => x.id === +this.accountId);

                if(a !== undefined)
                    return a;
                else
                    return {};
            },
            goBack(){
                this.$router.push('/');
            },
            updateAccount(){
                this.$router.push('/updateAccount/' + this.accountId);
            },
            goToOperations(){
                this.$router.push('/account/' + this.accountId + '/operations/' + this.account.currency.code);
            },
            handleOperation(op, account){
                if(op === 'deposit')
                    this.$router.push('/account/' + this.accountId + '/from/'+'ad'+'/deposit/' + this.account.currency.code);
                else
                    if(op === 'withdrawal')
                        this.$router.push('/account/' + this.accountId +'/from/'+'ad'+ '/withdrawal/' + this.account.currency.code);
                    else
                        if(op === 'delete')
                            this.handleDelete(this.accountId);
            },
            handleDelete(){
                this.delete(this.accountId);
                this.goToAccountsList();
            },
        }
    }
</script>

<style scoped>

</style>