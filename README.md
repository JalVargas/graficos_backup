# Wavy Funnel Chart 🌊

Componente React para crear gráficos de embudo con efecto ondulado en SVG.

## Características

- ✅ **Lado izquierdo RECTO/PLANO** - línea completamente recta
- ✅ **Lado derecho ONDULADO/CURVO** - efecto de onda sinusoidal
- ✅ **Reactivo** - recibe valores y se actualiza automáticamente
- ✅ **Animaciones suaves** de entrada y hover
- ✅ **ESLint configurado**

## Instalación

```bash
npm install
```

## Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar linter
npm run lint
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

const data = [
  { label: 'Visitantes', value: 10000, color: '#6366f1' },
  { label: 'Leads', value: 7500, color: '#8b5cf6' },
  { label: 'Prospectos', value: 5000, color: '#a855f7' },
  { label: 'Negociaciones', value: 2500, color: '#d946ef' },
  { label: 'Ventas', value: 1000, color: '#ec4899' }
];

<WavyFunnel
  data={data}
  width={400}
  height={500}
  waveAmplitude={15}
  waveFrequency={3}
  leftMargin={50}
  segmentGap={4}
  animated={true}
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `data` | Array | `[]` | Datos del funnel con objetos {label, value, color} |
| `width` | Number | `400` | Ancho del gráfico |
| `height` | Number | `500` | Alto del gráfico |
| `waveAmplitude` | Number | `15` | Amplitud de la onda del lado derecho |
| `waveFrequency` | Number | `3` | Frecuencia de ondas |
| `leftMargin` | Number | `50` | Margen del lado recto izquierdo |
| `segmentGap` | Number | `4` | Espacio entre segmentos |
| `animated` | Boolean | `true` | Habilitar animaciones |

## Estructura de Datos

```javascript
const data = [
  {
    label: string,  // Etiqueta del segmento
    value: number,  // Valor numérico
    color: string   // Color en formato hex (#RRGGBB)
  }
];
```

## Funcionalidades de la Demo (App.jsx)

1. **Estado reactivo** - Los datos del funnel se actualizan automáticamente
2. **Inputs editables** - Modifica los valores en tiempo real
3. **Valores aleatorios** - Botón para generar datos aleatorios
4. **Simulación en tiempo real** - Actualización automática cada 1.5s (7 iteraciones)
5. **Ejemplo de código** - Muestra cómo usar el componente programáticamente

## Implementación Técnica

- SVG con paths personalizados
- Lado izquierdo: línea recta (M y L)
- Lado derecho: curvas cuadráticas (Q) con función sinusoidal
- Gradientes de color por segmento
- Efectos hover (translateX y shadow)

## Estilos

- Fondo degradado oscuro (#1a1a2e a #16213e)
- Cards con glassmorphism (backdrop-filter blur)
- Botones con gradientes y efectos hover
- Diseño responsive

## Dependencias

- react ^18.2.0
- react-dom ^18.2.0
- prop-types ^15.8.1
- eslint ^8.57.0
- eslint-plugin-react ^7.34.1
- eslint-plugin-react-hooks ^4.6.0