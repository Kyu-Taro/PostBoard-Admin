<template>
  <div class="top-container">
    <v-textarea v-model="text" color="teal">
      <template v-slot:label>
        <div>
          ぼやく
        </div>
      </template>
    </v-textarea>
    <v-btn small @click="update">編集</v-btn>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    },
    created() {
      const id = this.$store.getters['board/id'];
      console.log(id);
      this.$axios.get('/api/postData/' + id)
      .then((res) => {
        console.log(res);
        this.text = res.data.data.text;
      })
    },
    computed: {
      id() {
        return this.$store.getters['board/id'];
      }
    },
    methods: {
      async update() {
        await this.$axios.put('/api/board/' + this.id, { text: this.text });
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
