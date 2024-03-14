<template>
  <v-row v-if="powers.length !== 0">
    <v-col
        v-for="(power, index) in powers"
        :key="index"
        cols="4">
      <v-card
          :style="{ backgroundColor: calculateColor(power['level']) }"
          class="text-center d-flex justify-center">
        <v-card-text>
          <b>Nom :</b> {{ power['name'] }}<br>
          <b>Type :</b> {{ power['type'] }}<br>
          <b>Niveau :</b> {{ power['level'] }}<br>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-card-text v-else>Ce héros ne possède pas de pouvoir pour le moment !</v-card-text>
</template>

<script>
export default {
  name: 'ListPower',

  props: {
    powers: Array
  },

  methods: {
    calculateColor(level) {
      const hue = ((100 - level) * 1.2).toFixed(0);
      return `hsl(${hue}, 100%, 50%)`;
    }
  }
};
</script>