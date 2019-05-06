<template>
    <div class="container" style="border: 1px solid black">
        <nav-bar v-if="auth_account !== null"/>
        <nav-bar-guest v-else/>
        <br/>
        <div class="jumbotron p-4"style="border: 1px solid #2b7855" >
            <div class="col-md-10 mx-auto" style="border: 1px solid fuchsia">
                <router-view></router-view>
        </div>
    </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import NavBar from "../../src/components/navbar/NavBar";
import NavBarGuest from "../../src/components/navbar/NavBarGuest";

export default {
    name: 'app',
    components: {NavBar, NavBarGuest},
    computed: {
        ...mapState({
            auth_account: state => state.auth_account.user
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>