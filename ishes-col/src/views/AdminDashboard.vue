<script setup>
import { ref, inject, reactive, onMounted, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Users, 
  LogOut, 
  Plus, 
  School,
  BookOpen,
  Clock,
  Video,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

const emit = defineEmits(['logout'])

const state = inject('state')
const actions = inject('actions')

const activeTab = ref('students')
const searchQuery = ref('')
const selectedFilter = ref('Tous')

// --- DATA ---
const dbStudents = ref([])
const isLoading = ref(true)

const fetchFromVitrine = async () => {
  isLoading.value = true
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (!error) dbStudents.value = data
  isLoading.value = false
}

onMounted(() => {
  fetchFromVitrine()
})

const students = state.students
const classes = state.classes
const billing = state.billing

// --- FILTERING LOGIC ---
const filteredStudents = computed(() => {
  return students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.ref?.toLowerCase() || searchQuery.value.toLowerCase()) || 
                         s.email.toLowerCase().includes(searchQuery.ref?.toLowerCase() || searchQuery.value.toLowerCase())
    const matchesFilter = selectedFilter.value === 'Tous' || s.plan.includes(selectedFilter.value)
    return matchesSearch && matchesFilter
  })
})

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 antialiased overflow-hidden">
    <!-- Sidebar -->
    <aside class="hidden md:flex flex-col w-72 bg-[#0F172A] text-white border-r border-white/5 relative">
      <div class="p-8 border-b border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <School :size="20" />
          </div>
          <h1 class="text-xl font-black tracking-tight uppercase italic underline decoration-emerald-500 decoration-4">ISHEE<span class="text-emerald-400">COLE</span></h1>
        </div>
      </div>

      <nav class="flex-1 px-6 mt-8 space-y-1">
        <Button variant="ghost" @click="activeTab = 'students'"
          :class="[activeTab === 'students' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-4 h-12 font-bold uppercase tracking-widest text-[10px]">
          <Users :size="18" /> Registre Éleves
        </Button>
        <Button variant="ghost" @click="activeTab = 'vitrine'"
          :class="[activeTab === 'vitrine' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-4 h-12 font-bold uppercase tracking-widest text-[10px]">
          <Clock :size="18" /> Inscriptions Site
          <Badge v-if="dbStudents.length" class="ml-auto bg-emerald-600 text-[9px]">{{ dbStudents.length }}</Badge>
        </Button>
        <Button variant="ghost" @click="activeTab = 'classes'"
          :class="[activeTab === 'classes' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-4 h-12 font-bold uppercase tracking-widest text-[10px]">
          <Video :size="18" /> Salles Zoom
        </Button>
        <Button variant="ghost" @click="activeTab = 'finance'"
          :class="[activeTab === 'finance' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-4 h-12 font-bold uppercase tracking-widest text-[10px]">
          <DollarSign :size="18" /> Facturation
        </Button>
      </nav>

      <div class="p-8 border-t border-white/5 space-y-4">
        <div class="flex items-center gap-3">
          <Avatar class="h-8 w-8 ring-2 ring-emerald-500/20">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div class="flex flex-col">
            <span class="text-[10px] font-black uppercase text-white leading-tight">Admin ISHES</span>
            <span class="text-[9px] text-slate-500 font-bold uppercase">Connecté</span>
          </div>
        </div>
        <Button variant="ghost" class="w-full justify-start gap-3 p-0 h-auto text-[10px] font-black uppercase text-slate-500 hover:text-rose-400 transition-colors" @click="handleLogout">
          <LogOut :size="14" /> Déconnexion
        </Button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-12 overflow-y-auto">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic underline decoration-emerald-500/30">
            {{ activeTab === 'students' ? 'Gestion des Éleves' : activeTab === 'vitrine' ? 'Flux Vitrine' : activeTab === 'classes' ? 'Classes Actives' : 'Chiffre d\'Affaires' }}
          </h2>
          <p class="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">Contrôle complet de l'établissement</p>
        </div>
        
        <div class="flex items-center gap-3">
          <!-- Search Bar (Uniquement pour registre) -->
          <div v-if="activeTab === 'students'" class="relative w-64">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
            <Input v-model="searchQuery" placeholder="Chercher un élève..." class="pl-10 h-11 bg-white border-slate-200 rounded-xl" />
          </div>
          <Button class="bg-[#0F172A] hover:bg-emerald-600 text-white font-black text-[10px] h-11 px-8 uppercase shadow-xl">
             <Plus :size="18" class="mr-2" /> {{ activeTab === 'classes' ? 'Nouvelle Classe' : 'Ajouter Éleve' }}
          </Button>
        </div>
      </div>

      <!-- --- VUE 1 : REGISTRE ÉLÈVES AVEC FILTRES --- -->
      <div v-if="activeTab === 'students'" class="space-y-6">
        <!-- Filtres Rapides -->
        <div class="flex flex-wrap gap-2 mb-4">
          <Button 
            v-for="f in ['Tous', 'Arabe', 'Tajwid', 'Enfants']" 
            :key="f"
            variant="ghost" 
            @click="selectedFilter = f"
            :class="[selectedFilter === f ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-500 hover:bg-slate-50']"
            class="h-9 px-6 rounded-full font-black text-[9px] uppercase tracking-widest transition-all">
            {{ f }}
          </Button>
        </div>

        <Card class="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
          <CardContent class="p-0 overflow-x-auto">
            <Table>
              <TableHeader class="bg-slate-50/50">
                <TableRow class="border-b border-slate-100 h-14">
                  <TableHead class="pl-10 font-black uppercase text-[9px] text-slate-400 tracking-widest">Identité</TableHead>
                  <TableHead class="font-black uppercase text-[9px] text-slate-400 tracking-widest">Formation</TableHead>
                  <TableHead class="font-black uppercase text-[9px] text-slate-400 tracking-widest text-center">Statut</TableHead>
                  <TableHead class="text-right pr-10 font-black uppercase text-[9px] text-slate-400 tracking-widest">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="std in filteredStudents" :key="std.id" class="hover:bg-slate-50/50 border-b border-slate-50 last:border-none group">
                  <TableCell class="pl-10 py-5">
                    <div class="flex items-center gap-4">
                      <Avatar class="h-10 w-10 ring-2 ring-slate-100 group-hover:ring-emerald-400/30 transition-all">
                        <AvatarImage :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${std.name}`" />
                        <AvatarFallback>{{ std.name[0] }}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p class="font-black text-slate-900 text-sm leading-tight">{{ std.name }}</p>
                        <p class="text-[10px] text-slate-400 font-bold">{{ std.email }}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" class="border-slate-200 text-slate-600 bg-slate-50 font-black text-[9px] uppercase px-3 h-7">{{ std.plan }}</Badge>
                  </TableCell>
                  <TableCell class="text-center">
                    <Badge :class="std.status === 'Payé' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="border-none font-black text-[9px] uppercase px-4 h-7">
                      {{ std.status }}
                    </Badge>
                  </TableCell>
                  <TableCell class="text-right pr-10">
                    <Button variant="ghost" class="text-emerald-600 font-black text-[10px] uppercase hover:bg-emerald-50 px-4 h-9">Fiche Diplôme</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div v-if="filteredStudents.length === 0" class="p-20 text-center text-slate-300 font-black uppercase italic tracking-widest">Aucun élève trouvé.</div>
          </CardContent>
        </Card>
      </div>

      <!-- --- VUE 2 : FLUX VITRINE --- -->
      <div v-if="activeTab === 'vitrine'" class="space-y-6">
        <div v-if="isLoading" class="p-20 text-center text-slate-300 font-black uppercase tracking-[0.3em] text-sm italic">Lecture Base Supabase...</div>
        <div v-else-if="dbStudents.length === 0" class="p-32 text-center text-slate-400 font-black bg-white rounded-3xl border-2 border-dashed border-slate-100 uppercase text-xs italic">Aucune inscription en attente sur ishes.com.</div>
        
        <div v-else class="grid gap-4">
          <Card v-for="std in dbStudents" :key="std.id" class="border-none shadow-lg bg-white rounded-2xl overflow-hidden hover:translate-y-[-2px] transition-all">
            <div class="flex flex-col md:flex-row md:items-center justify-between p-8 gap-8">
              <div class="flex items-center gap-5">
                <div class="w-12 h-12 bg-[#0F172A] text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-xl">
                  {{ std.prenom[0] }}{{ std.nom[0] }}
                </div>
                <div>
                  <p class="font-black text-slate-900 text-lg uppercase tracking-tight">{{ std.prenom }} {{ std.nom }}</p>
                  <p class="text-xs text-slate-400 font-bold mt-1 italic">{{ std.email }} · {{ std.telephone }}</p>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <div class="text-right hidden sm:block">
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Programme Choisi</p>
                  <Badge class="bg-emerald-500 text-white font-black text-[10px] uppercase h-7 px-4 shadow-lg shadow-emerald-500/20">
                    {{ std.programme_id.replace('adult_', '').toUpperCase() }}
                  </Badge>
                </div>
                <div class="h-10 w-px bg-slate-100"></div>
                <div class="flex items-center gap-3">
                  <Button class="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] h-11 px-6 uppercase rounded-xl">Accepter & Classer</Button>
                  <Button variant="ghost" class="text-rose-400 hover:text-rose-600 h-11 w-11 p-0 rounded-xl hover:bg-rose-50"><AlertCircle :size="20" /></Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <!-- --- VUE 3 : CLASSES ACTIVES --- -->
      <div v-if="activeTab === 'classes'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card v-for="cls in classes" :key="cls.id" class="border-none shadow-xl bg-white rounded-3xl group overflow-hidden hover:shadow-2xl transition-all">
          <div class="h-2 bg-emerald-500"></div>
          <CardHeader class="p-8">
            <div class="flex items-center justify-between mb-4">
              <Badge class="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase px-3 h-7">{{ cls.students }} Elèves Actifs</Badge>
              <Video :size="18" class="text-slate-200 group-hover:text-emerald-500 transition-colors" />
            </div>
            <CardTitle class="text-[1.35rem] font-black text-slate-800 tracking-tight leading-none mb-2">{{ cls.name }}</CardTitle>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <School :size="12" class="text-emerald-500" /> {{ cls.teacher }}
            </p>
          </CardHeader>
          <CardContent class="px-8 pb-8">
            <div class="flex items-center gap-2 text-[12px] font-bold text-slate-600 italic mb-8">
              <Clock :size="14" class="text-emerald-500" /> {{ cls.days }}
            </div>
            <Button class="w-full bg-[#0F172A] hover:bg-emerald-600 text-white font-black text-[10px] uppercase h-14 gap-3 shadow-xl transition-all rounded-2xl">
              <Video :size="18" /> Lancer le Direct Zoom
            </Button>
          </CardContent>
        </Card>
      </div>

      <!-- --- VUE 4 : FINANCE / FACTURATION --- -->
      <div v-if="activeTab === 'finance'" class="space-y-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
           <Card class="border-none shadow-lg p-10 bg-emerald-600 text-white rounded-3xl relative overflow-hidden">
             <DollarSign class="absolute -right-4 -bottom-4 h-32 w-32 text-emerald-500/30" />
             <p class="text-[10px] font-black uppercase tracking-widest opacity-70 mb-4">Total Chiffre d'Affaires</p>
             <p class="text-5xl font-black tracking-tighter italic">44,672€</p>
             <p class="text-xs font-bold mt-4">+12.4% ce mois-ci</p>
           </Card>
           <Card class="border-none shadow-lg p-10 bg-white rounded-3xl">
             <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Paiements Réussis</p>
             <p class="text-4xl font-black text-slate-900 tracking-tighter">142</p>
             <p class="text-[10px] text-emerald-600 font-bold uppercase mt-4 flex items-center gap-2"><CheckCircle2 :size="14"/> Aucun litige en cours</p>
           </Card>
           <Card class="border-none shadow-lg p-10 bg-white rounded-3xl">
             <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Abandons / Échecs</p>
             <p class="text-4xl font-black text-slate-900 tracking-tighter">03</p>
             <p class="text-[10px] text-rose-500 font-bold uppercase mt-4 flex items-center gap-2"><AlertCircle :size="14"/> Relances envoyées</p>
           </Card>
        </div>

        <Card class="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
          <CardHeader class="p-10 border-b border-slate-50">
            <CardTitle class="text-xl font-black uppercase italic tracking-tight text-slate-800">Historique des Transactions</CardTitle>
          </CardHeader>
          <CardContent class="p-0 overflow-x-auto">
            <Table>
              <TableHeader class="bg-slate-50/50">
                <TableRow class="h-14">
                  <TableHead class="pl-10 font-black text-[9px] uppercase tracking-widest text-slate-400">Réf. Facture</TableHead>
                  <TableHead class="font-black text-[9px] uppercase tracking-widest text-slate-400">Élève</TableHead>
                  <TableHead class="font-black text-[9px] uppercase tracking-widest text-slate-400">Date</TableHead>
                  <TableHead class="text-right pr-10 font-black text-[9px] uppercase tracking-widest text-slate-400">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="inv in billing.success" :key="inv.id" class="h-16 border-b border-slate-50 last:border-none">
                  <TableCell class="pl-10 font-mono text-[10px] text-slate-400 font-bold">{{ inv.id }}</TableCell>
                  <TableCell class="font-bold text-slate-800 text-sm italic">{{ inv.student }}</TableCell>
                  <TableCell class="text-xs text-slate-400 font-bold uppercase">{{ inv.date }}</TableCell>
                  <TableCell class="text-right pr-10 font-black text-emerald-600 text-lg">{{ inv.amount }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

    </main>
  </div>
</template>
