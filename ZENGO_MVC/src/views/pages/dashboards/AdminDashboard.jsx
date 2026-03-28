import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import GlassKPI from '../../components/GlassKPI';

const AdminDashboard = ({ onNavigate, onLogout, userName }) => {
    // Datos simulados (Se cargarían de Supabase en prod)
    const [valorInventario] = useState(45280500); // En Colones
    const [montoMermaNegativa] = useState(1245000);
    const [montoMermaPositiva] = useState(850200);
    const [montoHallazgos] = useState(342000);

    const formatCRC = (val) => {
        return new Intl.NumberFormat('es-CR', {
            style: 'currency',
            currency: 'CRC',
            minimumFractionDigits: 0
        }).format(val);
    };

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
                        <div className="w-10 h-10 bg-[#6b38d4] rounded-xl flex items-center justify-center shadow-lg shadow-[#6b38d4]/20">
                            <span className="material-symbols-outlined text-white">shield_person</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-black font-headline tracking-tight text-[#0b1c30]">ZENGO ADMIN</h1>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Control Financiero</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">
                            <div className="w-8 h-8 bg-[#d8e2ff] rounded-full flex items-center justify-center text-[#001a42] text-xs font-black">
                                {userName?.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-[#0b1c30] leading-none">{userName}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Administrador</p>
                            </div>
                        </div>

                        <button
                            onClick={onLogout}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Cerrar Sesión"
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
                {/* KPIs Financieros con estilo Glass */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <GlassKPI 
                        title="Valor Total Inventario"
                        value={formatCRC(valorInventario)}
                        icon="payments"
                        color="#6b38d4"
                        trend="+2.4%"
                        delay={0.1}
                    />
                    <GlassKPI 
                        title="Merma Negativa (Faltante)"
                        value={formatCRC(montoMermaNegativa)}
                        icon="trending_down"
                        color="#ba1a1a"
                        trend="-12% crit"
                        trendColor="text-red-600"
                        trendBg="bg-red-50"
                        delay={0.2}
                    />
                    <GlassKPI 
                        title="Merma Positiva (Sobrante)"
                        value={formatCRC(montoMermaPositiva)}
                        icon="trending_up"
                        color="#10b981"
                        trend="Normal"
                        delay={0.3}
                    />
                    <GlassKPI 
                        title="Monto en Hallazgos"
                        value={formatCRC(montoHallazgos)}
                        icon="search_insights"
                        color="#f59e0b"
                        trend="Revision"
                        trendColor="text-amber-600"
                        trendBg="bg-amber-50"
                        delay={0.4}
                    />
                </div>

                {/* Sección de Gráficos con SVG personalizados */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2 glass-card bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[350px] relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <div>
                                <h3 className="font-headline font-bold text-[#0b1c30]">Tendencia de Valor del Inventario</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Balance Mensual 2024</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="bg-[#6b38d4]/10 text-[#6b38d4] text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-tight">Cifras en Millones ₡</span>
                            </div>
                        </div>
                        
                        {/* Custom SVG Area Chart Component */}
                        <div className="w-full h-56 relative">
                            <svg viewBox="0 0 800 220" className="w-full h-full overflow-visible">
                                <defs>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6b38d4" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#6b38d4" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#6b38d4" />
                                        <stop offset="100%" stopColor="#8455ef" />
                                    </linearGradient>
                                </defs>
                                
                                {/* Grid Lines */}
                                {[0, 50, 100, 150, 200].map((y) => (
                                    <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                                ))}

                                {/* Area Path */}
                                <motion.path
                                    initial={{ d: "M 0 200 L 0 200 L 150 200 L 300 200 L 450 200 L 600 200 L 750 200 L 800 200 L 800 200 Z" }}
                                    animate={{ d: "M 0 140 L 0 140 L 150 110 L 300 135 L 450 85 L 600 100 L 750 60 L 800 70 L 800 200 L 0 200 Z" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    fill="url(#areaGradient)"
                                />

                                {/* Line Path */}
                                <motion.path
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    d="M 0 140 L 150 110 L 300 135 L 450 85 L 600 100 L 750 60 L 800 70"
                                    fill="none"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Data Points */}
                                {[
                                    { x: 0, y: 140 }, { x: 150, y: 110 }, { x: 300, y: 135 }, 
                                    { x: 450, y: 85 }, { x: 600, y: 100 }, { x: 750, y: 60 }, { x: 800, y: 70 }
                                ].map((pt, i) => (
                                    <motion.circle 
                                        key={i}
                                        cx={pt.x} cy={pt.y} r="5"
                                        fill="white"
                                        stroke="#6b38d4"
                                        strokeWidth="3"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1 + (i * 0.1) }}
                                    />
                                ))}
                            </svg>
                            
                            {/* X Axis Labels */}
                            <div className="flex justify-between mt-4 px-2">
                                {['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL'].map(m => (
                                    <span key={m} className="text-[9px] font-bold text-slate-400 tracking-wider">{m}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="glass-card bg-[#0b1c30] p-6 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative">
                        {/* Decorative background */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#6b38d4]/10 rounded-full blur-3xl"></div>
                        
                        <h3 className="font-headline font-bold text-white mb-6 relative z-10">Distribución por Categoría</h3>
                        <div className="space-y-5 relative z-10">
                            {[
                                { cat: 'TECNOLOGÍA', monto: '₡18.2M', pct: 40, color: '#6b38d4' },
                                { cat: 'MUEBLES / HOGAR', monto: '₡11.3M', pct: 25, color: '#10b981' },
                                { cat: 'PAPELERÍA', monto: '₡9.1M', pct: 20, color: '#3b82f6' },
                                { cat: 'OTROS', monto: '₡6.8M', pct: 15, color: '#94a3b8' }
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">{item.cat}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-slate-500">{item.pct}%</span>
                                            <span className="text-xs font-black text-white">{item.monto}</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.pct}%` }}
                                            transition={{ duration: 1.2, delay: 0.8 + (i * 0.15) }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-5 border-t border-white/10">
                            <div className="flex justify-between items-center">
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Valor Total Cargado</p>
                                <span className="text-sm font-black text-white font-headline">₡45.28M</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accesos Rápidos */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <motion.div 
                        whileHover={{ y: -5 }}
                        onClick={() => onNavigate("inventory")}
                        className="cursor-pointer glass-card bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-[#6b38d4] transition-all"
                    >
                        <div className="w-12 h-12 bg-[#6b38d4]/10 rounded-xl flex items-center justify-center text-[#6b38d4] mb-4">
                            <span className="material-symbols-outlined">inventory_2</span>
                        </div>
                        <h4 className="font-bold text-[#0b1c30] text-sm">Inventario</h4>
                        <p className="text-xs text-slate-400">Gestionar productos</p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }}
                        onClick={() => onNavigate("audit")}
                        className="cursor-pointer glass-card bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-[#6b38d4] transition-all"
                    >
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                            <span className="material-symbols-outlined">history_edu</span>
                        </div>
                        <h4 className="font-bold text-[#0b1c30] text-sm">Auditoría</h4>
                        <p className="text-xs text-slate-400">Ver logs del sistema</p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="cursor-not-allowed glass-card bg-white p-6 rounded-2xl border border-slate-100 shadow-sm opacity-60"
                    >
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 mb-4">
                            <span className="material-symbols-outlined">settings</span>
                        </div>
                        <h4 className="font-bold text-slate-400 text-sm">Configuración</h4>
                        <p className="text-xs text-slate-300">Ajustes generales</p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="cursor-not-allowed glass-card bg-[#0b1c30] p-6 rounded-2xl border border-slate-800 shadow-sm"
                    >
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4">
                            <span className="material-symbols-outlined">file_export</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">Exportar</h4>
                        <p className="text-xs text-white/40">Reportes NetSuite</p>
                    </motion.div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
