# Respostas do Exercício 2 - Horários de Aula

## 1. Quantidade de horas que cada professor tem comprometido em aulas

Para resolver esta questão, é necessário cruzar as informações das tabelas `PROFESSOR`, `CLASS` (para associar o professor à turma) e `CLASS_SCHEDULE` (para obter os horários). A duração de cada aula é calculada pela diferença entre o `end_time` e o `start_time`. O resultado é agrupado por professor para somar todas as suas horas.

**Consulta SQL:**

```sql
SELECT
    p.name AS nome_professor,
    -- A função exata para calcular a diferença de tempo pode variar
    -- dependendo do sistema de banco de dados (MySQL, PostgreSQL, etc.).
    -- O cálculo abaixo é uma representação genérica.
    SUM(cs.end_time - cs.start_time) AS total_horas_comprometidas
FROM
    PROFESSOR p
JOIN
    CLASS c ON p.id = c.taught_by
JOIN
    CLASS_SCHEDULE cs ON c.id = cs.class_id
GROUP BY
    p.name
ORDER BY
    total_horas_comprometidas DESC;

-- Resolução do problema do Professor Girafales

SELECT
    b.name AS nome_predio,
    r.name AS nome_sala,
    cs.day_of_week AS dia_da_semana,
    cs.start_time AS horario_inicio,
    cs.end_time AS horario_fim,
    'OCUPADO' AS status
FROM
    BUILDING b
JOIN
    ROOM r ON b.id = r.building_id
JOIN
    CLASS c ON r.id = c.room_id
JOIN
    CLASS_SCHEDULE cs ON c.id = cs.class_id
ORDER BY
    b.name,
    r.name,
    cs.day_of_week,
    cs.start_time;