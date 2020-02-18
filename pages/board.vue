<template>

</template>

<script>
  export default {
    created() {
      this.$axios.get('/api/board')
      .then((res) => {
        console.log(res);
      })
    }
  }
</script>

<style>
</style>
