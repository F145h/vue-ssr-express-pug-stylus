<template lang="pug">
  div
    h2 Index
    div Value from store: {{state.someValue}}

</template>

<style module lang="stylus">

</style>

<script>
import axios from 'axios';

import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('main');


export default {
  metaInfo: {
    title: 'Index',
  },
  computed: {
    ...mapState({
      state: state => state
    }),
  },
  serverPrefetch(context) {
    return Promise.all([this.update_main_content(42)]);
  },
  methods: {
    ...mapActions(["update_main_content"]),
  }
};
</script>
