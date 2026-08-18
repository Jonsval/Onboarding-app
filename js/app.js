/**
 * ==========================================================================
 * ONBOARDING PLATFORM - STATE MANAGEMENT & CORE ENGINE
 * ==========================================================================
 */

(function(window) {
  'use strict';

  // --- Initial / Default Mock State ---
  const DEFAULT_USER = {
    name: 'Alejandro Ruiz',
    role: 'Diseñador Junior',
    email: 'alejandro.ruiz@empresa.com',
    avatar: 'AR',
    bio: 'Diseñador de producto enfocado en interfaces limpias, accesibles y sistemas de diseño.',
    theme: 'dark',
    notifications: {
      emailCourses: true,
      emailAlerts: true,
      pushReminders: true
    },
    xp: 850,
    level: 'Nivel 2 · Explorador'
  };

  const DEFAULT_COURSES = [
    {
      id: 'c1',
      title: 'Cultura y Valores de la Empresa',
      category: 'Inducción General',
      icon: '🏛️',
      colorClass: 'ico-purple',
      hdrClass: 'hdr-purple',
      duration: '2h 15m',
      modulesCount: 4,
      progress: 100,
      status: 'done', // done, prog, pend
      instructor: 'Mariana Silva',
      role: 'Directora de People & Talent',
      description: 'Conoce los pilares fundamentales de nuestra misión, visión, ética laboral y la historia que nos define.',
      certificateAvailable: true,
      certCode: 'CERT-OB-2026-0089',
      issueDate: '12 de Agosto, 2026'
    },
    {
      id: 'c2',
      title: 'Seguridad de la Información y Políticas',
      category: 'Cumplimiento',
      icon: '🔒',
      colorClass: 'ico-orange',
      hdrClass: 'hdr-orange',
      duration: '3h 00m',
      modulesCount: 5,
      progress: 100,
      status: 'done',
      instructor: 'Carlos Mendoza',
      role: 'CISO & Seguridad de la Información',
      description: 'Protocolos de ciberseguridad, manejo seguro de contraseñas, 2FA y prevención contra phishing.',
      certificateAvailable: true,
      certCode: 'CERT-OB-2026-0104',
      issueDate: '14 de Agosto, 2026'
    },
    {
      id: 'c3',
      title: 'Herramientas y Metodologías de Trabajo',
      category: 'Flujos & Stack',
      icon: '🛠️',
      colorClass: 'ico-blue',
      hdrClass: 'hdr-blue',
      duration: '4h 30m',
      modulesCount: 4,
      progress: 50,
      status: 'prog',
      instructor: 'Sofía Valenzuela',
      role: 'Lead Project Manager',
      description: 'Aprende las convenciones de Git, Jira, Figma, Slack y la metodología ágil Scrum que utilizamos en el día a día.',
      certificateAvailable: false,
      certCode: 'CERT-OB-2026-0142',
      issueDate: null,
      modules: [
        { id: 'm1', num: 1, title: 'Bienvenida e Introducción al Ecosistema', type: 'video', time: '14 min', done: true, url: 'onboarding_modulo_video.html' },
        { id: 'm2', num: 2, title: 'Valores, Políticas y Convenciones de Código', type: 'lectura', time: '20 min', done: true, url: 'onboarding_modulo_lectura.html' },
        { id: 'm3', num: 3, title: 'Evaluación de Conocimientos y Metodologías', type: 'evaluacion', time: '25 min', done: false, url: 'onboarding_evaluacion.html' },
        { id: 'm4', num: 4, title: 'Guías de Instalación y Recursos Clave', type: 'documento', time: '10 min', done: false, url: 'onboarding_materiales.html' }
      ]
    },
    {
      id: 'c4',
      title: 'Arquitectura de Software y Estándares',
      category: 'Técnico',
      icon: '⚡',
      colorClass: 'ico-teal',
      hdrClass: 'hdr-teal',
      duration: '3h 45m',
      modulesCount: 4,
      progress: 0,
      status: 'pend',
      instructor: 'Rodrigo Galindo',
      role: 'Staff Engineer',
      description: 'Directrices técnicas sobre microservicios, APIs REST, base de datos y Clean Code.',
      certificateAvailable: false
    },
    {
      id: 'c5',
      title: 'Procesos de Calidad, Testing y Despliegue',
      category: 'DevOps & QA',
      icon: '🚀',
      colorClass: 'ico-red',
      hdrClass: 'hdr-red',
      duration: '2h 50m',
      modulesCount: 3,
      progress: 0,
      status: 'pend',
      instructor: 'Elena Pineda',
      role: 'QA & Release Engineer',
      description: 'Ambientes de staging, pruebas automatizadas, integración continua y monitoreo en producción.',
      certificateAvailable: false
    }
  ];

  const DEFAULT_QUESTIONS = [
    {
      id: 1,
      category: 'Git y versiones',
      question: '¿Cuál es la rama principal de producción según nuestro flujo de GitFlow corporativo?',
      options: [
        'master',
        'main',
        'production-release',
        'latest'
      ],
      correctIndex: 1,
      explanation: 'En todos nuestros repositorios corporativos, la rama protegida para producción es `main`.'
    },
    {
      id: 2,
      category: 'Git y versiones',
      question: '¿Qué convención de prefijo se debe usar en los commits para agregar una nueva funcionalidad?',
      options: [
        'fix:',
        'feat:',
        'chore:',
        'build:'
      ],
      correctIndex: 1,
      explanation: 'Seguimos Conventional Commits: `feat:` se usa para features y nuevas funcionalidades.'
    },
    {
      id: 3,
      category: 'Git y versiones',
      question: '¿Cuál es el límite máximo recomendado de líneas modificadas por Pull Request para una revisión ágil?',
      options: [
        '200 líneas',
        '400 líneas',
        '800 líneas',
        '1500 líneas'
      ],
      correctIndex: 1,
      explanation: 'Recomendamos mantener los PRs por debajo de 400 líneas para asegurar revisiones exhaustivas y rápidas.'
    },
    {
      id: 4,
      category: 'Git y versiones',
      question: '¿Cuál es el formato correcto para nombrar una rama de nueva funcionalidad?',
      options: [
        'nueva-funcionalidad/descripcion',
        'feature/[ticket-id]-descripcion-breve',
        'dev/mi-feature-nombre',
        'branch-[fecha]-descripcion'
      ],
      correctIndex: 1,
      explanation: 'Las ramas de funcionalidad deben llevar el ID del ticket de Jira: `feature/DES-142-onboarding-form`.'
    },
    {
      id: 5,
      category: 'Jira y Confluence',
      question: '¿Qué herramienta oficial utilizamos para documentar acuerdos de arquitectura y minutas de reunión?',
      options: [
        'Google Keep',
        'Confluence',
        'Notepad local',
        'Mensajes directos de Slack'
      ],
      correctIndex: 1,
      explanation: 'Confluence es la base de conocimiento central para documentación técnica y minutas de equipo.'
    },
    {
      id: 6,
      category: 'Jira y Confluence',
      question: '¿En qué estado de Jira debe colocarse una tarea antes de iniciar su desarrollo activo?',
      options: [
        'Backlog',
        'In Progress',
        'Code Review',
        'Done'
      ],
      correctIndex: 1,
      explanation: 'Al tomar una tarea, muévela inmediatamente a `In Progress` para informar a todo el equipo en el tablero.'
    },
    {
      id: 7,
      category: 'Slack y reuniones',
      question: '¿Cuál es el canal oficial de Slack para reportar incidentes críticos o caídas de servicios?',
      options: [
        '#general',
        '#random',
        '#incidentes-criticos-alerta',
        '#soporte-qa'
      ],
      correctIndex: 2,
      explanation: 'Cualquier anomalía que afecte a usuarios debe reportarse de inmediato en `#incidentes-criticos-alerta` con @channel.'
    },
    {
      id: 8,
      category: 'Slack y reuniones',
      question: '¿Cuál es la duración máxima recomendada para nuestra reunión diaria de sincronización (Daily Scrum)?',
      options: [
        '15 minutos',
        '30 minutos',
        '45 minutos',
        '60 minutos'
      ],
      correctIndex: 0,
      explanation: 'La Daily es una sincronización puntual de 15 minutos enfocada en qué se hizo, qué se hará y posibles bloqueos.'
    },
    {
      id: 9,
      category: 'Entorno de desarrollo',
      question: '¿Dónde se deben almacenar las credenciales y variables de entorno secretas en tu máquina local?',
      options: [
        'En un archivo `.env` que esté incluido en el `.gitignore`',
        'Dentro del archivo `README.md`',
        'En el código fuente de los componentes',
        'En comentarios del commit'
      ],
      correctIndex: 0,
      explanation: 'Las claves de API y secretos nunca deben subirse al repositorio Git. Usa variables en `.env` ignoradas por Git.'
    },
    {
      id: 10,
      category: 'Entorno de desarrollo',
      question: '¿Qué paso es obligatorio antes de solicitar el merge de tu Pull Request a la rama de integración?',
      options: [
        'Tener al menos una aprobación (LGTM) y pasar todos los tests de CI',
        'Eliminar todos los tests unitarios',
        'Hacer un commit con el mensaje "listo"',
        'Desplegar manualmente a producción'
      ],
      correctIndex: 0,
      explanation: 'Todo PR requiere aprobación de al menos un peer reviewer y ejecución exitosa del pipeline de CI/CD.'
    }
  ];

  const DEFAULT_NOTIFICATIONS = [
    {
      id: 'n1',
      title: '¡Tienes una evaluación pendiente!',
      message: 'Completa la evaluación final del curso de Herramientas y Metodologías para obtener tu constancia.',
      time: 'Hace 30 min',
      type: 'evaluacion',
      read: false,
      url: 'onboarding_evaluacion.html'
    },
    {
      id: 'n2',
      title: 'Nueva constancia generada',
      message: 'Tu constancia de "Seguridad de la Información" ha sido emitida y está lista para descargar en PDF.',
      time: 'Hace 2 horas',
      type: 'constancia',
      read: false,
      url: 'onboarding_constancias.html'
    },
    {
      id: 'n3',
      title: 'Material actualizado',
      message: 'Se agregó la Guía de Convenciones Git v2.4 en la sección de Materiales descargables.',
      time: 'Ayer',
      type: 'material',
      read: true,
      url: 'onboarding_materiales.html'
    },
    {
      id: 'n4',
      title: '¡Bienvenido a la plataforma!',
      message: 'Tu ruta de inducción está lista. Revisa tus cursos asignados para comenzar.',
      time: 'Hace 3 días',
      type: 'sistema',
      read: true,
      url: 'onboarding_dashboard.html'
    }
  ];

  const DEFAULT_MATERIALS = [
    {
      id: 'mat1',
      title: 'Guía de Convenciones Git y Flujo GitFlow',
      type: 'PDF',
      tagClass: 'ft-pdf',
      size: '2.4 MB',
      updated: '15 Ago 2026',
      icon: '📄',
      desc: 'Reglas de commits semánticos, nombrado de ramas y buenas prácticas de PRs.'
    },
    {
      id: 'mat2',
      title: 'Manual de Identidad y Sistema de Diseño UI',
      type: 'PDF',
      tagClass: 'ft-pdf',
      size: '14.8 MB',
      updated: '10 Ago 2026',
      icon: '🎨',
      desc: 'Colores oficiales, tokens tipográficos, espaciados y componentes en Figma.'
    },
    {
      id: 'mat3',
      title: 'Plantilla de Minutas y Reporte de Sprints',
      type: 'PPT',
      tagClass: 'ft-ppt',
      size: '5.1 MB',
      updated: '08 Ago 2026',
      icon: '📊',
      desc: 'Plantilla estándar para presentaciones de Sprint Review y retrospectivas.'
    },
    {
      id: 'mat4',
      title: 'Checklist de Configuración de Entorno Local',
      type: 'DOC',
      tagClass: 'ft-pdf',
      size: '1.2 MB',
      updated: '14 Ago 2026',
      icon: '⚙️',
      desc: 'Paso a paso para instalar Node, Git, Docker, VPN y llaves SSH institucionales.'
    },
    {
      id: 'mat5',
      title: 'Video: Recorrido por las Oficinas y Beneficios',
      type: 'VID',
      tagClass: 'ft-vid',
      size: '120 MB',
      updated: '01 Ago 2026',
      icon: '🎬',
      desc: 'Presentación ejecutiva sobre prestaciones, seguro de gastos médicos y días libres.'
    }
  ];

  // --- Storage Helper Functions ---
  const Storage = {
    get: function(key, defaultVal) {
      try {
        const item = localStorage.getItem('onboarding_' + key);
        return item ? JSON.parse(item) : defaultVal;
      } catch (e) {
        console.warn('LocalStorage error:', e);
        return defaultVal;
      }
    },
    set: function(key, val) {
      try {
        localStorage.setItem('onboarding_' + key, JSON.stringify(val));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }
  };

  // --- Core Onboarding State Object ---
  const App = {
    user: Storage.get('user', DEFAULT_USER),
    courses: Storage.get('courses', DEFAULT_COURSES),
    questions: Storage.get('questions', DEFAULT_QUESTIONS),
    notifications: Storage.get('notifications', DEFAULT_NOTIFICATIONS),
    materials: Storage.get('materials', DEFAULT_MATERIALS),
    evalAnswers: Storage.get('evalAnswers', {}),
    evalResult: Storage.get('evalResult', null),
    
    // Save State
    saveUser: function(userUpdates) {
      this.user = Object.assign({}, this.user, userUpdates);
      Storage.set('user', this.user);
      this.syncUI();
    },

    saveCourses: function() {
      Storage.set('courses', this.courses);
    },

    saveNotifications: function() {
      Storage.set('notifications', this.notifications);
    },

    saveEvalResult: function(result) {
      this.evalResult = result;
      Storage.set('evalResult', result);
    },

    getOverallProgress: function() {
      if (!this.courses || !this.courses.length) return 0;
      const total = this.courses.reduce((acc, c) => acc + (c.progress || 0), 0);
      return Math.round(total / this.courses.length);
    },

    getUnreadNotifsCount: function() {
      return this.notifications.filter(n => !n.read).length;
    },

    markAllNotifsRead: function() {
      this.notifications.forEach(n => n.read = true);
      this.saveNotifications();
      this.syncUI();
    },

    completeModule: function(courseId, moduleId) {
      const course = this.courses.find(c => c.id === courseId);
      if (course && course.modules) {
        const mod = course.modules.find(m => m.id === moduleId);
        if (mod) mod.done = true;
        
        const doneCount = course.modules.filter(m => m.done).length;
        course.progress = Math.round((doneCount / course.modules.length) * 100);
        if (course.progress === 100) {
          course.status = 'done';
          course.certificateAvailable = true;
          course.issueDate = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        } else {
          course.status = 'prog';
        }
        this.saveCourses();
      }
    },

    // Sync elements across current page
    syncUI: function() {
      // User name and avatar initials
      document.querySelectorAll('.user-name-display').forEach(el => el.textContent = this.user.name);
      document.querySelectorAll('.user-role-display').forEach(el => el.textContent = this.user.role);
      document.querySelectorAll('.user-email-display').forEach(el => el.textContent = this.user.email);
      document.querySelectorAll('.user-avatar-display').forEach(el => el.textContent = this.user.avatar || 'AR');
      
      // Theme
      if (this.user.theme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }

      // Notifications badge
      const unread = this.getUnreadNotifsCount();
      document.querySelectorAll('.notif-badge-count').forEach(el => {
        el.textContent = unread;
        el.style.display = unread > 0 ? 'inline-block' : 'none';
      });
      document.querySelectorAll('.notif-dot').forEach(el => {
        el.style.display = unread > 0 ? 'block' : 'none';
      });
    },

    // Toast Notification System
    showToast: function(title, message, type = 'info') {
      let container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      let icon = '🔔';
      if (type === 'success') icon = '✅';
      if (type === 'warning') icon = '⚠️';
      if (type === 'error') icon = '❌';

      toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-body">
          <h5>${title}</h5>
          <p>${message}</p>
        </div>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    },

    // Simulated File Download
    downloadMockFile: function(filename, content = 'Onboarding Document') {
      const element = document.createElement('a');
      const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      this.showToast('Descarga iniciada', `El archivo ${filename} se ha descargado con éxito.`, 'success');
    }
  };

  // --- Dynamic Layout Setup on DOM Ready ---
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Initial State Sync
    App.syncUI();

    // 2. Profile Dropdown Setup
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileMenu = document.querySelector('.dropdown-menu');

    if (profileTrigger && profileMenu) {
      profileTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        profileMenu.classList.toggle('show');
        const caret = profileTrigger.querySelector('.pt-caret');
        if (caret) {
          caret.style.transform = profileMenu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0)';
        }
      });

      document.addEventListener('click', function(e) {
        if (!profileMenu.contains(e.target) && !profileTrigger.contains(e.target)) {
          profileMenu.classList.remove('show');
          const caret = profileTrigger.querySelector('.pt-caret');
          if (caret) caret.style.transform = 'rotate(0)';
        }
      });
    }

    // 3. Mobile Navigation Drawer Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('mobile-open');
      });

      document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== mobileBtn) {
          sidebar.classList.remove('mobile-open');
        }
      });
    }

    // 4. Global Keyboard Shortcut for Search (Press '/' to focus search)
    document.addEventListener('keydown', function(e) {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('.sh-input, .search-box input');
        if (searchInput) {
          searchInput.focus();
        } else {
          window.location.href = 'onboarding_busqueda.html';
        }
      }
    });

    // 5. Logout links handler
    document.querySelectorAll('.dd-logout, .btn-logout').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        App.showToast('Sesión cerrada', 'Has cerrado tu sesión con éxito.', 'info');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 600);
      });
    });
  });

  window.OnboardingApp = App;
})(window);
