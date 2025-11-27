# Wavy Funnel Chart 🌊

Componente React para crear gráficos de embudo con efecto ondulado en SVG.

## Características

- ✅ **Lado izquierdo RECTO/PLANO** - línea completamente recta
- ✅ **Lado derecho ONDULADO/CURVO** - efecto de onda sinusoidal
- ✅ **Reactivo** - recibe valores y se actualiza automáticamente
- ✅ **Animaciones suaves** de entrada y hover
- ✅ **Labels a la derecha** con líneas conectoras horizontales
- ✅ **ESLint configurado**

## Herramientas y Tecnologías

| Tecnología               | Uso                                           |
| ------------------------ | --------------------------------------------- |
| **React 18.2.0**         | Framework principal para construir la UI      |
| **Vite**                 | Bundler y servidor de desarrollo ultrarrápido |
| **PropTypes**            | Validación de props en componentes            |
| **@tabler/icons-react**  | Iconos (IconMinus, IconInfoCircle)            |
| **ESLint**               | Linter para mantener código limpio            |
| **Google Fonts (Inter)** | Tipografía del proyecto                       |

## Librerías Importadas

```jsx
// App.jsx
import WavyFunnel from './components/WavyFunnel';
import { IconInfoCircle, IconMinus } from '@tabler/icons-react';
import './App.css';

// WavyFunnel.jsx
import PropTypes from 'prop-types';
import './WavyFunnel.css';
```

## Instalación

```bash
npm install
```

## Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## Ejecutar Localmente

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Se abrirá en `http://localhost:5173` (puerto por defecto de Vite)

## Desplegar en GitHub Pages

1. **Instalar gh-pages:**

```bash
npm install gh-pages --save-dev
```

2. **Agregar en `package.json`:**

```json
{
  "homepage": "https://JalVargas.github.io/Graficos",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Desplegar:**

```bash
npm run deploy
```

4. **Visualizar en:**

```
https://JalVargas.github.io/Graficos
```

## Estructura del Proyecto

```
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── WavyFunnel/
│   │       ├── WavyFunnel.jsx
│   │       ├── WavyFunnel.css
│   │       └── index.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .eslintrc.json
├── package.json
└── README.md
```

## Uso del Componente WavyFunnel

```jsx
import WavyFunnel from './components/WavyFunnel';

// Website Traffic
const trafficData = [
  { label: 'Sessions', value: 281717, color: '#64a9ab' },
  { label: 'Vehicle Views', value: 112679, color: '#74c4c6' },
  { label: 'TrueLeads', value: 1781, color: '#eab234' },
];

// Consumer Journey
const consumerData = [
  { label: 'Total Impressions', value: 473830, color: '#1a5a5c' },
  { label: 'Total Clicks', value: 12429, color: '#3d8a8c' },
  { label: 'Known Shoppers', value: 500, color: '#6ab0b2' },
  { label: 'High Marketing Score', value: 125, color: '#9dd4d6' },
];

<WavyFunnel
  data={trafficData}
  width={450}
  height={350}
  waveAmplitude={15}
  waveFrequency={3}
  leftMargin={30}
  segmentGap={0}
  animated={true}
/>;
```

## Props

| Prop            | Tipo    | Default | Descripción                                        |
| --------------- | ------- | ------- | -------------------------------------------------- |
| `data`          | Array   | `[]`    | Datos del funnel con objetos {label, value, color} |
| `width`         | Number  | `500`   | Ancho del gráfico                                  |
| `height`        | Number  | `400`   | Alto del gráfico                                   |
| `waveAmplitude` | Number  | `15`    | Amplitud de la onda del lado derecho               |
| `waveFrequency` | Number  | `3`     | Frecuencia de ondas                                |
| `leftMargin`    | Number  | `30`    | Margen del lado recto izquierdo                    |
| `segmentGap`    | Number  | `0`     | Espacio entre segmentos                            |
| `animated`      | Boolean | `true`  | Habilitar animaciones                              |

## Estructura de Datos

```javascript
const data = [
  {
    label: string, // Etiqueta del segmento
    value: number, // Valor numérico
    color: string, // Color en formato hex (#RRGGBB) o rgba()
  },
];
```

## Técnicas SVG Utilizadas

- **Path con curvas Bezier** para el borde ondulado
- **Función sinusoidal** `Math.sin()` para generar la onda continua
- **Interpolación lineal** para el efecto funnel (ancho decreciente)
- **Líneas conectoras** alineadas con el borde ondulado

## Implementación Técnica

- SVG con paths personalizados
- Lado izquierdo: línea recta (M y L)
- Lado derecho: líneas con offset sinusoidal para onda continua
- Gradientes de color por segmento (oscuro a claro)
- Efectos hover (brightness y scale)
- Labels posicionados a la derecha con líneas horizontales

## Dependencias principales

- react ^18.2.0
- react-dom ^18.2.0
- vite ^4.x
- prop-types ^15.8.1
- @tabler/icons-react ^3.35.0
- recharts ^3.5.0
- eslint ^8.57.1
- eslint-plugin-react ^7.37.5
- eslint-plugin-react-hooks ^4.6.0
- prettier ^3.7.1

## Linting y Formato Automático

Este proyecto integra **ESLint** y **Prettier** para mantener el código limpio y consistente.

- El archivo `.eslintrc.cjs` ya incluye la configuración para Prettier junto con las reglas recomendadas de React.
- El archivo `.prettierrc` define las reglas de formato (comillas simples, punto y coma, ancho de línea, etc.).
- Puedes ejecutar el linter con:

```bash
npm run lint
```

Para corregir automáticamente los problemas de formato, puedes usar:

```bash
npx eslint src --fix
```

> **Nota:** Si tu editor soporta ESLint y Prettier, activa las extensiones para ver los errores y advertencias en tiempo real.
