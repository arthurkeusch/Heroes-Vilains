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
      <ListPower :powers="currentHero['powers']"/>
    </v-card>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import ListPower from "@/components/ListPowers.vue";

export default {
  name: 'CurrentHeroView',

  components: {
    ListPower
  },

  data() {
    return {

    };
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