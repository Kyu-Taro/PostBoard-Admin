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

    <div v-for="data in datas" :key="data.id">
      <v-card class="mx-auto" dark max-width="400">
        <v-card-title>
          <v-icon large left>
            mdi-twitter
          </v-icon>
          <span class="title font-weight-light">BOYAKI</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
          {{ data.text }}
        </v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img class="elevation-6" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ data.user.name }}</v-list-item-title>
            </v-list-item-content>

            <v-row align="center" justify="end">
              <v-icon class="mr-1" @click="update(data.id)">mdi-grease-pencil</v-icon>
              <span class="mr-1">·</span>
              <v-icon class="mr-1" @click="del(data.id)">mdi-delete</v-icon>
            </v-row>

          </v-list-item>
        </v-card-actions>
      </v-card>
    </div>

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
        this.datas = res.data.data;
      })
    },
    methods: {
      async del(val) {
        await this.$axios.delete('/api/board/' + val);
        this.$router.go({ path: this.$router.currentRoute.path, force: true });
      },
      async update(val) {
        await this.$store.dispatch('board/setId', val);
        this.$router.push('/postUpdate');
      }
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
  .v-card {
    margin: 50px auto;
    background: black;
  }
  .v-icon {
    cursor: pointer;
  }
</style>
