<template>
    <ModalBase :isActive="isActive" @closeModalClick="closeModal" :showCloseButton="true" max-width="max-w-screen-md">
        <div class="flex flex-col gap-5 items-center justify-center py-5 mb-[25px]">
            <div class="flex flex-col items-center text-center">
                <h2 class="font-bold text-lg">As Medalhas</h2>
                <h3 class="font-bold text-13">Você ganha medalhas de acordo com seu desempenho nos cenários.</h3>
            </div>

            <div class="flex flex-col items-center lg:flex-row gap-5">
                <div class="flex flex-col items-center m-w-[299px] h-auto gap-[8px]">

                    <div class="flex justify-center items-center w-[79px] h-[79px] border-white border-[2px] rounded-full bg-white">
                        <div
                            class="flex items-center justify-center bg-[url('/images/medals/gold-medal-modal.webp')] w-[70px] h-[70px] bg-cover">
                        </div>
                    </div>

                    <div class="text-center">
                        <h2 class="font-bold text-lg">Medalha de Ouro: 5 pontos</h2>
                        <h3 class="font-bold text-13">Acertar 100% das questões.</h3>
                    </div>

                </div>

                <div class="flex flex-col items-center m-w-[299px] h-auto gap-[8px]">

                    <div class="flex justify-center items-center w-[79px] h-[79px] border-white border-[2px] rounded-full bg-white">
                        <div
                            class="flex items-center justify-center bg-[url('/images/medals/silver-medal-modal.webp')] w-[70px] h-[70px] bg-cover">
                        </div>
                    </div>

                    <div class="text-center">
                        <h2 class="font-bold text-lg">Medalha de Prata: 3 pontos</h2>
                        <h3 class="font-bold text-13">Acertar 75% das questões.</h3>
                    </div>
                </div>

                <div class="flex flex-col items-center m-w-[299px] h-auto gap-[8px]">

                    <div class="flex justify-center items-center w-[79px] h-[79px] border-white border-[2px] rounded-full bg-white">
                        <div
                            class="flex items-center justify-center bg-[url('/images/medals/bronze-medal-modal.webp')] w-[70px] h-[70px] bg-cover">
                        </div>
                    </div>
                    <div class="text-center">
                        <h2 class="font-bold text-lg">Medalha de Bronze: 1 ponto</h2>
                        <h3 class="font-bold text-13">Acertar 50% das questões.</h3>
                    </div>
                </div>
            </div>

        </div>
    </ModalBase>
</template>

<script>
import { ref } from 'vue'
import ModalBase from '../../../components/ModalBase/index.vue'

export default {
    name: 'ModalHelpMedals',
    components: {
        ModalBase
    },
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    emits: ['closeModalClick'],
    setup(props, { emit }) {
        const modalIsActive = ref(false)

        function closeModal() {
            emit('closeModalClick')
        }

        return {
            modalIsActive,
            closeModal
        }
    }
}
</script>

<style></style>