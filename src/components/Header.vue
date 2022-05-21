<template>
  <q-header class="bg-accent">
      <q-toolbar class="toolbar-container">
        <q-icon
          name="img:icons/logo.svg"
          size="50px"
          class="q-pl-md"
        />

        <div class="row q-px-lg toolbar-card-container">
          <CompanyCard />

          <q-icon
            name="img:icons/bell.svg"
            size="32px"
          />
        </div>

        <q-separator vertical dark/>

        <div class="q-px-lg text-weight-bold">Olá, Luis</div>

        <q-icon
          name="img:icons/user.svg"
          size="54px"
          class="q-mr-lg"
        />
      </q-toolbar>
    </q-header>
</template>

<script>
import CompanyCard from 'src/components/CompanyCard.vue';

export default {
  name: 'Header',
  components: {
    CompanyCard,
  },
};
</script>

<style lang="scss">
.toolbar-container {
  min-height: 80px;
  max-height: 80px;
}

.toolbar-card-container {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.68rem;
  margin-bottom: 0.68rem
}
</style>
