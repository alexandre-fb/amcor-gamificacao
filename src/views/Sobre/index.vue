<template>
  <div class="flex-1 flex flex-col pt-9 pb-12 w-full gap-8 items-center max-w-container mx-auto px-5 w1315:px-0">

    <PageTitle title="Sobre o EHS Play" />

    <!-- Conteudo  -->
    <div class="flex flex-col w-full gap-4 align-baseline justify-center sm:justify-items-start">

      <div class="w-full flex justify-center">
        <img src="/images/medalhas-sobre.webp" alt="EHS play" class="w-[310px] sm:w-[323px] h-auto">
      </div>

      <div class="gap-4 flex flex-col">

        <div class="gap-4 flex flex-col md:flex-row">     

          <div class="gap-4 flex flex-col text-[13px] font-normal">
            <h2 class="text-[13px] font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan ac mauris in vehicula. Morbi nec metus tellus.</h2>

            <h3>Aliquam ornare semper est, sed pellentesque nisi lacinia at. Praesent consequat magna in rutrum consequat. Phasellus lacinia ipsum vel justo rhoncus tempus. Vivamus at viverra est. Maecenas feugiat congue imperdiet</h3>
            
            <h3>Cras congue purus et libero dignissim mollis. Nullam ullamcorper metus eget odio fringilla dignissim. Pellentesque leo risus, lacinia vel purus et, tristique fringilla nibh. Pellentesque molestie laoreet lacus in fringilla. Maecenas tincidunt mollis mi, eget cursus mauris lobortis eu. Phasellus tempor mollis lacus at aliquam. Maecenas euismod ullamcorper ipsum, commodo rutrum velit vehicula et. Fusce arcu odio, lacinia et augue vel, gravida interdum felis. Integer laoreet tristique varius. Integer venenatis purus vel lacus lacinia sagittis. Morbi in dui blandit, viverra magna volutpat, condimentum ligula. Praesent elementum sed elit non faucibus. Curabitur ac convallis libero. Ut quis quam interdum, aliquam mi nec, euismod nibh.</h3>
          </div>

          <div class="gap-4 flex flex-col text-[13px] font-normal">
            <h3>Aliquam ornare semper est, sed pellentesque nisi lacinia at. Praesent consequat magna in rutrum consequat. Phasellus lacinia ipsum vel justo rhoncus tempus. Vivamus at viverra est. Maecenas feugiat congue imperdiet</h3>
            
            <h3>Cras congue purus et libero dignissim mollis. Nullam ullamcorper metus eget odio fringilla dignissim. Pellentesque leo risus, lacinia vel purus et, tristique fringilla nibh. Pellentesque molestie laoreet lacus in fringilla. Maecenas tincidunt mollis mi, eget cursus mauris lobortis eu. Phasellus tempor mollis lacus at aliquam. Maecenas euismod ullamcorper ipsum, commodo rutrum velit vehicula et. Fusce arcu odio, lacinia et augue vel, gravida interdum felis. Integer laoreet tristique varius. Integer venenatis purus vel lacus lacinia sagittis. Morbi in dui blandit, viverra magna volutpat, condimentum ligula. Praesent elementum sed elit non faucibus. Curabitur ac convallis libero. Ut quis quam interdum, aliquam mi nec, euismod nibh.</h3>
          </div>
        </div>

      </div>
      
    </div>
</div>
</template>

<script>
import PageTitle from '../../components/PageTitle/index.vue'
import IconArrowBack from '../../components/Icons/IconArrowBack.vue';

export default {
  name: 'SobreView',
  components: {
    IconArrowBack,
    PageTitle
  },
  setup() {

    return {

    };
  },
};
</script>
