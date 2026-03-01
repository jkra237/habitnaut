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
    allSetMessage: string;
    localDataNotice: string;
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
      hobbyMessage: string;
      warmRegards: string;
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
      morningAnchor: string;
      middayAnchor: string;
      eveningAnchor: string;
      moreCheckinsThisWeek: string;
      consciousSkips: string;
      consistentDays: string;
      weekendPattern: string;
      weekdayPattern: string;
    };
    // Correlation messages
    correlations: {
      highEnergyMoreCheckins: string;
      lowEnergyFewerCheckins: string;
      goodMoodHabit: string;
      habitsTogether: string;
      morningMoodBetter: string;
      eveningMoodBetter: string;
    };
    // Prompt messages
    prompts: {
      whatDidHabitBring: string;
      easiestMoment: string;
      morningRhythmAligned: string;
      energyWavesPeaks: string;
      smallMomentsCount: string;
      patternsNoticing: string;
      mostNaturalHabit: string;
      gentleReminder: string;
      celebrateConsistency: string;
      restIsProgress: string;
      curiousAboutSkips: string;
      connectionBetweenHabits: string;
      timeOfDayInfluence: string;
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
        hobbyMessage: 'HabitNaut is the first version of my habit tracker and will be continuously improved. This app is free and without restrictions. Do you have feedback or other thoughts? I\'m looking forward to hear it. Just send it as a comment in your App Store.',
        warmRegards: 'Warm regards,',
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
      planned: 'Planned',
      emptyTitle: 'Your observation space is empty',
      emptySubtitle: 'Add something you\'d like to observe – not to perfect, just to notice.',
    },
    addHabitDialog: {
      title: 'What would you like to observe?',
      subtitle: 'Add something you\'d like to pay attention to',
      placeholder: 'e.g., Morning walk, Journaling, Reading...',
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
        morningAnchor: 'You tended to start habits in the morning more often this week.',
        middayAnchor: 'You tended to start habits at midday more often this week.',
        eveningAnchor: 'You tended to start habits in the evening more often this week.',
        moreCheckinsThisWeek: 'You checked in more often this week than last — notice the difference, not the numbers.',
        consciousSkips: 'You chose to pause some habits this week. Noticing when to rest is awareness too.',
        consistentDays: 'Your rhythm has been steady these past days.',
        weekendPattern: 'Your weekends seem to have their own natural rhythm.',
        weekdayPattern: 'Weekdays seem to bring a different energy to your practice.',
      },
      correlations: {
        highEnergyMoreCheckins: 'On days you logged energy as high, you also checked in more frequently.',
        lowEnergyFewerCheckins: 'On lower energy days, you gave yourself more space — that is awareness.',
        goodMoodHabit: 'Your calmest days coincided with "{habitName}".',
        habitsTogether: '"{habitB}" often appeared alongside "{habitA}".',
        morningMoodBetter: 'Your mood tends to be brighter in the mornings.',
        eveningMoodBetter: 'Your evenings often bring a sense of calm.',
      },
      prompts: {
        whatDidHabitBring: 'What did "{habitName}" bring you this week?',
        easiestMoment: 'Which moment felt easiest for "{habitName}"?',
        morningRhythmAligned: 'Your morning rhythm seems aligned with your habits. How does that feel?',
        energyWavesPeaks: 'Notice the natural rhythm of your energy this week. When were the peaks?',
        smallMomentsCount: 'Even small moments of practice count as awareness.',
        patternsNoticing: 'What patterns are you noticing in your daily rhythm?',
        mostNaturalHabit: 'Which habit felt most natural this week?',
        gentleReminder: 'This is a space for observation, not optimization.',
        celebrateConsistency: 'Notice how some habits have become part of your rhythm.',
        restIsProgress: 'Rest and pauses are part of the journey too.',
        curiousAboutSkips: 'What made you choose to skip certain habits? Just curious, no judgment.',
        connectionBetweenHabits: 'Do you notice any connection between your habits?',
        timeOfDayInfluence: 'How does the time of day influence your energy for habits?',
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
        hobbyMessage: 'HabitNaut es la primera versión de mi rastreador de hábitos y se mejorará continuamente. Esta app es gratuita y sin restricciones. ¿Tienes comentarios u otras ideas? Me encantaría escucharlos. Simplemente envíalos como comentario en tu App Store.',
        warmRegards: 'Con cariño,',
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
      planned: 'Planificado',
      emptyTitle: 'Tu espacio de observación está vacío',
      emptySubtitle: 'Añade algo que te gustaría observar – no para perfeccionar, solo para notar.',
    },
    addHabitDialog: {
      title: '¿Qué te gustaría observar?',
      subtitle: 'Añade algo a lo que quieras prestar atención',
      placeholder: 'p.ej., Paseo matutino, Escribir, Leer...',
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
        morningAnchor: 'Esta semana tendiste a empezar los hábitos por la mañana más a menudo.',
        middayAnchor: 'Esta semana tendiste a empezar los hábitos al mediodía más a menudo.',
        eveningAnchor: 'Esta semana tendiste a empezar los hábitos por la tarde más a menudo.',
        moreCheckinsThisWeek: 'Registraste más esta semana que la anterior — nota la diferencia, no los números.',
        consciousSkips: 'Elegiste pausar algunos hábitos esta semana. Notar cuándo descansar también es conciencia.',
        consistentDays: 'Tu ritmo ha sido constante estos días.',
        weekendPattern: 'Tus fines de semana parecen tener su propio ritmo natural.',
        weekdayPattern: 'Los días laborables parecen traer una energía diferente a tu práctica.',
      },
      correlations: {
        highEnergyMoreCheckins: 'Los días que registraste alta energía, también registraste más frecuentemente.',
        lowEnergyFewerCheckins: 'En días de baja energía, te diste más espacio — eso es conciencia.',
        goodMoodHabit: 'Tus días más tranquilos coincidieron con "{habitName}".',
        habitsTogether: '"{habitB}" apareció frecuentemente junto con "{habitA}".',
        morningMoodBetter: 'Tu estado de ánimo tiende a ser más brillante por las mañanas.',
        eveningMoodBetter: 'Tus tardes suelen traer una sensación de calma.',
      },
      prompts: {
        whatDidHabitBring: '¿Qué te aportó "{habitName}" esta semana?',
        easiestMoment: '¿Qué momento fue más fácil para "{habitName}"?',
        morningRhythmAligned: 'Tu ritmo matutino parece alineado con tus hábitos. ¿Cómo se siente eso?',
        energyWavesPeaks: 'Nota el ritmo natural de tu energía esta semana. ¿Cuándo fueron los picos?',
        smallMomentsCount: 'Incluso los pequeños momentos de práctica cuentan como conciencia.',
        patternsNoticing: '¿Qué patrones estás notando en tu ritmo diario?',
        mostNaturalHabit: '¿Qué hábito se sintió más natural esta semana?',
        gentleReminder: 'Este es un espacio para observar, no para optimizar.',
        celebrateConsistency: 'Nota cómo algunos hábitos se han convertido en parte de tu ritmo.',
        restIsProgress: 'El descanso y las pausas también son parte del camino.',
        curiousAboutSkips: '¿Qué te hizo elegir saltarte ciertos hábitos? Solo curiosidad, sin juicio.',
        connectionBetweenHabits: '¿Notas alguna conexión entre tus hábitos?',
        timeOfDayInfluence: '¿Cómo influye la hora del día en tu energía para los hábitos?',
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
        hobbyMessage: 'HabitNaut ist die erste Version meines Habit-Trackers und wird stetig verbessert. Diese App ist kostenlos und ohne Einschränkungen. Hast du Feedback oder andere Gedanken? Ich freue mich darauf! Schreib es einfach als Kommentar in deinem App Store.',
        warmRegards: 'Mit warmen Grüßen,',
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
    },
    habits: {
      letRest: 'Pausieren',
      letRestSubtitle: 'Sanft auf Pause setzen',
      letGo: 'Loslassen',
      letGoSubtitle: 'Vollständig entfernen',
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
      placeholder: 'z.B. Morgenspaziergang, Tagebuch, Lesen...',
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
        morningAnchor: 'Du hast diese Woche öfter morgens mit Gewohnheiten begonnen.',
        middayAnchor: 'Du hast diese Woche öfter mittags mit Gewohnheiten begonnen.',
        eveningAnchor: 'Du hast diese Woche öfter abends mit Gewohnheiten begonnen.',
        moreCheckinsThisWeek: 'Du hast diese Woche öfter eingetragen als letzte – bemerke den Unterschied, nicht die Zahlen.',
        consciousSkips: 'Du hast diese Woche bewusst einige Gewohnheiten pausiert. Zu erkennen, wann Ruhe nötig ist, ist auch Achtsamkeit.',
        consistentDays: 'Dein Rhythmus war in den letzten Tagen beständig.',
        weekendPattern: 'Deine Wochenenden scheinen ihren eigenen natürlichen Rhythmus zu haben.',
        weekdayPattern: 'Werktage scheinen eine andere Energie in deine Praxis zu bringen.',
      },
      correlations: {
        highEnergyMoreCheckins: 'An Tagen mit hoher Energie hast du auch häufiger eingetragen.',
        lowEnergyFewerCheckins: 'An Tagen mit weniger Energie hast du dir mehr Raum gegeben – das ist Achtsamkeit.',
        goodMoodHabit: 'Deine ruhigsten Tage fielen mit "{habitName}" zusammen.',
        habitsTogether: '"{habitB}" erschien oft zusammen mit "{habitA}".',
        morningMoodBetter: 'Deine Stimmung ist morgens oft heller.',
        eveningMoodBetter: 'Deine Abende bringen oft eine gewisse Ruhe.',
      },
      prompts: {
        whatDidHabitBring: 'Was hat dir "{habitName}" diese Woche gebracht?',
        easiestMoment: 'Welcher Moment fühlte sich am leichtesten für "{habitName}" an?',
        morningRhythmAligned: 'Dein Morgenrhythmus scheint mit deinen Gewohnheiten übereinzustimmen. Wie fühlt sich das an?',
        energyWavesPeaks: 'Beobachte den natürlichen Rhythmus deiner Energie diese Woche. Wann waren die Höhepunkte?',
        smallMomentsCount: 'Auch kleine Momente der Übung zählen als Achtsamkeit.',
        patternsNoticing: 'Welche Muster bemerkst du in deinem Tagesrhythmus?',
        mostNaturalHabit: 'Welche Gewohnheit fühlte sich diese Woche am natürlichsten an?',
        gentleReminder: 'Dies ist ein Raum zum Beobachten, nicht zum Optimieren.',
        celebrateConsistency: 'Bemerke, wie manche Gewohnheiten Teil deines Rhythmus geworden sind.',
        restIsProgress: 'Ruhe und Pausen sind auch Teil des Weges.',
        curiousAboutSkips: 'Was hat dich dazu bewogen, bestimmte Gewohnheiten zu überspringen? Nur neugierig, ohne Wertung.',
        connectionBetweenHabits: 'Bemerkst du eine Verbindung zwischen deinen Gewohnheiten?',
        timeOfDayInfluence: 'Wie beeinflusst die Tageszeit deine Energie für Gewohnheiten?',
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
  },
};

export const LANGUAGE_OPTIONS: { value: SupportedLanguage; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
];
