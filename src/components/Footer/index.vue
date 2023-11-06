<template>
    <div class="__footer-container relative flex flex-col items-center justify-center px-4  pt-2 pb-5 sm:pb-2 w-full min-h-[78px] h-fit bg-white">

        <div class="relative flex items-center justify-between h-full w-full max-w-container">

            <!-- redes sociais -->
            <div class="relative flex items-center gap-5 bottom-2 sm:bottom-0">
                <template v-for="(socialLinkData, index) in state.socialLinksData" :key="index">
                    <a :href="socialLinkData.link" :alt="socialLinkData.name" target="_blank"
                        class="relative block hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
                        :class="socialLinkData.name === 'Youtube' ? 'top-[2px]' : ''">
                        <component :is="socialLinkData.iconName" :size="socialLinkData.size" />
                    </a>
                </template>
            </div>

            <!-- politica -->
            <div class="absolute -bottom-5 sm:bottom-0 left-1/2 -translate-x-1/2">
                <router-link to="/politica-privacidade">
                    <span class="text text-amcor-dark-blue text-[10px]">política de privacidade</span>
                </router-link>
            </div>

            <!-- logo -->
            <a href="https://www.amcor.com/afla/pt" target="_blank" class="relative bottom-2 sm:bottom-0 block cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                <img src="/images/logo-amcor.webp" class="w-[130px] h-auto " loading="lazy">
            </a>
        </div>

        <!-- <div class="bg-white pt-5 pb-2 text-[12px] text-center text-gray-400">
            Desenvolvido por <a>PlanMkt</a>
        </div> -->
    </div>
</template>

<script>
import { reactive } from 'vue';
import IconFacebook from '../Icons/IconFacebook.vue';
import IconLinkedin from '../Icons/IconLinkedin.vue';
import IconYoutube from '../Icons/IconYoutube.vue';

export default {
    name: 'Footer',
    components: {
        IconFacebook,
        IconLinkedin,
        IconYoutube
    },
    setup() {
        const state = reactive({
            socialLinksData: [
                {
                    name: 'Facebook',
                    link: 'https://www.facebook.com/amcorlimited/',
                    iconName: 'icon-facebook',
                    size: 16
                },
                {
                    name: 'Linkedin',
                    link: 'https://www.linkedin.com/company/amcor',
                    iconName: 'icon-linkedin',
                    size: 20
                },
                {
                    name: 'Youtube',
                    link: 'https://www.youtube.com/user/AmcorPackaging',
                    iconName: 'icon-youtube',
                    size: 20
                },
            ]
        })

        return {
            state
        }
    }
}
</script>

<style scoped>
.__footer-container::after {
    content: '';
    display: block;
    position: absolute;
    bottom: calc(100% - 1px);
    width: 360px;
    height: 67px;
    right: 0;
    background-image: url('/images/footer-curve.svg');
}
</style>

