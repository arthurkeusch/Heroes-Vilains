<template>
  <v-container>
    <h1>CurrentOrga : {{currentOrganisation}}</h1>
    <p>
      Il faut d'abord implémenter la créations des équipes pour pouvoir tester assignement d'une équipe à une organisation.
    </p>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'CurrentOrgaView',

  data() {
    return {

    };
  },

  computed: {
    ...mapState(['currentOrganisation'])
  },

  methods: {

  }
}
</script>