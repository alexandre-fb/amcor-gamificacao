<template>
    <div class="w-full flex border-amcor-light-blue border-b-2 items-center pb-[17px] mb-5">
        <button @click="$router.back()" class="group flex items-center gap-2.5 ">
            <IconArrowBack class="cursor-pointer group-hover:scale-[1.15] transition-transform" />
            <h2 class="text-lg font-bold">{{ title }}</h2>
        </button>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: {
        title: String
    }
}
</script>

<style></style>