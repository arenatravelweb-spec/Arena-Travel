# Arena Travel

Sitio web de la agencia de viajes Arena Travel: landing pública con paquetes, destinos y rifas, flujo de reserva de varios pasos, panel de administración y panel de cliente, con pagos integrados vía Mercado Pago.

## Stack

- **Frontend:** React 18 + Vite, React Router
- **Backend / datos:** Supabase (Postgres, Auth, Edge Functions)
- **Pagos:** Mercado Pago (`@mercadopago/sdk-react`, preferencias vía API/Edge Functions, webhook de confirmación)
- **Imágenes:** Cloudinary
- **Email:** EmailJS
- **UI:** Sonner (toasts), SweetAlert2, React Icons
- **Validación:** Zod
- **Hosting:** Vercel

## Estructura del proyecto

```
src/
  components/       Componentes de la landing (Hero, Destinations, Packages, Rifas, etc.)
  components/reserva/  Pasos del flujo de reserva (pasajeros, habitaciones, transporte, checkout, itinerario)
  context/           AuthContext, ReservaContext
  lib/                Clientes de Supabase, Cloudinary, lógica de pricing
  pages/              Home, PaqueteDetalle, Reservar, y páginas de admin/cliente
api/                  Funciones serverless de Vercel (crear-preferencia, verificar-pago) para Mercado Pago
supabase/
  functions/          Edge Functions (crear-preferencia-mp, crear-rifa-pago, mp-webhook)
  migrations/         Migraciones SQL de la base de datos
scripts/              Scripts de seed / migración de datos puntuales
```

## Rutas principales

- `/` — Landing (destinos, paquetes, rifas, testimonios, contacto)
- `/paquete/:id` — Detalle de un paquete
- `/reservar` — Flujo de reserva (pasajeros → habitaciones → transporte → resumen → checkout)
- `/admin/login` — Login de administración
- `/admin` — Panel de administración (rol `developer`)
- `/cliente` — Panel de cliente (rol `cliente`)

## Requisitos

- Node.js (compatible con Vite 5)
- Un proyecto de Supabase
- Credenciales de Mercado Pago, Cloudinary y EmailJS

## Variables de entorno

Crear un archivo `.env.local` (no se commitea) con:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SERVICE_ROLE=
SUPABASE_SERVICE_ROLE_KEY=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=

VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=

MP_ACCESS_TOKEN=
MP_ACCESS_TOKEN_TEST=
MP_SANDBOX=
VITE_MP_PUBLIC_KEY=
```

> Nunca subir `.env` / `.env.local` con valores reales al repositorio.

## Instalación y desarrollo

```bash
npm install
npm run dev       # levanta Vite en modo desarrollo (incluye proxy local para /api/crear-preferencia)
```

## Build y preview

```bash
npm run build     # genera la carpeta dist/
npm run preview   # sirve el build de producción localmente
```

## Base de datos (Supabase)

Las migraciones SQL viven en `supabase/migrations/`. Aplicarlas con la Supabase CLI:

```bash
supabase db push
```

Las Edge Functions (`supabase/functions/`) manejan la creación de preferencias de pago y el webhook de Mercado Pago; se despliegan con:

```bash
supabase functions deploy <nombre-de-la-funcion>
```

## Despliegue

El proyecto está configurado para Vercel (`vercel.json`), con `dist/` como carpeta de salida y las funciones de `api/` sirviendo los endpoints de pago en producción.
