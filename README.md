# 🌱 Madre Tierra - App de Gestión de Tareas Agrícolas

Aplicación desarrollada en **React Native con Expo** para visualizar y gestionar tareas agrícolas por temporada. La app incluye funciones de filtrado, detalles de cada tarea, y un historial de tareas completadas con almacenamiento local en SQLite.

---

📱 Diferencias entre iOS y Android
✅ Comportamiento observado:
En iOS, al rotar la pantalla en modo landscape, los componentes se solapaban con la isla dinámica o notch.

En Android, el comportamiento fue más consistente y no presentó conflictos de diseño en modo horizontal.

🛠️ Solución:
Se utilizó SafeAreaView desde react-native-safe-area-context para respetar los límites seguros de visualización en ambas plataformas, asegurando que los filtros y listas no se ocultaran tras la interfaz del sistema.

✅ Pruebas realizadas
Se realizaron pruebas tanto en simuladores como en dispositivos físicos:

📱 iOS Simulator (iPhone 14 Pro, iOS 17):

Rotación horizontal detectó encimamiento en filtros, corregido con SafeAreaView.

Comportamiento general de botones, inputs y listas fue consistente.

🤖 Android Emulator (Pixel 5, Android 13):

Fluidez de navegación sin problemas.

El diseño se adaptó correctamente en landscape y portrait.

🔍 Validaciones realizadas:

Registro correcto de tareas completadas en SQLite.

Navegación fluida entre Home, Detalle y Historial.

Filtrado funcional por nombre y fecha.

Compatibilidad visual entre plataformas.

app/
├── components/         → Componentes reutilizables (TaskCard, etc.)
├── data/               → Archivo tasks.json con datos base
├── features/           → Vistas agrupadas por funcionalidad
│   ├── home/           → HomeScreen (lista y filtros)
│   ├── tasks/          → Detalle de tareas
│   └── profile/        → Historial de tareas completadas
├── hooks/              → Custom hooks como useFilteredTasks y useCompletedTasks
└── services/           → Lógica de SQLite


## 🚀 Instrucciones para correr el proyecto

1. Instala las dependencias:

```bash
npm install

para iniciar el proyecto: 
npx expo start

| Librería                                 | Uso                  | Justificación                                                                           |
| ---------------------------------------- | -------------------- | --------------------------------------------------------------------------------------- |
| `expo-sqlite`                            | Almacenamiento local | Permite guardar y consultar el historial de tareas completadas sin conexión a internet. |
| `react-native-safe-area-context`         | Diseño adaptable     | Garantiza compatibilidad con zonas seguras en iOS (notch, isla dinámica).               |
| `@react-native-community/datetimepicker` | Selección de fecha   | Para filtrar tareas completadas por fecha en la pantalla de historial.                  |
| `expo-router`                            | Navegación           | Manejo de rutas tipo archivo para organización modular y escalabilidad.                 |
| `expo/vector-icons`                      | Iconos               | Uso de iconos como `check-circle` para indicar tareas completadas.                      |
