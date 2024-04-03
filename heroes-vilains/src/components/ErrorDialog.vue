<template>
  <v-dialog
      :value="this.$store.state.error.showErrorDialogue"
      persistent
      :max-width="500"
      :retain-focus="false"
  >
    <v-card>
      <v-card-title class="headline">
        {{ this.$store.state.error.errorTitle }}
      </v-card-title>
      <v-card-text>
        {{ this.$store.state.error.errorDescr }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="warning"
            @click="close"
        >
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: 'ErrorDialog',

  computed: {
    ...mapState(['showErrorDialogue', 'errorTitle', 'errorDescr'])
  },

  methods: {
    ...mapActions(['setShowErrorDialogue']),

    close() {
      this.setShowErrorDialogue(false);
    }
  }
};
</script>