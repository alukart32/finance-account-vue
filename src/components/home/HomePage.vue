<template>
    <div class="row" style="border: 1px solid lawngreen">
        <div class="col-md-7" style="border: 1px solid #1318f0">
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

    <!--

            <div class="col" style="background-color: lightslategrey; border-radius: 10px">

        </div>



    <div>
        <div>
            <h1 style="text-align: center">Добрый день, {{person.username}}!</h1>
            <p style="text-align: center">You're logged in with Vue + Vuex & JWT!!</p>
        </div>
    </div>-->
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
            }
        },
        created(){
            this.loadAcc();
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loadAcc();
            })
        }
    };



   /* import { mapState, mapActions} from 'vuex'
    import NavBar from "../navbar/NavBar";

    export default {
        components: {NavBar},
        computed: {
            ...mapState({
                person: state => state.auth_account.person,
            })
        }
    };*/
</script>