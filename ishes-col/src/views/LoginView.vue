<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GraduationCap } from 'lucide-vue-next'

const emit = defineEmits(['login'])
const email = ref('')
const password = ref('')

const handleLogin = (role) => {
  emit('login', role)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden font-sans">
    <!-- Subtle Background Highlights -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-100/50 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-50/50 rounded-full blur-[120px]"></div>
    </div>

    <Card class="w-full max-w-md z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-200/60 bg-white/90 backdrop-blur-xl">
      <CardHeader class="space-y-1 flex flex-col items-center pb-8 border-b border-slate-50">
        <div class="w-16 h-16 bg-[#065F46] flex items-center justify-center rounded-2xl mb-4 text-white shadow-[0_10px_30px_rgba(6,95,70,0.3)]">
          <GraduationCap :size="32" />
        </div>
        <CardTitle class="text-3xl font-black tracking-tight text-slate-900 uppercase italic">ISHEE<span class="text-emerald-600">COLE</span></CardTitle>
        <CardDescription class="text-slate-400 text-center font-bold mt-2 text-[10px] tracking-[0.2em] uppercase leading-relaxed">
          Intelligence Strategy <br/> High Excellence School
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6 mt-8">
        <div class="grid gap-2">
          <Label for="email" class="text-slate-400 font-bold uppercase text-[9px] tracking-widest pl-1">Identifiant Email</Label>
          <Input id="email" type="email" placeholder="nom@exemple.com" v-model="email" class="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-11 focus-visible:ring-emerald-500" />
        </div>
        <div class="grid gap-2">
          <Label for="password" class="text-slate-400 font-bold uppercase text-[9px] tracking-widest pl-1">Mot de passe</Label>
          <Input id="password" type="password" v-model="password" class="bg-slate-50 border-slate-200 text-slate-900 h-11 focus-visible:ring-emerald-500" />
        </div>
      </CardContent>
      <CardFooter class="flex flex-col gap-4 mt-6">
        <Button class="w-full text-sm font-bold h-12 bg-emerald-600 hover:bg-[#022C22] text-white shadow-[0_10px_20px_rgba(5,150,105,0.2)] transition-all hover:translate-y-[-2px] uppercase tracking-widest" @click="handleLogin('student')">
          Espace Étudiant
        </Button>
        <div class="flex items-center w-full gap-4">
          <div class="h-px flex-1 bg-slate-100"></div>
          <span class="text-[9px] uppercase font-bold text-slate-300">ou</span>
          <div class="h-px flex-1 bg-slate-100"></div>
        </div>
        <Button variant="outline" class="w-full border-slate-200 bg-white text-slate-600 hover:bg-slate-50 h-12 font-bold uppercase tracking-widest text-[10px]" @click="handleLogin('admin')">
          Portail Administration
        </Button>
        <div class="mt-8 text-center text-[9px] text-slate-400 uppercase tracking-widest font-medium leading-loose">
          Plateforme sécurisée <br/> &copy; 2026 ISHEECOLE - TOUS DROITS RÉSERVÉS
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
