<template>
    <el-select
      v-model="selectedValue"
      placeholder="Selecione"
      filterable
      no-match-text="Não encontrado"
      no-data-text="Sem dados"
      @change="handleChange"
  >
    <el-option 
      v-for="item in data"
      :key="item.value"
      :label="item.label" 
      :value="item.value"
    >
      <div class="option-content-wrapper">
        <span class="option-icon"></span>
        <span class="option-text">{{ item.label }}</span>
      </div>
    </el-option>
  </el-select>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'SelectComponent',
    props: {
        data: {
            type: Array
        }
    },
    emits: ['selected'],
    setup(props, { emit }) {
        const selectedValue = ref([])

        function handleChange() {
          emit('selected', selectedValue.value)
        }

        return {
            selectedValue,
            handleChange
        }
    }
}
</script>

<style>

</style>