<template>
  <div class="flex-1 flex flex-col py-10 w-full gap-14 items-center max-w-container mx-auto px-5 w1315:px-0">

    <!-- Title -->
    <PageTitle title="Histórico" />
     <!-- loading -->
      <div 
      v-if="state.loadingCenarios" 
      v-loading="state.loadingCenarios" 
      element-loading-background="transparent" 
      class="w-full h-36"
      >
      </div>
    
    <!-- Cards  -->
      <div 
      v-else
      v-for="cenario in state.listaCenarios" :key="cenario.id" 
      v-motion-fade
      class="flex flex-wrap sm:flex-nowrap w-full gap-4 gap-x-5 align-baseline justify-center sm:justify-items-start">
        <div
        class="w-full sm:min-w-[632px] px-3 w1295:px-0 flex flex-wrap gap-5 h-auto justify-center sm:justify-items-start">
          <div        
          class="w-full w425:w-[605px] min-h-[160px] w425:h-[310px]"
          >
            <CardCenarioHistorico  
              :backgroundImage="cenario.image"
              :title="cenario.titulo"
              :description="cenario.description"
              :link="'/cenario-detalhe'"
              :medalColor="cenario.medalha"
            class="w-full h-full" />
          </div>     
        </div>
      
      </div>
</div>
</template>

<script>
import { onMounted, reactive, computed} from 'vue';
import { api } from '../../services/api.js'
import IconArrowBack from '../../components/Icons/IconArrowBack.vue';
import PageTitle from '../../components/PageTitle/index.vue'

import MockEstaticoHistorico from '../../mocksEstaticos/historico.js'

import CardCenarioHistorico from './components/index.vue'

export default {
  name: 'BuscaView',
  components: {
    PageTitle,
    IconArrowBack,
    CardCenarioHistorico
  }
  ,
  setup() {
    const state = reactive ({
      listaCenarios: [],
      loadingCenarios: false,
    })
    onMounted(() => {
      fetchCenarios()
      state.listaCenarios = MockEstaticoHistorico
    })

    async function fetchCenarios() {
      try {
        state.loadingCenarios = true
        
        // const response = await api.get('/home-cenarios')

        // state.listaCenarios = response.data
      } catch (error) {
        console.log('error', error)
      } finally { 
        state.loadingCenarios = false
      }
    }
    const gridCenarios = computed(() => {
      return state.listaCenarios[0]
    })
    return {
      state,
      gridCenarios,
    };
  },
};
</script>
