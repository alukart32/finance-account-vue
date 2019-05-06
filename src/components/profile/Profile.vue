<template>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-6" style="border: 0.1px solid grey">
                    <div class="row justify-content-md-center">
                        <div>
                            <img alt="Here should be your little hedgehog" src="https://avatars2.githubusercontent.com/u/27971488?s=400&u=6654e216a42f68c47d7794a2a17df792e3308917&v=4"
                                 class="rounded-circle"  style="border: 0.1px solid grey;width: 250px; height: 250px"/>
                            <div style="margin-left: 38px;">
                                <h4>
                                    {{this.person.firstName}} {{this.person.secondName}}
                                </h4>
                                <h5 class="text-left">
                                    username: {{this.person.username}}
                                </h5>
                                <h5 class="text-left">
                                    email: {{this.person.email}}
                                </h5>
                                <button class="btn btn-primary" @click="edit">Изменить</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6" style="border: 0.1px solid goldenrod">
                    <button class="btn btn-link">a</button>
                </div>
            </div>
        </div>
    </div>
</template>

<!--
2
<div class="row justify-content-md-center">
    <div class="col-md-9">
        <div class="row">
            <div class="col-md-6">
                <div class="col-md-6" style="border: 1px solid red">
                    <img alt="Bootstrap Image Preview" src="https://avatars2.githubusercontent.com/u/27971488?s=400&u=6654e216a42f68c47d7794a2a17df792e3308917&v=4"
                         class="rounded-circle"  style="border: 0.1px solid grey;width: 250px; height: 250px"/>
                </div>

                <div class="col-md-6" style="border: 1px solid red">
                    <h4>
                        {{this.person.firstName}} {{this.person.secondName}}
                    </h4>
                    <h5 class="text-left">
                        username: {{this.person.username}}
                    </h5>
                    <h5 class="text-left">
                        email: {{this.person.email}}
                    </h5>
                </div>
            </div>
            <div class="col-md-4" style="border: 1px solid royalblue">
                <button class="btn btn-link">a</button>
            </div>
        </div>
    </div>
</div>-->
<!--
1
<div>
    <div class="row justify-content-md-center">
        <div class="col-md-9">
            <div class="col-md-4" style="border: 1px solid red">
                <img alt="Bootstrap Image Preview" src="https://avatars2.githubusercontent.com/u/27971488?s=400&u=6654e216a42f68c47d7794a2a17df792e3308917&v=4"
                     class="rounded-circle"  style="border: 0.1px solid grey;width: 250px; height: 250px"/>
            </div>

            <div class="col-md-4" style="border: 1px solid red">
                <h4>
                    {{this.person.firstName}} {{this.person.secondName}}
                </h4>
                <h5 class="text-left">
                    username: {{this.person.username}}
                </h5>
                <h5 class="text-left">
                    email: {{this.person.email}}
                </h5>
            </div>
            &lt;!&ndash;<div class="col-md-4" style="border: 1px solid red">

                &lt;!&ndash;<h3>
                    h3. Lorem ipsum dolor sit amet.
                </h3>&ndash;&gt;
            </div>&ndash;&gt;
        </div>
    </div>
</div>-->

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "Profile",
        computed: {
            ...mapState({
                person: state => state.auth_account.person
            })
        },
        methods: {
            ...mapActions('accounts',{
                edit: 'editAccount'
            }),
            edit(){
                this.$router.push('/');
            }
        },
        created(){
            this.get();
        }
    }
</script>

<style scoped>

</style>