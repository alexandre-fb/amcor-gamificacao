<template>
    <div class="w-[310px] h-[310px] rounded-[20px] relative p-5 !bg-cover !bg-center hover:scale-[1.02] transition-transform duration-200 ease-in-out" :style="'background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #00395A 100%), url(' + (backgroundImage === '' ? 'https://companieslogo.com/img/orig/AMCR-940a87a6.png?t=1592725424' : backgroundImage) + ')'">
        <div class="absolute right-5 w-5 h-5">
            <div class="rounded-full h-5 w-5 border-[3px] border-white" :class="formatedMedalClass"></div>
        </div>

        <div class="absolute py-5 px-2 bottom-0 max-w-[90%] max-h-[155px]">
        
            <div class="mb-2.5">
                <p class="font-normal text-13 __max-lines">Última vez que jogou: {{dataJogo}}</p>
                <h3 class="font-bold text-lg __max-lines-title">{{description}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'CardDetalheCenario',
    components: {
 
    },
    props: {
        backgroundImage: {
            type: String,
            default: 'https://companieslogo.com/img/orig/AMCR-940a87a6.png?t=1592725424',
        },
        dataJogo: {
            type: String,
            default: 'Título',
        },
        description: {
            type: String,
            default: 'Jogo',
        },
        medal: {
            type: String,
            default: 'transparent',
        }
    },
    
    setup(props) {
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

        return {
            formatedMedalClass
        }
    }
}
</script>


<style scoped>
    .__max-lines-title {
        display: -webkit-box;
        -webkit-line-clamp: 1; 
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .__max-lines {
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .__gold-medal {
        background:  linear-gradient(180deg, #C7982E 0%, #FFF1A3 100%);
    }

    .__silver-medal {
        background: linear-gradient(180deg, #E5E5E6 0%, #8D8E90 100%);
    }

    .__bronze-medal {
        background: linear-gradient(180deg, #F39B73 0%, #642D19 100%);
    }
</style>>


