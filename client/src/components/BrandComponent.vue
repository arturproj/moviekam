<template>
  <!-- Popular Brand -->
  <p class="text-white">{{ title }}</p>
  <div class="flex flex-nowrap overflow-x-auto px-2 scrollbar">
    <div v-for="item in movies" :key="item.id" class="card min-w-48 m-1 my-2 rounded-sm">
      <img :src="`https://image.tmdb.org/t/p/w200/${item.poster_path}`" class="rounded-sm"
        :onClick="(e) => setModalData(item, e)" />
    </div>
  </div>
  <!-- end Popular Brand -->
</template>
<script>
export default {
  props: {
    title: String,
    movies: Array,
    setModalData: Function
  }
}
</script>