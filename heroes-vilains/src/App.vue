<template>
  <v-app class="mx-auto overflow-hidden">

    <v-main>
      <v-app-bar
          height="70"
          dark
          prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn icon @click="redirect(4)">
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
                <v-list-item-title @click="redirect(2)">Organisations</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title @click="redirect(3)">Equipes</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      drawer: false,
      group: null
    }
  },

  watch: {
    group() {
      this.drawer = false
    },
  },

  methods: {
    async redirect(id) {
      if (id === 1 && this.$route.path !== '/') {
        await this.$router.push('/');
      } else if (id === 2 && this.$route.path !== '/organisation') {
        await this.$router.push('/organisation');
      } else if (id === 3 && this.$route.path !== '/team/list') {
        await this.$router.push('/team/list');
      } else if (id === 4 && this.$route.path !== '/login') {
        await this.$router.push('/login');
      }
    }
  }
}
</script>
<style>
h3{
    margin-right: 40px;
}
</style>