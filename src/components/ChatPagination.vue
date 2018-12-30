<template>
    <div class="pagination-wrapper">
        <div>Page <span class="outstanding">{{ filterPage(page) }}</span> of <span class="outstanding">{{ totalPages }}</span> {{stringOfPages(totalPages)}}</div>
        <div>Total messages: <span class="outstanding">{{ numberWithDotMiles(paginationData.chat.messages.length) }}</span></div>
        <div class="chat-page">
            <span>Page:</span>
            <select name="page-select" class="chat-page-select" @change="onPageChange">
                <!--<option :selected="true">Choose</option>-->
                <option v-for="index in totalPages" 
                :key="index"
                :value="index"
                :selected="page === index">{{ index }}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatPagination',
    props: {
        pagination: {
            type: Object,
            default: function () {
                return {}
            }
        }/*,
        actual: {
            type: Number,
            default: 0
        }*/
    },
    data () {
        return {
            paginationData: null,
            totalPages: 0,
            maxPages: 0,
            page: 0
        }
    },
    created() {
        this.assignVars(this.pagination);
    },
    watch: {
        pagination: function (newValue) {
            //this.paginationData = newValue;
            // eslint-disable-next-line
            console.log(' ---> newValue: ', newValue);
            // eslint-disable-next-line
            console.log('this.paginationData: ', this.paginationData);
            this.assignVars(newValue);
        },
        /*actual: function (newValue) {
            //this.paginationData = newValue;
            // eslint-disable-next-line
            console.log(' ---> newValue: ', newValue);
        },*/
        page: function (newValue) {
            // eslint-disable-next-line
            console.log(' PAGE ---> newValue: ', newValue);
            if(newValue === 0) newValue = 1;
            this.$emit('clicked', newValue);
        }
    },
    methods: {
        assignVars(param) {
            this.paginationData = param;
            this.totalPages = this.paginationData.chat.messages.length;
            this.maxPages = this.paginationData.maxmessages;
            this.page = parseInt(this.paginationData.page, 10);
            let pagesRounded = Math.ceil(this.totalPages / this.maxPages);
            this.totalPages = pagesRounded;
            // eslint-disable-next-line
            console.log('this.paginationData: ', this.paginationData);
            // eslint-disable-next-line
            //console.log('this.totalPages: ', this.totalPages);
            // eslint-disable-next-line
            //console.log('this.maxPages: ', this.maxPages);
            // eslint-disable-next-line
            //console.log('this.page: ', this.page);
            // eslint-disable-next-line
            //console.log('this.totalPages: ', this.totalPages);
        },
        onPageChange(event) {
            this.page = parseInt(event.target.value, 10);
        },
        numberWithDotMiles(num) {
            if (num !== null && num !== undefined) {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        },
        stringOfPages(num) {
            return num > 0 && num < 2 ? 'page' : 'pages';
        },
        filterPage(num) {
            return num === 0 ? 1 : num;
        }
    }/*,
    watch: {
        'page': function (newValue) {
            // eslint-disable-next-line
            console.log(' ---> newValue: ', newValue);
            this.$emit('clicked', newValue);
        }
    }*/
}
</script>

<style lang="scss" scoped>
    .pagination-wrapper {
        margin: 0;
        padding: 0;
        color: var(--grey-regular);
        background-color: pink;
        .chat-page {
            background-color: cyan;
        }
        .outstanding {
            font-weight: var(--weight-bold);
            color: var(--blue-normal);
        }
    }
</style>
