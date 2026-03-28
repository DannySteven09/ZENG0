import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';

const AuditView = ({ onNavigate, userName }) => {
    // Datos simulados de logs (Se cargarían de Supabase)
    const [logs] = useState([
        { id: 1, user: 'D. Steven', action: 'Ajuste de Inventario', detail: 'Pasillo 4 - SKU: 10293 (+2)', time: 'Hace 5 min', type: 'update' },
        { id: 2, user: 'M. Rodríguez', action: 'Inicio de Conteo', detail: 'Pasillo 12 - Categoría: Hogar', time: 'Hace 12 min', type: 'info' },
        { id: 3, user: 'A. López', action: 'Hallazgo Reportado', detail: 'Deterioro en empaque - SKU: 55432', time: 'Hace 18 min', type: 'warning' },
        { id: 4, user: 'D. Steven', action: 'Exportación NetSuite', detail: 'Archivo generado: ADJ_2024_03.csv', time: 'Hace 45 min', type: 'success' },
        { id: 5, user: 'Sistemas', action: 'Sincronización Supabase', detail: '1,250 registros actualizados', time: 'Hace 1 hora', type: 'info' },
    ]);

    const getTypeStyles = (type) => {
        switch (type) {
            case 'update': return 'bg-blue-100 text-blue-600';
            case 'warning': return 'bg-amber-100 text-amber-600';
            case 'success': return 'bg-emerald-100 text-emerald-600';
            case 'info': return 'bg-slate-100 text-slate-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f9ff]">
            {/* Header simple para sub-vista */}
            <motion.header
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="bg-white border-b border-slate-200 text-slate-800 shadow-sm sticky top-0 z-50"
            >
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => onNavigate('dashboard')}
                            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-all group"
                        >
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-[#6b38d4]">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="text-xl font-black font-headline tracking-tight text-[#0b1c30]">LOG DE AUDITORÍA</h1>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Registros del Sistema</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <div className="hidden sm:flex items-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">
                            <span className="text-[10px] font-bold text-slate-400 mr-2">FILTRANDO:</span>
                            <span className="text-[10px] font-black text-[#6b38d4] uppercase">Todos los eventos</span>
                        </div>
                    </div>
                </div>
            </motion.header>

            <motion.div 
                className="container mx-auto px-4 md:px-6 py-8 flex-grow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* Filtros rápidos */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
                    {['Todos', 'Ajustes', 'Usuarios', 'Alertas', 'Exportaciones'].map((filter, i) => (
                        <button 
                            key={i}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                i === 0 ? 'bg-[#6b38d4] text-white shadow-lg shadow-[#6b38d4]/20' : 'bg-white text-slate-500 border border-slate-100 hover:border-[#6b38d4]/30'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Lista de Logs con Look Premium */}
                <div className="glass-card bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Evento</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Usuario</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detalle de Actividad</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Tiempo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {logs.map((log) => (
                                    <motion.tr 
                                        key={log.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: log.id * 0.1 }}
                                        className="hover:bg-slate-50/80 transition-colors group"
                                    >
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${getTypeStyles(log.type).split(' ')[1].replace('text-', 'bg-')}`}></div>
                                                <span className="text-sm font-bold text-[#0b1c30]">{log.action}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-[9px] font-black text-slate-500 uppercase">
                                                    {log.user.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-xs font-semibold text-slate-600">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-xs text-slate-500 leading-relaxed font-medium">{log.detail}</p>
                                        </td>
                                        <td className="px-6 py-5 text-right whitespace-nowrap">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">{log.time}</span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Footer de la tabla / Paginación */}
                    <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400">MOSTRANDO 5 DE 128 EVENTOS</span>
                        <div className="flex gap-2">
                            <button className="p-1 px-3 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 hover:text-[#6b38d4] disabled:opacity-50">ANTERIOR</button>
                            <button className="p-1 px-3 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-[#6b38d4] hover:bg-[#6b38d4] hover:text-white transition-all shadow-sm shadow-[#6b38d4]/10">SIGUIENTE</button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default AuditView;
