<script setup>
import { ref } from 'vue'
import LoginView from './views/LoginView.vue'
import StudentDashboard from './views/StudentDashboard.vue'
import AdminDashboard from './views/AdminDashboard.vue'

// Basic routing state
const currentView = ref('login')

const login = (role) => {
  currentView.value = role
}

const logout = () => {
  currentView.value = 'login'
}
</script>

<template>
  <div class="antialiased">
    <transition name="fade" mode="out-in">
      <LoginView v-if="currentView === 'login'" @login="login" />
      <StudentDashboard v-else-if="currentView === 'student'" @logout="logout" />
      <AdminDashboard v-else-if="currentView === 'admin'" @logout="logout" />
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
