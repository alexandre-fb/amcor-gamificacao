<template>
  <div class="flex-1 flex flex-col py-10 w-full items-center max-w-container mx-auto px-5 w1315:px-0">
    <!-- Filter -->

    <Filter class="mb-5" />

    <!-- Title -->
    <PageTitle title="Resultado" />
   
    <!-- Cards  -->
    <div class="flex flex-wrap sm:flex-nowrap w-full gap-4 gap-x-5 align-baseline justify-center sm:justify-items-start">

      <div class="w-full sm:min-w-[632px] w640:px-3.5 w1295:px-0 flex flex-wrap gap-5 h-auto justify-center sm:justify-items-start">
        <div class="w-full w710:w-[305px] min-h-[160px] sm:h-[310px]" v-for="(cenario, index) in state.resultadoBuscaData" :key="index" >
          <router-link 
              :to="{
                name: 'game',
                params: { slug: cenario.slug, id: cenario.id },
              }"
            >
            <CardCenario 
              :backgroundImage="cenario.image" 
              :category="cenario.categoria" 
              :title="cenario.titulo"
              :description="cenario.descricao"
              :medal="cenario.medalha"
              class="w-full h-full" 
            />
          </router-link>
        </div>     
      </div>
    
    </div>
</div>
</template>

<script>
import { api } from '../../services/api.js'
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import PageTitle from '../../components/PageTitle/index.vue'
import IconArrowBack from '../../components/Icons/IconArrowBack.vue';
import Filter from '../Home/components/Filter.vue';
import CardCenario from '../../components/CardCenario/index.vue';

import MockEstaticoResultadoBusca from '../../mocksEstaticos/lista_cenarios.js'

export default {
  name: 'BuscaView',
  components: {
    PageTitle,
    IconArrowBack,
    Filter,
    CardCenario,
  }
  ,
  setup() {
    const state = reactive ({
      resultadoBuscaData: [],
      resultadoBuscaLoading: false,
    })

    const route = useRoute()

    onMounted(() => {
      // fetchResultadoBusca()
      state.resultadoBuscaData = MockEstaticoResultadoBusca
    })

    async function fetchResultadoBusca() {
      try {
        state.resultadoBuscaLoading = true

        const textoBuscado = route.query.busca

        // const response = await api.get('/lista-cenarios-page-1')
        
        // state.resultadoBuscaData = response.data.cenarios
        
      } catch (error) {
        console.log('error', error)
      } finally {
        state.resultadoBuscaLoading = false
      }
    }
    console.log('route', route)
    return {
      state,
    };
  },
};
</script>
