<template>
  <div class="top-container">
    <v-textarea v-model="text" color="teal">
      <template v-slot:label>
        <div>
          ぼやく
        </div>
      </template>
    </v-textarea>
    <v-btn small>投稿</v-btn>
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
        datas: null,
        text: ''
      }
    },
    created() {
      this.$axios.get('/api/board')
      .then((res) => {
        console.log(res);
        this.datas = res.data.data;
      })
    }
  }
</script>

<style>
  .top-container {
    margin-top: 350px;
  }
  .v-card {
    margin: 50px auto;
    background: black;
  }
</style>
