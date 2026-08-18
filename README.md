# 🎓 OnboardingApp — Plataforma Web de Capacitación e Inducción

Una plataforma web interactiva, moderna y completamente funcional para la inducción y capacitación de nuevos colaboradores, lista para ser alojada en **GitHub** y desplegada mediante **GitHub Pages**.

---

## 🌟 Características Principales

1. **Arquitectura Web 100% Funcional**:
   - Construida con HTML5 semántico, CSS3 moderno con variables y tokens de diseño, y Vanilla JavaScript reactivo.
   - Sin dependencias pesadas ni necesidad de compiladores; funciona directamente en cualquier navegador o servidor estático.

2. **Diseño Responsivo y Elegante**:
   - Adaptable a pantallas de escritorio (4K, 1080p), laptops, tablets y dispositivos móviles.
   - Tema oscuro nativo con acentos en índigo, naranja y verde esmeralda, más soporte de **Modo Claro** toggleable en Configuración.

3. **Estado Global Persistente (`localStorage`)**:
   - Guarda el progreso de cursos, módulos completados, respuestas y calificaciones de exámenes, insignias obtenidas, constancias emitidas y preferencias del usuario.

4. **17 Módulos y Pantallas Interconectadas**:
   - `index.html`: Portal de inicio de sesión con validación de credenciales, acceso SSO corporativo y modo demostración.
   - `onboarding_dashboard.html`: Panel principal con barra de bienvenida, porcentaje de avance en vivo, cursos activos, constancias rápidas y notificaciones.
   - `onboarding_cursos.html`: Catálogo de cursos con filtros dinámicos (Todos, En Progreso, Completados, Pendientes) y búsqueda en tiempo real.
   - `onboarding_detalle_curso.html`: Ficha de curso con temario completo (video, lectura, evaluación, materiales), objetivos de aprendizaje e información del instructor.
   - `onboarding_modulo_video.html`: Reproductor de video interactivo con controles de reproducción, barra de tiempo scrubbeable, selector de velocidad, notas y transcripción.
   - `onboarding_modulo_lectura.html`: Lector de artículos con barra de progreso superior pegajosa al hacer scroll, selector de tamaño de fuente y checklist de buenas prácticas.
   - `onboarding_evaluacion.html`: Motor de examen interactivo con 10 preguntas, temporizador de 25 minutos, selector de opciones y matriz de estado (respondidas / pendientes).
   - `onboarding_resultado_evaluacion.html`: Calificador dinámico con gráfico circular animado, retroalimentación detallada por pregunta y desglose por competencia.
   - `onboarding_logro.html`: Modal de celebración con confeti animado, puntos XP ganados (+250 XP) y botón para compartir.
   - `onboarding_progreso.html`: Tablero analítico con gráfico de barras de actividad semanal, radial de avance general y radar de competencias.
   - `onboarding_constancias.html`: Portal de diplomas digitales con validador de folios institucionales.
   - `onboarding_constancia_pdf.html`: Diploma digital en alta resolución con marco dorado ornamental, código QR y estilos optimizados para impresión física o PDF (`window.print()`).
   - `onboarding_materiales.html`: Biblioteca de recursos con filtros por tipo (PDF, PPT, DOC, VID), búsqueda y descarga de archivos.
   - `onboarding_busqueda.html`: Buscador universal en vivo con filtros por categoría y resaltado de coincidencias con `<mark>`.
   - `onboarding_notificaciones.html`: Bandeja de notificaciones con marcado de leídas, filtrado y eliminación.
   - `onboarding_configuracion.html`: Panel de configuración de cuenta, editor de perfil, cambio de iniciales de avatar y selector de modo claro/oscuro.
   - `onboarding_dropdown_perfil.html`: Sandbox del menú de perfil desplegable accesible desde la barra superior de cualquier página.

---

## 🚀 Cómo Subir a GitHub y Activar GitHub Pages

### Opción 1: Subir archivos desde la Web de GitHub (Sin instalar Git)
1. Ve a [GitHub.com](https://github.com) e inicia sesión.
2. Haz clic en **"New repository"** (Nuevo repositorio).
3. Nómbralo por ejemplo: `onboarding-app`.
4. Selecciona **Public** y haz clic en **"Create repository"**.
5. En la página del repositorio, haz clic en **"uploading an existing file"** (subir archivos existentes).
6. Arrastra todos los archivos y carpetas (`index.html`, `*.html`, `css/`, `js/`, `README.md`) desde `C:\Users\188828\Downloads\files\`.
7. Haz clic en **"Commit changes"**.
8. Ve a la pestaña **Settings** (Configuración) de tu repositorio > menú lateral **Pages**.
9. En **Build and deployment > Branch**, selecciona la rama `main` y la carpeta `/ (root)`. Haz clic en **Save**.
10. ¡Listo! En unos segundos tendrás tu sitio publicado en: `https://<tu-usuario>.github.io/onboarding-app/`.

### Opción 2: Usando la Terminal / Git CLI
```bash
# 1. En la carpeta de los archivos
git init
git add .
git commit -m "feat: plataforma de onboarding completa con 17 vistas interactivas"

# 2. Conectar a tu repositorio de GitHub
git branch -M main
git remote add origin https://github.com/<tu-usuario>/onboarding-app.git
git push -u origin main
```

---

## 💻 Ejecución Local
Puedes abrir directamente cualquier archivo `.html` (por ejemplo `index.html` o `onboarding_dashboard.html`) haciendo doble clic en tu explorador de archivos, o iniciar un servidor local con cualquier extensión como Live Server en VS Code o con Python:
```bash
python -m http.server 8000
```
Y abrir `http://localhost:8000` en tu navegador.
