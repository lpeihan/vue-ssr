<template>
  <div class="home">
    home23
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
  async asyncData() {
    return Promise.resolve(123);
  },
  created() {
    console.log('hello');
  }
};
</script>
