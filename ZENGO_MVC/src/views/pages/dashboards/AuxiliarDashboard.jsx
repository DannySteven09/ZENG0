import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import GlassKPI from '../../components/GlassKPI';

const AuxiliarDashboard = ({ onNavigate, onLogout, userName }) => {
    // Datos de la tarea actual (Simulados)
    const [tareaActual] = useState({
        nombre: 'Limpieza y Cíclico: Pasillo 4',
        productosTotales: 100,
        productosContados: 25,
        categoria: 'ACCESORIOS PC'
    });

    const [ranking] = useState(3);
    const [mermaPositiva] = useState(4);
    const [mermaNegativa] = useState(1);
    const [hallazgos] = useState(3);
    
    // Timer logic
    const [startTime] = useState(new Date(Date.now() - 45 * 60000)); // Hace 45 min
    const [elapsed, setElapsed] = useState('00:45:00');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = Math.floor((now - startTime) / 1000);
            const h = Math.floor(diff / 3600).toString().padStart(2, '0');
            const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
            const s = (diff % 60).toString().padStart(2, '0');
            setElapsed(`${h}:${m}:${s}`);
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    const progressPercent = Math.round((tareaActual.productosContados / tareaActual.productosTotales) * 100);

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
                        <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-lg shadow-[#2563EB]/20">
                            <span className="material-symbols-outlined text-white">barcode_scanner</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-black font-headline tracking-tight text-[#0b1c30]">ZENGO AUX</h1>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Ejecución Piso</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">
                            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xs font-black">
                                {userName?.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-[#0b1c30] leading-none">{userName}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Auxiliar de Inventario</p>
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
                {/* Tarea Actual / Categoía */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Tarea Activa</span>
                        <h2 className="text-slate-500 font-bold text-xs uppercase">{tareaActual.categoria}</h2>
                    </div>
                    <h3 className="text-2xl font-black font-headline text-[#0b1c30]">{tareaActual.nombre}</h3>
                </div>

                {/* KPIs Auxiliar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
                    <GlassKPI 
                        title="Tu Ranking"
                        value={`#${ranking}`}
                        icon="trophy"
                        color="#f59e0b"
                        trend="Top 5"
                        trendBg="bg-amber-50"
                        trendColor="text-amber-600"
                        delay={0.1}
                    />
                    <GlassKPI 
                        title="Diferencia (+)"
                        value={mermaPositiva}
                        unit="unidades"
                        icon="add_circle"
                        color="#10b981"
                        trend="Sobrantes"
                        delay={0.2}
                    />
                    <GlassKPI 
                        title="Diferencia (-)"
                        value={mermaNegativa}
                        unit="unidades"
                        icon="remove_circle"
                        color="#ba1a1a"
                        trend="Faltantes"
                        trendColor="text-red-600"
                        trendBg="bg-red-50"
                        delay={0.3}
                    />
                    <GlassKPI 
                        title="Hallazgos"
                        value={hallazgos}
                        icon="search_insights"
                        color="#6b38d4"
                        trend="Reportados"
                        delay={0.4}
                    />
                    
                    {/* El Reloj solicitado con estilo GlassKPI */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-6 rounded-xl border-t-2 border-blue-500 relative overflow-hidden bg-white shadow-sm flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Inicio</p>
                                <p className="text-[10px] font-black text-slate-700">{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-slate-500 font-medium text-[10px] uppercase tracking-wider mb-1">Tiempo Transcurrido</h3>
                            <p className="font-headline font-extrabold text-3xl text-blue-600 tabular-nums">{elapsed}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Avance Visual (100 productos y lleva 25 = 25%) */}
                <div className="glass-card bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-xl font-black font-headline text-[#0b1c30]">Avance del Conteo</h3>
                            <p className="text-sm text-slate-400 font-medium">Estadística en tiempo real de tu progreso</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-blue-600 font-headline">{progressPercent}%</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                                ({tareaActual.productosContados} de {tareaActual.productosTotales} productos)
                            </span>
                        </div>
                    </div>
                    
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-1">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        />
                    </div>
                </div>

                {/* Botón de Acción Principal */}
                <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate("scanner")}
                    className="w-full bg-[#0b1c30] text-white py-6 rounded-2xl font-black font-headline text-xl shadow-xl shadow-slate-200 flex items-center justify-center gap-4 group transition-all"
                >
                    <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">qr_code_scanner</span>
                    CONTINUAR ESCANEO
                </motion.button>
            </motion.div>

            <Footer />
        </div>
    );
};

export default AuxiliarDashboard;
