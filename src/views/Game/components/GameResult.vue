<template>
    <!-- Titulo  -->
    <router-link to="/" class="w-full flex gap-2.5 border-amcor-light-blue border-b-2 items-center pb-[17px] mb-5 lg:mb-8">
        <IconArrowBack class="cursor-pointer" />
        <div class="text-lg font-bold">
            <h2>Resultado</h2>
        </div>
    </router-link>
  
    <!-- main -->
    <div class="flex flex-col">

        <!-- respostas e tempo -->
        <div class="flex w-full justify-center gap-5 mb-5">
            <div class="flex flex-col items-center w-full max-w-[150px]">
                <h3 class="text-13 font-bold mb-1">Respostas Corretas:</h3>
                <div class="flex justify-center items-center w-full  h-[50px] border-2 border-white rounded-20 p-1">
                    <span class="text-lg font-bold">{{ correctResponses }}/{{ totalQuestions }}</span>
                </div>
            </div>
            <div class="flex flex-col items-center w-full w-full max-w-[150px]">
                <h3 class="text-13 font-bold mb-1">Tempo:</h3>
                <div class="flex justify-center items-center w-full h-[50px] border-2 border-white rounded-20 p-1">
                    <span class="text-lg font-bold">{{ time }}</span>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center w-full"> 
            <!-- sem medalhas -->
            <div v-if="medal === ''"
                 class="flex justify-center items-center min-h-[220px]"     
                >
                <p class="max-w-xs md:max-w-md text-lg font-bold text-center">
                    Ops!<br>
                    Não foi dessa vez que você conquistou uma medalha, mas tente novamente!
                </p>
            </div>

            <!-- com medalha -->
            <div v-else>
                <p class="max-w-xs md:max-w-md text-lg font-bold text-center mb-5" v-html="state.medalData.textoHtml"></p>
    
                <RouterLink to="/cenario-detalhe" class="block btn-primary mb-5 cursor-pointer" @click="handleClickShowDetails">Ver Detalhes</RouterLink>
    
                <!-- medalha container -->
                <div class="relative mb-5">
                    <img :src="state.medalData.image" alt="Medal" class="w-[150px] h-[150px] bg-white p-[2px] rounded-full hover:scale-[1.02] transition-transform">
                    <button class="absolute -right-12 top-2 btn-primary py-2 px-3" @click="openHelpMedals">
                        <IconQuestion color="#fff" :size="20" />
                    </button>
                </div>
                <ModalHelpMedals :isActive="state.showModalHelpMedals" @closeModalClick="closeHelpMedals" />
            </div>

            <!-- pontos -->
            <div class="flex flex-col items-center mb-8">
                <h3 class="mb-2">Pontos</h3>
                <div class="flex items-center justify-center w-[78px] h-[50px] border-2 border-white rounded-20 text-lg font-700">
                    +{{ points }}
                </div>
            </div>

            <!-- buttons -->
            <div class="flex justify-center gap-4 w-full">
                <router-link to="/">
                    <button class="btn-primary">Voltar para a Home</button>
                </router-link>
                <button class="btn-primary" @click="handleClickTryAgain">Tentar novamente</button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import IconQuestion from '../../../components/Icons/IconQuestion.vue'
import ModalHelpMedals from '../../../components/ModalHelpMedals/index.vue'
import { RouterLink } from 'vue-router'
export default {
    name: 'GameResult',
    components: {
    IconQuestion,
    ModalHelpMedals,
    RouterLink
},
    props: {
        totalQuestions: Number,
        correctResponses: Number,
        time: String,
        medal: String,
        points: Number
    },
    emits: ['clickTryAgain', 'clickShowDetails'],
    setup(props, { emit }) {
        const state = reactive({
            medalData: {},
            showModalHelpMedals: false
        })

        onMounted(() => {
            formatMedalsData()
        }) 

        function handleClickTryAgain() {
            emit('clickTryAgain')
        }
        
        function handleClickShowDetails() {
            emit('clickShowDetails')
        }

        function openHelpMedals() {
            state.showModalHelpMedals = true
        }

        function closeHelpMedals() {
            state.showModalHelpMedals = false
        }

        function formatMedalsData() {
            switch (props.medal) {
                case 'ouro':
                    state.medalData = {
                        textoHtml: 'Parabéns! <br> Você é Ouro!',
                        image: '/images/medals/gold-medal.webp'
                    }
                    break
                case 'prata':
                    state.medalData = {
                        textoHtml: 'Muito bom! <br> Você é Prata!',
                        image: '/images/medals/silver-medal.webp'
                    }
                    break
                case 'bronze':
                    state.medalData = {
                        textoHtml: 'Bom! <br> Você é Bronze!',
                        image: '/images/medals/bronze-medal.webp'
                    }
                    break
            }
        }

        return {
            state,
            openHelpMedals,
            closeHelpMedals,
            handleClickTryAgain,
            handleClickShowDetails,
        }
    }
}
</script>

<style>

</style>