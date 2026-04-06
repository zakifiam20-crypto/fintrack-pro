import React from "react";
import { 
  User, 
  Trash2, 
  Download, 
  Moon, 
  Sun, 
  Globe,
  Shield,
  Bell,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";
import { Transaction } from "../types";

interface SettingsPageProps {
  userName: string;
  onUpdateUserName: (name: string) => void;
  onDeleteAllData: () => void;
  transactions: Transaction[];
}

export default function SettingsPage({ 
  userName, 
  onUpdateUserName, 
  onDeleteAllData,
  transactions 
}: SettingsPageProps) {
  const [name, setName] = React.useState(userName);

  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert("Tidak ada data untuk diekspor!");
      return;
    }

    const headers = ["Tanggal", "Keterangan", "Kategori", "Tipe", "Jumlah"];
    const rows = transactions.map(t => [
      new Date(t.date).toLocaleDateString("id-ID"),
      t.description,
      t.category,
      t.type === "income" ? "Pemasukan" : "Pengeluaran",
      t.amount
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `fintrack_pro_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUserName(name);
    alert("Nama berhasil diperbarui!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">Pengaturan</h1>
        <p className="text-slate-500 mt-1">Sesuaikan preferensi aplikasi Anda di sini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                <User size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Profil Saya</h2>
            </div>

            <form onSubmit={handleUpdateName} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Panggilan</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900"
                  placeholder="Masukkan nama Anda..."
                />
              </div>
              <button 
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-brand-200"
              >
                Simpan Profil
              </button>
            </form>
          </div>

          {/* Data Management */}
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                <Shield size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Manajemen Data</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-600 shadow-sm">
                    <Download size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Ekspor Laporan</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Download semua transaksi ke format CSV.</p>
                  </div>
                </div>
                <button 
                  onClick={exportToCSV}
                  className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-rose-50/50 rounded-2xl border border-rose-100 group hover:bg-rose-50 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-600 shadow-sm">
                    <Trash2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-rose-900">Reset Seluruh Data</h3>
                    <p className="text-xs text-rose-500 mt-0.5">Hapus semua transaksi secara permanen.</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (confirm("Apakah Anda yakin ingin menghapus SEMUA data transaksi? Tindakan ini tidak bisa dibatalkan!")) {
                      onDeleteAllData();
                    }
                  }}
                  className="p-2 text-rose-600 hover:bg-white rounded-lg transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Preferensi</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">Bahasa</span>
                </div>
                <span className="text-sm font-bold text-brand-600">Indonesia</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">Mode Gelap</span>
                </div>
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">Notifikasi</span>
                </div>
                <div className="w-10 h-5 bg-brand-500 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg">FinTrack Pro v1.0</h3>
              <p className="text-slate-400 text-xs mt-1">Dibuat dengan ❤️ untuk keluarga.</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                <code>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</code>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
