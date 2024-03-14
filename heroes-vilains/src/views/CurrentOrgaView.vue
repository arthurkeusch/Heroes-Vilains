<template>
  <v-container>

    <EventDialog
        :show="this.showDialogue"
        :width="'1000px'"
        :title="this.errorDialog ? 'Erreur' : 'Ajouter/Supprimer une équipe'"
        :show-button-o-k="false"
        :show-button-fermer="true"
        @closeDialog="closeDialogue">
      <div v-if="this.errorDialog">
        <v-card-text
            v-if="this.errorText !== null"
            class="warning">
          {{ this.errorText }}
        </v-card-text>
      </div>

      <div v-else-if="this.showDialogueAjouter">
        <v-row>
          <v-col
              v-for="(team, index) in listTeam"
              :key="index"
              cols="3">
            <v-card
                class="text-center light-blue d-flex justify-center"
                @click="addTeamByIDFromStore(team)">
              <v-card-title>
                {{ team.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div v-else-if="this.showDialogueSupprimer">
        <v-row>
          <v-col
              v-for="(team, index) in currentOrganisation.teams"
              :key="index"
              cols="3">
            <v-card
                class="text-center light-blue d-flex justify-center"
                @click="removeTeamByIDFromStore(team)">
              <v-card-title>
                {{ team.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </EventDialog>

    <h1>Organisation actuelle : {{ currentOrganisation.name }}</h1>

    <h2>Liste des équipes :</h2>
    <div>
      <v-row>
        <v-col
            v-for="(team, index) in currentOrganisation.teams"
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
    </div>

    <br>
    <hr>
    <div style="display: flex">
      <v-container>
        <v-card
            class="text-center green d-flex justify-center"
            @click="addTeam()">
          <v-card-title>
            Ajouter une équipe
          </v-card-title>
        </v-card>
      </v-container>
      <v-container>
        <v-card
            class="text-center red d-flex justify-center"
            @click="removeTeam()">
          <v-card-title>
            Supprimer une équipe
          </v-card-title>
        </v-card>
      </v-container>
    </div>

  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import EventDialog from "@/components/EventDialog.vue";

export default {
  name: 'CurrentOrgaView',

  components: {
    EventDialog
  },

  data() {
    return {
      showDialogue: false,
      showDialogueAjouter: false,
      showDialogueSupprimer: false,
      errorDialog: false,
      errorText: ''
    };
  },

  computed: {
    ...mapState(['currentOrganisation', 'listTeam'])
  },

  methods: {
    ...mapActions(['getAllTeam', 'addTeamByID', 'updateCurrentTeam']),

    async addTeam() {
      this.showDialogue = true;
      this.showDialogueAjouter = true;
      this.showDialogueSupprimer = false;
      this.errorDialog = false;
      await this.getAllTeam();
    },

    async removeTeam() {
      this.showDialogue = true;
      this.showDialogueAjouter = false;
      this.showDialogueSupprimer = true;
      this.errorDialog = false;
    },

    closeDialogue() {
      this.showDialogue = false;
    },

    addTeamByIDFromStore(team) {
      if (this.teamIsInOrganisation(team['_id'])) {
        this.errorDialog = true;
        this.errorText = "Cette équipe est déjà dans l'organisation !";
      } else {
        this.addTeamByID(team['_id']);
        this.showDialogue = false;
      }
    },

    removeTeamByIDFromStore(team) {
      if (this.teamIsInOrganisation(team['_id'])) {
        this.errorDialog = true;
        this.errorText = "Vous ne pouvez pas supprimer cette équipe!";
      } else {
        this.removeTeamByID(team['id']);
        this.showDialogue = false;
      }
    },

    teamIsInOrganisation(id_team) {
      for (let i = 0; i < this.currentOrganisation['teams'].length; i++) {
        if (id_team === this.currentOrganisation['teams'][i]['_id']) {
          return true;
        }
      }
      return false;
    },

    async goToTeam(team) {
      this.updateCurrentTeam(team);
      await this.$router.push({name: 'currentTeam'});
    }
  }
}
</script>