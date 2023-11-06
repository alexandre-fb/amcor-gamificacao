<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 17 17" fill="none">
        <path
            d="M2.89014 16.7611L16.0593 9.9521C17.3136 9.30929 17.3136 7.71416 16.0593 7.07135L2.89014 0.238516C1.60866 -0.428102 0 0.381363 0 1.69079V15.3327C0 16.6183 1.60866 17.4277 2.89014 16.7611Z"
            :fill="color" />
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
            default: 17
        }
    }
}
</script>

<style></style>