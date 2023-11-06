<template>
    <div class="flex flex-col w-full gap-4 align-baseline justify-center">
        <div class="flex flex-col pt-[17px] pb-4 border-b-2 border-amcor-light-blue">
            <div class="flex gap-[2px]">
                <h3 class="font-normal text-13">{{ date }}</h3> 
                <h3 class="font-normal text-13"> - </h3>
                <h3 class="font-normal text-13">{{ hour }}</h3> 
            </div>

            <div class="flex gap-[5px] items-start ">
                <h2 class="__max-lines-message font-bold text-13 h-4">{{ message }}</h2>
            </div>
        </div>   
    </div>
</template>

<script>
export default {
    name: 'NotificationItem',
    props: {
        date: {
            type: String,
            default: '00/00/00'
        },
        hour: {
            type : String,
            default:'00:00'
        },
        message: {
            type: String,
            default: 'Mensagem'
        }
    },
}

</script>

<style>
    .__max-lines-message {
        display: -webkit-box;
        -webkit-line-clamp: 1; 
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

</style>