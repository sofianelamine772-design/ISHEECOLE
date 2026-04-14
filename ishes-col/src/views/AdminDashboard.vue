<script setup>
import { ref, inject, reactive, onMounted } from 'vue'
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
  Video
} from 'lucide-vue-next'

const emit = defineEmits(['logout'])

// Injection des actions globales du logiciel
const state = inject('state')
const actions = inject('actions')

const activeTab = ref('students')

// --- RECUPERATION DONNEES VITRINE (SUPABASE) ---
const dbStudents = ref([])
const isLoading = ref(true)

const fetchFromVitrine = async () => {
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
  fetchFromVitrine()
})

const students = state.students
const classes = state.classes

const showMobileMenu = ref(false)

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 antialiased overflow-hidden">
    <!-- Menu Mobile Toggle -->
    <div v-if="showMobileMenu" @click="showMobileMenu = false" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"></div>

    <!-- Sidebar Mini -->
    <aside 
      :class="[showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0']"
      class="fixed inset-y-0 left-0 w-64 bg-[#0F172A] text-white z-50 md:relative md:flex flex-col border-r border-slate-200 transition-transform">
      
      <div class="p-8 border-b border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <School :size="16" />
          </div>
          <h1 class="text-lg font-black tracking-tight uppercase italic">ISHEE<span class="text-emerald-400">COLE</span></h1>
        </div>
      </div>

      <nav class="flex-1 px-4 mt-8 space-y-1">
        <Button variant="ghost" @click="activeTab = 'students'; showMobileMenu = false"
          :class="[activeTab === 'students' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-11 font-bold uppercase tracking-widest text-[9px]">
          <Users :size="16" /> Base Élèves
        </Button>
        <Button variant="ghost" @click="activeTab = 'vitrine'; showMobileMenu = false"
          :class="[activeTab === 'vitrine' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-11 font-bold uppercase tracking-widest text-[9px]">
          <Clock :size="16" /> Flux Vitrine
          <Badge v-if="dbStudents.length" class="ml-auto bg-emerald-600 text-[8px] h-4">{{ dbStudents.length }}</Badge>
        </Button>
        <Button variant="ghost" @click="activeTab = 'classes'; showMobileMenu = false"
          :class="[activeTab === 'classes' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5']"
          class="w-full justify-start gap-3 h-11 font-bold uppercase tracking-widest text-[9px]">
          <Video :size="16" /> Salles Zoom
        </Button>
      </nav>

      <div class="p-6">
        <Button variant="ghost" class="w-full justify-start gap-3 p-0 text-[9px] font-bold uppercase text-slate-500 hover:text-rose-400 transition-colors" @click="handleLogout">
          <LogOut :size="14" /> Déconnecter
        </Button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-12 overflow-y-auto">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h2 class="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
            {{ activeTab === 'students' ? 'Régistre Élèves' : activeTab === 'vitrine' ? 'Inscriptions Site' : 'Gestion des Classes' }}
          </h2>
          <p class="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Gestion Arabe & Coran · ISHEECOLE v1.2</p>
        </div>
        <Button v-if="activeTab === 'students'" class="bg-[#0F172A] hover:bg-emerald-600 text-white font-black text-[9px] uppercase h-10 px-6 gap-2">
          <Plus :size="14" /> Ajouter Manuellement
        </Button>
      </div>

      <!-- --- VUE 1 : REGISTRE ELEVES (SIMPLE) --- -->
      <div v-if="activeTab === 'students'">
        <Card class="border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent class="p-0">
            <Table>
              <TableHeader class="bg-slate-50/50">
                <TableRow>
                  <TableHead class="pl-8 py-4 font-black uppercase text-[8px] text-slate-400">Élève</TableHead>
                  <TableHead class="font-black uppercase text-[8px] text-slate-400">Cours</TableHead>
                  <TableHead class="font-black uppercase text-[8px] text-slate-400">État</TableHead>
                  <TableHead class="text-right pr-8 font-black uppercase text-[8px] text-slate-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 <TableRow v-for="std in students" :key="std.id" class="hover:bg-slate-50/30 border-b border-slate-50">
                  <TableCell class="pl-8 py-4">
                    <div class="flex items-center gap-3">
                      <Avatar class="h-8 w-8 ring-1 ring-slate-100">
                        <AvatarImage :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${std.name}`" />
                        <AvatarFallback>{{ std.name[0] }}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p class="font-bold text-slate-800 text-xs">{{ std.name }}</p>
                        <p class="text-[9px] text-slate-400">{{ std.email }}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="ghost" class="bg-slate-100 text-slate-500 font-black text-[8px] uppercase px-2">{{ std.plan }}</Badge>
                  </TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <div :class="std.status === 'Payé' ? 'bg-emerald-500' : 'bg-rose-500'" class="w-1.5 h-1.5 rounded-full"></div>
                      <span class="text-[9px] font-bold uppercase text-slate-600">{{ std.status }}</span>
                    </div>
                  </TableCell>
                  <TableCell class="text-right pr-8">
                    <Button variant="ghost" class="h-8 text-emerald-600 font-black text-[8px] uppercase hover:bg-emerald-50 px-3">Modifier</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <!-- --- VUE 2 : FLUX VITRINE (SUPABASE) --- -->
      <div v-if="activeTab === 'vitrine'" class="space-y-4">
        <div v-if="isLoading" class="p-20 text-center text-slate-300 font-black uppercase tracking-[0.2em] text-[10px] italic underline decoration-slate-200 decoration-2">Lecture de Supabase...</div>
        <div v-else-if="dbStudents.length === 0" class="p-20 text-center text-slate-400 font-medium bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">Aucune nouvelle inscription détectée sur le site.</div>
        
        <Card v-for="std in dbStudents" :key="std.id" class="border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-xl overflow-hidden group">
          <div class="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black text-xs group-hover:bg-emerald-500 group-hover:text-white transition-all">
                {{ std.prenom[0] }}{{ std.nom[0] }}
              </div>
              <div>
                <p class="font-black text-slate-900 text-sm uppercase italic">{{ std.prenom }} {{ std.nom }}</p>
                <p class="text-[9px] text-slate-400 font-bold mt-0.5">{{ std.email }} · {{ std.telephone }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Badge variant="outline" class="border-emerald-500/30 text-emerald-600 bg-emerald-50 font-black text-[8px] uppercase px-3 h-7">
                {{ std.programme_id.replace('adult_', '').replace('kids_', '').toUpperCase() }}
              </Badge>
              <Badge variant="ghost" class="text-slate-400 text-[8px] font-bold italic">{{ new Date(std.created_at).toLocaleDateString() }}</Badge>
              <div class="flex items-center gap-2 ml-4">
                <Button class="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[8px] h-8 px-4 uppercase rounded-lg">Accepter</Button>
                <Button variant="ghost" class="text-slate-300 hover:text-rose-500 h-8 w-8 p-0"><LogOut :size="14" /></Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- --- VUE 3 : CLASSES (DIRECT ACCESS) --- -->
      <div v-if="activeTab === 'classes'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="cls in classes" :key="cls.id" class="border-none shadow-sm bg-white rounded-2xl group overflow-hidden border border-slate-50">
          <CardHeader class="pb-4">
            <div class="flex items-center justify-between mb-3">
              <Badge class="bg-emerald-50 text-emerald-600 border-none font-bold text-[8px] uppercase">{{ cls.students }} élèves</Badge>
              <School :size="14" class="text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
            <CardTitle class="text-sm font-black text-slate-800 uppercase tracking-tight">{{ cls.name }}</CardTitle>
            <CardDescription class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ cls.teacher }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-[10px] font-bold text-slate-500 italic flex items-center gap-2 mb-6">
              <Calendar :size="12" class="text-emerald-400" /> {{ cls.days }}
            </p>
            <Button class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[9px] uppercase h-10 gap-2 shadow-lg shadow-emerald-500/10">
              <Video :size="14" /> Ouvrir la salle Zoom
            </Button>
          </CardContent>
        </Card>
      </div>

    </main>
  </div>
</template>
