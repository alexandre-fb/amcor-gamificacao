<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="Math.round(size / 1.37)" viewBox="0 0 22 16" fill="none">
        <path d="M0 8.53333H6.69565V16H0V8.53333Z" :fill="color" />
        <path d="M15.3043 5.33333H22V16H15.3043V5.33333Z" :fill="color" />
        <path d="M7.65217 0H14.3478V16H7.65217V0Z" :fill="color" />
    </svg>
</template>

<script>
export default {
    name: 'IconPlay',
    props: {
        color: {
            type: String,
            default: '#00395A'
        },
        size: {
            type: Number,
            default: 22
        }
    }

}
</script>

<style></style>