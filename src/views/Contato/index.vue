<template>
  <div class="flex-1 flex flex-col py-10 w-full items-center max-w-container mx-auto px-5">

    <!-- Titulo  -->
    <PageTitle title="Contato" />

    <!-- Formulario  -->
    <div class="flex flex-col items-center px-5 py-4 w-ful">
      <div class="mb-[17px]">
        <h3 class="text-[13px] font-normal">
          Caso tenha alguma dúvida ou problema, entre em contato com o RH da AMCOR pelos seguintes canais:
        </h3>
      </div>

      <div class="py-4 flex flex-col items-center">
        <h2 class="mb-3 text-[13px] font-bold">
          Formulário de Contato:
        </h2>

        <div class="flex flex-col items-center mb-2.5 gap-2.5 w-[290px] sm:w-[500px]">
          <h3 class="text-[13px] font-normal">
            Assunto:
          </h3>
          <input type="text" class="h-[50px] w-full rounded-[20px] bg-transparent border-2 border-white focus:outline-none pl-2">
        </div>

        <div class="flex flex-col items-center gap-2.5 mb-5 w-[290px] sm:w-[500px]">
          <h3 class="text-[13px] font-normal">
            Mensagem:
          </h3>
          <textarea class="h-[100px] max-h-[150px] sm:h-[150px] w-full rounded-[20px] bg-transparent border-2 border-white focus:outline-none text-start pl-2">
            </textarea>
        </div>

        <div class="mb-[29px] h-[50px] w-[100px] bg-amcor-light-blue flex justify-center items-center rounded-[20px] cursor-pointer">
          <button class="text-3 font-bold ">
            Enviar
          </button>
        </div>

        <h2 class="text-[13px] font-bold">
          Endereços:
        </h2>
      </div>
    </div>
  </div>
  <!-- Informações  -->
  <div class="flex w-full max-w-container mx-auto justify-center gap-[20px] pt-[24px]">
    <div class="flex flex-col ">
      <h2 class=" text-[13px] font-bold">Telefones:</h2>
      <p class="text-[13px] font-normal">(99) 9999.9999</p>
      <p class="text-[13px] font-normal">(99) 9999.9999</p>
    </div>
    
    <div class="w-[2px] h-max min-h-[56px] bg-amcor-light-blue"></div>

    <div class="flex flex-col">
      <h2 class="text-[13px] font-bold">E-mail:</h2>
      <p class="text-[13px] font-normal">rh@amcor.com.br</p>
    </div>

  </div>
 
</template>

<script>
import PageTitle from '../../components/PageTitle/index.vue'
import IconArrowBack from '../../components/Icons/IconArrowBack.vue';

export default {
  name: 'ContatoView',
  components: {
    PageTitle,
    IconArrowBack,
  },
  setup() {

    return {

    };
  },
};
</script>
