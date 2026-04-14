<script setup>
import { ref, inject, reactive, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Users, 
  DollarSign, 
  LogOut, 
  Plus, 
  School,
  BookOpen,
  Clock,
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Video
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

const stats = [
  { name: 'Élèves Inscrits', value: '128', icon: Users, change: 'Actifs', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Chiffre d\'Affaires', value: '44,672€', icon: DollarSign, change: 'Annuel', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Classes Actives', value: '14', icon: BookOpen, change: 'Arabe/Coran', color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

// --- MODALS STATE ---
const showClassModal = ref(false)
const showStudentModal = ref(false)

const newClass = reactive({ name: '', teacher: '', days: '' })
const newStudent = reactive({ name: '', email: '', plan: 'Arabe' })

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
  <div class="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 antialiased overflow-hidden">
    <!-- Overlay for mobile menu -->
    <div v-if="showMobileMenu" @click="showMobileMenu = false" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"></div>

    <!-- Sidebar -->
    <aside 
      :class="[showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0']"
      class="fixed inset-y-0 left-0 w-72 bg-[#0F172A] text-white z-50 md:relative md:flex flex-col overflow-hidden transition-transform duration-300 ease-in-out">
      
      <div class="p-8 relative z-10 border-b border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <School :size="20" />
          </div>
          <h1 class="text-xl font-black tracking-tight uppercase italic underline decoration-emerald-500 decoration-4">ISHEE<span class="text-emerald-400">COLE</span></h1>
        </div>
      </div>

      <nav class="flex-1 px-6 mt-8 space-y-1 relative z-10">
        <Button variant="ghost" 
          @click="activeTab = 'overview'; showMobileMenu = false"
          :class="[activeTab === 'overview' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[10px]">
          <LayoutDashboard :size="18" /> Pilotage Global
        </Button>
        <Button variant="ghost" 
          @click="activeTab = 'classes'; showMobileMenu = false"
          :class="[activeTab === 'classes' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[10px]">
          <BookOpen :size="18" /> Gestion Classes Arabe
        </Button>
        <Button variant="ghost" 
          @click="activeTab = 'enrollments'; showMobileMenu = false"
          :class="[activeTab === 'enrollments' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[10px]">
          <Plus :size="18" /> Nouveaux Inscrits
        </Button>
        <Button variant="ghost" 
          @click="activeTab = 'billing'; showMobileMenu = false"
          :class="[activeTab === 'billing' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[10px]">
          <DollarSign :size="18" /> Suivi Paiements
        </Button>
      </nav>

      <div class="p-8 relative z-10 border-t border-white/5">
        <Button variant="ghost" class="w-full justify-start gap-3 p-0 h-auto text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors" @click="handleLogout">
          <LogOut :size="14" /> Fermer la session
        </Button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-12 overflow-y-auto">
      <!-- Section: Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div class="flex items-center gap-4">
          <Button variant="ghost" @click="showMobileMenu = true" class="md:hidden p-0 h-10 w-10 text-slate-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </Button>
          <div>
            <h2 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
              {{ activeTab === 'overview' ? 'Pilotage' : activeTab === 'classes' ? 'Salles de cours' : activeTab === 'enrollments' ? 'Inscription' : 'Finance' }}
              <span class="text-emerald-500">.</span>
            </h2>
            <p class="text-slate-400 font-medium text-xs mt-1 tracking-wide uppercase">Institut Supérieur d'Humanités et d'Études Sages</p>
          </div>
        </div>
        <Button @click="activeTab === 'classes' ? showClassModal = true : showStudentModal = true" class="bg-[#0F172A] hover:bg-emerald-600 text-white h-12 px-8 font-bold uppercase tracking-widest text-[10px] gap-3 shadow-xl transition-all">
          <Plus :size="18" /> {{ activeTab === 'classes' ? 'Ajouter une classe' : 'Inscrire manuellement' }}
        </Button>
      </div>

      <!-- --- VUE: APERÇU (OVERVIEW) --- -->
      <div v-if="activeTab === 'overview'">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card v-for="stat in stats" :key="stat.name" class="border-none shadow-sm bg-white overflow-hidden group">
            <CardContent class="p-8">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{{ stat.name }}</p>
                  <p class="text-4xl font-black text-slate-900 tracking-tighter">{{ stat.value }}</p>
                  <p class="text-[10px] font-bold text-emerald-600 mt-2 italic">{{ stat.change }}</p>
                </div>
                <div :class="[stat.bg, stat.color, 'p-4 rounded-2xl group-hover:rotate-6 transition-transform']">
                  <component :is="stat.icon" :size="24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Student List -->
        <Card class="border-none shadow-sm overflow-hidden bg-white rounded-2xl">
          <CardHeader class="border-b border-slate-50 p-8">
            <CardTitle class="text-xl font-black uppercase italic tracking-tight text-slate-800 underline decoration-emerald-500/30">Liste de vos élèves</CardTitle>
          </CardHeader>
          <CardContent class="p-0 overflow-x-auto">
            <Table>
              <TableHeader class="bg-slate-50">
                <TableRow>
                  <TableHead class="pl-8 font-bold uppercase text-[9px] tracking-widest text-slate-400">Nom & Prénom</TableHead>
                  <TableHead class="font-bold uppercase text-[9px] tracking-widest text-slate-400">Formation</TableHead>
                  <TableHead class="font-bold uppercase text-[9px] tracking-widest text-slate-400">Statut</TableHead>
                  <TableHead class="text-right pr-8 font-bold uppercase text-[9px] tracking-widest text-slate-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 <TableRow v-for="std in students" :key="std.id" class="hover:bg-slate-50/50 border-b border-slate-50 last:border-none">
                  <TableCell class="pl-8 py-4">
                    <div class="flex items-center gap-3">
                      <Avatar class="h-9 w-9 ring-1 ring-slate-100">
                        <AvatarImage :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${std.name}`" />
                        <AvatarFallback>{{ std.name[0] }}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p class="font-bold text-slate-800 text-sm leading-tight">{{ std.name }}</p>
                        <p class="text-[10px] text-slate-400">{{ std.email }}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="ghost" class="bg-slate-100 text-slate-600 font-bold text-[9px] uppercase">{{ std.plan }}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge :class="std.status === 'Payé' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="border-none font-bold text-[9px] uppercase">
                      {{ std.status }}
                    </Badge>
                  </TableCell>
                  <TableCell class="text-right pr-8">
                    <Button variant="ghost" size="sm" class="text-emerald-600 font-bold uppercase text-[9px] hover:bg-emerald-50">Détails</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <!-- --- VUE: CLASSES --- -->
      <div v-if="activeTab === 'classes'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="cls in classes" :key="cls.id" class="border-none shadow-sm hover:translate-y-[-4px] transition-all bg-white group">
          <CardHeader>
            <div class="flex items-center justify-between mb-2">
              <Badge class="bg-emerald-50 text-emerald-600 border-none">{{ cls.students }} Inscrits</Badge>
            </div>
            <CardTitle class="text-lg font-black text-slate-800">{{ cls.name }}</CardTitle>
            <CardDescription class="font-bold text-slate-400 text-[10px] uppercase">{{ cls.teacher }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-2 text-[11px] font-bold text-slate-500 italic mb-4">
              <Calendar :size="14" /> {{ cls.days }}
            </div>
            <div class="flex items-center gap-2">
              <Button size="sm" class="flex-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold text-[9px] uppercase gap-2 h-8">
                <Video :size="12" /> Lancer Zoom
              </Button>
              <Button size="icon" variant="ghost" class="h-8 w-8 text-slate-400 hover:text-emerald-500">
                <MessageCircle :size="16" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- --- VUE: INSCRIPTIONS (ENROLLMENTS) --- -->
      <div v-if="activeTab === 'enrollments'">
        <Card class="border-none shadow-xl bg-white overflow-hidden rounded-2xl">
          <CardHeader class="p-8 border-b border-slate-50">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-xl font-black uppercase italic tracking-tight text-slate-800">Inscriptions Vitrine ISHES</CardTitle>
                <CardDescription class="text-slate-400 text-xs font-bold uppercase mt-1">Données synchronisées en temps réel</CardDescription>
              </div>
              <Button variant="outline" size="sm" @click="fetchStudents" :disabled="isLoading" class="text-[9px] font-bold uppercase tracking-widest">
                <Clock :size="14" :class="{ 'animate-spin': isLoading }" class="mr-2" /> {{ isLoading ? 'Synchronisation...' : 'Actualiser' }}
              </Button>
            </div>
          </CardHeader>
          <CardContent class="p-0 overflow-x-auto">
            <div v-if="isLoading" class="p-20 text-center text-slate-300 font-black uppercase tracking-[0.3em] text-sm italic">Mise à jour de la base...</div>
            <div v-else-if="dbStudents.length === 0" class="p-20 text-center text-slate-300 font-medium">Aucun nouvel inscrit via la vitrine.</div>
            <Table v-else>
              <TableHeader class="bg-slate-50">
                <TableRow>
                  <TableHead class="pl-8 font-bold text-[9px] uppercase tracking-widest text-slate-400">Nom</TableHead>
                  <TableHead class="font-bold text-[9px] uppercase tracking-widest text-slate-400">Programme Choisi</TableHead>
                  <TableHead class="font-bold text-[9px] uppercase tracking-widest text-slate-400">Date</TableHead>
                  <TableHead class="text-right pr-8 font-bold text-[9px] uppercase tracking-widest text-slate-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="std in dbStudents" :key="std.id" class="hover:bg-slate-50/50">
                  <TableCell class="pl-8 py-5">
                    <div class="font-black text-slate-900 text-sm uppercase italic">{{ std.prenom }} {{ std.nom }}</div>
                    <div class="text-[10px] text-slate-400 mt-0.5">{{ std.email }} · {{ std.telephone }}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" class="border-emerald-200 text-emerald-700 bg-emerald-50/30 font-bold text-[9px] uppercase px-3">
                      {{ std.programme_id.replace('adult_', '').replace('kids_', '').toUpperCase() }}
                    </Badge>
                  </TableCell>
                  <TableCell class="text-slate-400 text-[10px] italic">{{ new Date(std.created_at).toLocaleDateString() }}</TableCell>
                  <TableCell class="text-right pr-8">
                    <Button class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[9px] uppercase h-8 px-4 rounded-lg">Valider</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

    </main>
  </div>
</template>
