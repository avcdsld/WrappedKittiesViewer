<template>
  <div>
    <AppHeader></AppHeader>
    <nuxt/>
    <AppFooter></AppFooter>
  </div>
</template>
 
<script>
    import AppHeader from '@/components/AppHeader.vue';
    import AppFooter from '@/components/AppFooter.vue';
 
    export default {
        components: {
            AppHeader,
            AppFooter,
        },
    };
</script>
