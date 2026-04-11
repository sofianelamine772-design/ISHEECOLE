<script setup>
import { ref, inject, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Filter,
  School,
  FileText,
  BookOpen,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  Calendar
} from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

const emit = defineEmits(['logout'])

const state = inject('state')
const actions = inject('actions')

const activeTab = ref('overview')

const students = state.students
const classes = state.classes
const billing = state.billing
const recentEnrollments = state.students // Mock link

const recentRevenue = [40, 60, 45, 90, 65, 80, 70]

const stats = [
  { name: 'Élèves Totaux', value: '452', icon: Users, change: '+12%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Revenu Mensuel', value: '24,500€', icon: DollarSign, change: '+8%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Taux de Réussite', value: '94%', icon: TrendingUp, change: '+2%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

// --- MODALS STATE ---
const showClassModal = ref(false)
const showStudentModal = ref(false)

const newClass = reactive({ name: '', teacher: '', days: '' })
const newStudent = reactive({ name: '', email: '', plan: 'Premium' })

const submitClass = () => {
  actions.addClass({ ...newClass })
  showClassModal.value = false
  newClass.name = ''; newClass.teacher = ''; newClass.days = ''
}

const submitStudent = () => {
  actions.addStudent({ ...newStudent, amount: newStudent.plan === 'Premium' ? '299€' : '29€' })
  showStudentModal.value = false
  newStudent.name = ''; newStudent.email = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#0F172A] text-white hidden md:flex flex-col">
      <div class="p-8">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-[#065F46] rounded-lg flex items-center justify-center text-white">
            <School :size="18" />
          </div>
          <h1 class="text-2xl font-bold tracking-tight">ISHEE<span class="text-emerald-400">COLE</span></h1>
        </div>
        <p class="text-[10px] text-slate-500 mt-2 uppercase tracking-[0.2em] font-bold">Système de Gestion</p>
      </div>
      <nav class="flex-1 px-4 mt-4 space-y-1">
        <Button variant="ghost" 
          @click="activeTab = 'overview'"
          :class="[activeTab === 'overview' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3">
          <LayoutDashboard :size="20" /> Dashboard
        </Button>
        <Button variant="ghost" 
          @click="activeTab = 'classes'"
          :class="[activeTab === 'classes' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3">
          <BookOpen :size="20" /> Classes
        </Button>
        <Button variant="ghost" 
          @click="activeTab = 'enrollments'"
          :class="[activeTab === 'enrollments' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3">
          <Plus :size="20" /> Inscriptions
        </Button>
        <Button variant="ghost" 
          @click="activeTab = 'billing'"
          :class="[activeTab === 'billing' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3">
          <DollarSign :size="20" /> Facturation
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5">
          <Settings :size="20" /> Configuration
        </Button>
      </nav>
      <div class="p-6 mt-auto">
        <div class="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
          <p class="text-xs text-slate-400">Version 1.1.0</p>
          <Button variant="ghost" class="w-full mt-2 justify-start gap-3 p-0 h-auto text-slate-400 hover:text-destructive" @click="emit('logout')">
            <LogOut :size="16" /> Déconnecter
          </Button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-10 overflow-y-auto">
      <!-- Section: Header -->
      <div class="flex items-center justify-between mb-10">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">
            {{ activeTab === 'overview' ? 'Aperçu Global' : activeTab === 'classes' ? 'Gestion des Classes' : activeTab === 'enrollments' ? 'Nouveaux Inscrits' : 'Historique Facturation' }}
          </h2>
          <p class="text-slate-500 mt-1">Gérez votre institut ISHEECOLE en temps réel.</p>
        </div>
        <div class="flex items-center gap-4">
          <Button @click="activeTab === 'classes' ? showClassModal = true : showStudentModal = true" class="bg-[#065F46] hover:bg-[#022C22] shadow-lg shadow-emerald-500/20 px-6 font-bold gap-2 text-white">
            <Plus :size="18" /> {{ activeTab === 'classes' ? 'Créer une classe' : 'Ajouter un élève' }}
          </Button>
        </div>
      </div>

      <!-- Modals (Simplified) -->
      <div v-if="showClassModal || showStudentModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        <Card class="w-full max-w-md shadow-2xl">
          <CardHeader>
            <CardTitle>{{ showClassModal ? 'Nouvelle Classe' : 'Nouvel Élève' }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div v-if="showClassModal" class="space-y-4">
              <Input v-model="newClass.name" placeholder="Nom de la classe (ex: Anglais)" />
              <Input v-model="newClass.teacher" placeholder="Nom du professeur" />
              <Input v-model="newClass.days" placeholder="Jours (ex: Lun, Mar)" />
            </div>
            <div v-else class="space-y-4">
              <Input v-model="newStudent.name" placeholder="Nom complet" />
              <Input v-model="newStudent.email" placeholder="Email" />
              <select v-model="newStudent.plan" class="w-full p-2 rounded-lg border border-slate-200">
                <option value="Premium">Pack Premium (Annuel)</option>
                <option value="Basic">Pack Basic (Mensuel)</option>
              </select>
            </div>
          </CardContent>
            <CardFooter class="gap-2">
            <Button variant="ghost" @click="showClassModal = false; showStudentModal = false">Annuler</Button>
            <Button class="flex-1 bg-[#065F46] hover:bg-[#022C22] text-white" @click="showClassModal ? submitClass() : submitStudent()">Enregistrer</Button>
          </CardFooter>
        </Card>
      </div>

      <!-- --- VUE: APERÇU (OVERVIEW) --- -->
      <div v-if="activeTab === 'overview'">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card v-for="stat in stats" :key="stat.name" class="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-bold text-slate-400 uppercase tracking-tight">{{ stat.name }}</p>
                  <div class="flex items-baseline gap-2 mt-1">
                    <p class="text-3xl font-black text-slate-900">{{ stat.value }}</p>
                    <span class="text-xs font-bold text-green-600">{{ stat.change }}</span>
                  </div>
                </div>
                <div :class="[stat.bg, stat.color, 'p-4 rounded-2xl']">
                  <component :is="stat.icon" :size="24" />
                </div>
              </div>
              <div class="mt-6 h-12 flex items-end gap-1">
                <div v-for="(h, i) in recentRevenue" :key="i" 
                     class="flex-1 bg-slate-100 rounded-t-sm transition-all hover:bg-emerald-400"
                     :style="{ height: `${h}%` }">
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Student List shown in Overview -->
        <Card class="border-none shadow-xl overflow-hidden bg-white">
          <CardHeader class="border-b border-slate-50 p-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <CardTitle class="text-xl font-bold">Base Elèves</CardTitle>
                <CardDescription>Visualisez tous les inscrits.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent class="p-0">
            <Table>
              <TableHeader class="bg-slate-50/50">
                <TableRow class="border-none">
                  <TableHead class="pl-8 h-12">Élève</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>État</TableHead>
                  <TableHead class="text-right pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 <TableRow v-for="std in students" :key="std.id" class="hover:bg-slate-50 transition-colors">
                  <TableCell class="pl-8">
                    <div class="flex items-center gap-3">
                      <Avatar class="h-8 w-8">
                        <AvatarFallback>{{ std.name.split(' ').map(n=>n[0]).join('') }}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p class="font-bold leading-none">{{ std.name }}</p>
                        <p class="text-xs text-muted-foreground mt-1">{{ std.email }}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p class="text-sm font-medium uppercase text-slate-500">{{ std.plan }}</p>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      :class="[
                        std.status === 'Payé' ? 'bg-green-100 text-green-700' : 
                        std.status === 'En attente' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700',
                        'border-none'
                      ]"
                    >
                      {{ std.status }}
                    </Badge>
                  </TableCell>
                  <TableCell class="text-right pr-8">
                    <Button variant="ghost" size="sm" class="text-emerald-600">Détails</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <!-- --- VUE: CLASSES --- -->
      <div v-if="activeTab === 'classes'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="cls in classes" :key="cls.id" class="border-none shadow-sm hover:shadow-xl transition-all cursor-pointer bg-white group">
          <CardHeader>
            <div class="flex items-center justify-between mb-2">
              <Badge variant="secondary" class="bg-emerald-50 text-emerald-600 border-none">{{ cls.students }} Élèves</Badge>
              <Settings :size="16" class="text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
            <CardTitle class="text-xl font-black text-slate-800">{{ cls.name }}</CardTitle>
            <CardDescription class="font-medium text-slate-500">{{ cls.teacher }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-2 text-sm text-slate-400">
              <Calendar :size="14" /> {{ cls.days }}
            </div>
            <div class="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-500 h-full w-[70%]"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- --- VUE: INSCRIPTIONS (ENROLLMENTS) --- -->
      <div v-if="activeTab === 'enrollments'">
        <Card class="border-none shadow-xl bg-white overflow-hidden">
          <CardHeader class="p-8 pb-4">
            <CardTitle>Nouveaux inscrits payés</CardTitle>
            <CardDescription>Élèves ayant complété leur paiement récemment.</CardDescription>
          </CardHeader>
          <CardContent class="p-0 text-left">
            <Table>
              <TableHeader class="bg-slate-50">
                <TableRow>
                  <TableHead class="pl-8">Élève</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Pack choisi</TableHead>
                  <TableHead class="text-right pr-8">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="en in recentEnrollments" :key="en.id">
                  <TableCell class="pl-8 font-bold">{{ en.name }}</TableCell>
                  <TableCell class="text-slate-500">{{ en.date }}</TableCell>
                  <TableCell><Badge class="bg-green-100 text-green-700 border-none">{{ en.plan }}</Badge></TableCell>
                  <TableCell class="text-right pr-8 font-black text-emerald-600">{{ en.amount }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <!-- --- VUE: FACTURATION (BILLING) --- -->
      <div v-if="activeTab === 'billing' " class="space-y-8">
        <!-- Section: Succès -->
        <Card class="border-none shadow-lg bg-green-50/20 border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle class="text-green-700 flex items-center gap-2">
              <CheckCircle2 :size="20" /> Paiements Réussis
            </CardTitle>
          </CardHeader>
          <CardContent class="p-0 text-left">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="pl-8">Facture</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead class="text-right pr-8">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="inv in billing.success" :key="inv.id">
                  <TableCell class="pl-8 font-mono text-xs">{{ inv.id }}</TableCell>
                  <TableCell class="font-bold">{{ inv.student }}</TableCell>
                  <TableCell class="text-slate-500">{{ inv.date }}</TableCell>
                  <TableCell class="text-right pr-8 font-black text-green-600">{{ inv.amount }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <!-- Section: Refusés -->
        <Card class="border-none shadow-lg bg-red-50/20 border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle class="text-red-700 flex items-center gap-2">
              <Clock :size="20" /> Paiements Refusés
            </CardTitle>
          </CardHeader>
          <CardContent class="p-0 text-left">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="pl-8">ID Erreur</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Motif du refus</TableHead>
                  <TableHead class="text-right pr-8">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="inv in billing.declined" :key="inv.id">
                  <TableCell class="pl-8 font-mono text-xs text-red-400">{{ inv.id }}</TableCell>
                  <TableCell class="font-bold">{{ inv.student }}</TableCell>
                  <TableCell class="text-red-600 text-sm italic">{{ inv.reason }}</TableCell>
                  <TableCell class="text-right pr-8 font-black text-slate-400 line-through">{{ inv.amount }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

    </main>
  </div>
</template>
