<template>
  <div class="flex justify-center py-10 px-4">
    <div class="flex-1 flex flex-col items-start gap-14 w-full max-w-container">
      <!-- Filter -->
      <Filter />
      <!-- Cards  -->
      <div class="flex flex-wrap sm:flex-nowrap w-full gap-4 gap-x-5 align-baseline justify-center sm:justify-items-start">
  
        <div class="w-full sm:min-w-[632px] w1295:px-0 flex flex-wrap gap-5 h-auto justify-center sm:justify-items-start">

          <!-- lista cenarios -->
          <!-- loading -->
          <div 
            v-if="state.loadingCenarios" 
            v-loading="state.loadingCenarios" 
            element-loading-background="transparent" 
            class="w-full h-36"
          >
          </div>
          <div 
            v-else 
            v-motion-fade class="w-full sm:w-[305px] min-h-[160px] sm:h-[310px]" 
            v-for="cenario in state.listaCenarios" 
            :key="cenario.id" >
            <router-link 
              :to="{
                name: 'game',
                params: { slug: cenario.slug, id: cenario.id },
              }"
            >
              <CardCenario 
                :backgroundImage="cenario.imagem" 
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
      
      <button 
        v-if="!state.loadingCenarios" 
        class="btn-primary" 
        :class="state.isLastPage ? '!bg-amcor-light-blue opacity-60' : ''" 
        @click="loadMore" 
        :disabled="state.isLastPage"
      >
        <div 
          v-if="state.loadingMore" 
          v-loading="state.loadingMore" 
          element-loading-background="transparent" 
          class="w-28 h-5"
        >
        </div>
        <span v-else>Carregar mais</span>
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { api, apiFetch } from '../../services/api.js'
import Filter from '../Home/components/Filter.vue';
import CardCenario from '../../components/CardCenario/index.vue'

export default {
  name: 'CenariosView',
  components: {
    Filter,
    CardCenario,
  },
  setup() {
    const state = reactive ({
      isLastPage: false,
      page: 1,
      listaCenarios: [],
      loadingCenarios: false,
      loadingMore: false,
      scrollPositionOnLoad: 0
    })
    
    onMounted(() => {
      fetchCenarios()
      restoreScrollPosition()
    })

    async function fetchCenarios() {
      try {
        if (state.page === 1) {
          state.loadingCenarios = true
        } else {
          state.loadingMore = true
        }

        saveScrollPosition();

        // const response = await api.get(`/lista-cenarios-page-${state.page}`)
        const response = await apiFetch.get('/cenario/listar')
        state.isLastPage = response.data.ultima_pagina

        state.listaCenarios = [...state.listaCenarios, ...response.data.itens]
        // state.listaCenarios = [...state.listaCenarios, ...response.data.cenarios]
        
      } catch (error) {
        console.log('error', error)
        
        ElMessage({
          showClose: true,
          message: 'Erro ao buscar os cenários.',
          type: "error"
        })

      } finally {
          state.loadingCenarios = false  
          state.loadingMore = false
          restoreScrollPosition()
      }
    }

    function loadMore() {
      if(!state.isLastPage) {
        state.page++
        fetchCenarios()
      }
    }

    function saveScrollPosition() {
      state.scrollPositionOnLoad = window.scrollY;
    }

    function restoreScrollPosition() {
      window.scrollTo(0, state.scrollPositionOnLoad);
    }

    return {
      state,
      loadMore,
    };
  },
};
</script>
