<template>
    <div>
        <div class="grid-container">
            <div class="txn" style="background-color: rgba(202,212,213,0.78); border-radius: 15px">
                <div class="account mb-3">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 style="margin-left: 10px">
                                Аккаунт: {{account.name}}
                            </h4>
                        </div>
                        <div class="col" style="text-align: end; border: 1px solid saddlebrown">
                            <h3 style="padding-right: 0.5em">
                                {{account.balance}}
                                {{account.currency.code}}
                            </h3>
                        </div>
                    </div>
                </div>

                <button @click="" class="deposit btn btn-primary">Пополнить</button>
                <button @click="" class="withdrawal btn btn-primary ml-4">Снять</button>

                <div class="txn-history mt-2 mb-2" style="border: 1px solid dimgrey; border-radius: 9px">
                    history
                </div>

                <button @click="" class="back btn btn-outline-secondary">Назад</button>
            </div>
        </div>
    </div>
    <!--<div class="row justify-content-md-center">
    <div class="grid-container col-md-9" style="border: 1px solid salmon ">
        <div class="txn" style="border: 1px solid purple ">
            <div class="deposit" style="border: 1px solid darkviolet">
                <div class="submit-deposit">
                    sub deposit
                </div>
                <div class="text-deposit text-center" style="border: 1px solid maroon">
                    deposit
                </div>
            </div>
            <div class="withdrawal" style="border: 1px solid brown">
                <div class="submit-withdrawal">
                    sub withdrawal
                </div>
                <div class="text-withdrawal text-center" style="border: 1px solid lawngreen">
                    withdrawal
                </div>
            </div>
        </div>
        <div class="txn-history">history of txn</div>
        <div class="back">back</div>
        <div class="additional">...</div>
    </div>
    </div>-->
        <!--<div class="grid-container">
        <div class="row justify-content-md-center">
        <div class="TxnInput">
            <div class="Sum">
                <div class="form-group">
                    <label for="sum">Внесение денежной суммы</label>
                    <input type="text" v-model="txn.amount" v-validate="'between:0, 1000000'"  aria-describedby="sumInput"
                           name="sum" class="form-control col-md-offset-2" :class="{ 'is-invalid': submitted && errors.has('sum') }" />
                    <small id="sumInput" class="form-text text-muted">Внесите сумму в {{this.accountCurr}}</small>
                    <div v-if="submitted && errors.has('sum')" class="invalid-feedback">{{ errors.first('sum') }}</div>
                </div>
            </div>
            <div class="Submit">
                <button class="btn btn-primary" @click="handleSubmit">Совершить</button>
                <button class="btn btn-outline-info" @click="goToAccount">Назад</button>
            </div>
            <div class="Addition">
                <label>Категории</label>
                <br/>
                <select v-model="categoryList" style="border-radius: 8px">
                    <option v-for="c in userCategory" v-bind:value="c.value">
                        {{ c.name }}
                    </option>
                </select>
                <div class="form-group">
                    <label for="sum">Возможный тэг операции</label>
                    <input type="text" v-model="tag"  aria-describedby="tagHelp"
                           name="tag" class="form-control col-md-offset-2" :class="{ 'is-invalid': submitted && errors.has('tag') }" />
                    <small id="tagHelp" class="form-text text-muted">Придумаете тэг</small>
                </div>
            </div>
            <div class="Helper ml-2 mt-1">
                <label>Тип</label>
                <br/>
                <select v-model="txn.type">
                    <option v-for="option in txnList.options" v-bind:value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </div>
        </div>
        </div>
    </div>-->
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import {txnService} from  '../../_services/index';

    export default {
        name: "Operations",
        data: function () {
            return{
                id: this.$route.params.id,
                accountCurr : this.$route.params.curr,
                account: {},
                txn: {
                    type: '',
                    reason: 'test',
                    currency:{
                        code: this.$route.params.curr
                    },
                    amount: 0
                },
                txnList:{
                    options: [
                        { text: 'снять', value: 'withdrawal' },
                        { text: 'пополнить', value: 'deposit' }
                    ]
                },
                categoryList: '',
                tag: '',
                submitted: false
            }
        },
        computed: {
            ...mapState({
                userCategory: state => state.categories.all.items,
            }),
            ...mapState({
                accountSet: state => state.accounts.all.items
            })
        },
        methods: {
            ...mapActions('txnService', ['submit']),

            ...mapActions('categories', {
                loadCategory: 'setUpCategory'
            }),
            handleSubmit(e) {
                this.$validator.validate().then(valid => {
                    this.submitted = true;
                    if (valid) {
                        let t = {
                            type: this.txn.type,
                            currency: {
                                code: this.txn.currency.code
                            },
                            amount: this.txn.amount,
                            reason: 'asd'
                        };

                        txnService.submit(this.txn, this.id);
                        this.goToAccount();
                    }
                });
            },
            goToAccount(){
                this.$router.push('/accountDetail/' + this.id)
            },
            getCurrentAccount(){
                let a = this.accountSet.find(x => x.id === +this.id);

                if(a !== undefined)
                    this.account = a;

            }
        },
        created(){
          this.getCurrentAccount()
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loadCategory();
            })
        }
    }
</script>


<style scoped>
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 0.2fr 1.8fr 1fr 1fr 1fr 1fr;
        grid-template-areas: ". . . . . . ." ". . txn txn txn . ." ". . txn txn txn . ." ". . txn txn txn . ." ". . txn txn txn . ." ". . . . . . .";
    }

    .txn {
        display: grid;
        grid-template-columns: 0.4fr 1.7fr 0.9fr 1.1fr 1.5fr 0.4fr;
        grid-template-rows: 0.4fr 1.3fr 0.9fr 1.3fr 1.8fr 0.9fr 0.4fr;
        grid-template-areas: ". . . . . ." ". account account account account ." ". deposit deposit withdrawal withdrawal ." ". txn-history txn-history txn-history txn-history ." ". txn-history txn-history txn-history txn-history ." ". . . . back ." ". . . . . .";
        grid-area: txn;
    }

    .account {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: ".";
        grid-area: account;
    }

    .deposit { grid-area: deposit; }

    .withdrawal { grid-area: withdrawal; }

    .txn-history {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas: ". . . . ." ". . . . .";
        grid-area: txn-history;
    }

    .back { grid-area: back; }
</style>