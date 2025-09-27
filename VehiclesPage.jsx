import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Car, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Download
} from 'lucide-react'

function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Dados mockados dos veículos
  const [vehicles] = useState([
    {
      id: 1,
      placa: 'ABC-1234',
      marca: 'Volkswagen',
      modelo: 'Gol',
      ano: 2020,
      cor: 'Branco',
      combustivel: 'Flex',
      quilometragem: 45000,
      status: 'Disponível'
    },
    {
      id: 2,
      placa: 'DEF-5678',
      marca: 'Fiat',
      modelo: 'Uno',
      ano: 2019,
      cor: 'Prata',
      combustivel: 'Flex',
      quilometragem: 52000,
      status: 'Em Uso'
    },
    {
      id: 3,
      placa: 'GHI-9012',
      marca: 'Ford',
      modelo: 'Ka',
      ano: 2021,
      cor: 'Azul',
      combustivel: 'Flex',
      quilometragem: 28000,
      status: 'Manutenção'
    },
    {
      id: 4,
      placa: 'JKL-3456',
      marca: 'Chevrolet',
      modelo: 'Onix',
      ano: 2022,
      cor: 'Vermelho',
      combustivel: 'Flex',
      quilometragem: 15000,
      status: 'Disponível'
    },
    {
      id: 5,
      placa: 'MNO-7890',
      marca: 'Renault',
      modelo: 'Kwid',
      ano: 2020,
      cor: 'Preto',
      combustivel: 'Flex',
      quilometragem: 38000,
      status: 'Inativo'
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponível': return 'bg-green-500'
      case 'Em Uso': return 'bg-blue-500'
      case 'Manutenção': return 'bg-yellow-500'
      case 'Inativo': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || vehicle.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    total: vehicles.length,
    disponivel: vehicles.filter(v => v.status === 'Disponível').length,
    emUso: vehicles.filter(v => v.status === 'Em Uso').length,
    manutencao: vehicles.filter(v => v.status === 'Manutenção').length,
    inativo: vehicles.filter(v => v.status === 'Inativo').length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Car className="mr-3 h-8 w-8" />
                Gestão de Veículos
              </h1>
              <p className="text-gray-600">
                Controle e monitoramento da frota de veículos
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Veículo</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Veículo</DialogTitle>
                  <DialogDescription>
                    Preencha as informações do novo veículo da frota.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="placa" className="text-right">
                      Placa
                    </Label>
                    <Input id="placa" placeholder="ABC-1234" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="marca" className="text-right">
                      Marca
                    </Label>
                    <Input id="marca" placeholder="Volkswagen" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="modelo" className="text-right">
                      Modelo
                    </Label>
                    <Input id="modelo" placeholder="Gol" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ano" className="text-right">
                      Ano
                    </Label>
                    <Input id="ano" type="number" placeholder="2023" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cor" className="text-right">
                      Cor
                    </Label>
                    <Input id="cor" placeholder="Branco" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="combustivel" className="text-right">
                      Combustível
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flex">Flex</SelectItem>
                        <SelectItem value="gasolina">Gasolina</SelectItem>
                        <SelectItem value="etanol">Etanol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Salvar Veículo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponível</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statusCounts.disponivel}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Uso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{statusCounts.emUso}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Manutenção</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.manutencao}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inativo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{statusCounts.inativo}</div>
            </CardContent>
          </Card>
        </div>

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
                    placeholder="Buscar por placa, marca ou modelo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Em Uso">Em Uso</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vehicles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Veículos</CardTitle>
            <CardDescription>
              {filteredVehicles.length} veículo(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Placa</TableHead>
                  <TableHead>Marca/Modelo</TableHead>
                  <TableHead>Ano</TableHead>
                  <TableHead>Cor</TableHead>
                  <TableHead>Combustível</TableHead>
                  <TableHead>Quilometragem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.placa}</TableCell>
                    <TableCell>{vehicle.marca} {vehicle.modelo}</TableCell>
                    <TableCell>{vehicle.ano}</TableCell>
                    <TableCell>{vehicle.cor}</TableCell>
                    <TableCell>{vehicle.combustivel}</TableCell>
                    <TableCell>{vehicle.quilometragem.toLocaleString()} km</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(vehicle.status)} text-white`}>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VehiclesPage
