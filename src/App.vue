<template>
  <div id="app">
    <div id="app" class="wrapper">
      <section class="wrapper-data">
        Vue Chat
      </section>
      <section class="wrapper-data">
        <ForoChat v-if="chatData" :chat="chatData"/>
      </section>
    </div>
  </div>
</template>

<script>
import { threads } from './mocks/data.js'
import ForoChat from './components/ForoChat.vue'

export default {
  name: 'app',
  components: {
    ForoChat
  },
  data () {
    return {
      chatData: null
    }
  },
  mounted() {
    this.chatData = threads;
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    width: calc(100% - 40px);
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 20px 0;
    text-align: center;
    color: var(--grey-regular);
    .wrapper-data {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: unset;
      margin: 0 auto 20px 0;
      padding: 0;
      outline: 1px solid #dedede;
      &:last-child {
        margin: 0 auto;
      }
    }
  }
</style>
