// ============================================================
// ДАННЫЕ ДЛЯ САЙТА iPhone 17 Pro Max
// Источник: официальная страница Apple (apple.com/iphone-17-pro)
// Обновляйте характеристики здесь при изменении официальных данных
// ============================================================

export const heroData = {
  title: "iPhone 17 Pro Max",
  subtitle: "Мощность Pro. Камера Pro. Анимация будущего.",
  description:
    "Самый совершенный iPhone. Чип A19 Pro, революционная система камер и непревзойдённая автономность.",
  ctaPrimary: "Смотреть возможности",
  ctaSecondary: "Характеристики",
};

// ============================================================
// ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ
// Обновляйте при выходе новых официальных данных Apple
// ============================================================
export const specsData = {
  display: {
    title: "Дисплей",
    items: [
      { label: "Тип", value: "Super Retina XDR OLED" },
      { label: "Диагональ", value: "6,9 дюйма" },
      { label: "Частота обновления", value: "1–120 Гц ProMotion" },
      { label: "Яркость", value: "До 2000 нит (пик HDR)" },
      { label: "Защита", value: "Ceramic Shield 2" },
      { label: "Always-On Display", value: "Да" },
      { label: "Dynamic Island", value: "Да" },
    ],
  },
  chip: {
    title: "Производительность",
    items: [
      { label: "Чип", value: "A19 Pro" },
      { label: "Техпроцесс", value: "3 нм (второго поколения)" },
      { label: "GPU", value: "6-ядерный" },
      { label: "Neural Engine", value: "16-ядерный" },
      { label: "Охлаждение", value: "Vapor Chamber Cooling" },
    ],
  },
  cameras: {
    title: "Камеры",
    items: [
      { label: "Основная Fusion", value: "48 МП, f/1.78, OIS" },
      { label: "Ультраширокоугольная", value: "48 МП, f/2.2, автофокус" },
      { label: "Телефото", value: "48 МП, f/2.8, 5x оптический зум" },
      { label: "Максимальный зум", value: "8x оптический" },
      { label: "Фронтальная", value: "18 МП, Center Stage, автофокус" },
      { label: "Видео", value: "4K 120 к/с ProRes, Log Video" },
      { label: "Аудио", value: "Spatial Audio, Vector Audio" },
    ],
  },
  materials: {
    title: "Корпус и защита",
    items: [
      { label: "Корпус", value: "Алюминиевый Unibody" },
      { label: "Рамка", value: "Титан Grade 5" },
      { label: "Задняя панель", value: "Матовое стекло" },
      { label: "Защита от воды", value: "IP68 (6 м, 30 минут)" },
      { label: "Face ID", value: "Да" },
    ],
  },
  connectivity: {
    title: "Связь и интерфейсы",
    items: [
      { label: "Порт", value: "USB-C (USB 3, до 20 Гбит/с)" },
      { label: "5G", value: "Да" },
      { label: "Wi-Fi", value: "Wi-Fi 7" },
      { label: "Bluetooth", value: "5.3" },
      { label: "MagSafe", value: "Да" },
      { label: "NFC", value: "Да" },
      { label: "Спутниковая связь", value: "SOS через спутник" },
    ],
  },
  battery: {
    title: "Батарея",
    items: [
      { label: "Воспроизведение видео", value: "До 39 часов" },
      { label: "Стриминг видео", value: "До 25 часов" },
      { label: "Аудио", value: "До 105 часов" },
      { label: "Зарядка", value: "MagSafe 30 Вт / USB-C 45 Вт" },
    ],
  },
  storage: {
    title: "Память",
    items: [
      { label: "Варианты", value: "256 ГБ / 512 ГБ / 1 ТБ / 2 ТБ" },
    ],
  },
  colors: {
    title: "Цвета",
    items: [
      { label: "Цвета", value: "Чёрный Титан, Белый Титан, Пустынный Титан, Натуральный Титан" },
    ],
  },
  os: {
    title: "Операционная система",
    items: [{ label: "ОС", value: "iOS 19" }],
  },
  dimensions: {
    title: "Размеры",
    items: [
      { label: "Высота", value: "163,0 мм" },
      { label: "Ширина", value: "77,6 мм" },
      { label: "Толщина", value: "8,25 мм" },
      { label: "Вес", value: "227 г" },
    ],
  },
};

// ============================================================
// ЦЕНЫ
// Обновляйте здесь при изменении розничных цен
// Источник: apple.com (цены могут варьироваться по регионам)
// ============================================================
export const priceData = [
  { storage: "256 ГБ", priceEUR: "от €1 199", priceUSD: "от $1 299" },
  { storage: "512 ГБ", priceEUR: "от €1 399", priceUSD: "от $1 499" },
  { storage: "1 ТБ", priceEUR: "от €1 649", priceUSD: "от $1 749" },
  { storage: "2 ТБ", priceEUR: "от €1 999", priceUSD: "от $2 099" },
];

export const camerasData = [
  {
    id: "main",
    title: "48 МП Fusion",
    subtitle: "Основная камера",
    description:
      "Крупный сенсор с диафрагмой f/1.78. Превосходно снимает при любом освещении — от яркого полдня до ночного города.",
    zoom: "1x",
    zoomValue: 1,
    color: "#3b82f6",
  },
  {
    id: "ultrawide",
    title: "48 МП Ultra Wide",
    subtitle: "Ультраширокоугольная",
    description:
      "48 мегапикселей и автофокус для съёмки архитектуры, пейзажей и макро. Угол обзора — как у человеческого глаза.",
    zoom: "0.5x",
    zoomValue: 0.5,
    color: "#8b5cf6",
  },
  {
    id: "telephoto",
    title: "48 МП Telephoto",
    subtitle: "Телефото",
    description:
      "Оптический зум 5x с возможностью цифрового масштабирования до 8x. Портреты с профессиональным боке без потери деталей.",
    zoom: "5x",
    zoomValue: 5,
    color: "#10b981",
  },
  {
    id: "front",
    title: "18 МП Center Stage",
    subtitle: "Фронтальная камера",
    description:
      "Автофокус и технология Center Stage — камера сама следит за вами во время звонков и видеосъёмки.",
    zoom: "1x",
    zoomValue: 1,
    color: "#f59e0b",
  },
];

export const zoomLevels = [
  { label: "0.5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "2x", value: 2 },
  { label: "4x", value: 4 },
  { label: "8x", value: 8 },
];

export const performanceCards = [
  {
    title: "Игры",
    icon: "🎮",
    description:
      "Console-уровень графики в кармане. A19 Pro обеспечивает стабильные 120 FPS в самых требовательных играх.",
    color: "#6366f1",
  },
  {
    title: "Монтаж видео",
    icon: "🎬",
    description:
      "4K ProRes прямо с камеры — редактируйте профессиональное видео без задержек и перегрева.",
    color: "#f59e0b",
  },
  {
    title: "AI-функции",
    icon: "✨",
    description:
      "16-ядерный Neural Engine обрабатывает задачи Apple Intelligence локально, без облака и с защитой данных.",
    color: "#10b981",
  },
  {
    title: "Многозадачность",
    icon: "⚡",
    description:
      "Переключайтесь между приложениями мгновенно. A19 Pro не даёт ни одному процессу тормозить остальные.",
    color: "#3b82f6",
  },
  {
    title: "Энергоэффективность",
    icon: "🔋",
    description:
      "Vapor Chamber Cooling рассеивает тепло равномерно, сохраняя пиковую производительность без потери заряда.",
    color: "#ec4899",
  },
];

export const howItWorksData = [
  {
    id: "chip",
    title: "Чип A19 Pro",
    subtitle: "Мозг устройства",
    description:
      "16-ядерный Neural Engine выполняет 35 триллионов операций в секунду. Это не просто скорость — это новый уровень интеллекта на устройстве.",
    detail: "35 трлн операций/сек",
  },
  {
    id: "cooling",
    title: "Vapor Chamber",
    subtitle: "Система охлаждения",
    description:
      "Испарительная камера равномерно распределяет тепло по всему корпусу. Пиковая производительность сохраняется даже при длительной нагрузке.",
    detail: "Пиковая производительность без перегрева",
  },
  {
    id: "camera",
    title: "Камеры Fusion",
    subtitle: "Тройная система",
    description:
      "Три камеры по 48 МП работают как единая система. Процессор A19 Pro объединяет данные со всех сенсоров для идеального кадра.",
    detail: "3 × 48 МП",
  },
  {
    id: "display",
    title: "ProMotion 120 Гц",
    subtitle: "Адаптивная частота",
    description:
      "Дисплей автоматически меняет частоту от 1 до 120 Гц в зависимости от контента. Плавность там, где нужна, и экономия заряда там, где нет.",
    detail: "1–120 Гц",
  },
  {
    id: "battery",
    title: "До 39 часов",
    subtitle: "Автономность",
    description:
      "Самая долгоживущая батарея в истории iPhone Pro Max. Смотрите видео весь день, фотографируйте и общайтесь — без беспокойства о заряде.",
    detail: "Воспроизведение видео",
  },
  {
    id: "ios",
    title: "iOS 19",
    subtitle: "Умная система",
    description:
      "Apple Intelligence прямо на устройстве: умный помощник, обработка фото, переписывание текстов и многое другое без отправки данных в облако.",
    detail: "Apple Intelligence",
  },
];

export const whyProMaxCards = [
  {
    title: "Максимальный экран",
    description:
      "6,9 дюйма Super Retina XDR OLED с ProMotion 120 Гц. Самый большой и яркий экран на iPhone.",
    icon: "📺",
    stat: "6,9″",
    statLabel: "OLED дисплей",
  },
  {
    title: "Максимальная батарея",
    description:
      "До 39 часов воспроизведения видео. Самая мощная батарея в линейке iPhone.",
    icon: "🔋",
    stat: "39 ч",
    statLabel: "воспроизведение видео",
  },
  {
    title: "Максимальная камера",
    description:
      "Три камеры по 48 МП с зумом до 8x. Профессиональная съёмка всегда в кармане.",
    icon: "📸",
    stat: "8×",
    statLabel: "оптический зум",
  },
  {
    title: "Максимальная мощь",
    description:
      "A19 Pro с Vapor Chamber — производительность без границ и без перегрева.",
    icon: "⚡",
    stat: "A19 Pro",
    statLabel: "самый быстрый чип",
  },
];

export const batteryData = {
  headline: "До 39 часов",
  subtitle: "Воспроизведение видео",
  stats: [
    { label: "Видео", hours: 39, color: "#3b82f6", icon: "🎬" },
    { label: "Стриминг", hours: 25, color: "#8b5cf6", icon: "📡" },
    { label: "Аудио", hours: 105, color: "#10b981", icon: "🎵" },
  ],
  charging: [
    { label: "MagSafe", value: "30 Вт" },
    { label: "USB-C", value: "45 Вт" },
    { label: "Беспроводная", value: "Qi2 15 Вт" },
  ],
};
