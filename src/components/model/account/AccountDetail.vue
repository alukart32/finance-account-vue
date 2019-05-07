<template>
    <div class="row justify-content-md-center">
        <div class="col-md-8" style="background-color: rgba(202,212,213,0.78); border-radius: 15px">
            <div class="col-md-12">
                <div class="row mt-2">
                    <div class="col-md-6" style="border: 1px solid gold">
                        <h4>
                            Аккаунт: {{this.account.name}}
                        </h4>
                    </div>
                    <div class="col-md-6">
                        <h3 class="text-center">
                            {{this.account.balance}} {{this.account.currency.code}}
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <dl>
                            <dt>
                                <h4>
                                    Описание
                                </h4>
                            </dt>
                            <dd style="margin-left: 25px">
                                {{this.account.description}}
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-11">
                            <button class="btn btn-primary" type="button" @click="goToOperations">
                                Последние операции
                            </button>
                            <button class="btn btn-secondary" type="button" disabled>
                               Графическая выписка
                            </button>
                            <button class="btn btn-secondary" type="button" @click="updateAccount">
                                Изменить
                            </button>
                    </div>
                    <button class="btn btn-outline-info" style="margin-left:25.3em; margin-top: 0.3em; margin-bottom: 0.5em" @click="goToAccountsList">Назад</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "AccountDetail",
        created(){
          this.account = this.getCurrentAccount();
        },
        data: function () {
            return{
                id: this.$route.params.id,
                account: {}
            }
        },
        computed:{
            ...mapState({
                accountSet: state => state.accounts.all.items
            })
        },
        methods:{
            getCurrentAccount(){
                let a = this.accountSet.find(x => x.id === +this.id);

                if(a !== undefined)
                    return a;
                else
                    return {};
            },
            goToAccountsList(){
                this.$router.push('/');
            },
            updateAccount(){
                this.$router.push('/updateAccount/' + this.id);
            },
            goToOperations(){
                this.$router.push('/account/' + this.id + '/operations/' + this.account.currency.code);
            }
        }
    }
</script>

<style scoped>

</style>