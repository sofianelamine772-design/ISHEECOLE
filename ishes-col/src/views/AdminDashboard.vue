import { ref, inject, reactive, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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

// --- SUPABASE DATA ---
const dbStudents = ref([])
const isLoading = ref(true)

const fetchStudents = async () => {
  isLoading.value = true
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (!error) {
    dbStudents.value = data
  }
  isLoading.value = false
}

onMounted(() => {
  fetchStudents()
})

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

const showMobileMenu = ref(false)

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="min-h-screen bg-white flex font-sans text-slate-900 antialiased overflow-hidden">
    <!-- Overlay for mobile menu -->
    <div v-if="showMobileMenu" @click="showMobileMenu = false" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"></div>

    <!-- Sidebar -->
    <aside 
      :class="[showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0']"
      class="fixed inset-y-0 left-0 w-72 bg-[#0F172A] text-white z-50 md:relative md:flex flex-col overflow-hidden transition-transform duration-300 ease-in-out">
      <!-- Sidebar Background Decor -->
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none"></div>
      
      <div class="p-10 relative z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <School :size="20" />
          </div>
          <h1 class="text-2xl font-black tracking-tighter uppercase italic">ISHEE<span class="text-emerald-400">COLE</span></h1>
        </div>
        <p class="text-[9px] text-slate-500 mt-3 uppercase tracking-[0.4em] font-black pl-1">Management Engine v1</p>
      </div>

      <nav class="flex-1 px-6 mt-6 space-y-2 relative z-10">
        <Button variant="ghost" 
          @click="activeTab = 'overview'; showMobileMenu = false"
          :class="[activeTab === 'overview' ? 'bg-emerald-500 text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[10px] transition-all text-left">
          <LayoutDashboard :size="18" /> Aperçu Global
        </Button>
        <Button variant="ghost" 
          @click="activeTab = 'classes'; showMobileMenu = false"
          :class="[activeTab === 'classes' ? 'bg-emerald-500 text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[10px] transition-all text-left">
          <BookOpen :size="18" /> Gestion Classes
        </Button>
        <Button variant="ghost" 
          @click="activeTab = 'enrollments'; showMobileMenu = false"
          :class="[activeTab === 'enrollments' ? 'bg-emerald-500 text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[10px] transition-all text-left">
          <Plus :size="18" /> Inscriptions
        </Button>
        <Button variant="ghost" 
          @click="activeTab = 'billing'; showMobileMenu = false"
          :class="[activeTab === 'billing' ? 'bg-emerald-500 text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[10px] transition-all text-left">
          <DollarSign :size="18" /> Facturation
        </Button>
      </nav>

      <div class="p-8 relative z-10">
        <div class="bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
          <div class="flex items-center gap-3 mb-4">
             <Avatar class="h-8 w-8 ring-2 ring-emerald-500/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
                <AvatarFallback>AD</AvatarFallback>
             </Avatar>
             <div>
                <p class="text-[10px] font-black uppercase text-white">Directeur</p>
                <p class="text-[9px] text-slate-500">Session Active</p>
             </div>
          </div>
          <Button variant="ghost" class="w-full justify-start gap-3 p-0 h-auto text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors" @click="handleLogout">
            <LogOut :size="14" /> Déconnexion
          </Button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-12 overflow-y-auto bg-slate-50/50">
      <!-- Section: Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 md:mb-16">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Button variant="ghost" @click="showMobileMenu = true" class="md:hidden p-0 h-10 w-10 text-slate-600">
              <span class="sr-only">Menu</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </Button>
            <div>
              <h2 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                {{ activeTab === 'overview' ? 'Aperçu' : activeTab === 'classes' ? 'Classes' : activeTab === 'enrollments' ? 'Inscriptions' : 'Finance' }}
                <span class="text-emerald-500">.</span>
              </h2>
              <p class="hidden sm:block text-slate-400 font-medium text-xs mt-1 tracking-wide">Interface de pilotage ISHEECOLE v1.1</p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <Button @click="activeTab === 'classes' ? showClassModal = true : showStudentModal = true" class="w-full sm:w-auto bg-[#0F172A] hover:bg-emerald-600 text-white h-12 px-8 font-bold uppercase tracking-widest text-[10px] gap-3 shadow-xl transition-all hover:translate-y-[-2px]">
            <Plus :size="18" /> {{ activeTab === 'classes' ? 'Nouvelle classe' : 'Nouvel élève' }}
          </Button>
        </div>
      </div>

      <!-- Modals (Simplified) -->
      <div v-if="showClassModal || showStudentModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        <Card class="w-full max-w-md shadow-2xl overflow-hidden">
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card v-for="stat in stats" :key="stat.name" class="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white group overflow-hidden">
            <CardContent class="p-8 relative">
              <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div class="flex items-center justify-between relative z-10">
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{{ stat.name }}</p>
                  <div class="flex items-baseline gap-2 mt-1">
                    <p class="text-4xl font-black text-slate-900 tracking-tighter">{{ stat.value }}</p>
                    <Badge variant="ghost" class="text-[10px] font-bold text-emerald-600 bg-emerald-50 border-none">{{ stat.change }}</Badge>
                  </div>
                </div>
                <div :class="[stat.bg, stat.color, 'p-4 rounded-2xl shadow-sm transition-transform group-hover:rotate-12']">
                  <component :is="stat.icon" :size="24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Student List shown in Overview -->
        <Card class="border-none shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden bg-white rounded-3xl">
          <CardHeader class="border-b border-slate-50 p-10 bg-gradient-to-r from-white to-slate-50/50">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <CardTitle class="text-2xl font-black italic uppercase italic tracking-tight text-slate-800">Base <span class="text-emerald-500">Elèves</span></CardTitle>
                <CardDescription class="text-slate-400 font-medium mt-1">Registre complet des inscriptions actives sur ISHEECOLE.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent class="p-0 overflow-x-auto">
            <Table class="min-w-[800px] md:min-w-full">
              <TableHeader class="bg-slate-50/50 border-b border-slate-100">
                <TableRow class="border-none h-14">
                  <TableHead class="pl-10 font-bold uppercase text-[10px] tracking-widest text-slate-400">Élève</TableHead>
                  <TableHead class="font-bold uppercase text-[10px] tracking-widest text-slate-400">Plan</TableHead>
                  <TableHead class="font-bold uppercase text-[10px] tracking-widest text-slate-400">État du Compte</TableHead>
                  <TableHead class="text-right pr-10 font-bold uppercase text-[10px] tracking-widest text-slate-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 <TableRow v-for="std in students" :key="std.id" class="hover:bg-slate-50/80 transition-all border-b border-slate-50 last:border-none h-20">
                  <TableCell class="pl-10">
                    <div class="flex items-center gap-4">
                      <Avatar class="h-10 w-10 ring-2 ring-slate-100 transition-all hover:ring-emerald-400/30">
                        <AvatarImage :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${std.name}`" />
                        <AvatarFallback>{{ std.name.split(' ').map(n=>n[0]).join('') }}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p class="font-black text-slate-800 leading-none mb-1 text-sm">{{ std.name }}</p>
                        <p class="text-xs text-slate-400 font-medium">{{ std.email }}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block">{{ std.plan }}</p>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      :class="[
                        std.status === 'Payé' ? 'bg-emerald-100 text-emerald-700' : 
                        std.status === 'En attente' ? 'bg-amber-100 text-amber-700' : 
                        'bg-rose-100 text-rose-700',
                        'border-none font-bold text-[10px] uppercase px-3'
                      ]"
                    >
                      {{ std.status }}
                    </Badge>
                  </TableCell>
                  <TableCell class="text-right pr-10">
                    <Button variant="ghost" size="sm" class="text-emerald-600 font-bold hover:bg-emerald-50 transition-colors uppercase tracking-widest text-[10px]">Voir Profil</Button>
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
            <div class="flex items-center justify-between">
              <div>
                <CardTitle>Nouveaux inscrits automatiques (Vitrine)</CardTitle>
                <CardDescription>Élèves ayant complété leur inscription sur le site ISHES.</CardDescription>
              </div>
              <Button variant="outline" size="sm" @click="fetchStudents" :disabled="isLoading" class="gap-2">
                <Clock :size="14" :class="{ 'animate-spin': isLoading }" /> Actualiser
              </Button>
            </div>
          </CardHeader>
          <CardContent class="p-0 text-left overflow-x-auto">
            <div v-if="isLoading" class="p-10 text-center text-slate-400 font-medium">Chargement des données...</div>
            <div v-else-if="dbStudents.length === 0" class="p-10 text-center text-slate-400 font-medium">Aucune nouvelle inscription pour le moment.</div>
            <Table v-else class="min-w-[700px] md:min-w-full">
              <TableHeader class="bg-slate-50">
                <TableRow>
                  <TableHead class="pl-8">Élève</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Programme</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead class="text-right pr-8">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="std in dbStudents" :key="std.id">
                  <TableCell class="pl-8">
                    <div class="font-bold text-slate-900">{{ std.prenom }} {{ std.nom }}</div>
                    <div class="text-[10px] text-slate-400 uppercase font-black uppercase italic">{{ std.niveau }}</div>
                  </TableCell>
                  <TableCell>
                    <div class="text-sm font-medium">{{ std.email }}</div>
                    <div class="text-xs text-slate-400">{{ std.telephone }}</div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      :class="[
                        std.programme_id?.includes('tajwid') ? 'bg-emerald-100 text-emerald-700' :
                        std.programme_id?.includes('kids') ? 'bg-pink-100 text-pink-700' :
                        'bg-blue-100 text-blue-700',
                        'border-none font-bold text-[10px] uppercase truncate max-w-[150px]'
                      ]"
                    >
                      {{ std.programme_id }}
                    </Badge>
                  </TableCell>
                  <TableCell class="text-slate-500 text-sm italic">{{ new Date(std.created_at).toLocaleDateString() }}</TableCell>
                  <TableCell class="text-right pr-8">
                    <Badge variant="outline" class="border-emerald-500 text-emerald-600 font-black text-[9px] uppercase px-3">Assigné Auto</Badge>
                  </TableCell>
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
          <CardContent class="p-0 text-left overflow-x-auto">
            <Table class="min-w-[700px] md:min-w-full">
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
          <CardContent class="p-0 text-left overflow-x-auto">
            <Table class="min-w-[700px] md:min-w-full">
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
