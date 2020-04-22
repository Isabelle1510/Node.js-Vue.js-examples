<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" class="left-aligned">Title</th>
        <th scope="col">Published</th>
        <th scope="col">Rating</th>
        <th scope="col">Buy On</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(book, index) in books">
        <tr id="table-content" :key="index" data-toggle="collapse" :data-target="'#' + index" class="clickable">
          <th>
            <div class="d-flex align-items-start">
              <div>
                <img class="book-cover" :src="book.cover">
              </div>
              <div class="book-info left-aligned">
                <div>
                  {{book.title}}
                </div>
                <div class="author-name">
                  {{book.author}}
                </div>
              </div>
            </div>
          </th>
          <td>{{book.publishingDate}}</td>
          <td>{{book.rating}}/10</td>
          <td>
            <div v-for="(purchasingLink, index) in book.purchasingLinks" :key="index">
              <a :href=purchasingLink.url target="_blank">{{purchasingLink.site}}</a>
            </div>
          </td>
        </tr>
        <tr :key="index + 'summary'">
          <td colspan=4 style="border: none">
            <div :id="index" class="collapse left-aligned">{{book.summary}}</div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import * as $ from 'jquery'

export default {
  name: 'BookTable',
  props: {
    books: {
      type: Array,
      required: true
    }
  },
  watch: {
    books: function () {
      $(document).ready(function () {
        $('.collapse').removeClass('show')
      })
    }
  }
}
</script>

<style>
.table {
  border-top-style: hidden;
}

.table tbody tr:nth-child(4n+1), .table tbody tr:nth-child(4n+2) {
 background: #FAFAFF;
}

.book-cover {
  max-width: 5vw;
}

.book-info {
  margin-left: 1.5vw;
}

.left-aligned {
  text-align: left;
}

.author-name {
  font-weight: normal;
  color: gray;
}
</style>
