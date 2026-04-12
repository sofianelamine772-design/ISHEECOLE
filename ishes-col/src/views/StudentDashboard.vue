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
const showMobileMenu = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
    <!-- Overlay for mobile menu -->
    <div v-if="showMobileMenu" @click="showMobileMenu = false" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"></div>

    <!-- Payment Modal Overlay -->
    <Transition name="fade">
      <div v-if="showPaymentModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
        <Card class="w-full max-w-xl shadow-2xl border-none overflow-hidden">
          <CardHeader class="text-center p-8 bg-white border-b border-slate-50">
            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CreditCard :size="32" />
            </div>
            <CardTitle class="text-[2rem] font-black tracking-tight text-slate-900 uppercase italic">ISHEE<span class="text-blue-600">PREMIUM</span></CardTitle>
            <CardDescription class="text-slate-400 font-bold uppercase text-[9px] tracking-[0.2em] mt-3">Débloquez l'accès illimité à l'excellence</CardDescription>
          </CardHeader>
          <CardContent class="grid md:grid-cols-2 gap-6 p-8 bg-white">
            <div @click="handleSubscribe('Basic', '29€')" class="p-8 rounded-[2rem] border-2 border-slate-100 hover:border-blue-500 transition-all cursor-pointer group bg-slate-50/50">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Abonnement Mensuel</p>
              <p class="text-4xl font-black text-slate-900">29€<span class="text-sm font-medium text-slate-400">/mois</span></p>
              <ul class="mt-6 space-y-3 text-sm text-slate-500 font-medium">
                <li class="flex items-center gap-3"><CheckCircle2 :size="16" class="text-blue-500" /> Accès standard</li>
                <li class="flex items-center gap-3"><CheckCircle2 :size="16" class="text-blue-500" /> Support 24/7</li>
              </ul>
            </div>
            <div @click="handleSubscribe('Premium', '299€')" class="p-8 rounded-[2rem] border-2 border-blue-600 bg-blue-50 relative overflow-hidden cursor-pointer shadow-lg shadow-blue-500/10">
              <div class="absolute top-4 right-4">
                <Badge class="bg-blue-600 text-white border-none font-bold text-[9px] uppercase tracking-widest px-3">Recommandé</Badge>
              </div>
              <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-4">Abonnement Annuel</p>
              <p class="text-4xl font-black text-slate-900">299€<span class="text-sm font-medium text-slate-400">/an</span></p>
              <ul class="mt-6 space-y-3 text-sm text-slate-500 font-medium">
                <li class="flex items-center gap-3 font-bold text-blue-700"><CheckCircle2 :size="16" /> 2 mois offerts</li>
                <li class="flex items-center gap-3"><CheckCircle2 :size="16" class="text-blue-500" /> Certificats certifiés</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter class="flex gap-4 p-8 bg-slate-50/50 border-t border-slate-100">
            <Button variant="ghost" class="flex-1 font-bold text-slate-400 uppercase tracking-widest text-[10px]" @click="showPaymentModal = false">Annuler</Button>
            <Button class="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs h-12 shadow-lg shadow-blue-600/20" @click="handleSubscribe('Premium', '299€')">Accéder au Premium</Button>
          </CardFooter>
        </Card>
      </div>
    </Transition>

    <!-- Sidebar -->
    <aside 
      :class="[showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0']"
      class="fixed inset-y-0 left-0 w-72 bg-[#0F172A] text-white z-50 md:relative md:flex flex-col overflow-hidden transition-transform duration-300 ease-in-out">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
      
      <div class="p-10 relative z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <School :size="20" />
          </div>
          <h1 class="text-2xl font-black tracking-tighter uppercase italic text-white">ISHEE<span class="text-blue-400">COLE</span></h1>
        </div>
        <p class="text-[9px] text-slate-500 mt-3 uppercase tracking-[0.4em] font-black pl-1">Student Portal v1</p>
      </div>

      <nav class="flex-1 px-6 mt-6 space-y-2 relative z-10">
        <Button variant="ghost" @click="showMobileMenu = false" class="w-full justify-start gap-3 h-12 bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold uppercase tracking-widest text-[10px]">
          <LayoutDashboard :size="20" /> Dashboard
        </Button>
        <Button variant="ghost" @click="showMobileMenu = false" class="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">
          <BookOpen :size="20" /> Mes Cours
        </Button>
        <Button variant="ghost" @click="showMobileMenu = false" class="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">
          <Calendar :size="20" /> Emploi du temps
        </Button>
        <Button variant="ghost" @click="showPaymentModal = true; showMobileMenu = false" class="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">
          <CreditCard :size="20" /> Abonnement
        </Button>
        <Button variant="ghost" @click="showMobileMenu = false" class="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">
          <Settings :size="20" /> Paramètres
        </Button>
      </nav>

      <div class="p-8 relative z-10">
        <Button variant="ghost" class="w-full justify-start gap-3 h-12 text-slate-500 hover:text-red-400 font-bold uppercase tracking-widest text-[10px]" @click="emit('logout')">
          <LogOut :size="20" /> Déconnexion
        </Button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Header -->
      <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-12">
        <div class="flex items-center gap-4">
          <Button variant="ghost" @click="showMobileMenu = true" class="md:hidden p-0 h-10 w-10 text-slate-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </Button>
          <h2 class="text-xl font-black text-slate-900 tracking-tight uppercase italic hidden sm:block">Pilotage <span class="text-blue-600">Élève.</span></h2>
          <h2 class="text-lg font-black text-blue-600 tracking-tight uppercase italic sm:hidden">Dashboard.</h2>
        </div>
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
      <div class="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12">
        <!-- Dashboard Content -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card class="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Abonnement</CardTitle>
              <CreditCard class="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-black text-slate-900 mt-2">
                {{ student.subscriptionStatus }}
                <Badge variant="outline" class="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px] font-black uppercase tracking-widest ml-2 px-2">Pro</Badge>
              </div>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-2 italic">Expire le {{ student.expiryDate }}</p>
            </CardContent>
          </Card>
          <Card class="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Cours en cours</CardTitle>
              <BookOpen class="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-black text-slate-900 mt-2">4</div>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-2 italic">2 nouveaux cette semaine</p>
            </CardContent>
          </Card>
          <Card class="border-none shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Moyenne Générale</CardTitle>
              <CheckCircle2 class="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-black text-slate-900 mt-2">18.25/20</div>
              <p class="text-[10px] text-emerald-600 font-bold uppercase tracking-tight mt-2 italic flex items-center gap-1"><TrendingUp :size="10" /> +1.5 pts / mois dernier</p>
            </CardContent>
          </Card>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          {/* Courses */}
          <Card class="border-none shadow-sm overflow-hidden bg-white rounded-[2rem]">
            <CardHeader class="p-8 pb-4">
              <CardTitle class="text-xl font-black text-slate-800 uppercase italic">Mes Cours <span class="text-blue-600">Actuels</span></CardTitle>
              <CardDescription class="text-slate-400 font-medium">Suivez votre progression en temps réel</CardDescription>
            </CardHeader>
            <CardContent class="p-0">
              <div v-for="course in courses" :key="course.id" class="p-8 border-t border-slate-50 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                <div class="space-y-1">
                  <p class="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{{ course.title }}</p>
                  <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Enseignant: {{ course.teacher }}</p>
                </div>
                <div class="text-right">
                  <Badge class="bg-blue-600 text-white border-none font-bold text-[10px] mb-2 px-3">{{ course.progress }}%</Badge>
                  <div class="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                    <Clock :size="12" class="text-blue-400" /> {{ course.nextClass }}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grades Table */}
          <Card class="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
            <CardHeader class="p-8 pb-4">
              <CardTitle class="text-xl font-black text-slate-800 uppercase italic">Dernières <span class="text-emerald-500">Notes</span></CardTitle>
              <CardDescription class="text-slate-400 font-medium">Vos derniers résultats d'examens</CardDescription>
            </CardHeader>
            <CardContent class="p-0 overflow-x-auto">
              <Table class="min-w-[500px] md:min-w-full">
                <TableHeader class="bg-slate-50/50">
                  <TableRow class="border-none h-14">
                    <TableHead class="pl-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Matière</TableHead>
                    <TableHead class="font-black uppercase text-[10px] tracking-widest text-slate-400">Date</TableHead>
                    <TableHead class="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="grade in recentGrades" :key="grade.subject" class="h-16 hover:bg-slate-50 border-b border-slate-50 last:border-none">
                    <TableCell class="pl-8 font-black text-slate-700 text-sm">{{ grade.subject }}</TableCell>
                    <TableCell class="text-xs font-bold text-slate-400 uppercase tracking-tighter">{{ grade.date }}</TableCell>
                    <TableCell class="text-right pr-8">
                      <span class="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full font-black text-sm border border-emerald-100 shadow-sm">{{ grade.score }}</span>
                    </TableCell>
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
