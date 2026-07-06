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
    welcomeTagline: string;
    questionsTagline: string;
    habitsTagline: string;
    namePrompt: string;
    nameSubtitle: string;
    namePlaceholder: string;
    nameGreetingPreview: string;
    swipeHint: string;
    categoryAll: string;
    categoryMovement: string;
    categoryCalm: string;
    categoryReflection: string;
    categoryFocus: string;
    notSureLabel: string;
    notSureSubtitle: string;
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
    allSetMessage: string;
    localDataNotice: string;
    statisticsTipTitle: string;
    statisticsTipMessage: string;
    experimentHint: string;
    adjustLaterHint: string;
    skipOnboarding: string;
    startObserving: string;
    // Language selection
    chooseLanguage: string;
    languageSubtitle: string;
    // Questions
    questions: {
      energySource: string;
      energySourceA: string;
      energySourceB: string;
      structure: string;
      structureA: string;
      structureB: string;
      motivation: string;
      motivationA: string;
      motivationB: string;
      reflection: string;
      reflectionA: string;
      reflectionB: string;
      dailyEnergy: string;
      dailyEnergyA: string;
      dailyEnergyB: string;
      chaos: string;
      chaosA: string;
      chaosB: string;
      growth: string;
      growthA: string;
      growthB: string;
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
      dailyQuote: string;
      dailyQuoteSubtitle: string;
    };
    experience: {
      title: string;
      subtitle: string;
      insightFrequency: {
        never: string;
        neverDesc: string;
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
      hobbyMessage: string;
      warmRegards: string;
    };
    language: {
      title: string;
      subtitle: string;
    };
    sections: {
      profile: string;
      appSettings: string;
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
    nextWeek: string;
    weekAfterNext: string;
    insights: string;
    addHabit: string;
    greetingMorning: string;
    greetingAfternoon: string;
    greetingEvening: string;
    yourRhythm: string;
    yourRhythmDescription: string;
    showTimeline: string;
    hideTimeline: string;
    gentleObservations: string;
    startObservingSomething: string;
    morningHint: string;
    eveningHint: string;
    flexibleHint: string;
    todayMissionTitle: string;
    todayMissionSubtitle: string;
    todayAllDone: string;
    todayEmpty: string;
  };


  experiments: {
    menuLabel: string;
    title: string;
    subtitle: string;
    activeExperiment: string;
    ideaLibrary: string;
    completedExperiments: string;
    noActive: string;
    noCompleted: string;
    dayOf: string;
    daysLeft: string;
    startsToday: string;
    durationLabel: string;
    chooseDuration: string;
    beforeMood: string;
    afterMood: string;
    intention: string;
    intentionPlaceholder: string;
    closingNote: string;
    closingPlaceholder: string;
    startExperiment: string;
    completeExperiment: string;
    letRest: string;
    reflectionQuestion: string;
    compareTitle: string;
    moodBefore: string;
    moodAfter: string;
    moodSame: string;
    moodLifted: string;
    moodLower: string;
    observationOnly: string;
    activeLimit: string;
    week: string;
    weeks: string;
    progress: string;
    restingExperiments: string;
    wake: string;
    activeIndicator: string;
    overviewObservationPrompt: string;
    overviewEmptyPrompt: string;
    overviewDiscover: string;
    confirmToday: string;
    confirmedToday: string;
    daysConfirmed: string;
    todayMissionExperimentLabel: string;
    categories: {
      morning: string;
      body: string;
      calm: string;
      focus: string;
      evening: string;
      reflection: string;
      connection: string;
      environment: string;
      boundaries: string;
    };
  };
  
  // Timeline
  timeline: {
    week: string;
    month: string;
    year: string;
    addHabitsToSee: string;
    engagement: string;
    avg: string;
    days: string;
    engaged: string;
    partial: string;
    notEngaged: string;
  };
  
  // Habits
  habits: {
    letRest: string;
    letRestSubtitle: string;
    letGo: string;
    letGoSubtitle: string;
    stats: string;
    statsSubtitle: string;
    restingHabits: string;
    restingNote: string;
    wake: string;
    done: string;
    skipped: string;
    notDone: string;
    planned: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
  
  // Add Habit Dialog
  addHabitDialog: {
    title: string;
    subtitle: string;
    placeholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    timeOfDay: string;
    howOften: string;
    anytime: string;
    morning: string;
    midday: string;
    evening: string;
    whenItFits: string;
    daily: string;
    fewTimesWeek: string;
    moreOptions: string;
    lessOptions: string;
    canChangeAnytime: string;
    maybeLater: string;
    add: string;
    routine: string;
    routineHint: string;
    routineWeekly: string;
    routineMonthly: string;
    weekdays: string[];
    removeRoutine: string;
    editRoutine: string;
    routineActive: string;
    routineMonthWeekLabel: string;
    routineMonthWeeks: string[];
    routineOptional: string;
    time: string;
    editTime: string;
    removeTime: string;
    timeOptional: string;
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
    // Pattern messages
    patterns: {
      moreCheckinsThisWeek: string;
      consciousSkips: string;
      weekendPattern: string;
      weekdayPattern: string;
    };
    // Correlation messages
    correlations: {
      highEnergyMoreCheckins: string;
      lowEnergyFewerCheckins: string;
      goodMoodHabit: string;
      habitsTogether: string;
    };
    // Prompt messages
    prompts: {
      whatDidHabitBring: string;
      easiestMoment: string;
      mostNaturalHabit: string;
      curiousAboutSkips: string;
      connectionBetweenHabits: string;
      weekReflection: string;
    };
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
  
  // Reminders
  reminders: {
    gentleReminder: string;
    frequency: string;
    when: string;
    off: string;
    daily: string;
    weekly: string;
    morning: string;
    midday: string;
    evening: string;
    custom: string;
    customTimeLabel: string;
    on: string;
    permissionDenied: string;
    permissionPending: string;
    testNotification: string;
    testSent: string;
    preview: string;
    fewTimesWeek: string;
    timesPerWeek: string;
    perWeek: string;
    confirmationNote: string;
    howOften: string;
    // Reminder copy
    invitationNote: string;
    dailyCopy: {
      reconnect: string;
      smallPause: string;
      ifNowFeelsRight: string;
      gentleMoment: string;
      hereWhenReady: string;
    };
    weeklyCopy: {
      habitCheckedIn: string;
      gentlyPickUp: string;
      withoutPressure: string;
      restingHere: string;
      softInvitation: string;
    };
  };
  
  // Time formatting
  time: {
    today: string;
    yesterday: string;
    weekdays: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    dayAbbreviations: [string, string, string, string, string, string, string];
    months: {
      january: string;
      february: string;
      march: string;
      april: string;
      may: string;
      june: string;
      july: string;
      august: string;
      september: string;
      october: string;
      november: string;
      december: string;
    };
  };
  
  // Recommended habits
  recommendedHabits: {
    shortWalk: { name: string; reason: string };
    stretchBody: { name: string; reason: string };
    moveBody: { name: string; reason: string };
    freshAir: { name: string; reason: string };
    breatheConsciously: { name: string; reason: string };
    quietMoment: { name: string; reason: string };
    noticeFeelingsToday: { name: string; reason: string };
    positiveMoment: { name: string; reason: string };
    gratitudeEntry: { name: string; reason: string };
    reflectDay: { name: string; reason: string };
    setIntention: { name: string; reason: string };
    smallTask: { name: string; reason: string };
    drinkWater: { name: string; reason: string };
    phoneAway: { name: string; reason: string };
    readPages: { name: string; reason: string };
  };
  
  // Achievements
  achievements: {
    title: string;
    subtitle: string;
    unlocked: string;
    categoryA: string;
    categoryB: string;
    categoryC: string;
    categoryD: string;
    categoryE: string;
    categoryF: string;
    items: Record<string, { name: string; description: string }>;
  };
  
  // Login streak
  streak: {
    congratulations: string;
    milestone: string;
    currentStreak: string;
    longestStreak: string;
    consecutiveDays: string;
    dismiss: string;
    disableMilestones: string;
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
      allSetMessage: 'You\'ve taken a beautiful first step. This is your space to observe yourself with kindness – no expectations, just gentle awareness. Welcome aboard, fellow explorer. 🚀',
      localDataNotice: '💾 This app saves your data locally on this device. Use the Export & Import functions in Settings to back up your habit data before resetting your device or to transfer it to another device.',
      statisticsTipTitle: 'Tip: Discover your personal statistics',
      statisticsTipMessage: 'This app creates statistics about your habits. Complete your first habit to get an insight.',
      experimentHint: 'Or start a small self-experiment from the beaker icon at the top.',
      adjustLaterHint: 'You can change habits, language and week start anytime in Settings ⚙️.',
      skipOnboarding: 'Skip onboarding',
      welcomeTagline: 'No pressure. No streaks.',
      questionsTagline: 'Just what feels true today.',
      habitsTagline: 'Choose gently — you can adjust later.',
      namePrompt: 'How should we call you on board?',
      nameSubtitle: 'Optional — only used for a friendly greeting.',
      namePlaceholder: 'Your name (optional)',
      nameGreetingPreview: 'Hi, {name} 👋',
      swipeHint: 'Swipe or use the buttons',
      categoryAll: 'All',
      categoryMovement: 'Movement',
      categoryCalm: 'Calm',
      categoryReflection: 'Reflection',
      categoryFocus: 'Focus',
      notSureLabel: "I'm not sure yet",
      notSureSubtitle: 'Start with something tiny — a glass of water.',
      startObserving: 'Start observing',
      chooseLanguage: 'Choose your language',
      languageSubtitle: 'You can change this anytime in settings',
      questions: {
        energySource: 'What usually helps you feel better?',
        energySourceA: 'Moving my body or doing something active',
        energySourceB: 'Slowing down and taking a moment for myself',
        structure: 'How do you usually deal with routines?',
        structureA: 'I like having a bit of structure',
        structureB: 'I prefer flexibility and doing things when it feels right',
        motivation: 'What motivates you more?',
        motivationA: 'Seeing progress',
        motivationB: 'Feeling better in the moment',
        reflection: 'How often do you reflect on your day?',
        reflectionA: 'I often think about my day or feelings',
        reflectionB: 'I usually move on without reflecting much',
        dailyEnergy: 'What do you feel you need more of in daily life?',
        dailyEnergyA: 'More calm and balance',
        dailyEnergyB: 'More movement and activity',
        chaos: 'When your day feels chaotic, what helps most?',
        chaosA: 'Taking a short pause',
        chaosB: 'Doing something small and productive',
        growth: 'What would you like to bring more into your life?',
        growthA: 'More clarity and awareness',
        growthB: 'More energy and positivity',
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
        title: 'App Settings',
        subtitle: 'Customize your experience',
        enableReminders: 'Enable reminders',
        deviceSettings: "Uses your device's notification settings",
        habitsObserving: "habits you're observing",
        active: 'active',
        resting: 'resting',
        dailyQuote: 'Daily quote',
        dailyQuoteSubtitle: 'Show an inspiring quote each day',
      },
      experience: {
        title: 'Reflections & Observations',
        subtitle: "How often you'd like reflections and observations to appear.",
        insightFrequency: {
          never: 'Never',
          neverDesc: 'No reflections — just track in silence',
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
        hobbyMessage: 'HabitNaut is the first version of my habit tracker and will be continuously improved. This app is free and without restrictions. Do you have feedback or other thoughts? I\'m looking forward to hear it. Just send it as a comment in your App Store.',
        warmRegards: 'Warm regards,',
      },
      language: {
        title: 'Language',
        subtitle: 'Choose your preferred language',
      },
      sections: {
        profile: 'Profile',
        appSettings: 'App Settings',
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
      nextWeek: 'Next week',
      weekAfterNext: 'In two weeks',
      insights: 'Insights',
      addHabit: 'Add habit',
      greetingMorning: 'Good morning',
      greetingAfternoon: 'Good afternoon',
      greetingEvening: 'Good evening',
      yourRhythm: 'Your Rhythm',
      yourRhythmDescription: 'See how your habits flow over time.',
      showTimeline: 'Show timeline',
      hideTimeline: 'Hide timeline',
      gentleObservations: 'Gentle Observations',
      startObservingSomething: 'Start observing something',
      morningHint: 'Your mornings tend to be clearer – a good time for what matters.',
      eveningHint: 'You come alive as the day winds down – honor that rhythm.',
      flexibleHint: 'Your rhythm flows with the day – stay curious about it.',
      todayMissionTitle: "Today's Mission",
      todayMissionSubtitle: 'One tap to mark what you noticed today.',
      todayAllDone: 'All noticed for today. Nothing left – just be.',
      todayEmpty: 'Nothing scheduled for today. Space to simply be.',
    },

    experiments: {
      menuLabel: 'Self-experiments',
      title: 'Self-experiments',
      subtitle: 'A self-experiment is observation, not a goal test.',
      activeExperiment: 'Current experiment',
      ideaLibrary: 'Ideas to explore',
      completedExperiments: 'Past observations',
      noActive: 'No experiment is active right now.',
      noCompleted: 'Completed experiments will appear here.',
      dayOf: 'Day {current} of {total}',
      daysLeft: '{days} days left',
      startsToday: 'Starts today',
      durationLabel: 'Duration',
      chooseDuration: 'Choose a quiet frame',
      beforeMood: 'Mood before',
      afterMood: 'Mood after',
      intention: 'What would you like to observe?',
      intentionPlaceholder: 'A short note for yourself...',
      closingNote: 'What did you notice?',
      closingPlaceholder: 'A few words are enough...',
      startExperiment: 'Start experiment',
      completeExperiment: 'Complete gently',
      letRest: 'Let rest',
      reflectionQuestion: 'Reflection question',
      compareTitle: 'Before / after',
      moodBefore: 'Before',
      moodAfter: 'After',
      moodSame: 'Your mood stayed similar.',
      moodLifted: 'Your mood felt a little lighter afterwards.',
      moodLower: 'Your mood felt a little heavier afterwards.',
      observationOnly: 'This is only an observation, not a judgment.',
      activeLimit: 'One active experiment at a time keeps the space calm.',
      week: 'week',
      weeks: 'weeks',
      progress: 'Progress',
      restingExperiments: 'Currently resting',
      wake: 'Resume',
      activeIndicator: 'An experiment is currently running',
      overviewObservationPrompt: 'Observation for today',
      overviewEmptyPrompt: 'Curious about a gentle experiment?',
      overviewDiscover: 'Discover',
      confirmToday: 'Confirm today',
      confirmedToday: 'Confirmed today',
      daysConfirmed: '{done} of {total} days confirmed',
      todayMissionExperimentLabel: 'Today\'s experiment',
      categories: {
        morning: 'Morning',
        body: 'Body',
        calm: 'Calm',
        focus: 'Focus',
        evening: 'Evening',
        reflection: 'Reflection',
        connection: 'Connection',
        environment: 'Environment',
        boundaries: 'Boundaries',
      },
    },
    habits: {
      letRest: 'Let rest',
      letRestSubtitle: 'Pause gently',
      letGo: 'Let go',
      letGoSubtitle: 'Release completely',
      stats: 'Statistics',
      statsSubtitle: 'Individual insights',
      restingHabits: 'Resting habits',
      restingNote: 'Some habits only accompany us for a while. You can wake them when you\'re ready.',
      wake: 'Wake',
      done: 'Done',
      skipped: 'Skipped',
      notDone: 'Not done',
      planned: 'Planned',
      emptyTitle: 'Your observation space is empty',
      emptySubtitle: 'Add something you\'d like to observe – not to perfect, just to notice.',
    },
    addHabitDialog: {
      title: 'What would you like to observe?',
      subtitle: 'Add something you\'d like to pay attention to',
      placeholder: 'Name your habit',
      descriptionLabel: 'Description (optional)',
      descriptionPlaceholder: 'A short note about this habit...',
      timeOfDay: 'Time of day',
      howOften: 'How often',
      anytime: 'Anytime',
      morning: 'Morning',
      midday: 'Midday',
      evening: 'Evening',
      whenItFits: 'When it fits',
      daily: 'Daily',
      fewTimesWeek: 'A few times/week',
      moreOptions: 'More options',
      lessOptions: 'Less options',
      canChangeAnytime: 'You can change or pause habits anytime.',
      maybeLater: 'Maybe later',
      add: 'Add',
      routine: 'Routine (optional)',
      routineHint: 'Automatically plan this habit on selected days',
      routineWeekly: 'Weekly',
      routineMonthly: 'Monthly',
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      removeRoutine: 'Remove routine',
      editRoutine: 'Edit routine',
      routineActive: 'Routine active',
      routineMonthWeekLabel: 'Which week(s) of the month?',
      routineMonthWeeks: ['1st week', '2nd week', '3rd week', '4th week'],
      routineOptional: 'Optional',
      time: 'Time',
      editTime: 'Edit time',
      removeTime: 'Remove',
      timeOptional: 'Optional',
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
      patterns: {
        moreCheckinsThisWeek: 'You checked in more often this week than last — notice the difference, not the numbers.',
        consciousSkips: 'You chose to pause some habits this week. Noticing when to rest is awareness too.',
        weekendPattern: 'Your weekends seem to have their own natural rhythm.',
        weekdayPattern: 'Weekdays seem to bring a different energy to your practice.',
      },
      correlations: {
        highEnergyMoreCheckins: 'On days you logged energy as high, you also checked in more frequently.',
        lowEnergyFewerCheckins: 'On lower energy days, you gave yourself more space — that is awareness.',
        goodMoodHabit: 'Your calmest days coincided with "{habitName}".',
        habitsTogether: '"{habitB}" often appeared alongside "{habitA}".',
      },
      prompts: {
        whatDidHabitBring: 'What did "{habitName}" bring you this week?',
        easiestMoment: 'Which moment felt easiest for "{habitName}"?',
        mostNaturalHabit: 'Which habit felt most natural this week?',
        curiousAboutSkips: 'What made you choose to skip certain habits? Just curious, no judgment.',
        connectionBetweenHabits: 'Do you notice any connection between your habits?',
        weekReflection: 'Looking back at this week, what stands out to you?',
      },
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
    reminders: {
      gentleReminder: 'Gentle Reminder',
      frequency: 'Frequency',
      when: 'When',
      off: 'Off',
      daily: 'Daily',
      weekly: 'Weekly',
      morning: 'Morning',
      midday: 'Midday',
      evening: 'Evening',
      custom: 'Custom',
      customTimeLabel: 'Set your preferred time',
      on: 'On',
      permissionDenied: 'Browser notifications are blocked. Please enable them in your browser settings to receive gentle reminders.',
      permissionPending: "When you save, we'll ask for notification permission.",
      testNotification: 'Send a test notification',
      testSent: 'Test sent!',
      preview: 'Preview',
      fewTimesWeek: 'Few times/week',
      timesPerWeek: '{count}× per week',
      perWeek: 'per week',
      confirmationNote: 'This reminder is just a gentle nudge. You can change or turn it off anytime.',
      howOften: 'How often would you like a reminder?',
      invitationNote: 'This is just a gentle nudge. You can turn it off anytime.',
      dailyCopy: {
        reconnect: 'Want to reconnect with your habit?',
        smallPause: 'A small pause, if it fits.',
        ifNowFeelsRight: 'If now feels right, this habit is here.',
        gentleMoment: 'A gentle moment to check in.',
        hereWhenReady: "This is here when you're ready.",
      },
      weeklyCopy: {
        habitCheckedIn: 'This habit checked in this week.',
        gentlyPickUp: 'Want to gently pick this up again?',
        withoutPressure: 'A reminder without pressure.',
        restingHere: "Your habit is resting here, whenever you'd like.",
        softInvitation: 'A soft invitation to reconnect.',
      },
    },
    time: {
      today: 'Today',
      yesterday: 'Yesterday',
      weekdays: {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
      },
      dayAbbreviations: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as [string, string, string, string, string, string, string],
      months: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
      },
    },
    recommendedHabits: {
      shortWalk: { name: 'Take a short walk', reason: 'A simple way to clear your mind' },
      stretchBody: { name: 'Stretch your body', reason: 'Release tension gently' },
      moveBody: { name: 'Move your body', reason: 'In any way you enjoy' },
      freshAir: { name: 'Step outside for fresh air', reason: 'A quick reset for your senses' },
      breatheConsciously: { name: 'Breathe consciously for 3 min', reason: 'A moment of calm awareness' },
      quietMoment: { name: 'Pause for a quiet moment', reason: 'Let stillness find you' },
      noticeFeelingsToday: { name: 'Notice how you feel today', reason: 'Awareness without judgment' },
      positiveMoment: { name: 'Write down a positive moment', reason: 'Capture what went well' },
      gratitudeEntry: { name: 'Write down something you\'re grateful for', reason: 'Nurture appreciation' },
      reflectDay: { name: 'Reflect briefly on your day', reason: 'A gentle look back' },
      setIntention: { name: 'Write down one small intention', reason: 'Start with clarity' },
      smallTask: { name: 'Do one small postponed task', reason: 'A little progress goes far' },
      drinkWater: { name: 'Drink a glass of water consciously', reason: 'A mindful micro-habit' },
      phoneAway: { name: 'Put your phone away for 10 min', reason: 'Create space for presence' },
      readPages: { name: 'Read a few pages of a book', reason: 'Feed your curiosity' },
    },
    timeline: {
      week: 'Week',
      month: 'Month',
      year: 'Year',
      addHabitsToSee: 'Add habits to see your rhythm visualization.',
      engagement: 'engagement',
      avg: 'avg',
      days: 'days',
      engaged: 'Engaged',
      partial: 'Partial',
      notEngaged: 'Not engaged',
    },
    achievements: {
      title: 'Achievements',
      subtitle: 'Gentle milestones on your journey. Once unlocked, they stay forever.',
      unlocked: '{count} of {total} discovered',
      categoryA: 'Getting Started',
      categoryB: 'Weekly Presence',
      categoryC: 'Single Habits',
      categoryD: 'Multiple Habits',
      categoryE: 'Patterns',
      categoryF: 'Long-term',
      items: {
        first_step: { name: 'First Step', description: 'You created your first habit' },
        first_mark: { name: 'First Mark', description: 'You completed a habit for the first time' },
        getting_started: { name: 'Getting Started', description: 'Three check-ins completed' },
        showing_up: { name: 'Showing Up', description: 'A week with at least one habit done' },
        back_again: { name: 'Back Again', description: 'You returned after a pause' },
        quiet_week: { name: 'Quiet Week', description: 'A week with gentle, regular presence' },
        gentle_continuity: { name: 'Gentle Continuity', description: 'Two weeks with presence' },
        still_going: { name: 'Still Going', description: 'Three weeks with presence' },
        soft_rhythm: { name: 'Soft Rhythm', description: 'Four weeks of quiet, recurring use' },
        reliable_return: { name: 'Reliable Return', description: 'You came back after multiple pauses' },
        old_friend: { name: 'Old Friend', description: 'A habit has been with you for over a month' },
        long_companion: { name: 'Long Companion', description: 'A habit has been with you for over two months' },
        steady_presence: { name: 'Steady Presence', description: 'A habit accompanies you for several months' },
        letting_it_rest: { name: 'Letting It Rest', description: 'You consciously paused a habit' },
        picking_it_up_again: { name: 'Picking It Up Again', description: 'You resumed a resting habit' },
        small_circle: { name: 'Small Circle', description: 'One or two habits over a longer time' },
        balanced_set: { name: 'Balanced Set', description: 'Three to four habits over a longer time' },
        changing_needs: { name: 'Changing Needs', description: 'You consciously exchanged habits' },
        trying_things_out: { name: 'Trying Things Out', description: 'You explored multiple new habits' },
        gentle_pair: { name: 'Gentle Pair', description: 'Two habits often appear together' },
        supportive_set: { name: 'Supportive Set', description: 'Three habits accompany each other over time' },
        recurring_pattern: { name: 'Recurring Pattern', description: 'A recurring usage pattern is forming' },
        natural_flow: { name: 'Natural Flow', description: 'Habits appear regularly without reminders' },
        own_pace: { name: 'Own Pace', description: 'Irregular but stable long-term presence' },
        staying_with_it: { name: 'Staying With It', description: 'The app has been part of your weeks' },
        quiet_consistency: { name: 'Quiet Consistency', description: 'Regular weekly presence without pressure' },
        gentle_commitment: { name: 'Gentle Commitment', description: 'Habits remain part of your everyday life' },
        living_with_habits: { name: 'Living With Habits', description: 'A long-term relationship with multiple habits' },
        aware_practice: { name: 'Aware Practice', description: 'Sustained use over time without compulsion' },
      },
    },
    streak: {
      congratulations: 'Congratulations, friend!',
      milestone: 'You reached a new milestone:',
      currentStreak: 'Current streak',
      longestStreak: 'Longest streak',
      consecutiveDays: 'consecutive days',
      dismiss: 'Nice!',
      disableMilestones: "Don't show milestones",
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
      allSetMessage: 'Has dado un primer paso maravilloso. Este es tu espacio para observarte con amabilidad – sin expectativas, solo conciencia suave. Bienvenido a bordo, compañero explorador. 🚀',
      localDataNotice: '💾 Esta app guarda tus datos localmente en este dispositivo. Usa las funciones de Exportar e Importar en Ajustes para hacer una copia de seguridad antes de restablecer tu dispositivo o transferir tus datos a otro.',
      statisticsTipTitle: 'Consejo: Descubre tus estadísticas personales',
      statisticsTipMessage: 'Esta app crea estadísticas sobre tus hábitos. Completa tu primer hábito para obtener una visión.',
      experimentHint: 'O inicia un pequeño autoexperimento desde el icono de matraz arriba.',
      adjustLaterHint: 'Puedes cambiar hábitos, idioma e inicio de semana en cualquier momento en Ajustes ⚙️.',
      skipOnboarding: 'Saltar introducción',
      welcomeTagline: 'Sin presión. Sin rachas.',
      questionsTagline: 'Solo lo que sientes hoy.',
      habitsTagline: 'Elige con calma – puedes ajustar luego.',
      namePrompt: '¿Cómo quieres que te llamemos a bordo?',
      nameSubtitle: 'Opcional – solo para un saludo amable.',
      namePlaceholder: 'Tu nombre (opcional)',
      nameGreetingPreview: 'Hola, {name} 👋',
      swipeHint: 'Desliza o usa los botones',
      categoryAll: 'Todos',
      categoryMovement: 'Movimiento',
      categoryCalm: 'Calma',
      categoryReflection: 'Reflexión',
      categoryFocus: 'Enfoque',
      notSureLabel: 'Aún no lo sé',
      notSureSubtitle: 'Empieza con algo pequeño – un vaso de agua.',
      startObserving: 'Empezar a observar',
      chooseLanguage: 'Elige tu idioma',
      languageSubtitle: 'Puedes cambiarlo en cualquier momento en los ajustes',
      questions: {
        energySource: '¿Qué suele ayudarte a sentirte mejor?',
        energySourceA: 'Mover el cuerpo o hacer algo activo',
        energySourceB: 'Ralentizar y tomarme un momento para mí',
        structure: '¿Cómo sueles lidiar con las rutinas?',
        structureA: 'Me gusta tener algo de estructura',
        structureB: 'Prefiero flexibilidad y hacer las cosas cuando se siente bien',
        motivation: '¿Qué te motiva más?',
        motivationA: 'Ver progreso',
        motivationB: 'Sentirme mejor en el momento',
        reflection: '¿Con qué frecuencia reflexionas sobre tu día?',
        reflectionA: 'A menudo pienso en mi día o sentimientos',
        reflectionB: 'Suelo seguir adelante sin reflexionar mucho',
        dailyEnergy: '¿Qué sientes que necesitas más en tu día a día?',
        dailyEnergyA: 'Más calma y equilibrio',
        dailyEnergyB: 'Más movimiento y actividad',
        chaos: 'Cuando tu día se siente caótico, ¿qué ayuda más?',
        chaosA: 'Tomar una breve pausa',
        chaosB: 'Hacer algo pequeño y productivo',
        growth: '¿Qué te gustaría traer más a tu vida?',
        growthA: 'Más claridad y conciencia',
        growthB: 'Más energía y positividad',
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
        title: 'Configuración',
        subtitle: 'Personaliza tu experiencia',
        enableReminders: 'Activar recordatorios',
        deviceSettings: 'Usa la configuración de notificaciones de tu dispositivo',
        habitsObserving: 'hábitos que observas',
        active: 'activos',
        resting: 'en pausa',
        dailyQuote: 'Cita diaria',
        dailyQuoteSubtitle: 'Mostrar una cita inspiradora cada día',
      },
      experience: {
        title: 'Reflexiones y Observaciones',
        subtitle: 'Con qué frecuencia te gustaría recibir reflexiones y observaciones.',
        insightFrequency: {
          never: 'Nunca',
          neverDesc: 'Sin reflexiones — solo registra en silencio',
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
        hobbyMessage: 'HabitNaut es la primera versión de mi rastreador de hábitos y se mejorará continuamente. Esta app es gratuita y sin restricciones. ¿Tienes comentarios u otras ideas? Me encantaría escucharlos. Simplemente envíalos como comentario en tu App Store.',
        warmRegards: 'Con cariño,',
      },
      language: {
        title: 'Idioma',
        subtitle: 'Elige tu idioma preferido',
      },
      sections: {
        profile: 'Perfil',
        appSettings: 'Configuración',
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
      nextWeek: 'Próxima semana',
      weekAfterNext: 'En dos semanas',
      insights: 'Reflexiones',
      addHabit: 'Añadir hábito',
      greetingMorning: 'Buenos días',
      greetingAfternoon: 'Buenas tardes',
      greetingEvening: 'Buenas noches',
      yourRhythm: 'Tu Ritmo',
      yourRhythmDescription: 'Observa cómo fluyen tus hábitos con el tiempo.',
      showTimeline: 'Mostrar línea de tiempo',
      hideTimeline: 'Ocultar línea de tiempo',
      gentleObservations: 'Observaciones suaves',
      startObservingSomething: 'Empieza a observar algo',
      morningHint: 'Tus mañanas suelen ser más claras – un buen momento para lo importante.',
      eveningHint: 'Cobras vida cuando el día termina – honra ese ritmo.',
      flexibleHint: 'Tu ritmo fluye con el día – mantén la curiosidad.',
      todayMissionTitle: 'Misión de hoy',
      todayMissionSubtitle: 'Un toque para marcar lo que notaste hoy.',
      todayAllDone: 'Todo observado por hoy. Nada pendiente – solo respira.',
      todayEmpty: 'Nada programado para hoy. Espacio para simplemente estar.',
    },

    experiments: {
      menuLabel: 'Autoexperimentos',
      title: 'Autoexperimentos',
      subtitle: 'Un autoexperimento es observación, no una prueba de metas.',
      activeExperiment: 'Experimento actual',
      ideaLibrary: 'Ideas para explorar',
      completedExperiments: 'Observaciones pasadas',
      noActive: 'No hay ningún experimento activo ahora mismo.',
      noCompleted: 'Los experimentos completados aparecerán aquí.',
      dayOf: 'Día {current} de {total}',
      daysLeft: 'Quedan {days} días',
      startsToday: 'Empieza hoy',
      durationLabel: 'Duración',
      chooseDuration: 'Elige un marco tranquilo',
      beforeMood: 'Estado de ánimo antes',
      afterMood: 'Estado de ánimo después',
      intention: '¿Qué te gustaría observar?',
      intentionPlaceholder: 'Una nota breve para ti...',
      closingNote: '¿Qué notaste?',
      closingPlaceholder: 'Unas pocas palabras bastan...',
      startExperiment: 'Iniciar experimento',
      completeExperiment: 'Completar suavemente',
      letRest: 'Pausar',
      reflectionQuestion: 'Pregunta de reflexión',
      compareTitle: 'Antes / después',
      moodBefore: 'Antes',
      moodAfter: 'Después',
      moodSame: 'Tu estado de ánimo se mantuvo parecido.',
      moodLifted: 'Tu estado de ánimo se sintió algo más ligero después.',
      moodLower: 'Tu estado de ánimo se sintió algo más pesado después.',
      observationOnly: 'Esto es solo una observación, no un juicio.',
      activeLimit: 'Un experimento activo a la vez mantiene el espacio tranquilo.',
      week: 'semana',
      weeks: 'semanas',
      progress: 'Progreso',
      restingExperiments: 'En pausa actualmente',
      wake: 'Reanudar',
      activeIndicator: 'Un experimento está en curso',
      overviewObservationPrompt: 'Observación de hoy',
      overviewEmptyPrompt: '¿Te apetece un pequeño experimento?',
      overviewDiscover: 'Descubrir',
      confirmToday: 'Confirmar hoy',
      confirmedToday: 'Confirmado hoy',
      daysConfirmed: '{done} de {total} días confirmados',
      todayMissionExperimentLabel: 'Experimento de hoy',
      categories: {
        morning: 'Mañana',
        body: 'Cuerpo',
        calm: 'Calma',
        focus: 'Foco',
        evening: 'Noche',
        reflection: 'Reflexión',
        connection: 'Conexión',
        environment: 'Entorno',
        boundaries: 'Límites',
      },
    },
    habits: {
      letRest: 'Pausar',
      letRestSubtitle: 'Hacer una pausa suave',
      letGo: 'Soltar',
      letGoSubtitle: 'Liberar por completo',
      stats: 'Estadísticas',
      statsSubtitle: 'Información individual',
      restingHabits: 'Hábitos en pausa',
      restingNote: 'Algunos hábitos solo nos acompañan un tiempo. Puedes reactivarlos cuando estés preparado.',
      wake: 'Reactivar',
      done: 'Hecho',
      skipped: 'Saltado',
      notDone: 'Sin hacer',
      planned: 'Planificado',
      emptyTitle: 'Tu espacio de observación está vacío',
      emptySubtitle: 'Añade algo que te gustaría observar – no para perfeccionar, solo para notar.',
    },
    addHabitDialog: {
      title: '¿Qué te gustaría observar?',
      subtitle: 'Añade algo a lo que quieras prestar atención',
      placeholder: 'Nombra tu hábito',
      descriptionLabel: 'Descripción (opcional)',
      descriptionPlaceholder: 'Una nota breve sobre este hábito...',
      timeOfDay: 'Momento del día',
      howOften: 'Con qué frecuencia',
      anytime: 'Cualquier momento',
      morning: 'Mañana',
      midday: 'Mediodía',
      evening: 'Tarde',
      whenItFits: 'Cuando encaje',
      daily: 'Diario',
      fewTimesWeek: 'Algunas veces/semana',
      moreOptions: 'Más opciones',
      lessOptions: 'Menos opciones',
      canChangeAnytime: 'Puedes cambiar o pausar hábitos en cualquier momento.',
      maybeLater: 'Quizás luego',
      add: 'Añadir',
      routine: 'Rutina (opcional)',
      routineHint: 'Planifica automáticamente este hábito en los días seleccionados',
      routineWeekly: 'Semanal',
      routineMonthly: 'Mensual',
      weekdays: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      removeRoutine: 'Eliminar rutina',
      editRoutine: 'Editar rutina',
      routineActive: 'Rutina activa',
      routineMonthWeekLabel: '¿En qué semana(s) del mes?',
      routineMonthWeeks: ['1ª semana', '2ª semana', '3ª semana', '4ª semana'],
      routineOptional: 'Opcional',
      time: 'Hora',
      editTime: 'Editar hora',
      removeTime: 'Eliminar',
      timeOptional: 'Opcional',
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
      patterns: {
        moreCheckinsThisWeek: 'Registraste más esta semana que la anterior — nota la diferencia, no los números.',
        consciousSkips: 'Elegiste pausar algunos hábitos esta semana. Notar cuándo descansar también es conciencia.',
        weekendPattern: 'Tus fines de semana parecen tener su propio ritmo natural.',
        weekdayPattern: 'Los días laborables parecen traer una energía diferente a tu práctica.',
      },
      correlations: {
        highEnergyMoreCheckins: 'Los días que registraste alta energía, también registraste más frecuentemente.',
        lowEnergyFewerCheckins: 'En días de baja energía, te diste más espacio — eso es conciencia.',
        goodMoodHabit: 'Tus días más tranquilos coincidieron con "{habitName}".',
        habitsTogether: '"{habitB}" apareció frecuentemente junto con "{habitA}".',
      },
      prompts: {
        whatDidHabitBring: '¿Qué te aportó "{habitName}" esta semana?',
        easiestMoment: '¿Qué momento fue más fácil para "{habitName}"?',
        mostNaturalHabit: '¿Qué hábito se sintió más natural esta semana?',
        curiousAboutSkips: '¿Qué te hizo elegir saltarte ciertos hábitos? Solo curiosidad, sin juicio.',
        connectionBetweenHabits: '¿Notas alguna conexión entre tus hábitos?',
        weekReflection: 'Mirando atrás esta semana, ¿qué te llama la atención?',
      },
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
    reminders: {
      gentleReminder: 'Recordatorio suave',
      frequency: 'Frecuencia',
      when: 'Cuándo',
      off: 'Desactivado',
      daily: 'Diario',
      weekly: 'Semanal',
      morning: 'Mañana',
      midday: 'Mediodía',
      evening: 'Tarde',
      custom: 'Personalizado',
      customTimeLabel: 'Elige tu hora preferida',
      on: 'Activado',
      permissionDenied: 'Las notificaciones están bloqueadas. Actívalas en la configuración de tu navegador para recibir recordatorios.',
      permissionPending: 'Al guardar, te pediremos permiso para las notificaciones.',
      testNotification: 'Enviar notificación de prueba',
      testSent: '¡Prueba enviada!',
      preview: 'Vista previa',
      fewTimesWeek: 'Algunas veces/semana',
      timesPerWeek: '{count}× por semana',
      perWeek: 'por semana',
      confirmationNote: 'Este recordatorio es solo un suave aviso. Puedes cambiarlo o desactivarlo cuando quieras.',
      howOften: '¿Con qué frecuencia te gustaría un recordatorio?',
      invitationNote: 'Es solo un recordatorio suave. Puedes desactivarlo cuando quieras.',
      dailyCopy: {
        reconnect: '¿Quieres reconectar con tu hábito?',
        smallPause: 'Una pequeña pausa, si encaja.',
        ifNowFeelsRight: 'Si ahora se siente bien, este hábito está aquí.',
        gentleMoment: 'Un momento suave para registrar.',
        hereWhenReady: 'Esto está aquí cuando estés listo.',
      },
      weeklyCopy: {
        habitCheckedIn: 'Este hábito se registró esta semana.',
        gentlyPickUp: '¿Quieres retomar esto suavemente?',
        withoutPressure: 'Un recordatorio sin presión.',
        restingHere: 'Tu hábito descansa aquí, cuando quieras.',
        softInvitation: 'Una invitación suave para reconectar.',
      },
    },
    time: {
      today: 'Hoy',
      yesterday: 'Ayer',
      weekdays: {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo',
      },
      dayAbbreviations: ['L', 'M', 'X', 'J', 'V', 'S', 'D'] as [string, string, string, string, string, string, string],
      months: {
        january: 'Enero',
        february: 'Febrero',
        march: 'Marzo',
        april: 'Abril',
        may: 'Mayo',
        june: 'Junio',
        july: 'Julio',
        august: 'Agosto',
        september: 'Septiembre',
        october: 'Octubre',
        november: 'Noviembre',
        december: 'Diciembre',
      },
    },
    recommendedHabits: {
      shortWalk: { name: 'Dar un paseo corto', reason: 'Una forma sencilla de despejar la mente' },
      stretchBody: { name: 'Estirar el cuerpo', reason: 'Libera tensión suavemente' },
      moveBody: { name: 'Mover el cuerpo', reason: 'De la forma que más disfrutes' },
      freshAir: { name: 'Salir a tomar aire fresco', reason: 'Un reseteo rápido para tus sentidos' },
      breatheConsciously: { name: 'Respirar conscientemente 3 min', reason: 'Un momento de calma consciente' },
      quietMoment: { name: 'Hacer una pausa tranquila', reason: 'Deja que la quietud te encuentre' },
      noticeFeelingsToday: { name: 'Notar cómo te sientes hoy', reason: 'Conciencia sin juicio' },
      positiveMoment: { name: 'Anotar un momento positivo', reason: 'Captura lo que salió bien' },
      gratitudeEntry: { name: 'Anotar algo por lo que estés agradecido', reason: 'Nutre la apreciación' },
      reflectDay: { name: 'Reflexionar brevemente sobre tu día', reason: 'Una mirada suave hacia atrás' },
      setIntention: { name: 'Escribir una pequeña intención', reason: 'Empieza con claridad' },
      smallTask: { name: 'Hacer una tarea pendiente pequeña', reason: 'Un poco de progreso va lejos' },
      drinkWater: { name: 'Beber un vaso de agua conscientemente', reason: 'Un micro-hábito consciente' },
      phoneAway: { name: 'Guardar el móvil 10 minutos', reason: 'Crea espacio para la presencia' },
      readPages: { name: 'Leer unas páginas de un libro', reason: 'Alimenta tu curiosidad' },
    },
    timeline: {
      week: 'Semana',
      month: 'Mes',
      year: 'Año',
      addHabitsToSee: 'Añade hábitos para ver tu visualización de ritmo.',
      engagement: 'participación',
      avg: 'prom',
      days: 'días',
      engaged: 'Activo',
      partial: 'Parcial',
      notEngaged: 'No activo',
    },
    achievements: {
      title: 'Logros',
      subtitle: 'Hitos suaves en tu camino. Una vez desbloqueados, se quedan para siempre.',
      unlocked: '{count} de {total} descubiertos',
      categoryA: 'Primeros pasos',
      categoryB: 'Presencia semanal',
      categoryC: 'Hábitos individuales',
      categoryD: 'Múltiples hábitos',
      categoryE: 'Patrones',
      categoryF: 'A largo plazo',
      items: {
        first_step: { name: 'Primer paso', description: 'Creaste tu primer hábito' },
        first_mark: { name: 'Primera marca', description: 'Completaste un hábito por primera vez' },
        getting_started: { name: 'Empezando', description: 'Tres registros completados' },
        showing_up: { name: 'Apareciendo', description: 'Una semana con al menos un hábito hecho' },
        back_again: { name: 'De vuelta', description: 'Regresaste después de una pausa' },
        quiet_week: { name: 'Semana tranquila', description: 'Una semana con presencia regular y suave' },
        gentle_continuity: { name: 'Continuidad suave', description: 'Dos semanas con presencia' },
        still_going: { name: 'Siguiendo adelante', description: 'Tres semanas con presencia' },
        soft_rhythm: { name: 'Ritmo suave', description: 'Cuatro semanas de uso tranquilo y recurrente' },
        reliable_return: { name: 'Retorno confiable', description: 'Regresaste después de varias pausas' },
        old_friend: { name: 'Viejo amigo', description: 'Un hábito te acompaña desde hace más de un mes' },
        long_companion: { name: 'Compañero fiel', description: 'Un hábito te acompaña desde hace más de dos meses' },
        steady_presence: { name: 'Presencia constante', description: 'Un hábito te acompaña durante varios meses' },
        letting_it_rest: { name: 'Dejándolo descansar', description: 'Pausaste un hábito conscientemente' },
        picking_it_up_again: { name: 'Retomándolo', description: 'Retomaste un hábito en pausa' },
        small_circle: { name: 'Círculo pequeño', description: 'Uno o dos hábitos durante un tiempo prolongado' },
        balanced_set: { name: 'Conjunto equilibrado', description: 'Tres o cuatro hábitos durante un tiempo prolongado' },
        changing_needs: { name: 'Necesidades cambiantes', description: 'Intercambiaste hábitos conscientemente' },
        trying_things_out: { name: 'Probando cosas', description: 'Exploraste varios hábitos nuevos' },
        gentle_pair: { name: 'Par suave', description: 'Dos hábitos aparecen juntos frecuentemente' },
        supportive_set: { name: 'Conjunto de apoyo', description: 'Tres hábitos se acompañan mutuamente' },
        recurring_pattern: { name: 'Patrón recurrente', description: 'Se forma un patrón de uso recurrente' },
        natural_flow: { name: 'Flujo natural', description: 'Los hábitos aparecen regularmente sin recordatorios' },
        own_pace: { name: 'A tu ritmo', description: 'Presencia irregular pero estable a largo plazo' },
        staying_with_it: { name: 'Persistiendo', description: 'La app ha sido parte de tus semanas' },
        quiet_consistency: { name: 'Consistencia tranquila', description: 'Presencia semanal regular sin presión' },
        gentle_commitment: { name: 'Compromiso suave', description: 'Los hábitos siguen siendo parte de tu día a día' },
        living_with_habits: { name: 'Viviendo con hábitos', description: 'Una relación a largo plazo con varios hábitos' },
        aware_practice: { name: 'Práctica consciente', description: 'Uso sostenido en el tiempo sin compulsión' },
      },
    },
    streak: {
      congratulations: '¡Felicidades, amigo!',
      milestone: 'Alcanzaste un nuevo hito:',
      currentStreak: 'Racha actual',
      longestStreak: 'Racha más larga',
      consecutiveDays: 'días consecutivos',
      dismiss: '¡Genial!',
      disableMilestones: 'No mostrar hitos',
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
      allSetMessage: 'Du hast einen wunderbaren ersten Schritt gemacht. Das hier ist dein Raum, dich mit Freundlichkeit zu beobachten – keine Erwartungen, nur sanfte Achtsamkeit. Willkommen an Bord, Mitentdecker. 🚀',
      localDataNotice: '💾 Diese App speichert deine Daten lokal auf diesem Gerät. Nutze die Export- & Import-Funktionen in den Einstellungen, um deine Daten zu sichern, bevor du dein Gerät zurücksetzt oder sie auf ein anderes Gerät überträgst.',
      statisticsTipTitle: 'Tipp: Entdecke deine persönlichen Statistiken',
      statisticsTipMessage: 'Diese App erstellt Statistiken zu deinen Gewohnheiten. Erledige deine erste Gewohnheit, um einen Einblick zu erhalten.',
      experimentHint: 'Oder starte ein kleines Selbst-Experiment über das Becher-Symbol oben.',
      adjustLaterHint: 'Gewohnheiten, Sprache und Wochenstart kannst du jederzeit in den Einstellungen ⚙️ anpassen.',
      skipOnboarding: 'Einführung überspringen',
      welcomeTagline: 'Kein Druck. Keine Streaks.',
      questionsTagline: 'Nur, was sich heute stimmig anfühlt.',
      habitsTagline: 'Wähle sanft – du kannst später anpassen.',
      namePrompt: 'Wie sollen wir dich an Bord nennen?',
      nameSubtitle: 'Optional – nur für einen freundlichen Gruß.',
      namePlaceholder: 'Dein Name (optional)',
      nameGreetingPreview: 'Hi, {name} 👋',
      swipeHint: 'Wische oder nutze die Buttons',
      categoryAll: 'Alle',
      categoryMovement: 'Bewegung',
      categoryCalm: 'Ruhe',
      categoryReflection: 'Reflexion',
      categoryFocus: 'Fokus',
      notSureLabel: 'Ich weiß noch nicht',
      notSureSubtitle: 'Fang mit etwas Winzigem an – ein Glas Wasser.',
      startObserving: 'Jetzt starten',
      chooseLanguage: 'Wähle deine Sprache',
      languageSubtitle: 'Du kannst das jederzeit in den Einstellungen ändern',
      questions: {
        energySource: 'Was hilft dir normalerweise, dich besser zu fühlen?',
        energySourceA: 'Mich bewegen oder etwas Aktives tun',
        energySourceB: 'Zur Ruhe kommen und mir einen Moment nehmen',
        structure: 'Wie gehst du normalerweise mit Routinen um?',
        structureA: 'Ich mag es, etwas Struktur zu haben',
        structureB: 'Ich bevorzuge Flexibilität und handle nach Gefühl',
        motivation: 'Was motiviert dich mehr?',
        motivationA: 'Fortschritt zu sehen',
        motivationB: 'Mich im Moment besser zu fühlen',
        reflection: 'Wie oft reflektierst du über deinen Tag?',
        reflectionA: 'Ich denke oft über meinen Tag oder meine Gefühle nach',
        reflectionB: 'Ich mache meistens einfach weiter, ohne viel zu reflektieren',
        dailyEnergy: 'Was brauchst du mehr in deinem Alltag?',
        dailyEnergyA: 'Mehr Ruhe und Balance',
        dailyEnergyB: 'Mehr Bewegung und Aktivität',
        chaos: 'Wenn dein Tag sich chaotisch anfühlt, was hilft am meisten?',
        chaosA: 'Eine kurze Pause machen',
        chaosB: 'Etwas Kleines und Produktives tun',
        growth: 'Was möchtest du mehr in dein Leben bringen?',
        growthA: 'Mehr Klarheit und Bewusstsein',
        growthB: 'Mehr Energie und Positivität',
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
        title: 'App-Einstellungen',
        subtitle: 'Passe dein Erlebnis an',
        enableReminders: 'Erinnerungen aktivieren',
        deviceSettings: 'Nutzt die Benachrichtigungseinstellungen deines Geräts',
        habitsObserving: 'Gewohnheiten, die du beobachtest',
        active: 'aktiv',
        resting: 'pausiert',
        dailyQuote: 'Tägliches Zitat',
        dailyQuoteSubtitle: 'Zeige jeden Tag ein inspirierendes Zitat',
      },
      experience: {
        title: 'Reflexionen & Beobachtungen',
        subtitle: 'Wie oft möchtest du Reflexionen und Beobachtungen sehen?',
        insightFrequency: {
          never: 'Nie',
          neverDesc: 'Keine Reflexionen – einfach still beobachten',
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
        hobbyMessage: 'HabitNaut ist die erste Version meines Habit-Trackers und wird stetig verbessert. Diese App ist kostenlos und ohne Einschränkungen. Hast du Feedback oder andere Gedanken? Ich freue mich darauf! Schreib es einfach als Kommentar in deinem App Store.',
        warmRegards: 'Mit warmen Grüßen,',
      },
      language: {
        title: 'Sprache',
        subtitle: 'Wähle deine bevorzugte Sprache',
      },
      sections: {
        profile: 'Profil',
        appSettings: 'App-Einstellungen',
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
      nextWeek: 'Nächste Woche',
      weekAfterNext: 'Übernächste Woche',
      insights: 'Einsichten',
      addHabit: 'Gewohnheit hinzufügen',
      greetingMorning: 'Guten Morgen',
      greetingAfternoon: 'Guten Tag',
      greetingEvening: 'Guten Abend',
      yourRhythm: 'Dein Rhythmus',
      yourRhythmDescription: 'Beobachte, wie deine Gewohnheiten über die Zeit fließen.',
      showTimeline: 'Zeitverlauf anzeigen',
      hideTimeline: 'Zeitverlauf ausblenden',
      gentleObservations: 'Sanfte Beobachtungen',
      startObservingSomething: 'Beginne etwas zu beobachten',
      morningHint: 'Deine Vormittage sind oft klarer – eine gute Zeit für das Wesentliche.',
      eveningHint: 'Du blühst auf, wenn der Tag sich neigt – ehre diesen Rhythmus.',
      flexibleHint: 'Dein Rhythmus fließt mit dem Tag – bleib neugierig darauf.',
      todayMissionTitle: 'Heutige Mission',
      todayMissionSubtitle: 'Ein Tipp genügt, um zu markieren, was du heute wahrgenommen hast.',
      todayAllDone: 'Alles für heute wahrgenommen. Nichts mehr offen – einfach sein.',
      todayEmpty: 'Heute steht nichts an. Raum, um einfach zu sein.',
    },

    experiments: {
      menuLabel: 'Selbst-Experimente',
      title: 'Selbst-Experimente',
      subtitle: 'Ein Selbstexperiment ist Beobachtung, kein Zieltest.',
      activeExperiment: 'Aktuelles Experiment',
      ideaLibrary: 'Ideen zum Entdecken',
      completedExperiments: 'Frühere Beobachtungen',
      noActive: 'Gerade ist kein Experiment aktiv.',
      noCompleted: 'Abgeschlossene Experimente erscheinen hier.',
      dayOf: 'Tag {current} von {total}',
      daysLeft: 'Noch {days} Tage',
      startsToday: 'Startet heute',
      durationLabel: 'Dauer',
      chooseDuration: 'Wähle einen ruhigen Rahmen',
      beforeMood: 'Stimmung vorher',
      afterMood: 'Stimmung nachher',
      intention: 'Was möchtest du beobachten?',
      intentionPlaceholder: 'Eine kurze Notiz an dich selbst...',
      closingNote: 'Was hast du bemerkt?',
      closingPlaceholder: 'Ein paar Worte reichen...',
      startExperiment: 'Experiment starten',
      completeExperiment: 'Sanft abschließen',
      letRest: 'Ruhen lassen',
      reflectionQuestion: 'Reflexionsfrage',
      compareTitle: 'Vorher / Nachher',
      moodBefore: 'Vorher',
      moodAfter: 'Nachher',
      moodSame: 'Deine Stimmung blieb ähnlich.',
      moodLifted: 'Deine Stimmung fühlte sich danach etwas leichter an.',
      moodLower: 'Deine Stimmung fühlte sich danach etwas schwerer an.',
      observationOnly: 'Das ist nur eine Beobachtung, kein Urteil.',
      activeLimit: 'Ein aktives Experiment gleichzeitig hält den Raum ruhig.',
      week: 'Woche',
      weeks: 'Wochen',
      progress: 'Fortschritt',
      restingExperiments: 'Zurzeit ruhend',
      wake: 'Fortsetzen',
      activeIndicator: 'Ein Experiment läuft gerade',
      overviewObservationPrompt: 'Beobachtung des Tages',
      overviewEmptyPrompt: 'Magst du ein kleines Experiment probieren?',
      overviewDiscover: 'Entdecken',
      confirmToday: 'Heute bestätigen',
      confirmedToday: 'Heute bestätigt',
      daysConfirmed: '{done} von {total} Tagen bestätigt',
      todayMissionExperimentLabel: 'Heutiges Experiment',
      categories: {
        morning: 'Morgen',
        body: 'Körper',
        calm: 'Ruhe',
        focus: 'Fokus',
        evening: 'Abend',
        reflection: 'Reflexion',
        connection: 'Verbindung',
        environment: 'Umgebung',
        boundaries: 'Grenzen',
      },
    },
    habits: {
      letRest: 'Pausieren',
      letRestSubtitle: 'Sanft auf Pause setzen',
      letGo: 'Loslassen',
      letGoSubtitle: 'Vollständig entfernen',
      stats: 'Statistiken',
      statsSubtitle: 'Individuelle Einblicke',
      restingHabits: 'Pausierte Gewohnheiten',
      restingNote: 'Manche Gewohnheiten begleiten uns nur eine Weile. Du kannst sie wieder aktivieren, wenn du bereit bist.',
      wake: 'Reaktivieren',
      done: 'Erledigt',
      skipped: 'Übersprungen',
      notDone: 'Nicht erledigt',
      planned: 'Geplant',
      emptyTitle: 'Dein Beobachtungsraum ist leer',
      emptySubtitle: 'Füge etwas hinzu, das du beobachten möchtest – nicht um es zu perfektionieren, nur um es wahrzunehmen.',
    },
    addHabitDialog: {
      title: 'Was möchtest du beobachten?',
      subtitle: 'Füge etwas hinzu, dem du Aufmerksamkeit schenken möchtest',
      placeholder: 'Gewohnheit benennen',
      descriptionLabel: 'Beschreibung (optional)',
      descriptionPlaceholder: 'Eine kurze Notiz zu dieser Gewohnheit...',
      timeOfDay: 'Tageszeit',
      howOften: 'Wie oft',
      anytime: 'Jederzeit',
      morning: 'Morgens',
      midday: 'Mittags',
      evening: 'Abends',
      whenItFits: 'Wenn es passt',
      daily: 'Täglich',
      fewTimesWeek: 'Einige Male/Woche',
      moreOptions: 'Mehr Optionen',
      lessOptions: 'Weniger Optionen',
      canChangeAnytime: 'Du kannst Gewohnheiten jederzeit ändern oder pausieren.',
      maybeLater: 'Vielleicht später',
      add: 'Hinzufügen',
      routine: 'Routine (optional)',
      routineHint: 'Plane dieses Habit automatisch an ausgewählten Tagen',
      routineWeekly: 'Wöchentlich',
      routineMonthly: 'Monatlich',
      weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      removeRoutine: 'Routine entfernen',
      editRoutine: 'Routine bearbeiten',
      routineActive: 'Routine aktiv',
      routineMonthWeekLabel: 'In welcher Monatswoche(n)?',
      routineMonthWeeks: ['1. Woche', '2. Woche', '3. Woche', '4. Woche'],
      routineOptional: 'Optional',
      time: 'Uhrzeit',
      editTime: 'Uhrzeit bearbeiten',
      removeTime: 'Entfernen',
      timeOptional: 'Optional',
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
      patterns: {
        moreCheckinsThisWeek: 'Du hast diese Woche öfter eingetragen als letzte – bemerke den Unterschied, nicht die Zahlen.',
        consciousSkips: 'Du hast diese Woche bewusst einige Gewohnheiten pausiert. Zu erkennen, wann Ruhe nötig ist, ist auch Achtsamkeit.',
        weekendPattern: 'Deine Wochenenden scheinen ihren eigenen natürlichen Rhythmus zu haben.',
        weekdayPattern: 'Werktage scheinen eine andere Energie in deine Praxis zu bringen.',
      },
      correlations: {
        highEnergyMoreCheckins: 'An Tagen mit hoher Energie hast du auch häufiger eingetragen.',
        lowEnergyFewerCheckins: 'An Tagen mit weniger Energie hast du dir mehr Raum gegeben – das ist Achtsamkeit.',
        goodMoodHabit: 'Deine ruhigsten Tage fielen mit "{habitName}" zusammen.',
        habitsTogether: '"{habitB}" erschien oft zusammen mit "{habitA}".',
      },
      prompts: {
        whatDidHabitBring: 'Was hat dir "{habitName}" diese Woche gebracht?',
        easiestMoment: 'Welcher Moment fühlte sich am leichtesten für "{habitName}" an?',
        mostNaturalHabit: 'Welche Gewohnheit fühlte sich diese Woche am natürlichsten an?',
        curiousAboutSkips: 'Was hat dich dazu bewogen, bestimmte Gewohnheiten zu überspringen? Nur neugierig, ohne Wertung.',
        connectionBetweenHabits: 'Bemerkst du eine Verbindung zwischen deinen Gewohnheiten?',
        weekReflection: 'Wenn du auf diese Woche zurückblickst, was fällt dir auf?',
      },
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
    reminders: {
      gentleReminder: 'Sanfte Erinnerung',
      frequency: 'Häufigkeit',
      when: 'Wann',
      off: 'Aus',
      daily: 'Täglich',
      weekly: 'Wöchentlich',
      morning: 'Morgens',
      midday: 'Mittags',
      evening: 'Abends',
      custom: 'Individuell',
      customTimeLabel: 'Wähle deine bevorzugte Zeit',
      on: 'An',
      permissionDenied: 'Browser-Benachrichtigungen sind blockiert. Bitte aktiviere sie in deinen Browser-Einstellungen, um sanfte Erinnerungen zu erhalten.',
      permissionPending: 'Beim Speichern fragen wir nach der Berechtigung für Benachrichtigungen.',
      testNotification: 'Test-Benachrichtigung senden',
      testSent: 'Test gesendet!',
      preview: 'Vorschau',
      fewTimesWeek: 'Einige Male/Woche',
      timesPerWeek: '{count}× pro Woche',
      perWeek: 'pro Woche',
      confirmationNote: 'Diese Erinnerung ist nur ein sanfter Hinweis. Du kannst sie jederzeit ändern oder ausschalten.',
      howOften: 'Wie oft möchtest du erinnert werden?',
      invitationNote: 'Das ist nur ein sanfter Hinweis. Du kannst ihn jederzeit ausschalten.',
      dailyCopy: {
        reconnect: 'Möchtest du dich mit deiner Gewohnheit verbinden?',
        smallPause: 'Eine kleine Pause, wenn es passt.',
        ifNowFeelsRight: 'Wenn es sich jetzt richtig anfühlt, ist diese Gewohnheit hier.',
        gentleMoment: 'Ein sanfter Moment zum Eintragen.',
        hereWhenReady: 'Das ist hier, wenn du bereit bist.',
      },
      weeklyCopy: {
        habitCheckedIn: 'Diese Gewohnheit wurde diese Woche eingetragen.',
        gentlyPickUp: 'Möchtest du das sanft wieder aufnehmen?',
        withoutPressure: 'Eine Erinnerung ohne Druck.',
        restingHere: 'Deine Gewohnheit ruht hier, wann immer du möchtest.',
        softInvitation: 'Eine sanfte Einladung, dich wieder zu verbinden.',
      },
    },
    time: {
      today: 'Heute',
      yesterday: 'Gestern',
      weekdays: {
        monday: 'Montag',
        tuesday: 'Dienstag',
        wednesday: 'Mittwoch',
        thursday: 'Donnerstag',
        friday: 'Freitag',
        saturday: 'Samstag',
        sunday: 'Sonntag',
      },
      dayAbbreviations: ['M', 'D', 'M', 'D', 'F', 'S', 'S'] as [string, string, string, string, string, string, string],
      months: {
        january: 'Januar',
        february: 'Februar',
        march: 'März',
        april: 'April',
        may: 'Mai',
        june: 'Juni',
        july: 'Juli',
        august: 'August',
        september: 'September',
        october: 'Oktober',
        november: 'November',
        december: 'Dezember',
      },
    },
    recommendedHabits: {
      shortWalk: { name: 'Einen kurzen Spaziergang machen', reason: 'Ein einfacher Weg, den Kopf frei zu bekommen' },
      stretchBody: { name: 'Den Körper dehnen', reason: 'Sanft Spannung lösen' },
      moveBody: { name: 'Den Körper bewegen', reason: 'Auf die Art, die dir Freude macht' },
      freshAir: { name: 'Frische Luft schnappen', reason: 'Ein kurzer Reset für die Sinne' },
      breatheConsciously: { name: '3 Minuten bewusst atmen', reason: 'Ein Moment ruhiger Achtsamkeit' },
      quietMoment: { name: 'Einen ruhigen Moment einlegen', reason: 'Lass die Stille dich finden' },
      noticeFeelingsToday: { name: 'Wahrnehmen, wie du dich heute fühlst', reason: 'Achtsamkeit ohne Urteil' },
      positiveMoment: { name: 'Einen positiven Moment aufschreiben', reason: 'Festhalten, was gut lief' },
      gratitudeEntry: { name: 'Etwas aufschreiben, wofür du dankbar bist', reason: 'Wertschätzung nähren' },
      reflectDay: { name: 'Kurz über den Tag reflektieren', reason: 'Ein sanfter Rückblick' },
      setIntention: { name: 'Eine kleine Absicht aufschreiben', reason: 'Mit Klarheit beginnen' },
      smallTask: { name: 'Eine aufgeschobene Kleinigkeit erledigen', reason: 'Ein bisschen Fortschritt wirkt viel' },
      drinkWater: { name: 'Bewusst ein Glas Wasser trinken', reason: 'Ein achtsamer Mikro-Habit' },
      phoneAway: { name: 'Handy 10 Minuten weglegen', reason: 'Raum für Präsenz schaffen' },
      readPages: { name: 'Ein paar Seiten in einem Buch lesen', reason: 'Neugier stillen' },
    },
    timeline: {
      week: 'Woche',
      month: 'Monat',
      year: 'Jahr',
      addHabitsToSee: 'Füge Gewohnheiten hinzu, um deine Rhythmus-Visualisierung zu sehen.',
      engagement: 'Aktivität',
      avg: 'Ø',
      days: 'Tage',
      engaged: 'Aktiv',
      partial: 'Teilweise',
      notEngaged: 'Nicht aktiv',
    },
    achievements: {
      title: 'Errungenschaften',
      subtitle: 'Sanfte Meilensteine auf deinem Weg. Einmal freigeschaltet, bleiben sie für immer.',
      unlocked: '{count} von {total} entdeckt',
      categoryA: 'Einstieg',
      categoryB: 'Wochen-Präsenz',
      categoryC: 'Einzelne Gewohnheiten',
      categoryD: 'Mehrere Gewohnheiten',
      categoryE: 'Muster',
      categoryF: 'Langfristig',
      items: {
        first_step: { name: 'Erster Schritt', description: 'Du hast deine erste Gewohnheit angelegt' },
        first_mark: { name: 'Erste Markierung', description: 'Du hast zum ersten Mal eine Gewohnheit erledigt' },
        getting_started: { name: 'Loslegen', description: 'Drei Check-ins abgeschlossen' },
        showing_up: { name: 'Da sein', description: 'Eine Woche mit mindestens einer erledigten Gewohnheit' },
        back_again: { name: 'Wieder da', description: 'Du bist nach einer Pause zurückgekehrt' },
        quiet_week: { name: 'Ruhige Woche', description: 'Eine Woche mit sanfter, regelmäßiger Präsenz' },
        gentle_continuity: { name: 'Sanfte Kontinuität', description: 'Zwei Wochen mit Präsenz' },
        still_going: { name: 'Immer noch dabei', description: 'Drei Wochen mit Präsenz' },
        soft_rhythm: { name: 'Sanfter Rhythmus', description: 'Vier Wochen ruhiger, wiederkehrender Nutzung' },
        reliable_return: { name: 'Zuverlässige Rückkehr', description: 'Du bist nach mehreren Pausen zurückgekehrt' },
        old_friend: { name: 'Alter Freund', description: 'Eine Gewohnheit begleitet dich seit über einem Monat' },
        long_companion: { name: 'Langzeitbegleiter', description: 'Eine Gewohnheit begleitet dich seit über zwei Monaten' },
        steady_presence: { name: 'Beständige Präsenz', description: 'Eine Gewohnheit begleitet dich über mehrere Monate' },
        letting_it_rest: { name: 'Ruhen lassen', description: 'Du hast bewusst eine Gewohnheit pausiert' },
        picking_it_up_again: { name: 'Wieder aufnehmen', description: 'Du hast eine ruhende Gewohnheit wieder aufgenommen' },
        small_circle: { name: 'Kleiner Kreis', description: 'Ein bis zwei Gewohnheiten über längere Zeit' },
        balanced_set: { name: 'Ausgewogenes Set', description: 'Drei bis vier Gewohnheiten über längere Zeit' },
        changing_needs: { name: 'Wandelnde Bedürfnisse', description: 'Du hast bewusst Gewohnheiten ausgetauscht' },
        trying_things_out: { name: 'Ausprobieren', description: 'Du hast mehrere neue Gewohnheiten getestet' },
        gentle_pair: { name: 'Sanftes Paar', description: 'Zwei Gewohnheiten tauchen oft gemeinsam auf' },
        supportive_set: { name: 'Unterstützendes Set', description: 'Drei Gewohnheiten begleiten sich über Zeit' },
        recurring_pattern: { name: 'Wiederkehrendes Muster', description: 'Ein wiederkehrendes Nutzungsmuster bildet sich' },
        natural_flow: { name: 'Natürlicher Fluss', description: 'Gewohnheiten erscheinen regelmäßig ohne Erinnerungen' },
        own_pace: { name: 'Eigenes Tempo', description: 'Unregelmäßige, aber stabile Langzeitpräsenz' },
        staying_with_it: { name: 'Dranbleiben', description: 'Die App war Teil deiner Wochen' },
        quiet_consistency: { name: 'Stille Beständigkeit', description: 'Regelmäßige Wochen-Präsenz ohne Druck' },
        gentle_commitment: { name: 'Sanftes Engagement', description: 'Gewohnheiten bleiben Teil deines Alltags' },
        living_with_habits: { name: 'Leben mit Gewohnheiten', description: 'Eine langfristige Beziehung zu mehreren Gewohnheiten' },
        aware_practice: { name: 'Bewusste Praxis', description: 'Nutzung über Zeit ohne Zwangslogik' },
      },
    },
    streak: {
      congratulations: 'Glückwunsch, Freund!',
      milestone: 'Du hast einen neuen Meilenstein erreicht:',
      currentStreak: 'Aktueller Lauf',
      longestStreak: 'Längster Lauf',
      consecutiveDays: 'aufeinanderfolgende Tage',
      dismiss: 'Super!',
      disableMilestones: 'Meilensteine nicht mehr anzeigen',
    },
  },
};

export const LANGUAGE_OPTIONS: { value: SupportedLanguage; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
];
