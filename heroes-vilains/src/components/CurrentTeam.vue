<template>
  <div v-if="$store.state.currentTeam != null">
      <h1>Bienvenue sur l'équipe : {{ $store.state.currentTeam.name }}</h1>
      <EventDialog
              :show="this.showDialogue"
              :width="'500px'"
              :title="this.errorDialog ? 'Erreur' : 'Ajouter un membre'"
              :show-button-o-k="this.showButtonOK"
              :show-button-fermer="this.showButtonFermer"
              @closeDialog="closeDialogue">
          <div v-if="this.errorDialog">
              <v-card-text
                      v-if="this.errorText !== null"
                      class="warning">
                  {{ this.errorText }}
              </v-card-text>
          </div>
          <div v-else>
              <v-text-field
                      v-model="$store.state.currentTeam.name"
                      label="Nom"/>
              <v-text-field
                      v-model="$store.state.currentTeam.password"
                      label="Mot de passe"
                      type="password"/>
              <v-card-text
                      v-if="this.errorText !== null"
                      class="warning">
                  {{ this.errorText }}
              </v-card-text>
          </div>
      </EventDialog>
      <v-container>
          <v-card
                  class="text-center green d-flex justify-center"
                  @click="addMembre()">
              <v-card-title>
                  Ajouter un membre à l'équipe
              </v-card-title>
          </v-card>
      </v-container>

  </div>
  <div v-else>
      <h1>choisissez d'abord une equipe !</h1>

  </div>


</template>
<script>
import {mapActions, mapState} from 'vuex';
import EventDialog from "@/components/EventDialog.vue";

export default {
    name: 'CurrentTeamView',

    components: {
        EventDialog
    },

    data() {
        return {
            showDialogue: false,
            errorText: null,
            errorDialog: false,
            showButtonOK: null,
            showButtonFermer: null
        };
    },

    computed: {
        ...mapState(['listOrganisations'])
    },

    methods: {
        ...mapActions(['getAllOrganisations', 'createOrganisation', 'getOrganisationByID']),

        addMembre() {
            this.showDialogue = true;
            this.showButtonOK = true;
            this.showButtonFermer = true;
            this.errorDialog = false;
        },

        async closeDialogue(button) {
            if (button) {
                let response = await this.createOrganisation({name: this.orgName, password: this.orgPass});
                if (response.data !== undefined && response.data.error !== 0) {
                    this.errorText = response.data;
                } else {
                    await this.getAllOrganisations();
                    this.showDialogue = false;
                }
            } else {
                this.orgPass = null;
                this.orgName = null;
                this.errorText = null;
                this.showDialogue = false;
                this.showButtonOK = null;
                this.showButtonFermer = null;
            }
        }
    }
}
</script>