<template>
  <div class="flex-1 w-full px-3 ">
    <div class="flex flex-col items-center gap-14 py-10 mx-auto max-w-container">

      <!-- Filter -->
      <Filter @selectCategoria="handleSelectCategoria" />
      <!-- Cards  -->
      <!-- loading -->
      <div 
        v-if="state.loadingCenarios" 
        v-loading="state.loadingCenarios" 
        element-loading-background="transparent" 
        class="w-full h-36">
      </div>
      <div 
        v-else 
        v-motion-fade 
        class="flex flex-col lg:flex-row w-full gap-5 gap-x-5 align-baseline justify-center w1150:justify-items-start"
      >
      
        <!-- primeiro card - destaque -->
        <div class="flex-grow basis-[400px] w-full lg:max-w-[640px] h-[320px] md:h-[440px]  lg:h-[640px]" v-if="firstCenario"> 
          <router-link 
            :to="{
              name: 'game',
              params: { slug: firstCenario.slug, id: firstCenario.id },
            }"
          >
            <CardCenario 
              :backgroundImage="firstCenario.imagem" 
              :category="firstCenario.categoria_nome" 
              :title="firstCenario.titulo"
              :description="firstCenario.descricao"
              :medal="firstCenario.medalha"
              class="h-full w-full" 
            />
          </router-link>
        </div>

        <!-- outros cards -->
        <div class="flex-grow flex flex-wrap items-center justify-center gap-5 w-full h-auto md:h-[640px] md:items-start md:justify-start lg:max-w-[640px]  lg:basis-[560px]">
          <div class="flex-grow w-full h-[160px] w525:h-[240px] w525:basis-[250px] md:h-[310px] md:min-w-[40%] lg:max-w-[310px]" v-for="(cenario, index) in gridCenarios" :key="index">
            <router-link 
              :to="{
                name: 'game',
                params: { slug: cenario.slug, id: cenario.id },
              }"
            >
              <CardCenario 
                :backgroundImage="cenario.imagem" 
                :category="cenario.categoria_nome" 
                :title="cenario.titulo"
                :description="cenario.descricao"
                :medal="cenario.medalha"
                class="w-full h-full"
              />
            </router-link>
          </div>    
        </div>
      
      </div>

      <!-- Botão  -->
      <div v-if="!state.loadingCenarios" class="w-full max-w-[1330px]">
        <router-link :to="{ name: 'cenarios'}">
          <button class="btn-primary">
            <span class="text-xs font-bold">Ver todos os cenários</span>
          </button>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue';
import { api, apiFetch } from '../../services/api.js'
import Filter from './components/Filter.vue';
import CardCenario from '../../components/CardCenario/index.vue'

import MockEstaticoHomeCenarios from '../../mocksEstaticos/home_cenarios.js'

export default {
  components: {
    Filter,
    CardCenario,
  },
  setup() {
    const state = reactive ({
      listaCenarios: [],
      loadingCenarios: false,
      categoriaSelected: ''
    })
    onMounted(() => {
      fetchCenarios()
      state.listaCenarios = MockEstaticoHomeCenarios
    })

    async function fetchCenarios() {
      try {
       
        state.loadingCenarios = true

        const response = await apiFetch.get('/cenario/listar')

        // pega os 5 primeiros
        state.listaCenarios = response.data.itens.slice(0, 5);
      } catch (error) {
        console.log('error', error)
        
        ElMessage({
          showClose: true,
          message: 'Erro ao buscar os cenários.',
          type: "error"
        })

      } finally {
          state.loadingCenarios = false  
      }
    }

    const firstCenario = computed(() => {
      return state.listaCenarios[0]
    })

    const gridCenarios = computed(() => {
      return state.listaCenarios.slice(1);
    })

    function handleSelectCategoria(categoriaSelected) {
      //categoriaSelected vem de dentro do componente FIlter
      state.categoriaSelected = categoriaSelected
    }
    
    return {
      state,
      firstCenario,
      gridCenarios,
      handleSelectCategoria
    };
  },
};
</script>
