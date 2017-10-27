<template>
  <v-layout v-scroll="onScroll" mt-5>
    <v-flex xs12 sm8 offset-sm2>
      <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
        <v-layout row>
          <v-flex xs8 offset-xs2>
            <v-text-field name="input-2-3" label="Search" class="input-group--focused" v-model="searchString" single-line></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <transition-group name="list" tag="p">
            <span v-for="item in filteredMovies" v-bind:key="item.id" class="list-item">
              <img :src="`http://image.tmdb.org/t/p/w600/${item.poster_path}`" width="270px" height="400px" />
            </span>
          </transition-group>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'

export default {
  data() {
    return {
      movies: [],
      currentPageLoaded: 1,
      scrollOffsetBottom: 1000,
      searchString: '',
      filteredMovies: []
    }
  },
  created() {
    Vue.axios
      .get(
        'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc',
        {
          params: {
            api_key: '667cd61fb50d8c5fff3ac5f37fd760b7'
          }
        }
      )
      .then(response => {
        this.movies = response.data.results
        this.filteredMovies = this.movies
      })
  },
  watch: {
    searchString: function () {
       this.expensiveOperation()
     }
  },
  methods: {
    loadMore() {
      Vue.axios
        .get(
          `http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${this
            .currentPageLoaded + 1}`,
          {
            params: {
              api_key: '667cd61fb50d8c5fff3ac5f37fd760b7'
            }
          }
        )
        .then(response => {
          this.movies = this.movies.concat(response.data.results)
          this.currentPageLoaded++
        })
    },
    onScroll(e) {
      let pos =
        (document.documentElement.scrollTop || document.body.scrollTop) +
        document.documentElement.offsetHeight
      let max = document.documentElement.scrollHeight
      if (pos == max) {
        this.loadMore()
      }
    },
    expensiveOperation: _.debounce(function () {
      setTimeout(function () {
        this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchString))
      }.bind(this), 200)
    }, 200)
  }
}
</script>

<style scoped>
img {
  object-fit: cover;
}

.list-item {
  margin: 2px;
}

.list-enter-active {
  transition: all 1s;
}

.list-leave-active {
  transition: all 0.2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
