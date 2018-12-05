<template>
  <div class="home">
    homed
    {{msg}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['msg'])
  },
  methods: {
    ...mapActions(['setMsg'])
  },
  async asyncData({ store }) {
    return store.dispatch('setMsg', 123);
  },
  created() {
    console.log('hello');
  }
};
</script>
