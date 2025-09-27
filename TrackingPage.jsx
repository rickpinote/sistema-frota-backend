import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  Route,
  Activity,
  AlertCircle,
  Play,
  Pause,
  Square
} from 'lucide-react'

function TrackingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  // Dados mockados de rastreamento
  const [trackingData] = useState([
    {
      id: 1,
      veiculo: 'ABC-1234',
      motorista: 'João Silva',
      status: 'Em Movimento',
      localizacao: 'Av. Principal, 123 - Centro',
      velocidade: 45,
      ultimaAtualizacao: '2024-09-25 14:30:00',
      destino: 'Hospital Municipal',
      tempoViagem: '00:25:30',
      distanciaPercorrida: 12.5,
      coordenadas: { lat: -11.3089, lng: -41.8536 }
    },
    {
      id: 2,
      veiculo: 'DEF-5678',
      motorista: 'Maria Santos',
      status: 'Parado',
      localizacao: 'R. das Flores, 456 - Bairro Novo',
      velocidade: 0,
      ultimaAtualizacao: '2024-09-25 14:28:00',
      destino: 'UBS Centro',
      tempoViagem: '01:15:45',
      distanciaPercorrida: 8.2,
      coordenadas: { lat: -11.3125, lng: -41.8598 }
    },
    {
      id: 3,
      veiculo: 'GHI-9012',
      motorista: 'Pedro Costa',
      status: 'Em Movimento',
      localizacao: 'BR-324, Km 15',
      velocidade: 80,
      ultimaAtualizacao: '2024-09-25 14:32:00',
      destino: 'Hospital Regional',
      tempoViagem: '00:45:20',
      distanciaPercorrida: 35.7,
      coordenadas: { lat: -11.2856, lng: -41.8234 }
    },
    {
      id: 4,
      veiculo: 'JKL-3456',
      motorista: 'Ana Oliveira',
      status: 'Offline',
      localizacao: 'Garagem Central',
      velocidade: 0,
      ultimaAtualizacao: '2024-09-25 12:15:00',
      destino: '-',
      tempoViagem: '-',
      distanciaPercorrida: 0,
      coordenadas: { lat: -11.3089, lng: -41.8536 }
    },
    {
      id: 5,
      veiculo: 'MNO-7890',
      motorista: 'Carlos Lima',
      status: 'Em Movimento',
      localizacao: 'Av. Contorno, 789',
      velocidade: 35,
      ultimaAtualizacao: '2024-09-25 14:31:00',
      destino: 'Posto de Saúde Norte',
      tempoViagem: '00:18:12',
      distanciaPercorrida: 6.8,
      coordenadas: { lat: -11.3156, lng: -41.8445 }
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Em Movimento': return 'bg-green-500'
      case 'Parado': return 'bg-yellow-500'
      case 'Offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Em Movimento': return Play
      case 'Parado': return Pause
      case 'Offline': return Square
      default: return Square
    }
  }

  const getVelocidadeColor = (velocidade) => {
    if (velocidade === 0) return 'text-gray-500'
    if (velocidade <= 40) return 'text-green-600'
    if (velocidade <= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredData = trackingData.filter(item => {
    const matchesSearch = item.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.motorista.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: trackingData.length,
    emMovimento: trackingData.filter(v => v.status === 'Em Movimento').length,
    parados: trackingData.filter(v => v.status === 'Parado').length,
    offline: trackingData.filter(v => v.status === 'Offline').length,
    velocidadeMedia: trackingData
      .filter(v => v.velocidade > 0)
      .reduce((sum, v) => sum + v.velocidade, 0) / 
      trackingData.filter(v => v.velocidade > 0).length || 0
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <MapPin className="mr-3 h-8 w-8" />
                Rastreamento GPS
              </h1>
              <p className="text-gray-600">
                Monitoramento em tempo real da localização dos veículos
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Route className="h-4 w-4" />
                <span>Ver Rotas</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Navigation className="h-4 w-4" />
                <span>Mapa Completo</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Veículos</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Monitorados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Movimento</CardTitle>
              <Play className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.emMovimento}</div>
              <p className="text-xs text-muted-foreground">
                Ativos agora
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parados</CardTitle>
              <Pause className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.parados}</div>
              <p className="text-xs text-muted-foreground">
                Estacionados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offline</CardTitle>
              <Square className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.offline}</div>
              <p className="text-xs text-muted-foreground">
                Sem sinal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Velocidade Média</CardTitle>
              <Navigation className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.velocidadeMedia.toFixed(0)} km/h
              </div>
              <p className="text-xs text-muted-foreground">
                Veículos em movimento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Mapa de Localização</CardTitle>
            <CardDescription>
              Visualização em tempo real das posições dos veículos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">Mapa Interativo</p>
                <p className="text-gray-400 text-sm">
                  Integração com Google Maps ou OpenStreetMap
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Mostrará a localização em tempo real de todos os veículos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros e Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por veículo, motorista ou localização..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="Em Movimento">Em Movimento</SelectItem>
                    <SelectItem value="Parado">Parado</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Table */}
        <Card>
          <CardHeader>
            <CardTitle>Status dos Veículos</CardTitle>
            <CardDescription>
              {filteredData.length} veículo(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Motorista</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Velocidade</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Tempo Viagem</TableHead>
                  <TableHead>Distância</TableHead>
                  <TableHead>Última Atualização</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => {
                  const StatusIcon = getStatusIcon(item.status)
                  
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.veiculo}</TableCell>
                      <TableCell>{item.motorista}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={`${getStatusColor(item.status)} text-white`}>
                            {item.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={item.localizacao}>
                        {item.localizacao}
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getVelocidadeColor(item.velocidade)}`}>
                          {item.velocidade} km/h
                        </span>
                      </TableCell>
                      <TableCell>{item.destino}</TableCell>
                      <TableCell>{item.tempoViagem}</TableCell>
                      <TableCell>
                        {item.distanciaPercorrida > 0 ? `${item.distanciaPercorrida} km` : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {new Date(item.ultimaAtualizacao).toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Alertas de Rastreamento</span>
            </CardTitle>
            <CardDescription>
              Notificações importantes sobre o rastreamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 border rounded-lg bg-yellow-50">
                <div className="w-2 h-2 rounded-full mt-2 bg-yellow-500" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      Velocidade
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">
                      GHI-9012
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Veículo excedendo limite de velocidade (80 km/h em área urbana)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 border rounded-lg bg-red-50">
                <div className="w-2 h-2 rounded-full mt-2 bg-red-500" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      Conexão
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">
                      JKL-3456
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Veículo offline há mais de 2 horas
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TrackingPage
