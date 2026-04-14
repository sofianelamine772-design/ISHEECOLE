<script setup>
import { ref, inject } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  LogOut, 
  School,
  Video,
  MessageCircle,
  FileText,
  PlayCircle
} from 'lucide-vue-next'

const emit = defineEmits(['logout'])

// Données fictives (Simulées)
const student = {
  name: 'Sofiane Elamine',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofiane',
  program: 'Arabe Adults (Standard)',
  zoomUrl: '#',
  whatsappUrl: '#',
  replaysUrl: '#',
  docsUrl: '#'
}

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="min-h-screen bg-[#FDFDFF] font-sans antialiased text-slate-900 flex flex-col">
    <!-- Header Minimaliste -->
    <header class="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-12 shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-white shadow-xl">
          <School :size="20" />
        </div>
        <h1 class="text-xl font-black tracking-tight uppercase italic">ISHEE<span class="text-emerald-500">COLE</span></h1>
      </div>
      <Button variant="ghost" class="text-slate-400 hover:text-rose-500 font-bold uppercase text-[9px] tracking-widest gap-2" @click="handleLogout">
        <LogOut :size="16" /> Se Déconnecter
      </Button>
    </header>

    <!-- Corps de la page (Sans scroll si possible) -->
    <main class="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-5xl mx-auto w-full">
      
      <!-- Accueil -->
      <div class="text-center mb-12">
        <Avatar class="h-24 w-24 mx-auto mb-6 ring-4 ring-emerald-500/10 shadow-2xl">
          <AvatarImage :src="student.avatar" />
          <AvatarFallback>SE</AvatarFallback>
        </Avatar>
        <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">
          Bonjour <span class="text-emerald-600">{{ student.name }}</span>,
        </h2>
        <p class="text-lg text-slate-400 font-medium italic">Voici votre interface élève ISHEECOLE.</p>
        <div class="mt-4 flex items-center justify-center gap-2">
          <span class="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">{{ student.program }}</span>
        </div>
      </div>

      <!-- Actions Principales (Grid 2x2) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <!-- COURS EN DIRECT -->
        <a :href="student.zoomUrl" class="group">
          <Card class="border-none shadow-lg bg-[#0F172A] text-white hover:bg-emerald-600 transition-all duration-300 rounded-[2rem] overflow-hidden">
            <CardContent class="p-8 flex items-center gap-6">
              <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video :size="32" class="text-emerald-400" />
              </div>
              <div>
                <p class="text-xl font-black uppercase italic tracking-tight">Accès Direct</p>
                <p class="text-[11px] font-bold text-slate-400 group-hover:text-white/80 uppercase tracking-widest">Rejoindre le cours Zoom</p>
              </div>
            </CardContent>
          </Card>
        </a>

        <!-- REPLAYS -->
        <a :href="student.replaysUrl" class="group">
          <Card class="border-none shadow-lg bg-white hover:shadow-2xl transition-all duration-300 rounded-[2rem] overflow-hidden border border-slate-50">
            <CardContent class="p-8 flex items-center gap-6">
              <div class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all">
                <PlayCircle :size="32" />
              </div>
              <div>
                <p class="text-xl font-black uppercase italic tracking-tight">Mes Replays</p>
                <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Visionner les cours passés</p>
              </div>
            </CardContent>
          </Card>
        </a>

        <!-- DOCUMENTS -->
        <a :href="student.docsUrl" class="group">
          <Card class="border-none shadow-lg bg-white hover:shadow-2xl transition-all duration-300 rounded-[2rem] overflow-hidden border border-slate-50">
            <CardContent class="p-8 flex items-center gap-6">
              <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all">
                <FileText :size="32" />
              </div>
              <div>
                <p class="text-xl font-black uppercase italic tracking-tight">Supports PDF</p>
                <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Manuels & Exercices</p>
              </div>
            </CardContent>
          </Card>
        </a>

        <!-- WHATSAPP -->
        <a :href="student.whatsappUrl" class="group">
          <Card class="border-none shadow-lg bg-white hover:shadow-2xl transition-all duration-300 rounded-[2rem] overflow-hidden border border-slate-50">
            <CardContent class="p-8 flex items-center gap-6">
              <div class="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all">
                <MessageCircle :size="32" />
              </div>
              <div>
                <p class="text-xl font-black uppercase italic tracking-tight">Groupe Classe</p>
                <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Échanger sur WhatsApp</p>
              </div>
            </CardContent>
          </Card>
        </a>
      </div>

      <!-- Footer Info -->
      <p class="mt-16 text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Propulsé par ISHEECOLE Management</p>

    </main>
  </div>
</template>
