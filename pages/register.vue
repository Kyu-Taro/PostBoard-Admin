<template>
  <div>
    <v-form v-model="valid">
      <v-text-field v-model="form.name" :rules="nameRules" label="Name" required></v-text-field>
      <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="form.password" :rules="passwordRules" label="Password" :counter="8" type="password" required></v-text-field>
      <v-btn small @click="register">Sign Up</v-btn>
    </v-form>
  </div>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      if (store.$auth.loggedIn) {
        redirect('/mypage');
      }
    },
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: ''
        },
        nameRules: [
          v => !!v || '名前を入力してください'
        ],
        emailRules: [
          v => !!v || 'メールアドレスを入力してください',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mailを正しく入力してください'
        ],
        passwordRules: [
          v => !!v || 'パスワードを入力してください',
          v => v.length >= 8 || 'パスワードは8文字以上で設定してください'
        ]
      }
    },
    methods: {
      async register() {
        await this.$axios.post('/api/auth/register', this.form)
        .then((res) => {
          this.$auth.loginWith('local', { data: this.form });
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style>
  form {
    margin: 250px auto;
    width: 50%;
  }
  .v-messages__message {
    color: red;
  }
</style>
