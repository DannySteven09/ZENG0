-- ═══════════════════════════════════════════════════════════════
-- ZENGO v1.7 — Crear usuarios de prueba
-- Ejecutar en: Supabase → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════

-- 1. Desactivar usuarios viejos (hardcodeados anteriores)
UPDATE usuarios SET activo = false
WHERE email IN ('aux@zengo.com');
-- Nota: admin@zengo.com y jefe@zengo.com se mantienen activos como respaldo

-- 2. Insertar nuevos usuarios (ON CONFLICT = si ya existe, no falla)
INSERT INTO usuarios (email, password, nombre, apellido, role_id, activo)
VALUES
    -- ADMIN
    ('admin1@zengo.com',    '123', 'Admin',     'Uno',    1, true),

    -- JEFES
    ('jefe1@zengo.com',     '123', 'Jefe',      'Uno',    2, true),
    ('jefe2@zengo.com',     '123', 'Jefe',      'Dos',    2, true),
    ('jefe3@zengo.com',     '123', 'Jefe',      'Tres',   2, true),

    -- AUXILIARES
    ('auxiliar1@zengo.com', '123', 'Auxiliar',  'Uno',    3, true),
    ('auxiliar2@zengo.com', '123', 'Auxiliar',  'Dos',    3, true),
    ('auxiliar3@zengo.com', '123', 'Auxiliar',  'Tres',   3, true),
    ('auxiliar4@zengo.com', '123', 'Auxiliar',  'Cuatro', 3, true),
    ('auxiliar5@zengo.com', '123', 'Auxiliar',  'Cinco',  3, true)

ON CONFLICT (email) DO UPDATE SET
    activo = true,
    password = EXCLUDED.password;

-- 3. Verificar resultado
SELECT id, email, nombre, apellido, role_id, activo
FROM usuarios
ORDER BY role_id, id;
