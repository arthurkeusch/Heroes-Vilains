<template>
  <v-container>
    <v-card>
      <v-card-title>Connexion</v-card-title>

      <v-card-text>
        <v-text-field v-model="phrase" label="Phrase secrète"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" @click="checkInput">Se connecter</v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>

import {mapActions, mapState} from 'vuex';

export default {
  name: 'LoginView',

  data() {
    return {
      phrase: '',
      loading: false,
    };
  },

  computed: {
    ...mapState(['auth'])
  },

  methods: {
    ...mapActions(['login']),

    async checkInput() {
      this.loading = true;
      await this.login({phrase: this.phrase});
      this.loading = false;
      if (this.auth) {
        await this.$router.push('/');
      } else {
        alert("Connection échouée !");
      }
    }

  }
}
</script>