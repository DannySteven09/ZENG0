-- ═══════════════════════════════════════════════════════════════
-- ZENGO v1.7 — Tabla de Ranking Permanente
-- Ejecutar en: Supabase → SQL Editor → New Query → Run
-- ⚠ Esta tabla NUNCA se borra — acumula historial de precisión
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS estadisticas_auxiliares (
    auxiliar_id          INTEGER      PRIMARY KEY REFERENCES usuarios(id),
    auxiliar_nombre      VARCHAR(200) NOT NULL,
    total_ciclicos       INTEGER      NOT NULL DEFAULT 0,
    suma_pa              NUMERIC(12,4) NOT NULL DEFAULT 0,  -- suma acum. precisión absoluta
    suma_pn              NUMERIC(12,4) NOT NULL DEFAULT 0,  -- suma acum. precisión neta
    promedio_pa          NUMERIC(6,2)  NOT NULL DEFAULT 0,  -- promedio precisión absoluta %
    promedio_pn          NUMERIC(6,2)  NOT NULL DEFAULT 0,  -- promedio precisión neta %
    score_ranking        NUMERIC(6,2)  NOT NULL DEFAULT 0,  -- (promedio_pa + promedio_pn) / 2
    ultima_actualizacion TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Índices para ordenar ranking rápido
CREATE INDEX IF NOT EXISTS idx_ranking_score ON estadisticas_auxiliares(score_ranking DESC);

-- RLS y permisos
ALTER TABLE estadisticas_auxiliares ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ranking_leer"   ON estadisticas_auxiliares;
DROP POLICY IF EXISTS "ranking_crear"  ON estadisticas_auxiliares;
DROP POLICY IF EXISTS "ranking_editar" ON estadisticas_auxiliares;

CREATE POLICY "ranking_leer"   ON estadisticas_auxiliares FOR SELECT USING (true);
CREATE POLICY "ranking_crear"  ON estadisticas_auxiliares FOR INSERT WITH CHECK (true);
CREATE POLICY "ranking_editar" ON estadisticas_auxiliares FOR UPDATE USING (true);

GRANT SELECT, INSERT, UPDATE ON estadisticas_auxiliares TO anon, authenticated;

-- Verificar
SELECT '✅ Tabla estadisticas_auxiliares creada' AS status;
SELECT * FROM estadisticas_auxiliares ORDER BY score_ranking DESC;
