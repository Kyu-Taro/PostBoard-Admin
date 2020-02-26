<template>
  <div class="top-container">
    <v-text-field v-model="form.name" :rules="nameRules" label="Name" required></v-text-field>
    <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-btn small @click="edit(user.id)">更新</v-btn>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: ''
        },
        nameRules: [
          v => !!v || '名前を入力してください'
        ],
        emailRules: [
          v => !!v || 'emailを入力してください',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mailを正しく入力してください'
        ]
      }
    },
    created() {
      const id = this.$store.getters['user/id'];
      this.$axios.get('/api/me')
      .then((res) => {
        console.log(res);
        this.form.name = res.data.user.name;
        this.form.email = res.data.user.email;
      });
    },
    computed: {
      user() {
        return this.$auth.user.user;
      }
    },
    methods: {
      async edit(id) {
        await this.$axios.put('/api/user/' + id, { name: this.form.name, email: this.form.email })
        this.$router.push('/mypage');
      }
    }
  }
</script>

<style>
  .top-container {
    margin-top: 250px;
  }
</style>
