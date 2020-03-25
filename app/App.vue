<template lang="pug">
    div.root-block
      div.header(style="background-color: black; color: white;") VUE-SSR-EXPRESS-PUG-STYLUS
      ul
       li
         router-link(to='/index') Index
       li 
         router-link(to='/about') About
      div#main-content
        router-view
</template>

<script>
import axios from 'axios';

import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('main');

export default {

  mounted: function() {

  },

  methods: {
  }

};


</script>


<style module lang="stylus">
#main-content {
  margin: 30px;
}

.header {
  padding: 10px;
  font-size: 20px;
}
</style>
