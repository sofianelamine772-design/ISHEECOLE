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
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50"></div>
      <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50"></div>
    </div>

    <Card class="w-full max-w-md z-1 shadow-2xl border-none bg-white/80 backdrop-blur-sm">
      <CardHeader class="space-y-1 flex flex-col items-center">
        <div class="w-12 h-12 bg-primary flex items-center justify-center rounded-xl mb-4 text-white">
          <GraduationCap :size="28" />
        </div>
        <CardTitle class="text-3xl font-bold tracking-tight">ISHESCOL</CardTitle>
        <CardDescription class="text-muted-foreground text-center">
          Intelligence Strategy High Excellence School
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4 mt-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="nom@exemple.com" v-model="email" />
        </div>
        <div class="grid gap-2">
          <Label for="password">Mot de passe</Label>
          <Input id="password" type="password" v-model="password" />
        </div>
      </CardContent>
      <CardFooter class="flex flex-col gap-3 mt-4">
        <Button class="w-full text-lg h-11" @click="handleLogin('student')">
          Se connecter (Étudiant)
        </Button>
        <Button variant="outline" class="w-full border-slate-200" @click="handleLogin('admin')">
          Accès Administration
        </Button>
        <div class="mt-4 text-center text-sm text-muted-foreground">
          En vous connectant, vous acceptez nos <a href="#" class="underline underline-offset-4 hover:text-primary">Conditions d'utilisation</a>.
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
