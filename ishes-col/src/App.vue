<script setup>
import { ref, reactive, provide, onMounted, watch } from 'vue'
import LoginView from './views/LoginView.vue'
import StudentDashboard from './views/StudentDashboard.vue'
import AdminDashboard from './views/AdminDashboard.vue'

// --- GLOBAL STATE ---
const currentView = ref('login')

const state = reactive({
  students: [
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', plan: 'Premium', status: 'Payé', amount: '299€', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean' },
    { id: 2, name: 'Marie Curie', email: 'marie@example.com', plan: 'Basic', status: 'En attente', amount: '199€', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie' },
  ],
  classes: [
    { id: 1, name: 'Intelligence Artificielle', teacher: 'Dr. Sarah Smith', students: 24, days: 'Lundi, Jeudi' },
    { id: 2, name: 'Marketing Digital', teacher: 'Pr. Julie Martin', students: 18, days: 'Mardi, Vendredi' },
  ],
  billing: {
    success: [
      { id: 'FAC-001', student: 'Jean Dupont', date: '11/04/2026', amount: '299€', method: 'Visa' },
    ],
    declined: [
      { id: 'ERR-992', student: 'Paul Klein', date: '11/04/2026', amount: '299€', reason: 'Fonds insuffisants' },
    ]
  }
})

// Load from LocalStorage
onMounted(() => {
  const savedState = localStorage.getItem('isheecole_state')
  if (savedState) {
    const parsed = JSON.parse(savedState)
    Object.assign(state, parsed)
  }
})

// Save to LocalStorage on change
watch(state, (newState) => {
  localStorage.setItem('isheecole_state', JSON.stringify(newState))
}, { deep: true })

// --- ACTIONS ---
const actions = {
  addStudent: (student) => {
    state.students.unshift({ id: Date.now(), ...student, status: 'Payé' })
  },
  addClass: (cls) => {
    state.classes.unshift({ id: Date.now(), ...cls, students: 0 })
  },
  addPayment: (payment) => {
    if (payment.status === 'success') {
      state.billing.success.unshift({ id: `FAC-${Date.now()}`, ...payment })
    } else {
      state.billing.declined.unshift({ id: `ERR-${Date.now()}`, ...payment })
    }
  }
}

provide('state', state)
provide('actions', actions)

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
