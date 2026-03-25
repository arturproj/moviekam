<template>
  <div class="flex flex-col w-screen h-screen">
    <NavBar :gravatar="this.gravatar" />

    <!-- Main -->
    <div class="h-13/13 w-full overflow-y-auto">

      <!-- Popular Brand -->
      <BrandComponent title="Popular" :movies="this.movies.popular.results" :setModalData="this.setModalData" />
      <!-- end Popular Brand -->

      <!-- Animation Brand -->
      <BrandComponent title="Animation" :movies="this.movies.animation.results" :setModalData="this.setModalData" />
      <!-- end Animation Brand -->

      <!-- Action Brand -->
      <BrandComponent title="Action" :movies="this.movies.action.results" :setModalData="this.setModalData" />
      <!-- end Action Brand -->

      <!-- Adventure Brand -->
      <BrandComponent title="Adventure" :movies="this.movies.adventure.results" :setModalData="this.setModalData" />
      <!-- end Adventure Brand -->

    </div>
    <!-- end Main -->
    <!-- Modal -->
    <div v-if="this.modalIsOpen" class="absolute z-10 bg-black w-full h-screen">
      <ModalMovie :film="this.modal" :closeModal="this.closeModal" />
    </div>
    <!-- end Modal -->
    <!-- Footer -->
    <!-- <div class="h-1/14 bg-pink-500 w-full">footer</div> -->
    <!-- end Footer -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {
  getPopularMovies,
  apiGetMovie,
  CODE_ID_MOVIE
} from './api/movie';
import NavBar from './components/NavBar.vue';
import BrandComponent from './components/BrandComponent.vue';
import IconEye from './components/icons/IconEye.vue';
import ModalMovie from './components/ModalMovie.vue';
import { getVideoByName } from './api/ytube';

export default defineComponent({
  components: {
    NavBar,
    BrandComponent,
    IconEye,
    ModalMovie
  },
  data() {
    return {
      movies: {
        popular: { results: [] },
        action: { results: [] },
        adventure: { results: [] },
        animation: { results: [] },
      },
      gravatar: "69c7f4cc22620c5cfd43354fe6a4d8e0",
      modalIsOpen: false,
      modal: null
    }
  },
  async mounted() {
    try {
      this.movies = await Promise.all([
        getPopularMovies(),
        apiGetMovie([CODE_ID_MOVIE.ACTION]),
        apiGetMovie([CODE_ID_MOVIE.ADVENTURE]),
        apiGetMovie([CODE_ID_MOVIE.ANIMATION])
      ]).then(([popular, action, adventure, animation]) => {
        return {
          popular,
          action,
          adventure,
          animation
        }
      });
    } catch (error) {
      console.error('One promise failed:', error);
    }
  },
  methods: {
    setModalData(movie, e) {
      e.preventDefault()
      this.modal = movie
      this.openModal()
    },
    openModal() {
      this.modalIsOpen = true
    },
    closeModal() {
      this.modal = null
      this.modalIsOpen = false
    },
    async getCollection(with_genres) {
      return await apiGetMovie(with_genres)
    }
  },
})
</script>
<style>
.card {
  background-color: black;
  margin: calc(var(--spacing) * 1) !important;
}



/* Hide scrollbars on touch devices (mobile) */
@media (hover: none) and (pointer: coarse) {

  /* Nasconde la barra di scorrimento per Chrome, Safari, Opera */
  .scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Nasconde la barra di scorrimento per Firefox */
  .scrollbar {
    scrollbar-width: none;
  }

  /* Nasconde la barra di scorrimento per Internet Explorer e Edge */
  .scrollbar {
    -ms-overflow-style: none;
  }
}

/* Show thin scrollbar on desktop */
@media (hover: hover) and (pointer: fine) {

  /* Nasconde la barra di scorrimento per Chrome, Safari, Opera */
  .scrollbar::-webkit-scrollbar {
    display: thin;
  }

  /* Nasconde la barra di scorrimento per Firefox */
  .scrollbar {
    scrollbar-width: thin;
  }

  /* Nasconde la barra di scorrimento per Internet Explorer e Edge */
  .scrollbar {
    -ms-overflow-style: thin;
  }
}
</style>