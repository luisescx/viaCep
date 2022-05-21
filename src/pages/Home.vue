<template>
  <q-page class="bg-white" style="padding: 47px" >
    <div class="row q-mb-xl">
      <q-input
        ref="zipCodeInput"
        outlined
        label="Insira o CEP"
        class="col-md-3 col-12"
        mask="##.###-###"
        unmasked-value
        v-model="zipCode"
        lazy-rules
        :rules="[ val => val && val.length === 8 || 'CEP inválido']"
        hide-bottom-space
        @keyup.enter="addAddress"
        />

      <q-btn
        color="primary"
        class="col-md-3 offset-md-1 col-12 text-weight-bold"
        padding="md"
        @click="addAddress"
        >
          <q-icon
              name="img:icons/plus.svg"
              size="sm"
              class="q-mr-sm"
          />

          <div>Adicionar Endereço</div>
      </q-btn>
    </div>

    <div v-for="item in zipCodeList"
    :key="item"
    class="row q-mb-md"

    >
      <ZipCodeCard :zipCode="item" />
    </div>

    <div class="row q-my-xl">
      <q-btn color="primary"
        class="col-md-3 offset-md-4 col-12 q-ml-xl text-weight-bold"
        padding="md"
        label="Gerar endereços"
        :disable="!(zipCodeList.length > 0)"
        @click="handleGenerateAddress"
      />
    </div>

    <q-separator color="gray5" />

    <div
      v-for="item in locations"
      :key="item.cep"
      class="q-mt-xl row">
      <AddressCard
      :location="item"
      @deleteLocation="deleteLocation"
      />
    </div>
  </q-page>
</template>

<script>
import getLocationsList from 'src/useCases/getLocationsList';
import ZipCodeCard from 'src/components/ZipCodeCard';
import AddressCard from 'src/components/AddressCard';
import { addLocationsOnStorage, getLocationsStorage, removeLocationFromStorage } from 'src/services/storage';

export default {
  name: 'Home',
  components: {
    ZipCodeCard,
    AddressCard,
  },
  data() {
    return {
      zipCode: null,
      zipCodeList: [],
      locations: [],
    };
  },
  mounted() {
    this.locations = getLocationsStorage();
  },
  methods: {
    notification({ message, type }) {
      this.$q.notify({
        position: 'top',
        type,
        message,
        actions: [{ icon: 'close', color: 'white' }],
      });
    },
    validateZipCodeList(zipList, locations) {
      const validatedList = [];
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < zipList.length; index++) {
        const zipCode = zipList[index];

        const locationAlreadyAdded = locations.some((item) => item.zipCode.replace('-', '') === zipCode);
        if (!locationAlreadyAdded) {
          validatedList.push(zipCode);
        }
      }

      return validatedList;
    },
    addAddress() {
      this.$refs.zipCodeInput.validate();

      if (this.$refs.zipCodeInput.hasError) {
        return;
      }

      this.$refs.zipCodeInput.resetValidation();

      const locationAlreadyAdded = this.locations.some((item) => item.zipCode.replace('-', '') === this.zipCode);
      const zipAlreadyOnList = this.zipCodeList.some((item) => item === this.zipCode);

      if (locationAlreadyAdded || zipAlreadyOnList) {
        this.notification({ message: 'Endereço ja adicionado', type: 'negative' });
      } else {
        this.zipCodeList.push(this.zipCode);
        this.$refs.zipCodeInput.blur();
      }

      this.zipCode = null;
    },
    async handleGenerateAddress() {
      let isError = false;
      let message = 'Endereços adicionados com successo';

      try {
        this.$q.loading.show();

        const validatedZipCodeList = this.validateZipCodeList(this.zipCodeList, this.locations);

        if (validatedZipCodeList.length === 0) {
          message = 'Endereços já adicionados';
          isError = true;
          return;
        }

        const newLocations = await getLocationsList(validatedZipCodeList);

        if (newLocations.length === 0) {
          message = 'Um ou mais CEPs não eram válidos';
          isError = true;
          return;
        }

        addLocationsOnStorage(newLocations);
        this.locations = [...this.locations, ...newLocations];
      } catch {
        message = 'Não foi possível buscar os endereços.';
        isError = true;
      } finally {
        this.$q.loading.hide();
        this.zipCodeList = [];
        this.zipCode = null;

        if (isError) {
          this.notification({ message, type: 'negative' });
          // eslint-disable-next-line no-unsafe-finally
          return;
        }

        this.notification({ message, type: 'positive' });
      }
    },
    deleteLocation(locationZipCode) {
      const index = this.locations.findIndex((item) => item.zipCode === locationZipCode);

      if (index >= 0) {
        this.locations.splice(index, 1);
        removeLocationFromStorage(locationZipCode);
      }
    },
  },
};
</script>
