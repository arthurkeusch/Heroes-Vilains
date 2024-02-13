<template>
  <v-container>

    <EventDialog
        :show="this.showDialogue"
        :width="'500px'"
        title='Crée une équipe'
        :show-button-o-k="true"
        :show-button-fermer="true"
        @closeDialog="closeDialogue">
      <div>
        <v-text-field
            v-model="teamName"
            label="Nom"/>
      </div>
    </EventDialog>

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
import EventDialog from "@/components/EventDialog.vue";
import {createTeam} from "@/services/team.service";

export default {
  name: 'ListTeamView',
  components: {EventDialog},

  data() {
    return {
      showDialogue: false,
      teamName: null
    };
  },

  async mounted() {
    await this.getAllTeam();
  },

  computed: {
    ...mapState(['listTeam'])
  },

  methods: {
    ...mapActions(['getAllTeam', 'updateCurrentTeam', 'createTeam']),

    async createTeam() {
      this.showDialogue = true;
    },

    async goToTeam(team) {
      await this.updateCurrentTeam(team);
      await this.$router.push('/team/current');
    },

    async closeDialogue(button) {
      if (button) {
        await createTeam(this.teamName);
        await this.getAllTeam();
      }
      this.showDialogue = false;
      this.teamName = null;
    }
  }
}
</script>