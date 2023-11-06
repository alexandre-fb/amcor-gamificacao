<template>
    <div class="__header-bg relative z-50 flex justify-center w-full px-3 h-[90px] bg-white">
        <nav class="relative flex items-center justify-center w-full max-w-container">

            <!-- MENU DESKTOP -->
            <ul class="absolute left-0 text-black items-center hidden xl:flex gap-10">
                <!-- <ul class="items-center gap-11 hidden lg:flex"> -->
                <li class="group relative leading-initial" v-for="(item, index) in state.menuItems" :key="index">
                    <router-link :to="item.link">
                        <div class="__menu__link flex gap-2">
                            <i class="flex w-4 h-4 justify-center group-hover:scale-[1.15] transition-transform ease-in-out duration-300"
                                :class="item.icon === 'icon-question' ? 'w-3' : ''">
                                <component :is="item.icon" />
                            </i>
                            <span
                                class="text-xs text-amcor-light-blue group-hover:text-amcor-dark-blue transition-colors ease-in-out duration-300">
                                {{ item.label }}
                            </span>
                        </div>
                    </router-link>
                </li>
            </ul>

            <!-- MENU MOBILE -->
            <div class="absolute left-0 xl:hidden">
                <!-- HAMBURGER -->
                <div class="menu__hamburger space-y-2 cursor-pointer border-2 border-amcor-light-blue p-2 rounded-2xl"
                    :class="state.menuMobileIsOpen ? 'hamburgerIsActive' : ''" @click.stop="toogleMenu">
                    <div class="w-[26px] h-[3px] bg-amcor-light-blue rounded-sm"></div>
                    <div class="w-[26px] h-[3px] bg-amcor-light-blue rounded-sm"></div>
                    <div class="w-[26px] h-[3px] bg-amcor-light-blue rounded-sm"></div>
                </div>

                <!-- LINKS MOBILE -->
                <div id="header-links-mobile"
                    class="absolute z-50 bg-amcor-light-blue w-60 left-0 top-14 p-7 rounded-[20px] text-right h-fit"
                    v-motion-slide-top v-if="state.menuMobileIsOpen">
                    <ul class="flex flex-col gap-5">
                        <li class="group relative flex items-center gap-5 h-fit leading-initial"
                            v-for="(item, index) in state.menuItems" :key="index">
                            <router-link :to="item.link">
                                <div :href="item.link" class="__menu__link flex gap-5 text-black">
                                    <i class="flex w-5 h-5 justify-center group-hover:scale-[1.15] transition-transform ease-in-out duration-300"
                                        :class="item.icon === 'icon-play' ? 'w-4 h-4' : ''">
                                        <component :is="item.icon" />
                                    </i>
                                    <span
                                        class="leading-none group-hover:text-amcor-dark-blue transition-colors ease-in-out duration-300">
                                        {{ item.label }}
                                    </span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- LOGO -->
            <router-link to="/">
                <img src="/images/logo-ehsplay.webp" alt="EHS play" class="w-[184px] md:w-[195px] h-auto">
            </router-link>

            <!-- USER -->
            <button class="absolute right-0 w-[50px] h-[50px] cursor-pointer" @click.stop="toogleModalUserData">
                <img src="/images/user-header-img.webp" alt="EHS play" class="w-full h-full object-cover rounded-2xl">
                <div
                    class="absolute flex items-center justify-center -bottom-2 -left-2 p-2 min-w-[26px] h-5 bg-amcor-light-blue rounded-2xl">
                    <span class="font-bold"
                          :class="formatedNotifications <= 99 ? 'text-xs' : 'text-[10px]'"
                    >
                        {{ formatedNotifications }}
                    </span>
                </div>
            </button>

            <!-- USER MODAL -->
            <div id="header-user-modal"
                class="absolute z-50 bg-amcor-light-blue w-full max-w-[220px] right-0 top-20 p-4 rounded-[20px] h-fit"
                v-motion-slide-top v-if="state.userDataIsOpen">

                <h3 class="text-lg font-bold mb-4">Olá, {{ state.userData.primeiro_nome }}</h3>

                <!-- medals -->
                <div class="mb-4">
                    <ul class="flex justify-between gap-3">
                        <li
                            class="relative flex items-center justify-center w-[53px] h-[53px] bg-white p-[3px] rounded-full hover:scale-105 transition duration-300 ease-in-out cursor-default">
                            <img src="/images/medals/golden_medal_empty.webp" alt="Medalha de ouro" class="w-100 h-100">
                            <div class="block absolute font-bold text-xs">
                                <span class="text-amcor-dark-blue"
                                      :class="state.userData.medalhas.medalhas_ouro > 999 ? 'text-[10px]' : ''"       
                                >
                                    {{ formatMedalsAmount(state.userData.medalhas.medalhas_ouro) }}
                                </span>
                            </div>
                        </li>
                        <li
                            class="relative flex items-center justify-center w-[53px] h-[53px] bg-white p-[3px] rounded-full hover:scale-105 transition duration-300 ease-in-out cursor-default">
                            <img src="/images/medals/silver_medal_empty.webp" alt="Medalha de prata" class="w-100 h-100">
                            <div class="block absolute text-amcor-dark-blue font-bold text-xs">
                                <span class="text-amcor-dark-blue"
                                      :class="state.userData.medalhas.medalhas_prata > 999 ? 'text-[10px]' : ''"       
                                >
                                    {{ formatMedalsAmount(state.userData.medalhas.medalhas_prata) }}
                                </span>
                            </div>
                        </li>
                        <li
                            class="relative flex items-center justify-center w-[53px] h-[53px] bg-white p-[3px] rounded-full hover:scale-105 transition duration-300 ease-in-out cursor-default">
                            <img src="/images/medals/bronze_medal_empty.webp" alt="Medalha de bronze" class="w-100 h-100">
                            <div class="block absolute text-amcor-dark-blue font-bold text-xs">
                                <span class="text-amcor-dark-blue"
                                      :class="state.userData.medalhas.medalhas_bronze > 999 ? 'text-[10px]' : ''"       
                                >
                                    {{ formatMedalsAmount(state.userData.medalhas.medalhas_bronze) }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- pontuação -->
                <div class="flex flex-col items-center mb-5">
                    <h4 class="mb-2 text-xs font-bold">Pontuação Total:</h4>
                    <div class="flex justify-center items-center w-full py-3 border border-white rounded-2xl">
                        <!-- ATUALIZAR -->
                        <span class="text-[18px] font-bold">{{ state.userData.medalhas.pontos }}</span>
                    </div>
                </div>

                <!-- links -->
                <ul class="flex flex-col gap-5">
                    <li class="group relative flex items-center gap-5 h-fit leading-initial"
                        v-for="(item, index) in state.userDataLinks" :key="index">
                        <router-link :to="item.link">
                            <div :href="item.link" class="__menu__link flex items-center gap-5 text-black"
                                @click="handleClickUserModalLinks(item.value)">

                                <!-- notificacoes -->
                                <div v-if="item.value === 'notificacoes'"
                                    class="flex justify-center items-center w-5 h-4 bg-amcor-dark-blue rounded-xl group-hover:scale-[1.15] transition-transform ease-in-out duration-300">
                                    <span v-if="state.userData.notificacoes > 99" class="text-[8px] font-bold">99+</span>
                                    <!-- ATUALIZAR -->
                                    <span v-else class="text-[10px]">12</span>
                                    <!-- <span v-else class="text-[10px]">{{ state.userData.notificacoes }}</span> -->
                                </div>

                                <!-- outros icones -->
                                <i v-else
                                    class="flex w-5 h-5 justify-center group-hover:scale-[1.15] transition-transform ease-in-out duration-300">
                                    <component :is="item.icon" />
                                </i>
                                <span
                                    class="group-hover:text-amcor-dark-blue transition-colors ease-in-out duration-300 text-xs">
                                    {{ item.label }}
                                </span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
  
<script>
import { onBeforeUnmount, onMounted, reactive, computed, onBeforeMount } from 'vue';
import { useUserStore } from '../../stores/UserStore.js';

// icons
import IconQuestion from '../Icons/IconQuestion.vue';
import IconPlay from '../Icons/IconPlay.vue';
import IconChart from '../Icons/IconChart.vue';
import IconTalkBallon from '../Icons/IconTalkBallon.vue';
import IconInfo from '../Icons/IconInfo.vue';
import IconGrid from '../Icons/IconGrid.vue';
import IconDoor from '../Icons/IconDoor.vue';

export default {
    name: 'Header',
    components: {
        IconQuestion,
        IconPlay,
        IconChart,
        IconTalkBallon,
        IconInfo,
        IconGrid,
        IconDoor
    },
    setup() {
        const state = reactive({
            menuItems: [
                {
                    label: "Sobre o AmcorPlay",
                    value: "sobre",
                    link: "/sobre",
                    icon: 'icon-question'
                },
                {
                    label: "Cenários",
                    value: "cenarios",
                    link: "/cenarios",
                    icon: 'icon-play'
                },
                {
                    label: "Ranking",
                    value: "ranking",
                    link: "/ranking",
                    icon: 'icon-chart'
                },
                {
                    label: "Contato",
                    value: "contato",
                    link: "/contato",
                    icon: 'icon-talk-ballon'
                },
            ],
            userData: {},
            medalsData: {},
            userDataLinks: [
                {
                    label: "Minha Conta",
                    value: "conta",
                    link: '/conta',
                    icon: 'icon-info'
                },
                {
                    label: "Minhas Notificações",
                    value: "notificacoes",
                    link: '/notificacoes',
                    icon: ''
                },
                {
                    label: "Histórico",
                    value: "historico",
                    link: '/historico',
                    icon: 'icon-grid'
                },
                {
                    label: "Sair",
                    value: "sair",
                    link: '',
                    icon: 'icon-door'
                },
            ],
            menuMobileIsOpen: false,
            modalUserDataIsOpen: false
        })

        const userStore = useUserStore()

        onBeforeMount(() => {
            window.addEventListener("click", clickOutside);

            getUserGlobalData()
        })

        onBeforeUnmount(() => {
            window.removeEventListener("click", clickOutside);
        })

        function getUserGlobalData() {
            state.userData = userStore.user
            state.medalsData = userStore.medals
        }

        const formatedNotifications = computed(() => {
            if(state.userData.notificacoes > 99){
                return "99+"
            } else {
                return state.userData.notificacoes
            }
        })

        function formatMedalsAmount(amount) {
            return amount > 999 ? "999+" : amount
        }

        function clickOutside(event) {
            if (event.target.id !== 'header-links-mobile') {
                closeMenuMobile()
            }

            if (event.target.id !== 'header-user-modal' &&
                !event.target.closest('#header-user-modal')) {
                closeModalUserData()
            }
        }

        function toogleMenu() {
            state.menuMobileIsOpen = !state.menuMobileIsOpen;
            state.userDataIsOpen = false
        }

        function closeMenuMobile() {
            state.menuMobileIsOpen = false;
        }

        function toogleModalUserData() {
            state.userDataIsOpen = !state.userDataIsOpen;
            state.menuMobileIsOpen = false;
        }

        function closeModalUserData() {
            state.userDataIsOpen = false;
        }

        function handleClickUserModalLinks(linkValue) {
            closeModalUserData()
            if (linkValue === 'sair') {
                logout()
            }
        }

        function logout() {
            userStore.clear()
            window.location.href = '/login';
        }

        return {
            state,
            toogleMenu,
            toogleModalUserData,
            closeModalUserData,
            handleClickUserModalLinks,
            formatMedalsAmount,
            formatedNotifications
        }
    }
};
</script>
  
<style scoped>
/*CURVAR NOS CANTOS DO HEADER*/
.__header-bg::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    bottom: -24px;
    left: 0;
    width: 180px;
    height: 25px;
    background-image: url('/images/header-curve.svg');
}

.__header-bg::after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    bottom: -24px;
    right: 0;
    width: 180px;
    height: 25px;
    transform: scaleX(-1);
    background-image: url('/images/header-curve.svg');
}

/*MENU HAMBURGER*/
.menu__hamburger>div {
    transition: 200ms ease-in-out;
}

.menu__hamburger.hamburgerIsActive :first-child {
    transform: rotate(-225deg);
    position: relative;
    top: 10px;
}

.menu__hamburger.hamburgerIsActive :nth-child(2) {
    opacity: 0;
}

.menu__hamburger.hamburgerIsActive :last-child {
    transform: rotate(45deg);
    position: relative;
    top: -10px;
}</style>