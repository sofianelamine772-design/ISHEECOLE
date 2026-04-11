<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  User 
} from 'lucide-vue-next'

const emit = defineEmits(['logout'])

const student = {
  name: 'Sofiane Elamine',
  email: 'sofiane@ishes.com',
  avatar: 'https://github.com/shadcn.png',
  subscriptionStatus: 'Actif',
  expiryDate: '12 Juin 2026'
}

const courses = [
  { id: 1, title: 'Stratégie Digitale', teacher: 'Pr. Martin', progress: 85, nextClass: 'Demain, 10:00' },
  { id: 2, title: 'Intelligence Artificielle', teacher: 'Dr. Sarah', progress: 45, nextClass: 'Lundi, 14:00' },
  { id: 3, title: 'Gestion de Projet', teacher: 'M. Thomas', progress: 100, nextClass: 'Terminé' },
]

const recentGrades = [
  { subject: 'Marketing', score: '18/20', date: '10 Avril 2026' },
  { subject: 'Developpement Web', score: '19.5/20', date: '05 Avril 2026' },
  { subject: 'Design UI/UX', score: '17/20', date: '28 Mars 2026' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div class="p-6">
        <h1 class="text-2xl font-bold tracking-tight text-primary">ISHESCOL</h1>
      </div>
      <nav class="flex-1 px-4 space-y-2">
        <Button variant="secondary" class="w-full justify-start gap-3">
          <LayoutDashboard :size="20" /> Dashboard
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-muted-foreground">
          <BookOpen :size="20" /> Mes Cours
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-muted-foreground">
          <Calendar :size="20" /> Emploi du temps
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-muted-foreground">
          <Settings :size="20" /> Paramètres
        </Button>
      </nav>
      <div class="p-4 border-t border-slate-100">
        <Button variant="ghost" class="w-full justify-start gap-3 text-destructive hover:text-destructive" @click="emit('logout')">
          <LogOut :size="20" /> Déconnexion
        </Button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <h2 class="text-lg font-semibold">Panel Élève</h2>
        <div class="flex items-center gap-4">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium leading-none">{{ student.name }}</p>
            <p class="text-xs text-muted-foreground mt-1">{{ student.email }}</p>
          </div>
          <Avatar>
            <AvatarImage :src="student.avatar" />
            <AvatarFallback>SE</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <!-- Scrollable Area -->
      <div class="flex-1 overflow-y-auto p-8">
        <!-- Dashboard Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card class="border-none shadow-sm">
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-sm font-medium text-muted-foreground">Abonnement</CardTitle>
              <CreditCard class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold flex items-center gap-2">
                {{ student.subscriptionStatus }}
                <Badge variant="outline" class="bg-green-50 text-green-700 border-green-200">Pro</Badge>
              </div>
              <p class="text-xs text-muted-foreground mt-1">Expire le {{ student.expiryDate }}</p>
            </CardContent>
          </Card>
          <Card class="border-none shadow-sm">
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-sm font-medium text-muted-foreground">Cours en cours</CardTitle>
              <BookOpen class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">4</div>
              <p class="text-xs text-muted-foreground mt-1">2 nouveaux cette semaine</p>
            </CardContent>
          </Card>
          <Card class="border-none shadow-sm">
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-sm font-medium text-muted-foreground">Moyenne Générale</CardTitle>
              <CheckCircle2 class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">18.25/20</div>
              <p class="text-xs text-muted-foreground mt-1">+1.5 par rapport au mois dernier</p>
            </CardContent>
          </Card>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Courses -->
          <Card class="border-none shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle>Mes Cours Actuels</CardTitle>
              <CardDescription>Suivez votre progression en temps réel</CardDescription>
            </CardHeader>
            <CardContent class="p-0">
              <div v-for="course in courses" :key="course.id" class="p-6 border-t border-slate-50 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div class="space-y-1">
                  <p class="font-medium">{{ course.title }}</p>
                  <p class="text-sm text-muted-foreground">Enseignant: {{ course.teacher }}</p>
                </div>
                <div class="text-right">
                  <Badge variant="secondary" class="mb-2">{{ course.progress }}%</Badge>
                  <div class="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock :size="12" /> {{ course.nextClass }}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Grades Table -->
          <Card class="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Dernières Notes</CardTitle>
              <CardDescription>Vos derniers résultats d'examens</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Matière</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead class="text-right">Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="grade in recentGrades" :key="grade.subject">
                    <TableCell class="font-medium">{{ grade.subject }}</TableCell>
                    <TableCell>{{ grade.date }}</TableCell>
                    <TableCell class="text-right font-bold text-primary">{{ grade.score }}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
</template>
