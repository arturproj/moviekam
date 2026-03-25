<template>

    <div class="flex items-center gap-4 my-auto h-3/4">
        <div class="absolute top-0 right-0 text-white">
            <IconCloseMark class="w-7 mr-2 mt-2" :onClick="() => this.closeModal()" />
        </div>
        <img v-if="!this.watch"
            class="mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-left min-w-4xl h-auto"
            :src="`https://image.tmdb.org/t/p/w1280${film.backdrop_path}`" />
        <iframe v-else :src="`https://www.youtube.com/embed/${this.watch}`" :title="film.title" frameborder="0"
            width="1280" height="520"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
        <div class="font-medium w-2/4">
            <p class="font-mono bungee-regular uppercase text-slate-50 text-2xl">{{ film.title }}</p>
            <span class="flex items-center text-slate-50 text-lg gap-2">
                <IconEye class="w-7 mr-2" /> {{ film.popularity }}
            </span>
            <p class="mt-1 text-sm leading-relaxed text-balance text-gray-50">
                {{ film.overview }}
            </p>

            <div class="flex flex-nowrap overflow-x-auto px-2 scrollbar h-1/8">
                <div v-for="item in this.watchItems" :key="item.id.videoId" class="card max-w-48 m-1 my-2 rounded-sm">
                    <img :src="`https://img.youtube.com/vi/${item.id.videoId}/hqdefault.jpg`" class="rounded-sm"
                        :onClick="(e) => this.switchVideo(item.id.videoId, e)" />
                </div>
            </div>

        </div>
    </div>
    <div class="flex flex-nowrap overflow-x-auto px-2 scrollbar h-1/4">
        <div v-for="item in this.collection.filter(item => item.backdrop_path != null && item.poster_path != null)"
            :key="item.id" class="card w-32 max-w-32 min-w-32 m-1 my-2 rounded-sm">
            <img :src="`https://image.tmdb.org/t/p/w200${item.poster_path}`" class="rounded-sm" />
        </div>
    </div>
</template>
<script>
import { getVideoByName } from '@/api/ytube';
import { apiGetMovie } from '@/api/movie';
import IconEye from './icons/IconEye.vue';
import IconCloseMark from './icons/IconCloseMark.vue';

export default {
    components: {
        IconEye,
        IconCloseMark
    },
    props: {
        film: Object,
        closeModal: Function
    },
    data() {
        return {
            collection: [],
            watch: null,
            watchItems: []
        }
    },
    async mounted() {
        this.collection = (await apiGetMovie(this.film.genre_ids)).results.filter(item => item.id != this.film.id)
        // preview items
        const ytube = (await getVideoByName(this.film.title))
        console.log({
            film: this.film,
            collection: this.collection,
            ytube
        })


        if (ytube?.items && ytube?.items.length) {
            // preview items
            this.watchItems = ytube.items
            this.watch = this.watchItems[0].id.videoId
            console.log(this.watch, this.watchItems)
        }
    },
    methods: {
        switchVideo(key, e) {
            e.preventDefault()
            this.watch = key
        }
    }
}
</script>