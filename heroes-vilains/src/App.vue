<template>
    <v-app class="mx-auto overflow-hidden" >


        <v-main>

        <v-app-bar
                height="70"
                dark
                prominent
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        </v-app-bar>

<div style="display: flex">


        <router-view style="order: 2"/>
        <v-navigation-drawer
                v-model="drawer"
                style="order: 1"
        >
            <v-list

            >
                <v-list-item-group
                        v-model="group"


                >
                    <v-list-item>
                        <v-list-item-title @click="redirect(1)">Login</v-list-item-title>
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
    data: () => ({
        drawer: false,
        group: null,
    }),

    watch: {
        group () {
            this.drawer = false
        },
    },
    methods: {
        async redirect(id){
            switch (id){
                case 1 : await this.$router.push('/login'); break;
                case 2 : await this.$router.push('/organisation'); break;
                case 3 : await this.$router.push('/team/list'); break;
            }

        }
    }
}
</script>
