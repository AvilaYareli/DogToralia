<template>
    <div class="tap-top" :style="[display ? {'display':'block'} : { 'display':'none'} ]">
     
      <vue-feather type="chevrons-up" @click="executeScroll()"></vue-feather>
    </div>
  </template>
  <script>
    export default {
      name: 'TapTop',
      //daaaaaaaaa
      data() {
        return {
          display: false,
        };
      },
      created() {
        window.addEventListener('scroll', this.handleScroll);
      },
      // destroyed() {
      //   window.removeEventListener('scroll', this.handleScroll);
      // },
      methods: {
        executeScroll() {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        },
        handleScroll() {
          if (window.scrollY > 600) {
            this.display = true;
          } else {
            this.display = false;
          }
        },
      },
    };
  </script>
  
  <style></style>
  