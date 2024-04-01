<template>
  <v-container>
    <EventDialog
        :show="this.showDialogue"
        :width="'1000px'"
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
        <v-row>
          <v-col
              v-for="(hero, index) in listInfosHeros"
              :key="index"
              cols="3">
            <v-card
                class="text-center light-blue d-flex justify-center"
                @click="addHeroFromStore(hero['_id'])">
              <v-card-title>
                {{ hero['publicName'] }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </EventDialog>


    <EventDialog
        :show="this.showDialogueCreer"
        :width="'1000px'"
        title="Créer un héro"
        :show-button-o-k="false"
        :show-button-fermer="true"
        @closeDialog="closeDialogueCreer">
      <div>
        <v-container>
          <v-card>
            <v-card-text>
              <v-card-text v-if="this.messageAlertName" class="warning">{{ this.messageAlertName }}</v-card-text>
              <v-text-field v-model="publicName" label="Nom public"></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field v-model="realName" label="Nom réel"></v-text-field>
            </v-card-text>

            <v-card>
              <v-card-title>Crée un pouvoir</v-card-title>
              <v-card-text>
                <v-card-text v-if="this.messageAlert" class="warning">{{ this.messageAlert }}</v-card-text>
                <v-text-field v-model="powerName" label="Nom du pouvoir"></v-text-field>
              </v-card-text>
              <v-card-text>
                <v-text-field v-model="powerType" label="Type du pouvoir (entre 1 et 7)"></v-text-field>
              </v-card-text>
              <v-card-text>
                <v-text-field v-model="powerLevel" label="Niveau du pouvoir (entre 0 et 100)"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="addPower">Ajouter le pouvoir</v-btn>
              </v-card-actions>
            </v-card>

            <v-card-title>Liste des pouvoirs : {{ this.powers.length }}</v-card-title>
            <ListPower :powers="this.powers"/>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-card-text v-if="this.messageAlertCreate" class="warning">{{ this.messageAlertCreate }}</v-card-text>
              <v-btn @click="createHeroFromStore">Crée le héro</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </div>
    </EventDialog>



    <EventDialog
        :show="this.showDialogueDelete"
        :width="'1000px'"
        title="Supprimer un héros de l'équipe"
        :show-button-o-k="false"
        :show-button-fermer="true"
        @closeDialog="closeDialogueDelete">
      <div>
        <v-row>
          <v-col
              v-for="(hero, index) in listHeroAlias"
              :key="index"
              cols="3">
            <v-card
                class="text-center light-blue d-flex justify-center"
                @click="deleteHeroFromStore(hero['_id'])">
              <v-card-title>
                {{ hero['publicName'] }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
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

    <br>

    <div style="display: flex">
      <v-container>
        <v-card
            class="text-center green d-flex justify-center"
            @click="addMembre()">
          <v-card-title>
            Ajouter un membre à l'équipe
          </v-card-title>
        </v-card>
      </v-container>
      <v-container>
        <v-card
            class="text-center green d-flex justify-center"
            @click="showDialogueCreerHero()">
          <v-card-title>
            Crée un héro
          </v-card-title>
        </v-card>
      </v-container>
      <v-container>
        <v-card
            class="text-center red d-flex justify-center"
            @click="showDialogueSupprimerHero()">
          <v-card-title>
            Supprimer un héro de l'équipe
          </v-card-title>
        </v-card>
      </v-container>
    </div>

  </v-container>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import EventDialog from "@/components/EventDialog.vue";
import ListPower from "@/components/ListPowers.vue";

export default {
  name: 'CurrentTeamView',

  components: {
    ListPower,
    EventDialog
  },

  data() {
    return {
      showDialogueCreer: false,
      showDialogue: false,
      errorText: null,
      errorDialog: false,
      showButtonOK: null,
      showButtonFermer: null,
      listInfosHeros: null,
      publicName: '',
      realName: '',
      powers: [],
      powerName: null,
      powerType: null,
      powerLevel: null,
      messageAlert: null,
      messageAlertName: null,
      messageAlertCreate: null,
      showDialogueDelete: false
    };
  },

  computed: {
    ...mapState(['listHeroAlias', 'currentTeam'])
  },

  async mounted() {
    console.log(this.currentTeam)
    if (this.currentTeam == null) {
      await this.$router.push('/organisation/current');
    }
    await this.getInfoHeroById();
  },

  methods: {
    ...mapActions(['createOrganisation', 'getInfoHeroById', 'setCurrentHero', 'getAllHeroAlias', 'createHeros', 'addHerosToTeam', 'deleteHero']),

    async addMembre() {
      this.showDialogue = true;
      this.showButtonOK = false;
      this.showButtonFermer = true;
      this.errorDialog = false;
      this.listInfosHeros = await this.getAllHeroAlias();
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
        this.showDialogueCreer = false;
        this.messageAlert = null;
      }
    },

    async goToMember(member) {
      await this.setCurrentHero(member);
      await this.$router.push("/hero/current");
    },

    async createHeroFromStore() {
      if (this.publicName === null || this.publicName === '') {
        this.messageAlertName = "Le nom public doit être renseigné !";
        return;
      }
      if (this.realName === null || this.realName === '') {
        this.messageAlertName = "Le nom réel doit être renseigné !";
        return;
      }
      let answer = await this.createHeros({publicName: this.publicName, realName: this.realName, powers: this.powers});
      console.log("ICI")
      console.log(answer['_id'])
      if (!answer['_id']) {
        this.messageAlertCreate = answer.data;
      } else {
        console.log("ICI")
        console.log(answer['_id'])
        await this.addHerosToTeam(answer['_id']);
        this.closeDialogueCreer();
      }
    },

    closeDialogueCreer() {
      this.messageAlert = null;
      this.messageAlertName = null;
      this.showDialogueCreer = false;
    },

    showDialogueCreerHero() {
      this.messageAlert = null;
      this.showDialogueCreer = true;
    },

    addPower() {
      this.messageAlert = null;
      if (this.powerName === null) {
        this.messageAlert = "Le nom du pouvoir ne peut pas être null !";
        return;
      }
      this.powerType = parseInt(this.powerType);
      if (!Number.isInteger(this.powerType) || this.powerType === null || isNaN(this.powerType)) {
        this.messageAlert = "Le type du pouvoir doit être un entier !";
        return;
      }
      this.powerType = parseInt(this.powerType);
      if (this.powerType < 1) {
        this.messageAlert = "Le type du pouvoir doit être supérieur ou égale à 1 !";
        return;
      }
      if (this.powerType > 7) {
        this.messageAlert = "Le type du pouvoir doit être inférieur ou égale à 7 !";
        return;
      }
      this.powerLevel = parseInt(this.powerLevel);
      if (!Number.isInteger(this.powerLevel) || this.powerLevel === null || isNaN(this.powerLevel)) {
        this.messageAlert = "Le niveau du pouvoir doit être un entier !";
        return;
      }
      if (this.powerLevel < 0) {
        this.messageAlert = "Le niveau du pouvoir doit être supérieur ou égale à 0 !";
        return;
      }
      if (this.powerLevel > 100) {
        this.messageAlert = "Le niveau du pouvoir doit être inférieur ou égale à 100 !";
        return;
      }
      this.messageAlert = null;
      this.powers.push({
        "name": this.powerName,
        "type": this.powerType,
        "level": this.powerLevel
      });
    },

    async addHeroFromStore(id) {
      await this.addHerosToTeam(id);
      this.showDialogue = false;
    },

    showDialogueSupprimerHero() {
      this.showDialogueDelete = true;
    },

    closeDialogueDelete() {
      this.showDialogueDelete = false;
    },

    async deleteHeroFromStore(id) {
      await this.deleteHero({idHero: id});
      this.closeDialogueDelete();
    }
  }
}
</script>