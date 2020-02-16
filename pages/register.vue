<template>
  <div>
    <form>
      <label for="name">名前</label>
      <input type="text" id="name" v-model="form.name"><br>
      <label for="email">メールアドレス</label>
      <input type="text" id="email" v-model="form.email"><br>
      <label for="password">パスワード</label>
      <input type="password" id="password" v-model="form.password"><br>
      <button @click.prevent="register">登録</button>
    </form>
    <button @click.prevent="mypage">移動</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: ''
        }
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
