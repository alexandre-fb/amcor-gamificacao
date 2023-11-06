<template>
    <teleport to="body">
        <!-- overlay -->
        <div 
            class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-75"
            v-if="isActive"
            @click.self="closeModal"
        >

            <!-- content container -->
            <div 
                class="relative flex flex-col py-4 px-4 gap-4 w-[90%] overflow-x-hidden h-fit max-h-[90%] rounded-20 items-center" 
                :class="`${ maxWidth } ${ bgContentColor }`"
                v-motion-slide-bottom
            >
                <div class="overflow-y-auto w-full">
                    <slot />
                </div>

                <!-- close button -->
                <button
                    class="btn-secondary-h-opacity"
                    v-if="showCloseButton"
                    @click="closeModal"
                >
                    Fechar
                </button>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        maxWidth: {
            type: String,
            default: 'max-w-7xl'
        },
        bgContentColor: {
            type: String,
            default: 'bg-amcor-light-blue'
        },
        showCloseButton: {
            type: Boolean,
            default: true
        },

    },
    emits: ['closeModalClick'],
    setup(props, { emit }) {

        function closeModal() {
            emit('closeModalClick')
        }

        return {
            closeModal
        }
    },
}
</script>