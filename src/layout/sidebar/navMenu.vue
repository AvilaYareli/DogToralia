<template>
  <div id="sidebar-menu">
    
    <ul class="sidebar-links custom-scrollbar custom-scrollbar-hide" id="myDIV" :style="[
      layoutobject.split(' ').includes('horizontal-wrapper') ? layout.settings.layout_type == 'rtl' ? { '  -right': margin + 'px' } : { 'margin-left': margin + 'px' } : { margin: '0px' },
    ]">
      <li class="back-btn">
        <div class="mobile-back text-right">
          <span>Back</span> <i class="fa fa-angle-right pl-2" aria-hidden="true"></i>
        </div>
      </li>
      <!-- clas menu-box contiene los componentes del menu lateral izquierdo  -->
      <li class="menu-box">
        <ul>
          <!-- los class de sidebarar list contienen el icon,nombre, > -->
          <li v-for="(menu, index) in menuItems" :key="index" class="sidebar-list">
            <!-- Sub -->
            <label :class="'badge badge-' + menu.badgeType" v-if="menu.badgeType">{{ menu.badgeValue }}</label>
            
            <a href="javascript:void(0)" :class="{ active: menu.active }" class="sidebar-link sidebar-title"
              v-if="menu.type == 'sub'" @click="setNavActive(menu, index)">
              <vue-feather :type="menu.icon" class="top"></vue-feather>
              <span>
                {{ menu.title }}
              </span>
              <div class="according-menu" v-if="menu.children">
                <i class="pull-right" :class="[menu.active ? 'fa fa-angle-down' : 'fa fa-angle-right']"></i>
              </div>
            </a>
            <!-- Link -->
            <router-link :to="menu.path" class="sidebar-link sidebar-title" v-if="menu.type == 'link'"
              router-link-exact-active exact v-on:click="hidesecondmenu()">
              <vue-feather :type="menu.icon" class="top"></vue-feather>
              <span>
                {{ menu.title }}
              </span>
              <div class="according-menu">
                <i class="pull-right" :class="[menu.active ? 'fa fa-angle-right' : 'fa fa-angle-down']"></i>
              </div>
            </router-link>
            <a :href="menu.path" class="sidebar-link sidebar-title" target="_blank" v-else>
              <vue-feather :type="menu.icon" class="home"></vue-feather>
              <span class="menu1">
                {{ menu.title }}
              </span>
              <div class="according-menu">
                <i class="pull-right" :class="[menu.active ? 'fa fa-angle-down' : 'fa fa-angle-right']"></i>
              </div>
            </a>
            <!-- External Link -->
            <a :href="menu.path" class="sidebar-link sidebar-title" v-if="menu.type == 'extLink'"
              @click="setNavActive(menuItem, index)">
              <vue-feather :type="menu.icon" class="top"></vue-feather>
              <span>
                {{ menu.title }}
              </span>
              <i class="fa fa-angle-right pull-right" v-if="menu.children"></i>
            </a>
          </li>
        </ul>
      </li>
    </ul>
    
  </div>
</template>
<script>
import navMenu from "@/mixins/navMenu";

export default {
  mixins: [navMenu],

}
</script>