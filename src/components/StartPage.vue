<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <v-container mt-5 fluid grid-list-sm>
        <v-layout row wrap justify-center>
          <v-flex ml-2 mb-2 mt-2 mr-2 xs2 v-for="movie in movies" :key="movie.id">
            <v-card>
              <v-card-media :src="`http://image.tmdb.org/t/p/w185/${movie.backdrop_path}`" height="230">
              </v-card-media>
              <v-card-title primary-title>
                <div>
                  <h3 class="truncate headline mb-0">{{movie.title}}</h3>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn color="primary">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      movies: []
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
      })
  },
  methods: {
  }
}
</script>

<style scoped>
.truncate {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
