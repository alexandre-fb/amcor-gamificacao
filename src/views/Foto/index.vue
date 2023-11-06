<template>
  <div class="flex-1 flex flex-col py-10 w-full items-center max-w-container mx-auto px-5">
    <!-- Title -->
    <PageTitle title="Minha Foto" />

    <!-- Foto  -->
    <div
      class="h-[130px] w-[130px] bg-black-50 border-[3px] border-white flex justify-center items-end mt-5 rounded-20 bg-amcor-light-blue">
      <IconPhotoUser />
    </div>

    <!-- Informações  -->
    <div class="flex flex-col w-full items-center justify-center pt-4 mb-6 text-center text-13 md:text-base">
      <h2 class="mb-5 font-bold md:hidden">Você pode adicionar sua foto de perfil de duas maneiras:</h2>
      <h3 class="mb-5">Tenha certeza que a foto selecionada mostre claramente seu rosto.</h3>
    </div>

    <div 
      v-if="state.loadingUploadFoto" 
      v-loading="state.loadingUploadFoto" 
      element-loading-background="transparent" 
      class="w-full h-36"
    ></div>
    <div v-else class="flex flex-col md:flex-row gap-5 ">
      <div class="block md:hidden">
        <label class="btn-primary block cursor-pointer" for="fotoCapturada">Tire uma foto agora</label>
        <input class="hidden" id="fotoCapturada" type="file" accept="image/*" capture="camera" @change="onFotoUpload" />
      </div>
      <div>
        <label class="btn-primary block cursor-pointer" for="fotoSelecionada">Selecione uma foto</label>
        <input class="hidden" type="file" id="fotoSelecionada" name="avatar" accept="image/png, image/jpeg"
          @change="onFotoUpload" />
      </div>
    </div>

  </div>
</template>
  
<script>
import { api, apiFetch } from '../../services/api.js'
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import IconArrowBack from '../../components/Icons/IconArrowBack.vue';
import IconPhotoUser from '../../components/Icons/IconPhotoUser.vue';
import PageTitle from '../../components/PageTitle/index.vue'

export default {
  name: 'FotosView',
  components: {
    IconArrowBack,
    IconPhotoUser,
    PageTitle
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      loadingCaptura: false,
      fotoAdicionada: '',
      loadingUploadFoto: false
    })

    function onFotoUpload(ev) {
      var fReader = new FileReader();

      fReader.readAsDataURL(ev.target.files[0]);
      fReader.onloadend = function (event) {
        state.fotoAdicionada = event.target.result
        sendImage()
      }
    }

    async function sendImage() {
      try {
          state.loadingUploadFoto = true

          let token = localStorage.getItem('token');

          const body = {
            token,
            foto: state.fotoAdicionada
          }

          const response = await apiFetch.post('/usuario/foto', body)

          ElMessage({
            showClose: true,
            message: "Imagem enviada com sucesso!",
            type: "success",
          });

          router.push({ name: 'conta' });

        } catch (error) {

          ElMessage({
            showClose: true,
            message: "Erro ao enviar a imagem",
            type: "error",
          });

        } finally {
          state.loadingUploadFoto = false
        }
    }
    return {
      state,
      onFotoUpload,
    };
  },
};
</script>
  