<template> 
    <div class="flex px-[10px] sm:w-full h-[65px] justify-center transition-transform hover:scale-[1.007] cursor-default" v-for="(item, index) in dataRankingList" :key="item.id">
        <div class="h-full w-[30px] flex justify-center items-center">
            <h2 class="text-lg font-bold">{{ index + 4 }}</h2>
        </div>

        <div class="flex w-full max-w-[821px] sm:full bg-amcor-light-blue rounded-20 sm:min-w-[295px] sm:w-4/5 items-center justify-between">
            <div class="h-full min-w-[65px] w-[65px] rounded-20 border-[1px] border-black bg-cover bg-center shadow-sm shadow-black"
            :style="{ 'background-image': `url(${ item.foto ? item.foto : '/images/user_image_default.svg' })`}">
            </div>
            <div class="px-[10px] h-full flex flex-col justify-center items-start w-[164px] sm:w-full">    
                <h2 class="text-13 font-bold __max-lines-message w-full">{{ `${ item.primeiro_nome } ${ item.ultimo_nome }` }}</h2>
                <h3 class="text-13 font-normal text-amcor-dark-blue">{{ item.unidade_nome }}</h3>
                <h3 class="text-13 font-normal text-amcor-dark-blue">{{ item.setor_nome }}</h3>  
            </div>
            <div class="h-full w-[51px] flex justify-center items-center pr-4">
                <h2 class="text-lg font-bold"> {{formatQuantityMaxPoint(item.pontos) }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue';
import { api } from '../../../services/api.js'

export default {
    name: 'RankingItems',
    props: {
        dataRankingList: Array,
    },
    setup() {
        const state = reactive({
            listaRanking: [],
        })
        onMounted(() => {

        })

        const gridRanking = computed(() => {
            if (state.listaRanking.length >= 4) {
                return state.listaRanking.slice(3); // Começa a partir do 4º item (índice 3).
            } else {
                return []; // Retorna uma lista vazia se houver menos de 4 itens.
            }
        })

        function formatQuantityMaxPoint(number) {
        // Verifica se o número é maior que 99 e adiciona o "+" se for verdadeiro
            if(number)  {
                return number > 9999 ? '9999+' : number.toString();    
            } else {
                return '0'
            }
        }

        return {
            state,
            gridRanking,
            formatQuantityMaxPoint
        };
    },
}
</script>

<style>
.__max-lines-message {
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>