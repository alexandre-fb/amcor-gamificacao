import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCenarioSelecionadoStore = defineStore('cenarioSelecionadoStore', {
    state() {
        const cenarioSelecionado = ref({})
 
        function setCenarioSelecionado(data) {
            cenarioSelecionado.value = data
        }

        function clear() {
            cenarioSelecionado.value = {}
        }

        return {
            cenarioSelecionado,
            setCenarioSelecionado,
            clear
        }
    },
})