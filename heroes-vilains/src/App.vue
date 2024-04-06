<template>
  <v-app class="mx-auto overflow-hidden">

    <ErrorDialog/>

    <v-main>
      <v-app-bar height="70" dark prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="redirect(6)">
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Login organisation</v-list-item-title>
            </v-list-item>
            <v-list-item @click="redirect(8)">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Login hero</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
              <v-list-item>
                <v-list-item-title @click="redirect(7)">Page d'erreur 404</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="redirect(9)">Héro courant</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>

    </v-main>
  </v-app>
</template>

<script>
import {mapState} from "vuex";
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
    ...mapState(['currentTeam', 'currentOrganisation', 'passwordOrganisation'])
  },

  methods: {
    async redirect(id) {
      if (id === 1 && this.$route.path !== '/') {
        await this.$router.push('/');
      } else if (id === 2 && this.$route.path !== '/organisation/current') {
        await this.$router.push('/organisation/current');
      } else if (id === 3 && this.$route.path !== '/organisation') {
        await this.$router.push('/organisation');
      } else if (id === 4 && this.$route.path !== '/team/current') {
        await this.$router.push('/team/current');
      } else if (id === 5 && this.$route.path !== '/team/list') {
        await this.$router.push('/team/list');
      } else if (id === 6 && this.$route.path !== '/login') {
        await this.$router.push('/login');
      } else if (id === 7 && this.$route.path !== '/404') {
        await this.$router.push('/404');
      } else if (id === 8 && this.$route.path !== '/login/hero') {
        await this.$router.push('/login/hero');
      } else if (id === 9 && this.$route.path !== '/hero/current') {
        await this.$router.push('/hero/current');
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