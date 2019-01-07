<template>
    <div class="chat-list-wrapper">
        <div class="chat-list">
            <div class="chat-list-message" 
            v-for="(chatMessage, index) in chatFiltered" 
            :key="index"
            :id="chatInfo.threadID + chatMessage.id"
            :data-valoration="chatMessage.valoration">
                <div class="chat-list-message-author">{{ filterIndex(chatMessage.id, index) }} - {{ chatMessage.authorName }} (ID: {{ chatMessage.id }})</div>
                <div class="chat-list-message-time">{{ chatMessage.timestamp }}</div>
                <div class="chat-list-message-text">{{ chatMessage.text }}</div>
                <div class="chat-list-message-valoration">Valoration: {{ chatMessage.valoration }}</div>
            </div>
        </div>
        <div class="chat-pagination">
            <ChatPagination v-if="chatInfo.messages.length > maxMessages" :pagination="chatObject" @clicked="onClickChild" />
        </div>
    </div>
</template>

<script>
import ChatPagination from './ChatPagination.vue';

export default {
    name: 'ChatList',
    components: {
        ChatPagination
    },
    props: {
        chatData: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            chatObject: null,
            chatFiltered: null,
            chatFilter: '',
            chatReverse: false,
            maxMessages: 5,
            chatPage: 0
        }
    },
    created() {
        this.assignVars(this.chatData);
    },
    mounted() {
        this.filterChat();
    },
    methods: {
        onClickChild (value) {
            this.chatPage = value - 1;
            this.updateChat(this.chatObject);
        },
        updateChat(param) {
            this.assignVars(param);
            this.filterChat();
        },
        assignVars(param) {
            this.chatObject = param;
            this.chatFilter = this.chatObject['filter'];
            this.chatReverse = this.chatObject['reverse'];
            this.chatInfo = this.chatObject['chat'];
            this.chatObject.maxmessages = this.maxMessages;
            this.chatObject.page = this.chatPage;
        },
        calculateChat(arr) {
            const from = this.chatPage * this.maxMessages;
            const to = from + this.maxMessages;
            return arr.slice(from, to);
        },
        filterChat() {
            const vm = this;
            let tmpObj = this.chatInfo.messages;
            tmpObj.sort(function(a, b) {
                const filterA = vm.parseParam(a[vm.chatFilter]);
                const filterB = vm.parseParam(b[vm.chatFilter]);
                if (vm.chatReverse) {
                    return (filterA > filterB) ? 1 : -1;
                } else {
                    return (filterA < filterB) ? 1 : -1;
                }
            });
            this.chatFiltered = this.calculateChat(tmpObj);
        },
        filterIndex(identificator, iterator) {
            if (this.chatFilter === 'valoration') {
                return this.filterParam(iterator);
            } else {
                return this.parseParam(identificator);
            }
        },
        parseParam(param) {
            return parseInt(param.replace(/[^0-9]/g, ''), 10);
        },
        filterParam(param) {
            return (this.chatPage * this.maxMessages) + param + 1;
        }
    },
    watch: {
        'chatData': function (newValue) {
            this.updateChat(newValue);
        },
        'chatFilter': function (newValue, oldValue) {
            if(newValue !== oldValue) {
                this.chatPage = 0;
                this.updateChat(this.chatObject);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .chat-list-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        color: var(--grey-regular);
        background-color: var(--white-light);
        .chat-list {
            margin: 0;
            padding: 5px 10px;
            .chat-list-message {
                display:flex;
                flex-wrap:wrap;
                margin: 0 0 5px 0;
                padding: 0;
                padding: 5px 10px;
                background-color: var(--white-pure);
                &:last-child {
                    margin: 0;
                    border-bottom: none;
                }
                .chat-list-message-author,
                .chat-list-message-time {
                    flex-basis:calc(100% / 2);
                }
                .chat-list-message-author {
                    text-align: left;
                    font-weight: var(--weight-bold);
                }
                .chat-list-message-time {
                    text-align: right;
                    font-size: var(--font-litle);
                    color: var(--grey-normal);
                }
                .chat-list-message-text {
                    width: 100%;
                    margin-bottom: 5px;
                    text-align: left;
                }
                .chat-list-message-valoration {
                    width: 100%;
                    margin-bottom: 5px;
                    text-align: right;
                    font-size: var(--font-small);
                    color: var(--grey-normal);
                }
            }
        }
        .chat-pagination {
            margin: 0;
            padding: 5px 10px;
        }
    }
</style>
