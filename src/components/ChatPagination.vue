<template>
    <div class="pagination-wrapper">
        <div class="chat-info">
            <span class="outstanding">{{ filterPage(page) }}</span> 
            of <span class="outstanding">{{ totalPages }}</span> {{stringOfPages(totalPages)}}
            (<span class="outstanding">{{ numberWithDotMiles(paginationData.chat.messages.length) }}</span> total messages)
        </div>
        <div class="chat-page">
            <span>Page:</span>
            <select name="page-select" class="chat-page-select" @change="onPageChange">
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
        }
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
            this.assignVars(newValue);
        },
        page: function (newValue) {
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
    }
}
</script>

<style lang="scss" scoped>
    .pagination-wrapper {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 250px 1fr;
        margin: 0;
        padding: 0;
        color: var(--grey-regular);
        .chat-info {
            text-align: left;
        }
        .chat-page {
            text-align: right;
            .chat-page-select {
                margin: 0 0 0 5px;
            }
        }
        .outstanding {
            font-weight: var(--weight-bold);
            color: var(--blue-normal);
        }
    }
</style>
