<template>
    <div class="row" style="border: 1px solid lawngreen">
        <div class="col-md-8" style="border: 1px solid #1318f0">
            <h2 style="margin-left: 40px" >Аккаунты</h2>
            <ul v-if="this.accountSet" style="list-style-type: none">
                <li v-for="a in this.accountSet">
                    <div class="row col-md-10" style="border: 1px solid #ffa90b; padding-left: 3em">
                        <div class="col-md-10" style="border: 1px solid #05ffe1">
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
                       <div class="col-md-1 mt-1">
                           <b-dropdown id="dropdown-1" text="Операции" size="sm" variant="info" class="m-md-2">
                               <b-dropdown-item @click="handleOperation('deposit', a)">Пополнить</b-dropdown-item>
                               <b-dropdown-item @click="handleOperation('withdrawal', a)">Снять</b-dropdown-item>
                               <b-dropdown-divider></b-dropdown-divider>
                               <b-dropdown-item @click="handleOperation('delete', a)" >Удалить</b-dropdown-item>
                           </b-dropdown>
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
    import {accounts} from "../../_store/_model/_account/accounts.module";
    import NavBar from "../navbar/NavBar";


    export default {
        components: {NavBar},
        computed:{
            ...mapState({
                accountSet: state => state.accounts.all.items
            }),
            ...mapState({
                person: state => state.auth_account.person,
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
            },
            handleOperation(op, account){
                if(op === 'deposit' || op === 'withdrawal')
                    this.$router.push('/account/' + account.id + '/operations/' + account.currency.code);
                else
                    if(op === 'delete')
                        this.handleDelete(account.id);
            }
        },
        created(){
            this.loadAcc();
        },
        beforeRouteUpdate(to, from, next) {
            next(vm => {
                vm.loadAcc();
            })
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loadAcc();
            })
        }
    };

</script>