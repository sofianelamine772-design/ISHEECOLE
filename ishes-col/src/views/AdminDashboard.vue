<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Filter,
  School,
  FileText
} from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

const emit = defineEmits(['logout'])

const students = [
  { id: 1, name: 'Jean Dupont', email: 'jean@example.com', plan: 'Premium', status: 'Payé', amount: '299€' },
  { id: 2, name: 'Marie Curie', email: 'marie@example.com', plan: 'Basic', status: 'En attente', amount: '199€' },
  { id: 3, name: 'Paul Klein', email: 'paul@example.com', plan: 'Premium', status: 'Payé', amount: '299€' },
  { id: 4, name: 'Alice Zola', email: 'alice@example.com', plan: 'Pro', status: 'Payé', amount: '399€' },
  { id: 5, name: 'Bob Marley', email: 'bob@example.com', plan: 'Basic', status: 'Annulé', amount: '0€' },
]

const stats = [
  { name: 'Élèves Totaux', value: '452', icon: Users, change: '+12% ce mois', color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Revenu Mensuel', value: '24,500€', icon: DollarSign, change: '+8% ce mois', color: 'text-green-600', bg: 'bg-green-50' },
  { name: 'Taux de Réussite', value: '94%', icon: TrendingUp, change: '+2% ce mois', color: 'text-indigo-600', bg: 'bg-indigo-50' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 text-white hidden md:flex flex-col">
      <div class="p-8">
        <h1 class="text-2xl font-bold tracking-tight">ISHES<span class="text-blue-400">COL</span></h1>
        <p class="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Administration</p>
      </div>
      <nav class="flex-1 px-4 space-y-1">
        <Button variant="ghost" class="w-full justify-start gap-3 bg-white/10 text-white hover:bg-white/20">
          <TrendingUp :size="20" /> Aperçu
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/10">
          <Users :size="20" /> Élèves
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/10">
          <School :size="20" /> Classes
        </Button>
        <Button variant="ghost" class="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/10">
          <FileText :size="20" /> Rapports
        </Button>
      </nav>
      <div class="p-4 mt-auto border-t border-slate-800">
        <Button variant="ghost" class="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/10" @click="emit('logout')">
          <LogOut :size="20" /> Déconnexion
        </Button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">Tableau de Bord</h2>
          <p class="text-muted-foreground mt-1">Bienvenue sur votre interface d'administration scolaire.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button class="gap-2">
            <Plus :size="18" /> Ajouter un élève
          </Button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card v-for="stat in stats" :key="stat.name" class="border-none shadow-sm overflow-hidden">
          <CardContent class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted-foreground">{{ stat.name }}</p>
                <p class="text-3xl font-bold mt-1">{{ stat.value }}</p>
              </div>
              <div :class="[stat.bg, stat.color, 'p-3 rounded-2xl']">
                <component :is="stat.icon" :size="24" />
              </div>
            </div>
            <div class="mt-4 flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp :size="12" /> {{ stat.change }}
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Students Table -->
      <Card class="border-none shadow-md overflow-hidden bg-white">
        <CardHeader class="border-b border-slate-50 bg-white p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Liste des Élèves</CardTitle>
              <CardDescription>Gérez les inscriptions et les paiements</CardDescription>
            </div>
            <div class="flex items-center gap-2">
              <div class="relative">
                <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher..." class="pl-8 w-[250px] h-9" />
              </div>
              <Button variant="outline" size="sm" class="gap-2 h-9 border-slate-200 text-slate-600">
                <Filter :size="16" /> Filtre
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent class="p-0">
          <Table>
            <TableHeader class="bg-slate-50/50">
              <TableRow>
                <TableHead class="pl-6">Élève</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead class="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="std in students" :key="std.id" class="hover:bg-slate-50 transition-colors">
                <TableCell class="pl-6">
                  <div class="flex items-center gap-3">
                    <Avatar class="h-8 w-8">
                      <AvatarFallback>{{ std.name.split(' ').map(n=>n[0]).join('') }}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p class="font-medium leading-none">{{ std.name }}</p>
                      <p class="text-xs text-muted-foreground mt-1">{{ std.email }}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p class="text-sm font-medium uppercase tracking-tighter text-slate-500">{{ std.plan }}</p>
                </TableCell>
                <TableCell>
                  <Badge 
                    :variant="std.status === 'Payé' ? 'default' : 'secondary'"
                    :class="[
                      std.status === 'Payé' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                      std.status === 'En attente' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : 
                      'bg-red-100 text-red-700 hover:bg-red-100',
                      'border-none'
                    ]"
                   >
                    {{ std.status }}
                  </Badge>
                </TableCell>
                <TableCell class="font-bold text-slate-700">{{ std.amount }}</TableCell>
                <TableCell class="text-right pr-6">
                  <Button variant="ghost" size="sm" class="text-blue-600 hover:text-blue-700 hover:bg-blue-50">Modifier</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  </div>
</template>
