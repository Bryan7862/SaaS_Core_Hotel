import { Link } from 'react-router-dom';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    FileText,
    Package,
    Plus,
    UserPlus,
    FilePlus
} from 'lucide-react';


const dataArea = [
    { name: 'Ene', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Abr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
];

const dataBar = [
    { name: 'Electrónica', ventas: 4000 },
    { name: 'Ropa', ventas: 3000 },
    { name: 'Hogar', ventas: 5000 },
    { name: 'Juguetes', ventas: 2000 },
    { name: 'Libros', ventas: 2780 },
];

export function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* 1. KPIs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard
                    title="Ingresos del Mes"
                    value="$125,430"
                    trend="+5.2%"
                    isPositive={true}
                    icon={DollarSign}
                />
                <KpiCard
                    title="Nuevos Clientes"
                    value="82"
                    trend="+12%"
                    isPositive={true}
                    icon={Users}
                />
                <KpiCard
                    title="Facturas Abiertas"
                    value="15"
                    trend="-3%"
                    isPositive={false}
                    icon={FileText}
                />
                <KpiCard
                    title="Nivel de Inventario"
                    value="7,890"
                    trend="+1.5%"
                    isPositive={true}
                    icon={Package}
                />
            </div>

            {/* 2. Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ingresos vs Gastos */}
                <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
                    <div className="mb-6">
                        <h3 className="text-[var(--muted)] text-sm font-medium mb-1">Ingresos vs. Gastos</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[var(--text)]">$450K</span>
                            <span className="text-sm font-medium text-green-600">Últimos 6 meses +8.1%</span>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dataArea}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--text)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--text)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'var(--muted)' }}
                                    dy={10}
                                />
                                <CartesianGrid vertical={false} stroke="var(--border)" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--card-bg)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: 'var(--text)'
                                    }}
                                    itemStyle={{ color: 'var(--text)' }}
                                    labelStyle={{ color: 'var(--muted)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="var(--primary)"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Ventas por Categoría */}
                <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
                    <div className="mb-6">
                        <h3 className="text-[var(--muted)] text-sm font-medium mb-1">Ventas por Categoría de Producto</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[var(--text)]">$180K</span>
                            <span className="text-sm font-medium text-green-600">Este Trimestre +11.3%</span>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataBar}>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'var(--muted)' }}
                                    dy={10}
                                />
                                <Tooltip
                                    cursor={{ fill: 'var(--bg-primary)' }}
                                    contentStyle={{
                                        backgroundColor: 'var(--card-bg)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: 'var(--text)'
                                    }}
                                    itemStyle={{ color: 'var(--text)' }}
                                    labelStyle={{ color: 'var(--muted)' }}
                                />
                                <Bar
                                    dataKey="ventas"
                                    fill="var(--border)"
                                    radius={[4, 4, 0, 0]}
                                    activeBar={{ fill: 'var(--primary)' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 3. Quick Access */}
            <div>
                <h3 className="text-lg font-bold text-[var(--text)] mb-4">Accesos Rápidos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <QuickAction icon={Plus} label="Crear Factura" to="/invoices/new" />
                    <QuickAction icon={UserPlus} label="Añadir Cliente" to="/users" />
                    <QuickAction icon={Package} label="Nuevo Producto" to="/settings/general" />
                    <QuickAction icon={FilePlus} label="Generar Reporte" />
                </div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, trend, isPositive }: any) {
    return (
        <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-[var(--muted)] mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-[var(--text)]">{value}</h3>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {isPositive ? (
                    <TrendingUp size={16} className="text-green-500" />
                ) : (
                    <TrendingDown size={16} className="text-red-500" />
                )}
                <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {trend}
                </span>
                <span className="text-sm text-[var(--muted)]">vs last month</span>
            </div>
        </div>
    );
}

function QuickAction({ icon: Icon, label, to }: any) {
    if (to) {
        return (
            <Link to={to} className="flex flex-col items-center justify-center p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] hover:shadow-sm transition-all group">
                <div className="w-12 h-12 bg-[var(--bg-primary)] rounded-full flex items-center justify-center text-[var(--muted)] mb-3 group-hover:bg-[var(--primary)] group-hover:text-[var(--bg-soft)] transition-colors">
                    <Icon size={24} />
                </div>
                <span className="font-medium text-[var(--text)]">{label}</span>
            </Link>
        );
    }
    return (
        <button className="flex flex-col items-center justify-center p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] hover:shadow-sm transition-all group">
            <div className="w-12 h-12 bg-[var(--bg-primary)] rounded-full flex items-center justify-center text-[var(--muted)] mb-3 group-hover:bg-[var(--primary)] group-hover:text-[var(--bg-soft)] transition-colors">
                <Icon size={24} />
            </div>
            <span className="font-medium text-[var(--text)]">{label}</span>
        </button>
    );
}
