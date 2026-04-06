import React from "react";
import { 
  LayoutDashboard, 
  Wallet, 
  PieChart, 
  Settings, 
  LogOut,
  TrendingUp,
  TrendingDown,
  PlusCircle
} from "lucide-react";
import { cn, formatCurrency } from "../lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  balance: number;
}

export default function Sidebar({ activeTab, setActiveTab, balance }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transaksi", icon: Wallet },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0">
      <div className="p-8">
        <div className="flex items-center gap-2 text-brand-600">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
            <TrendingUp size={24} />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-slate-900">FinTrack Pro</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-brand-50 text-brand-600 font-medium" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon size={20} className={cn(
              activeTab === item.id ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs text-slate-400 mb-1">Saldo Total</p>
            <h3 className="text-lg font-bold">{formatCurrency(balance)}</h3>
            <button className="mt-3 w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
              <PlusCircle size={14} />
              Tambah Saldo
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl" />
        </div>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-slate-500 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50">
          <LogOut size={20} />
          Keluar
        </button>
      </div>
    </div>
  );
}
