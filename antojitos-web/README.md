# Antojitos al Paso - Next.js + Sanity CMS

## Descripción

Este proyecto es una migración del sitio estático de Antojitos al Paso a Next.js con Sanity CMS como sistema de gestión de contenidos.

### Características

- ✅ Administración de productos desde el panel de Sanity (accesible desde celular)
- ✅ Cambio de precios y productos en tiempo real
- ✅ Sistema de pedidos por WhatsApp
- ✅ Cargo automático de S/. 3.00 por delivery
- ✅ Icono de ubicación profesional (SVG pin)
- ✅ Diseño responsivo

## Requisitos Previos

1. Node.js 18+ instalado
2. Cuenta en [Sanity.io](https://sanity.io)

## Instalación

### 1. Instalar dependencias

```bash
cd antojitos-web
npm install
```

### 2. Configurar Sanity CMS

1. Crea un proyecto en [sanity.io](https://sanity.io):
   ```bash
   npm create sanity@latest
   ```

2. Durante la configuración, selecciona:
   - Project name: `antojitos-al-paso`
   - Dataset: `production`
   - Template: `Clean project`

3. Copia el `projectId` de tu proyecto Sanity

4. Edita el archivo `.env.local` y reemplaza `TU_PROJECT_ID` con tu ID de proyecto:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_aqui
   ```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`
El panel de administración estará en `http://localhost:3000/studio`

## Panel de Administración (Sanity Studio)

### Acceder desde celular

1. Despliega el proyecto a Vercel (instrucciones más abajo)
2. Accede a `https://tu-proyecto.vercel.app/studio`
3. Inicia sesión con tu cuenta de Sanity
4. ¡Ya puedes administrar productos desde tu celular!

### Cómo agregar/editar productos

1. Ve al panel de administración
2. Haz clic en "Producto" en el menú lateral
3. Para agregar: haz clic en "Create new"
4. Para editar: haz clic en el producto existente

**Campos del producto:**
- **Nombre**: Nombre del plato
- **Descripción**: Descripción del producto
- **Precio**: Precio en soles (S/.)
- **Categoría**: Pollo a la Brasa / Fast Food / Bebidas
- **Imagen**: Foto del producto
- **Disponible**: Activar/desactivar producto
- **Destacado**: Mostrar badge de "popular"

## Despliegue

### Opción 1: Vercel (Recomendado)

1. Sube el código a GitHub
2. Ve a [Vercel](https://vercel.com)
3. Importa el repositorio
4. Agrega las variables de entorno:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
5. Despliega

### Opción 2: Netlify

1. Sube el código a GitHub
2. Ve a [Netlify](https://netlify.com)
3. Importa el repositorio
4. Comando de build: `npm run build`
5. Directorio de output: `.next`
6. Agrega las variables de entorno

## Estructura del Proyecto

```
antojitos-web/
├── app/                    # Páginas de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx          # Página principal
│   └── globals.css       # Estilos globales
├── sanity/               # Configuración de Sanity
│   ├── config.ts         # Configuración del CMS
│   └── schemas/         # Esquemas de datos
│       └── producto.ts   # Schema de productos
├── lib/                  # Utilidades
│   └── sanity.ts         # Cliente de Sanity
├── public/               # Archivos estáticos
├── .env.local            # Variables de entorno
├── package.json          # Dependencias
└── next.config.js        # Configuración de Next.js
```

## Cambios Realizados

### En el proyecto original (estático)

1. **Icono de ubicación**: Cambiado de emoji 📍 a SVG de pin de ubicación profesional
2. **Cargo de delivery**: Agregado cargo automático de S/. 3.00 cuando se selecciona delivery
3. **Actualización de precios**: El precio se muestra con 2 decimales

## Soporte

Para dudas o problemas, consulta la documentación de:
- [Next.js](https://nextjs.org/docs)
- [Sanity.io](https://www.sanity.io/docs)
