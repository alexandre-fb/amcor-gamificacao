<template>
    <teleport to="body">
        <!-- overlay -->
        <div 
            class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-amcor-dark-blue bg-opacity-40"
            v-if="isActive"
            @click.self="closeModal"
        >
            <!-- content container -->
            <div v-motion-slide-bottom class="flex flex-col items-center w-fit max-w-[90%] h-fit max-h-[90%]"
                
            >
                <button class="btn-tertiary mb-5" @click="handleClickConfirm">Confirmar?</button>
                <div 
                    v-if="tipoPergunta === '1'"
                    v-motion-slide-bottom
                    class="__resposta relative flex items-center justify-center gap-1 p-4 w-full max-w-xs min-h-[70px] bg-amcor-dark-blue rounded-20 text-13 font-bold">
                    <div class="text-center">
                        <!-- <span class="text-amcor-light-blue">{{ letter }}. </span> -->
                        <span>{{ text }}</span>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'ModalOptions',
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
        },
        letter: {
            type: String,
        },
        tipoPergunta: {
            type: String,
            default: 1
        },
    },
    emits: ['confirmModalClick', 'closeModalClick' ],
    setup(props, { emit }) {

        function closeModal() {
            emit('closeModalClick')
        }

        function handleClickConfirm() {
            emit('confirmModalClick')
        }

        return {
            closeModal,
            handleClickConfirm
        }
    },
}
</script>
<style scoped>
.__resposta::after {
    content: '';
    display: block;
    width: 23px;
    height: 23px;
    border-radius: 5px;
    transform: rotate(45deg);
    position: absolute;
    top: -8px;
    z-index: 9;
    background-color: inherit;
}
</style>