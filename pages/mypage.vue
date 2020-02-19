<template>
  <div class="top_container">
    <v-card class="mx-auto profile" max-width="400" color="white">
      <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      </v-img>

      <v-card-subtitle class="pb-0">{{ user.name }}</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ user.email }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn class="orange" text href="/edit">edit</v-btn>
        <v-btn class="orange" text href="/delete">delete</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      if (!store.$auth.loggedIn) {
        redirect('/login');
      }
    },
    data() {
      return {
        datas: null
      }
    },
    computed: {
      user() {
        return this.$auth.user.user;
      }
    },
    created() {
      this.$axios.get('/api/board/' + this.user.id)
      .then((res) => {
        console.log(res);
        this.datas = res.data.data;
      })
    }
  }
</script>


<style>
  .top_container {
    margin-top: 250px;
  }
  .profile {
    margin: auto;
  }
  .orange .v-btn__content {
    color: orange;
  }
</style>
