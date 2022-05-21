<template>
  <q-layout view="hHh lpR fFf">
    <Header />

    <Drawer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from 'src/components/Header.vue';
import Drawer from 'src/components/Drawer.vue';

export default {
  name: 'MainLayout',
  components: {
    Header,
    Drawer,
  },
};
</script>
