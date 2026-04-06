import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import { Transaction, TransactionType } from "./types";
import { Settings, Menu, X, TrendingUp } from "lucide-react";

import { supabase } from "./lib/supabase";

export default function App() {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [editTransaction, setEditTransaction] = React.useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    // Jika kredensial Supabase belum ada, gunakan dummy data agar tidak blank
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === "YOUR_SUPABASE_URL") {
      setTransactions([
        { id: "1", amount: 5000000, category: "Gaji", description: "Gaji Bulanan", date: new Date().toISOString(), type: "income" },
        { id: "2", amount: 150000, category: "Makanan", description: "Makan Siang", date: new Date().toISOString(), type: "expense" },
        { id: "3", amount: 50000, category: "Transportasi", description: "Ojek Online", date: new Date().toISOString(), type: "expense" }
      ]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTransaction = async (newTransaction: {
    amount: number;
    category: string;
    description: string;
    type: TransactionType;
    date: string;
  }) => {
    // Fallback ke dummy data jika Supabase belum dikonfigurasi
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === "YOUR_SUPABASE_URL") {
      const transaction: Transaction = {
        ...newTransaction,
        id: Math.random().toString(36).substr(2, 9),
      };
      setTransactions([transaction, ...transactions]);
      return;
    }

    try {
      const transactionToSave = {
        amount: newTransaction.amount,
        category: newTransaction.category,
        description: newTransaction.description,
        type: newTransaction.type,
        date: newTransaction.date
      };

      const { data, error } = await supabase
        .from("transactions")
        .insert([transactionToSave])
        .select();

      if (error) throw error;
      
      if (data) {
        setTransactions([data[0], ...transactions]);
      }
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    // Fallback dummy data logic
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === "YOUR_SUPABASE_URL") {
      setTransactions(transactions.filter(t => t.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const handleUpdateTransaction = async (updatedData: {
    amount: number;
    category: string;
    description: string;
    type: TransactionType;
    date: string;
  }) => {
    if (!editTransaction) return;

    // Fallback dummy data
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === "YOUR_SUPABASE_URL") {
      setTransactions(transactions.map(t => 
        t.id === editTransaction.id ? { ...t, ...updatedData } : t
      ));
      setEditTransaction(null);
      setIsAddModalOpen(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("transactions")
        .update(updatedData)
        .eq("id", editTransaction.id)
        .select();

      if (error) throw error;
      
      if (data) {
        setTransactions(transactions.map(t => t.id === editTransaction.id ? data[0] : t));
      }
      setEditTransaction(null);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Error updating transaction:", err);
    }
  };

  const balance = transactions.reduce((acc, t) => 
    t.type === "income" ? acc + t.amount : acc - t.amount, 0
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        balance={balance} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-10 pb-24 md:pb-10">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 -mx-4 -mt-4 mb-6 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-brand-600">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-brand-200">
              <TrendingUp size={18} />
            </div>
            <span className="text-lg font-display font-bold tracking-tight text-slate-900">FinTrack Pro</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          {activeTab === "dashboard" && (
            isLoading ? (
              <div className="flex items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
              </div>
            ) : (
              <Dashboard 
                transactions={transactions} 
                onAddClick={() => setIsAddModalOpen(true)} 
              />
            )
          )}
          
          {activeTab === "transactions" && (
            <TransactionList 
              transactions={transactions} 
              onDelete={handleDeleteTransaction}
              onEdit={(t) => {
                setEditTransaction(t);
                setIsAddModalOpen(true);
              }}
            />
          )}

          {activeTab === "settings" && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <div className="w-20 h-20 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center">
                <Settings size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Pengaturan Akun</h2>
              <p className="text-slate-500 max-w-md">Kelola profil, preferensi mata uang, dan notifikasi Anda di sini.</p>
            </div>
          )}
        </div>
      </main>

      <AddTransaction 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false);
          setEditTransaction(null);
        }} 
        onAdd={editTransaction ? handleUpdateTransaction : handleAddTransaction}
        editTransaction={editTransaction}
      />
    </div>
  );
}
