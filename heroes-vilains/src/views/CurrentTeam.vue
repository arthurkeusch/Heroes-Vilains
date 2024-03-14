<template>
  <v-container>
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

    <h1>Bienvenue sur l'équipe : {{ $store.state.currentTeam.name }}</h1>

    <h2>Liste des membres :</h2>
    <div>
      <v-row>
        <v-col
            v-for="(member, index) in this.listHeroAlias"
            :key="index"
            cols="3">
          <v-card
              class="text-center light-blue d-flex justify-center"
              @click="goToMember(member)">
            <v-card-title>
              {{ member['publicName'] }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-container>
      <v-card
          class="text-center green d-flex justify-center"
          @click="addMembre()">
        <v-card-title>
          Ajouter un membre à l'équipe
        </v-card-title>
      </v-card>
    </v-container>

  </v-container>
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
      showButtonFermer: null,
      listInfosHeros: null
    };
  },

  computed: {
    ...mapState(['listHeroAlias', 'currentTeam'])
  },

  async mounted() {
    await this.getInfoHeroById();
  },

  methods: {
    ...mapActions(['createOrganisation', 'getInfoHeroById', 'setCurrentHero']),

    addMembre() {
      this.showDialogue = true;
      this.showButtonOK = false;
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
    },

    async goToMember(member) {
      await this.setCurrentHero(member);
      await this.$router.push("/hero/current");
    }
  }
}
</script>