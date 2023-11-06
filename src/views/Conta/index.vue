<template>
  <div class="flex-1 flex flex-col pt-9 pb-12 w-full gap-[30px] items-center max-w-container mx-auto px-5 w1315:px-0">

    <!-- Title -->
    <PageTitle title="Minha Conta" />
   
    <!-- Conteudo  -->
    <div class="flex flex-col w-full gap-4 align-baseline justify-center sm:justify-items-start">
      <!-- Buttons  -->
      <div class="w-full flex justify-center items-center gap-5 pb-[31px]">
        <router-link to="/cenarios" class="btn-primary mx-0 text-xs px-[30px] sm:px-8 sm:min-w-[150px] text-center">
          Meus Cenários
        </router-link>

        <router-link to="/notificacoes" class="btn-primary mx-0 text-xs px-[17px] sm:min-w-[150px] text-center">
          Minhas Notificações
        </router-link>
      </div>
      <!-- Info Perfil  -->
      <div class="w-full flex flex-col sm:flex-row justify-center items-center gap-5">
        <div class="relative flex gap-[10px] pl-[10px]">
          <div
            class="border-white border-[3px] w-[130px] h-[130px] sm:w-[176px]  sm:h-[176px] rounded-20 bg-[url('/images/profile-picture.webp')] bg-cover">
          </div>
          <router-link to="/foto" class="absolute bg-[url('/images/icon-edit.webp')] h-[30px] w-[30px] bg-cover -right-10 sm:-left-10"></router-link>
        </div>

        <div class="flex flex-col gap-[15px] max-w-[300px] sm:max-1/2">
          <div class="flex flex-col items-center sm:items-start">
            <h3 class="text-13 font-normal">Nome</h3>
            <h2 class="text-13 font-bold">{{ `${ state.userData.primeiro_nome } ${ state.userData.ultimo_nome }` }}</h2>
          </div>

          <div class="flex flex-col items-center sm:items-start">
            <h3 class="text-13 font-normal">Matrícula:</h3>
            <h2 class="text-13 font-bold">{{ state.userData.matricula }}</h2>
          </div>

          <div class="flex flex-col items-center sm:items-start">
            <h3 class="text-13 font-normal">Unidade:</h3>
            <h2 class="text-13 font-bold">{{ state.userData.unidade_nome }}</h2>
          </div>
         
          <div class="flex flex-col items-center sm:items-start">
            <h3 class="text-13 font-normal">Setor:</h3>
            <h2 class="text-13 font-bold">{{ state.userData.setor_nome }}</h2>
          </div>
        </div>
      </div>
      <!-- Medalhas  -->
      <div class="w-full flex flex-col justify-center items-center gap-5">
        <div class="flex w-[280px] text-center items-center justify-center relative">
          <h2>Suas Medalhas: </h2>
          <button @click="openModalMedals"
            class="bg-[url('/images/icon-interrogation.webp')] h-[22px] w-[35px] bg-cover absolute right-0"></button>
          <ModalHelpMedals :isActive="state.modalMedalsIsActive" @closeModalClick="closeModalMedals"/>
        </div>

        <div class="flex gap-5" v-if="state.userData.medalhas">
          <div class=" w-[79px] h-[79px] border-white border-[2px] rounded-full bg-white">
            <div
              class="flex items-center justify-center bg-[url('/images/medals/golden_medal_empty.webp')] w-full h-full bg-cover">
              <h2 class="text-lg font-bold text-amcor-dark-blue">{{ formatQuantityMaxMedals(state.userData.medalhas.medalhas_ouro) }}</h2>
            </div>
          </div>

          <div class=" w-[79px] h-[79px] border-white border-[2px] rounded-full bg-white">
            <div
              class="flex items-center justify-center bg-[url('/images/medals/silver_medal_empty.webp')] w-full h-full bg-cover">
              <h2 class="text-lg font-bold text-amcor-dark-blue">{{ formatQuantityMaxMedals(state.userData.medalhas.medalhas_prata) }}</h2>
            </div>
          </div>

          <div class=" w-[79px] h-[79px] border-white border-[2px] rounded-full bg-white">
            <div
              class="flex items-center justify-center bg-[url('/images/medals/bronze_medal_empty.webp')] w-full h-full bg-cover">
              <h2 class="text-lg font-bold text-amcor-dark-blue">{{ formatQuantityMaxMedals(state.userData.medalhas.medalhas_bronze) }}</h2>
            </div>
          </div>
        </div>

        <div class="flex gap-5"  v-if="state.userData.medalhas">
          <div class="flex flex-col text-center gap-[3px]">
            <h3 class="font-bold text-13">Pontos</h3>
            <div
              class="h-[50px] w-[78px] flex items-center justify-center text-center text-lg text-bold border-white border-[2px] rounded-20">
              {{ state.userData.medalhas.medalhas_ouro * 5 }}</div>
          </div>

          <div class="flex flex-col text-center gap-[3px]">
            <h3 class="font-bold text-13">Pontos</h3>
            <div
              class="h-[50px] w-[78px] flex items-center justify-center text-center text-lg text-bold border-white border-[2px] rounded-20">
              {{ state.userData.medalhas.medalhas_prata * 3}}</div>
          </div>

          <div class="flex flex-col text-center gap-[3px]">
            <h3 class="font-bold text-13">Pontos</h3>
            <div
              class="h-[50px] w-[78px] flex items-center justify-center text-center text-lg text-bold border-white border-[2px] rounded-20">
              {{ state.userData.medalhas.medalhas_bronze * 1 }}</div>
          </div>
        </div>

        <div class="w-full flex justify-center items-center">
          <div class="flex flex-col items-center text-center gap-[3px]">
            <h3 class="font-bold text-13">Pontuaçãosss Total:</h3>
            <div
              class="h-[50px] w-[105px] flex items-center justify-center text-center text-lg text-bold border-white border-[2px] rounded-20">
              {{ state.userData.medalhas.pontos }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useUserStore } from '../../stores/UserStore.js';
import PageTitle from '../../components/PageTitle/index.vue'
import IconArrowBack from '../../components/Icons/IconArrowBack.vue';
import ModalHelpMedals from './components/ModalHelpMedals.vue';

export default {
  name: 'ContaView',
  components: {
    PageTitle,
    IconArrowBack,
    ModalHelpMedals,
  },
  props: {

  },
  setup() {
    const state = reactive({
      userData: {},
      medalsData: {},
      modalMedalsIsActive: false,
    })

    const userStore = useUserStore()
    state.userData = userStore.user
   
    function openModalMedals() {
      state.modalMedalsIsActive = true
    }

    function closeModalMedals() {
      state.modalMedalsIsActive = false;
    }

    function formatQuantityMaxMedals(number) {
      // Verifica se o número é maior que 99 e adiciona o "+" se for verdadeiro
      if(number)  {
        return number > 999 ? '999+' : number.toString();    
      } else {
        return '0'
      }
    }

    return {
      state,
      openModalMedals,
      formatQuantityMaxMedals,
      closeModalMedals,
    };
  },
};
</script>
