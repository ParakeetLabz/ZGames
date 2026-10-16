const translations = {
    en: { dir: "ltr", correctLabel: "Correct", incorrectLabel: "Incorrect", solveThis: "Solve this!", submitBtn: "SUBMIT", continueBtn: "CONTINUE", historyTitle: "History", historyEmpty: "Start playing!", correctHeading: "Amazing!", incorrectHeading: "Oops!", isIndeed: "is", theAnswerWas: "Correct answer:", yourAnswer: "Yours", resultLabel: "Res", opAddition: "➕ Addition", opSubtraction: "➖ Subtraction", opMultiplication: "✕ Multiplication", opDivision: "÷ Division", leaderboardBtn: "🏆 Leaderboard", leaderboardTitle: "🏆 Leaderboard", leaderboardEmpty: "No scores yet. Play and get on the board!", playerName: "Player Name", score: "Score", operation: "Operation", enterName: "Enter your name", saveScore: "Save Score", backBtn: "← Back to Game", rank: "Rank", date: "Date", soundToggle: "🔊 Sound ON", timedModeBtn: "⏱️ Timer", timerBtn: "⏱️ Timer", timeUp: "Time's Up!", finalScore: "Final Score", difficultyBtn: "📊 Difficulty", difficultyEasy: "Easy", difficultyMedium: "Medium", difficultyHard: "Hard", achievementsBtn: "🎖️ Achievements", achievementsTitle: "🎖️ Achievements", achievementUnlocked: "Achievement Unlocked!", achievementsEmpty: "No achievements yet. Keep playing!", achievementLocked: "🔒 Locked", achievementProgress: "Progress", statsBtn: "📈 Statistics", statsTitle: "📈 Performance Statistics", totalProblems: "Total Problems", currentStreak: "Current Streak", bestStreak: "Best Streak", overallAccuracy: "Overall Accuracy", byOperation: "By Operation", byDifficulty: "By Difficulty", totalTime: "Total Time Played", avgTimePerProblem: "Avg Time / Problem", problems: "problems", seconds: "seconds", accuracyLabel: "Accuracy", totalLabel: "Total", difficultyLabel: "Difficulty", resetBtn: "🔄 Reset Session", resetConfirm: "Are you sure? This will clear your current session!" },
    es: { dir: "ltr", correctLabel: "Correcto", incorrectLabel: "Incorrecto", solveThis: "¡Resuelve!", submitBtn: "ENVIAR", continueBtn: "CONTINUAR", historyTitle: "Historial", historyEmpty: "¡Empieza!", correctHeading: "¡Bien!", incorrectHeading: "¡Uy!", isIndeed: "es", theAnswerWas: "Era:", yourAnswer: "Tuya", resultLabel: "Res", opAddition: "➕ Suma", opSubtraction: "➖ Resta", opMultiplication: "✕ Multiplicación", opDivision: "÷ División", leaderboardBtn: "🏆 Tabla de Líderes", leaderboardTitle: "🏆 Tabla de Líderes", leaderboardEmpty: "Sin puntuaciones. ¡Juega y sube al podio!", playerName: "Nombre del Jugador", score: "Puntuación", operation: "Operación", enterName: "Ingresa tu nombre", saveScore: "Guardar Puntuación", backBtn: "← Volver al Juego", rank: "Rango", date: "Fecha", soundToggle: "🔊 Sonido ON", timedModeBtn: "⏱️ Temporizador", timerBtn: "⏱️ Temporizador", timeUp: "¡Se acabó el tiempo!", finalScore: "Puntuación Final", difficultyBtn: "📊 Dificultad", difficultyEasy: "Fácil", difficultyMedium: "Medio", difficultyHard: "Difícil", achievementsBtn: "🎖️ Logros", achievementsTitle: "🎖️ Logros", achievementUnlocked: "¡Logro Desbloqueado!", achievementsEmpty: "Sin logros. ¡Sigue jugando!", achievementLocked: "🔒 Bloqueado", achievementProgress: "Progreso", statsBtn: "📈 Estadísticas", statsTitle: "📈 Estadísticas de Rendimiento", totalProblems: "Problemas Totales", currentStreak: "Racha Actual", bestStreak: "Mejor Racha", overallAccuracy: "Precisión General", byOperation: "Por Operación", byDifficulty: "Por Dificultad", totalTime: "Tiempo Total Jugado", avgTimePerProblem: "Tiempo Promedio / Problema", problems: "problemas", seconds: "segundos", accuracyLabel: "Precisión", totalLabel: "Total", difficultyLabel: "Dificultad", resetBtn: "🔄 Reiniciar Sesión", resetConfirm: "¿Estás seguro? ¡Esto borrará tu sesión actual!" },
    fr: { dir: "ltr", correctLabel: "Correct", incorrectLabel: "Incorrect", solveThis: "Calcule !", submitBtn: "OK", continueBtn: "SUITE", historyTitle: "Historique", historyEmpty: "Jouez !", correctHeading: "Bravo !", incorrectHeading: "Oups !", isIndeed: "est", theAnswerWas: "C'était :", yourAnswer: "Toi", resultLabel: "Res", opAddition: "➕ Addition", opSubtraction: "➖ Soustraction", opMultiplication: "✕ Multiplication", opDivision: "÷ Division", leaderboardBtn: "🏆 Classement", leaderboardTitle: "🏆 Classement", leaderboardEmpty: "Aucun score. Jouez et montez au classement!", playerName: "Nom du Joueur", score: "Score", operation: "Opération", enterName: "Entrez votre nom", saveScore: "Enregistrer Score", backBtn: "← Retour au Jeu", rank: "Rang", date: "Date", soundToggle: "🔊 Son ON", timedModeBtn: "⏱️ Chronomètre", timerBtn: "⏱️ Chronomètre", timeUp: "Temps écoulé!", finalScore: "Score Final", difficultyBtn: "📊 Difficulté", difficultyEasy: "Facile", difficultyMedium: "Moyen", difficultyHard: "Difficile", achievementsBtn: "🎖️ Succès", achievementsTitle: "🎖️ Succès", achievementUnlocked: "Succès Débloqué!", achievementsEmpty: "Pas de succès. Continuez!", achievementLocked: "🔒 Verrouillé", achievementProgress: "Progrès", statsBtn: "📈 Statistiques", statsTitle: "📈 Statistiques de Performance", totalProblems: "Problèmes Totaux", currentStreak: "Série Actuelle", bestStreak: "Meilleure Série", overallAccuracy: "Précision Globale", byOperation: "Par Opération", byDifficulty: "Par Difficulté", totalTime: "Temps Total Joué", avgTimePerProblem: "Temps Moyen / Problème", problems: "problèmes", seconds: "secondes", accuracyLabel: "Précision", totalLabel: "Total", difficultyLabel: "Difficulté", resetBtn: "🔄 Réinitialiser la session", resetConfirm: "Êtes-vous sûr ? Cela effacera votre session actuelle !" },
    de: { dir: "ltr", correctLabel: "Richtig", incorrectLabel: "Falsch", solveThis: "Löse das!", submitBtn: "PRÜFEN", continueBtn: "WEITER", historyTitle: "Verlauf", historyEmpty: "Fang an!", correctHeading: "Super!", incorrectHeading: "Hoppla!", isIndeed: "ist", theAnswerWas: "War:", yourAnswer: "Du", resultLabel: "Res", opAddition: "➕ Addition", opSubtraction: "➖ Subtraktion", opMultiplication: "✕ Multiplikation", opDivision: "÷ Division", leaderboardBtn: "🏆 Rangliste", leaderboardTitle: "🏆 Rangliste", leaderboardEmpty: "Keine Punktzahl. Spiel und steige in die Liste auf!", playerName: "Spielername", score: "Punkte", operation: "Operation", enterName: "Gib deinen Namen ein", saveScore: "Punktzahl Speichern", backBtn: "← Zurück zum Spiel", rank: "Rang", date: "Datum", soundToggle: "🔊 Ton AN", timedModeBtn: "⏱️ Timer", timerBtn: "⏱️ Timer", timeUp: "Zeit vorbei!", finalScore: "Endscore", difficultyBtn: "📊 Schwierigkeit", difficultyEasy: "Einfach", difficultyMedium: "Mittel", difficultyHard: "Schwer", achievementsBtn: "🎖️ Erfolge", achievementsTitle: "🎖️ Erfolge", achievementUnlocked: "Erfolg Freigeschaltet!", achievementsEmpty: "Keine Erfolge. Spiel weiter!", achievementLocked: "🔒 Gesperrt", achievementProgress: "Fortschritt", statsBtn: "📈 Statistiken", statsTitle: "📈 Leistungsstatistiken", totalProblems: "Gesamt Aufgaben", currentStreak: "Aktuelle Serie", bestStreak: "Beste Serie", overallAccuracy: "Gesamtgenauigkeit", byOperation: "Nach Operation", byDifficulty: "Nach Schwierigkeit", totalTime: "Gesamt Spielzeit", avgTimePerProblem: "Durchschn. Zeit / Aufgabe", problems: "aufgaben", seconds: "sekunden", accuracyLabel: "Genauigkeit", totalLabel: "Gesamt", difficultyLabel: "Schwierigkeit", resetBtn: "🔄 Sitzung zurücksetzen", resetConfirm: "Sind Sie sicher? Dies löscht Ihre aktuelle Sitzung!" },
    ru: { dir: "ltr", correctLabel: "Верно", incorrectLabel: "Неверно", solveThis: "Реши!", submitBtn: "ОК", continueBtn: "ДАЛЕЕ", historyTitle: "История", historyEmpty: "Начни игру!", correctHeading: "Верно!", incorrectHeading: "Ой!", isIndeed: "это", theAnswerWas: "Ответ:", yourAnswer: "Твой", resultLabel: "Рез", opAddition: "➕ Сложение", opSubtraction: "➖ Вычитание", opMultiplication: "✕ Умножение", opDivision: "÷ Деление", leaderboardBtn: "🏆 Таблица Лидеров", leaderboardTitle: "🏆 Таблица Лидеров", leaderboardEmpty: "Нет результатов. Играй и поднимись в таблицу!", playerName: "Имя Игрока", score: "Очки", operation: "Операция", enterName: "Введи своё имя", saveScore: "Сохранить Результат", backBtn: "← Вернуться в Игру", rank: "Место", date: "Дата", soundToggle: "🔊 Звук ВКЛ", timedModeBtn: "⏱️ Таймер", timerBtn: "⏱️ Таймер", timeUp: "Время истекло!", finalScore: "Финальный счёт", difficultyBtn: "📊 Сложность", difficultyEasy: "Легко", difficultyMedium: "Средне", difficultyHard: "Сложно", achievementsBtn: "🎖️ Достижения", achievementsTitle: "🎖️ Достижения", achievementUnlocked: "Достижение Получено!", achievementsEmpty: "Нет достижений. Продолжай!", achievementLocked: "🔒 Заблокировано", achievementProgress: "Прогресс", statsBtn: "📈 Статистика", statsTitle: "📈 Статистика Производительности", totalProblems: "Всего Задач", currentStreak: "Текущая Серия", bestStreak: "Лучшая Серия", overallAccuracy: "Общая Точность", byOperation: "По Операциям", byDifficulty: "По Сложности", totalTime: "Общее Время Игры", avgTimePerProblem: "Сред. Время / Задача", problems: "задач", seconds: "секунд", accuracyLabel: "Точность", totalLabel: "Всего", difficultyLabel: "Сложность", resetBtn: "🔄 Сброс сеанса", resetConfirm: "Вы уверены? Это удалит вашу текущую сессию!" },
    he: { dir: "rtl", correctLabel: "נכון", incorrectLabel: "טעות", solveThis: "פתרו!", submitBtn: "שלח", continueBtn: "המשך", historyTitle: "היסטוריה", historyEmpty: "בואו נשחק!", correctHeading: "כל הכבוד!", incorrectHeading: "אופס!", isIndeed: "זה", theAnswerWas: "התשובה:", yourAnswer: "שלך", resultLabel: "תוצאה", opAddition: "➕ חיבור", opSubtraction: "➖ חיסור", opMultiplication: "✕ כפל", opDivision: "÷ חילוק", leaderboardBtn: "🏆 לוח הדירוג", leaderboardTitle: "🏆 לוח הדירוג", leaderboardEmpty: "אין ניקוד. שחק והיות בלוח!", playerName: "שם השחקן", score: "ניקוד", operation: "פעולה", enterName: "הכנס את שמך", saveScore: "שמור ניקוד", backBtn: "← חזור למשחק", rank: "דירוג", date: "תאריך", soundToggle: "🔊 צליל ON", timedModeBtn: "⏱️ טיימר", timerBtn: "⏱️ טיימר", timeUp: "הזמן אזל!", finalScore: "ניקוד סופי", difficultyBtn: "📊 רמת קושי", difficultyEasy: "קל", difficultyMedium: "בינוני", difficultyHard: "קשה", achievementsBtn: "🎖️ הישגים", achievementsTitle: "🎖️ הישגים", achievementUnlocked: "הישג נפתח!", achievementsEmpty: "אין הישגים. המשך!", achievementLocked: "🔒 נעול", achievementProgress: "התקדמות", statsBtn: "📈 סטטיסטיקה", statsTitle: "📈 סטטיסטיקת ביצועים", totalProblems: "סה\"כ תרגילים", currentStreak: "רצף נוכחי", bestStreak: "רצף הכי טוב", overallAccuracy: "דיוק כללי", byOperation: "לפי פעולה", byDifficulty: "לפי קושי", totalTime: "זמן משחק כולל", avgTimePerProblem: "זמן ממוצע / תרגיל", problems: "תרגילים", seconds: "שניות", accuracyLabel: "דיוק", totalLabel: "סה\"כ", difficultyLabel: "קושי", resetBtn: "🔄 איפוס הסשן", resetConfirm: "האם אתה בטוח? זה ימחק את הסשן הנוכחי שלך!" },
    az: { dir: "ltr", correctLabel: "Düz", incorrectLabel: "Səhv", solveThis: "Həll et!", submitBtn: "OK", continueBtn: "DAVAM", historyTitle: "Tarixçə", historyEmpty: "Başla!", correctHeading: "Afərin!", incorrectHeading: "Vay!", isIndeed: "budur", theAnswerWas: "Cavab:", yourAnswer: "Sənin", resultLabel: "Nət", opAddition: "➕ Toplama", opSubtraction: "➖ Çıxma", opMultiplication: "✕ Vurma", opDivision: "÷ Bölmə", leaderboardBtn: "🏆 Lider Taxtası", leaderboardTitle: "🏆 Lider Taxtası", leaderboardEmpty: "Nəticə yoxdur. Oyna və lider taxtasına çıx!", playerName: "Oyunçu Adı", score: "Xal", operation: "Əməliyyat", enterName: "Adınızı daxil edin", saveScore: "Nəticəni Yadda Saxla", backBtn: "← Oyuna Qayıt", rank: "Rütbə", date: "Tarix", soundToggle: "🔊 Səs ON", timedModeBtn: "⏱️ Taymır", timerBtn: "⏱️ Taymır", timeUp: "Vaxt bitdi!", finalScore: "Son Nəticə", difficultyBtn: "📊 Çətinlik", difficultyEasy: "Asan", difficultyMedium: "Orta", difficultyHard: "Çətin", achievementsBtn: "🎖️ Nailiyyətlər", achievementsTitle: "🎖️ Nailiyyətlər", achievementUnlocked: "Nailiyyət Açıldı!", achievementsEmpty: "Nailiyyət yoxdur. Davam et!", achievementLocked: "🔒 Kilidli", achievementProgress: "İrəliləyiş", statsBtn: "📈 Statistika", statsTitle: "📈 Performans Statistikası", totalProblems: "Cəmi Məsələlər", currentStreak: "Cəmi Seriya", bestStreak: "Ən Yaxşı Seriya", overallAccuracy: "Ümumi Dəqiqlik", byOperation: "Əməliyyatına görə", byDifficulty: "Çətinliyə görə", totalTime: "Cəmi Oyun Vaxtı", avgTimePerProblem: "Orta Vaxt / Məsələ", problems: "məsələlər", seconds: "saniyə", accuracyLabel: "Dəqiqlik", totalLabel: "Cəmi", difficultyLabel: "Çətinlik", resetBtn: "🔄 Sesionu Sıfırla", resetConfirm: "Əminsiniz? Bu cari sesinizi siləcək!" }
};

let currentLang = 'en';
let currentOperation = 'multiplication';
let correctCount = 0;
let incorrectCount = 0;
let currentProblem = { a: 0, b: 0, answer: 0, operation: '', display: '' };
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];  // Persistent history
let soundEnabled = JSON.parse(localStorage.getItem('soundEnabled')) !== false;
let audioContext = null;
let timedModeEnabled = JSON.parse(localStorage.getItem('timedModeEnabled')) !== false;
let timerInterval = null;
let timeRemaining = 60;
const TIMED_MODE_DURATION = 60; // 60 seconds
let difficulty = localStorage.getItem('difficulty') || 'medium';
let consecutiveCorrect = 0;
let totalProblemsAnswered = 0;
let languagesUsed = JSON.parse(localStorage.getItem('languagesUsed')) || [];
let operationsCompleted = JSON.parse(localStorage.getItem('operationsCompleted')) || [];

// Achievement definitions
const achievementsList = [
    { id: 'first_steps', icon: '👶', nameKey: 'First Steps', descKey: 'Solve your first problem', condition: () => totalProblemsAnswered >= 1 },
    { id: 'fast_learner', icon: '🎯', nameKey: 'Fast Learner', descKey: 'Solve 10 problems', condition: () => totalProblemsAnswered >= 10 },
    { id: 'math_expert', icon: '🧠', nameKey: 'Math Expert', descKey: 'Solve 50 problems', condition: () => totalProblemsAnswered >= 50 },
    { id: 'century_club', icon: '💯', nameKey: 'Century Club', descKey: 'Solve 100 problems', condition: () => totalProblemsAnswered >= 100 },
    { id: 'perfect_streak', icon: '⭐', nameKey: 'Perfect Streak', descKey: '10 correct answers in a row', condition: () => consecutiveCorrect >= 10 },
    { id: 'polyglot', icon: '🌍', nameKey: 'Polyglot', descKey: 'Use all 7 languages', condition: () => languagesUsed.length >= 7 },
    { id: 'master_of_all', icon: '🏆', nameKey: 'Master of All', descKey: 'Complete problems in all 4 operations', condition: () => operationsCompleted.length >= 4 },
    { id: 'accuracy_king', icon: '👑', nameKey: 'Accuracy King', descKey: 'Achieve 90% accuracy over 20 problems', condition: () => totalProblemsAnswered >= 20 && (correctCount / totalProblemsAnswered) >= 0.9 }
];

let achievements = JSON.parse(localStorage.getItem('achievements')) || {};

// Statistics tracking
let bestStreak = parseInt(localStorage.getItem('bestStreak')) || 0;
let totalTimePlayed = parseInt(localStorage.getItem('totalTimePlayed')) || 0;
let problemStartTime = null;
let sessionStartTime = Date.now();
let operationStats = JSON.parse(localStorage.getItem('operationStats')) || {
    addition: { total: 0, correct: 0 },
    subtraction: { total: 0, correct: 0 },
    multiplication: { total: 0, correct: 0 },
    division: { total: 0, correct: 0 }
};
let difficultyStats = JSON.parse(localStorage.getItem('difficultyStats')) || {
    easy: { total: 0, correct: 0 },
    medium: { total: 0, correct: 0 },
    hard: { total: 0, correct: 0 }
};

const elements = {
    viewQuestion: document.getElementById('view-question'),
    viewResult: document.getElementById('view-result'),
    answerInput: document.getElementById('answer-input'),
    equationDisplay: document.getElementById('equation'),
    resultIcon: document.getElementById('result-icon'),
    resultText: document.getElementById('result-text'),
    resultDetails: document.getElementById('result-details'),
    gameCard: document.getElementById('game-card'),
    historyContainer: document.getElementById('history-container'),
    historyEmpty: document.getElementById('history-empty'),
    btnContinue: document.getElementById('btn-continue'),
    scoreCorrect: document.getElementById('score-correct'),
    scoreIncorrect: document.getElementById('score-incorrect'),
    scoreContainer: document.getElementById('score-container'),
    historySection: document.getElementById('history-section')
};

const operationSymbols = {
    addition: '+',
    subtraction: '−',
    multiplication: '×',
    division: '÷'
};

function setLanguage(lang) {
    currentLang = lang;
    const config = translations[lang];

    // Track language used for achievement
    trackLanguageUsed(lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = config[key];
    });

    document.querySelectorAll('[data-i18n-op]').forEach(el => {
        const key = el.getAttribute('data-i18n-op');
        el.innerText = config[key];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-lang') === lang;
        btn.className = `lang-btn flex-1 px-3 py-3 rounded-lg text-base font-bold transition-colors hover:bg-slate-600 truncate ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`;
    });
    
    // Update timed mode button with new language
    updateTimedModeButton();
    updateDifficultyButton();
    
    // Update difficulty display in stats
    const levelKey = `difficulty${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;
    document.getElementById('difficulty-display').innerText = config[levelKey];
    
    // Update leaderboard display if it's open
    const leaderboardModal = document.getElementById('leaderboard-modal');
    if (!leaderboardModal.classList.contains('hidden')) {
        displayLeaderboard();
        // Update modal title and buttons
        const modalTitle = leaderboardModal.querySelector('[data-i18n="leaderboardTitle"]');
        const backBtn = leaderboardModal.querySelector('[data-i18n="backBtn"]');
        if (modalTitle) modalTitle.innerText = config.leaderboardTitle;
        if (backBtn) backBtn.innerText = config.backBtn;
    }
    
    // Update achievements modal if it's open
    const achievementsModal = document.getElementById('achievements-modal');
    if (!achievementsModal.classList.contains('hidden')) {
        renderAchievements();
    }
    
    // Update statistics modal if it's open
    const statisticsModal = document.getElementById('statistics-modal');
    if (!statisticsModal.classList.contains('hidden')) {
        renderStatistics();
    }
    
    // Save game progress when language changes
    saveGameProgress();
}

function setOperation(operation) {
    currentOperation = operation;
    document.querySelectorAll('.op-btn').forEach(btn => {
        if (btn.getAttribute('data-operation') === operation) {
            btn.className = 'op-btn flex-1 px-3 py-3 rounded-lg text-base font-bold transition-colors bg-indigo-600 text-white whitespace-nowrap';
        } else {
            btn.className = 'op-btn flex-1 px-3 py-3 rounded-lg text-base font-bold transition-colors bg-slate-700 whitespace-nowrap';
        }
    });
    generateProblem();
    saveGameProgress();
}

function generateProblem() {
    let a, b, answer, symbol, display;
    
    // Difficulty-specific ranges for each operation
    switch(currentOperation) {
        case 'addition':
            if (difficulty === 'easy') {
                // Easy: 1-10 + 1-10 (Primary school, Grades 1-2)
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 10) + 1;
            } else if (difficulty === 'medium') {
                // Medium: 1-20 + 1-20 (Grades 3-4)
                a = Math.floor(Math.random() * 20) + 1;
                b = Math.floor(Math.random() * 20) + 1;
            } else {
                // Hard: 1-50 + 1-50 (Grades 5-6)
                a = Math.floor(Math.random() * 50) + 1;
                b = Math.floor(Math.random() * 50) + 1;
            }
            answer = a + b;
            symbol = '+';
            break;
            
        case 'subtraction':
            if (difficulty === 'easy') {
                // Easy: 2-10 - 1-5 (Always positive, simple subtraction)
                a = Math.floor(Math.random() * 9) + 2;
                b = Math.floor(Math.random() * Math.min(5, a - 1)) + 1;
            } else if (difficulty === 'medium') {
                // Medium: 10-30 - 1-15 (Always positive)
                a = Math.floor(Math.random() * 21) + 10;
                b = Math.floor(Math.random() * Math.min(15, a - 1)) + 1;
            } else {
                // Hard: 20-100 - 1-30 (Always positive)
                a = Math.floor(Math.random() * 81) + 20;
                b = Math.floor(Math.random() * Math.min(30, a - 1)) + 1;
            }
            answer = a - b;
            symbol = '−';
            break;
            
        case 'multiplication':
            if (difficulty === 'easy') {
                // Easy: 1-5 × 1-5 (Basic times tables)
                a = Math.floor(Math.random() * 5) + 1;
                b = Math.floor(Math.random() * 5) + 1;
            } else if (difficulty === 'medium') {
                // Medium: 1-10 × 1-10 (Full times tables)
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 10) + 1;
            } else {
                // Hard: 1-15 × 1-15 (Extended times tables)
                a = Math.floor(Math.random() * 15) + 1;
                b = Math.floor(Math.random() * 15) + 1;
            }
            answer = a * b;
            symbol = '×';
            break;
            
        case 'division':
            if (difficulty === 'easy') {
                // Easy: Simple divisions, answer 1-10, divisor 2-5
                b = Math.floor(Math.random() * 4) + 2;
                answer = Math.floor(Math.random() * 10) + 1;
                a = answer * b;
            } else if (difficulty === 'medium') {
                // Medium: Divisions, answer 1-12, divisor 2-10
                b = Math.floor(Math.random() * 9) + 2;
                answer = Math.floor(Math.random() * 12) + 1;
                a = answer * b;
            } else {
                // Hard: Divisions, answer 1-15, divisor 2-12
                b = Math.floor(Math.random() * 11) + 2;
                answer = Math.floor(Math.random() * 15) + 1;
                a = answer * b;
            }
            symbol = '÷';
            break;
    }
    
    currentProblem = { a, b, answer, operation: currentOperation, display: symbol };
    elements.equationDisplay.innerText = `${a} ${symbol} ${b}`;
    // Fix RTL display for languages like Hebrew
    const config = translations[currentLang];
    elements.equationDisplay.dir = config.dir === 'rtl' ? 'rtl' : 'ltr';
    elements.answerInput.value = '';
    problemStartTime = Date.now(); // Start timing this problem
    setTimeout(() => elements.answerInput.focus(), 50);
}

function checkAnswer() {
    const val = parseInt(elements.answerInput.value);
    if (isNaN(val)) return;
    const isCorrect = val === currentProblem.answer;
    addToHistory(currentProblem.a, currentProblem.b, val, currentProblem.answer, isCorrect);
    
    // Track time for this problem
    if (problemStartTime) {
        const timeTaken = (Date.now() - problemStartTime) / 1000;
        totalTimePlayed += timeTaken;
        localStorage.setItem('totalTimePlayed', totalTimePlayed);
    }
    
    totalProblemsAnswered++;
    
    // Update operation stats
    operationStats[currentOperation].total++;
    if (isCorrect) {
        operationStats[currentOperation].correct++;
    }
    localStorage.setItem('operationStats', JSON.stringify(operationStats));
    
    // Update difficulty stats
    difficultyStats[difficulty].total++;
    if (isCorrect) {
        difficultyStats[difficulty].correct++;
    }
    localStorage.setItem('difficultyStats', JSON.stringify(difficultyStats));
    
    if (isCorrect) {
        correctCount++;
        consecutiveCorrect++;
        
        // Update best streak
        if (consecutiveCorrect > bestStreak) {
            bestStreak = consecutiveCorrect;
            localStorage.setItem('bestStreak', bestStreak);
        }
        
        elements.scoreCorrect.innerText = correctCount;
        playCorrectSound();
    } else {
        incorrectCount++;
        consecutiveCorrect = 0; // Reset streak on wrong answer
        elements.scoreIncorrect.innerText = incorrectCount;
        playIncorrectSound();
    }
    
    // Track operation completion
    trackOperationCompleted(currentOperation);
    
    // Check for new achievements
    checkAchievements();
    
    updateStats();
    
    // Save game progress after each answer
    saveGameProgress();
    
    showResult(isCorrect);
}

function updateStats() {
    const total = correctCount + incorrectCount;
    const accuracy = total === 0 ? 0 : Math.round((correctCount / total) * 100);
    document.getElementById('accuracy-display').innerText = `${accuracy}%`;
    document.getElementById('total-display').innerText = total;
    // Fix: Show 0% instead of '--%' on first load
    if (total === 0) {
        document.getElementById('accuracy-display').innerText = '0%';
    }
}

function addToHistory(a, b, userVal, actualVal, isCorrect) {
    elements.historyEmpty.classList.add('hidden');
    const t = translations[currentLang];
    const row = document.createElement('div');
    const isHe = currentLang === 'he';
    const borderClass = isCorrect ? (isHe ? 'border-r-4 border-green-500' : 'border-l-4 border-green-500') : (isHe ? 'border-r-4 border-rose-500' : 'border-l-4 border-rose-500');
    const symbol = currentProblem.display;
    
    row.className = `flex items-center justify-between p-3 rounded-xl bg-slate-800/80 ${borderClass} pop-in text-xs flex-none`;
    row.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="font-bold text-base ${isCorrect ? 'text-green-400' : 'text-rose-400'}">${isCorrect ? '✓' : '✗'}</span>
            <div>
                <p class="font-bold text-sm" dir="ltr">${a} ${symbol} ${b}</p>
                <p class="text-[9px] text-slate-500 uppercase">${t.yourAnswer}: ${userVal}</p>
            </div>
        </div>
        <div class="text-right">
            <span class="text-[10px] font-bold bg-slate-900 px-2 py-1 rounded-full text-slate-300">${actualVal}</span>
        </div>
    `;
    elements.historyContainer.prepend(row);
    // Auto-scroll to top to show the newest entry
    elements.historyContainer.scrollTop = 0;
    
    // Save history item to persistent storage
    const historyItem = {
        a, b, userVal, actualVal, isCorrect,
        operation: currentOperation,
        difficulty: difficulty,
        timestamp: Date.now()
    };
    gameHistory.unshift(historyItem);
    // Keep only last 100 history items to prevent storage bloat
    if (gameHistory.length > 100) {
        gameHistory = gameHistory.slice(0, 100);
    }
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

function showResult(isCorrect) {
    elements.viewQuestion.classList.add('hidden');
    elements.viewResult.classList.remove('hidden');
    elements.viewResult.classList.add('pop-in');
    const t = translations[currentLang];
    const symbol = currentProblem.display;
    if (isCorrect) {
        elements.resultIcon.innerText = "🌟";
        elements.resultText.innerText = t.correctHeading;
        elements.resultText.className = "text-3xl md:text-4xl font-black game-font italic text-green-400";
        elements.resultDetails.innerHTML = `<span dir="ltr">${currentProblem.a} ${symbol} ${currentProblem.b}</span> = ${currentProblem.answer}`;
        elements.gameCard.classList.replace('border-slate-900', 'border-green-900');
    } else {
        elements.resultIcon.innerText = "❌";
        elements.resultText.innerText = t.incorrectHeading;
        elements.resultText.className = "text-3xl md:text-4xl font-black game-font italic text-rose-400";
        elements.resultDetails.innerText = `${t.theAnswerWas} ${currentProblem.answer}`;
        elements.gameCard.classList.replace('border-slate-900', 'border-rose-900');
    }
    setTimeout(() => elements.btnContinue.focus(), 10);
}

function nextQuestion() {
    elements.viewResult.classList.add('hidden');
    elements.viewQuestion.classList.remove('hidden');
    elements.gameCard.className = elements.gameCard.className.replace(/border-(green|rose)-900/, 'border-slate-900');
    generateProblem();
}

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (!elements.viewQuestion.classList.contains('hidden')) checkAnswer();
        else if (!elements.viewResult.classList.contains('hidden')) nextQuestion();
    }
});

// Sound Effects
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playCorrectSound() {
    if (!soundEnabled || !audioContext) return;
    const ctx = initAudioContext();
    const now = ctx.currentTime;
    
    // Create a pleasant "correct" sound - ascending tones
    const frequencies = [523, 659, 784]; // C5, E5, G5 - happy chord
    frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3 + i * 0.05);
        osc.start(now + i * 0.05);
        osc.stop(now + 0.3 + i * 0.05);
        // Fix: Properly disconnect audio nodes to prevent memory leaks
        osc.onended = () => {
            osc.disconnect();
            gain.disconnect();
        };
    });
}

function playIncorrectSound() {
    if (!soundEnabled || !audioContext) return;
    const ctx = initAudioContext();
    const now = ctx.currentTime;
    
    // Create a dramatic "buzz" effect - rapid vibration
    const buzzOsc = ctx.createOscillator();
    const buzzGain = ctx.createGain();
    buzzOsc.connect(buzzGain);
    buzzGain.connect(ctx.destination);
    buzzOsc.frequency.value = 150; // Low buzz tone
    buzzOsc.type = 'sawtooth';
    buzzGain.gain.setValueAtTime(0.3, now);
    buzzGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    buzzOsc.start(now);
    buzzOsc.stop(now + 0.6);
    // Fix: Properly disconnect audio nodes to prevent memory leaks
    buzzOsc.onended = () => {
        buzzOsc.disconnect();
        buzzGain.disconnect();
    };
}

function playBackgroundMusic() {
    if (!soundEnabled || !audioContext) return;
    const ctx = initAudioContext();
    const now = ctx.currentTime;
    
    // Simple looping background melody - upbeat and fun
    const playNote = (freq, duration, startTime) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration * 0.9);
        osc.start(startTime);
        osc.stop(startTime + duration);
        // Fix: Properly disconnect audio nodes to prevent memory leaks
        osc.onended = () => {
            osc.disconnect();
            gain.disconnect();
        };
    };
    
    // Play a simple melody
    const notes = [
        { freq: 523, dur: 0.3 },  // C5
        { freq: 587, dur: 0.3 },  // D5
        { freq: 659, dur: 0.3 },  // E5
        { freq: 784, dur: 0.6 }   // G5
    ];
    
    let time = now;
    notes.forEach(note => {
        playNote(note.freq, note.dur, time);
        time += note.dur;
    });
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    
    const btn = document.getElementById('sound-toggle-btn');
    const t = translations[currentLang];
    
    if (soundEnabled) {
        btn.textContent = t.soundToggle.includes('ON') ? t.soundToggle : '🔊 Sound ON';
        btn.className = 'flex-1 px-3 py-3 rounded-lg text-base font-bold transition-colors bg-green-600 hover:bg-green-500 text-white truncate';
        playBackgroundMusic();
    } else {
        btn.textContent = t.soundToggle.includes('OFF') ? t.soundToggle : '🔇 Sound OFF';
        btn.className = 'flex-1 px-3 py-3 rounded-lg text-base font-bold transition-colors bg-red-600 hover:bg-red-500 text-white truncate';
    }
}

// Leaderboard Functions
function showLeaderboard() {
    document.getElementById('leaderboard-modal').classList.remove('hidden');
    // Dismiss achievement notification to avoid overlap
    const notification = document.getElementById('achievement-notification');
    notification.classList.add('hidden');
    displayLeaderboard();
    document.getElementById('player-name-input').focus();
}

function hideLeaderboard() {
    document.getElementById('leaderboard-modal').classList.add('hidden');
}

function saveCurrentScore() {
    const nameInput = document.getElementById('player-name-input');
    const playerName = nameInput.value.trim();
    
    if (!playerName) {
        alert(currentLang === 'en' ? 'Please enter your name' : 'Ingresa tu nombre');
        return;
    }
    
    const score = correctCount;
    const operation = currentOperation;
    const date = new Date().toLocaleDateString();
    
    leaderboard.push({
        name: playerName,
        score: score,
        operation: operation,
        date: date,
        lang: currentLang
    });
    
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    
    nameInput.value = '';
    displayLeaderboard();
}

function displayLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    const empty = document.getElementById('leaderboard-empty');
    const t = translations[currentLang];
    
    if (leaderboard.length === 0) {
        container.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }
    
    empty.classList.add('hidden');
    container.innerHTML = '<div class="space-y-2">';
    
    leaderboard.slice(0, 20).forEach((entry, index) => {
        const opLabel = t[`op${entry.operation.charAt(0).toUpperCase() + entry.operation.slice(1)}`] || entry.operation;
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between p-3 rounded-lg bg-slate-800 border-l-4 border-amber-500 text-sm';
        row.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="font-black text-amber-400 text-lg w-8 text-center">${index + 1}</span>
                <div>
                    <p class="font-bold text-white">${entry.name}</p>
                    <p class="text-[9px] text-slate-400">${entry.date}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="font-black text-lg text-amber-400">${entry.score}</p>
                <p class="text-[9px] text-slate-400">${opLabel}</p>
            </div>
        `;
        container.appendChild(row);
    });
    
    container.innerHTML += '</div>';
}

function updateLeaderboardText() {
    const t = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
}

// Timed Mode Functions
function toggleTimedMode() {
    timedModeEnabled = !timedModeEnabled;
    localStorage.setItem('timedModeEnabled', JSON.stringify(timedModeEnabled));
    updateTimedModeButton();
    if (timedModeEnabled) {
        startTimedGame();
    } else {
        stopTimer();
    }
    saveGameProgress();
}

// Difficulty Functions
function setDifficulty(level) {
    difficulty = level;
    localStorage.setItem('difficulty', difficulty);
    updateDifficultyButton();
    closeDifficultyMenu();
    generateProblem();
    // Ensure we're in question view to see the new problem
    if (!elements.viewQuestion.classList.contains('hidden')) {
        elements.answerInput.focus();
    }
    saveGameProgress();
}

function updateDifficultyButton() {
    const btn = document.getElementById('difficulty-btn');
    const t = translations[currentLang];
    btn.innerHTML = t.difficultyBtn;
}

function closeDifficultyMenu() {
    document.getElementById('difficulty-menu').classList.add('hidden');
}

// Toggle difficulty menu
document.addEventListener('click', (e) => {
    const menu = document.getElementById('difficulty-menu');
    const btn = document.getElementById('difficulty-btn');
    if (e.target === btn || btn.contains(e.target)) {
        menu.classList.toggle('hidden');
    } else if (!menu.contains(e.target)) {
        menu.classList.add('hidden');
    }
});

function updateTimedModeButton() {
    const btn = document.getElementById('timed-mode-btn');
    const t = translations[currentLang];
    // Display ON/OFF status similar to sound toggle
    btn.textContent = t.timedModeBtn;
    if (timedModeEnabled) {
        btn.className = 'flex-1 px-3 py-3 rounded-lg text-base font-bold transition-colors bg-blue-600 hover:bg-blue-500 text-white truncate';
    } else {
        btn.className = 'flex-1 px-3 py-3 rounded-lg text-base font-bold transition-colors bg-slate-700 hover:bg-slate-600 text-white truncate';
    }
}

function startTimedGame() {
    timeRemaining = TIMED_MODE_DURATION;
    correctCount = 0;
    incorrectCount = 0;
    elements.scoreCorrect.innerText = '0';
    elements.scoreIncorrect.innerText = '0';
    elements.historyContainer.innerHTML = '';
    elements.historyEmpty.classList.remove('hidden');
    document.getElementById('timer-display').classList.remove('hidden');
    generateProblem();
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer-seconds').innerText = timeRemaining;
        
        // Change color as time runs low
        const timerDisplay = document.getElementById('timer-display');
        if (timeRemaining <= 10) {
            timerDisplay.classList.add('text-red-400');
            timerDisplay.classList.remove('text-yellow-400');
        } else {
            timerDisplay.classList.add('text-yellow-400');
            timerDisplay.classList.remove('text-red-400');
        }
        
        if (timeRemaining <= 0) {
            endTimedGame();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer-display').classList.add('hidden');
}

function endTimedGame() {
    stopTimer();
    elements.viewQuestion.classList.add('hidden');
    elements.viewResult.classList.remove('hidden');
    elements.viewResult.classList.add('pop-in');
    
    const t = translations[currentLang];
    elements.resultIcon.innerText = "⏱️";
    elements.resultText.innerText = t.timeUp;
    elements.resultText.className = "text-3xl md:text-4xl font-black game-font italic text-blue-400";
    elements.resultDetails.innerHTML = `<p class="text-2xl font-black text-white">${t.finalScore}: ${correctCount}</p>`;
    elements.gameCard.classList.replace('border-slate-900', 'border-blue-900');
    
    const btnContinue = elements.btnContinue;
    btnContinue.setAttribute('data-i18n', 'continueBtn');
    btnContinue.innerText = t.continueBtn;
    btnContinue.onclick = () => {
        elements.viewResult.classList.add('hidden');
        elements.viewQuestion.classList.remove('hidden');
        elements.gameCard.className = elements.gameCard.className.replace(/border-(green|rose|blue)-900/, 'border-slate-900');
        startTimedGame();
    };
    
    setTimeout(() => btnContinue.focus(), 10);
}

// Achievement System Functions
function showAchievements() {
    const modal = document.getElementById('achievements-modal');
    modal.classList.remove('hidden');
    // Dismiss achievement notification to avoid overlap
    const notification = document.getElementById('achievement-notification');
    notification.classList.add('hidden');
    renderAchievements();
}

function hideAchievements() {
    const modal = document.getElementById('achievements-modal');
    modal.classList.add('hidden');
}

function renderAchievements() {
    const container = document.getElementById('achievements-container');
    const t = translations[currentLang];
    
    container.innerHTML = achievementsList.map(ach => {
        const isUnlocked = achievements[ach.id];
        const unlockDate = isUnlocked ? new Date(isUnlocked).toLocaleDateString() : '';
        
        return `
            <div class="bg-slate-800 rounded-xl p-4 border-2 ${isUnlocked ? 'border-amber-500' : 'border-slate-700'} transition-all">
                <div class="flex items-start gap-3">
                    <div class="text-4xl ${isUnlocked ? '' : 'grayscale opacity-30'}">${ach.icon}</div>
                    <div class="flex-1">
                        <h3 class="font-black text-lg ${isUnlocked ? 'text-amber-400' : 'text-slate-500'}">${ach.nameKey}</h3>
                        <p class="text-sm text-slate-400 mb-2">${ach.descKey}</p>
                        ${isUnlocked 
                            ? `<p class="text-xs text-amber-500 font-bold">✓ Unlocked ${unlockDate}</p>` 
                            : `<p class="text-xs text-slate-600">${t.achievementLocked}</p>`
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function checkAchievements() {
    achievementsList.forEach(ach => {
        if (!achievements[ach.id] && ach.condition()) {
            unlockAchievement(ach.id, ach.nameKey);
        }
    });
}

function unlockAchievement(id, name) {
    achievements[id] = Date.now();
    localStorage.setItem('achievements', JSON.stringify(achievements));
    showAchievementNotification(name);
    playCorrectSound(); // Play a celebratory sound
}

function showAchievementNotification(name) {
    const notification = document.getElementById('achievement-notification');
    const textEl = document.getElementById('achievement-notification-text');
    
    textEl.textContent = name;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 4000);
}

function trackLanguageUsed(lang) {
    if (!languagesUsed.includes(lang)) {
        languagesUsed.push(lang);
        localStorage.setItem('languagesUsed', JSON.stringify(languagesUsed));
    }
}

function trackOperationCompleted(operation) {
    if (!operationsCompleted.includes(operation)) {
        operationsCompleted.push(operation);
        localStorage.setItem('operationsCompleted', JSON.stringify(operationsCompleted));
    }
}

// Save/Load Game Progress
function saveGameProgress() {
    const gameState = {
        currentLang,
        currentOperation,
        correctCount,
        incorrectCount,
        currentProblem,
        difficulty,
        consecutiveCorrect,
        totalProblemsAnswered,
        languagesUsed,
        operationsCompleted,
        bestStreak,
        totalTimePlayed,
        operationStats,
        difficultyStats,
        achievements,
        soundEnabled,
        timedModeEnabled,
        timestamp: Date.now()
    };
    localStorage.setItem('gameProgress', JSON.stringify(gameState));
}

function loadGameHistory() {
    const savedHistory = localStorage.getItem('gameHistory');
    if (savedHistory) {
        try {
            gameHistory = JSON.parse(savedHistory);
            // Restore history items to the display
            if (gameHistory.length > 0) {
                elements.historyEmpty.classList.add('hidden');
                gameHistory.forEach(item => {
                    const t = translations[currentLang];
                    const row = document.createElement('div');
                    const isHe = currentLang === 'he';
                    const borderClass = item.isCorrect ? (isHe ? 'border-r-4 border-green-500' : 'border-l-4 border-green-500') : (isHe ? 'border-r-4 border-rose-500' : 'border-l-4 border-rose-500');
                    
                    row.className = `flex items-center justify-between p-3 rounded-xl bg-slate-800/80 ${borderClass} text-xs flex-none`;
                    row.innerHTML = `
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-base ${item.isCorrect ? 'text-green-400' : 'text-rose-400'}">${item.isCorrect ? '✓' : '✗'}</span>
                            <div>
                                <p class="font-bold text-sm" dir="ltr">${item.a} × ${item.b}</p>
                                <p class="text-[9px] text-slate-500 uppercase">${t.yourAnswer}: ${item.userVal}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] font-bold bg-slate-900 px-2 py-1 rounded-full text-slate-300">${item.actualVal}</span>
                        </div>
                    `;
                    elements.historyContainer.append(row);
                });
            }
        } catch (e) {
            console.error('Error loading game history:', e);
        }
    }
}

function loadGameProgress() {
    const savedState = localStorage.getItem('gameProgress');
    if (!savedState) return false;
    
    try {
        const gameState = JSON.parse(savedState);
        
        // Restore all game state variables
        currentLang = gameState.currentLang || 'en';
        currentOperation = gameState.currentOperation || 'multiplication';
        correctCount = gameState.correctCount || 0;
        incorrectCount = gameState.incorrectCount || 0;
        currentProblem = gameState.currentProblem || { a: 0, b: 0, answer: 0, operation: '', display: '' };
        difficulty = gameState.difficulty || 'medium';
        consecutiveCorrect = gameState.consecutiveCorrect || 0;
        totalProblemsAnswered = gameState.totalProblemsAnswered || 0;
        languagesUsed = gameState.languagesUsed || [];
        operationsCompleted = gameState.operationsCompleted || [];
        bestStreak = gameState.bestStreak || 0;
        totalTimePlayed = gameState.totalTimePlayed || 0;
        operationStats = gameState.operationStats || {
            addition: { total: 0, correct: 0 },
            subtraction: { total: 0, correct: 0 },
            multiplication: { total: 0, correct: 0 },
            division: { total: 0, correct: 0 }
        };
        difficultyStats = gameState.difficultyStats || {
            easy: { total: 0, correct: 0 },
            medium: { total: 0, correct: 0 },
            hard: { total: 0, correct: 0 }
        };
        achievements = gameState.achievements || {};
        soundEnabled = gameState.soundEnabled !== false;
        timedModeEnabled = gameState.timedModeEnabled !== false;
        
        // Update UI elements with restored values
        elements.scoreCorrect.innerText = correctCount;
        elements.scoreIncorrect.innerText = incorrectCount;
        
        return true;
    } catch (e) {
        console.error('Error loading game progress:', e);
        return false;
    }
}

window.onload = () => { 
    // Try to load saved game progress
    const progressLoaded = loadGameProgress();
    
    setLanguage(currentLang);
    generateProblem();
    initAudioContext();
    updateTimedModeButton();
    updateDifficultyButton();
    loadGameHistory();  // Load persistent history from previous sessions
    
    const soundBtn = document.getElementById('sound-toggle-btn');
    const t = translations[currentLang];
    if (soundEnabled) {
        soundBtn.textContent = t.soundToggle.replace('OFF', 'ON');
        soundBtn.className = 'flex-1 px-3 py-3 rounded-lg text-base font-bold transition-colors bg-green-600 hover:bg-green-500 text-white truncate';
    } else {
        soundBtn.textContent = t.soundToggle.replace('ON', 'OFF');
        soundBtn.className = 'flex-1 px-3 py-3 rounded-lg text-base font-bold transition-colors bg-red-600 hover:bg-red-500 text-white truncate';
    }
    
    // Auto-save game progress periodically
    setInterval(saveGameProgress, 5000); // Save every 5 seconds
};
// Statistics Functions
function showStatistics() {
    const modal = document.getElementById('statistics-modal');
    modal.classList.remove('hidden');
    // Dismiss achievement notification to avoid overlap
    const notification = document.getElementById('achievement-notification');
    notification.classList.add('hidden');
    renderStatistics();
}

function hideStatistics() {
    const modal = document.getElementById('statistics-modal');
    modal.classList.add('hidden');
}

function renderStatistics() {
    const t = translations[currentLang];
    
    // Overall stats
    document.getElementById('stat-total-problems').innerText = totalProblemsAnswered;
    document.getElementById('stat-current-streak').innerText = consecutiveCorrect;
    document.getElementById('stat-best-streak').innerText = bestStreak;
    
    const overallAccuracy = totalProblemsAnswered === 0 ? 0 : Math.round((correctCount / totalProblemsAnswered) * 100);
    document.getElementById('stat-accuracy').innerText = overallAccuracy + '%';
    
    // By Operation
    const operationContainer = document.getElementById('stats-by-operation');
    operationContainer.innerHTML = '';
    
    const operations = [
        { key: 'addition', icon: '➕', name: t.opAddition },
        { key: 'subtraction', icon: '➖', name: t.opSubtraction },
        { key: 'multiplication', icon: '✕', name: t.opMultiplication },
        { key: 'division', icon: '÷', name: t.opDivision }
    ];
    
    operations.forEach(op => {
        const stats = operationStats[op.key];
        const accuracy = stats.total === 0 ? 0 : Math.round((stats.correct / stats.total) * 100);
        const percentage = stats.total === 0 ? 0 : (stats.correct / stats.total) * 100;
        
        const div = document.createElement('div');
        div.className = 'bg-slate-800 rounded-lg p-3';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold">${op.name}</span>
                <span class="text-sm text-slate-400">${stats.correct}/${stats.total} ${t.problems} - ${accuracy}%</span>
            </div>
            <div class="w-full bg-slate-700 rounded-full h-2">
                <div class="bg-teal-500 h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
            </div>
        `;
        operationContainer.appendChild(div);
    });
    
    // By Difficulty
    const difficultyContainer = document.getElementById('stats-by-difficulty');
    difficultyContainer.innerHTML = '';
    
    const difficulties = [
        { key: 'easy', name: t.difficultyEasy, color: 'bg-green-500' },
        { key: 'medium', name: t.difficultyMedium, color: 'bg-yellow-500' },
        { key: 'hard', name: t.difficultyHard, color: 'bg-red-500' }
    ];
    
    difficulties.forEach(diff => {
        const stats = difficultyStats[diff.key];
        const accuracy = stats.total === 0 ? 0 : Math.round((stats.correct / stats.total) * 100);
        const percentage = stats.total === 0 ? 0 : (stats.correct / stats.total) * 100;
        
        const div = document.createElement('div');
        div.className = 'bg-slate-800 rounded-lg p-3';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold">${diff.name}</span>
                <span class="text-sm text-slate-400">${stats.correct}/${stats.total} ${t.problems} - ${accuracy}%</span>
            </div>
            <div class="w-full bg-slate-700 rounded-full h-2">
                <div class="${diff.color} h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
            </div>
        `;
        difficultyContainer.appendChild(div);
    });
    
    // Time stats - with proper validation
    const totalTimeSeconds = Math.round(Math.max(0, totalTimePlayed));
    const avgTime = totalProblemsAnswered === 0 ? 0 : Math.round(Math.max(0, totalTimePlayed / totalProblemsAnswered));
    
    // Ensure values are valid numbers
    const displayTotalTime = isFinite(totalTimeSeconds) ? totalTimeSeconds : 0;
    const displayAvgTime = isFinite(avgTime) ? avgTime : 0;
    
    document.getElementById('stat-total-time').innerHTML = `${displayTotalTime} <span data-i18n="seconds" class="text-base">${t.seconds}</span>`;
    document.getElementById('stat-avg-time').innerHTML = `${displayAvgTime} <span data-i18n="seconds" class="text-base">${t.seconds}</span>`;
}

// Reset Game Function (Resets only current session, keeps leaderboard, achievements, and statistics)
function resetGame() {
    const t = translations[currentLang];
    const confirmMessage = t.resetConfirm || "Are you sure? This will clear all progress!";
    
    if (confirm(confirmMessage)) {
        // Reset current session data only
        correctCount = 0;
        incorrectCount = 0;
        currentProblem = { a: 0, b: 0, answer: 0, operation: '', display: '' };
        gameHistory = [];
        consecutiveCorrect = 0;
        
        // Update UI elements
        elements.scoreCorrect.innerText = '0';
        elements.scoreIncorrect.innerText = '0';
        elements.historyContainer.innerHTML = '';
        elements.historyEmpty.classList.remove('hidden');
        updateStats();
        generateProblem();
        
        // Save the reset state (clears session data but keeps persistent data)
        saveGameProgress();
        
        // Show confirmation (optional - you can comment this out if you don't want a second message)
        // No need to reload - just update the UI
    }
}