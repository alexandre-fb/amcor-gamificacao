<template> 
    <div class="relative flex flex-col justify-end transition-transform hover:scale-[1.018] cursor-default" v-for="(item, index) in formatedDataRanking" :key="item.id"
    :class="index === 1 ? 'firstRankingItem' : '' "> 
        <div class="absolute h-[22px] w-full flex justify-center items-center" :class="index === 1 ? '-top-[15px]' : '-top-[82px]' ">
            <h2 class="text-lg font-bold" v-if="index === 1">1</h2>
            <h2 class="text-lg font-bold" v-if="index === 0">2</h2>
            <h2 class="text-lg font-bold" v-if="index === 2">3</h2>
        </div>
        <div class="relative flex flex-col items-center justify-end h-[195px] w-[101px] sm:w-[110px] bg-amcor-light-blue rounded-20  pb-[18px]">
        <!-- :class="index === 1 ? 'firstRankinConteudo' : '' "> -->
           
            <div class="absolute -top-[26%] w-[102px] h-[102px] sm:w-[110px] sm:h-[110px] rounded-full border-[3px] border-white bg-cover bg-center bg-amcor-light-blue"
            :style="{ 'background-image': `url(${ item.foto ? item.foto : '/images/user_image_default.svg' })`}" 
            :class="index === 1 ? 'firstRankingImage' : '' ">
            </div>
            <div class="px-[10px] h-full flex flex-col justify-center text-center"
            :class="'firstRankingConteudo'">    
            <!-- :class="index === 1 ? 'firstRankingConteudo' : '' ">     -->
                <div class="min-h-[36px] flex items-center">
                    <h2 class="text-13 font-bold  w-full __max-lines-name  ">{{ `${ item.primeiro_nome } ${ item.ultimo_nome }` }}</h2>
                </div>
                <h3 class="text-13 font-normal text-amcor-dark-blue __max-lines-description ">{{ item.unidade_nome }}</h3>
                <h3 class="text-13 font-normal text-amcor-dark-blue __max-lines-description ">{{ item.setor_nome }}</h3>  
                <h2 class="text-lg font-bold"> {{ formatQuantityMaxPoint(item.pontos) }}</h2>
            </div>
    
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'RankingItemsTop',
    props: {
        dataRanking: Array
    },
    setup(props) {  
        const formatedDataRanking = computed(() => {
            if(props.dataRanking.length === 3) {
                return [props.dataRanking[1], props.dataRanking[0], props.dataRanking[2]]
            } else if(props.dataRanking.length === 2) {
                return [props.dataRanking[1], props.dataRanking[0]]
            } else if(props.dataRanking.length === 1) {
                return [props.dataRanking[0]]
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
            formatQuantityMaxPoint,
            formatedDataRanking,
        };
    },
}
</script>

<style>


.firstRankingItem {
    height: 295px;
    gap: 40px;
}

.firstRankinConteudo {
    position: relative;
}

.firstRankingImage {
    height: 139px;
    width: 139px;
    /*bottom: 128px;*/
    top: -42%;
    z-index: 99;
}

.firstRankingConteudo {
    justify-content: end;
}

.__max-lines-name {
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.__max-lines-description {
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@media screen and (max-width: 640px) {
    .firstRankingItem {
        gap: 20px;
    }

    .firstRankingImage {
        height: 125px;
        width: 125px;
    }
}

@media screen and (max-width: 340px) {
    .firstRankinConteudo {
        width: 85px;
    }
}

@media screen and (max-width: 340px) {
    .firstRankingImage {
        height: 110px;
        width: 110px;
        top: -36%!important;
    }
}

</style>