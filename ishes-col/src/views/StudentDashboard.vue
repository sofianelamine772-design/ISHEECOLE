<script setup>
import { ref, inject } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  User,
  School,
  Video,
  MessageCircle,
  FileText,
  PlayCircle
} from 'lucide-vue-next'

const emit = defineEmits(['logout'])
const actions = inject('actions')

// Données fictives pour l'étudiant (pourrait venir de Supabase plus tard)
const student = {
  name: 'Sofiane Elamine',
  email: 'sofiane@ishes.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofiane',
  program: 'Arabe Adults (Standard)',
  status: 'Inscrit & Payé',
  level: 'Niveau 1 - Alpha',
  whatsappUrl: '#',
  zoomUrl: 'https://zoom.us/j/example'
}

const myCourses = [
  { id: 1, title: 'Alphabet & Phonétique (Arabe)', teacher: 'Pr. Abdelkrim', nextSession: 'Mardi 19h00', location: 'Zoom Live' },
  { id: 2, title: 'Tajwid & Récitation', teacher: 'Cheikh Youssef', nextSession: 'Samedi 10h00', location: 'Zoom Live' },
]

const recentReplays = [
  { id: 'r1', title: 'Cours 4 : Les lettres emphatiques', date: 'Hier', duration: '1h20' },
  { id: 'r2', title: 'Cours 3 : Les voyelles courtes', date: 'Il y a 1 semaine', duration: '1h15' },
]

const showMobileMenu = ref(false)

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex overflow-hidden font-sans antialiased text-slate-900">
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
          <h1 class="text-xl font-black tracking-tight uppercase italic">ISHEE<span class="text-emerald-400">COLE</span></h1>
        </div>
      </div>

      <nav class="flex-1 px-6 mt-8 space-y-1 relative z-10">
        <Button variant="ghost" class="w-full justify-start gap-4 h-12 bg-emerald-500 text-white font-bold uppercase tracking-widest text-[10px]">
          <LayoutDashboard :size="18" /> Mon Espace Arabe
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-4 h-12 text-slate-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">
          <PlayCircle :size="18" /> Mes Replays
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-4 h-12 text-slate-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">
          <FileText :size="18" /> Supports PDF
        </Button>
      </nav>

      <div class="p-8 relative z-10 border-t border-white/5">
        <div class="flex items-center gap-3 mb-6">
          <Avatar class="h-10 w-10 ring-2 ring-emerald-500/20">
            <AvatarImage :src="student.avatar" />
            <AvatarFallback>SE</AvatarFallback>
          </Avatar>
          <div class="overflow-hidden">
            <p class="text-xs font-black uppercase truncate text-white">{{ student.name }}</p>
            <p class="text-[9px] text-slate-500 font-bold uppercase tracking-widest truncate">{{ student.program }}</p>
          </div>
        </div>
        <Button variant="ghost" class="w-full justify-start gap-3 p-0 h-auto text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors" @click="handleLogout">
          <LogOut :size="16" /> Se Déconnecter
        </Button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Header -->
      <header class="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-12">
        <div class="flex items-center gap-4">
          <Button variant="ghost" @click="showMobileMenu = true" class="md:hidden p-0 h-10 w-10 text-slate-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </Button>
          <h2 class="text-xl font-black text-slate-900 tracking-tighter uppercase italic underline decoration-emerald-500/30">Bienvenue <span class="text-emerald-600">Al-Talib.</span></h2>
        </div>
        <div class="flex items-center gap-4">
          <Badge class="bg-emerald-50 text-emerald-700 border-none font-bold text-[10px] uppercase shadow-sm px-4 h-8 flex items-center gap-2">
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Session Active
          </Badge>
        </div>
      </header>

      <!-- Scrollable Area -->
      <div class="flex-1 overflow-y-auto p-6 md:p-12">
        <!-- Dashboard Header -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card class="lg:col-span-2 border-none shadow-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-2 overflow-hidden relative group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <CardContent class="p-10 relative z-10">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <Badge variant="outline" class="border-emerald-500/50 text-emerald-400 font-bold uppercase text-[9px] mb-4">Prochain cours en direct</Badge>
                  <h3 class="text-4xl font-black tracking-tighter mb-2 italic">Alphabet & Phonétique</h3>
                  <p class="text-slate-400 font-bold text-sm flex items-center gap-2">
                    <Calendar :size="16" class="text-emerald-500" /> Mardi prochain à 19h00 (Heure France)
                  </p>
                </div>
                <div class="flex flex-col gap-3">
                  <a :href="student.zoomUrl" target="_blank">
                    <Button class="bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-xs h-14 px-8 shadow-xl shadow-emerald-500/20 gap-3 group">
                      <Video :size="20" class="group-hover:scale-110 transition-transform" /> Rejoindre la salle de classe
                    </Button>
                  </a>
                  <a :href="student.whatsappUrl" target="_blank" class="w-full">
                    <Button variant="outline" class="w-full border-white/10 hover:bg-white/5 text-white font-bold uppercase text-[10px] h-11 gap-3">
                      <MessageCircle :size="18" class="text-emerald-400" /> Groupe WhatsApp Classe
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card class="border-none shadow-sm bg-white p-1">
            <CardHeader>
              <CardTitle class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Votre Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-center py-6">
                <div class="relative inline-flex items-center justify-center mb-6">
                   <svg class="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" class="text-slate-100" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="10" fill="transparent" stroke-dasharray="364.4" stroke-dashoffset="109.3" class="text-emerald-500" />
                   </svg>
                   <div class="absolute flex flex-col items-center">
                     <p class="text-3xl font-black text-slate-900 tracking-tighter">Level 1</p>
                     <p class="text-[10px] font-bold text-slate-400 uppercase">Alpha</p>
                   </div>
                </div>
                <p class="text-[11px] font-bold text-slate-500 uppercase leading-relaxed tracking-tight underline decoration-emerald-200">Encore 4 cours pour <br/> valider le module Alphabet</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Replays */}
          <Card class="border-none shadow-sm overflow-hidden bg-white rounded-2xl">
            <CardHeader class="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle class="text-lg font-black text-slate-800 uppercase italic">Replays <span class="text-emerald-500">Récents</span></CardTitle>
                <CardDescription class="text-[10px] font-bold uppercase text-slate-400 mt-1">Regardez les cours manqués</CardDescription>
              </div>
              <Button variant="ghost" class="text-emerald-600 font-bold text-[10px] uppercase">Tout voir</Button>
            </CardHeader>
            <CardContent class="p-0">
              <div v-for="video in recentReplays" :key="video.id" class="p-6 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50/50 transition-all cursor-pointer group">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <PlayCircle :size="24" />
                  </div>
                  <div>
                    <p class="font-bold text-slate-800 text-sm">{{ video.title }}</p>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{{ video.date }} · {{ video.duration }}</p>
                  </div>
                </div>
                <Button variant="ghost" class="text-slate-300 group-hover:text-emerald-500">
                   <Clock :size="18" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Supports */}
          <Card class="border-none shadow-sm bg-white rounded-2xl overflow-hidden shadow-emerald-500/5">
            <CardHeader class="p-8 border-b border-slate-50">
              <CardTitle class="text-lg font-black text-slate-800 uppercase italic">Téléchargements <span class="text-blue-500">PDF</span></CardTitle>
              <CardDescription class="text-[10px] font-bold uppercase text-slate-400 mt-1">Supports de cours & Exercices</CardDescription>
            </CardHeader>
            <CardContent class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer flex flex-col gap-4">
                  <FileText :size="32" class="text-blue-500" />
                  <div>
                    <p class="font-black text-slate-800 text-sm leading-tight">Manuel d'Arabe - Alpha</p>
                    <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">PDF · 12 Mo</p>
                  </div>
                </div>
                <div class="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer flex flex-col gap-4">
                  <CheckCircle2 :size="32" class="text-emerald-500" />
                  <div>
                    <p class="font-black text-slate-800 text-sm leading-tight">Cahier d'Exercices 01</p>
                    <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">PDF · 5 Mo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
</template>
