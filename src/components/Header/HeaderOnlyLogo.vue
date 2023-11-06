<template>
    <div class="__header-bg relative z-50 flex justify-center w-full px-3 h-[90px] bg-white">
        <nav class="relative flex items-center justify-center w-full max-w-container">
            <!-- LOGO -->
            <router-link to="/">
                <img src="/images/logo-ehsplay.webp" alt="EHS play" class="w-[294px] h-auto">
            </router-link>
        </nav>
    </div>
</template>
  
<script>

export default {
    name: 'HeaderOnlyLogo',
};
</script>
  