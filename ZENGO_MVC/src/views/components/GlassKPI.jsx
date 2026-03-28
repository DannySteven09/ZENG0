import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassKPI Component
 * 
 * Un componente reutilizable que implementa el diseño Glassmorphism proporcionado.
 * 
 * @param {string} title - Título del KPI
 * @param {string|number} value - Valor principal a mostrar
 * @param {string} unit - Unidad (opcional, ej. 'unidades', '₡')
 * @param {string} icon - Nombre del icono de Material Symbols
 * @param {string} color - Color de borde y acento (ej. '#6b38d4', 'emerald', 'amber')
 * @param {string} trend - Texto de tendencia (ej. '+4.2%', 'Normal')
 * @param {string} trendColor - Color de la tendencia (ej. 'text-green-600', 'text-amber-600')
 * @param {string} trendBg - Fondo de la tendencia (ej. 'bg-green-50', 'bg-amber-50')
 * @param {number} delay - Retraso de la animación para efecto staggered
 */
const GlassKPI = ({ 
    title, 
    value, 
    unit, 
    icon, 
    color = '#6b38d4', 
    trend, 
    trendColor = 'text-green-600', 
    trendBg = 'bg-green-50',
    delay = 0 
}) => {
    // Determinar si el color es una clase de Tailwind o un código hexadecimal
    const isHex = color.startsWith('#');
    const borderColorClass = isHex ? '' : `border-${color}-500`;
    const iconBgClass = isHex ? '' : `bg-${color}-50`;
    const iconTextColorClass = isHex ? '' : `text-${color}-600`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
            className={`glass-card p-6 rounded-xl border-t-2 relative overflow-hidden group h-full shadow-sm bg-white/70 backdrop-blur-xl border-white/30`}
            style={{ 
                borderTopColor: isHex ? color : undefined,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
        >
            <div className="flex justify-between items-start mb-4">
                <div 
                    className={`p-2 rounded-lg ${iconBgClass} ${iconTextColorClass}`}
                    style={{ 
                        backgroundColor: isHex ? `${color}1A` : undefined, // 1A is ~10% opacity
                        color: isHex ? color : undefined 
                    }}
                >
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                {trend && (
                    <span className={`${trendColor} ${trendBg} text-[10px] font-bold px-2 py-1 rounded-full`}>
                        {trend}
                    </span>
                )}
            </div>
            
            <h3 className="text-slate-500 font-medium text-[10px] uppercase tracking-wider mb-1">
                {title}
            </h3>
            
            <div className="flex items-baseline gap-2">
                <p className="font-headline font-extrabold text-3xl text-[#0b1c30]">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
                {unit && (
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                        {unit}
                    </span>
                )}
            </div>
            
            {/* Gradiente sutil en la parte inferior */}
            <div 
                className="absolute bottom-0 left-0 w-full h-1 opacity-20"
                style={{ 
                    background: isHex 
                        ? `linear-gradient(to right, ${color}, ${color}CC)` 
                        : undefined 
                }}
            ></div>
        </motion.div>
    );
};

export default GlassKPI;
