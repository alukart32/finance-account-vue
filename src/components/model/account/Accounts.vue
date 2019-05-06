<template>
    <div class="row justify-content-md-center">
        <div class="col-md-4">
            <h2 style="margin-left: 40px">Аккаунты</h2>
            <ul v-if="this.accountSet" style="list-style-type: none">
                <li v-for="a in this.accountSet">
                    <div class="row">
                        <div class="col-md-8" style="border: 1px solid chartreuse">
                            <button @click="goToDetails(a.id)" class="list-group-item list-group-item-action list-group-item-secondary">
                                <div class="row">
                                    <div class="col" style="text-align: justify">
                                        <h5>
                                            {{a.name}}
                                        </h5>
                                    </div>
                                    <div class="col" style="text-align: end">
                                        <h5>
                                            {{a.balance}}
                                            {{a.currency.code}}
                                        </h5>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div class="mt-2">
                            <button class="btn btn-outline-danger" @click="handleDelete(a.id)" type="submit">X</button>
                        </div>
                    </div>
                    <br/>
                </li>
            </ul>
            <button class="ml-5 btn btn-primary" @click="addAccount">Добавить</button>
        </div>
    </div>
</template>

<script>

    import {mapActions, mapState} from 'vuex'
    import {accounts} from "../../../_store/_model/_account/accounts.module";

    export default {
        computed:{
            ...mapState({
                accountSet: state => state.accounts.all.items
            })
        },
        methods: {
            ...mapActions('accounts',{
                loadAcc: 'setUpAccount',
                delete: 'removeAccount'
            }),
            addAccount(){
                this.$router.push('/addAccount')
            },
            goToDetails(accountId){
                this.$router.push('/accountDetail/' + accountId)
            },
            handleDelete(i){
                this.delete(i);
                location.reload();
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loadAcc();
            })
        }
    };
</script>

<style scoped>

</style>