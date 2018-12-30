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
                <!--<div class="chat-list-message-text"><b>{{ extractIndex(chatInfo.threadID + chatMessage.id) }}</b></div>-->
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
    /*computed: {
      resetIndex() {
        if (this.chatFilter === 'valoration') {
            this.chatPage = 0;
        } else {
            this.chatPage = this.chatPage - 1;
        }
      }
    },*/
    methods: {
        /*extractIndex(str) {
            let reg = str.lastIndexOf('_');
            let ext = str.substring(reg + 1);
            // eslint-disable-next-line
            console.log(' --- str: ', str);
            // eslint-disable-next-line
            console.log(' --- ext: ', ext);
            return ext;
        },*/
        onClickChild (value) {
            // eslint-disable-next-line
            //console.log('value: ', value);
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
            // eslint-disable-next-line
            console.log('111111 - this.chatFilter: ', this.chatFilter);
            //const gggg = this.chatFilter === this.chatFilter;
            /*let point = this.chatFilter === 'valoration';
            let repeat = 0;
            // eslint-disable-next-line
            console.log('+++++ - point: ', point);
            if(point) {
                repeat++;
            } else {
                repeat = 0;
            }
            if (repeat === 1) {
                this.chatPage = 0;
            }*//* else {
                this.chatPage = this.chatPage - 1;
            }*/
            this.chatObject.page = this.chatPage;
            // eslint-disable-next-line
            console.log('this.chatObject: ', this.chatObject);
            // eslint-disable-next-line
            //console.log('this.chatFilter: ', this.chatFilter);
            // eslint-disable-next-line
            /*console.log('this.chatReverse: ', this.chatReverse);
            // eslint-disable-next-line
            console.log('this.chatInfo: ', this.chatInfo);*/
        },
        calculateChat(arr) {
            const from = this.chatPage * this.maxMessages;
            const to = from + this.maxMessages;
            // eslint-disable-next-line
            console.log('from: ', from);
            // eslint-disable-next-line
            console.log('to: ', to);
            //this.numberInit = from;
            return arr.slice(from, to);
        },
        filterChat() {
            const vm = this;
            let tmpObj = this.chatInfo.messages;
            // eslint-disable-next-line
            //console.log('tmpObj: ', tmpObj);
            tmpObj.sort(function(a, b) {
                const filterA = vm.filterParam(a[vm.chatFilter]);
                const filterB = vm.filterParam(b[vm.chatFilter]);
                if (vm.chatReverse) {
                    return (filterA > filterB) ? 1 : -1;
                } else {
                    return (filterA < filterB) ? 1 : -1;
                }
            });
            //if(tmpObj.length > this.maxMessages) tmpObj = tmpObj.slice(0, this.maxMessages);
            //if(tmpObj.length > this.maxMessages) tmpObj = this.calculateChat(tmpObj);
            this.chatFiltered = this.calculateChat(tmpObj);
            // eslint-disable-next-line
            //console.log('this.chatFiltered: ', this.chatFiltered);
        },
        filterIndex(identificator, iterator) {
            if (this.chatFilter === 'valoration') {
                let calc = (this.chatPage * this.maxMessages) + iterator + 1;
                // eslint-disable-next-line
                //console.log('calc: ', calc);
                //return this.numberInit + iterator + 1;
                return calc;
            } else {
                return this.filterParam(identificator);
            }
        },
        filterParam(param) {
            return parseInt(param.replace(/[^0-9]/g, ''), 10);
        }
    },
    watch: {
        'chatData': function (newValue) {
            this.updateChat(newValue);
        },
        'chatFilter': function (newValue, oldValue) {
            // eslint-disable-next-line
            //console.log(' ---> oldValue: ', oldValue);
            // eslint-disable-next-line
            //console.log(' ---> newValue: ', newValue);
            if(newValue !== oldValue) {
                // eslint-disable-next-line
                console.log(' - CAMBIA -> newValue: ', newValue);
                this.chatPage = 0;
                // eslint-disable-next-line
                //console.log('this.chatObject: ', this.chatObject);
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
        background-color: coral;
        .chat-list {
            margin: 0;
            padding: 5px 10px;
            .chat-list-message {
                display:flex;
                flex-wrap:wrap;
                margin: 0 0 5px 0;
                padding: 0;
                border-bottom: 1px solid var(--grey-light);
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
