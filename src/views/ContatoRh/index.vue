<template>
  <div class="flex-1 flex flex-col py-10 w-full items-center justify-center max-w-container mx-auto px-4">

    <!-- title -->
    <div class="flex flex-col items-center max-w-md mb-5 md:mb-8">
      <h2 class="text-lg font-bold md:mb-1 md:text-3xl">Contado Recursos Humanos</h2>
      <p class="text-13 font-bold text-center md:text-base">Caso tenha alguma dúvida ou problema, <br class="md:hidden"> entre em contato com o RH da AMCOR <br class="md:hidden"> pelos seguintes canais:</p>
    </div>

    <!-- telefones -->
    <div class="max-w-md mb-5 md:mb-8">
      <h3 class="text-13 font-bold text-center md:text-base">Telefones:</h3>
      <ul>
        <li class="text-lg font-bold md:mb-1 md:text-xl">
          <a href="tel:+123456789">
            (99) 9999.9999
          </a>
        </li>
        <li class="text-lg font-bold md:mb-1 md:text-xl">
          <a href="tel:+123456789">
            (99) 9999.9999
          </a>
        </li>
      </ul>
    </div>

    <!-- email -->
    <div class="max-w-md mb-8">
      <h3 class="text-13 font-bold text-center md:text-base">E-mail:</h3>
      <ul>
        <li class="text-lg font-bold md:mb-1 md:text-xl">
          <a href="mailto:m.bluth@example.com">
            rh@amcor.com.br
          </a>
        </li>
      </ul>
    </div>

    <router-link to="/login">
      <button class="btn-primary" >
        Voltar para o login
      </button>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'ContatoRhView',
  components: {

  },
  setup() {
  
  },
};
</script>