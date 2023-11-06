<template>
  <div class="flex-1 flex flex-col pt-9 pb-12 w-full gap-[30px] items-center max-w-container mx-auto px-5 w1315:px-0">
    <!-- Title -->
    <div class="w-full flex border-amcor-light-blue border-b-2 items-center pb-[17px]">
      <router-link to="/" class=" flex gap-2.5 ">
        <IconArrowBack class="cursor-pointer" />
        <div class="text-lg font-bold">
          <h1>Detalhes do Cenário</h1>
        </div>
      </router-link>
    </div>
    <!-- Loading  -->
    <div 
      v-if="state.loadingCenarioData || Object.keys(state.cenarioData).length === 0" 
      v-loading="state.loadingCenarioData"
      element-loading-background="transparent" 
      class="w-full h-36">
    </div>
    <!-- Conteudo  -->
    <div v-else 
      v-motion-fade 
      class="flex flex-col pt-9 pb-12 w-full gap-[30px] items-center max-w-container mx-auto">
        <!-- Card  -->
      <div class="w-full sm:w-[632px] h-[160px] sm:h-[310px] px-3 w1295:px-0 flex  gap-5 justify-center ">
          <CardDetalheCenario 
          :medal="state.cenarioData.medalha"
          :description="state.cenarioData.nome_cenario"
          :dataJogo="state.cenarioData.data_ultima_jogo"
          class="w-full h-full" />
      </div>
      <!-- Quantidade de resposta e tempo  -->
      <div class="w-full max-w-[450px] flex justify-around items-center gap-[18px]">
        <div class="gap-[6px] flex flex-col justify-center items-center font-bold text-13">
          <h2>Respostas Corretas:</h2>
          <div class="w-[144px] h-[50px] border-[2px] border-white rounded-20 flex justify-center items-center text-lg">
            <h2>{{ state.cenarioData.respostas_valores.corretas }} / {{ state.cenarioData.respostas_valores.total }}</h2>
          </div>
        </div>

        <div class="gap-[6px] flex flex-col justify-center items-center font-bold text-13">
          <h2>Tempo:</h2>
          <div class="w-[144px] h-[50px] border-[2px] border-white rounded-20 flex justify-center items-center text-lg">
            {{state.cenarioData.tempo }}
          </div>
        </div>
      </div>

      <!-- Medalha  -->
      <div class="flex flex-col w-full max-w-[470px] gap-[7px]">
          <MedalhaDetalheCenario 
            :medal="state.cenarioData.medalha"
          />

          <div class="w-full text-13 font-normal">
            <h2>*Tempo medido na jogada com o maior número de respostas corretas.</h2>
          </div>
       
      </div>

      

      <!-- Resultados das escolhas  -->

      <div class="w-full flex flex-col">
        <div class="w-full flex flex-col gap-2 py-4 justify-start items-start text-start border-b-amcor-light-blue border-b-[2px]">
            <h2 class="text-13 font-bold">Suas escolhas:</h2>
        </div>

        <div class="w-full flex flex-col gap-2 py-4 justify-start items-start text-start border-b-amcor-light-blue border-b-[2px]"
        v-for="(resposta, index) in state.cenarioData.respostas" :key="index">
          <h2 class="text-13 font-bold">Pergunta {{ index + 1 }}: {{resposta.pergunta }} </h2>
          <div class="w-[126px] h-[22px] rounded-[10px] flex justify-center items-center"
          :class="{
            'bg-[#f00]': resposta.status === 'errada',
            'bg-[#00A551]': resposta.status === 'correta'
          }">
            <h2 class="text-13 font-bold">Resposta {{resposta.status }}:</h2>
          </div>
          <h2 class="text-13 font-normal">{{resposta.text_resposta_certa }}</h2>
        </div>
      </div>
    
      <!-- botao jogar novamente  -->
      <div class="w-full">
        <button class="btn-primary">
          Jogar Novamente
        </button>
      </div>
    </div>
     
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { api } from '../../services/api';
import IconArrowBack from '../../components/Icons/IconArrowBack.vue';
import CardCenario from '../../components/CardCenario/index.vue'
import CardDetalheCenario from './components/CardDetalheCenario.vue';
import MedalhaDetalheCenario from './components/MedalhaDetalheCenario.vue';
import MockCenarioDetalhe from '../../mocksEstaticos/cenario_detalhe.js'

export default {
  name: 'CenarioDetalhe',
  components: {
    IconArrowBack,
    CardCenario,
    CardDetalheCenario,
    MedalhaDetalheCenario,
  },
  setup() {
    const state = reactive({
      cenarioData: {}, 
      loadingCenarioData: false,
    })
    onMounted(() => {
      fetchCenarioDetalhe()
      state.cenarioData = MockCenarioDetalhe
    })

    async function fetchCenarioDetalhe() {
      try {
          state.loadingCenarioData = true
          // const response = await apiEstatico.get('/cenario-detalhe.json')
          // state.cenarioData = response.data
        
      } catch (error) {
        
      } finally {
        state.loadingCenarioData = false
      }
    }

    return {
      state,
      fetchCenarioDetalhe,
    }
  }
}
</script>

<style>

</style>