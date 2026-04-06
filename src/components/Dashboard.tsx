import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  DollarSign, 
  Calendar,
  MoreVertical,
  Plus
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { formatCurrency, cn } from "../lib/utils";
import { Transaction } from "../types";
import { motion } from "motion/react";

const data = [
  { name: "Sen", income: 4000, expense: 2400 },
  { name: "Sel", income: 3000, expense: 1398 },
  { name: "Rab", income: 2000, expense: 9800 },
  { name: "Kam", income: 2780, expense: 3908 },
  { name: "Jum", income: 1890, expense: 4800 },
  { name: "Sab", income: 2390, expense: 3800 },
  { name: "Min", income: 3490, expense: 4300 },
];

interface DashboardProps {
  transactions: Transaction[];
  onAddClick: () => void;
}

export default function Dashboard({ transactions, onAddClick }: DashboardProps) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Halo, Selamat Datang!</h1>
          <p className="text-slate-500 mt-1">Berikut ringkasan keuangan Anda bulan ini.</p>
        </div>
        <button 
          onClick={onAddClick}
          className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-brand-200 transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus size={20} />
          Transaksi Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -4 }}
          className="stat-card bg-gradient-to-br from-brand-600 to-brand-700 text-white border-none"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign size={20} />
            </div>
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">+12% vs bln lalu</span>
          </div>
          <p className="text-white/70 text-sm font-medium">Total Saldo</p>
          <h2 className="text-2xl font-bold mt-1">{formatCurrency(balance)}</h2>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="stat-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Pemasukan</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Pemasukan</p>
          <h2 className="text-2xl font-bold mt-1 text-slate-900">{formatCurrency(totalIncome)}</h2>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="stat-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center">
              <ArrowDownLeft size={20} />
            </div>
            <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Pengeluaran</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Pengeluaran</p>
          <h2 className="text-2xl font-bold mt-1 text-slate-900">{formatCurrency(totalExpense)}</h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Arus Kas Mingguan</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand-500 rounded-full" />
                <span className="text-xs text-slate-500">Pemasukan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-200 rounded-full" />
                <span className="text-xs text-slate-500">Pengeluaran</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expense" 
                  stroke="#cbd5e1" 
                  strokeWidth={2}
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Kategori Terbanyak</h3>
          <div className="space-y-6">
            {[
              { label: "Makanan", value: 45, color: "bg-orange-500" },
              { label: "Transportasi", value: 25, color: "bg-blue-500" },
              { label: "Hiburan", value: 20, color: "bg-purple-500" },
              { label: "Lainnya", value: 10, color: "bg-slate-400" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="text-slate-500">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
