<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 22 22" fill="none">
        <rect :width="size" :height="size" rx="10" :fill="bgColor"/>
        <path d="M13.7152 5.28425C13.3354 4.90606 12.7186 4.90444 12.3372 5.28425L7.28484 10.3171C6.90505 10.6953 6.90505 11.3095 7.28484 11.6877L12.3389 16.7206C12.7219 17.0971 13.3386 17.0923 13.7168 16.7109C14.0901 16.3343 14.0901 15.7282 13.7168 15.35L9.34929 11.0024L13.7152 6.6548C14.0949 6.27661 14.0949 5.66245 13.7152 5.28425Z" :fill="arrowColor"/>
      </svg>
</template>

<script>
export default {
    name: 'IconArrowBack',
    props: {
        arrowColor: {
            type: String,
            default: '#fff',
        },
        bgColor: {
            type: String,
            default: '#00A1DE'
        },
        size: {
            type: Number,
            default: 22
        }
    }

}
</script>

<style>

</style>