<template>
  <div class="flex-1 flex flex-col pt-9 pb-12 w-full gap-[20px] items-center max-w-container mx-auto px-5 w1315:px-0">

    <!-- Title -->
    <PageTitle title="Ranking" />
   
    <!-- Conteudo  -->
    <div class="flex flex-col w-full gap-4 align-baseline justify-center sm:justify-items-start">
      
      <!-- Filtro  -->
      <div class="flex flex-wrap w-full justify-center items-center gap-2 md:gap-5 mb-4">
        
        <!-- geral  -->
        <button class="btn-primary flex-1 basis-24 flex-grow max-w-[153px] text-xs md:text-[14px] md:px-4" @click="resetFilters">
          Geral
        </button>

       <!-- select unidades  -->
       <el-form-item 
          class="max-w-[153px] basis-24 flex-grow text-xs !mb-0"
          prop="unidade"  
        >
          <el-select
            v-model="state.filter.unidade"
            collapse-tags
            placeholder="Unidade"
            filterable
            prop="unidade"
            no-match-text="Não encontrado"
            no-data-text="Sem dados"
            :loading="state.loadingUnidades"
            loading-text="Carregando..."
            @change="fetchRanking"
            class="ranking-select"
          >
            <el-option 
              v-for="unidade in state.listaUnidades"
              :key="unidade.id"
              :label="unidade.nome" 
              :value="unidade.id"
            >
              <div class="option-content-wrapper">
                <span class="option-icon"></span>
                <span class="option-text">{{ unidade.nome }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- select setor  -->
        <el-form-item 
          class="max-w-[153px] basis-24 flex-grow !mb-0"
          prop="setor"
        >
          <el-select
            v-model="state.filter.setor"
            collapse-tags
            placeholder="Setor"
            filterable
            prop="setor"
            no-match-text="Não encontrado"
            no-data-text="Sem dados"
            :loading="state.loadingSetores"
            loading-text="Carregando..."
            @change="fetchRanking"
            class="ranking-select"
          >
            <el-option 
              v-for="setor in state.listaSetores"
              :key="setor.id"
              :label="setor.nome" 
              :value="setor.id"
            >
              <div class="option-content-wrapper">
                <span class="option-icon"></span>
                <span class="option-text">{{ setor.nome }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    
      <div 
        v-if="state.loadingRanking" 
        v-loading="state.loadingRanking" 
        element-loading-background="transparent" 
        class="w-full h-36">
      </div>
      <div
        v-else
        v-motion-fade 
      >
        <div v-if="state.ranking.length > 0">
          <!-- Top Ranking  -->
          <div class="w-full flex items-end pt-[9px] pb-[25px] gap-[10px] sm:gap-[35px] justify-center">
            <RankingItemsTop 
            :dataRanking="state.rankingTopThree"
            />
          </div>
          <!-- Lista Ranking  -->
          <div class="w-full flex flex-col items-center gap-[10px] justify-center">
            <RankingItems 
            :dataRankingList="state.rankingWithoutTopThree"
            />
          </div>
        </div>
        <div v-else class="w-full text-center my-4">
          <h2>Sem dados!</h2>
        </div>
      </div>
   
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { api, apiFetch } from '../../services/api';
import PageTitle from '../../components/PageTitle/index.vue'
import RankingItems from './components/RankingItem.vue';
import RankingItemsTop from './components/RankingItemTop.vue';

export default {
  name: 'RankingView',
  components: {
    PageTitle,
    RankingItems,
    RankingItemsTop
  },
  setup() {
    const state = reactive({
      ranking: [],
      loadingRanking: false,
      loadingUnidades: false,
      loadingSetores: false,
      rankingTopThree: [],
      rankingWithoutTopThree: [],
      filter: {
        setor: null,
        unidade: null,
      }
    })
    onMounted(() => {
      fetchRanking()
      fetchSetores()
      fetchUnidades()
      // updateRankingList()
    })
    // watchEffect(() => {
    //   updateRankingList();
    // });
    // ranking top 3 
    async function fetchRanking() {
      try {
          state.loadingRanking = true

          const response = await apiFetch.get(`/usuario/ranking/${ state.filter.unidade || null }/${ state.filter.setor || null }`)
          state.ranking = response.data.itens
          getTopThree(state.ranking)
          getRankingWithoutTopThree(state.ranking)

      } catch (error) {
          console.log('error', error)

          ElMessage({
              showClose: true,
              message: 'Erro ao buscar o ranking.',
              type: "error"
          })
      } finally {
          state.loadingRanking = false  
      }

    }

    function resetFilters() {
      state.filter = {
        setor: null,
        unidade: null,
      }

      fetchRanking()
    }
 
    // Select Setores 
    async function fetchSetores() {
      try {
        state.loadingSetores = true

        const response = await apiFetch.get('/util/setor')
        state.listaSetores = response.data.itens


      } catch (error) {
        ElMessage({
          showClose: true,
          message: 'Erro ao buscar setores.',
          type: "error"
        })
      } finally {
        state.loadingSetores = false
      }
    }
    // Select Unidades
    async function fetchUnidades() {
      try {
        state.loadingUnidades = true

        const response = await apiFetch.get('/util/unidade')
        state.listaUnidades = response.data.itens
        
      } catch (error) {
        console.log('error', error)
        
        ElMessage({
          showClose: true,
          message: 'Erro ao buscar unidades.',
          type: "error"
        })
          
      } finally {
        state.loadingUnidades = false
      }
    }

    // Ranking top 3 
    function getTopThree(rankingComplet) {
      console.log('rankingComplet', rankingComplet)
      if(rankingComplet.length >= 3)  {
        state.rankingTopThree = rankingComplet.slice(0, 3);
      } else {
        state.rankingTopThree = rankingComplet;
      }
    }
    // Ranking top 4 em diante 
    function getRankingWithoutTopThree(rankingComplet) {
        if (rankingComplet.length >= 4) {
          state.rankingWithoutTopThree = rankingComplet.slice(3);
      } else {
          state.rankingWithoutTopThree = []
      }
    }
    // Possivel filtro futuro
    // function updateRankingList() {
    //   // Aqui você pode usar os valores de state.userData.setor e state.userData.unidade
    //   // para filtrar a lista de ranking de acordo com os filtros selecionados
    //   const setorSelecionado = state.filter.setor;
    //   const unidadeSelecionada = state.filter.unidade;

    //   // Filtre a lista de ranking com base nos filtros selecionados
    //   const rankingFiltrado = state.ranking.filter(item => {
    //     // Verifique se o item atende aos critérios de filtro
    //     const atendeFiltroSetor = !setorSelecionado || item.setor === setorSelecionado;
    //     const atendeFiltroUnidade = !unidadeSelecionada || item.unidade === unidadeSelecionada;

    //     // Retorne true se o item atender a ambos os filtros
    //     return atendeFiltroSetor && atendeFiltroUnidade;
    //   });

    //   // Atualize a lista de ranking filtrada
    //   state.rankingWithoutTopThree = rankingFiltrado.slice(3);
    // }
    
    return {
      state,
      resetFilters,
      fetchRanking,
    };
  },
};
</script>
