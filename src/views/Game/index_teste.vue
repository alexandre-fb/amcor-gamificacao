<template>
  <div class="flex flex-col justify-center items-center">
    <!-- loading -->
    <div v-if="state.loadingCenario"  v-loading="state.loadingCenario" element-loading-background="transparent" class="w-full h-36"></div>
    
    <div v-else v-motion-fade class="flex flex-col items-center w-full">

      <!-- intro -->
      <div v-if="!state.gameIsStarted" class="w-full max-w-container px-3">
        <IntroGame 
        v-if="state.gameData.data"
          :category="state.gameData.data.categoria"
          :title="state.gameData.data.titulo"
          :description="state.gameData.data.descricao"
          @clickedStartGame="startGame"
        />
      </div>

      <!-- GAME -->
      <!-- perguntas -->
      <!-- vai passar uma por uma verificando se a questao atual é igual ao index -->
      <div 
        v-if="state.gameIsStarted && state.gameData.quiz && !state.gameData.gameIsFinished" 
        v-motion-fade 
        class="w-full"
      >
        <div class="w-full"
        >
          <div class="w-full">
            <div class="flex flex-col items-center w-full">
              <!-- cronometro -->
              <div class="flex items-center justify-center w-40 h-12 border-2 border-white rounded-20 mb-4">
                <div class="flex items-center justify-center">
                  <i class="mr-2">
                      <IconCronometro />
                  </i>
                  <span class="block min-w-[86px] text-lg font-bold ">{{ formatTimeCronometro(state.timeInSeconds) }}</span>
                </div>
              </div>

              <!-- pergunta -->
              <div class="" v-for="(pergunta, index) in state.gameData.quiz" :key="index">
                <div v-if="state.currentQuestion === index">

                  <template v-if="pergunta.tipo_pergunta === 1">
                    <PerguntaTipo1  :gameData="pergunta" @confirmModalClick="handleConfirmResClick" />
                  </template>

                  <template v-if="pergunta.tipo_pergunta === 2">
                    <PerguntaTipo2  :gameData="pergunta" @confirmModalClick="handleConfirmResClick" />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RESULTADO -->
      <div 
        class="w-full max-w-container px-3" 
        v-if="state.gameIsFinished"
      >
        <GameResult 
          :totalQuestions="state.totalQuestions"
          :correctResponses="state.resultData.correctResponses"
          :time="state.resultData.totalTime"
          :medal="state.resultData.medal"
          :points="state.resultData.points"
          @clickShowDetails="handleClickShowDetails"
          @clickTryAgain="handleClickTryAgain"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../services/api.js'
import IntroGame from './components/IntroGame.vue'
// import ModalOptions from './components/ModalOption.vue'
import IconCronometro from '../../components/Icons/IconCronometro.vue'
import GameResult from './components/GameResult.vue'
import PerguntaTipo1 from './components/Perguntas/PerguntaTipo1.vue'
import PerguntaTipo2 from './components/Perguntas/PerguntaTipo2.vue'

export default {
  components: {
    PerguntaTipo1,
    PerguntaTipo2,
    IntroGame,
    // ModalOptions,
    GameResult,
    IconCronometro,
  },
  setup() {
    const route = useRoute()

    const state = reactive({
      cenarioId: route.params.id,
      loadingCenario: false,
      gameData: {},
      respostas: [],
      gameIsStarted: false,
      currentQuestion: 0,
      totalQuestions: 0,
      // showModalOptions: false,
      optionSelected: {},
      gameIsFinished: false,
      resultData: {
        correctResponses: 2,
        totalTime: "03:10:34",
        medal: 'ouro',
        points: 2
      },
      timeInSeconds: 0,
      interval: null
    })

    onMounted(() => {
      fetchCenario()
    })

    async function fetchCenario() {
      try {
       
        state.loadingCenario = true

        const response = await api.get('/game-1')

        console.log('game_data', response)

        state.gameData = response.data
        state.totalQuestions = response.data.quiz.length
      } catch (error) {
        console.log('error', error)
        
        ElMessage({
          showClose: true,
          message: 'Erro ao buscar o cenário.',
          type: "error"
        })

      } finally {
          state.loadingCenario = false  
      }
    }

    function startGame() {
      state.gameIsStarted = true
      startCronometro()
      window.scrollTo(0, 0)
    }

    // function openModalOptions(optionIndex, optionText) {
    //   state.showModalOptions = true

    //   const optionLetter = () => {
    //     switch (optionIndex) {
    //       case 0:
    //         return 'A'
    //       case 1:
    //         return 'B'
    //       case 2: 
    //         return 'C'
    //     }
    //   }
    //   state.optionSelected = {
    //     index: optionIndex,
    //     text: optionText,
    //     letter: optionLetter()
    //   }
    // }

    // function closeModalOptions() {
    //   state.showModalOptions = false
    //   state.optionSelected = {}
    // }

    function handleConfirmResClick() {
      state.respostas.push(state.optionSelected)

      goNextQuestion()

      if(state.currentQuestion === state.totalQuestions) {
        finishQuiz()
      }

      // closeModalOptions(),
      state.optionSelected = {}
    }

    function goNextQuestion() {
      state.currentQuestion++
      window.scrollTo(0, 0)
    }

    function finishQuiz() {
      state.gameIsFinished = true
      pauseCronometro()
      state.resultData.totalTime = formatTimeCronometro(state.timeInSeconds)
    }

    function handleClickShowDetails() {
      console.log('show details')

    }

    function handleClickTryAgain() {
      location.reload();
    }

    function startCronometro() {
      state.interval = setInterval(() => {
          state.timeInSeconds++
      }, 1000)
    }

    function pauseCronometro() {
        clearInterval(state.interval)
    }

    function formatTimeCronometro(totalSegundos) {
        const horas = Math.floor(totalSegundos / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundosRestantes = totalSegundos % 60;

        const horasFormatadas = String(horas).padStart(2, '0');
        const minutosFormatados = String(minutos).padStart(2, '0');
        const segundosFormatados = String(segundosRestantes).padStart(2, '0');

        return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
    }

    return {
      state,
      startGame,
      goNextQuestion,
      finishQuiz,
      // openModalOptions,
      // closeModalOptions,
      handleConfirmResClick,
      handleClickShowDetails,
      handleClickTryAgain,
      formatTimeCronometro, 
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

