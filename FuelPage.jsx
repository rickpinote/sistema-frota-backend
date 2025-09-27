import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Fuel, 
  Plus, 
  Search, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Calendar,
  DollarSign
} from 'lucide-react'

function FuelPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Dados mockados de abastecimentos
  const [fuelRecords] = useState([
    {
      id: 1,
      data: '2024-09-25',
      veiculo: 'ABC-1234',
      motorista: 'João Silva',
      posto: 'Posto Ipiranga Centro',
      litros: 45.2,
      valorTotal: 315.40,
      precoLitro: 6.98,
      quilometragem: 45120,
      tipoCombustivel: 'Gasolina',
      tanqueCheio: true,
      consumo: 12.5
    },
    {
      id: 2,
      data: '2024-09-24',
      veiculo: 'DEF-5678',
      motorista: 'Maria Santos',
      posto: 'Shell Avenida',
      litros: 38.7,
      valorTotal: 270.09,
      precoLitro: 6.98,
      quilometragem: 52180,
      tipoCombustivel: 'Gasolina',
      tanqueCheio: true,
      consumo: 11.8
    },
    {
      id: 3,
      data: '2024-09-23',
      veiculo: 'GHI-9012',
      motorista: 'Pedro Costa',
      posto: 'BR Petrobras',
      litros: 42.1,
      valorTotal: 294.70,
      precoLitro: 7.00,
      quilometragem: 28350,
      tipoCombustivel: 'Gasolina',
      tanqueCheio: false,
      consumo: 13.2
    },
    {
      id: 4,
      data: '2024-09-22',
      veiculo: 'JKL-3456',
      motorista: 'Ana Oliveira',
      posto: 'Posto Ipiranga Centro',
      litros: 40.5,
      valorTotal: 283.50,
      precoLitro: 7.00,
      quilometragem: 15280,
      tipoCombustivel: 'Gasolina',
      tanqueCheio: true,
      consumo: 14.1
    }
  ])

  // Estatísticas calculadas
  const stats = {
    totalGasto: fuelRecords.reduce((sum, record) => sum + record.valorTotal, 0),
    totalLitros: fuelRecords.reduce((sum, record) => sum + record.litros, 0),
    precoMedio: fuelRecords.reduce((sum, record) => sum + record.precoLitro, 0) / fuelRecords.length,
    consumoMedio: fuelRecords.reduce((sum, record) => sum + record.consumo, 0) / fuelRecords.length,
    abastecimentosHoje: fuelRecords.filter(record => record.data === '2024-09-25').length
  }

  const filteredRecords = fuelRecords.filter(record => 
    record.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.motorista.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.posto.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getConsumoStatus = (consumo) => {
    if (consumo >= 13) return { color: 'bg-green-500', icon: TrendingUp, text: 'Bom' }
    if (consumo >= 11) return { color: 'bg-yellow-500', icon: TrendingUp, text: 'Médio' }
    return { color: 'bg-red-500', icon: TrendingDown, text: 'Ruim' }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Fuel className="mr-3 h-8 w-8" />
                Controle de Combustível
              </h1>
              <p className="text-gray-600">
                Gestão de abastecimentos e consumo da frota
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Registrar Abastecimento</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Registrar Novo Abastecimento</DialogTitle>
                  <DialogDescription>
                    Preencha as informações do abastecimento realizado.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="veiculo" className="text-right">
                      Veículo
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o veículo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ABC-1234">ABC-1234 - Gol</SelectItem>
                        <SelectItem value="DEF-5678">DEF-5678 - Uno</SelectItem>
                        <SelectItem value="GHI-9012">GHI-9012 - Ka</SelectItem>
                        <SelectItem value="JKL-3456">JKL-3456 - Onix</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="motorista" className="text-right">
                      Motorista
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o motorista" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joao">João Silva</SelectItem>
                        <SelectItem value="maria">Maria Santos</SelectItem>
                        <SelectItem value="pedro">Pedro Costa</SelectItem>
                        <SelectItem value="ana">Ana Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="data" className="text-right">
                      Data
                    </Label>
                    <Input id="data" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quilometragem" className="text-right">
                      Quilometragem
                    </Label>
                    <Input id="quilometragem" type="number" placeholder="45000" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="litros" className="text-right">
                      Litros
                    </Label>
                    <Input id="litros" type="number" step="0.1" placeholder="45.2" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="valor" className="text-right">
                      Valor Total
                    </Label>
                    <Input id="valor" type="number" step="0.01" placeholder="315.40" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="posto" className="text-right">
                      Posto
                    </Label>
                    <Input id="posto" placeholder="Posto Ipiranga Centro" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="combustivel" className="text-right">
                      Combustível
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Tipo de combustível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gasolina">Gasolina</SelectItem>
                        <SelectItem value="etanol">Etanol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="observacoes" className="text-right">
                      Observações
                    </Label>
                    <Textarea id="observacoes" placeholder="Observações adicionais..." className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Registrar Abastecimento
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {stats.totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Últimos registros
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Litros</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalLitros.toFixed(1)}L
              </div>
              <p className="text-xs text-muted-foreground">
                Combustível consumido
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {stats.precoMedio.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Por litro
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consumo Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.consumoMedio.toFixed(1)} km/L
              </div>
              <p className="text-xs text-muted-foreground">
                Eficiência da frota
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.abastecimentosHoje}
              </div>
              <p className="text-xs text-muted-foreground">
                Abastecimentos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Buscar Abastecimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por veículo, motorista ou posto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Fuel Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Abastecimentos</CardTitle>
            <CardDescription>
              {filteredRecords.length} registro(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Motorista</TableHead>
                  <TableHead>Posto</TableHead>
                  <TableHead>Litros</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Preço/L</TableHead>
                  <TableHead>Consumo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => {
                  const consumoStatus = getConsumoStatus(record.consumo)
                  const ConsumoIcon = consumoStatus.icon
                  
                  return (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.data).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="font-medium">{record.veiculo}</TableCell>
                      <TableCell>{record.motorista}</TableCell>
                      <TableCell>{record.posto}</TableCell>
                      <TableCell>{record.litros.toFixed(1)}L</TableCell>
                      <TableCell>R$ {record.valorTotal.toFixed(2)}</TableCell>
                      <TableCell>R$ {record.precoLitro.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <ConsumoIcon className="h-4 w-4" />
                          <span>{record.consumo.toFixed(1)} km/L</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${consumoStatus.color} text-white`}>
                            {consumoStatus.text}
                          </Badge>
                          {record.tanqueCheio && (
                            <Badge variant="outline">
                              Tanque Cheio
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FuelPage
