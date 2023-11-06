<template>
    <div class="flex h-auto justify-center items-center gap-[18px]">
        <div class="h-[75px] min-w-[75px] rounded-full border-[2px] bg-white border-white" :class="formatedMedalClass" v-if="medal !== ''"></div>
        <div class="h-full min-h-[78px] w-[1px] bg-amcor-light-blue" v-if="medal !== ''"></div>
        <div 
        :class="formatedMedalClass !== '' ? 'max-w-[208px] text-13 font-bold' : 'font-bold text-xl' ">
            <h2>{{ medalMessage }}</h2>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'MedalhaDetalheCenario',
    components: {
    },
    props: {
        medal: {
            type: String,
            default: '',
        },
        message: {
            type: String,
            default: ''
        }
    },
    
    setup(props) {
        const medalMessages = {
            ouro: 'Parabéns! Você ganhou a medalha de ouro (5 pontos)!',
            prata: 'Muito bem! Você ganhou a medalha de prata (3 pontos) jogue novamente e tente o ouro.',
            bronze: 'Você ganhou a medalha de bronze (1 ponto) nesse cenário, jogue novamente e tente o ouro.',
        };

        const formatedMedalClass = computed(() => {
            switch (props.medal) {
                case 'ouro':
                    return '__gold-medal';
                case 'prata':
                    return '__silver-medal';
                case 'bronze':
                    return '__bronze-medal';
                default:
                    return '';
            }
        });

        const medalMessage = computed(() => medalMessages[props.medal] || 'Não ganhou medalhas...');

        return {
            formatedMedalClass,
            medalMessage
        }
    }
}
</script>


<style scoped>
    .__gold-medal {
        background-image: url(../../../../public/images/medals/gold-medal-modal.webp);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
       /* background:  linear-gradient(180deg, #C7982E 0%, #FFF1A3 100%);*/

    }

    .__silver-medal {
        background-image: url(../../../../public/images/medals/silver-medal-modal.webp);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .__bronze-medal {
        background-image: url(../../../../public/images/medals/bronze-medal-modal.webp);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
    }
</style>>


