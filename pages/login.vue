<template>
  <form>
    Email<input type="text" v-model="loginForm.email"><br>
    Password <input type="password" v-model="loginForm.password"><br>
    <input type="submit" @click.prevent="login">
  </form>
</template>

<script>
  export default {
    middleware({ store, redirect }){
      if(store.$auth.logedIn){
        redirect('/');
      }
    },
    data(){
      return {
        loginForm: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        this.$auth.loginWith('local', { data: this.loginForm });
      }
    }
  }
</script>

<style>
</style>
