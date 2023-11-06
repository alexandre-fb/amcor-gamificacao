<template>
  <div class="flex-1 flex flex-col py-10 w-full items-center justify-center max-w-container mx-auto px-4">

    <!-- title -->
    <div class="flex flex-col items-center mb-5 md:mb-8">
      <h2 class="text-lg font-bold md:mb-1 md:text-3xl">Bem-vindo ao EHS Play.</h2>
      <p class="text-xs font-bold text-center md:text-base">Entre com os dados solicitados <br> abaixo e clique em
        “entrar”.</p>
    </div>

    <!-- inputs -->
    <!-- loading -->
    <div v-if="state.loadingLogin" v-loading="state.loadingLogin" element-loading-background="transparent" class="w-full h-36"></div>

    <div v-else v-motion-fade class="flex flex-col items-center w-full mb-8 md:mb-10" >
      <el-form class="flex flex-col gap-4 items-center w-full mb-3" label-position="top" ref="formRef"
        :model="state.userFormData">


        <el-form-item class="w-full mb-5 max-w-[300px] md:max-w-[350px]" label="Informe seu primeiro nome:" prop="primeiro_nome"
          :rules="state.rules.primeiro_nome">
          <el-input placeholder="Primeiro nome" v-model="state.userFormData.primeiro_nome" />
        </el-form-item>

        <el-form-item class="w-full max-w-[300px] md:max-w-[350px]" label="Informe sua matrícula:" prop="matricula"
          :rules="state.rules.matricula">
          <el-input placeholder="999999-99" v-model="state.userFormData.matricula" @keyup.enter="handleLogin(formRef)" />
        </el-form-item>
      </el-form>

      <button class="btn-primary" @click="handleLogin(formRef)">
        Entrar
      </button>
    </div>

    <!-- link cadastro -->
    <div>
      <p class="text-13">Caso ainda não tenha cadastro,
        <router-link to="/cadastro">
          <span class="px-2 py-1 font-bold bg-amcor-light-blue rounded-20 hover:bg-amcor-dark-blue transition-colors">
            clique aqui
          </span>
        </router-link>
      </p>
    </div>

    <!-- Modal erro -->
    <ModalErroLogin :isActive="state.showModalErro" @closeModalClick="() => state.showModalErro = false" />

  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { api, apiFetch } from '../../services/api.js'
import router from '../../router/index.js'
import { useUserStore } from '../../stores/UserStore.js';
import ModalErroLogin from './components/ModalErroLogin.vue';

export default {
  name: 'LoginView',
  components: {
    ModalErroLogin
  },
  setup() {
    const formRef = ref();
    const state = reactive({
      showModalErro: false,
      loadingLogin: false,
      userFormData: {
        primeiro_nome: '',
        matricula: '',
      },
      rules: {
        primeiro_nome: [
          {
            required: true,
            message: 'Insira o seu primeiro nome',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'O nome deve possuir no mímino 3 caracteres',
            trigger: 'blur'
          },
        ],
        matricula: [
          {
            required: true,
            message: 'Insira a sua matrícula',
            trigger: 'blur',
          },
          {
            min: 3,
            message: 'A matrícula deve possuir no mímino 3 caracteres',
            trigger: 'blur'
          },
        ],
      }
    })
    
    const userStore = useUserStore()

    async function handleLogin(form) {

      await form.validate(async (valid, fields) => {
        if (valid) {
          state.loadingLogin = true

          try {
            const body = state.userFormData

            const response = await apiFetch.post('/usuario/login', body)
            console.log('response login >>>', response)

            const usuarioComNotificacoesEMedalhas = { ...response.data.usuario, notificacoes: 12, medalhas: response.data.medalhas}

            userStore.setToken(response.data.token)
            // userStore.setUser(response.data.usuario)
            userStore.setUser(usuarioComNotificacoesEMedalhas)
            // userStore.setMedals(response.data.medalhas)

            if(response.status >= 200 && response.status <= 300) {
              ElMessage({
              showClose: true,
              message: response?.data.message,
              type: "success",
            });

              router.push({ name: 'home' })
            }

          } catch (error) {
            console.log('error', error)

            ElMessage({
              showClose: true,
              message: error.response?.data.message,
              type: "error",
            });

            state.showModalErro = true

          } finally {
            state.loadingLogin = false
          }
        } else {
          // SE ALGUM CAMPO DO FORM NAO FOR VALIDADO
          Object.keys(fields).forEach((field, index) => {

            if(fields[field][0].message) {
              ElMessage({
                showClose: true,
                message: fields[field][0].message,
                type: "error",
              });
            } else {
              ElMessage({
                showClose: true,
                message: 'Verifique os campos do formulário',
                type: "error",
              });
            }
          }); 
        }
      })
    }

    return {
      state,
      handleLogin,
      formRef,
    };
  },
};
</script>