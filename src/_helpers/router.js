import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../components/home/HomePage'
import LoginPage from '../components/login/LoginPage'
import RegisterPage from '../components/register/RegisterPage'

import About from '../components/about/About'
import Contact from '../components/contact/Contact'
import Profile from '../components/profile/Profile'
import HelpGuest from '../components/help/HelpGuest'

import Accounts from '../components/model/account/Accounts'
import AccountDetail from '../components/model/account/AccountDetail'
import AddAccount from '../components/model/account/AddAccount'
import UpdateAccount from '../components/model/account/UpdateAccount'
import Operations from '../components/txn/Operations'


import Help from '../components/help/Help'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },

    // loged in user's pages
    {path:'/accountDetail/:id', component: AccountDetail, props: true},
    {path:'/updateAccount/:id', component: UpdateAccount, props: true},
    {path:'/account/:id/operations/:curr', component: Operations, props: true},

    {path:'/addAccount', component: AddAccount},


      // guest's public pages
    {path: '/about', component: About},
    {path: '/contact', component: Contact},
    {path: '/profile', component: Profile},
    {path: '/help-guest', component: HelpGuest},
    {path: '/help', component: Help},

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/about', '/contact', '/help-guest'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});