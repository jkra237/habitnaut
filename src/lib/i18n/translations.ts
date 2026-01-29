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
  
  // Gratitude
  gratitude: {
    title: string;
    prompt: string;
    placeholder: string;
    save: string;
    todayEntries: string;
    pastEntries: string;
    noEntries: string;
    delete: string;
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
    gratitude: {
      title: 'Gratitude',
      prompt: 'What am I grateful for today?',
      placeholder: 'Write here...',
      save: 'Save',
      todayEntries: 'Added today',
      pastEntries: 'Past entries',
      noEntries: 'No past entries yet',
      delete: 'Delete',
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
      planTomorrow: { name: 'Plan the day', reason: 'Supports your love of structure' },
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
      back: 'Atrás',
      save: 'Guardar',
      cancel: 'Cancelar',
      continue: 'Continuar',
      skip: 'Saltar',
      done: 'Listo',
    },
    onboarding: {
      welcome: 'Bienvenido',
      welcomeSubtitle: 'Este es un espacio para observar, no para optimizar.',
      welcomeSubtitle2: 'Descubramos cómo fluyes de forma natural.',
      begin: 'Empezar',
      questionsAhead: 'Solo unas pocas preguntas sencillas',
      noRightAnswer: 'No hay respuestas correctas – solo lo que sientes auténtico',
      startingPoints: 'Puntos de partida',
      startingPointsSubtitle: 'Según tu ritmo, aquí tienes algunos hábitos que podrían encajarte.',
      startingPointsHint: 'Elige los que te resuenen—o sáltalos por ahora.',
      continueWithSelected: 'Continuar con los seleccionados',
      skipForNow: 'Saltar por ahora',
      allSet: '¡Todo listo!',
      allSetSubtitle: 'Tu espacio está preparado. Sin rachas. Sin presión. Solo autoobservación amable.',
      startObserving: 'Empezar a observar',
      chooseLanguage: 'Elige tu idioma',
      languageSubtitle: 'Puedes cambiarlo en cualquier momento en los ajustes',
      questions: {
        rhythm: '¿Cuándo te sientes con más vida?',
        rhythmA: 'En la calma de las mañanas',
        rhythmB: 'Cuando el mundo se calma por la noche',
        energy: '¿Cómo fluye tu energía normalmente?',
        energyA: 'De forma constante y regular',
        energyB: 'En oleadas e impulsos intensos',
        motivation: '¿Qué te impulsa a seguir adelante?',
        motivationA: 'Una brújula interna de lo que importa',
        motivationB: 'La atracción de metas y resultados',
        approach: '¿Cómo prefieres organizar tus días?',
        approachA: 'Con cierta estructura flexible',
        approachB: 'Siguiendo lo que siento en el momento',
        focus: '¿Cómo prefieres trabajar?',
        focusA: 'Concentrado en una sola cosa',
        focusB: 'Alternando entre distintos intereses',
        recovery: '¿Cómo recargas mejor las pilas?',
        recoveryA: 'En soledad y tranquilidad',
        recoveryB: 'Rodeado de personas queridas',
        pace: '¿Qué ritmo te resulta más natural?',
        paceA: 'Pausado y reflexivo',
        paceB: 'Rápido y dinámico',
        tone: 'Cuando algo no sale bien, ¿qué te ayuda más?',
        toneA: 'Un recordatorio amable',
        toneB: 'Un empujón directo',
      },
    },
    settings: {
      title: 'Ajustes',
      profile: {
        title: 'Tu perfil',
        subtitle: 'Ver y editar tu perfil',
        syncedAs: 'Sincronizado como',
        currentSnapshot: 'Tu perfil actual',
        snapshotNote: 'Esto refleja cómo sueles abordar tus hábitos actualmente.',
        revisitQuestions: 'Repetir preguntas',
        revisitSubtitle: 'Puedes volver a responderlas cuando quieras',
        resetProfile: 'Reiniciar perfil',
        resetSubtitle: 'Empezar de cero. Nada se conserva.',
        deleteEverywhere: 'Eliminar todo',
        deleteSubtitle: 'Elimina tus datos de este dispositivo y la nube',
      },
      habits: {
        title: 'Recordatorios',
        subtitle: 'Recordatorios amables, si los deseas.',
        enableReminders: 'Activar recordatorios',
        deviceSettings: 'Usa la configuración de notificaciones de tu dispositivo',
        habitsObserving: 'hábitos que observas',
        active: 'activos',
        resting: 'en pausa',
      },
      experience: {
        title: 'Reflexiones',
        subtitle: 'Con qué frecuencia te gustaría recibir reflexiones.',
        insightFrequency: {
          rare: 'Pocas veces',
          rareDesc: 'Aproximadamente una vez al mes — observación tranquila',
          occasional: 'De vez en cuando',
          occasionalDesc: 'Cada 1-2 semanas — reflexiones suaves',
          weekly: 'Semanalmente',
          weeklyDesc: 'Semanalmente — impulsos regulares de autoobservación',
        },
        reflectionTypes: 'Tipos de reflexiones:',
        patterns: 'Patrones',
        patternsDesc: 'observar tendencias a lo largo del tiempo',
        connections: 'Conexiones',
        connectionsDesc: 'destacar posibles relaciones',
        prompts: 'Preguntas',
        promptsDesc: 'preguntas amables para reflexionar',
        neverPrescriptive: 'Sin imposiciones. Sin "deberías". Solo observaciones.',
        weekStartsOn: 'La semana empieza el',
        monday: 'Lunes',
        sunday: 'Domingo',
      },
      privacy: {
        title: 'Tus datos',
        subtitle: 'Tus datos son tuyos.',
        storedLocally: 'Almacenado en el dispositivo',
        storedInCloud: 'Almacenado en la nube',
        habits: 'hábitos',
        dailyEntries: 'registros diarios',
        personalityProfile: 'Perfil de personalidad',
        appPreferences: 'Preferencias de la app',
        profileAndHabits: 'Perfil y hábitos',
        dailyEntriesOptIn: 'Registros diarios (opcional)',
        googleDrive: 'Conectar con Google Drive',
        googleDriveSubtitle: 'Guarda tus datos en Google Cloud',
        exportData: 'Exportar datos',
        exportSubtitle: 'Descargar tus datos como JSON',
        importData: 'Importar datos',
        importSubtitle: 'Restaurar desde una copia anterior',
        clearLogs: 'Borrar registros locales',
        clearLogsSubtitle: 'Eliminar registros diarios de este dispositivo',
      },
      about: {
        title: 'Ayuda e información',
        subtitle: 'Descubre cómo funciona esta app',
        philosophy: 'Filosofía',
        philosophyText: 'HabitNaut va de observar, no de optimizar. Sin rachas, sin culpa, sin presión.',
        version: 'Versión',
      },
      language: {
        title: 'Idioma',
        subtitle: 'Elige tu idioma preferido',
      },
      sections: {
        profile: 'Perfil',
        habitsReminders: 'Hábitos y recordatorios',
        appExperience: 'Experiencia de la app',
        dataPrivacy: 'Datos y privacidad',
        support: 'Soporte',
      },
    },
    dashboard: {
      howAreYou: '¿Cómo te encuentras hoy?',
      checkedIn: 'Registrado',
      optionalCheckin: 'Opcional, solo si te apetece',
      mood: 'Estado de ánimo',
      energy: 'Energía',
      noJudgment: 'Sin juicios – solo observando',
      thisWeek: 'Esta semana',
      insights: 'Reflexiones',
      addHabit: 'Añadir hábito',
    },
    habits: {
      letRest: 'Pausar',
      letRestSubtitle: 'Hacer una pausa suave',
      letGo: 'Soltar',
      letGoSubtitle: 'Liberar por completo',
      restingHabits: 'Hábitos en pausa',
      restingNote: 'Algunos hábitos solo nos acompañan un tiempo. Puedes reactivarlos cuando estés preparado.',
      wake: 'Reactivar',
      done: 'Hecho',
      skipped: 'Saltado',
      notDone: 'Sin hacer',
    },
    mood: {
      heavy: 'Pesado',
      low: 'Bajo',
      neutral: 'Normal',
      good: 'Bien',
      bright: 'Radiante',
    },
    energyLevels: {
      depleted: 'Agotado',
      low: 'Bajo',
      steady: 'Estable',
      good: 'Bien',
      high: 'Alto',
    },
    insights: {
      noticedConnection: 'He notado una conexión',
      patternEmerged: 'Ha surgido un patrón',
      somethingToConsider: 'Algo para reflexionar',
    },
    gratitude: {
      title: 'Gratitud',
      prompt: '¿Por qué estoy agradecido hoy?',
      placeholder: 'Escribe aquí...',
      save: 'Guardar',
      todayEntries: 'Añadido hoy',
      pastEntries: 'Entradas anteriores',
      noEntries: 'Aún no hay entradas anteriores',
      delete: 'Eliminar',
    },
    recommendedHabits: {
      morningPages: { name: 'Páginas matutinas', reason: 'Aprovecha tu claridad por las mañanas' },
      sunriseWalk: { name: 'Paseo al amanecer', reason: 'Captura tu momento de máxima energía' },
      morningStretch: { name: 'Estiramientos matutinos', reason: 'Un comienzo suave del día' },
      eveningReflection: { name: 'Reflexión nocturna', reason: 'Honra tus noches contemplativas' },
      windDown: { name: 'Ritual de desconexión', reason: 'Acompaña tu ritmo vespertino' },
      nightReading: { name: 'Lectura nocturna', reason: 'Alimenta tu mente nocturna' },
      mindfulPause: { name: 'Pausa consciente', reason: 'Se adapta a tu ritmo flexible' },
      flowCheck: { name: 'Chequeo de flujo', reason: 'Respeta tu timing natural' },
      dailyMovement: { name: 'Movimiento diario', reason: 'Mantiene tu energía constante' },
      anchorRoutine: { name: 'Rutina ancla', reason: 'Apoya tu naturaleza estable' },
      creativeSprint: { name: 'Sprint creativo', reason: 'Canaliza tus ráfagas de energía' },
      restRitual: { name: 'Ritual de descanso', reason: 'Equilibra tu intensidad' },
      powerBreak: { name: 'Pausa energética', reason: 'Recarga entre impulsos' },
      energyCheck: { name: 'Chequeo de energía', reason: 'Respeta tus oleadas naturales' },
      rideTheWave: { name: 'Surfea la ola', reason: 'Fluye con tu ritmo' },
      gratitude: { name: 'Momento de gratitud', reason: 'Nutre tu brújula interior' },
      valuesCheck: { name: 'Chequeo de valores', reason: 'Reconecta con lo importante' },
      progressNote: { name: 'Nota de progreso', reason: 'Celebra tu crecimiento' },
      shareLearning: { name: 'Compartir aprendizaje', reason: 'Conecta con otros' },
      intentionSetting: { name: 'Establecer intención', reason: 'Une metas internas y externas' },
      planTomorrow: { name: 'Planificar mañana', reason: 'Satisface tu gusto por la estructura' },
      weeklyReview: { name: 'Revisión semanal', reason: 'Aporta claridad y orden' },
      followCuriosity: { name: 'Seguir la curiosidad', reason: 'Celebra tu espontaneidad' },
      surpriseSelf: { name: 'Sorpréndete', reason: 'Mantiene las cosas frescas' },
      flexibleFocus: { name: 'Un foco flexible', reason: 'Se adapta a tu día' },
      deepWork: { name: 'Bloque de trabajo profundo', reason: 'Protege tu tiempo de concentración' },
      singleTask: { name: 'Una sola tarea', reason: 'Honra tu profundidad' },
      taskVariety: { name: 'Variedad de tareas', reason: 'Alimenta tus intereses diversos' },
      quietTime: { name: 'Tiempo tranquilo', reason: 'Restaura tu energía' },
      natureMoment: { name: 'Momento en la naturaleza', reason: 'Recarga pacífica' },
      connectSomeone: { name: 'Conectar con alguien', reason: 'Te energiza a través de otros' },
      slowMorning: { name: 'Mañana tranquila', reason: 'Respeta tu ritmo natural' },
      quickWins: { name: 'Victorias rápidas', reason: 'Acompaña tu impulso' },
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
      welcomeSubtitle: 'Hier geht es ums Beobachten, nicht ums Optimieren.',
      welcomeSubtitle2: 'Lass uns entdecken, wie du von Natur aus tickst.',
      begin: 'Los geht\'s',
      questionsAhead: 'Nur ein paar entspannte Fragen',
      noRightAnswer: 'Es gibt kein Richtig oder Falsch – nur das, was sich für dich stimmig anfühlt',
      startingPoints: 'Erste Ideen',
      startingPointsSubtitle: 'Passend zu deinem Rhythmus – hier sind ein paar Gewohnheiten, die zu dir passen könnten.',
      startingPointsHint: 'Wähle aus, was dich anspricht – oder überspringe erstmal.',
      continueWithSelected: 'Mit Auswahl fortfahren',
      skipForNow: 'Erstmal überspringen',
      allSet: 'Alles bereit!',
      allSetSubtitle: 'Dein Raum ist fertig. Keine Streaks. Kein Druck. Nur achtsame Selbstbeobachtung.',
      startObserving: 'Jetzt starten',
      chooseLanguage: 'Wähle deine Sprache',
      languageSubtitle: 'Du kannst das jederzeit in den Einstellungen ändern',
      questions: {
        rhythm: 'Wann fühlst du dich am lebendigsten?',
        rhythmA: 'In den ruhigen Morgenstunden',
        rhythmB: 'Wenn abends alles zur Ruhe kommt',
        energy: 'Wie fließt deine Energie normalerweise?',
        energyA: 'Gleichmäßig und beständig',
        energyB: 'In Wellen und intensiven Schüben',
        motivation: 'Was treibt dich an?',
        motivationA: 'Ein innerer Kompass für das, was zählt',
        motivationB: 'Die Anziehungskraft von Zielen und Ergebnissen',
        approach: 'Wie gestaltest du am liebsten deine Tage?',
        approachA: 'Mit einer lockeren Struktur',
        approachB: 'Spontan, nach Gefühl',
        focus: 'Wie arbeitest du am liebsten?',
        focusA: 'Vertieft in eine Sache',
        focusB: 'Abwechslungsreich zwischen verschiedenen Themen',
        recovery: 'Wie tankst du am besten auf?',
        recoveryA: 'In Ruhe und für mich allein',
        recoveryB: 'Im Austausch mit Menschen, die mir wichtig sind',
        pace: 'Welches Tempo liegt dir?',
        paceA: 'Ruhig und bedacht',
        paceB: 'Schnell und dynamisch',
        tone: 'Wenn etwas nicht klappt – was hilft dir mehr?',
        toneA: 'Ein sanfter Hinweis',
        toneB: 'Ein klarer Anstoß',
      },
    },
    settings: {
      title: 'Einstellungen',
      profile: {
        title: 'Dein Profil',
        subtitle: 'Profil ansehen und bearbeiten',
        syncedAs: 'Synchronisiert als',
        currentSnapshot: 'Dein aktuelles Profil',
        snapshotNote: 'Das zeigt, wie du aktuell an Gewohnheiten herangehst.',
        revisitQuestions: 'Fragen erneut beantworten',
        revisitSubtitle: 'Du kannst das jederzeit tun',
        resetProfile: 'Profil zurücksetzen',
        resetSubtitle: 'Neu anfangen. Nichts wird übernommen.',
        deleteEverywhere: 'Alles löschen',
        deleteSubtitle: 'Entfernt deine Daten von diesem Gerät und aus der Cloud',
      },
      habits: {
        title: 'Erinnerungen',
        subtitle: 'Sanfte Erinnerungen, wenn du möchtest.',
        enableReminders: 'Erinnerungen aktivieren',
        deviceSettings: 'Nutzt die Benachrichtigungseinstellungen deines Geräts',
        habitsObserving: 'Gewohnheiten, die du beobachtest',
        active: 'aktiv',
        resting: 'pausiert',
      },
      experience: {
        title: 'Reflexionen',
        subtitle: 'Wie oft möchtest du Reflexionen sehen?',
        insightFrequency: {
          rare: 'Selten',
          rareDesc: 'Etwa einmal im Monat – ruhige Beobachtung',
          occasional: 'Gelegentlich',
          occasionalDesc: 'Alle 1–2 Wochen – sanfte Reflexionen',
          weekly: 'Wöchentlich',
          weeklyDesc: 'Wöchentlich – regelmäßige Impulse zur Selbstbeobachtung',
        },
        reflectionTypes: 'Arten von Reflexionen:',
        patterns: 'Muster',
        patternsDesc: 'Trends über die Zeit erkennen',
        connections: 'Zusammenhänge',
        connectionsDesc: 'mögliche Verbindungen aufzeigen',
        prompts: 'Impulse',
        promptsDesc: 'sanfte Fragen zum Nachdenken',
        neverPrescriptive: 'Nie belehrend. Nie „Du solltest". Nur Beobachtungen.',
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
        googleDriveSubtitle: 'Deine Daten in Google Cloud speichern',
        exportData: 'Daten exportieren',
        exportSubtitle: 'Deine Daten als JSON herunterladen',
        importData: 'Daten importieren',
        importSubtitle: 'Aus einer Sicherung wiederherstellen',
        clearLogs: 'Lokale Einträge löschen',
        clearLogsSubtitle: 'Tägliche Einträge von diesem Gerät entfernen',
      },
      about: {
        title: 'Hilfe & Info',
        subtitle: 'Erfahre, wie diese App funktioniert',
        philosophy: 'Philosophie',
        philosophyText: 'Bei HabitNaut geht es ums Beobachten, nicht ums Optimieren. Keine Streaks, keine Schuld, kein Druck.',
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
      checkedIn: 'Eingetragen',
      optionalCheckin: 'Optional – nur wenn du magst',
      mood: 'Stimmung',
      energy: 'Energie',
      noJudgment: 'Ohne Wertung – einfach wahrnehmen',
      thisWeek: 'Diese Woche',
      insights: 'Einsichten',
      addHabit: 'Gewohnheit hinzufügen',
    },
    habits: {
      letRest: 'Pausieren',
      letRestSubtitle: 'Sanft auf Pause setzen',
      letGo: 'Loslassen',
      letGoSubtitle: 'Vollständig freigeben',
      restingHabits: 'Pausierte Gewohnheiten',
      restingNote: 'Manche Gewohnheiten begleiten uns nur eine Weile. Du kannst sie wieder aktivieren, wenn du bereit bist.',
      wake: 'Reaktivieren',
      done: 'Erledigt',
      skipped: 'Übersprungen',
      notDone: 'Nicht erledigt',
    },
    mood: {
      heavy: 'Schwer',
      low: 'Gedämpft',
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
      noticedConnection: 'Mir ist ein Zusammenhang aufgefallen',
      patternEmerged: 'Ein Muster zeichnet sich ab',
      somethingToConsider: 'Etwas zum Nachdenken',
    },
    gratitude: {
      title: 'Dankbarkeit',
      prompt: 'Wofür bin ich heute dankbar?',
      placeholder: 'Schreibe hier...',
      save: 'Speichern',
      todayEntries: 'Heute eingetragen',
      pastEntries: 'Vergangene Einträge',
      noEntries: 'Noch keine vergangenen Einträge',
      delete: 'Löschen',
    },
    recommendedHabits: {
      morningPages: { name: 'Morgenseiten', reason: 'Passt zu deiner morgendlichen Klarheit' },
      sunriseWalk: { name: 'Spaziergang bei Sonnenaufgang', reason: 'Nutzt deine beste Energiezeit' },
      morningStretch: { name: 'Morgendehnung', reason: 'Ein sanfter Start in den Tag' },
      eveningReflection: { name: 'Abendreflexion', reason: 'Würdigt deine besinnlichen Abende' },
      windDown: { name: 'Abendritual', reason: 'Begleitet deinen Abendrhythmus' },
      nightReading: { name: 'Nachtlektüre', reason: 'Nährt deinen nachtaktiven Geist' },
      mindfulPause: { name: 'Achtsame Pause', reason: 'Passt zu deinem flexiblen Rhythmus' },
      flowCheck: { name: 'Flow-Check', reason: 'Respektiert dein natürliches Timing' },
      dailyMovement: { name: 'Tägliche Bewegung', reason: 'Hält deinen gleichmäßigen Fluss' },
      anchorRoutine: { name: 'Anker-Routine', reason: 'Stützt deine beständige Art' },
      creativeSprint: { name: 'Kreativ-Sprint', reason: 'Kanalisiert deine Energieschübe' },
      restRitual: { name: 'Ruhe-Ritual', reason: 'Balanciert deine Intensität' },
      powerBreak: { name: 'Power-Pause', reason: 'Auftanken zwischen den Schüben' },
      energyCheck: { name: 'Energie-Check', reason: 'Respektiert deine natürlichen Wellen' },
      rideTheWave: { name: 'Die Welle reiten', reason: 'Arbeite mit deinem Flow' },
      gratitude: { name: 'Dankbarkeitsmoment', reason: 'Nährt deinen inneren Kompass' },
      valuesCheck: { name: 'Werte-Check', reason: 'Verbindet dich mit dem, was zählt' },
      progressNote: { name: 'Fortschrittsnotiz', reason: 'Feiert sichtbares Wachstum' },
      shareLearning: { name: 'Lernerfahrung teilen', reason: 'Verbindet dich mit anderen' },
      intentionSetting: { name: 'Absicht setzen', reason: 'Verbindet innere und äußere Ziele' },
      planTomorrow: { name: 'Morgen planen', reason: 'Befriedigt deine Liebe zur Struktur' },
      weeklyReview: { name: 'Wochenrückblick', reason: 'Schafft Klarheit und Ordnung' },
      followCuriosity: { name: 'Neugier folgen', reason: 'Feiert deine Spontaneität' },
      surpriseSelf: { name: 'Überrasch dich selbst', reason: 'Hält die Dinge frisch' },
      flexibleFocus: { name: 'Flexibler Fokus', reason: 'Passt sich deinem Tag an' },
      deepWork: { name: 'Deep-Work-Block', reason: 'Schützt deine Fokuszeit' },
      singleTask: { name: 'Single-Tasking', reason: 'Würdigt deine Tiefe' },
      taskVariety: { name: 'Abwechslung', reason: 'Nährt deine vielfältigen Interessen' },
      quietTime: { name: 'Stille Zeit', reason: 'Gibt dir Energie zurück' },
      natureMoment: { name: 'Naturmoment', reason: 'Friedliche Erholung' },
      connectSomeone: { name: 'Mit jemandem verbinden', reason: 'Gibt Energie durch Austausch' },
      slowMorning: { name: 'Langsamer Morgen', reason: 'Respektiert dein natürliches Tempo' },
      quickWins: { name: 'Schnelle Erfolge', reason: 'Passt zu deinem Schwung' },
    },
  },
};

export const LANGUAGE_OPTIONS: { value: SupportedLanguage; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
];
