<template>
  <div class="flex-1 flex flex-col py-10 w-full items-center justify-center max-w-container mx-auto px-4">

    <!-- title -->
    <div class="flex flex-col items-center mb-5 md:mb-8">
      <h2 class="text-lg font-bold md:mb-1 md:text-3xl">Faça seu cadastro.</h2>
      <p class="text-xs font-bold text-center md:text-base">Entre com os dados solicitados abaixo e <br class="md:hidden"> clique em “cadastrar”.</p>
    </div>

    <!-- inputs -->
    <!-- loading -->
    <div v-if="state.loadingCadastro" v-loading="state.loadingCadastro" element-loading-background="transparent" class="w-full h-36"></div>

    <div v-else v-motion-fade class="flex flex-col items-center w-full mb-8 md:mb-10">
      <el-form 
        class="flex flex-col gap-4 items-center w-full mb-3"
        label-position="top" 
        ref="formRef" 
        :model="state.userData"
      >
        <!-- primeiro nome -->
        <el-form-item 
          class="w-full mb-5 max-w-[300px] md:max-w-[350px]" 
          label="Informe seu primeiro nome:" 
          prop="firstName"
          :rules="state.rules.firstName"
        >
          <el-input placeholder="Primeiro nome" v-model="state.userData.firstName" />
        </el-form-item>

        <!-- ultimo nome -->
        <el-form-item 
          class="w-full mb-5 max-w-[300px] md:max-w-[350px]" 
          label="Informe seu último nome:" 
          prop="lastName"
          :rules="state.rules.lastName"
        >
          <el-input placeholder="Último nome" v-model="state.userData.lastName" />
        </el-form-item>

        <!-- unidade -->
        <el-form-item 
          label="Seleciona a sua unidade:"
          class="w-full mb-5 max-w-[300px] md:max-w-[350px]"
          :rules="state.rules.unidade"
          prop="unidade"
        >
          <el-select
            v-model="state.userData.unidade"
            placeholder="Selecione"
            filterable
            prop="unidade"
            no-match-text="Não encontrado"
            no-data-text="Sem dados"
            :loading="state.loadingUnidades"
            loading-text="Carregando..."
          >
            <el-option 
              v-for="unidade in state.listaUnidades"
              :key="unidade.id"
              :label="unidade.nome" 
              :value="unidade.id"
            >
              <div class="option-content-wrapper">
                <span class="option-icon"></span>
                <span class="option-text">{{ unidade.nome }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- setor -->
        <el-form-item 
          label="Seleciona o seu setor:"
          class="w-full mb-5 max-w-[300px] md:max-w-[350px]"
          :rules="state.rules.setor"
          prop="setor"
        >
          <el-select
            v-model="state.userData.setor"
            placeholder="Selecione"
            filterable
            prop="setor"
            no-match-text="Não encontrado"
            no-data-text="Sem dados"
            :loading="state.loadingSetores"
            loading-text="Carregando..."
          >
            <el-option 
              v-for="setor in state.listaSetores"
              :key="setor.id"
              :label="setor.nome" 
              :value="setor.id"
            >
              <div class="option-content-wrapper">
                <span class="option-icon"></span>
                <span class="option-text">{{ setor.nome }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- matricula -->
        <el-form-item 
          class="w-full max-w-[300px] md:max-w-[350px]" 
          label="Informe sua matrícula:" 
          prop="matricula"
          :rules="state.rules.matricula"
        >
          <el-input placeholder="999999-99" v-model="state.userData.matricula" />
        </el-form-item>
      </el-form>

      <button class="btn-primary" @click="handleCadastro()">
        Cadastrar
      </button>
    </div>
  </div>
</template>

<script>
import { api, apiFetch } from '../../services/api.js'
import { onMounted, reactive, ref } from 'vue';
import router from '../../router/index.js';

export default {
  name: 'CadastroView',
  setup() {
    const formRef = ref();
    const state = reactive({
      
      showModalErro: false,
      loadingCadastro: false,
      loadingUnidades: false,
      loadingSetores: false,
      userData: {
        firstName: '',
        lastName: '',
        unidade: '',
        setor: '',
        matricula: '',
      },
      rules: {
        firstName: [
          {
            required: true,
            message: 'Insira o seu primeiro nome',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'O primeiro nome deve possuir no mímino 3 caracteres',
            trigger: 'blur'
          },
        ],
        lastName: [
          {
            required: true,
            message: 'Insira o seu último nome',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'O Último nome deve possuir no mímino 3 caracteres',
            trigger: 'blur'
          },
        ],
        unidade: [
          {
            required: true,
            message: 'Selecione a unidade',
            trigger: 'change'
          },
        ],
        setor: [
          {
            required: true,
            message: 'Selecione o setor',
            trigger: 'change'
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

    onMounted(() => {
      fetchUnidades()
      fetchSetores()
    })

    async function handleCadastro() {

      await formRef.value.validate(async(valid, fields) => {
        if(valid) {
          state.loadingCadastro = true
          try {

            const newUser = {
              primeiro_nome: state.userData.firstName,
              ultimo_nome: state.userData.lastName,
              matricula: state.userData.matricula,
              unidade_id: state.userData.unidade.toString(),
              setor_id: state.userData.setor.toString()
            }

            const response = await apiFetch.post('/usuario/cadastrar', newUser)
            console.log('response post cadastro', response)

            ElMessage({
              showClose: true,
              message: "Usuário cadastrado com sucesso!",
              type: "success",
            });

            router.push({ name: 'login' })
            
          } catch (error) {
            console.log('error', error)

            ElMessage({
              showClose: true,
              message: "Erro ao realizar o cadastro",
              type: "error",
            });

          } finally {
            state.loadingCadastro = false
          }
        } else {
          // SE ALGUM CAMPO DO FORM NAO FOR VALIDADO
          Object.keys(fields).forEach((field, index) => {

            if (fields[field][0].message) {
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

    async function fetchUnidades() {
      try {
        state.loadingUnidades = true

        const response = await apiFetch.get('/util/unidade')
        state.listaUnidades = response.data.itens
        
      } catch (error) {
        console.log('error', error)
        
        ElMessage({
          showClose: true,
          message: 'Erro ao buscar unidades.',
          type: "error"
        })
          
      } finally {
        state.loadingUnidades = false
      }
    }

    async function fetchSetores() {
      try {
        state.loadingSetores = true

        const response = await apiFetch.get('/util/setor')
        state.listaSetores = response.data.itens

      } catch (error) {
        ElMessage({
          showClose: true,
          message: 'Erro ao buscar setores.',
          type: "error"
        })
      } finally {
        state.loadingSetores = false
      }
    }

    return {
      state,
      handleCadastro,
      formRef,
    };
  },
};
</script>