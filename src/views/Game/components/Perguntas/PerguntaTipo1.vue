<template>
    <div>
        <!-- image -->
        <div class="w-full flex justify-center">
            <img :src="gameData.imagem" :alt="gameData.imagem_alt"
                class="w-full max-w-4xl h-[360px] lg:h-[460px] object-cover">
        </div>

        <!-- images options -->
        <div class="relative flex flex-col items-center -top-5 px-3">
            <ul class="relative flex justify-between w-full max-w-xs gap-3 mb-7">
                <li v-for="(option, index) in gameData.respostas" :key="option + index" class="__option_wrapper relative flex flex-col items-center">
                    <button
                        class="relative z-10 w-full max-w-[100px] min-w-[80px] h-[100px] px-2 py-4 rounded-20 bg-amcor-green hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
                        :class="state.optionSelected.index == index ? 'bg-amcor-green' : 'bg-white'"
                        @click="openModalOptions(index, option.texto)">
                        <img :src="option.imagem" :alt="option.imagem_alt" loading="lazy">
                    </button>

                    <!-- indicador (seta pra cima quando ativo)  -->
                    <span v-if="state.optionSelected.index == index"
                        class="absolute -top-2 left-1/2 -translate-x-1/2 block w-7 h-7 bg-amcor-green rounded-md rotate-45"></span>
                </li>

            </ul>

            <!-- barra azul com texto -->
            <div class="relative w-full max-w-xs p-1 bg-amcor-light-blue rounded-[10px] text-center">
                <span class="relative z-10 text-13 font-bold">Escolha uma resposta e clique em “Confirmar”.</span>

                <!-- indicacoes (setas pra cima) -->
                <!-- <div class="absolute -top-2 w-full">
                    <span class="absolute left-[8%]  block w-7 h-7 bg-amcor-light-blue rounded-md rotate-45"></span>
                    <span class="absolute left-[50%] -translate-x-1/2 block w-7 h-7 bg-amcor-light-blue rounded-md rotate-45"></span>
                    <span class="absolute left-[80%] block w-7 h-7 bg-amcor-light-blue rounded-md rotate-45"></span>
                </div> -->
            </div>
        </div>
    </div>

    <ModalOption 
        :isActive="state.showModalOptions" 
        :letter="state.optionSelected.letter" 
        :text="state.optionSelected.text"
        @confirmModalClick="confirmModalClick" 
        @closeModalClick="closeModalOptions" 
    />
</template>

<script>
import { reactive } from 'vue'
import ModalOption from '../ModalOption.vue'
export default {
    name: 'PerguntaTipo1',
    props: {
        gameData: Object
    },
    components: {
        ModalOption
    },
    emits: ['confirmModalClick'],
    setup(props, { emit }) {
        const state = reactive({
            optionSelected: {},
            showModalOptions: false,
        })

        function openModalOptions(optionIndex, optionText) {
            state.showModalOptions = true

            const optionLetter = () => {
                switch (optionIndex) {
                    case 0:
                        return 'A'
                    case 1:
                        return 'B'
                    case 2:
                        return 'C'
                }
            }
            state.optionSelected = {
                index: optionIndex,
                id: props.gameData.respostas[optionIndex].id,
                text: optionText,
                letter: optionLetter()
            }
        }

        function closeModalOptions() {
            state.showModalOptions = false
            state.optionSelected = {}
        }

        function confirmModalClick() {
            emit('confirmModalClick', state.optionSelected)
            console.log('state.optionSelected na pergunta', state.optionSelected)
        }

        return {
            state,
            openModalOptions,
            closeModalOptions,
            confirmModalClick
        }
    }
}
</script>

<style scoped>
    .__option_wrapper::after {
        content: '';
        display: block;
        width: 28px;
        height: 28px;
        border-radius: 6px;
        background: rgb(0 161 222);
        transform: rotate(45deg);
        position: absolute;
        bottom: -50px
    }
</style>