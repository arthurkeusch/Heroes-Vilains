<template>
  <Page4041 v-if="this.randomPage === 1"/>
  <Page4042 v-else-if="this.randomPage === 2"/>
  <Page4043 v-else-if="this.randomPage === 3"/>
</template>
<script>
import Page4041 from "@/components/ErrorPage/Page404-1.vue";
import Page4042 from "@/components/ErrorPage/Page404-2.vue";
import Page4043 from "@/components/ErrorPage/Page404-3.vue";

export default {
  name: 'ErrorPage',

  components: {
    Page4041,
    Page4042,
    Page4043
  },

  mounted() {
    this.getRandomValues();
  },

  data() {
    return {
      randomPage: null
    };
  },

  methods: {
    getRandomValues() {
      this.randomPage = Math.floor(Math.random() * 3) + 1;
    }
  }
}
</script>