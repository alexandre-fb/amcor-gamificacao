<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="Math.round(size * 1.09)" viewBox="0 0 22 24" fill="none">
        <path
            d="M6.56081 16.335L16.142 24L16.1827 16.335H18.9071C20.6123 16.335 22 14.9615 22 13.2721V3.06298C22 1.37424 20.6123 0 18.9071 0H3.09294C1.38768 0 0 1.37492 0 3.06298V13.2721C0 14.9615 1.38768 16.335 3.09294 16.335H6.56081Z"
            :fill="color" />
    </svg>
</template>

<script>
export default {
    name: 'IconTalkBallon',
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