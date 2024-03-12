<template>
  <v-container>

    <EventDialog
        :show="this.showDialogue"
        :width="'1000px'"
        :title="this.errorDialog ? 'Erreur' : 'Ajouter une équipe'"
        :show-button-o-k="true"
        :show-button-fermer="true"
        @closeDialog="closeDialogue">
      <div v-if="this.errorDialog">
        <v-card-text
            v-if="this.errorText !== null"
            class="warning">
          {{ this.errorText }}
        </v-card-text>
      </div>
      <div v-else>
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
    </EventDialog>

    <h1>CurrentOrga : {{ currentOrganisation }}</h1>

    <div>
      <v-row>
        <v-col
            v-for="(team, index) in currentOrganisation.teams"
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


    <v-container>
      <v-card
          class="text-center green d-flex justify-center"
          @click="addTeam()">
        <v-card-title>
          Ajouter une équipe
        </v-card-title>
      </v-card>
    </v-container>

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
      errorDialog: false,
      errorText: ''
    };
  },

  computed: {
    ...mapState(['currentOrganisation', 'listTeam'])
  },

  methods: {
    ...mapActions(['getAllTeam', 'addTeamByID']),

    async addTeam() {
      this.showDialogue = true;
      this.errorDialog = false;
      await this.getAllTeam();
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

    teamIsInOrganisation(id_team) {
      for (let i = 0; i < this.currentOrganisation['teams'].length; i++) {
        if (id_team === this.currentOrganisation['teams'][i]['_id']) {
          return true;
        }
      }
      return false;
    }
  }
}
</script>