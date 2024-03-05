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

    <h1>CurrentOrga : {{currentOrganisation}}</h1>

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
      console.log(team['_id']);
      this.addTeamByID(team['_id'])
      this.showDialogue = false;
    }
  }
}
</script>