<template>
  <v-container>

    <h1>Héro actuel :</h1>

    <v-card>
      <v-card-title>
        <u>Alias : </u> {{ currentHero['publicName'] }}
      </v-card-title>
      <v-card-text>
        <u>Nom réel : </u> {{ currentHero['realName'] }}
      </v-card-text>
      <v-card-text>Pouvoirs :</v-card-text>
      <v-row>
        <v-col
            v-for="(power, index) in currentHero['powers']"
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
    </v-card>


  </v-container>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'CurrentHeroView',

  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapState(['currentHero'])
  },

  methods: {
    calculateColor(level) {
      const hue = ((100 - level) * 1.2).toFixed(0);
      return `hsl(${hue}, 100%, 50%)`;
    }
  }
}
</script>