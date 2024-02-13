<template>
  <v-container>

    <v-container>
      <v-card
          class="text-center green d-flex justify-center"
          @click="createTeam()">
        <v-card-title>
          Crée une équipe
        </v-card-title>
      </v-card>
    </v-container>

    <v-row>
      <v-col
          v-for="(team, index) in listTeam"
          :key="index"
          cols="3">
        <v-card
            class="text-center light-blue d-flex justify-center"
            @click="goToTeam(team)">
          <v-card-title>
            {{ team.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'ListTeamView',

  data() {
    return {

    };
  },

  async mounted() {
    await this.getAllTeam();
  },

  computed: {
    ...mapState(['listTeam'])
  },

  methods: {
    ...mapActions(['getAllTeam', 'updateCurrentTeam']),

    async createTeam() {
      console.log("OK");
    },

    async goToTeam(team) {
      await this.updateCurrentTeam(team);
      await this.$router.push('/team/current');
    }
  }
}
</script>