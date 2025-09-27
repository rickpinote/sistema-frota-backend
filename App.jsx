import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Car, 
  Fuel, 
  MapPin, 
  Users, 
  Wrench, 
  FileText, 
  AlertTriangle,
  BarChart3,
  Calendar,
  Settings,
  Home
} from 'lucide-react'
import VehiclesPage from './components/VehiclesPage.jsx'
import FuelPage from './components/FuelPage.jsx'
import TrackingPage from './components/TrackingPage.jsx'
import './App.css'

function Dashboard() {
  const navigate = useNavigate()
  
  const [stats] = useState({
    totalVeiculos: 25,
    veiculosAtivos: 22,
    veiculosManutencao: 3,
    totalMotoristas: 18,
    abastecimentosHoje: 8,
    custoMensal: 15420.50
  })

  const [alertas] = useState([
    { id: 1, tipo: 'Manutenção', veiculo: 'ABC-1234', descricao: 'Revisão preventiva vencida', prioridade: 'alta' },
    { id: 2, tipo: 'Combustível', veiculo: 'DEF-5678', descricao: 'Consumo acima da média', prioridade: 'media' },
    { id: 3, tipo: 'Documentação', veiculo: 'GHI-9012', descricao: 'Licenciamento vence em 15 dias', prioridade: 'baixa' }
  ])

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-500'
      case 'media': return 'bg-yellow-500'
      case 'baixa': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const moduleButtons = [
    { icon: Car, label: 'Veículos', path: '/vehicles' },
    { icon: Users, label: 'Motoristas', path: '/drivers' },
    { icon: Fuel, label: 'Combustível', path: '/fuel' },
    { icon: MapPin, label: 'Rastreamento', path: '/tracking' },
    { icon: Wrench, label: 'Manutenção', path: '/maintenance' },
    { icon: FileText, label: 'Relatórios', path: '/reports' },
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Agendamentos', path: '/schedule' },
    { icon: Settings, label: 'Configurações', path: '/settings' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Controle de Frota
          </h1>
          <p className="text-gray-600">
            Secretaria de Saúde de Irecê-BA
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Veículos</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVeiculos}</div>
              <p className="text-xs text-muted-foreground">
                {stats.veiculosAtivos} ativos, {stats.veiculosManutencao} em manutenção
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Motoristas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMotoristas}</div>
              <p className="text-xs text-muted-foreground">
                Motoristas cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custo Mensal</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {stats.custoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.abastecimentosHoje} abastecimentos hoje
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu de Módulos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Módulos do Sistema</CardTitle>
                <CardDescription>
                  Acesse as funcionalidades principais do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {moduleButtons.map((module, index) => {
                    const IconComponent = module.icon
                    return (
                      <Button 
                        key={index}
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        onClick={() => navigate(module.path)}
                      >
                        <IconComponent className="h-6 w-6" />
                        <span className="text-sm">{module.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertas */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Alertas</span>
                </CardTitle>
                <CardDescription>
                  Notificações importantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertas.map((alerta) => (
                    <div key={alerta.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getPrioridadeColor(alerta.prioridade)}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {alerta.tipo}
                          </Badge>
                          <span className="text-sm font-medium text-gray-900">
                            {alerta.veiculo}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {alerta.descricao}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
            <Button
              variant={isActive('/vehicles') ? 'default' : 'ghost'}
              onClick={() => navigate('/vehicles')}
              className="flex items-center space-x-2"
            >
              <Car className="h-4 w-4" />
              <span>Veículos</span>
            </Button>
            <Button
              variant={isActive('/fuel') ? 'default' : 'ghost'}
              onClick={() => navigate('/fuel')}
              className="flex items-center space-x-2"
            >
              <Fuel className="h-4 w-4" />
              <span>Combustível</span>
            </Button>
            <Button
              variant={isActive('/tracking') ? 'default' : 'ghost'}
              onClick={() => navigate('/tracking')}
              className="flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4" />
              <span>Rastreamento</span>
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            Sistema de Controle de Frota - Irecê-BA
          </div>
        </div>
      </div>
    </div>
  )
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/fuel" element={<FuelPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/drivers" element={<div className="p-6"><h1 className="text-2xl font-bold">Motoristas - Em Desenvolvimento</h1></div>} />
        <Route path="/maintenance" element={<div className="p-6"><h1 className="text-2xl font-bold">Manutenção - Em Desenvolvimento</h1></div>} />
        <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Relatórios - Em Desenvolvimento</h1></div>} />
        <Route path="/dashboard" element={<div className="p-6"><h1 className="text-2xl font-bold">Dashboard Avançado - Em Desenvolvimento</h1></div>} />
        <Route path="/schedule" element={<div className="p-6"><h1 className="text-2xl font-bold">Agendamentos - Em Desenvolvimento</h1></div>} />
        <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Configurações - Em Desenvolvimento</h1></div>} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
