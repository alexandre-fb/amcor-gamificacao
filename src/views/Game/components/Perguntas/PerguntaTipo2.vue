<template>
    <div>
        <!-- titulo -->
        <div>
            <h3 class="my-4 font-bold text-13 text-center" v-if="perguntaData.intro">{{ perguntaData.intro }}</h3>
            <h2 class="mb-4 font-bold text-lg text-center">{{ perguntaData.titulo }}</h2>
        </div>

        <!-- image -->
        <div class="w-full flex justify-center mb-5">
            <img :src="imagem.imagem" :alt="imagem.imagem_alt"
                class="w-full max-w-4xl h-[360px] lg:h-[460px] object-cover">
        </div>

        <!-- options -->
        <div class="relative w-full px-3">
            <ul class="relative flex flex-col justify-between w-full max-w-4xl gap-3 mb-7">
                <li v-for="(option, index) in perguntaData.respostas" :key="option + index" class="relative">
                    <button
                        class="relative z-10 w-full min-w-[80px] min-h-[70px] px-3 py-4 rounded-20 hover:scale-[1.009] transition-all shadow-lg hover:shadow-xl"
                        :class="state.optionSelected.index == index ? 'bg-amcor-green text-white' : 'bg-amcor-dark-blue'"
                        @click="openModalOptions(index, option.texto)"
                    >
                        <span :class="state.optionSelected.index == index ? ' text-white' : 'text-amcor-light-blue'">{{ setOptionLetter(index) }}. </span>
                        <span>{{ option.texto }}</span>
                    </button>
                </li>
            </ul>

        </div>
    </div>

    <ModalOption 
        :isActive="state.showModalOptions" 
        :letter="state.optionSelected.letter" 
        :text="state.optionSelected.text"
        :tipoPergunta="'2'"
        @confirmModalClick="confirmModalClick" 
        @closeModalClick="closeModalOptions" 
    />
</template>

<script>
import { reactive } from 'vue'
import ModalOption from '../ModalOption.vue'
export default {
    name: 'PerguntaTipo2',
    props: {
        perguntaData: Object,
        imagem: Object
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

        function setOptionLetter(optionIndex) {
            switch (optionIndex) {
                case 0:
                    return 'A'
                case 1:
                    return 'B'
                case 2:
                    return 'C'
            }
        }

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
                id: props.perguntaData.respostas[optionIndex].id,
                text: optionText,
                letter: optionLetter(),
            }
        }

        function closeModalOptions() {
            state.showModalOptions = false
            state.optionSelected = {}
        }

        function confirmModalClick() {
            emit('confirmModalClick', state.optionSelected)
        }

        return {
            state,
            openModalOptions,
            closeModalOptions,
            confirmModalClick,
            setOptionLetter
        }
    }
}
</script>

<style></style>