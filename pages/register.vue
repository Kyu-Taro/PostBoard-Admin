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
  import axios from 'axios'

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
        await axios.post('http://127.0.0.1:8000/api/auth/register', this.form)
        .then((res) => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      },
      async mypage() {
        await axios.get('http://127.0.0.1:8000/api/mypage')
        .then((res) => {
          console.log(res);
          if (!empty(res.data)) {
            this.$router.push('/mypage');
          } else {
            this.$router.push('/register');
          }
        })
      }
    }
  }
</script>
