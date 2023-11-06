<template>
  <div class="flex-1 flex flex-col pt-9 pb-12 w-full items-center max-w-container mx-auto px-5 w1315:px-0">

    <!-- Title -->
    <PageTitle title="Minhas Notificações" />

    <!-- Conteudo  -->
    <div class="flex flex-col w-full align-baseline justify-center" >
      <!-- Loading  -->
      <div 
        v-if="state.loadingNotificationData" 
        v-loading="state.loadingNotificationData"
        element-loading-background="transparent" 
        class="w-full h-36">
      </div>

      <div v-else v-motion-fade>
        <div v-for="(notification, index) in state.notificationData" :key="index">
          <NotificationItem
            :date="notification.data"
            :hour="notification.hora"
            :message="notification.texto"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { api } from '../../services/api';
import PageTitle from '../../components/PageTitle/index.vue'
import IconArrowBack from '../../components/Icons/IconArrowBack.vue';
import NotificationItem from './components/NotificationItem.vue';

import MockEstaticoNotificacoes from '../../mocksEstaticos/notificacoes.js'

export default {
  name: 'NotificacoesView',
  components: {
    PageTitle,
    IconArrowBack,
    NotificationItem,
  },
  setup() {
    const state = reactive ({
      notificationData: {
        data: '',
        hora:'',
        texto:'',
      },
      loadingNotificationData: false,
    })
    onMounted(() => {
      fetchNotification()
      state.notificationData = MockEstaticoNotificacoes
    })

    async function fetchNotification() {
      try {
        // state.loadingNotificationData = true
        // const response = await api.get('/lista-notificacoes')
        // state.notificationData = response.data;
      } catch (error) {
        console.error('Error fetching notification data:', error);
      } finally {
        state.loadingNotificationData = false
      }
    }
   
    return {
      state,
      fetchNotification,
    };
  },
};
</script>
