<template>
  <q-drawer
      show-if-above
      content-class="bg-white2"
      bordered
      :width="96"
    >
      <q-list class="q-pt-lg">
        <q-item class="justify-center q-pt-md">
          <q-icon
            name="img:icons/search.svg"
            size="lg"

          />
        </q-item>

        <q-item class="justify-center q-pt-xl">
          <q-icon
            name="img:icons/folder2.svg"
            size="lg"
            class="centered-icon"
          />
        </q-item>
      </q-list>

      <div class="filter-button">
        <q-btn unelevated color="dark" padding="18">
          <q-icon
            name="img:icons/filter.svg"
            size="40" />
        </q-btn>
      </div>
    </q-drawer>
</template>

<script>
export default {
  name: 'Drawer',
};
</script>

<style lang="scss" scoped>
  .filter-button {
    position: absolute;
    bottom: 21px;
    left: 1rem;
  }
</style>
