<template>
  <v-form v-model="valid">
    <v-text-field v-model="loginForm.email" :rules="loginForm.emailRules" label="E-mail" required></v-text-field>
    <v-text-field v-model="loginForm.password" :rules="loginForm.passwordRules" label="Password" required type="password"></v-text-field>
     <v-btn small @click="login">login</v-btn>
  </v-form>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      if (store.$auth.loggedIn) {
        redirect('/mypage');
      }
    },
    data(){
      return {
        valid: false,
        loginForm: {
          email: '',
          emailRules: [
            v => !!v || 'E-mailを入力してください',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mailを正しく入力してください'
          ],
          password: '',
          passwordRules: [
            v => !!v || 'Passwordを入力してください',
          ]
        }
      }
    },
    methods: {
      login() {
        this.$auth.loginWith('local', { data: this.loginForm });
      },
    }
  }
</script>

<style>
  form {
    width: 50%;
    margin: 250px auto;
  }
  .v-messages__message {
    color: red;
  }
</style>
