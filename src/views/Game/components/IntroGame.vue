<template>
    <!-- Titulo  -->
    <PageTitle title="Jogar" />

    <!-- main -->
    <div class="flex flex-col md:flex-row md:items-center gap-5 xl:gap-20 ">
        <!-- image  -->
        <div class="w-full md:max-w-[640px] h-[160px] w425:h-[300px] lg:h-[480px] xl:h-[640px]">
            <img :src="image" :alt="image_alt"
                class="w-full h-full object-cover rounded-20 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] ">
        </div>

        <!-- conteudo -->
        <div class="py-5 w-full md:max-w-xl">
            <div class="h-[22px] w-fit bg-amcor-dark-blue items-center flex px-[7px] rounded-[10px] max-w-[220px] mb-2">
                <h2 class="font-bold text-xs">{{ category }}</h2>
            </div>
            <div class="mb-4">
                <h3 class="font-bold text-lg">{{ title }}</h3>
                <p class="font-normal text-[13px]" v-html="description"></p>
            </div>

            <button @click="handleClickPlay" class="btn-primary">
                Jogar
            </button>

        </div>
    </div>
</template>

<script>
import PageTitle from '../../../components/PageTitle/index.vue'

export default {
    name: 'IntroGame',
    components: {
        PageTitle
    },
    props: {
        title: String,
        category: String,
        description: String,
        image: {
            type: String,
            default: 'https://companieslogo.com/img/orig/AMCR-940a87a6.png?t=1592725424'
        },
        image_alt: String,
    },
    emits: ['clickedStartGame'],
    setup(props, { emit }) {
        function handleClickPlay() {
            emit('clickedStartGame')
        }

        return {
            handleClickPlay
        }
    }
}
</script>

<style></style>