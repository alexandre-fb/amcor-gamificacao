<template>
    <div class="w-[310px] h-[310px] rounded-[20px] relative p-5 !bg-cover !bg-center hover:scale-[1.01] transition-transform duration-200 ease-in-out" :style="'background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #00395A 100%), url(' + (backgroundImage === '' ? 'https://companieslogo.com/img/orig/AMCR-940a87a6.png?t=1592725424' : backgroundImage) + ')'">
        <div class="absolute right-5 w-5 h-5">
            <div class="rounded-full h-5 w-5 border-[3px] border-white" :class="formatedMedalClass"></div>
        </div>

        <div class="absolute py-5 px-2 bottom-0 max-w-[90%] max-h-[155px]">
            <div class="h-[22px] w-fit bg-amcor-dark-blue items-center flex px-[7px] rounded-[10px] max-w-[220px]">
                <h2 class="__max-lines-title font-bold text-xs">{{category}}</h2>
            </div>
            <div class="mb-2.5">
                <h3 class="font-bold text-lg __max-lines-title">{{title}}</h3>
                <div class="font-normal text-[13px] __max-lines" v-html="description"></div>
            </div>
            <div class="flex cursor-pointer items-center gap-1.5 w-fit">
                <IconPlay 
                    :size="16"
                    color="#00A1DE"    
                />
                <button class="font-bold text-xs"> 
                    Jogar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import IconPlay from '../Icons/IconPlay.vue';

export default {
    name: 'CardCenario',
    components: {
        IconPlay,
    },
    props: {
        backgroundImage: {
            type: String,
            default: 'https://companieslogo.com/img/orig/AMCR-940a87a6.png?t=1592725424',
        },
        category: {
            type: String,
            default: 'Categoria',
        },
        title: {
            type: String,
            default: 'Título',
        },
        description: {
            type: String,
            default: 'Descrição',
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


