<template>
  <div class="card">
    <Menubar :model="filteredMenuItems">
      <!-- Logo on the left -->
      <template #start>
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-2rem">
          <path d="M5,20 L30,20 L20,35 Z" fill="var(--primary-color)" />
          <circle cx="17" cy="10" r="5" fill="var(--text-color)" />
        </svg>
      </template>

      <!-- Dynamic menu item rendering -->
      <template #item="{ item, props, hasSubmenu, root }">
        <router-link v-if="item.to" v-ripple class="flex align-items-center" v-bind="props.action" :to="item.to">
          <span :class="item.icon" ></span>
          <span class="ml-2">{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
            {{ item.shortcut }}
          </span>
          <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
        </router-link>
      </template>

      <!-- Search and avatar on the right -->
      <template #end>
        <div class="flex items-start gap-2">
          <span class="userfont">Welcome {{ authStore.username || 'Guest' }}! </span>
          <Avatar image="/images/avatar/2.jpeg" size="small" shape="circle" /> 
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'

import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'

const authStore = useModalStore();
const router = useRouter();

const menuItems = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: '/'
  },
  {
    label: 'Login',
    icon: 'pi pi-sign-in',
    to: '/login',
    command: () => router.push('/login'),
    visible: () => !authStore.isLogin
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    to: '/logout',
    command: () => {
      authStore.logoutUser();
      router.push('/login');
    },
    visible: () => authStore.isLogin
  },
  {
    label: 'Calendar',
    icon: 'pi pi-calendar',
    to: '/task',
    visible: () => authStore.isLogin
  },
];

const filteredMenuItems = computed(() => {
  return menuItems.filter(item => {
    return typeof item.visible === 'function' ? item.visible() : true;
  });
});
</script>

<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.userfont {
  text-align: justify;
  font-size: 1rem;
  font-weight: 500;
  color: black;
}
</style>
