import React from "react";
import { X, ArrowUpRight, ArrowDownLeft, Edit2 } from "lucide-react";
import { Transaction, TransactionType } from "../types";
import { cn } from "../lib/utils";

interface AddTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: {
    amount: number;
    category: string;
    description: string;
    type: TransactionType;
  }) => void;
  editTransaction?: Transaction | null;
}

export default function AddTransaction({ isOpen, onClose, onAdd, editTransaction }: AddTransactionProps) {
  const [type, setType] = React.useState<TransactionType>("expense");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (editTransaction) {
      setType(editTransaction.type);
      setAmount(editTransaction.amount.toString());
      setCategory(editTransaction.category);
      setDescription(editTransaction.description);
    } else {
      setType("expense");
      setAmount("");
      setCategory("");
      setDescription("");
    }
  }, [editTransaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      amount: parseFloat(amount),
      category,
      description,
      type
    });
    setAmount("");
    setCategory("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {editTransaction ? "Edit Transaksi" : "Tambah Transaksi"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                type === "expense" ? "bg-white text-rose-600 shadow-sm" : "text-slate-500"
              )}
            >
              <ArrowDownLeft size={16} />
              Pengeluaran
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                type === "income" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500"
              )}
            >
              <ArrowUpRight size={16} />
              Pemasukan
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jumlah</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
              <input
                required
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 text-xl font-bold text-slate-900 placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 text-slate-900 font-medium appearance-none"
            >
              <option value="">Pilih Kategori</option>
              <option value="Makanan">Makanan & Minuman</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Hiburan">Hiburan</option>
              <option value="Belanja">Belanja</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Gaji">Gaji</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Makan siang di kantor"
              className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 text-slate-900 font-medium min-h-[100px] resize-none placeholder:text-slate-300"
            />
          </div>

          <button
            type="submit"
            className={cn(
              "w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-all active:scale-95",
              type === "expense" ? "bg-rose-600 shadow-rose-200 hover:bg-rose-700" : "bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700"
            )}
          >
            Simpan Transaksi
          </button>
        </form>
      </div>
    </div>
  );
}
