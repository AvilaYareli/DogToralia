<template>
    <tapTop />
    <div class="page-wrapper" :class="layoutobj">
      <div class="page-header" :class="{ close_icon: !togglesidebar }">
        <Header @clicked="sidebar_toggle" />
      </div>
      <div class="page-body-wrapper">
        <div class="sidebar-wrapper" :class="[{ close_icon: !togglesidebar }]"
          :sidebar-layout="layout.settings.sidebar_setting">
          <Sidebar @clicked="sidebar_toggle" />
        </div>
        <div class="page-body">
          <router-view></router-view>
        </div>
        <footerView />
      </div>
    </div>
  </template>
  

<script>
import { mapState } from 'vuex';
import { layoutClasses } from '../constants/layout';
import tapTop from "./tapTop.vue"
import Header from './header/indexView.vue';
import Sidebar from "./sidebar/indexView.vue"
import footerView from "./footerView.vue"
// import customizer from "./customizer/indexView.vue"

export default {
  components: {
    Header,
    Sidebar,
    footerView,
    tapTop,
    //   customizer
  },
  data() {
    return {
      mobileheader_toggle_var: false,
      sidebar_toggle_var: false,
      horizontal_Sidebar: true,
      resized: false,
      layoutobj: {}
    };
  },
  computed: {
    ...mapState({
      menuItems: state => state.menu.data,
      layout: state => state.layout.layout,
      togglesidebar: (state) => state.menu.togglesidebar,
      activeoverlay: (state) => state.menu.activeoverlay
    }),
    layoutobject: {
      get: function () {
        return JSON.parse(JSON.stringify(layoutClasses.find((item) => Object.keys(item).pop() === this.layout.settings.layout)))[this.layout.settings.layout];
      },
      set: function () {
        this.layoutobj = layoutClasses.find((item) => Object.keys(item).pop() === this.layout.settings.layout);
        this.layoutobj = JSON.parse(JSON.stringify(this.layoutobj))[this.layout.settings.layout];
        return this.layoutobj;
      }
    }
  },
  watch: {
    '$route'() {
      this.menuItems.filter(items => {
        if (items.path === this.$route.path)
          this.$store.dispatch('menu/setActiveRoute', items);
        if (!items.children) return false;
        items.children.filter(subItems => {
          if (subItems.path === this.$route.path)
            this.$store.dispatch('menu/setActiveRoute', subItems);
          if (!subItems.children) return false;
          subItems.children.filter(subSubItems => {
            if (subSubItems.path === this.$route.path)
              this.$store.dispatch('menu/setActiveRoute', subSubItems);
          });
        });
      });
      this.layoutobj = layoutClasses.find((item) => Object.keys(item).pop() === this.layout.settings.layout);
      if ((window.innerWidth < 991 && this.layout.settings.layout === 'Horizontal')) {
        const newlayout = JSON.parse(JSON.stringify(this.layoutobj).replace('horizontal-wrapper', 'compact-wrapper'));
        this.layoutobj = JSON.parse(JSON.stringify(newlayout))[this.layout.settings.layout];
      } else {
        this.layoutobj = JSON.parse(JSON.stringify(this.layoutobj))[this.layout.settings.layout];
      }
    },
    sidebar_toggle_var: function () {
      this.resized = (this.width <= 991) ? !this.sidebar_toggle_var : this.sidebar_toggle_var;
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.resized = this.sidebar_toggle_var;
    this.$store.dispatch('layout/set');
    // this.$router.replace({ 'query': null }).catch(err => err);
    this.layout.settings.layout = this.$route.query.layout ? this.$route.query.layout : 'default';
    this.layoutobj = layoutClasses.find((item) => Object.keys(item).pop() === this.layout.settings.layout);
    this.layoutobj = JSON.parse(JSON.stringify(this.layoutobj))[this.layout.settings.layout];
  },
  updated() {
    console.log('updating layout')
  },
  methods: {
    sidebar_toggle(value) {
      this.sidebar_toggle_var = !value;
    },
    mobiletoggle_toggle(value) {
      this.mobileheader_toggle_var = value;
    },
    handleResize() {
      this.$store.dispatch('menu/resizetoggle');
    },
    removeoverlay() {
      this.$store.state.menu.activeoverlay = false;
      if (window.innerWidth < 991) {
        this.$store.state.menu.togglesidebar = false;
      }
      this.menuItems.filter(menuItem => {
        menuItem.active = false;
      });
    },
    hidesecondmenu() {
      if (this.layoutobject.split(' ').includes('compact-sidebar')) {
        this.menuItems.filter(menuItem => {
          menuItem.active = false;
        });
      }
      if (window.innerWidth < 991) {
        this.$store.state.menu.togglesidebar = false;
      }
    }
  }
}
</script>