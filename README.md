# 🏆 MundialApp 2026 — Official Management Portal

Bienvenido al **MundialApp 2026**, la plataforma interactiva definitiva para gestionar, simular y visualizar la **Fase de Grupos (Primera Ronda)** del próximo e histórico Mundial de Fútbol en Norteamérica (México, Canadá y Estados Unidos).

Este aplicativo ha sido diseñado bajo los más altos estándares de desarrollo web moderno: una interfaz cinematográfica ultraligera con un concepto visual **"Cosmic Black & Gold"**, un motor cliente de cálculo de posiciones matemático en tiempo real y soporte inteligente mediante simulaciones locales y resguardo offline.

---

## 🚀 Características Clave

- **Visualización Centrada en el Usuario**: Tablero interactivo con carrusel dinámico de los 12 grupos de la Copa del Mundo.
- **Cálculo Matemático de Posiciones**: Las tablas se actualizan en tiempo de ejecución considerando puntos, partidos jugados, partidos ganados/empatados/perdidos, goles a favor, goles en contra y diferencia de goles con criterios estrictos de desempate oficial (Puntos ➔ Diferencia de Gol ➔ Goles a Favor ➔ Nombre).
- **Consola de Carga de Resultados**: Sección dedicada para buscar partidos por selección, filtrar por fecha/día de juego o por grupo específico, y simular/actualizar marcadores individuales.
- **Soporte Inteligente (IA & Local Fallback)**: Sistema de simulación rápida de todos los resultados con un solo botón que modela resultados realistas mediante una función predictiva local eficiente para preservar recursos.
- **Sección de Noticias del Mundial en Tiempo Real**: Feed dinámico e informativo con artículos adaptados y un resguardo (fallback) proactivo de respaldo ante cuotas saturadas.
- **Footer de Navegación Rápida**: Agenda de partidos interactiva en la parte inferior para seguir los enfrentamientos filtrados cronológicamente día a día.

---

## 🗂️ Distribución de los 12 Grupos (48 Selecciones)

Esta edición cuenta con un formato inédito de **48 países participantes** agrupados en 12 zonas de 4 equipos cada una. Detalle oficial de grupos configurado en el sistema:

| Grupo | Selecciones Participantes |
| :---: | :--- |
| **Grupo A** | 🇲🇽 México, 🇿🇦 Sudáfrica, 🇰🇷 Corea del Sur, 🇨🇿 Chequia |
| **Grupo B** | 🇨🇦 Canadá, 🇧🇦 Bosnia y Herz., 🇶🇦 Catar, 🇨🇭 Suiza |
| **Grupo C** | 🇧🇷 Brasil, 🇲🇦 Marruecos, 🇭🇹 Haití, 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia |
| **Grupo D** | 🇺🇸 Estados Unidos, 🇵🇾 Paraguay, 🇦🇺 Australia, 🇹🇷 Turquía |
| **Grupo E** | 🇩🇪 Alemania, 🇨🇼 Curazao, 🇨🇮 Costa de Marfil, 🇪🇨 Ecuador |
| **Grupo F** | 🇳🇱 Países Bajos, 🇯🇵 Japón, 🇸🇪 Suecia, 🇹🇳 Túnez |
| **Grupo G** | 🇪🇸 España, 🇨🇻 Cabo Verde, 🇸🇦 Arabia Saudí, 🇺🇾 Uruguay |
| **Grupo H** | 🇧🇪 Bélgica, 🇪🇬 Egipto, 🇮🇷 Ri de Irán, 🇳🇿 Nueva Zelanda |
| **Grupo I** | 🇫🇷 Francia, 🇸🇳 Senegal, 🇮🇶 Irak, 🇳🇴 Noruega |
| **Grupo J** | 🇦🇷 Argentina, 🇩🇿 Argelia, 🇦🇹 Austria, 🇯🇴 Jordania |
| **Grupo K** | 🇵🇹 Portugal, 🇨🇩 RD Congo, 🇺🇿 Uzbekistán, 🇨🇴 Colombia |
| **Grupo L** | 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra, 🇭🇷 Croacia, 🇬🇭 Ghana, 🇵🇦 Panamá |

---

## 🗓️ Calendario y Fixture Histórico (72 Partidos)

El fixture completo está precargado en la base de datos interna desde el partido inaugural el **Jueves 11 de Junio** en México hasta los encuentros decisivos del **Sábado 27 de Junio**.

### Algunos Partidos Destacados Precargados:
- **Jueves 11/06 (Inaugural)**: `México vs. Sudáfrica` @ 16:00 HS — *Canal: DSPORTS / Disney+*
- **Viernes 12/06**: `Estados Unidos vs. Paraguay` @ 22:00 HS — *Canal: DSPORTS / TyC Sports / Disney+*
- **Sábado 13/06**: `Brasil vs. Marruecos` @ 19:00 HS — *Canal: DSPORTS / Disney+*
- **Martes 16/06**: `Argentina vs. Alergia` @ 22:00 HS — *Canal: DSPORTS / Canal 7 / TyC Sports*
- **Lunes 22/06**: `Argentina vs. Austria` @ 14:00 HS — *Canal: DSPORTS / Canal 7 / TyC Sports*
- **Sábado 27/06**: `Jordania vs. Argentina` @ 23:00 HS — *Canal: DSPORTS / TyC Sports*

---

## 🏗️ Arquitectura Técnica de la Aplicación

MundialApp 2026 está desarrollado bajo un enfoque integral de pila completa (**Full-stack SPA / Custom Server**):

1. **Frontend (Cliente):**
   - **React (v18+) & Vite:** Estructura de componentes modulares rápidos para rendimiento y cargas inmediatas.
   - **Tailwind CSS:** Diseño UI responsivo completo inspirado en transmisiones premium de TV. Cuenta con paleta oscura, bordes translúcidos (`backdrop-blur`), efectos hover de alta fidelidad, animaciones sutiles y tipografía optimizada.
   - **Lucide React:** Colección premium de iconos vectoriales integrados.

2. **Backend (Servidor customizado):**
   - **Express Server:** Ejecutado en Node de forma nativa. Aloja y expone endpoints clave y sirve los archivos estáticos optimizados.
   - **Esbuild ESM/CJS Bundling:** Compilación del servidor en un único archivo autónomo `dist/server.cjs` para evitar problemas con importaciones de paquetes y acelerar el tiempo de respuesta.
   - **Gemini Live News & Fallback:** El backend incorpora una consulta segura a los modelos de inteligencia artificial de Google para generar noticias actualizadas periódicamente, protegiendo las credenciales mediante un proxy server-side y un robusto soporte de resguardo (fallback) en caso de saturación de cuota.

---

## 📦 Scripts de Ejecución Disponibles

La suite cuenta con las siguientes tareas nativas en `package.json`:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor local en modo de desarrollo (bilingüe tsx + vite watcher en puerto 3000)
npm run dev

# 3. Compilar la aplicación para Producción (construye el cliente estático y empaqueta el servidor)
npm run build

# 4. Levantar la aplicación optimizada para Producción
npm run start
```

---

## 🛠️ Personalización y Extensión

Para modificar la estructura de datos de los equipos, horarios o las señales de televisión donde se transmite cada duelo, simplemente edita:
- `/src/data/tournamentData.ts`

Los componentes visuales están bien segmentados en archivos aislados para maximizar la legibilidad y escalabilidad del proyecto:
- `/src/components/GroupCarousel.tsx` (Gestor de Carrusel e Información de Tabla de Posiciones).
- `/src/components/NewsSection.tsx` (Widget de Noticias con opción de refresco).
- `/src/components/FooterLiveMatches.tsx` (Agenda Dinámica y Buscador Cronológico de Partidos).

---

*Desarrollado con precisión técnica y cariño deportivo para los amantes del fútbol.* ⚽🏟️
