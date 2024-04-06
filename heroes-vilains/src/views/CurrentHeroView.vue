<template>
  <v-container>
    <EventDialog
        :show="this.showDialogue"
        :width="'1000px'"
        title="Modifier le héro"
        :show-button-o-k="false"
        :show-button-fermer="true"
        @closeDialog="closeDialogueUpdate">
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
                <v-spacer/>
                <v-btn @click="addPower">Ajouter le pouvoir</v-btn>
              </v-card-actions>
            </v-card>

            <v-card-title>Liste des pouvoirs : {{ this.powers.length }}</v-card-title>
            <ListPower :powers="this.powers"/>

            <v-card-actions>
              <v-spacer/>
              <v-card-text v-if="this.messageAlertCreate" class="warning">{{ this.messageAlertCreate }}</v-card-text>
              <v-btn @click="updateHeroFromStore">Modifier le héro</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </div>
    </EventDialog>


    <h1>Héro actuel :</h1>
    <v-card>
      <v-card-title>
        <u>Alias : </u> {{ currentHero['publicName'] }}
      </v-card-title>
      <v-card-text>
        <u>Nom réel : </u> {{ currentHero['realName'] }}
      </v-card-text>
      <v-card-text>Pouvoirs :</v-card-text>
      <ListPower :powers="currentHero['powers']" @deletePower="deletePower"/>
    </v-card>

    <v-container>
      <v-card
          class="text-center green d-flex justify-center"
          @click="showDialogueUpdate()">
        <v-card-title>
          Modifier le héro
        </v-card-title>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import ListPower from "@/components/ListPowers.vue";
import EventDialog from "@/components/EventDialog.vue";

export default {
  name: 'CurrentHeroView',

  components: {
    EventDialog,
    ListPower
  },

  data() {
    return {
      showDialogue: false,
      idHero: null,
      publicName: '',
      realName: '',
      powers: [],
      powerName: null,
      powerType: null,
      powerLevel: null,
      messageAlert: null,
      messageAlertName: null,
      messageAlertCreate: null
    };
  },

  computed: {
    ...mapState(['currentHero'])
  },

  created() {
    this.getInfoHero();
  },

  methods: {
    ...mapActions(['updateHero', "updateHeroUser"]),

    getInfoHero() {
      if (this.$store.state.user.authUser) {
        this.$store.state.currentHero = this.$store.state.user.heroUser;
      }
      this.publicName = this.currentHero['publicName'];
      this.realName = this.currentHero['realName'];
      this.powers = this.currentHero['powers'];
      this.idHero = this.currentHero['_id'];
    },

    showDialogueUpdate() {
      this.showDialogue = true;
    },

    closeDialogueUpdate() {
      this.showDialogue = false;
    },

    async updateHeroFromStore() {
      if (this.publicName === null || this.publicName === '') {
        this.messageAlertName = "Le nom public doit être renseigné !";
        return;
      }
      if (this.realName === null || this.realName === '') {
        this.messageAlertName = "Le nom réel doit être renseigné !";
        return;
      }
      let hero = {
        _id: this.idHero,
        publicName: this.publicName,
        realName: this.realName,
        powers: this.powers
      }
      if (this.$store.state.user.authUser) {
        const answer = await this.updateHeroUser(hero);
        if (answer === 1) {
          this.setShowErrorDialogue(true);
          this.setErrorTitle("Modification impossible");
          this.setErrorDescr("L'API n'a pas fonctionnée comme prévu. Les modifications n'on pas été effectuées.");
        }
        this.getInfoHero();
      } else {
        await this.updateHero(hero);
      }
      this.closeDialogueUpdate();
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

    deletePower(newPowersTab) {
      this.powers = newPowersTab;
      this.updateHeroFromStore();
    }
  }
}
</script>