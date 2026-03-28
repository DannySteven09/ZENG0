import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import GlassKPI from '../../components/GlassKPI';

const JefeDashboard = ({ onNavigate, onLogout, userName }) => {
    // Datos simulados (Se cargarían de Supabase en prod)
    const [inventarioTotal] = useState(14280);
    const [mermaPositiva] = useState(142);
    const [mermaNegativa] = useState(86);
    const [totalHallazgos] = useState(34);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f9ff]">
            {/* Header refined */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="bg-white border-b border-slate-200 text-slate-800 shadow-sm"
            >
                <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg shadow-[#7C3AED]/20">
                            <span className="material-symbols-outlined text-white">supervisor_account</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-black font-headline tracking-tight text-[#0b1c30]">ZENGO JEFE</h1>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Gestión Operativa</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">
                            <div className="w-8 h-8 bg-[#f3e8ff] rounded-full flex items-center justify-center text-[#5b21b6] text-xs font-black">
                                {userName?.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-[#0b1c30] leading-none">{userName}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Jefe de Bodega</p>
                            </div>
                        </div>

                        <button
                            onClick={onLogout}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>
                </div>
            </motion.header>

            <motion.div 
                className="container mx-auto px-4 md:px-6 py-8 flex-grow"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* KPIs Operativos con el estilo solicitado */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
                    <GlassKPI 
                        title="Total Existencias"
                        value={inventarioTotal}
                        unit="unidades"
                        icon="inventory_2"
                        color="#6b38d4"
                        trend="+4.2%"
                        delay={0.1}
                    />
                    <GlassKPI 
                        title="Merma Positiva"
                        value={mermaPositiva}
                        unit="unidades"
                        icon="trending_up"
                        color="#10b981"
                        trend="Normal"
                        delay={0.2}
                    />
                    <GlassKPI 
                        title="Merma Negativa"
                        value={mermaNegativa}
                        unit="unidades"
                        icon="trending_down"
                        color="#ba1a1a"
                        trend="-12% crit"
                        trendColor="text-red-600"
                        trendBg="bg-red-50"
                        delay={0.3}
                    />
                    <GlassKPI 
                        title="Hallazgos"
                        value={totalHallazgos}
                        icon="search_insights"
                        color="#f59e0b"
                        trend="Pendientes"
                        trendColor="text-amber-600"
                        trendBg="bg-amber-50"
                        delay={0.4}
                    />
                    
                    {/* Ranking de Auxiliares - Directamente del fragmento del usuario */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-6 rounded-xl border-t-2 border-[#0058be] col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-1 shadow-sm h-full bg-white transition-all"
                    >
                        <h3 className="text-[#0b1c30] font-headline font-bold text-sm mb-4">Ranking de Auxiliares</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#d8e2ff] text-[#001a42] flex items-center justify-center text-[10px] font-black">MR</div>
                                    <span className="text-xs font-semibold text-slate-700">M. Rodríguez</span>
                                </div>
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">98% Prec.</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-black">AL</div>
                                    <span className="text-xs font-semibold text-slate-700">A. López</span>
                                </div>
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">94% Prec.</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Acciones del Jefe */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div 
                        whileHover={{ y: -5 }}
                        onClick={() => onNavigate("inventory")}
                        className="cursor-pointer glass-card bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-[#7C3AED] group transition-all"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-[#7C3AED]/10 rounded-2xl flex items-center justify-center text-[#7C3AED] group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">assignment_add</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black font-headline text-[#0b1c30]">Asignar Tareas</h3>
                                <p className="text-sm text-slate-400">Crear y delegar conteos cíclicos</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }}
                        onClick={() => onNavigate("inventory")}
                        className="cursor-pointer glass-card bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-[#7C3AED] group transition-all"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">fact_check</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black font-headline text-[#0b1c30]">Revisión de Hallazgos</h3>
                                <p className="text-sm text-slate-400">Autorizar ajustes de inventario</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default JefeDashboard;
