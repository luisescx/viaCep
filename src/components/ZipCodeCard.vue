<template>
  <div class="row address">
    <q-icon
      name="img:icons/place.svg"
      size="md"
      class="q-mr-lg"
    />

    <div>
      <p class="text text-weight-bold">
        <span class="text-dark">CEP </span>{{ zipCodeFormatted }}
      </p>
    </div>
  </div>
</template>

<script>
import { formatZipCode } from 'src/utils';

export default {
  name: 'ZipCodeCard',
  props: {
    zipCode: String,
  },
  data() {
    return {
      zipCodeFormatted: '',
    };
  },
  mounted() {
    this.zipCodeFormatted = formatZipCode(this.zipCode);
  },
};
</script>

<style lang="scss" scoped>
  .text {
    font-size: 1.25rem;
    color: #B7B7B7;
  }
</style>
