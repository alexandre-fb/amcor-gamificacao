<template>
    <div class="flex flex-col justify-between bg-black w-full min-h-screen overflow-x-hidden" >
        <header>
            <Header />
        </header>
        <main class="flex flex-col flex-1 py-8 bg-amcor-mobile md:bg-amcor-desk 2xl:bg-amcor-desk-lg bg-cover bg-no-repeat bg-right">
            <slot />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/Header/index.vue'
import Footer from '../components/Footer/index.vue'
export default {
    name: 'LayoutDefault',
    components: {
        Header,
        Footer
    },
    setup() {

    }

}
</script>

<style></style>