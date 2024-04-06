<template>
  <v-container>
    <v-card>
      <v-card-title>Connexion héro</v-card-title>

      <v-card-text>
        <v-text-field v-model="username" label="Identifiant"></v-text-field>
      </v-card-text>

      <v-card-text>
        <v-text-field v-model="password" label="Mot de passe"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" @click="checkInput">Se connecter</v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>

import {mapActions} from 'vuex';

export default {
  name: 'HeroLoginView',

  data() {
    return {
      username: '',
      password: '',
      loading: false
    };
  },

  methods: {
    ...mapActions(['loginUser', 'setShowErrorDialogue', 'setErrorTitle', 'setErrorDescr']),

    async checkInput() {
      this.loading = true;
      await this.loginUser({username: this.username, password: this.password});
      this.loading = false;
      if (this.$store.state.user.authUser) {
        await this.$router.push('/hero/current');
      }
    }

  }
}
</script>