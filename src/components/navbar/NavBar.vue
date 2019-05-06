<template>
    <div>
        <nav class="navbar mt-1 navbar-expand-lg navbar-dark bg-secondary" style="border-radius: 8px">
            <a class="navbar-brand" href="/" style="font-size: 22px;">Finance App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" style="font-size: 20px;">Отчёт</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/help" style="font-size: 20px;">Поддержка</a>
                    </li>
                </ul>
                <router-link to="/profile" style="font-size:18px; color: white">{{person.firstName}} {{person.secondName}}</router-link>
                <button class="ml-4 btn btn-danger" @click="logout" style="font-size:18px">Выход</button>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "NavBar",
        computed:{
          ...mapState({
                person: state => state.auth_account.person
            })
        },
        methods: {
            ...mapActions('auth_account', {
                get: 'getPerson',
            }),
            logout() {
                this.$router.push('/login');
            },
            profile() {
                this.$router.push('/profile');
            }
        },
        created () {
            this.get();
        },
    }
</script>

<style scoped>


    /* Responsive: Portrait tablets and up */
    @media screen and (min-width: 768px) {
        /* Remove the padding we set earlier */
        .masthead,
        .marketing,
        .footer {
            padding-right: 0;
            padding-left: 0;
        }
    }
</style>