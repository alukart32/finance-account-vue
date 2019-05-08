<template>
    <div class="row justify-content-md-center">
        <div class="col-md-6" style="background-color: rgba(202,212,213,0.78); border-radius: 15px">
            <div class="row">
                <div class="col-md-8 ml-3 mt-1">
                    <h2>Расход</h2>
                    <div class="form-group">
                        <input type="text" v-model="txn.amount" v-validate="'numeric'" placeholder="Сумма"
                               name="sum" class="form-control" :class="{ 'is-invalid': submitted && errors.has('sum') }" />
                        <div v-if="submitted && errors.has('sum')" class="invalid-feedback">{{ errors.first('sum') }}</div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 form-group shadow-textarea">
                <label>Категории</label>
                <br/>
                <select v-model="categoryList" style="border-radius: 8px">
                    <option v-for="c in userCategory" v-bind:value="c.value">
                        {{ c.name }}
                    </option>
                </select>
                <div class="form-group">
                    <h4>Возможный тэг операции</h4>
                    <input type="text" v-model="tag"  aria-describedby="tagHelp"
                           name="tag" class="form-control col-md-offset-2" :class="{ 'is-invalid': submitted && errors.has('tag') }" />
                    <small id="tagHelp" class="form-text text-muted">Придумаете тэг</small>
                </div>
            </div>
            <br/>
            <div class="form-group justify-content-md-end">
                <button class="btn btn-primary" style="margin-left: 220px" @click="handleSubmit" >Добавить</button>
                <button class="btn btn-outline-info ml-1" @click="goBack" >Назад</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import {txnService} from  '../../_services/index';

    export default {
        name: "Withdrawal",
        data: function () {
            return{
                from:this.$route.params.from,
                accountId: this.$route.params.accountId,
                accountCurr : this.$route.params.curr,
                account: {},
                txn: {
                    reason: 'test',
                    currency:{
                        code: this.$route.params.curr
                    },
                    amount: 0
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
                            type: 'withdrawal',
                            currency: {
                                code: this.txn.currency.code
                            },
                            amount: this.txn.amount,
                            reason: this.reason
                        };
                        txnService.submit(this.txn, this.accountId);
                        this.goToAccount();
                    }
                });
            },
            goBack(){
                if(this.from === 'list')
                    this.$router.push('/');
                else
                if(this.from === 'ad')
                    this.$router.push('/accountDetail/' + this.accountId);
            },
            getCurrentAccount(){
                let a = this.accountSet.find(x => x.accountId === +this.accountId);
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

</style>