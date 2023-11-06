<template>
    <ModalBase 
        :isActive="isActive" 
        @closeModalClick="closeModal"
        :showCloseButton="false"
        max-width="max-w-md"
    >
        <div class="flex flex-col gap-5 items-center py-5">

            <h2 class="text-lg font-bold md:mb-1 md:text-3xl">Ops! Algo deu errado.</h2>

            <p class="text-13 font-bold text-center md:text-base">Os dados informados não foram <br class="md:hidden"> encontrados. Por favor, tente novamente.</p>

            <p class="text-13  text-center md:text-base">Para acessar o EHSPlay é necessário se cadastrar, caso ainda não tenha feito o seu, clique em “fazer cadastro”.</p>

            <button @click="closeModal" class="btn-secondary-h-opacity">Fazer Cadastro</button>

            <p class="text-13  text-center md:text-base">Se você já tem cadastro e o problema persiste, procure o Departamento de Recursos Humanos da AMCOR.</p>

            <!-- buttons -->
            <div class="flex flex-wrap gap-4">
                <router-link to="/contato-rh">
                    <button class="btn-secondary-h-opacity px-3 w-28">Contato RH</button>
                </router-link>
                <button @click="closeModal" class="btn-secondary-h-opacity px-3 w-28">Fechar</button>
            </div>


        </div>
    </ModalBase>
</template>

<script>
import { ref } from 'vue'
import ModalBase from '../../../components/ModalBase/index.vue'

export default {
    name: 'ModalErroLogin',
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