<template>
    <!--<div>
        <nav class="navbar navbar-expand-md navbar-dark bg-secondary fixed-top">
            <a class="navbar-brand" href="/login">Finance App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" accountId="navbarCollapse">
                <ul class="navbar-nav mr-auto">

                </ul>
            </div>
            <button class="ml-5 btn btn-info" @click="login">Вход</button>
            <button class="ml-3 btn btn-outline-danger" @click="register">Регистрация</button>
        </nav>
    </div>-->
    <div>
        <nav class="navbar mt-1 navbar-expand-lg navbar-dark bg-secondary" style="border-radius: 8px">
            <a class="navbar-brand" href="/" style="font-size: 22px;">Finance App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/about" style="font-size:20px">О нас</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact" style="font-size:20px">Контакты</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/help-guest" style="font-size:20px">Поддержка</a>
                    </li>
                </ul>
                <button class="ml-5 btn btn-info" @click="login" style="font-size:18px">Вход</button>
                <button class="ml-3 btn btn-outline-danger" @click="register" style="font-size:18px">Регистрация</button>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        methods: {
            login(){
                this.$router.push('/login');
            },
            register(){
                this.$router.push('/register');
            }
        }
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