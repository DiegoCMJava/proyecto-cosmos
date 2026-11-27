# Proyecto Cosmos — Portal Educativo

Plataforma educativa web diseñada para explorar recursos interactivos, simulaciones astronómicas y herramientas científicas mediante una interfaz reactiva, modular y tipada.

## Stack Tecnológico

- **Framework:** React 18 / 19 con TypeScript
- **Empaquetador:** Vite
- **Estilos:** Tailwind CSS v4
- **Despliegue:** Vercel (SPA)

## Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/DiegoCMJava/proyecto-cosmos.git

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción (validación de tipos y bundle)
npm run build

# 5. Vista previa del build local
npm run preview
```

## Estructura del Proyecto

- `src/components/`: Componentes de interfaz de usuario (tarjetas, paginación, filtros).
- `src/hooks/`: Custom hooks con lógica de filtrado y paginación.
- `src/types/`: Definiciones e interfaces TypeScript para el catálogo y metadatos.
- `src/data/`: Catálogo centralizado en formato JSON (`cosmosItems.json`).

## Licencia

Este proyecto está distribuido bajo los términos de la licencia indicada en el archivo `LICENSE`.
