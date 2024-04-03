<template>
  <v-app class="mx-auto overflow-hidden">

    <ErrorDialog/>

    <v-main>
      <v-app-bar height="70" dark prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn icon @click="redirect(6)">
          <h3>Login</h3>
        </v-btn>
      </v-app-bar>

      <div style="display: flex">
        <router-view style="order: 2"/>
        <v-navigation-drawer
            v-model="drawer"
            style="order: 1">
          <v-list>
            <v-list-item-group v-model="group">
              <v-list-item>
                <v-list-item-title @click="redirect(1)">Accueil</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="redirect(2)">Organisation courante</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="redirect(3)">Liste des organisations</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="redirect(4)">Equipe courante</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="redirect(5)">Liste des équipes</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>

    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapState} from "vuex";
import ErrorDialog from "@/components/ErrorDialog.vue";

export default {
  name: 'App',

  components: {
    ErrorDialog
  },

  data() {
    return {
      drawer: false,
      group: null,
    }
  },

  watch: {
    group() {
      this.drawer = false
    },
  },

  computed: {
    ...mapState(['currentTeam', 'currentOrganisation', 'passwordOrganisation', 'showErrorDialogue', 'errorDescr', 'errorTitle'])
  },

  methods: {
    ...mapActions(['setShowErrorDialogue', 'setErrorDescr', 'setErrorTitle']),

    async redirect(id) {
      if (id === 1 && this.$route.path !== '/') {
        await this.$router.push('/');
      } else if (id === 2 && this.$route.path !== '/organisation/current') {
        if (this.passwordOrganisation == null) {
          await this.$router.push('/login');
          this.setShowErrorDialogue(true);
          this.setErrorTitle("Accès non autorisé");
          this.setErrorDescr("Vous devez être connectez à une organisation pour accéder à cette section.");
        } else if (this.currentOrganisation == null) {
          await this.$router.push("/organisation");
          this.setShowErrorDialogue(true);
          this.setErrorTitle("Accès non autorisé");
          this.setErrorDescr("Vous devez d'abord sélectionner une organisation.");
        } else {
          await this.$router.push('/organisation/current');
        }
      } else if (id === 3 && this.$route.path !== '/organisation') {
        await this.$router.push('/organisation');
      } else if (id === 4 && this.$route.path !== '/team/current') {
        if (this.passwordOrganisation == null) {
          await this.$router.push('/login');
          this.setShowErrorDialogue(true);
          this.setErrorTitle("Accès non autorisé");
          this.setErrorDescr("Vous devez être connectez à une organisation pour accéder à cette section.");
        } else if (this.currentTeam == null) {
          await this.$router.push('/organisation/current');
          this.setShowErrorDialogue(true);
          this.setErrorTitle("Accès non autorisé");
          this.setErrorDescr("Vous devez d'abord sélectionner une équipe.");
        } else {
          await this.$router.push('/team/current');
        }
      } else if (id === 5 && this.$route.path !== '/team/list') {
        await this.$router.push('/team/list');
      } else if (id === 6 && this.$route.path !== '/login') {
        await this.$router.push('/login');
      }
    }
  }
}
</script>
<style>
h3 {
  margin-right: 40px;
}
</style>