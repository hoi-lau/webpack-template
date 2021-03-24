<template>
  <div class="container">
    {{ msg }}
    <VContent />
    <button @click="importLoadash">load loadash</button>
  </div>
</template>

<script>
// import _ from 'lodash'
export default {
  components: {
    VContent: () => import(/* webpackPrefetch: true */ './Content')
  },
  data() {
    return {
      msg: 'hello world!!!!'
    }
  },
  methods: {
    init() {},
    importLoadash() {
      // console.log(_)
      // import('lodash').then(({ default: _ }) => {
      //   console.log(_)
      // })
    }
  }
}
</script>
<style lang="stylus" scoped>
.container
  background-color pink
</style>