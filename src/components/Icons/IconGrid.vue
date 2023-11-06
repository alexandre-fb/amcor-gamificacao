<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="Math.round(size / 1.58)" viewBox="0 0 27 17" fill="none">
        <path
            d="M0 4C0 1.79086 1.79086 0 4 0H9C11.2091 0 13 1.79086 13 4C13 6.20914 11.2091 8 9 8H4C1.79086 8 0 6.20914 0 4Z"
            :fill="color" />
        <path
            d="M14 4C14 1.79086 15.7909 0 18 0H23C25.2091 0 27 1.79086 27 4C27 6.20914 25.2091 8 23 8H18C15.7909 8 14 6.20914 14 4Z"
            :fill="color" />
        <path
            d="M0 13C0 10.7909 1.79086 9 4 9H9C11.2091 9 13 10.7909 13 13C13 15.2091 11.2091 17 9 17H4C1.79086 17 0 15.2091 0 13Z"
            :fill="color" />
        <path
            d="M14 13C14 10.7909 15.7909 9 18 9H23C25.2091 9 27 10.7909 27 13C27 15.2091 25.2091 17 23 17H18C15.7909 17 14 15.2091 14 13Z"
            :fill="color" />
    </svg>
</template>

<script>
export default {
    name: 'IconGrid',
    props: {
        color: {
            type: String,
            default: '#00395A'
        },
        size: {
            type: Number,
            default: 27
        }
    }

}
</script>

<style></style>