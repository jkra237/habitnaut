// HabitNaut Translations - English, Spanish, German

export type SupportedLanguage = 'en' | 'es' | 'de';

export interface Translations {
  // Common
  common: {
    back: string;
    save: string;
    cancel: string;
    continue: string;
    skip: string;
    done: string;
  };
  
  // Onboarding
  onboarding: {
    welcome: string;
    welcomeSubtitle: string;
    welcomeSubtitle2: string;
    begin: string;
    questionsAhead: string;
    noRightAnswer: string;
    startingPoints: string;
    startingPointsSubtitle: string;
    startingPointsHint: string;
    continueWithSelected: string;
    skipForNow: string;
    allSet: string;
    allSetSubtitle: string;
    startObserving: string;
    // Language selection
    chooseLanguage: string;
    languageSubtitle: string;
    // Questions
    questions: {
      rhythm: string;
      rhythmA: string;
      rhythmB: string;
      energy: string;
      energyA: string;
      energyB: string;
      motivation: string;
      motivationA: string;
      motivationB: string;
      approach: string;
      approachA: string;
      approachB: string;
      focus: string;
      focusA: string;
      focusB: string;
      recovery: string;
      recoveryA: string;
      recoveryB: string;
      pace: string;
      paceA: string;
      paceB: string;
      tone: string;
      toneA: string;
      toneB: string;
    };
  };
  
  // Settings
  settings: {
    title: string;
    profile: {
      title: string;
      subtitle: string;
      syncedAs: string;
      currentSnapshot: string;
      snapshotNote: string;
      revisitQuestions: string;
      revisitSubtitle: string;
      resetProfile: string;
      resetSubtitle: string;
      deleteEverywhere: string;
      deleteSubtitle: string;
    };
    habits: {
      title: string;
      subtitle: string;
      enableReminders: string;
      deviceSettings: string;
      habitsObserving: string;
      active: string;
      resting: string;
    };
    experience: {
      title: string;
      subtitle: string;
      insightFrequency: {
        rare: string;
        rareDesc: string;
        occasional: string;
        occasionalDesc: string;
        weekly: string;
        weeklyDesc: string;
      };
      reflectionTypes: string;
      patterns: string;
      patternsDesc: string;
      connections: string;
      connectionsDesc: string;
      prompts: string;
      promptsDesc: string;
      neverPrescriptive: string;
      weekStartsOn: string;
      monday: string;
      sunday: string;
    };
    privacy: {
      title: string;
      subtitle: string;
      storedLocally: string;
      storedInCloud: string;
      habits: string;
      dailyEntries: string;
      personalityProfile: string;
      appPreferences: string;
      profileAndHabits: string;
      dailyEntriesOptIn: string;
      googleDrive: string;
      googleDriveSubtitle: string;
      exportData: string;
      exportSubtitle: string;
      importData: string;
      importSubtitle: string;
      clearLogs: string;
      clearLogsSubtitle: string;
    };
    about: {
      title: string;
      subtitle: string;
      philosophy: string;
      philosophyText: string;
      version: string;
    };
    language: {
      title: string;
      subtitle: string;
    };
    sections: {
      profile: string;
      habitsReminders: string;
      appExperience: string;
      dataPrivacy: string;
      support: string;
    };
  };
  
  // Dashboard
  dashboard: {
    howAreYou: string;
    checkedIn: string;
    optionalCheckin: string;
    mood: string;
    energy: string;
    noJudgment: string;
    thisWeek: string;
    insights: string;
    addHabit: string;
  };
  
  // Habits
  habits: {
    letRest: string;
    letRestSubtitle: string;
    letGo: string;
    letGoSubtitle: string;
    restingHabits: string;
    restingNote: string;
    wake: string;
    done: string;
    skipped: string;
    notDone: string;
  };
  
  // Mood options
  mood: {
    heavy: string;
    low: string;
    neutral: string;
    good: string;
    bright: string;
  };
  
  // Energy options
  energyLevels: {
    depleted: string;
    low: string;
    steady: string;
    good: string;
    high: string;
  };
  
  // Insights
  insights: {
    noticedConnection: string;
    patternEmerged: string;
    somethingToConsider: string;
  };
  
  // Recommended habits
  recommendedHabits: {
    morningPages: { name: string; reason: string };
    sunriseWalk: { name: string; reason: string };
    morningStretch: { name: string; reason: string };
    eveningReflection: { name: string; reason: string };
    windDown: { name: string; reason: string };
    nightReading: { name: string; reason: string };
    mindfulPause: { name: string; reason: string };
    flowCheck: { name: string; reason: string };
    dailyMovement: { name: string; reason: string };
    anchorRoutine: { name: string; reason: string };
    creativeSprint: { name: string; reason: string };
    restRitual: { name: string; reason: string };
    powerBreak: { name: string; reason: string };
    energyCheck: { name: string; reason: string };
    rideTheWave: { name: string; reason: string };
    gratitude: { name: string; reason: string };
    valuesCheck: { name: string; reason: string };
    progressNote: { name: string; reason: string };
    shareLearning: { name: string; reason: string };
    intentionSetting: { name: string; reason: string };
    planTomorrow: { name: string; reason: string };
    weeklyReview: { name: string; reason: string };
    followCuriosity: { name: string; reason: string };
    surpriseSelf: { name: string; reason: string };
    flexibleFocus: { name: string; reason: string };
    deepWork: { name: string; reason: string };
    singleTask: { name: string; reason: string };
    taskVariety: { name: string; reason: string };
    quietTime: { name: string; reason: string };
    natureMoment: { name: string; reason: string };
    connectSomeone: { name: string; reason: string };
    slowMorning: { name: string; reason: string };
    quickWins: { name: string; reason: string };
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    common: {
      back: 'Back',
      save: 'Save',
      cancel: 'Cancel',
      continue: 'Continue',
      skip: 'Skip',
      done: 'Done',
    },
    onboarding: {
      welcome: 'Welcome',
      welcomeSubtitle: 'This is a space for observation, not optimization.',
      welcomeSubtitle2: "Let's discover how you naturally work.",
      begin: 'Begin',
      questionsAhead: 'Just a few gentle questions ahead',
      noRightAnswer: "There's no right answer – just what feels true for you",
      startingPoints: 'Starting points',
      startingPointsSubtitle: 'Based on your rhythm, here are some habits that might feel natural.',
      startingPointsHint: 'Select any that resonate—or skip for now.',
      continueWithSelected: 'Continue with selected',
      skipForNow: 'Skip for now',
      allSet: "You're all set",
      allSetSubtitle: 'Your space is ready. No streaks. No pressure. Just gentle self-observation.',
      startObserving: 'Start observing',
      chooseLanguage: 'Choose your language',
      languageSubtitle: 'You can change this anytime in settings',
      questions: {
        rhythm: 'When do you feel most alive?',
        rhythmA: 'In the quiet morning hours',
        rhythmB: 'When the world slows down at night',
        energy: 'How does your energy usually flow?',
        energyA: 'Steady and consistent throughout',
        energyB: 'In waves and bursts of intensity',
        motivation: 'What moves you forward?',
        motivationA: 'An inner sense of what matters',
        motivationB: 'The pull of goals and outcomes',
        approach: 'How do you prefer to navigate your days?',
        approachA: 'With a gentle structure',
        approachB: 'Following what feels right',
        focus: 'How do you prefer to work on things?',
        focusA: 'Deep and focused on one thing',
        focusB: 'Varied and switching between interests',
        recovery: 'How do you best recharge?',
        recoveryA: 'In quiet solitude',
        recoveryB: 'Around people I care about',
        pace: 'What pace feels natural to you?',
        paceA: 'Slow and deliberate',
        paceB: 'Quick and dynamic',
        tone: "When something doesn't work, what helps you more?",
        toneA: 'A gentle reminder',
        toneB: 'A clear nudge',
      },
    },
    settings: {
      title: 'Settings',
      profile: {
        title: 'Your Profile',
        subtitle: 'View & edit your snapshot',
        syncedAs: 'Synced as',
        currentSnapshot: 'Your current snapshot',
        snapshotNote: 'This reflects how you currently tend to approach habits.',
        revisitQuestions: 'Revisit Questions',
        revisitSubtitle: 'You can revisit this anytime',
        resetProfile: 'Reset Profile',
        resetSubtitle: 'Start fresh. Nothing carries over.',
        deleteEverywhere: 'Delete Everywhere',
        deleteSubtitle: 'Removes your data from this device and the cloud',
      },
      habits: {
        title: 'Reminders',
        subtitle: 'Gentle reminders, if you want them.',
        enableReminders: 'Enable reminders',
        deviceSettings: "Uses your device's notification settings",
        habitsObserving: "habits you're observing",
        active: 'active',
        resting: 'resting',
      },
      experience: {
        title: 'Insights & Reflections',
        subtitle: "How often you'd like reflections to appear.",
        insightFrequency: {
          rare: 'Rare',
          rareDesc: 'About once a month — quiet observation',
          occasional: 'Occasional',
          occasionalDesc: 'Every 1-2 weeks — gentle reflections',
          weekly: 'Weekly',
          weeklyDesc: 'Weekly — regular self-observation prompts',
        },
        reflectionTypes: 'Types of reflections:',
        patterns: 'Patterns',
        patternsDesc: 'observing trends over time',
        connections: 'Connections',
        connectionsDesc: 'highlighting possible links',
        prompts: 'Prompts',
        promptsDesc: 'gentle questions for introspection',
        neverPrescriptive: 'Never prescriptive. Never "you should". Just observations.',
        weekStartsOn: 'Week starts on',
        monday: 'Monday',
        sunday: 'Sunday',
      },
      privacy: {
        title: 'Your Data',
        subtitle: 'Your data belongs to you.',
        storedLocally: 'Stored locally',
        storedInCloud: 'Stored in cloud',
        habits: 'habits',
        dailyEntries: 'daily entries',
        personalityProfile: 'Personality profile',
        appPreferences: 'App preferences',
        profileAndHabits: 'Profile & habits',
        dailyEntriesOptIn: 'Daily entries (opt-in)',
        googleDrive: 'Connect to Google Drive',
        googleDriveSubtitle: 'Save your data to Google Cloud',
        exportData: 'Export Data',
        exportSubtitle: 'Download your data as JSON',
        importData: 'Import Data',
        importSubtitle: 'Restore from a previous export',
        clearLogs: 'Clear Local Logs',
        clearLogsSubtitle: 'Remove daily entries from this device',
      },
      about: {
        title: 'Help & About',
        subtitle: 'Learn how this app works',
        philosophy: 'Philosophy',
        philosophyText: 'HabitNaut is about observation, not optimization. No streaks, no guilt, no pressure.',
        version: 'Version',
      },
      language: {
        title: 'Language',
        subtitle: 'Choose your preferred language',
      },
      sections: {
        profile: 'Profile',
        habitsReminders: 'Habits & Reminders',
        appExperience: 'App Experience',
        dataPrivacy: 'Data & Privacy',
        support: 'Support',
      },
    },
    dashboard: {
      howAreYou: 'How are you today?',
      checkedIn: 'Checked in',
      optionalCheckin: 'Optional, just if you feel like it',
      mood: 'Mood',
      energy: 'Energy',
      noJudgment: 'No judgment – just noticing',
      thisWeek: 'This week',
      insights: 'Insights',
      addHabit: 'Add habit',
    },
    habits: {
      letRest: 'Let rest',
      letRestSubtitle: 'Pause gently',
      letGo: 'Let go',
      letGoSubtitle: 'Release completely',
      restingHabits: 'Resting habits',
      restingNote: 'Some habits only accompany us for a while. You can wake them when you\'re ready.',
      wake: 'Wake',
      done: 'Done',
      skipped: 'Skipped',
      notDone: 'Not done',
    },
    mood: {
      heavy: 'Heavy',
      low: 'Low',
      neutral: 'Neutral',
      good: 'Good',
      bright: 'Bright',
    },
    energyLevels: {
      depleted: 'Depleted',
      low: 'Low',
      steady: 'Steady',
      good: 'Good',
      high: 'High',
    },
    insights: {
      noticedConnection: 'Noticed a connection',
      patternEmerged: 'A pattern emerged',
      somethingToConsider: 'Something to consider',
    },
    recommendedHabits: {
      morningPages: { name: 'Morning pages', reason: 'Aligns with your morning clarity' },
      sunriseWalk: { name: 'Sunrise walk', reason: 'Captures your peak energy time' },
      morningStretch: { name: 'Morning stretch', reason: 'Gentle start to your day' },
      eveningReflection: { name: 'Evening reflection', reason: 'Honors your contemplative nights' },
      windDown: { name: 'Wind-down ritual', reason: 'Supports your evening rhythm' },
      nightReading: { name: 'Night reading', reason: 'Feeds your nocturnal mind' },
      mindfulPause: { name: 'Mindful pause', reason: 'Fits your flexible rhythm' },
      flowCheck: { name: 'Flow check-in', reason: 'Honors your natural timing' },
      dailyMovement: { name: 'Daily movement', reason: 'Maintains your steady flow' },
      anchorRoutine: { name: 'Anchor routine', reason: 'Supports your steady nature' },
      creativeSprint: { name: 'Creative sprint', reason: 'Channels your burst energy' },
      restRitual: { name: 'Rest ritual', reason: 'Balances your intensity' },
      powerBreak: { name: 'Power break', reason: 'Recharge between bursts' },
      energyCheck: { name: 'Energy check-in', reason: 'Honors your natural waves' },
      rideTheWave: { name: 'Ride the wave', reason: 'Work with your flow' },
      gratitude: { name: 'Gratitude moment', reason: 'Nurtures your inner compass' },
      valuesCheck: { name: 'Values check-in', reason: 'Reconnects with what matters' },
      progressNote: { name: 'Progress note', reason: 'Celebrates visible growth' },
      shareLearning: { name: 'Share a learning', reason: 'Connects with others' },
      intentionSetting: { name: 'Set an intention', reason: 'Bridges inner and outer goals' },
      planTomorrow: { name: 'Plan tomorrow', reason: 'Supports your love of structure' },
      weeklyReview: { name: 'Weekly review', reason: 'Creates clarity and order' },
      followCuriosity: { name: 'Follow curiosity', reason: 'Celebrates your spontaneity' },
      surpriseSelf: { name: 'Surprise yourself', reason: 'Keeps things fresh' },
      flexibleFocus: { name: 'One focus thing', reason: 'Adapts to your day' },
      deepWork: { name: 'Deep work block', reason: 'Protects your focus time' },
      singleTask: { name: 'Single-tasking', reason: 'Honors your depth' },
      taskVariety: { name: 'Mix it up', reason: 'Feeds your varied interests' },
      quietTime: { name: 'Quiet time', reason: 'Restores your energy' },
      natureMoment: { name: 'Nature moment', reason: 'Peaceful recharge' },
      connectSomeone: { name: 'Connect with someone', reason: 'Energizes through others' },
      slowMorning: { name: 'Slow morning', reason: 'Honors your natural pace' },
      quickWins: { name: 'Quick wins', reason: 'Matches your momentum' },
    },
  },
  
  es: {
    common: {
      back: 'Volver',
      save: 'Guardar',
      cancel: 'Cancelar',
      continue: 'Continuar',
      skip: 'Omitir',
      done: 'Hecho',
    },
    onboarding: {
      welcome: 'Bienvenido',
      welcomeSubtitle: 'Este es un espacio para observar, no para optimizar.',
      welcomeSubtitle2: 'Descubramos cómo trabajas naturalmente.',
      begin: 'Comenzar',
      questionsAhead: 'Solo unas pocas preguntas suaves por delante',
      noRightAnswer: 'No hay respuesta correcta – solo lo que sientes verdadero para ti',
      startingPoints: 'Puntos de partida',
      startingPointsSubtitle: 'Basado en tu ritmo, aquí hay algunos hábitos que podrían sentirse naturales.',
      startingPointsHint: 'Selecciona los que resuenen contigo—o salta por ahora.',
      continueWithSelected: 'Continuar con seleccionados',
      skipForNow: 'Omitir por ahora',
      allSet: 'Todo listo',
      allSetSubtitle: 'Tu espacio está listo. Sin rachas. Sin presión. Solo autoobservación gentil.',
      startObserving: 'Comenzar a observar',
      chooseLanguage: 'Elige tu idioma',
      languageSubtitle: 'Puedes cambiarlo en cualquier momento en ajustes',
      questions: {
        rhythm: '¿Cuándo te sientes más vivo?',
        rhythmA: 'En las tranquilas horas de la mañana',
        rhythmB: 'Cuando el mundo se calma por la noche',
        energy: '¿Cómo fluye tu energía normalmente?',
        energyA: 'Constante y consistente durante todo el día',
        energyB: 'En oleadas e intensos estallidos',
        motivation: '¿Qué te impulsa hacia adelante?',
        motivationA: 'Un sentido interno de lo que importa',
        motivationB: 'La atracción de metas y resultados',
        approach: '¿Cómo prefieres navegar tus días?',
        approachA: 'Con una estructura suave',
        approachB: 'Siguiendo lo que se siente correcto',
        focus: '¿Cómo prefieres trabajar en las cosas?',
        focusA: 'Profundo y enfocado en una cosa',
        focusB: 'Variado y alternando entre intereses',
        recovery: '¿Cómo te recargas mejor?',
        recoveryA: 'En tranquila soledad',
        recoveryB: 'Rodeado de personas que me importan',
        pace: '¿Qué ritmo te resulta natural?',
        paceA: 'Lento y deliberado',
        paceB: 'Rápido y dinámico',
        tone: 'Cuando algo no funciona, ¿qué te ayuda más?',
        toneA: 'Un recordatorio suave',
        toneB: 'Un empujón claro',
      },
    },
    settings: {
      title: 'Ajustes',
      profile: {
        title: 'Tu Perfil',
        subtitle: 'Ver y editar tu instantánea',
        syncedAs: 'Sincronizado como',
        currentSnapshot: 'Tu instantánea actual',
        snapshotNote: 'Esto refleja cómo tiendes actualmente a abordar los hábitos.',
        revisitQuestions: 'Revisar Preguntas',
        revisitSubtitle: 'Puedes revisarlo en cualquier momento',
        resetProfile: 'Restablecer Perfil',
        resetSubtitle: 'Empezar de nuevo. Nada se conserva.',
        deleteEverywhere: 'Eliminar en Todas Partes',
        deleteSubtitle: 'Elimina tus datos de este dispositivo y la nube',
      },
      habits: {
        title: 'Recordatorios',
        subtitle: 'Recordatorios suaves, si los deseas.',
        enableReminders: 'Activar recordatorios',
        deviceSettings: 'Usa la configuración de notificaciones de tu dispositivo',
        habitsObserving: 'hábitos que estás observando',
        active: 'activos',
        resting: 'descansando',
      },
      experience: {
        title: 'Reflexiones e Intuiciones',
        subtitle: 'Con qué frecuencia te gustaría que aparezcan las reflexiones.',
        insightFrequency: {
          rare: 'Rara vez',
          rareDesc: 'Aproximadamente una vez al mes — observación tranquila',
          occasional: 'Ocasional',
          occasionalDesc: 'Cada 1-2 semanas — reflexiones suaves',
          weekly: 'Semanal',
          weeklyDesc: 'Semanal — indicaciones regulares de autoobservación',
        },
        reflectionTypes: 'Tipos de reflexiones:',
        patterns: 'Patrones',
        patternsDesc: 'observando tendencias con el tiempo',
        connections: 'Conexiones',
        connectionsDesc: 'destacando posibles vínculos',
        prompts: 'Indicaciones',
        promptsDesc: 'preguntas suaves para la introspección',
        neverPrescriptive: 'Nunca prescriptivo. Nunca "deberías". Solo observaciones.',
        weekStartsOn: 'La semana comienza el',
        monday: 'Lunes',
        sunday: 'Domingo',
      },
      privacy: {
        title: 'Tus Datos',
        subtitle: 'Tus datos te pertenecen.',
        storedLocally: 'Almacenado localmente',
        storedInCloud: 'Almacenado en la nube',
        habits: 'hábitos',
        dailyEntries: 'entradas diarias',
        personalityProfile: 'Perfil de personalidad',
        appPreferences: 'Preferencias de la app',
        profileAndHabits: 'Perfil y hábitos',
        dailyEntriesOptIn: 'Entradas diarias (opcional)',
        googleDrive: 'Conectar a Google Drive',
        googleDriveSubtitle: 'Guarda tus datos en Google Cloud',
        exportData: 'Exportar Datos',
        exportSubtitle: 'Descargar tus datos como JSON',
        importData: 'Importar Datos',
        importSubtitle: 'Restaurar desde una exportación anterior',
        clearLogs: 'Borrar Registros Locales',
        clearLogsSubtitle: 'Eliminar entradas diarias de este dispositivo',
      },
      about: {
        title: 'Ayuda y Acerca de',
        subtitle: 'Aprende cómo funciona esta app',
        philosophy: 'Filosofía',
        philosophyText: 'HabitNaut trata de observación, no de optimización. Sin rachas, sin culpa, sin presión.',
        version: 'Versión',
      },
      language: {
        title: 'Idioma',
        subtitle: 'Elige tu idioma preferido',
      },
      sections: {
        profile: 'Perfil',
        habitsReminders: 'Hábitos y Recordatorios',
        appExperience: 'Experiencia de la App',
        dataPrivacy: 'Datos y Privacidad',
        support: 'Soporte',
      },
    },
    dashboard: {
      howAreYou: '¿Cómo estás hoy?',
      checkedIn: 'Registrado',
      optionalCheckin: 'Opcional, solo si te apetece',
      mood: 'Ánimo',
      energy: 'Energía',
      noJudgment: 'Sin juicio – solo observando',
      thisWeek: 'Esta semana',
      insights: 'Reflexiones',
      addHabit: 'Añadir hábito',
    },
    habits: {
      letRest: 'Dejar descansar',
      letRestSubtitle: 'Pausar suavemente',
      letGo: 'Soltar',
      letGoSubtitle: 'Liberar completamente',
      restingHabits: 'Hábitos descansando',
      restingNote: 'Algunos hábitos solo nos acompañan por un tiempo. Puedes despertarlos cuando estés listo.',
      wake: 'Despertar',
      done: 'Hecho',
      skipped: 'Omitido',
      notDone: 'No hecho',
    },
    mood: {
      heavy: 'Pesado',
      low: 'Bajo',
      neutral: 'Neutral',
      good: 'Bien',
      bright: 'Brillante',
    },
    energyLevels: {
      depleted: 'Agotado',
      low: 'Bajo',
      steady: 'Estable',
      good: 'Bien',
      high: 'Alto',
    },
    insights: {
      noticedConnection: 'Notamos una conexión',
      patternEmerged: 'Surgió un patrón',
      somethingToConsider: 'Algo para considerar',
    },
    recommendedHabits: {
      morningPages: { name: 'Páginas matutinas', reason: 'Se alinea con tu claridad matutina' },
      sunriseWalk: { name: 'Caminata al amanecer', reason: 'Captura tu momento de máxima energía' },
      morningStretch: { name: 'Estiramiento matutino', reason: 'Comienzo suave de tu día' },
      eveningReflection: { name: 'Reflexión vespertina', reason: 'Honra tus noches contemplativas' },
      windDown: { name: 'Ritual de relajación', reason: 'Apoya tu ritmo vespertino' },
      nightReading: { name: 'Lectura nocturna', reason: 'Alimenta tu mente nocturna' },
      mindfulPause: { name: 'Pausa consciente', reason: 'Se adapta a tu ritmo flexible' },
      flowCheck: { name: 'Chequeo de flujo', reason: 'Honra tu timing natural' },
      dailyMovement: { name: 'Movimiento diario', reason: 'Mantiene tu flujo constante' },
      anchorRoutine: { name: 'Rutina ancla', reason: 'Apoya tu naturaleza constante' },
      creativeSprint: { name: 'Sprint creativo', reason: 'Canaliza tu energía en ráfagas' },
      restRitual: { name: 'Ritual de descanso', reason: 'Equilibra tu intensidad' },
      powerBreak: { name: 'Pausa energética', reason: 'Recarga entre ráfagas' },
      energyCheck: { name: 'Chequeo de energía', reason: 'Honra tus oleadas naturales' },
      rideTheWave: { name: 'Surfea la ola', reason: 'Trabaja con tu flujo' },
      gratitude: { name: 'Momento de gratitud', reason: 'Nutre tu brújula interior' },
      valuesCheck: { name: 'Chequeo de valores', reason: 'Reconecta con lo que importa' },
      progressNote: { name: 'Nota de progreso', reason: 'Celebra el crecimiento visible' },
      shareLearning: { name: 'Compartir un aprendizaje', reason: 'Conecta con otros' },
      intentionSetting: { name: 'Establecer intención', reason: 'Une metas internas y externas' },
      planTomorrow: { name: 'Planificar mañana', reason: 'Apoya tu amor por la estructura' },
      weeklyReview: { name: 'Revisión semanal', reason: 'Crea claridad y orden' },
      followCuriosity: { name: 'Seguir la curiosidad', reason: 'Celebra tu espontaneidad' },
      surpriseSelf: { name: 'Sorpréndete', reason: 'Mantiene las cosas frescas' },
      flexibleFocus: { name: 'Un enfoque flexible', reason: 'Se adapta a tu día' },
      deepWork: { name: 'Bloque de trabajo profundo', reason: 'Protege tu tiempo de enfoque' },
      singleTask: { name: 'Tarea única', reason: 'Honra tu profundidad' },
      taskVariety: { name: 'Mezcla variada', reason: 'Alimenta tus intereses variados' },
      quietTime: { name: 'Tiempo tranquilo', reason: 'Restaura tu energía' },
      natureMoment: { name: 'Momento en la naturaleza', reason: 'Recarga pacífica' },
      connectSomeone: { name: 'Conectar con alguien', reason: 'Energiza a través de otros' },
      slowMorning: { name: 'Mañana lenta', reason: 'Honra tu ritmo natural' },
      quickWins: { name: 'Victorias rápidas', reason: 'Coincide con tu impulso' },
    },
  },
  
  de: {
    common: {
      back: 'Zurück',
      save: 'Speichern',
      cancel: 'Abbrechen',
      continue: 'Weiter',
      skip: 'Überspringen',
      done: 'Fertig',
    },
    onboarding: {
      welcome: 'Willkommen',
      welcomeSubtitle: 'Dies ist ein Raum für Beobachtung, nicht für Optimierung.',
      welcomeSubtitle2: 'Lass uns entdecken, wie du natürlich arbeitest.',
      begin: 'Beginnen',
      questionsAhead: 'Nur ein paar sanfte Fragen voraus',
      noRightAnswer: 'Es gibt keine richtige Antwort – nur was sich für dich wahr anfühlt',
      startingPoints: 'Ausgangspunkte',
      startingPointsSubtitle: 'Basierend auf deinem Rhythmus, hier sind einige Gewohnheiten, die sich natürlich anfühlen könnten.',
      startingPointsHint: 'Wähle welche, die mit dir resonieren—oder überspringe vorerst.',
      continueWithSelected: 'Mit Ausgewählten fortfahren',
      skipForNow: 'Vorerst überspringen',
      allSet: 'Alles bereit',
      allSetSubtitle: 'Dein Raum ist bereit. Keine Streaks. Kein Druck. Nur sanfte Selbstbeobachtung.',
      startObserving: 'Beobachtung starten',
      chooseLanguage: 'Wähle deine Sprache',
      languageSubtitle: 'Du kannst dies jederzeit in den Einstellungen ändern',
      questions: {
        rhythm: 'Wann fühlst du dich am lebendigsten?',
        rhythmA: 'In den ruhigen Morgenstunden',
        rhythmB: 'Wenn die Welt nachts zur Ruhe kommt',
        energy: 'Wie fließt deine Energie normalerweise?',
        energyA: 'Stetig und konstant durchgehend',
        energyB: 'In Wellen und intensiven Schüben',
        motivation: 'Was treibt dich voran?',
        motivationA: 'Ein inneres Gefühl für das, was wichtig ist',
        motivationB: 'Die Anziehungskraft von Zielen und Ergebnissen',
        approach: 'Wie navigierst du am liebsten durch deine Tage?',
        approachA: 'Mit einer sanften Struktur',
        approachB: 'Dem folgend, was sich richtig anfühlt',
        focus: 'Wie arbeitest du am liebsten an Dingen?',
        focusA: 'Tief und fokussiert auf eine Sache',
        focusB: 'Abwechslungsreich und zwischen Interessen wechselnd',
        recovery: 'Wie lädst du dich am besten auf?',
        recoveryA: 'In ruhiger Einsamkeit',
        recoveryB: 'Umgeben von Menschen, die mir wichtig sind',
        pace: 'Welches Tempo fühlt sich für dich natürlich an?',
        paceA: 'Langsam und bedacht',
        paceB: 'Schnell und dynamisch',
        tone: 'Wenn etwas nicht funktioniert, was hilft dir mehr?',
        toneA: 'Eine sanfte Erinnerung',
        toneB: 'Ein klarer Schubs',
      },
    },
    settings: {
      title: 'Einstellungen',
      profile: {
        title: 'Dein Profil',
        subtitle: 'Dein Snapshot ansehen & bearbeiten',
        syncedAs: 'Synchronisiert als',
        currentSnapshot: 'Dein aktueller Snapshot',
        snapshotNote: 'Dies spiegelt wider, wie du derzeit dazu neigst, Gewohnheiten anzugehen.',
        revisitQuestions: 'Fragen erneut besuchen',
        revisitSubtitle: 'Du kannst das jederzeit tun',
        resetProfile: 'Profil zurücksetzen',
        resetSubtitle: 'Neu anfangen. Nichts wird übernommen.',
        deleteEverywhere: 'Überall löschen',
        deleteSubtitle: 'Entfernt deine Daten von diesem Gerät und der Cloud',
      },
      habits: {
        title: 'Erinnerungen',
        subtitle: 'Sanfte Erinnerungen, wenn du sie möchtest.',
        enableReminders: 'Erinnerungen aktivieren',
        deviceSettings: 'Verwendet die Benachrichtigungseinstellungen deines Geräts',
        habitsObserving: 'Gewohnheiten, die du beobachtest',
        active: 'aktiv',
        resting: 'ruhend',
      },
      experience: {
        title: 'Einsichten & Reflexionen',
        subtitle: 'Wie oft Reflexionen erscheinen sollen.',
        insightFrequency: {
          rare: 'Selten',
          rareDesc: 'Etwa einmal im Monat — ruhige Beobachtung',
          occasional: 'Gelegentlich',
          occasionalDesc: 'Alle 1-2 Wochen — sanfte Reflexionen',
          weekly: 'Wöchentlich',
          weeklyDesc: 'Wöchentlich — regelmäßige Selbstbeobachtungs-Impulse',
        },
        reflectionTypes: 'Arten von Reflexionen:',
        patterns: 'Muster',
        patternsDesc: 'Trends über Zeit beobachten',
        connections: 'Verbindungen',
        connectionsDesc: 'mögliche Zusammenhänge hervorheben',
        prompts: 'Impulse',
        promptsDesc: 'sanfte Fragen zur Selbstreflexion',
        neverPrescriptive: 'Nie vorschreibend. Nie "du solltest". Nur Beobachtungen.',
        weekStartsOn: 'Woche beginnt am',
        monday: 'Montag',
        sunday: 'Sonntag',
      },
      privacy: {
        title: 'Deine Daten',
        subtitle: 'Deine Daten gehören dir.',
        storedLocally: 'Lokal gespeichert',
        storedInCloud: 'In der Cloud gespeichert',
        habits: 'Gewohnheiten',
        dailyEntries: 'Tägliche Einträge',
        personalityProfile: 'Persönlichkeitsprofil',
        appPreferences: 'App-Einstellungen',
        profileAndHabits: 'Profil & Gewohnheiten',
        dailyEntriesOptIn: 'Tägliche Einträge (optional)',
        googleDrive: 'Mit Google Drive verbinden',
        googleDriveSubtitle: 'Speichere deine Daten in Google Cloud',
        exportData: 'Daten exportieren',
        exportSubtitle: 'Deine Daten als JSON herunterladen',
        importData: 'Daten importieren',
        importSubtitle: 'Von einem früheren Export wiederherstellen',
        clearLogs: 'Lokale Protokolle löschen',
        clearLogsSubtitle: 'Tägliche Einträge von diesem Gerät entfernen',
      },
      about: {
        title: 'Hilfe & Über',
        subtitle: 'Erfahre, wie diese App funktioniert',
        philosophy: 'Philosophie',
        philosophyText: 'HabitNaut geht um Beobachtung, nicht Optimierung. Keine Streaks, keine Schuld, kein Druck.',
        version: 'Version',
      },
      language: {
        title: 'Sprache',
        subtitle: 'Wähle deine bevorzugte Sprache',
      },
      sections: {
        profile: 'Profil',
        habitsReminders: 'Gewohnheiten & Erinnerungen',
        appExperience: 'App-Erlebnis',
        dataPrivacy: 'Daten & Datenschutz',
        support: 'Support',
      },
    },
    dashboard: {
      howAreYou: 'Wie geht es dir heute?',
      checkedIn: 'Eingecheckt',
      optionalCheckin: 'Optional, nur wenn du Lust hast',
      mood: 'Stimmung',
      energy: 'Energie',
      noJudgment: 'Ohne Urteil – nur beobachten',
      thisWeek: 'Diese Woche',
      insights: 'Einsichten',
      addHabit: 'Gewohnheit hinzufügen',
    },
    habits: {
      letRest: 'Ruhen lassen',
      letRestSubtitle: 'Sanft pausieren',
      letGo: 'Loslassen',
      letGoSubtitle: 'Vollständig freigeben',
      restingHabits: 'Ruhende Gewohnheiten',
      restingNote: 'Manche Gewohnheiten begleiten uns nur eine Weile. Du kannst sie wecken, wenn du bereit bist.',
      wake: 'Wecken',
      done: 'Erledigt',
      skipped: 'Übersprungen',
      notDone: 'Nicht erledigt',
    },
    mood: {
      heavy: 'Schwer',
      low: 'Niedrig',
      neutral: 'Neutral',
      good: 'Gut',
      bright: 'Strahlend',
    },
    energyLevels: {
      depleted: 'Erschöpft',
      low: 'Niedrig',
      steady: 'Stabil',
      good: 'Gut',
      high: 'Hoch',
    },
    insights: {
      noticedConnection: 'Eine Verbindung bemerkt',
      patternEmerged: 'Ein Muster entstanden',
      somethingToConsider: 'Etwas zum Nachdenken',
    },
    recommendedHabits: {
      morningPages: { name: 'Morgenseiten', reason: 'Passt zu deiner morgendlichen Klarheit' },
      sunriseWalk: { name: 'Sonnenaufgangsspaziergang', reason: 'Fängt deine Spitzenenergie ein' },
      morningStretch: { name: 'Morgendehnung', reason: 'Sanfter Start in den Tag' },
      eveningReflection: { name: 'Abendreflexion', reason: 'Ehrt deine besinnlichen Abende' },
      windDown: { name: 'Entspannungsritual', reason: 'Unterstützt deinen Abendrhythmus' },
      nightReading: { name: 'Nachtlektüre', reason: 'Nährt deinen nachtaktiven Geist' },
      mindfulPause: { name: 'Achtsame Pause', reason: 'Passt zu deinem flexiblen Rhythmus' },
      flowCheck: { name: 'Flow-Check', reason: 'Ehrt dein natürliches Timing' },
      dailyMovement: { name: 'Tägliche Bewegung', reason: 'Erhält deinen stetigen Fluss' },
      anchorRoutine: { name: 'Anker-Routine', reason: 'Unterstützt deine stetige Natur' },
      creativeSprint: { name: 'Kreativer Sprint', reason: 'Kanalisiert deine Schubenergie' },
      restRitual: { name: 'Ruhe-Ritual', reason: 'Balanciert deine Intensität' },
      powerBreak: { name: 'Power-Pause', reason: 'Aufladen zwischen Schüben' },
      energyCheck: { name: 'Energie-Check', reason: 'Ehrt deine natürlichen Wellen' },
      rideTheWave: { name: 'Die Welle reiten', reason: 'Arbeite mit deinem Flow' },
      gratitude: { name: 'Dankbarkeitsmoment', reason: 'Nährt deinen inneren Kompass' },
      valuesCheck: { name: 'Werte-Check', reason: 'Verbindet mit dem, was zählt' },
      progressNote: { name: 'Fortschrittsnotiz', reason: 'Feiert sichtbares Wachstum' },
      shareLearning: { name: 'Lernerfahrung teilen', reason: 'Verbindet mit anderen' },
      intentionSetting: { name: 'Absicht setzen', reason: 'Verbindet innere und äußere Ziele' },
      planTomorrow: { name: 'Morgen planen', reason: 'Unterstützt deine Liebe zur Struktur' },
      weeklyReview: { name: 'Wochenrückblick', reason: 'Schafft Klarheit und Ordnung' },
      followCuriosity: { name: 'Neugier folgen', reason: 'Feiert deine Spontaneität' },
      surpriseSelf: { name: 'Überrasche dich', reason: 'Hält die Dinge frisch' },
      flexibleFocus: { name: 'Eine fokussierte Sache', reason: 'Passt sich deinem Tag an' },
      deepWork: { name: 'Deep-Work-Block', reason: 'Schützt deine Fokuszeit' },
      singleTask: { name: 'Single-Tasking', reason: 'Ehrt deine Tiefe' },
      taskVariety: { name: 'Abwechslung', reason: 'Nährt deine vielfältigen Interessen' },
      quietTime: { name: 'Ruhige Zeit', reason: 'Stellt deine Energie wieder her' },
      natureMoment: { name: 'Naturmoment', reason: 'Friedliche Erholung' },
      connectSomeone: { name: 'Mit jemandem verbinden', reason: 'Energetisiert durch andere' },
      slowMorning: { name: 'Langsamer Morgen', reason: 'Ehrt dein natürliches Tempo' },
      quickWins: { name: 'Schnelle Erfolge', reason: 'Passt zu deinem Schwung' },
    },
  },
};

export const LANGUAGE_OPTIONS: { value: SupportedLanguage; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
];
