<template>
  <v-container>

    <EventDialog
        :show="this.showDialogue"
        :width="'500px'"
        title="Crée une organisation"
        :show-button-o-k="this.showButtonOK"
        :show-button-fermer="this.showButtonFermer"
        @closeDialog="closeDialogue">
      <div>
        <v-text-field
            v-model="orgName"
            label="Nom"/>
        <v-text-field
            v-model="orgPass"
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
          @click="createOrg()">
        <v-card-title>
          Crée une organisation
        </v-card-title>
      </v-card>
    </v-container>

    <v-row>
      <v-col
          v-for="(organisation, index) in listOrganisations"
          :key="index"
          cols="3">
        <v-card
            class="text-center light-blue d-flex justify-center"
            @click="goToOrganisation(organisation._id)">
          <v-card-title>
            {{ organisation.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import EventDialog from "@/components/EventDialog.vue";

export default {
  name: 'OrgaView',

  components: {
    EventDialog
  },

  data() {
    return {
      showDialogue: false,
      orgName: null,
      orgPass: null,
      errorText: null,
      showButtonOK: null,
      showButtonFermer: null
    };
  },

  async mounted() {
    await this.getAllOrganisations();
  },

  computed: {
    ...mapState(['listOrganisations'])
  },

  methods: {
    ...mapActions(['getAllOrganisations', 'createOrganisation', 'getOrganisationByIDFromStore', 'setShowErrorDialogue', 'setErrorDescr', 'setErrorTitle']),

    async goToOrganisation(id) {
      let answer = await this.getOrganisationByIDFromStore(id);
      if (answer.error === 1) {
        this.setShowErrorDialogue(true);
        this.setErrorTitle("Acces à l'organisation impossible");
        this.setErrorDescr(answer.data.data);
      } else {
        await this.$router.push({name: 'currentOrga', params: {infoOrg: answer.data}});
      }
    },

    createOrg() {
      this.showDialogue = true;
      this.showButtonOK = true;
      this.showButtonFermer = true;
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