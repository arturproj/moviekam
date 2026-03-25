<template>
    <div class="flex">
        <div class="size-14 flex-none bungee-regular px-1 text-slate-50">moviekam</div>
        <div class="invisible size-14 grow"></div>
        <div class="size-14 flex-none p-2">
            <img :src="`https://gravatar.com/avatar/${gravatar}`" class="rounded-full" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        gravatar: String
    }
}
</script>