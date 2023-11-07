<template>
  <div class="max-w-container mx-auto flex gap-x-3 items-center px-2.5">

    <!-- filtro -->
    <div class="__filter-select">
      <el-select 
        v-model="state.categoriaSelected" 
        no-match-text="Não encontrado" 
        no-data-text="Sem dados"
        loading-text="..."
        :loading="state.loadingCategorias"
        @change="handleSelectCategoria"
      >
        <template #prefix>
          <IconFilter />
        </template>
        <el-option 
          v-for="(categoria, index) in state.categorias" 
          :key="index" 
          :label="categoria.label" 
          :value="categoria.id"
        >
          <div class="option-content-wrapper">
            <span class="option-icon"></span>
            <span class="option-text">{{ categoria.label }}</span>
          </div>
        </el-option>
      </el-select>
    </div>

    <input 
      v-model="state.textoBuscado"
      type="text"
      class="flex-1 w-full max-w-[299px] h-[50px] rounded-[20px] pl-4 bg-transparent focus:outline-none border-2 border-white"
      @keyup.enter="search"
    >
      <button @click="search" class="h-[50px] w-[50px] border-2 border-white flex items-center justify-center rounded-[20px] cursor-pointer">
        <IconLupa />
      </button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { api } from '../../../services/api.js'
import { onMounted, reactive } from 'vue';
import IconFilter from '../../../components/Icons/IconFilter.vue';
import IconLupa from '../../../components/Icons/IconLupa.vue';

import MockEstaticoCategorias from '../../../mocksEstaticos/categorias.js'

export default {
  name: 'FilterHome',
  components: {
    IconFilter,
    IconLupa,
  },
  setup(props, { emit }) {
    const state = reactive({
      categorias: [],
      categoriaSelected: '',
      loadingCategorias: false,
      textoBuscado: ''
    })

    onMounted(() => {
      // fetchCategorias()
      state.categorias = MockEstaticoCategorias
    })

    const router = useRouter()

    function handleSelectCategoria() {
      emit('selectCategoria', state.categoriaSelected)
    }

    async function fetchCategorias() {
      try {
        state.loadingCategorias = true

        // const response = await api.get('/categorias')
        // state.categorias = response.data

        addCategoriaTodos()
        
      } catch (error) {
        console.log('error', error)
          
      } finally {
        state.loadingCategorias = false
      }
    }

    function addCategoriaTodos() {
      state.categorias.unshift({
        label: 'Todos',
        id: ''
      })
    }

    function search() {
      router.push({
        name: 'busca',
        query: { busca: state.textoBuscado },
      })
    }

    return {
      state,
      handleSelectCategoria,
      search
    }
  }
};

</script>

<style>
/*select do filtro para aparecer somente o icone*/
.__filter-select .el-input__suffix {
  display: none !important;
}

.__filter-select .el-input__inner {
  display: none !important;
}

.el-input__prefix-inner>:last-child {
  margin-right: 0;
}
</style>