<template>
  <div class="wrapper-chat">
    <section class="chat-threads">
      <template v-if="chatContainer">
        <div class="chat-item" 
        data-selected="false"
        v-for="(chatItem, index) in chatContainer" 
        :key="index"
        @click="selectChat(index)">{{ chatItem.threadName }}</div>
      </template>
      <template v-else>
        <div>No data</div>
      </template>
    </section>
    <section class="chat-display">
      <template v-if="chatDataSelected">
        <div class="chat-title">{{ chatDataSelected.threadName }}</div>
        <div class="chat-order">
          <span>Order from:</span>
          <select ref="chatFilterSelect" name="order-select" class="chat-select" @change="onChange">
            <option value="latest">Latest</option>
            <option value="newest">Newest</option>
            <option value="best">Best</option>
            <option value="worst">Worst</option>
          </select>
        </div>
        <ChatList :chat-data="chatObject" />
      </template>
      <template v-else>
        <div>No data</div>
      </template>
    </section>
  </div>
</template>

<script>
import ChatList from './ChatList.vue';

export default {
  name: 'ForoChat',
  components: {
    ChatList
  },
  props: {
    chat: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      chatContainer: null,
      chatDataSelected: null,
      chatObject: null
    }
  },
  created() {
    this.chatContainer = this.chat;
  },
  mounted() {
    this.selectChat(0);
  },
  methods: {
    onChange(event) {
      this.filterVal(event.target.value);
    },
    selectChat(param) {
      this.chatDataSelected = this.chatContainer[param];
      this.setSelected(param);
      this.filterVal('latest');
      let filterSelect = this.$refs.chatFilterSelect;
      if (filterSelect) {
        filterSelect.selectedIndex = 0;
      }
    },
    setSelected(param) {
      let itemsList = document.querySelectorAll('.chat-item'),
        itemsListLength = itemsList.length;

      for (let i = 0; i < itemsListLength; i++) {
        itemsList[i].dataset.selected = false;
      }
      itemsList[param].dataset.selected = true;
    },
    filterVal(param) {
      let paramVal = '';
      let reverse = true;
      switch (param) {
        case 'latest':
          reverse = true;
          paramVal = 'id';
          break;
        case 'newest':
          reverse = false;
          paramVal = 'id';
          break;
        case 'best':
          reverse = false;
          paramVal = 'valoration';
          break;
        case 'worst':
          reverse = true;
          paramVal = 'valoration';
          break;
        default:
          // eslint-disable-next-line
          console.log('No data: ', param);
      }
      this.chatObject = {
        "filter": paramVal,
        "reverse": reverse,
        "chat": this.chatDataSelected
      };
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper-chat {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    @media screen and (min-width: 768px) {
      grid-template-columns: 300px 1fr;
      grid-template-rows: 1fr;
    }
    .chat-threads {
      @media screen and (min-width: 768px) {
        border-right: 1px solid var(--grey-normal);
      }
      .chat-item {
        font-size: var(--font-subtitle);
        border-bottom: 1px solid var(--grey-normal);
        cursor: pointer;
        &:last-child {
          margin: 0;
        }
        &:hover {
          background-color: var(--grey-light);
          color: var(--white-light);
        }
        &[data-selected="true"] {
          background-color: var(--outline-color);
          color: var(--white-light);
          font-weight: var(--weight-bold);
          pointer-events: none;
          cursor: default;
        }
      }
    }
    .chat-display {
      display:flex;
      flex-wrap:wrap;
      .chat-title,
      .chat-order {
        background-color: var(--white-light);
        padding: 5px 0 0 0;
      }
      .chat-title {
        flex-basis: calc(100% - 200px);
        font-size: var(--font-subtitle);
        font-weight: var(--weight-bold);
      }
      .chat-order {
        flex-basis: 200px;
        text-align: right;
        .chat-select {
          margin: 0 10px 0 5px;
        }
      }
    }
  }
</style>
