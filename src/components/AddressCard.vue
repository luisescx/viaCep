<template>
  <q-card class="row col-md-7 col-12 bg-white q-pa-lg address-container">
    <q-icon
      name="img:icons/place.svg"
      size="md"
      class="q-mr-lg"
    />

    <q-card-section class="q-pa-none">
        <div class="text-h6 text-weight-bold text-gray4">{{location.address}}</div>
        <div class="text-subtitle1 text-weight-regular text-dark">{{location.city}}</div>
    </q-card-section>

    <div class="row items-center right-container ">
      <span class="text-subtitle1 text-weight-regular text-primary">{{location.zipCode}}</span>

      <q-separator vertical color="gray1" class="q-ml-md"/>

      <q-btn
        flat
        icon="delete"
        size="md"
        rounded
        color="secondary"
        @click="deleteLocation"
      />
    </div>

  </q-card>
</template>

<script>
export default {
  name: 'AddressCard',
  props: {
    location: Object,
  },
  methods: {
    deleteLocation() {
      this.$emit('deleteLocation', this.location.zipCode);
    },
  },
};
</script>

<style lang="scss">
  .address-container {
    align-items: center;
  }

  .right-container {
    position: absolute;
    right: 1.5rem;
  }
</style>
