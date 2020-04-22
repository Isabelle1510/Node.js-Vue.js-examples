<template>
  <div class="container">
    <div class="row">
      <div class="wrapper col d-flex flex-column align-items-center">
        <span class="title align-self-baseline">Most popular books of all time</span>
        <BookTable :books="getBooksForCurrentPage()"/>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{ 'disabled' : pageNumber <= 1 }">
              <a class="page-link" v-on:click="setFirstPage">
                <span aria-hidden="true">First</span>
              </a>
            </li>
            <template v-if="pageNumber > 1">
              <li class="page-item"><a class="page-link" v-on:click="decreasePageNumber">{{pageNumber-1}}</a></li>
            </template>
            <li class="page-item active"><a class="page-link">{{pageNumber}}</a></li>
            <template v-if="books.length > (this.pageNumber * this.perPage)">
              <li class="page-item"><a class="page-link" v-on:click="increasePageNumber">{{pageNumber+1}}</a></li>
            </template>
            <li class="page-item" :class="{ 'disabled' : books.length <= maxPages }">
              <a class="page-link" v-on:click="setLastPage" aria-label="Next">
                <span aria-hidden="true">Last</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import BookTable from './BookTable.vue'
import { books } from '../assets/books.json'

export default {
  name: 'Overview',
  components: {
    BookTable
  },
  data () {
    return {
      rows: 100,
      perPage: 5,
      pageNumber: 1,
      books: books
    }
  },
  methods: {
    increasePageNumber () {
      this.pageNumber += 1
    },
    decreasePageNumber () {
      if (this.pageNumber !== 1) {
        this.pageNumber -= 1
      }
    },
    setFirstPage () {
      this.pageNumber = 1
    },
    setLastPage () {
      this.pageNumber = Math.ceil(this.books.length / this.perPage)
    },
    getBooksForCurrentPage () {
      return this.books.slice(this.offset, this.offset + this.perPage)
    }
  },
  computed: {
    offset: function () {
      return (this.pageNumber - 1) * this.perPage
    },
    maxPages: function () {
      return this.pageNumber * this.perPage
    }
  }
}
</script>

<style>
.wrapper {
  background-color: white;
  padding-top: 1vw;
  border-radius: 1%;
}

.title {
  font-weight: bold;
  font-size: larger;
}
</style>
