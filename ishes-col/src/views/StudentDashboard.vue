<script setup>
import { ref, inject } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
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
  User,
  School
} from 'lucide-vue-next'

const emit = defineEmits(['logout'])
const actions = inject('actions')

const student = {
  name: 'Sofiane Elamine',
  email: 'sofiane@ishes.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofiane',
  subscriptionStatus: 'Actif',
  expiryDate: '12 Juin 2026'
}

const handleSubscribe = (plan, amount) => {
  actions.addPayment({
    student: student.name,
    date: new Date().toLocaleDateString('fr-FR'),
    amount: amount,
    method: 'Carte Bancaire',
    status: 'success'
  })
  showPaymentModal.value = false
  alert('Paiement réussi ! Bienvenue dans le plan Premium.')
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
const showPaymentModal = ref(false)
const notifications = ref([
  { id: 1, title: 'Nouveau cours disponible', desc: 'Le cours d\'IA est en ligne.', time: 'il y a 2h', read: false },
  { id: 2, title: 'Rappel de paiement', desc: 'Votre abonnement expire bientôt.', time: 'il y a 1j', read: true },
])
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Payment Modal Overlay -->
    <Transition name="fade">
      <div v-if="showPaymentModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
        <Card class="w-full max-w-xl shadow-2xl border-none">
          <CardHeader class="text-center">
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard :size="24" />
            </div>
            <CardTitle class="text-2xl">Passer au plan Premium</CardTitle>
            <CardDescription>Débloquez l'accès illimité à tous nos cours et certifications.</CardDescription>
          </CardHeader>
          <CardContent class="grid md:grid-cols-2 gap-4">
            <div class="p-6 rounded-2xl border-2 border-slate-100 hover:border-primary transition-all cursor-pointer group">
              <p class="text-sm font-bold text-muted-foreground uppercase">Mensuel</p>
              <p class="text-3xl font-black mt-2">29€<span class="text-sm font-medium text-muted-foreground">/mois</span></p>
              <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
                <li class="flex items-center gap-2"><CheckCircle2 :size="14" class="text-green-500" /> Accès standard</li>
                <li class="flex items-center gap-2"><CheckCircle2 :size="14" class="text-green-500" /> Support 24/7</li>
              </ul>
            </div>
            <div class="p-6 rounded-2xl border-2 border-primary bg-primary/5 relative overflow-hidden">
              <div class="absolute top-2 right-2">
                <Badge class="bg-primary text-white border-none">Économique</Badge>
              </div>
              <p class="text-sm font-bold text-primary uppercase">Annuel</p>
              <p class="text-3xl font-black mt-2">299€<span class="text-sm font-medium text-muted-foreground">/an</span></p>
              <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
                <li class="flex items-center gap-2"><CheckCircle2 :size="14" class="text-green-500" /> 2 mois offerts</li>
                <li class="flex items-center gap-2"><CheckCircle2 :size="14" class="text-green-500" /> Certificats VIP</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter class="flex gap-3 mt-2">
            <Button variant="outline" class="flex-1" @click="showPaymentModal = false">Plus tard</Button>
            <Button class="flex-1 bg-primary text-lg h-11" @click="handleSubscribe('Premium', '299€')">S'abonner maintenant</Button>
          </CardFooter>
        </Card>
      </div>
    </Transition>

    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div class="p-6">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <School :size="18" />
          </div>
          <h1 class="text-xl font-bold tracking-tight text-slate-900 uppercase">ISHESCOL</h1>
        </div>
      </div>
      <nav class="flex-1 px-4 space-y-2">
        <Button variant="secondary" class="w-full justify-start gap-3 bg-slate-900 text-white hover:bg-slate-800">
          <LayoutDashboard :size="20" /> Dashboard
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-muted-foreground">
          <BookOpen :size="20" /> Mes Cours
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-muted-foreground">
          <Calendar :size="20" /> Emploi du temps
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-muted-foreground" @click="showPaymentModal = true">
          <CreditCard :size="20" /> Abonnement
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
        <h2 class="text-lg font-semibold text-slate-700">Panel Élève</h2>
        <div class="flex items-center gap-6">
          <!-- Notification Bell -->
          <div class="relative cursor-pointer group">
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">2</div>
            <Calendar :size="22" class="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          
          <div class="flex items-center gap-4 border-l border-slate-100 pl-6 text-left">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-bold leading-none">{{ student.name }}</p>
              <p class="text-xs text-muted-foreground mt-1">{{ student.email }}</p>
            </div>
            <Avatar class="h-9 w-9 border-2 border-slate-100">
              <AvatarImage :src="student.avatar" />
              <AvatarFallback>SE</AvatarFallback>
            </Avatar>
          </div>
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
