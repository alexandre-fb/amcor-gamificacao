<template>
  <div class="flex flex-col justify-center items-center pb-9">
    <!-- loading -->
    <div v-if="state.loadingCenario" v-loading="state.loadingCenario" element-loading-background="transparent" class="w-full h-36"></div>
    
    <div v-else v-motion-fade class="flex flex-col items-center w-full">

      <!-- intro -->
      <div v-if="!state.gameIsStarted" class="w-full max-w-container px-3">
        <IntroGame 
        v-if="Object.keys(state.gameData).length > 0"
          :category="state.gameData.categoria_nome"
          :title="state.gameData.titulo"
          :description="state.gameData.descricao"
          :image="state.gameData.imagem"
          :image_alt="state.gameData.imagem_alt"
          @clickedStartGame="startGame"
        />
      </div>

      <!-- GAME -->
      <!-- perguntas -->
      <!-- vai passar uma por uma verificando se a questao atual é igual ao index -->
      <div 
        v-if="state.gameIsStarted && state.gameData.perguntas && !state.gameData.gameIsFinished" 
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
              <div class="" v-for="(pergunta, index) in state.gameData.perguntas" :key="index">
                <div v-if="state.currentQuestion === index">

                  <!-- <template v-if="pergunta.tipo_pergunta === 1"> -->
                  <template v-if="pergunta.respostas.some(resposta => resposta.imagem !== '')">
                    <PerguntaTipo1  
                      :perguntaData="pergunta" 
                      :imagem="{
                        imagem: state.gameData.imagem,
                        alt: state.gameData.imagem_alt
                      }" 
                      @confirmModalClick="handleConfirmResClick" />
                  </template>

                  <!-- <template v-if="pergunta.tipo_pergunta === 2"> -->
                  <template v-else>
                    <PerguntaTipo2  
                      :perguntaData="pergunta" 
                      :imagem="{
                        imagem: state.gameData.imagem,
                        alt: state.gameData.imagem_alt
                      }"
                      @confirmModalClick="handleConfirmResClick" />
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
          v-if="!state.loadingResultData"
          :totalQuestions="state.totalQuestions"
          :correctResponses="state.resultData.respostas_corretas"
          :time="state.resultData.totalTime"
          :medal="state.resultData.medalha"
          :points="state.resultData.pontos"
          @clickShowDetails="handleClickShowDetails"
          @clickTryAgain="handleClickTryAgain"
        />

        <div v-if="state.loadingResultData" v-loading="state.loadingResultData" element-loading-background="transparent" class="w-full h-36"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { api, apiFetch } from '../../services/api.js'
import IntroGame from './components/IntroGame.vue'
// import ModalOptions from './components/ModalOption.vue'
import IconCronometro from '../../components/Icons/IconCronometro.vue'
import GameResult from './components/GameResult.vue'
import PerguntaTipo1 from './components/Perguntas/PerguntaTipo1.vue'
import PerguntaTipo2 from './components/Perguntas/PerguntaTipo2.vue'
import { useUserStore } from '../../stores/UserStore.js'

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
      loadingResultData: false,
      timeInSeconds: 0,
      interval: null
    })

    onMounted(() => {
      fetchCenario()
    })

    async function fetchCenario() {
      try {
       
        state.loadingCenario = true

        // const response = await api.get('/game-1')
        const response = await apiFetch.get(`/cenario/detalhar/${state.cenarioId}`)

        state.gameData = response.data.dados

        //======só para teste

      //   state.gameData.imagem = "https://planmkt.com.br/clientes/amcor/images_temp/cenario-detalhe-cover.webp"
      //   state.gameData.perguntas[0].imagem = 'https://planmkt.com.br/clientes/amcor/images_temp/cenario-detalhe-cover.webp'
      //   state.gameData.perguntas[1].imagem = 'https://planmkt.com.br/clientes/amcor/images_temp/cenario-detalhe-cover.webp'
      //   state.gameData.perguntas[2].imagem = 'https://planmkt.com.br/clientes/amcor/images_temp/cenario-detalhe-cover.webp'
      //   state.gameData.perguntas[0].respostas = [
      //     {
      //         id: 4,
      //         texto: "dsdsdsd",
      //         cenario_pergunta_id: 4,
      //         imagem: "https://planmkt.com.br/clientes/amcor/images_temp/quiz/bombeiro.webp",
      //         imagem_alt: 'Teste',
      //         ativo: 1,
      //         created_at: "2023-10-18T17:50:28.000000Z",
      //         updated_at: "2023-10-18T17:50:28.000000Z"
      //     },
      //     {
      //         id: 5,
      //         texto: "dsdsdsd",
      //         cenario_pergunta_id: 4,
      //         imagem: 'https://planmkt.com.br/clientes/amcor/images_temp/quiz/gerente.webp',
      //         imagem_alt: null,
      //         ativo: 1,
      //         created_at: "2023-10-18T17:50:28.000000Z",
      //         updated_at: "2023-10-18T17:50:28.000000Z"
      //     }
      // ],
      //   state.gameData.perguntas[1].respostas = [
      //     {
      //         id: 4,
      //         texto: "dsdsdsd",
      //         cenario_pergunta_id: 4,
      //         imagem: "https://planmkt.com.br/clientes/amcor/images_temp/quiz/bombeiro.webp",
      //         imagem_alt: 'Teste',
      //         ativo: 1,
      //         created_at: "2023-10-18T17:50:28.000000Z",
      //         updated_at: "2023-10-18T17:50:28.000000Z"
      //     },
      //     {
      //         id: 5,
      //         texto: "dsdsdsd",
      //         cenario_pergunta_id: 4,
      //         imagem: 'https://planmkt.com.br/clientes/amcor/images_temp/quiz/gerente.webp',
      //         imagem_alt: null,
      //         ativo: 1,
      //         created_at: "2023-10-18T17:50:28.000000Z",
      //         updated_at: "2023-10-18T17:50:28.000000Z"
      //     }
      // ]
      //   state.gameData.perguntas[2].respostas = [
      //     {
      //         id: 4,
      //         texto: "dsdsdsd",
      //         cenario_pergunta_id: 4,
      //         imagem: '',
      //         imagem_alt: '',
      //         ativo: 1,
      //         created_at: "2023-10-18T17:50:28.000000Z",
      //         updated_at: "2023-10-18T17:50:28.000000Z"
      //     },
      //     {
      //         id: 5,
      //         texto: "dsdsdsd",
      //         cenario_pergunta_id: 4,
      //         imagem: '',
      //         imagem_alt: null,
      //         ativo: 1,
      //         created_at: "2023-10-18T17:50:28.000000Z",
      //         updated_at: "2023-10-18T17:50:28.000000Z"
      //     }
      // ]

      // state.gameData.perguntas.shift()


      //======fim só para teste


        state.totalQuestions = response.data.dados.perguntas.length

        console.log('state.gameData', state.gameData)
        console.log('state.totalQuestions', state.totalQuestions)
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

    function handleConfirmResClick(optionSelected) {
      console.log('optionSelected', optionSelected)
      state.respostas.push(optionSelected.id)

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

      fetchGameResult()
    }

    async function fetchGameResult() {
      try {
        state.loadingResultData = true
        
        
        const body = {
          cenario_id: state.cenarioId,
          usuario_token: localStorage.getItem('token'),
          respostas: state.respostas,
          tempo: state.timeInSeconds
        }

        const response = await apiFetch.post('cenario/jogar', body)
        
        
        
        console.log('response jogar', response)
        state.resultData = response.data
        
        state.resultData.totalTime = formatTimeCronometro(state.timeInSeconds)
        console.log('state.resultData', state.resultData)
        
        const userStore = useUserStore()
        let userData = userStore.user
        userData.medalhas = response.data.medalhas 
        userStore.setUser(userData)

      } catch (error) {
        console.log('error', error)
      } finally {
        state.loadingResultData = false
      }
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

