/* =============================================================================
   ОПЕРАЦИЯ «БАГРАТИОН» — ЛОГИКА САЙТА
   Проект для конкурса «ПАТРИОТ.by», номинация «Сайт». 2026 год.
   Подключается в index.html перед </body>: <script src="script.js"></script>

   СОДЕРЖАНИЕ ФАЙЛА:
     БЛОК 1    — данные проекта (города, фото, цифры)
     БЛОК 2    — карта Leaflet
     БЛОК 3    — всплывающая карточка города
     БЛОК 4    — анимированный маршрут
     БЛОК 5    — таймлайн
     БЛОК 6    — инфографика «Цифры операции»
     БЛОК 6.5  — фотогалерея мемориала
     БЛОК 7    — появление блоков при скролле
     БЛОК 8    — интерфейс (кнопки, «наверх»)
     БЛОК 8.2  — «Дополни карту»: проверка, облако, редактирование
     БЛОК 8.5  — чат-бот «Сапёр Громов»
   ============================================================================= */

/* ============================================================================
   БЛОК JS 1 — ДАННЫЕ ПРОЕКТА
   Всё содержимое сайта хранится здесь. Чтобы изменить текст, дату или
   координаты города — правьте только этот объект, остальной код трогать не нужно.
   ============================================================================ */
const BAGRATION_DATA = {

  /* --- ГОРОДА И ТОЧКИ КАРТЫ (в хронологическом порядке освобождения) --- */
  cities: [
    {
      id: 'svetlogorsk',
      name: 'Светлогорск · мемориал «Багратион»',
      shortName: 'Светлогорск',
      date: '23–24 июня 1944',
      dateShort: '23.06',
      type: 'memorial',                                   // особая метка — золотая звезда
      front: '1-й Белорусский фронт · 65-я армия П. И. Батова',
      coords: [52.7300, 29.6200],
      liberationText: 'Здесь, на паричском направлении, 23 июня 1944 года начался прорыв обороны группы армий «Центр». Войска 65-й армии генерала П. И. Батова прошли через болота, которые противник считал непроходимыми, — по деревянным гатям, уложенным вручную. Удар пришёлся туда, где немецкое командование не ожидало наступления: за двое суток оборона была взломана, 24 июня освобождён посёлок Шатилки (ныне Светлогорск). Отсюда началось окружение бобруйской группировки врага.',
      cityInfo: 'Светлогорск (до 1961 года — Шатилки) стоит на Березине в Гомельской области; современный промышленный центр. В Светлогорском районе, близ деревни Раковичи, расположен мемориальный комплекс «Операция «Багратион»», обновлённый в 2026 году. Комплекс отмечает место первого прорыва и стал одной из главных точек памяти региона.'
    },
    {
      id: 'vitebsk',
      name: 'Витебск',
      shortName: 'Витебск',
      date: '26 июня 1944',
      dateShort: '26.06',
      type: 'city',
      front: '1-й Прибалтийский и 3-й Белорусский фронты',
      coords: [55.1904, 30.2049],
      liberationText: 'В ходе Витебско-Оршанской операции советские войска замкнули кольцо окружения вокруг пяти немецких дивизий — так возник «витебский котёл». 26 июня 1944 года Витебск был освобождён, а окружённая группировка уничтожена в течение следующих суток. Группа сапёров под командованием Фёдора Блохина захватила и спасла от подрыва мост через Западную Двину — сегодня мост носит его имя.',
      cityInfo: 'Витебск — один из древнейших городов Беларуси, впервые упомянут под 974 годом. Крупный промышленный и культурный центр Подвинья, родина художника Марка Шагала. За годы оккупации город был разрушен почти полностью: из довоенных 180 тысяч жителей к освобождению осталось около 120 человек.'
    },
    {
      id: 'orsha',
      name: 'Орша',
      shortName: 'Орша',
      date: '27 июня 1944',
      dateShort: '27.06',
      type: 'city',
      front: '3-й Белорусский фронт · 11-я гвардейская и 31-я армии',
      coords: [54.5081, 30.4172],
      liberationText: 'Орша прикрывала кратчайшую дорогу на Минск и была превращена противником в мощный узел обороны с несколькими рубежами траншей. 27 июня 1944 года войска 3-го Белорусского фронта при поддержке 2-го гвардейского танкового корпуса очистили город. Гарнизон, пытавшийся отойти по шоссе Москва — Минск, был рассечён и разгромлен, что открыло путь подвижным соединениям к столице Беларуси.',
      cityInfo: 'Орша — древний город на Днепре, впервые упомянут в 1067 году, крупнейший железнодорожный узел страны. Под Оршей 14 июля 1941 года батарея капитана И. А. Флёрова произвела первый в истории залп реактивных установок «Катюша». Орша — родина писателя Владимира Короткевича.'
    },
    {
      id: 'mogilev',
      name: 'Могилёв',
      shortName: 'Могилёв',
      date: '28 июня 1944',
      dateShort: '28.06',
      type: 'city',
      front: '2-й Белорусский фронт · 49-я и 50-я армии',
      coords: [53.9006, 30.3313],
      liberationText: 'Могилёв был объявлен немецким командованием «крепостью», которую приказывалось удерживать любой ценой. 28 июня 1944 года войска 2-го Белорусского фронта с ходу форсировали Днепр и штурмом взяли город. В плен попал комендант Могилёва генерал-майор фон Эрдмансдорф вместе со штабом 12-й пехотной дивизии. За четыре дня операции фронт продвинулся вперёд почти на 90 километров.',
      cityInfo: 'Могилёв основан в 1267 году и стоит на Днепре; сегодня это крупный промышленный и вузовский центр. В июле 1941 года город держал оборону 23 дня, сковав крупные силы противника. На Буйничском поле под Могилёвом, описанном Константином Симоновым в романе «Живые и мёртвые», по завещанию писателя развеян его прах.'
    },
    {
      id: 'bobruisk',
      name: 'Бобруйск',
      shortName: 'Бобруйск',
      date: '29 июня 1944',
      dateShort: '29.06',
      type: 'city',
      front: '1-й Белорусский фронт · 65-я, 48-я, 3-я армии',
      coords: [53.1384, 29.2214],
      liberationText: 'Бобруйская операция стала классическим примером окружения: 27 июня юго-восточнее города в «котле» оказалось около 40 тысяч солдат и офицеров 9-й немецкой армии. По скоплению войск противника нанесла массированный удар 16-я воздушная армия, после чего кольцо было рассечено. 29 июня 1944 года Бобруйск был полностью освобождён. Ранее, 25 июня у станции Чёрные Броды, экипаж танка в составе Дмитрия Комарова и Михаила Бухтуева совершил единственный в истории войн таран бронепоезда танком.',
      cityInfo: 'Бобруйск известен с 1387 года и стоит на Березине — важнейшем водном рубеже центральной Беларуси. В XIX веке здесь построена Бобруйская крепость, один из сильнейших фортификационных комплексов Российской империи; в 1941 году немцы превратили её в лагерь смерти. Сегодня Бобруйск — крупный транспортный и промышленный узел Могилёвской области.'
    },
    {
      id: 'minsk',
      name: 'Минск',
      shortName: 'Минск',
      date: '3 июля 1944',
      dateShort: '03.07',
      type: 'city',
      front: '3-й и 1-й Белорусские фронты',
      coords: [53.9023, 27.5619],
      liberationText: '3 июля 1944 года в Минск с северо-востока ворвались танки 2-го гвардейского Тацинского корпуса; одним из первых в город вошёл танк лейтенанта Дмитрия Фроликова. К востоку от столицы замкнулся «минский котёл», в котором оказалось более 100 тысяч солдат и офицеров противника. Город был разрушен на 80 %, однако уже 16 июля 1944 года по его улицам прошёл легендарный партизанский парад — по проспекту шли 30 тысяч партизан.',
      cityInfo: 'Минск известен с 1067 года, сегодня — столица Республики Беларусь и крупнейший город страны. За стойкость и массовый героизм в годы Великой Отечественной войны Минску в 1974 году присвоено звание «Город-герой». Рядом со столицей находятся мемориалы Хатынь и Тростенец — памятники жертвам нацистского террора.'
    },
    {
      id: 'polotsk',
      name: 'Полоцк',
      shortName: 'Полоцк',
      date: '4 июля 1944',
      dateShort: '04.07',
      type: 'city',
      front: '1-й Прибалтийский фронт · 6-я гвардейская и 4-я ударная армии',
      coords: [55.4870, 28.7856],
      liberationText: 'Полоцкая операция 1-го Прибалтийского фронта продолжалась с 29 июня по 4 июля 1944 года. Противник опирался на укреплённый рубеж по Западной Двине и удерживал Полоцк как «ключ к Прибалтике». Обойдя город с двух сторон, советские войска 4 июля освободили Полоцк, лишив врага важнейшего узла обороны и обезопасив правый фланг наступления на Минск. Дальше открывалась дорога в Латвию и Литву.',
      cityInfo: 'Полоцк — древнейший город Беларуси, впервые упомянутый в «Повести временных лет» под 862 годом, центр Полоцкого княжества. Здесь стоит Софийский собор XI века, жили просветительница Евфросиния Полоцкая и первопечатник Франциск Скорина. Полоцк считается географическим центром Европы, о чём напоминает памятный знак в центре города.'
    },
    {
      id: 'baranovichi',
      name: 'Барановичи',
      shortName: 'Барановичи',
      date: '8 июля 1944',
      dateShort: '08.07',
      type: 'city',
      front: '1-й Белорусский фронт · конно-механизированная группа И. А. Плиева',
      coords: [53.1327, 26.0139],
      liberationText: 'Барановичи прикрывали направление на Брест и Варшаву, поэтому противник превратил город в сильный узел сопротивления и перебросил сюда резервы. 8 июля 1944 года соединения 1-го Белорусского фронта при поддержке конно-механизированной группы генерала И. А. Плиева и авиации 16-й воздушной армии освободили город. Большую помощь наступавшим оказали партизаны, заранее выводившие из строя железнодорожные пути и линии связи.',
      cityInfo: 'Барановичи выросли из станции, построенной в 1871 году на Московско-Брестской железной дороге, — это «город железнодорожников». Сегодня это крупный транспортный узел и промышленный центр Брестской области. В годы оккупации в районе города действовало Барановичское партизанское соединение.'
    },
    {
      id: 'grodno',
      name: 'Гродно',
      shortName: 'Гродно',
      date: '16 июля 1944',
      dateShort: '16.07',
      type: 'city',
      front: '3-й Белорусский фронт',
      coords: [53.6778, 23.8295],
      liberationText: '16 июля 1944 года войска 3-го Белорусского фронта освободили левобережную часть Гродно, а к 24 июля — весь город. Противник, опираясь на Неман и старые оборонительные форты, пытался остановить наступление и предпринимал контратаки. Освобождение Гродно вывело Красную Армию непосредственно к границе Восточной Пруссии — впервые война возвращалась на землю противника.',
      cityInfo: 'Гродно известен с 1128 года; долгое время он был королевской резиденцией, здесь проходили сеймы Речи Посполитой. В городе сохранились Старый и Новый замки, Коложская церковь XII века — памятник ЮНЕСКО. Гродно — крупный железнодорожный узел на Немане и один из самых красивых исторических городов Беларуси.'
    },
    {
      id: 'brest',
      name: 'Брест',
      shortName: 'Брест',
      date: '28 июля 1944',
      dateShort: '28.07',
      type: 'city',
      front: '1-й Белорусский фронт · 70-я, 61-я и 28-я армии',
      coords: [52.0976, 23.7341],
      liberationText: '28 июля 1944 года войска 1-го Белорусского фронта освободили Брест, завершив разгром группировки противника, окружённой юго-восточнее города. Так, спустя три года и один месяц после начала войны, Красная Армия вернулась к рубежу, где 22 июня 1941 года приняла свой первый бой Брестская крепость. Государственная граница СССР на этом участке была восстановлена, а освобождение Беларуси — завершено.',
      cityInfo: 'Брест впервые упомянут в 1019 году как Берестье — один из древнейших городов страны и «западные ворота» Беларуси. Брестская крепость, гарнизон которой месяц держал оборону летом 1941 года, в 1965 году получила почётное звание «Крепость-герой». Сегодня Брест — крупный пограничный, транспортный и туристический центр.'
    }
  ],

  /* ==================================================================
     ВСТАВЬТЕ ФОТО ЗДЕСЬ  ←←←  ФОТОГРАФИИ МЕМОРИАЛА
     ==================================================================
     Как поставить своё фото (3 действия):
       1) положите файл в папку img/ рядом с index.html — например img/memorial-1.jpg
          (имя файла только латиницей, без пробелов!);
       2) в строках ниже впишите путь внутрь кавычек поля src:
              было:  src:''
              стало: src:'img/memorial-1.jpg'
       3) сохраните Ctrl+S и обновите страницу в браузере Ctrl+F5.

     Если src оставить пустым ('') или файл не найдётся — автоматически
     покажется стилизованная заглушка с той же подписью, вёрстка не сломается.

     Поля: src — путь к фото, title — заголовок подписи, caption — пояснение,
           wide — true, если снимок занимает всю ширину (панорама),
           icon — символ на заглушке.
     Чтобы добавить 4-е фото — скопируйте любую строку и вставьте ниже.
     ================================================================== */
  memorialPhotos: [
    // ↓↓↓ ПУТИ УЖЕ ПРОПИСАНЫ. Достаточно положить в папку img/ файлы
    //     с именами memorial-1.jpg, memorial-2.jpg, memorial-3.jpg — и фото появятся.
    //     Пока файлов нет, показываются стилизованные заглушки. ↓↓↓
    { src:'img/memorial-1.jpg', wide:true,  icon:'★', title:'Главная стела комплекса', caption:'Символ прорыва обороны группы армий «Центр»' },
    { src:'img/memorial-2.jpg', wide:false, icon:'⚙', title:'Экспозиция техники',      caption:'Орудия и машины периода 1944 года' },
    { src:'img/memorial-3.jpg', wide:false, icon:'⌂', title:'Землянки',                caption:'Реконструкция полевого лагеря бойцов 65-й армии' }
  ],

  /* ==================================================================
     ОПУБЛИКОВАННЫЕ ДОПОЛНЕНИЯ — ВИДНЫ ВСЕМ ПОСЕТИТЕЛЯМ
     ==================================================================
     Сюда переносятся проверенные карточки, добавленные через форму
     «Дополните карту». Всё, что лежит в этом массиве, появляется
     на карте у каждого, кто откроет сайт.

     Как опубликовать: в блоке «Дополни карту» нажмите «Код для публикации»,
     скопируйте готовые строки и вставьте их сюда, между скобками [ ].
     Пример одной записи:

     { shortName:'Слуцк', date:'30 июня 1944', coords:[53.0272,27.5591],
       liberationText:'Текст об освобождении…',
       cityInfo:'Текст о городе…',
       author:'Иван Иванов, СШ №1' },
     ================================================================== */
  communityCities: [

  ],

  /* --- КАРТОЧКИ ИНФОГРАФИКИ «ЦИФРЫ ОПЕРАЦИИ» --- */
  numbers: [
    { value: 2.4, decimals: 1, unit: 'млн', title: 'Человек', desc: 'Столько солдат и офицеров с обеих сторон участвовали в сражении — одна из крупнейших битв Второй мировой войны.' },
    { value: 1600, decimals: 0, unit: '+',  title: 'Героев Советского Союза', desc: 'Более 1600 участников операции удостоены высшего звания, свыше 400 тысяч — награждены орденами и медалями.' },
    { value: 900,  decimals: 0, unit: '',   title: 'Партизанских гарнизонов', desc: 'Партизанские формирования передавали фронтам разведданные о немецкой обороне и вели «рельсовую войну».' },
    { value: 81,   decimals: 0, unit: 'дн', title: 'Длительность', desc: 'С 23 июня по 29 августа 1944 года: наступление развивалось на фронте протяжённостью более 1100 километров.' },
    { value: 4,    decimals: 0, unit: '',   title: 'Фронта', desc: '1-й Прибалтийский, 3-й, 2-й и 1-й Белорусские фронты действовали по единому плану Ставки.' }
  ]
};

/* ============================================================================
   БЛОК JS 2 — ИНИЦИАЛИЗАЦИЯ КАРТЫ LEAFLET
   ============================================================================ */
let map = null;                 // объект карты
let markers = {};               // словарь меток: id города -> L.Marker
let routeLine = null;           // линия маршрута
let currentIndex = -1;          // индекс выбранного города
let playTimer = null;           // таймер режима «Хроника»

const cities = BAGRATION_DATA.cities;

// Ждём полной загрузки страницы (Leaflet подключён с defer)
window.addEventListener('load', initSite);

function initSite(){
  // Сообщаем странице, что скрипт жив (иначе сработает страховка в index.html)
  window.__BAGRATION_OK__ = true;

  /* Каждый модуль запускается отдельно и в защищённом режиме:
     если один блок даст сбой, остальные части сайта продолжат работать. */
  const safe = (name, fn) => {
    try { fn(); }
    catch (err) { console.error('[Багратион] Ошибка в блоке «' + name + '»:', err); }
  };

  /* ПОРЯДОК ВАЖЕН: сначала создаём карточки, потом включаем наблюдатель.
     Иначе карточки «Цифры операции» появятся уже после запуска наблюдателя
     и останутся невидимыми. */
  safe('timeline', buildTimeline);  // хронология
  safe('numbers',  buildNumbers);   // карточки цифр
  safe('gallery',  buildGallery);   // фотогалерея мемориала
  safe('reveal',   initReveal);     // появление блоков при прокрутке
  safe('ui',       initUI);         // кнопки, скролл, «наверх»
  safe('chat',     initChat);       // чат-бот «Сапёр Громов»
  safe('addCity',  initAddCity);    // форма «Дополни карту» + модуль проверки

  if (typeof L === 'undefined'){    // если нет интернета — карта не загрузится
    safe('fallback', showMapFallback);
    return;
  }
  safe('map', initMap);
}

/* Создание карты и меток */
function initMap(){
  map = L.map('map', {
    center: [53.9, 27.5],          // географический центр Беларуси
    zoom: window.innerWidth < 768 ? 6 : 7,
    minZoom: 5,
    maxZoom: 14,
    zoomControl: true,
    scrollWheelZoom: false,        // чтобы страница не «залипала» при прокрутке
    tap: true,
    attributionControl: false      // отключает блок со ссылками в правом нижнем углу карты
  });

  // Прокрутка колесом включается только после клика по карте (удобно на десктопе)
  map.on('click', () => map.scrollWheelZoom.enable());
  map.on('mouseout', () => map.scrollWheelZoom.disable());

  /* ЕДИНСТВЕННАЯ ПОДЛОЖКА — классическая карта (та же, что была изначально).
     Переключателя слоёв нет. Блок атрибуции в правом нижнем углу отключён
     (см. attributionControl:false выше), поэтому никаких посторонних ссылок
     на карте не отображается — упоминание источника вынесено в футер сайта.

     ЕСЛИ НУЖНО УБРАТЬ ИНОСТРАННЫЕ НАДПИСИ С ПОДЛОЖКИ:
     закомментируйте строку MAP_TILES.classic и раскомментируйте MAP_TILES.clean —
     тогда карта останется классической, но без единой подписи на плитках,
     а названия городов будут только наши, на русском языке. */
  const MAP_TILES = {
    classic: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',                                  // классическая (активна)
    clean:   'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png' // та же, но без надписей
  };

  L.tileLayer(MAP_TILES.classic, {
    subdomains: 'abc',
    maxZoom: 19,
    attribution: ''          // пусто — ссылка в углу карты не выводится
  }).addTo(map);

  // Создаём метки городов
  cities.forEach((city, i) => {
    const isMem = city.type === 'memorial';
    const icon = L.divIcon({
      className: 'pin-wrap',
      html: `<div class="pin ${isMem ? 'pin--memorial' : ''}" data-id="${city.id}">
               <span class="pin__ring"></span><span class="pin__core"></span>
             </div>`,
      iconSize: isMem ? [46,46] : [34,34],
      iconAnchor: isMem ? [23,23] : [17,17]
    });

    const marker = L.marker(city.coords, { icon, title: city.shortName, riseOnHover:true }).addTo(map);

    /* Подписи городов — наши собственные, на русском языке.
       На широких экранах они закреплены постоянно (заменяют подписи подложки),
       на мобильных появляются по нажатию, чтобы не загромождать экран. */
    const isWide = window.innerWidth >= 900;
    marker.bindTooltip(
      `<b>${city.shortName}</b><span>${city.date}</span>`,
      isWide
        ? { permanent:true, direction:'right', offset:[isMem ? 18 : 13, 0],
            className:'map-tip map-tip--perm' + (isMem ? ' map-tip--gold' : ''), opacity:1 }
        : { direction:'top', offset:[0, isMem ? -22 : -16], className:'map-tip', opacity:1 }
    );
    marker.on('click', () => selectCity(i, true));
    markers[city.id] = marker;
  });

  // Метки, добавленные пользователем через форму «Дополни карту»
  renderUserMarkers();

  // Пересчёт размеров карты при повороте экрана / ресайзе
  window.addEventListener('resize', () => map.invalidateSize());
  setTimeout(() => map.invalidateSize(), 400);
}

/* Если Leaflet не загрузился (нет сети) — показываем текстовый список городов */
function showMapFallback(){
  const wrap = document.getElementById('map');
  wrap.innerHTML = '<div style="padding:28px;color:#cdd6c4;font-size:14px">' +
    '<b style="color:#c9a227;font-family:Oswald;letter-spacing:.1em">КАРТА НЕДОСТУПНА ОФФЛАЙН</b><br><br>' +
    'Для отображения интерактивной карты нужен доступ в интернет (библиотека Leaflet и картографическая подложка).<br><br>' +
    cities.map(c => `• <b>${c.shortName}</b> — ${c.date}`).join('<br>') + '</div>';
}

/* ============================================================================
   БЛОК JS 3 — КАРТОЧКА ГОРОДА (всплывающая панель)
   ============================================================================ */
const card = {
  root:   document.getElementById('cityCard'),
  name:   document.getElementById('ccName'),
  date:   document.getElementById('ccDate'),
  kicker: document.getElementById('ccKicker'),
  lib:    document.getElementById('ccLib'),
  info:   document.getElementById('ccInfo'),
  front:  document.getElementById('ccFront')
};

/* Выбор города: подсветка метки, перелёт карты, открытие карточки, синхронизация таймлайна */
function selectCity(index, fromMarker){
  const city = cities[index];
  if (!city) return;
  currentIndex = index;

  // Подсветка меток
  document.querySelectorAll('.pin').forEach(p => p.classList.remove('is-active'));
  const pinEl = markers[city.id] && markers[city.id].getElement();
  if (pinEl) pinEl.querySelector('.pin').classList.add('is-active');

  // Перелёт с учётом места, которое занимает карточка
  flyToCity(city);

  fillCard(city);
  syncTimeline(index);
}

/* Наполнение и открытие карточки (общее для исторических и пользовательских точек) */
function fillCard(city){
  const kick = city.type === 'memorial' ? 'Место первого прорыва'
             : city.type === 'user'     ? 'Дополнение пользователя'
             : 'Освобождён';
  card.name.textContent = city.name;
  card.date.textContent = city.date;
  card.kicker.innerHTML = '<span class="star star--sm ' + (city.type === 'memorial' ? 'star--gold' : '') + '"></span>' + kick;
  card.lib.textContent  = city.liberationText;
  card.info.textContent = city.cityInfo;
  card.front.innerHTML  = '<span>' + (city.type === 'user' ? 'Источник:' : 'Силы:') + '</span> ' + city.front;

  // Панель управления показывается только автору дополнения
  const own = document.getElementById('ccOwn');
  const nav = document.getElementById('ccNav');
  const mine = city.type === 'user' && isMine(city);
  if (own) own.hidden = !mine;
  if (nav) nav.style.display = (city.type === 'user') ? 'none' : 'flex';

  // Перезапуск анимации появления содержимого
  card.root.classList.remove('is-open');
  void card.root.offsetWidth;            // принудительный reflow — рестарт CSS-анимаций
  card.root.classList.add('is-open');
}

/* Открытие карточки пользовательской точки (таймлайн при этом не трогаем) */
let CURRENT_EXTRA = null;        // открытая в карточке пользовательская точка

function selectUserCity(id){
  const city = allExtraCities().find(c => c.id === id);
  if (!city) return;
  currentIndex = -1;
  CURRENT_EXTRA = city;
  document.querySelectorAll('.pin').forEach(p => p.classList.remove('is-active'));
  const el = markers[city.id] && markers[city.id].getElement();
  if (el) el.querySelector('.pin').classList.add('is-active');
  flyToCity(city);
  fillCard(city);
}

/* Перелёт к точке со смещением: на десктопе карточка справа, на мобильном — снизу */
function flyToCity(city){
  if (!map) return;
  const isMobile = window.innerWidth < 768;
  const zoom = isMobile ? 8 : 9;
  const dx = isMobile ? 0 : -150;        // сдвиг метки влево от центра
  const dy = isMobile ? -110 : 0;        // сдвиг метки вверх от центра
  const target = map.project(L.latLng(city.coords), zoom).subtract([dx, dy]);
  map.flyTo(map.unproject(target, zoom), zoom, { duration: 1.05 });
}

/* Закрытие карточки */
function closeCard(){
  card.root.classList.remove('is-open');
  document.querySelectorAll('.pin').forEach(p => p.classList.remove('is-active'));
}
/* Привязка обработчика с проверкой: если элемента нет, скрипт не упадёт */
function on(id, event, handler){
  const el = document.getElementById(id);
  if (el) el.addEventListener(event, handler);
  else console.warn('[Багратион] Не найден элемент #' + id);
}

on('ccClose', 'click', closeCard);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCard(); });

// Кнопки «предыдущий / следующий город» внутри карточки
on('ccPrev', 'click', () => step(-1));
on('ccNext', 'click', () => step(1));
function step(dir){
  let i = (currentIndex + dir + cities.length) % cities.length;
  selectCity(i);
}

/* ============================================================================
   БЛОК JS 4 — АНИМИРОВАННЫЙ МАРШРУТ НАСТУПЛЕНИЯ
   ============================================================================ */
const btnRoute = document.getElementById('btnRoute');
if (btnRoute) btnRoute.addEventListener('click', toggleRoute);

function toggleRoute(){
  if (!map) return;
  if (routeLine){ clearRoute(); return; }

  const latlngs = cities.map(c => c.coords);
  const bounds  = L.latLngBounds(latlngs).pad(0.12);

  closeCard();
  btnRoute.textContent = 'Скрыть маршрут';
  btnRoute.classList.add('btn--solid');

  // Сначала подгоняем масштаб, затем рисуем линию (иначе анимация собьётся при зуме)
  map.flyToBounds(bounds, { duration: 0.9 });
  map.once('moveend', drawRoute);
}

function drawRoute(){
  const latlngs = cities.map(c => c.coords);
  routeLine = L.polyline(latlngs, {
    color:'#a8171d', weight:4, opacity:.98, lineJoin:'round', className:'route-line'
  }).addTo(map);

  const path = routeLine.getElement();
  if (path && path.getTotalLength){
    const len = path.getTotalLength();
    path.style.strokeDasharray  = len;
    path.style.strokeDashoffset = len;
    void path.getBoundingClientRect();                 // reflow
    path.style.transition = 'stroke-dashoffset 5.5s linear';
    path.style.strokeDashoffset = 0;

    // Последовательная «вспышка» меток по мере движения линии
    cities.forEach((c, i) => {
      setTimeout(() => {
        const el = markers[c.id] && markers[c.id].getElement();
        if (!el) return;
        const pin = el.querySelector('.pin');
        pin.classList.add('hit');
        setTimeout(() => pin.classList.remove('hit'), 900);
      }, 250 + i * (5500 / cities.length));
    });

    // При смене масштаба Leaflet перерисовывает путь — просто фиксируем линию целиком
    map.once('zoomend', () => {
      if (!routeLine) return;
      const p = routeLine.getElement();
      if (p){ p.style.transition='none'; p.style.strokeDasharray='none'; p.style.strokeDashoffset='0'; }
    });
  }
}

function clearRoute(){
  if (routeLine){ map.removeLayer(routeLine); routeLine = null; }
  btnRoute.textContent = 'Показать маршрут';
  btnRoute.classList.remove('btn--solid');
}

/* ============================================================================
   БЛОК JS 5 — ТАЙМЛАЙН (синхронизация с картой)
   ============================================================================ */
const tlStops    = document.getElementById('tlStops');
const tlProgress = document.getElementById('tlProgress');
const tlRange    = document.getElementById('tlRange');
const tlNow      = document.getElementById('tlNow');

function buildTimeline(){
  tlStops.innerHTML = '';
  cities.forEach((c, i) => {
    const b = document.createElement('button');
    b.className = 'tl-stop';
    b.type = 'button';
    b.dataset.index = i;
    b.setAttribute('aria-label', `${c.shortName}, ${c.date}`);
    b.innerHTML = `<span class="tl-stop__dot"></span>
                   <span class="tl-stop__date">${c.dateShort}</span>
                   <span class="tl-stop__city">${c.shortName}</span>`;
    b.addEventListener('click', () => { stopPlay(); selectCity(i); });
    tlStops.appendChild(b);
  });
  tlRange.max = cities.length - 1;
  tlRange.addEventListener('input', () => { stopPlay(); selectCity(+tlRange.value); });

  document.getElementById('tlPrev').addEventListener('click', () => { stopPlay(); step(-1); });
  document.getElementById('tlNext').addEventListener('click', () => { stopPlay(); step(1);  });
  document.getElementById('tlPlay').addEventListener('click', togglePlay);

  // Управление стрелками клавиатуры (кроме случая, когда фокус в ползунке/поле ввода)
  document.addEventListener('keydown', e => {
    if (e.target && e.target.matches('input, textarea, select')) return;
    if (currentIndex < 0) return;
    if (e.key === 'ArrowRight'){ stopPlay(); step(1); }
    if (e.key === 'ArrowLeft'){  stopPlay(); step(-1); }
  });
}

/* Подсветка активной даты + прогресс-линия + автоскролл ленты */
function syncTimeline(index){
  const stops = [...tlStops.children];
  stops.forEach((s, i) => s.classList.toggle('is-active', i === index));
  const pct = cities.length > 1 ? (index / (cities.length - 1)) * 100 : 0;
  tlProgress.style.width = pct + '%';
  tlRange.value = index;

  const c = cities[index];
  tlNow.innerHTML = `<b>${c.date}</b> · ${c.shortName}`;

  const active = stops[index];
  if (active) active.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
}

/* Режим «Хроника» — автоматический проход по всем точкам */
function togglePlay(){
  const btn = document.getElementById('tlPlay');
  if (playTimer){ stopPlay(); return; }
  btn.textContent = '❚❚ Пауза';
  btn.classList.add('btn--solid');
  if (currentIndex < 0) selectCity(0); else step(1);
  playTimer = setInterval(() => {
    if (currentIndex >= cities.length - 1){ stopPlay(); return; }
    step(1);
  }, 5200);
}
function stopPlay(){
  const btn = document.getElementById('tlPlay');
  clearInterval(playTimer); playTimer = null;
  btn.textContent = '▶ Хроника';
  btn.classList.remove('btn--solid');
}

/* ============================================================================
   БЛОК JS 6 — ИНФОГРАФИКА «ЦИФРЫ ОПЕРАЦИИ» + СЧЁТЧИКИ
   ============================================================================ */
function buildNumbers(){
  const grid = document.getElementById('numGrid');
  if (!grid){ console.warn('[Багратион] Не найден контейнер #numGrid'); return; }
  grid.innerHTML = '';
  BAGRATION_DATA.numbers.forEach((n, i) => {
    const el = document.createElement('article');
    el.className = 'num-card reveal';
    el.style.transitionDelay = (i * 0.09) + 's';
    el.innerHTML = `
      <span class="star star--sm star--gold num-card__star"></span>
      <div class="num-value" data-target="${n.value}" data-dec="${n.decimals}">0${n.unit ? '<small>'+n.unit+'</small>' : ''}</div>
      <h3 class="num-title">${n.title}</h3>
      <p class="num-desc">${n.desc}</p>`;
    grid.appendChild(el);
  });

  // Карточки созданы только что — ставим их под наблюдение,
  // если наблюдатель уже работает (например, при повторном вызове)
  observeReveal();
}

/* Плавный счётчик от 0 до целевого значения */
function runCounter(el){
  const target = parseFloat(el.dataset.target);
  const dec    = parseInt(el.dataset.dec, 10);
  const unitEl = el.querySelector('small');
  const unit   = unitEl ? unitEl.outerHTML : '';
  const dur    = 1600;
  const t0     = performance.now();

  function frame(now){
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);                  // easeOutCubic
    let val = (target * eased).toFixed(dec);
    if (dec > 0) val = val.replace('.', ',');              // русский формат: 2,4
    el.innerHTML = val + unit;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ============================================================================
   БЛОК JS 6.5 — ФОТОГАЛЕРЕЯ МЕМОРИАЛА
   Строится из BAGRATION_DATA.memorialPhotos. Если фото не указано или файл
   не найден — показывается стилизованная заглушка (сайт не «ломается»).
   ============================================================================ */
function buildGallery(){
  const grid  = document.getElementById('memGallery');
  const note  = document.getElementById('memNote');
  const photos = BAGRATION_DATA.memorialPhotos || [];
  let realCount = 0;
  grid.innerHTML = '';

  photos.forEach((p) => {
    const fig = document.createElement('figure');
    fig.className = 'ph' + (p.wide ? ' ph--wide' : '');

    if (p.src){                       // указан путь к фотографии
      realCount++;
      const img = document.createElement('img');
      img.className = 'ph__img';
      img.src = p.src;
      img.alt = p.title + ' — мемориальный комплекс «Операция «Багратион»»';
      img.loading = 'lazy';

      // Файла нет или опечатка в пути — показываем стилизованную заглушку
      img.addEventListener('error', () => {
        img.remove();
        fig.insertAdjacentHTML('afterbegin', `<div class="ph__icon">${p.icon || '★'}</div>`);
        fig.classList.remove('ph--photo');
        fig.classList.add('ph--failed');
        updateGalleryNote();
      });
      img.addEventListener('load', () => { fig.dataset.own = '1'; updateGalleryNote(); });

      fig.appendChild(img);
      fig.classList.add('ph--photo');
      fig.addEventListener('click', () => openLightbox(p, img));   // просмотр по клику
    } else {                          // путь не указан — сразу заглушка
      fig.insertAdjacentHTML('afterbegin', `<div class="ph__icon">${p.icon || '★'}</div>`);
    }

    fig.insertAdjacentHTML('beforeend',
      `<figcaption class="ph__cap"><b>${p.title}</b>${p.caption}</figcaption>`);
    grid.appendChild(fig);
  });

  updateGalleryNote();
}

/* Подпись под галереей меняется сама в зависимости от того, что реально показано */
function updateGalleryNote(){
  const note = document.getElementById('memNote');
  const grid = document.getElementById('memGallery');
  if (!note || !grid) return;

  const total = grid.querySelectorAll('.ph').length;
  const ownPh = grid.querySelectorAll('.ph[data-own="1"]').length;   // загруженные фото

  note.innerHTML = (ownPh === total && total > 0)
    ? 'Фотографии мемориального комплекса. Нажмите на снимок, чтобы увеличить.'
    : 'Фото-заглушки. Чтобы поставить свои снимки: положите файлы <b>memorial-1.jpg</b>, ' +
      '<b>memorial-2.jpg</b>, <b>memorial-3.jpg</b> в папку <b>img/</b> рядом с index.html.';
}

/* Просмотр фотографии во весь экран */
function openLightbox(photo, imgEl){
  const lb  = document.getElementById('lightbox');
  document.getElementById('lbImg').src = (imgEl && imgEl.src) ? imgEl.src : photo.src;
  document.getElementById('lbCap').innerHTML = `<b>${photo.title}</b>${photo.caption}`;
  lb.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('is-open');
  document.body.style.overflow = '';
}

/* ============================================================================
   БЛОК JS 7 — INTERSECTION OBSERVER: появление блоков при скролле
   ============================================================================ */
let revealIO = null;        // общий наблюдатель — доступен и для блоков,
                            // созданных скриптом уже после запуска страницы

function initReveal(){
  // Если браузер не поддерживает наблюдатель — просто показываем всё сразу
  if (!('IntersectionObserver' in window)){
    showAllReveal();
    return;
  }
  revealIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      const num = entry.target.querySelector('.num-value');
      if (num && !num.dataset.done){ num.dataset.done = '1'; runCounter(num); }
      revealIO.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  observeReveal();

  /* Подстраховка: если через 3 секунды какой-то блок всё ещё невидим,
     хотя уже находится в пределах экрана — показываем его принудительно.
     Так секция «Цифры операции» не может «пропасть» ни при каких условиях. */
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0){
        el.classList.add('is-visible');
        const num = el.querySelector('.num-value');
        if (num && !num.dataset.done){ num.dataset.done = '1'; runCounter(num); }
      }
    });
  }, 3000);
}

/* Поставить под наблюдение все блоки .reveal, которые ещё не отслеживаются.
   Вызывается после динамического создания карточек. */
function observeReveal(){
  if (!revealIO){ showAllReveal(); return; }
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.dataset.obs) return;
    el.dataset.obs = '1';
    revealIO.observe(el);
  });
}

/* Аварийный показ всего содержимого без анимаций */
function showAllReveal(){
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('is-visible');
    const num = el.querySelector('.num-value');
    if (num && !num.dataset.done){ num.dataset.done = '1'; runCounter(num); }
  });
}

/* ============================================================================
   БЛОК JS 8.2 — «ДОПОЛНИ КАРТУ»: проверка и добавление своего города
   Модуль работает офлайн: сверяет данные со справочной базой освобождённых
   городов, ищет ошибки, исправляет типографику и оформляет карточку
   в том же виде, что и у исторических меток. В таймлайн точки НЕ попадают.
   ============================================================================ */

/* Справочная база для сверки: название, дата освобождения, координаты */
const REFERENCE_CITIES = [
  {n:'гомель',       d:'1943-11-26', c:[52.4345,30.9754]},
  {n:'речица',       d:'1943-11-17', c:[52.3620,30.3940]},
  {n:'мозырь',       d:'1944-01-14', c:[52.0495,29.2456]},
  {n:'калинковичи',  d:'1944-01-14', c:[52.1324,29.3295]},
  {n:'рогачев',      d:'1944-02-24', c:[53.0917,30.0494]},
  {n:'витебск',      d:'1944-06-26', c:[55.1904,30.2049]},
  {n:'жлобин',       d:'1944-06-26', c:[52.8926,30.0244]},
  {n:'орша',         d:'1944-06-27', c:[54.5081,30.4172]},
  {n:'шклов',        d:'1944-06-27', c:[54.2111,30.2894]},
  {n:'могилев',      d:'1944-06-28', c:[53.9006,30.3313]},
  {n:'осиповичи',    d:'1944-06-28', c:[53.2998,28.6400]},
  {n:'быхов',        d:'1944-06-28', c:[53.5190,30.2450]},
  {n:'бобруйск',     d:'1944-06-29', c:[53.1384,29.2214]},
  {n:'слуцк',        d:'1944-06-30', c:[53.0272,27.5591]},
  {n:'борисов',      d:'1944-07-01', c:[54.2275,28.5053]},
  {n:'несвиж',       d:'1944-07-02', c:[53.2225,26.6744]},
  {n:'вилейка',      d:'1944-07-02', c:[54.4906,26.9189]},
  {n:'минск',        d:'1944-07-03', c:[53.9023,27.5619]},
  {n:'полоцк',       d:'1944-07-04', c:[55.4870,28.7856]},
  {n:'молодечно',    d:'1944-07-05', c:[54.3167,26.8500]},
  {n:'лида',         d:'1944-07-08', c:[53.8833,25.3000]},
  {n:'новогрудок',   d:'1944-07-08', c:[53.5994,25.8233]},
  {n:'барановичи',   d:'1944-07-08', c:[53.1327,26.0139]},
  {n:'слоним',       d:'1944-07-10', c:[53.0869,25.3194]},
  {n:'пинск',        d:'1944-07-14', c:[52.1153,26.1031]},
  {n:'волковыск',    d:'1944-07-14', c:[53.1561,24.4494]},
  {n:'гродно',       d:'1944-07-16', c:[53.6778,23.8295]},
  {n:'пружаны',      d:'1944-07-17', c:[52.5581,24.4631]},
  {n:'кобрин',       d:'1944-07-20', c:[52.2156,24.3656]},
  {n:'брест',        d:'1944-07-28', c:[52.0976,23.7341]}
];

const MONTHS_RU = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTH_STEMS = [['сентябр',8],['феврал',1],['август',7],['октябр',9],['декабр',11],['январ',0],['апрел',3],['ноябр',10],['март',2],['июн',5],['июл',6],['ма',4]];
const BELARUS_BOX = { latMin:51.2, latMax:56.2, lonMin:23.1, lonMax:32.8 };

let USER_CITIES = [];                       // точки, добавленные пользователем
const STORE_KEY = 'bagration_user_cities';

/* --- Вспомогательные функции --- */
const nrm = s => (s||'').toLowerCase().replace(/ё/g,'е').replace(/[«»"'`]/g,'').trim();

/* Расстояние между точками в километрах (формула гаверсинуса) */
function distKm(a, b){
  const R = 6371, rad = x => x * Math.PI / 180;
  const dLat = rad(b[0]-a[0]), dLon = rad(b[1]-a[1]);
  const h = Math.sin(dLat/2)**2 + Math.cos(rad(a[0]))*Math.cos(rad(b[0]))*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/* Разбор даты в любом формате → {iso, text} */
function parseDate(raw){
  const s = nrm(raw);
  let d, m, y;
  const num = s.match(/(\d{1,2})\s*[.\/\-]\s*(\d{1,2})\s*[.\/\-]\s*(\d{2,4})/);
  if (num){
    d = +num[1]; m = +num[2] - 1; y = +num[3];
    if (y < 100) y += 1900;
  } else {
    const dm = s.match(/(\d{1,2})/);
    const ym = s.match(/(19\d{2})/);
    const stem = MONTH_STEMS.find(([st]) => s.includes(st));
    if (!dm || !stem) return null;
    d = +dm[1]; m = stem[1]; y = ym ? +ym[1] : 1944;
  }
  if (!(d >= 1 && d <= 31) || !(m >= 0 && m <= 11) || !(y >= 1941 && y <= 1945)) return null;
  const iso = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  return { iso, text:`${d} ${MONTHS_RU[m]} ${y}`, time:new Date(iso).getTime() };
}

/* Исправление типографики. Возвращает текст и список применённых правок */
function fixText(raw){
  const fixes = [];
  let t = (raw || '').replace(/\s+/g,' ').trim();
  const before = t;

  if (/\s+[,.;:!?]/.test(t)){ t = t.replace(/\s+([,.;:!?])/g,'$1'); fixes.push('убраны пробелы перед знаками препинания'); }
  if (/[,.;:!?][А-Яа-яA-Za-z]/.test(t)){ t = t.replace(/([,.;:!?])([А-Яа-яA-Za-z])/g,'$1 $2'); fixes.push('расставлены пробелы после знаков препинания'); }
  if (t.includes('"')){ t = t.replace(/"([^"]*)"/g,'«$1»').replace(/"/g,'«'); fixes.push('кавычки заменены на «ёлочки»'); }
  if (/ - /.test(t)){ t = t.replace(/ - /g,' — '); fixes.push('дефис заменён на тире'); }
  if (t && t[0] !== t[0].toUpperCase()){ t = t[0].toUpperCase() + t.slice(1); fixes.push('первая буква сделана заглавной'); }
  if (t && !/[.!?…]$/.test(t)){ t += '.'; fixes.push('добавлена точка в конце'); }
  if (before !== t && !fixes.length) fixes.push('удалены лишние пробелы');
  return { text:t, fixes };
}

const countSentences = t => t.split(/[.!?…]+/).filter(s => s.trim().length > 4).length;

/* ---------- ГЛАВНАЯ ФУНКЦИЯ ПРОВЕРКИ ---------- */
function validateCard(input){
  const errors = [], warns = [], fixes = [], oks = [];

  /* 1. Название */
  let name = (input.name || '').replace(/\s+/g,' ').trim();
  if (!name){ errors.push('Не указано название населённого пункта.'); }
  else if (name.length < 3){ errors.push('Название слишком короткое — проверьте ввод.'); }
  if (name && name === name.toUpperCase() && name.length > 3){
    name = name[0] + name.slice(1).toLowerCase();
    fixes.push('название приведено к обычному регистру (было набрано заглавными)');
  }
  if (name && /[a-z]/i.test(name) && !/[а-я]/i.test(name)) warns.push('Название записано латиницей — для единообразия лучше использовать русское написание.');
  const key = nrm(name);

  /* 2. Проверка на дубликат (карточку, которую правим, исключаем) */
  if (BAGRATION_DATA.cities.some(c => nrm(c.shortName) === key))
    errors.push(`«${name}» уже есть на карте как исторический город операции.`);
  if (allExtraCities().some(c => nrm(c.shortName) === key && c.id !== EDITING_ID))
    errors.push(`Карточка «${name}» уже есть на карте. Измените название или отредактируйте существующую.`);

  /* 3. Дата */
  const dt = parseDate(input.date);
  if (!input.date || !input.date.trim()) errors.push('Не указана дата освобождения.');
  else if (!dt) errors.push('Дату не удалось распознать. Примеры верного ввода: «30 июня 1944» или «30.06.1944».');
  else {
    if (input.date.trim() !== dt.text) fixes.push(`дата приведена к единому виду: «${dt.text}»`);
    const start = new Date('1944-06-23').getTime(), end = new Date('1944-08-29').getTime();
    if (dt.time < start || dt.time > end)
      warns.push('Дата выходит за рамки операции «Багратион» (23 июня — 29 августа 1944). Метка будет добавлена как историческая справка.');
    else oks.push('Дата попадает в период операции «Багратион».');
  }

  /* 4. Координаты */
  const lat = parseFloat(String(input.lat).replace(',','.'));
  const lon = parseFloat(String(input.lon).replace(',','.'));
  let coords = null;
  if (isNaN(lat) || isNaN(lon)) errors.push('Координаты не заполнены или введены неверно. Используйте точку: 53.0272');
  else if (lat < BELARUS_BOX.latMin || lat > BELARUS_BOX.latMax || lon < BELARUS_BOX.lonMin || lon > BELARUS_BOX.lonMax)
    errors.push('Координаты находятся за пределами Беларуси. Проверьте: широта 51–56, долгота 23–33.');
  else {
    coords = [Math.round(lat*10000)/10000, Math.round(lon*10000)/10000];
    if (coords[0] !== lat || coords[1] !== lon) fixes.push('координаты округлены до 4 знаков');
    oks.push('Координаты находятся в границах Беларуси.');
    const near = BAGRATION_DATA.cities.find(c => distKm(coords, c.coords) < 6);
    if (near) warns.push(`Точка почти совпадает с меткой «${near.shortName}» (менее 6 км).`);
  }

  /* 5. Сверка со справочной базой */
  const ref = REFERENCE_CITIES.find(r => r.n === key);
  if (ref){
    oks.push(`Населённый пункт найден в справочной базе проекта.`);
    if (dt && dt.iso !== ref.d){
      const rd = parseDate(ref.d.split('-').reverse().join('.'));
      warns.push(`Историческая неточность: по справочным данным «${name}» освобождён <b>${rd ? rd.text : ref.d}</b>, а вы указали ${dt.text}. Проверьте источник.`);
    } else if (dt) oks.push('Дата совпадает со справочными данными.');
    if (coords && distKm(coords, ref.c) > 60)
      errors.push(`Координаты не соответствуют городу «${name}»: отклонение более 60 км от справочной точки.`);
    else if (coords && distKm(coords, ref.c) > 15)
      warns.push('Координаты заметно смещены относительно справочной точки — уточните место.');
  } else if (name) {
    warns.push('Населённого пункта нет в справочной базе — данные приняты с ваших слов, перепроверьте источник.');
  }

  /* 6. Текст «Освобождение» */
  const libF = fixText(input.lib);
  const lib = libF.text;
  libF.fixes.forEach(f => fixes.push('блок «Освобождение»: ' + f));
  if (!lib) errors.push('Не заполнен блок «Освобождение».');
  else if (lib.length < 80) errors.push('Описание освобождения слишком короткое: нужно минимум 80 символов (2–4 предложения).');
  else {
    if (lib.length < 150) warns.push('Блок «Освобождение» коротковат — добавьте деталей: какие войска, какие бои.');
    if (lib.length > 700) warns.push('Блок «Освобождение» очень длинный — в карточке лучше 2–4 предложения.');
    const sc = countSentences(lib);
    if (sc < 2) warns.push('В блоке «Освобождение» меньше двух предложений.');
    if (!/\d/.test(lib)) warns.push('В описании освобождения нет ни одной даты или числа — факты выглядят неполными.');
    if (sc >= 2 && lib.length >= 150) oks.push('Объём блока «Освобождение» соответствует формату карточки.');
  }

  /* 7. Текст «О городе» */
  const infoF = fixText(input.info);
  const info = infoF.text;
  infoF.fixes.forEach(f => fixes.push('блок «О городе»: ' + f));
  if (!info) errors.push('Не заполнен блок «О городе».');
  else if (info.length < 60) errors.push('Справка о городе слишком короткая: нужно минимум 60 символов.');
  else {
    if (info.length < 120) warns.push('Справка о городе коротковата — укажите год основания и чем известен город.');
    if (countSentences(info) < 2) warns.push('В блоке «О городе» меньше двух предложений.');
    if (info.length >= 120) oks.push('Объём блока «О городе» достаточен.');
  }

  /* 8. Стиль изложения */
  const all = (lib + ' ' + info).toLowerCase();
  if (/\b(я думаю|по-моему|мне кажется|наверное|вроде бы|кажется,)/.test(all))
    warns.push('Встречаются оценочные обороты («мне кажется», «наверное»). Для справки нужен нейтральный стиль.');
  if (/(!!!|\?\?\?)/.test(all)) warns.push('Избыточная пунктуация — для исторической справки она не нужна.');
  if (/(круто|classно|класно|жесть|прикольно)/.test(all)) warns.push('Разговорная лексика не подходит для исторической карточки.');

  const score = Math.max(0, Math.min(100, 100 - errors.length*25 - warns.length*8));
  return { errors, warns, fixes, oks, score,
           data:{ name, date:dt ? dt.text : input.date, coords, lib, info, author:(input.author||'').trim() } };
}

/* ---------- ВЫВОД ОТЧЁТА ---------- */
function renderReport(res){
  document.getElementById('acIdle').hidden = true;
  const box = document.getElementById('acResult');
  box.hidden = false;
  const list = document.getElementById('acList');
  list.innerHTML = '';

  const add = (type, icon, text) => {
    const li = document.createElement('li');
    li.className = 'ac-li ac-li--' + type;
    li.innerHTML = `<span>${icon}</span><span>${text}</span>`;
    li.style.animationDelay = (list.children.length * 0.05) + 's';
    list.appendChild(li);
  };

  res.errors.forEach(t => add('err','✕',  t));
  res.warns .forEach(t => add('warn','!', t));
  res.fixes .forEach(t => add('fix','✎',  'Исправлено автоматически: ' + t));
  res.oks   .forEach(t => add('ok','✓',   t));

  const fill = document.getElementById('acScoreFill');
  fill.style.width = res.score + '%';
  fill.style.background = res.score >= 80 ? 'linear-gradient(90deg,#4a7a2a,#9ccd5e)'
                        : res.score >= 50 ? 'linear-gradient(90deg,#8a6a1f,#d8922a)'
                        : 'linear-gradient(90deg,#7a1b20,#c1272d)';
  document.getElementById('acScoreTxt').textContent = res.score + '%';
}

/* ---------- СОХРАНЕНИЕ И МЕТКИ ---------- */
function loadUserCities(){
  try { USER_CITIES = JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
  catch(e){ USER_CITIES = []; }
}
function saveUserCities(){
  try { localStorage.setItem(STORE_KEY, JSON.stringify(USER_CITIES)); } catch(e){}
}

/* ============================================================================
   ОБЩАЯ БАЗА ДОПОЛНЕНИЙ (облако) — чтобы города добавляли ВСЕ посетители
   ----------------------------------------------------------------------------
   Работает через Firebase Realtime Database по обычным HTTP-запросам:
   никакой установки, сборки и серверного кода не требуется.

   ЧТОБЫ ВКЛЮЧИТЬ — вставьте адрес своей базы в CLOUD.url (одна строка).
   Пошаговая инструкция: кнопка «Настроить» в блоке «Дополните карту».
   Пока адрес пустой — сайт работает в локальном режиме, как прежде.
   ============================================================================ */
const CLOUD = {
  // Адрес общей базы проекта (Firebase Realtime Database).
  // Если понадобится своя база — замените ссылку внутри кавычек.
  url:'https://bagration-92981-default-rtdb.europe-west1.firebasedatabase.app',
  path:'cities',                // имя раздела в базе
  autoRefresh:60000             // как часто обновлять список, мс (0 — не обновлять)
};
CLOUD.enabled = /^https:\/\/.+/.test(CLOUD.url.trim());

let CLOUD_CITIES = [];          // карточки, полученные из общей базы
let cloudState = 'off';         // off | loading | on | err
let EDITING_ID = null;          // id карточки, которая сейчас редактируется

/* Анонимный идентификатор автора: хранится в браузере и позволяет
   пользователю редактировать только свои карточки. Личных данных не содержит. */
const OWNER_ID = (function(){
  let v = null;
  try { v = localStorage.getItem('bagration_owner'); } catch(e){}
  if (!v){
    v = 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    try { localStorage.setItem('bagration_owner', v); } catch(e){}
  }
  return v;
})();
/* Своей считается карточка:
   — добавленная с этого устройства (совпал owner);
   — сохранённая локально;
   — старая запись без автора (создана до появления подписи) — её можно исправить. */
const isMine = c => !!c && !c.published && (c.owner === OWNER_ID || !c.cloud || !c.owner);

/* Полный адрес запроса к базе */
function cloudEndpoint(){
  return CLOUD.url.trim().replace(/\/+$/,'') + '/' + CLOUD.path + '.json';
}

/* Режим разработчика: показывает служебные кнопки и технические подробности.
   Включается сочетанием Ctrl+Alt+D или адресом страницы с #dev. */
let DEV_MODE = false;
function applyDevMode(on, save){
  DEV_MODE = on;
  document.body.classList.toggle('dev-mode', on);
  let flag = document.getElementById('devFlag');
  if (on && !flag){
    flag = document.createElement('div');
    flag.id = 'devFlag'; flag.className = 'dev-flag';
    flag.textContent = 'Режим редактора · Ctrl+Alt+D';
    document.body.appendChild(flag);
  }
  if (!on && flag) flag.remove();
  if (save){ try { localStorage.setItem('bagration_dev', on ? '1' : '0'); } catch(e){} }
}
function initDevMode(){
  let saved = false;
  try { saved = localStorage.getItem('bagration_dev') === '1'; } catch(e){}
  applyDevMode(saved || location.hash === '#dev', false);
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.altKey && (e.key === 'd' || e.key === 'D' || e.code === 'KeyD')){
      e.preventDefault();
      applyDevMode(!DEV_MODE, true);
      toast(DEV_MODE ? 'Режим редактора включён' : 'Режим редактора выключен');
    }
  });
}

/* Отрисовка строки состояния.
   Обычный посетитель видит короткий понятный статус,
   технические подробности показываются только в режиме редактора. */
function setCloudState(state, text, devText){
  cloudState = state;
  const box = document.getElementById('acCloud');
  const txt = document.getElementById('acCloudTxt');
  const btn = document.getElementById('acCloudBtn');
  if (!box) return;
  box.className = 'ac-cloud ac-cloud--' + (state === 'on' ? 'on' : state === 'err' ? 'err' : 'off');
  txt.innerHTML = (DEV_MODE && devText) ? devText : text;
  if (btn) btn.textContent = (state === 'on') ? 'Обновить' : 'Настроить';
}

/* Загрузка всех карточек из общей базы */
function cloudLoad(silent){
  if (!CLOUD.enabled) return Promise.resolve();
  if (!silent) setCloudState('loading','Подключаюсь к общей базе…');

  // Параметры кодируем вручную: кавычки в orderBy обязательны по правилам Firebase
  const q = '?orderBy=' + encodeURIComponent('"$key"') + '&limitToLast=300';

  return fetch(cloudEndpoint() + q, { cache:'no-store' })
    .then(r => {
      if (r.status === 401 || r.status === 403) throw new Error('rules');
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(obj => {
      // Снимаем прежние облачные метки, чтобы не задваивались
      CLOUD_CITIES.forEach(c => { if (markers[c.id] && map){ map.removeLayer(markers[c.id]); delete markers[c.id]; } });

      CLOUD_CITIES = Object.entries(obj || {}).map(([key, v]) => ({
        id:'cloud_' + key,
        key,                               // ключ записи в базе — нужен для правки
        owner:v.owner || null,
        authorName:v.author || '',
        name:v.name + ' · дополнение',
        shortName:v.name,
        date:v.date,
        type:'user', cloud:true,
        coords:[v.lat, v.lon],
        liberationText:v.lib,
        cityInfo:v.info,
        front:'карточку добавил ' + (v.author || 'посетитель сайта') +
              ' · из общей базы' + (v.ts ? ', ' + new Date(v.ts).toLocaleDateString('ru-RU') : '') +
              (v.edited ? ' · изменено ' + new Date(v.edited).toLocaleDateString('ru-RU') : '')
      })).filter(c => c.shortName && !isNaN(c.coords[0]) && !isNaN(c.coords[1]));

      renderUserMarkers();
      renderTags();
      const n = CLOUD_CITIES.length;
      setCloudState('on',
        `Ваше дополнение увидят все посетители сайта. Сейчас на карте ${n === 0 ? 'нет дополнений' : 'дополнений: <b>' + n + '</b>'}.`,
        `Общая база подключена · записей: <b>${n}</b> · автообновление каждые ${Math.round(CLOUD.autoRefresh/1000)} с.`);
    })
    .catch(err => {
      setCloudState('err',
        'Сейчас нет связи с сервером. Карточку можно заполнить — она сохранится на вашем устройстве.',
        (err && err.message === 'rules')
          ? 'База закрыта правилами доступа. Firebase → Realtime Database → «Правила»:<br>' +
            '<code style="color:#9fc8ea">{ "rules": { ".read": true, ".write": true } }</code> → «Опубликовать».'
          : 'Нет связи с базой (' + (err && err.message) + '). Проверьте интернет и CLOUD.url.');
    });
}

/* Отправка новой карточки в общую базу */
function cloudSend(d){
  const body = {
    name:d.name, date:d.date, lat:d.coords[0], lon:d.coords[1],
    lib:d.lib, info:d.info, author:d.author || 'посетитель сайта',
    owner:OWNER_ID, ts:Date.now()
  };
  return cloudFetch(cloudEndpoint(), 'POST', body);
}

/* Изменение существующей карточки (только своей) */
function cloudUpdate(key, d){
  const body = {
    name:d.name, date:d.date, lat:d.coords[0], lon:d.coords[1],
    lib:d.lib, info:d.info, author:d.author || 'посетитель сайта', edited:Date.now()
  };
  return cloudFetch(cloudItemUrl(key), 'PATCH', body);
}

/* Быстрое изменение только координат — после перетаскивания метки */
function cloudMove(key, coords){
  return cloudFetch(cloudItemUrl(key), 'PATCH', { lat:coords[0], lon:coords[1], edited:Date.now() });
}

/* Удаление своей карточки из общей базы */
function cloudDelete(key){
  return cloudFetch(cloudItemUrl(key), 'DELETE', null);
}

function cloudItemUrl(key){
  return CLOUD.url.trim().replace(/\/+$/,'') + '/' + CLOUD.path + '/' + key + '.json';
}
function cloudFetch(url, method, body){
  const opt = { method, headers:{ 'Content-Type':'application/json' } };
  if (body) opt.body = JSON.stringify(body);
  return fetch(url, opt).then(r => {
    if (r.status === 401 || r.status === 403) throw new Error('rules');
    if (!r.ok) throw new Error(r.status);
    return r.status === 204 ? null : r.json();
  });
}

/* Опубликованные карточки из BAGRATION_DATA.communityCities — видны всем.
   Приводим их к внутреннему формату меток. */
function getCommunityCities(){
  return (BAGRATION_DATA.communityCities || []).map((c, i) => ({
    id:'pub_' + i,
    name:c.shortName + ' · дополнение',
    shortName:c.shortName,
    date:c.date,
    type:'user',
    published:true,
    coords:c.coords,
    liberationText:c.liberationText,
    cityInfo:c.cityInfo,
    front:'карточку добавил ' + (c.author || 'участник проекта') + ' · опубликовано'
  }));
}
/* Все дополнительные точки: опубликованные в коде + из общей базы + локальные */
function allExtraCities(){ return getCommunityCities().concat(CLOUD_CITIES, USER_CITIES); }

/* Метка пользователя — ромб цвета хаки, визуально отличается от исторических */
function addUserMarker(city){
  if (!map || markers[city.id]) return;
  const mine = isMine(city) && !city.published;
  const kind = (city.cloud ? 'pin--cloud' : 'pin--user') + (mine ? ' pin--own' : '');
  const tipKind = city.cloud ? 'map-tip--cloud' : 'map-tip--user';
  const icon = L.divIcon({
    className:'pin-wrap',
    html:`<div class="pin pin--user ${kind}" data-id="${city.id}"><span class="pin__ring"></span><span class="pin__core"></span></div>`,
    iconSize:[34,34], iconAnchor:[17,17]
  });
  // Свою метку можно перетащить мышью в нужное место
  const m = L.marker(city.coords, { icon, title:city.shortName, riseOnHover:true, draggable:mine, autoPan:true }).addTo(map);

  if (mine){
    m.on('dragstart', () => { document.getElementById('dragHint').classList.remove('show'); closeCard(); });
    m.on('dragend', () => {
      const ll = m.getLatLng();
      const coords = [Math.round(ll.lat*10000)/10000, Math.round(ll.lng*10000)/10000];
      if (coords[0] < BELARUS_BOX.latMin || coords[0] > BELARUS_BOX.latMax ||
          coords[1] < BELARUS_BOX.lonMin || coords[1] > BELARUS_BOX.lonMax){
        m.setLatLng(city.coords);                        // за пределы Беларуси не пускаем
        toast('Точка должна находиться в границах Беларуси');
        return;
      }
      city.coords = coords;
      if (city.cloud && city.key && CLOUD.enabled){
        cloudMove(city.key, coords)
          .then(() => toast('Новое положение сохранено для всех'))
          .catch(() => toast('Не удалось сохранить — проверьте связь'));
      } else {
        const local = USER_CITIES.find(x => x.id === city.id);
        if (local){ local.coords = coords; saveUserCities(); }
        toast('Положение метки изменено');
      }
      renderTags();
    });
  }
  const isWide = window.innerWidth >= 900;
  m.bindTooltip(`<b>${city.shortName}</b><span>${city.date}</span>`, isWide
    ? { permanent:true, direction:'right', offset:[13,0], className:`map-tip map-tip--perm ${tipKind}`, opacity:1 }
    : { direction:'top', offset:[0,-16], className:`map-tip ${tipKind}`, opacity:1 });
  m.on('click', () => selectUserCity(city.id));
  markers[city.id] = m;
}
function renderUserMarkers(){ allExtraCities().forEach(addUserMarker); }

/* Список точек под отчётом: опубликованные (со звездой) + свои локальные */
function renderTags(){
  const box = document.getElementById('acTags');
  if (!box) return;
  box.innerHTML = '';
  const list = allExtraCities();
  if (!list.length){
    box.innerHTML = '<span class="ac-empty">Пока ничего не добавлено.</span>';
    return;
  }
  list.forEach(c => {
    const mine = isMine(c) && !c.published;
    const tag = document.createElement('span');
    tag.className = 'ac-tag' + (c.published ? ' ac-tag--pub' : mine ? ' ac-tag--own' : c.cloud ? ' ac-tag--cloud' : '');
    tag.title = c.published ? 'Опубликовано в коде'
              : mine        ? 'Ваша карточка — можно изменить или перетащить метку на карте'
              : c.cloud     ? 'Дополнение другого посетителя'
              : 'Сохранено в вашем браузере';

    const label = document.createElement('span');
    label.textContent = `${c.shortName} · ${c.date}`;
    label.addEventListener('click', () => {
      document.getElementById('map-section').scrollIntoView({ behavior:'smooth' });
      setTimeout(() => {
        selectUserCity(c.id);
        if (mine){
          const h = document.getElementById('dragHint');
          h.classList.add('show'); setTimeout(() => h.classList.remove('show'), 3800);
        }
      }, 650);
    });
    tag.appendChild(label);

    if (mine){
      const edit = document.createElement('button');
      edit.type = 'button'; edit.textContent = '✎'; edit.title = 'Изменить карточку';
      edit.addEventListener('click', () => startEdit(c));
      tag.appendChild(edit);

      if (DEV_MODE && !c.cloud){
        const share = document.createElement('button');
        share.type = 'button'; share.textContent = '🔗'; share.title = 'Ссылка для друга';
        share.addEventListener('click', () => shareCity(c));
        tag.appendChild(share);
      }

      const del = document.createElement('button');
      del.type = 'button'; del.className = 'del'; del.textContent = '✕'; del.title = 'Удалить карточку';
      del.addEventListener('click', () => removeCity(c));
      tag.appendChild(del);
    }
    box.appendChild(tag);
  });
}

/* ---------- ПУБЛИКАЦИЯ: КОД, ССЫЛКА, ИМПОРТ ---------- */

/* Кодирование карточки в строку для ссылки (с поддержкой кириллицы) */
function encodeCity(c){
  const o = { n:c.shortName, d:c.date, c:c.coords, l:c.liberationText, i:c.cityInfo, a:c.front };
  const bytes = new TextEncoder().encode(JSON.stringify(o));
  let bin = ''; bytes.forEach(b => bin += String.fromCharCode(b));
  return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function decodeCity(str){
  const b64 = str.replace(/-/g,'+').replace(/_/g,'/');
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0));
  const o = JSON.parse(new TextDecoder().decode(bytes));
  if (!o.n || !o.c) throw new Error('bad');
  return { id:'user_' + Date.now() + Math.floor(Math.random()*999),
           name:o.n + ' · дополнение', shortName:o.n, date:o.d || '1944',
           type:'user', coords:o.c, liberationText:o.l || '', cityInfo:o.i || '',
           front:o.a || 'получено по ссылке' };
}

/* Всплывающее уведомление */
function toast(msg){
  const t = document.getElementById('acToast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 2600);
}
function copyText(txt){
  const area = document.getElementById('acModalCode');
  if (navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(txt).then(() => toast('Скопировано в буфер обмена')).catch(() => { area.select(); toast('Выделено — нажмите Ctrl+C'); });
  } else { area.select(); document.execCommand && document.execCommand('copy'); toast('Скопировано — можно вставлять'); }
}

/* Окно публикации / импорта */
function openModal(mode, payload){
  const m = document.getElementById('acModal');
  const title = document.getElementById('acModalTitle');
  const sub   = document.getElementById('acModalSub');
  const steps = document.getElementById('acModalSteps');
  const code  = document.getElementById('acModalCode');
  const main  = document.getElementById('acModalMain');
  steps.innerHTML = '';

  if (mode === 'publish'){
    title.textContent = 'Код для публикации';
    sub.innerHTML = 'Чтобы ваши точки увидели <b>все посетители сайта</b>, их нужно перенести в файл проекта. ' +
                    'Это занимает полминуты и работает без интернета и сервера.';
    ['Нажмите «Скопировать» — код уйдёт в буфер обмена.',
     'Откройте <b>script.js</b> в VS Code и нажмите Ctrl+F.',
     'Найдите строку <b>communityCities: [</b>',
     'Вставьте код сразу после открывающей скобки [ и сохраните Ctrl+S.',
     'Готово: теперь метки видны каждому, кто откроет сайт.'
    ].forEach(t => { const li = document.createElement('li'); li.innerHTML = t; steps.appendChild(li); });
    code.value = payload; code.readOnly = true;
    main.textContent = 'Скопировать';
    main.onclick = () => copyText(code.value);

  } else if (mode === 'link'){
    title.textContent = 'Ссылка для друга';
    sub.innerHTML = 'Отправьте эту ссылку — при открытии метка <b>автоматически появится</b> на карте у собеседника. ' +
                    'Сервер не нужен: вся карточка зашифрована прямо в адресе.';
    ['Скопируйте ссылку.','Отправьте её в мессенджере или по почте.','Получатель откроет ссылку — метка добавится сама.']
      .forEach(t => { const li = document.createElement('li'); li.innerHTML = t; steps.appendChild(li); });
    code.value = payload; code.readOnly = true;
    code.style.minHeight = '96px';
    main.textContent = 'Скопировать ссылку';
    main.onclick = () => copyText(code.value);

  } else if (mode === 'setup'){
    title.textContent = 'Общая база: как включить';
    sub.innerHTML = 'Сейчас дополнения сохраняются только в вашем браузере. Чтобы <b>любой посетитель мог добавлять города ' +
                    'и все их видели</b>, подключите бесплатное облачное хранилище Firebase. ' +
                    'Это 5 минут, без установки программ и без оплаты.';
    ['Откройте <b>console.firebase.google.com</b> и войдите через Google-аккаунт.',
     'Нажмите «Создать проект» → имя, например <b>bagration</b> → можно отключить Аналитику → «Создать».',
     'В меню слева: <b>Сборка → Realtime Database → Создать базу данных</b>. Выберите регион (europe-west1) и режим <b>«Тестовый»</b>.',
     'Откройте вкладку <b>«Правила»</b> и впишите:<br><code style="color:#9fc8ea">{ "rules": { ".read": true, ".write": true } }</code> → «Опубликовать».',
     'Скопируйте адрес базы сверху — вид: <b>https://bagration-default-rtdb.europe-west1.firebasedatabase.app</b>',
     'В файле <b>script.js</b> найдите <b>CLOUD = {</b> и вставьте адрес в поле <b>url</b>. Сохраните Ctrl+S.',
     'Обновите страницу: статус станет зелёным. Теперь все добавленные города видны всем.'
    ].forEach(t => { const li = document.createElement('li'); li.innerHTML = t; steps.appendChild(li); });
    code.value = "const CLOUD = {\n  url:'https://ВАШ-ПРОЕКТ-default-rtdb.europe-west1.firebasedatabase.app',\n  path:'cities',\n  autoRefresh:60000\n};";
    code.readOnly = true; code.style.minHeight = '120px';
    main.textContent = 'Скопировать образец';
    main.onclick = () => copyText(code.value);

  } else {
    title.textContent = 'Импорт дополнения';
    sub.innerHTML = 'Вставьте <b>ссылку</b>, которую вам прислали, или <b>код карточки</b> — точка появится на вашей карте.';
    code.value = ''; code.readOnly = false; code.placeholder = 'Вставьте ссылку или код сюда…';
    main.textContent = 'Добавить на карту';
    main.onclick = () => importData(code.value);
  }
  m.classList.add('is-open');
}
function closeModal(){ document.getElementById('acModal').classList.remove('is-open'); }

/* ---------- РЕДАКТИРОВАНИЕ СВОЕЙ КАРТОЧКИ ---------- */

/* Загрузить карточку в форму для правки */
function startEdit(c){
  EDITING_ID = c.id;
  const $ = id => document.getElementById(id);
  $('acName').value = c.shortName;
  $('acDate').value = c.date;
  $('acLat').value  = c.coords[0];
  $('acLon').value  = c.coords[1];
  $('acLib').value  = c.liberationText;
  $('acInfo').value = c.cityInfo;
  $('acAuthor').value = c.authorName ||
    (c.front || '').replace(/^карточку добавил /,'').replace(/ ·.*$/,'').trim();

  $('acForm').classList.add('is-editing');
  $('acEditName').textContent = c.shortName;
  $('acSubmit').textContent = 'Сохранить изменения';
  $('acLib').dispatchEvent(new Event('input'));
  $('acInfo').dispatchEvent(new Event('input'));
  document.querySelectorAll('.ac-input,.ac-area').forEach(el => el.classList.remove('is-bad'));
  $('acResult').hidden = true; $('acIdle').hidden = false;
  document.getElementById('add-city').scrollIntoView({ behavior:'smooth' });
}

/* Выйти из режима правки */
function cancelEdit(){
  EDITING_ID = null;
  const $ = id => document.getElementById(id);
  $('acForm').classList.remove('is-editing');
  $('acSubmit').textContent = 'Проверить и добавить';
  ['acName','acDate','acLat','acLon','acLib','acInfo','acAuthor'].forEach(id => $(id).value = '');
  document.querySelectorAll('.ac-input,.ac-area').forEach(el => el.classList.remove('is-bad'));
  $('acResult').hidden = true; $('acIdle').hidden = false;
  $('acLib').dispatchEvent(new Event('input'));
  $('acInfo').dispatchEvent(new Event('input'));
}

/* Удаление своей карточки */
function removeCity(c){
  if (!confirm(`Удалить карточку «${c.shortName}»?`)) return;
  const drop = () => {
    if (markers[c.id] && map){ map.removeLayer(markers[c.id]); delete markers[c.id]; }
    if (EDITING_ID === c.id) cancelEdit();
    renderTags();
  };
  if (c.cloud && c.key && CLOUD.enabled){
    cloudDelete(c.key)
      .then(() => { CLOUD_CITIES = CLOUD_CITIES.filter(x => x.id !== c.id); drop(); toast('Карточка удалена'); })
      .catch(() => toast('Не удалось удалить — проверьте связь'));
  } else {
    USER_CITIES = USER_CITIES.filter(x => x.id !== c.id);
    saveUserCities(); drop(); toast('Карточка удалена');
  }
}

/* Сохранение карточки в локальном режиме */
function saveLocalCity(d){
  const city = {
    id:'user_' + Date.now(),
    name:d.name + ' · дополнение',
    shortName:d.name,
    date:d.date,
    type:'user',
    coords:d.coords,
    liberationText:d.lib,
    cityInfo:d.info,
    front:'карточку добавил ' + (d.author || 'пользователь сайта') + ' · проверено модулем'
  };
  USER_CITIES.push(city);
  saveUserCities();
  addUserMarker(city);
  renderTags();
  return city;
}

/* Сформировать код всех локальных точек для вставки в communityCities */
function publishCode(){
  const mine = USER_CITIES;
  if (!mine.length){ toast('Сначала добавьте хотя бы одну точку'); return; }
  const esc = s => String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
  const code = mine.map(c =>
`    { shortName:'${esc(c.shortName)}', date:'${esc(c.date)}', coords:[${c.coords[0]}, ${c.coords[1]}],
      liberationText:'${esc(c.liberationText)}',
      cityInfo:'${esc(c.cityInfo)}',
      author:'${esc((c.front || '').replace(/^карточку добавил /,'').replace(/ · проверено модулем$/,''))}' },`
  ).join('\n');
  openModal('publish', code);
}

/* Ссылка на одну карточку */
function shareCity(c){
  const base = location.href.split('#')[0];
  openModal('link', base + '#city=' + encodeCity(c));
}

/* Импорт ссылки или кода */
function importData(raw){
  const s = (raw || '').trim();
  if (!s){ toast('Поле пустое'); return; }
  const m = s.match(/#city=([A-Za-z0-9\-_]+)/) || s.match(/^([A-Za-z0-9\-_]{40,})$/);
  if (!m){ toast('Не похоже на ссылку или код карточки'); return; }
  try {
    const city = decodeCity(m[1]);
    if (allExtraCities().some(c => nrm(c.shortName) === nrm(city.shortName))){ toast('Такая точка уже есть на карте'); return; }
    USER_CITIES.push(city); saveUserCities(); addUserMarker(city); renderTags();
    closeModal(); toast('Метка «' + city.shortName + '» добавлена');
    document.getElementById('map-section').scrollIntoView({ behavior:'smooth' });
    setTimeout(() => selectUserCity(city.id), 700);
  } catch(e){ toast('Код повреждён — проверьте, что ссылка скопирована целиком'); }
}

/* Автодобавление точки, если сайт открыт по ссылке #city=… */
function checkSharedLink(){
  const m = location.hash.match(/#city=([A-Za-z0-9\-_]+)/);
  if (!m) return;
  try {
    const city = decodeCity(m[1]);
    if (!allExtraCities().some(c => nrm(c.shortName) === nrm(city.shortName))){
      USER_CITIES.push(city); saveUserCities(); addUserMarker(city); renderTags();
    }
    history.replaceState(null, '', location.pathname);
    setTimeout(() => {
      document.getElementById('map-section').scrollIntoView({ behavior:'smooth' });
      setTimeout(() => { selectUserCity(city.id); toast('Добавлена метка из ссылки: ' + city.shortName); }, 700);
    }, 900);
  } catch(e){}
}

/* ---------- ИНИЦИАЛИЗАЦИЯ ФОРМЫ ---------- */
function initAddCity(){
  initDevMode();              // скрытый режим редактора (Ctrl+Alt+D)
  loadUserCities();
  renderTags();
  renderUserMarkers();
  checkSharedLink();          // если сайт открыт по ссылке с меткой

  const $ = id => document.getElementById(id);

  // Общая база: статус, настройка, ручное обновление, автообновление
  if (CLOUD.enabled){
    cloudLoad();
    if (CLOUD.autoRefresh > 0) setInterval(() => cloudLoad(true), CLOUD.autoRefresh);
  } else {
    setCloudState('off',
      'Карточка сохранится на вашем устройстве и появится на карте.',
      'Общая база не настроена: впишите адрес в CLOUD.url (файл script.js).');
  }
  $('acCloudBtn').addEventListener('click', () => {
    if (cloudState === 'on' || cloudState === 'err') cloudLoad(); else openModal('setup');
  });

  // Публикация и импорт
  $('acPublish').addEventListener('click', publishCode);
  $('acImport').addEventListener('click', () => openModal('import'));
  $('acModalClose').addEventListener('click', closeModal);
  $('acModal').addEventListener('click', e => { if (e.target.id === 'acModal') closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Счётчики символов
  const bindCount = (area, out) => {
    const upd = () => $(out).textContent = $(area).value.trim().length;
    $(area).addEventListener('input', upd); upd();
  };
  bindCount('acLib','acLibCount');
  bindCount('acInfo','acInfoCount');

  // Выбор координат кликом по карте
  $('acPick').addEventListener('click', () => {
    if (!map) return;
    const wrap = document.getElementById('mapWrap');
    wrap.classList.add('is-picking');
    document.getElementById('map-section').scrollIntoView({ behavior:'smooth' });
    const onPick = e => {
      $('acLat').value = e.latlng.lat.toFixed(4);
      $('acLon').value = e.latlng.lng.toFixed(4);
      wrap.classList.remove('is-picking');
      document.getElementById('add-city').scrollIntoView({ behavior:'smooth' });
    };
    map.once('click', onPick);
    document.addEventListener('keydown', function esc(ev){
      if (ev.key === 'Escape'){ wrap.classList.remove('is-picking'); map.off('click', onPick); document.removeEventListener('keydown', esc); }
    });
  });

  // Пример заполнения
  $('acDemo').addEventListener('click', () => {
    $('acName').value = 'Слуцк';
    $('acDate').value = '30.06.1944';
    $('acLat').value  = '53.0272';
    $('acLon').value  = '27.5591';
    $('acLib').value  = 'освобождён 30 июня 1944 года войсками 1-го Белорусского фронта в ходе наступления на минском направлении. Город был взят ударом подвижных соединений, обошедших его с двух сторон, что не позволило противнику закрепиться. За освобождение Слуцка несколько частей получили почётное наименование "Слуцкие".';
    $('acInfo').value = 'слуцк впервые упомянут в 1116 году и является одним из древнейших городов Беларуси. Город известен слуцкими поясами — памятником декоративно-прикладного искусства XVIII века. Сегодня это промышленный и культурный центр Минской области.';
    $('acAuthor').value = 'Пример заполнения';
    bindCountRefresh();
  });
  const bindCountRefresh = () => { $('acLib').dispatchEvent(new Event('input')); $('acInfo').dispatchEvent(new Event('input')); };

  // Отмена режима правки
  $('acEditCancel').addEventListener('click', cancelEdit);

  /* Кнопки управления внутри карточки на карте */
  $('ccEdit').addEventListener('click', () => {
    if (!CURRENT_EXTRA) return;
    closeCard(); startEdit(CURRENT_EXTRA);
  });
  $('ccDelete').addEventListener('click', () => {
    if (!CURRENT_EXTRA) return;
    const c = CURRENT_EXTRA; closeCard(); removeCity(c);
  });
  $('ccMove').addEventListener('click', () => {
    if (!CURRENT_EXTRA || !map) return;
    const c = CURRENT_EXTRA;
    closeCard();
    const wrap = document.getElementById('mapWrap');
    wrap.classList.add('is-picking');
    document.getElementById('pickBanner').textContent = 'Нажмите на карту — метка переедет туда · Esc — отмена';
    const onPick = e => {
      wrap.classList.remove('is-picking');
      const coords = [Math.round(e.latlng.lat*10000)/10000, Math.round(e.latlng.lng*10000)/10000];
      if (coords[0] < BELARUS_BOX.latMin || coords[0] > BELARUS_BOX.latMax ||
          coords[1] < BELARUS_BOX.lonMin || coords[1] > BELARUS_BOX.lonMax){
        toast('Точка должна находиться в границах Беларуси'); return;
      }
      c.coords = coords;
      if (markers[c.id]) markers[c.id].setLatLng(coords);
      if (c.cloud && c.key && CLOUD.enabled){
        cloudMove(c.key, coords).then(() => toast('Новое положение сохранено для всех'))
          .catch(() => toast('Не удалось сохранить — проверьте связь'));
      } else {
        const local = USER_CITIES.find(x => x.id === c.id);
        if (local){ local.coords = coords; saveUserCities(); }
        toast('Положение метки изменено');
      }
      renderTags();
      setTimeout(() => selectUserCity(c.id), 300);
    };
    map.once('click', onPick);
    document.addEventListener('keydown', function esc(ev){
      if (ev.key === 'Escape'){ wrap.classList.remove('is-picking'); map.off('click', onPick); document.removeEventListener('keydown', esc); }
    });
  });

  // Очистка
  $('acClear').addEventListener('click', cancelEdit);

  // Отправка формы
  $('acForm').addEventListener('submit', e => {
    e.preventDefault();
    const res = validateCard({
      name:$('acName').value, date:$('acDate').value,
      lat:$('acLat').value,  lon:$('acLon').value,
      lib:$('acLib').value,  info:$('acInfo').value, author:$('acAuthor').value
    });

    // Подсветка проблемных полей
    document.querySelectorAll('.ac-input,.ac-area').forEach(el => el.classList.remove('is-bad'));
    if (!$('acName').value.trim()) $('acName').classList.add('is-bad');
    if (!parseDate($('acDate').value)) $('acDate').classList.add('is-bad');
    if (!res.data.coords){ $('acLat').classList.add('is-bad'); $('acLon').classList.add('is-bad'); }
    if (res.data.lib.length < 80)  $('acLib').classList.add('is-bad');
    if (res.data.info.length < 60) $('acInfo').classList.add('is-bad');

    renderReport(res);
    if (res.errors.length) return;            // с ошибками на карту не добавляем

    const d = res.data;

    /* РЕЖИМ ПРАВКИ: обновляем существующую карточку */
    if (EDITING_ID){
      const c = allExtraCities().find(x => x.id === EDITING_ID);
      const finish = () => {
        if (markers[EDITING_ID] && map){ map.removeLayer(markers[EDITING_ID]); delete markers[EDITING_ID]; }
        const li = document.createElement('li');
        li.className = 'ac-li ac-li--ok';
        li.innerHTML = '<span>✓</span><span><b>Изменения сохранены.</b> Карточка обновлена' +
                       (c && c.cloud ? ' для всех посетителей сайта.' : '.') + '</span>';
        document.getElementById('acList').prepend(li);
        const id = EDITING_ID;
        cancelEdit(); renderTags();
        setTimeout(() => {
          document.getElementById('map-section').scrollIntoView({ behavior:'smooth' });
          const upd = allExtraCities().find(x => nrm(x.shortName) === nrm(d.name));
          setTimeout(() => selectUserCity(upd ? upd.id : id), 700);
        }, 900);
      };

      if (c && c.cloud && c.key && CLOUD.enabled){
        setCloudState('loading','Сохраняю изменения…');
        cloudUpdate(c.key, d).then(() => cloudLoad(true)).then(() => { toast('Изменения сохранены'); finish(); })
          .catch(() => { setCloudState('err','Не удалось сохранить изменения — проверьте связь.'); toast('Ошибка сохранения'); });
      } else if (c){
        Object.assign(c, {
          name:d.name + ' · дополнение', shortName:d.name, date:d.date, coords:d.coords,
          liberationText:d.lib, cityInfo:d.info,
          front:'карточку добавил ' + (d.author || 'пользователь сайта') + ' · изменено'
        });
        saveUserCities(); addUserMarker(c); toast('Изменения сохранены'); finish();
      }
      return;
    }

    /* РЕЖИМ ОБЩЕЙ БАЗЫ: карточка уходит в облако и становится видна всем */
    if (CLOUD.enabled){
      setCloudState('loading','Отправляю карточку в общую базу…');
      cloudSend(d)
        .then(() => cloudLoad(true))
        .then(() => {
          toast('Карточка добавлена в общую базу — её увидят все');
          const found = CLOUD_CITIES.find(c => nrm(c.shortName) === nrm(d.name));
          const li = document.createElement('li');
          li.className = 'ac-li ac-li--ok';
          li.innerHTML = '<span>★</span><span><b>Опубликовано.</b> Карточка сохранена в общей базе и теперь ' +
                         'отображается у всех посетителей сайта. В хронологическую ленту операции точка не включается.</span>';
          document.getElementById('acList').prepend(li);
          if (found){
            setTimeout(() => {
              document.getElementById('map-section').scrollIntoView({ behavior:'smooth' });
              setTimeout(() => selectUserCity(found.id), 700);
            }, 900);
          }
        })
        .catch(err => {
          setCloudState('err',
            'Не удалось отправить карточку на сервер. Она сохранена на вашем устройстве и видна на карте.',
            'Ошибка отправки (' + (err && err.message) + '). Карточка сохранена локально.');
          saveLocalCity(d);
          toast('Нет связи — карточка сохранена на устройстве');
        });
      return;
    }

    /* ЛОКАЛЬНЫЙ РЕЖИМ (общая база не настроена) */
    const city = saveLocalCity(d);

    // Показываем результат на карте
    const li = document.createElement('li');
    li.className = 'ac-li ac-li--ok';
    const txt = document.createElement('span');
    txt.innerHTML = '<b>Готово.</b> Карточка оформлена и добавлена на карту. ' +
                    'В хронологическую ленту операции точка не включается.';
    if (DEV_MODE){                     // служебные кнопки — только для редактора
      const bar = document.createElement('div');
      bar.style.cssText = 'display:flex;gap:7px;flex-wrap:wrap;margin-top:9px';
      const bShare = document.createElement('button');
      bShare.className = 'msg__btn'; bShare.type = 'button'; bShare.textContent = '🔗 Ссылка';
      bShare.addEventListener('click', () => shareCity(city));
      const bPub = document.createElement('button');
      bPub.className = 'msg__btn'; bPub.type = 'button'; bPub.textContent = '⬆ Код для публикации';
      bPub.addEventListener('click', publishCode);
      bar.appendChild(bShare); bar.appendChild(bPub);
      txt.appendChild(bar);
    }
    li.innerHTML = '<span>★</span>';
    li.appendChild(txt);
    document.getElementById('acList').prepend(li);

    setTimeout(() => {
      document.getElementById('map-section').scrollIntoView({ behavior:'smooth' });
      setTimeout(() => selectUserCity(city.id), 700);
    }, 900);
  });
}

/* ============================================================================
   БЛОК JS 8.5 — ЧАТ-БОТ «БОЕЦ-ЭКСКУРСОВОД»
   Работает полностью офлайн, без интернета и внешних сервисов: отвечает
   по собственной базе знаний и по данным BAGRATION_DATA.
   Чтобы добавить свой вопрос-ответ — допишите объект в массив BOT_KNOWLEDGE.
   Поля: keys — слова-зацепки (достаточно совпадения одного),
         answer — текст ответа (можно с тегами <b>),
         chips  — подсказки для следующего вопроса (необязательно).
   ============================================================================ */
/* ----------------------------------------------------------------------------
   ПЕРСОНАЖ ЧАТА — собирательный образ бойца-сапёра 65-й армии.
   Это художественный персонаж-рассказчик: он объединяет реальные факты
   операции и позволяет подать их от первого лица, «глазами участника».
   ---------------------------------------------------------------------------- */
const SOLDIER = {
  name:'Пётр Громов',
  rank:'сапёр 65-й армии',

  bio:'<span class="msg__title">Боец Пётр Громов</span>' +
      'Мне двадцать три. Родом из деревни под Гомелем — её сожгли в сорок втором, потому воюю злее некуда.<br><br>' +
      'Служу <b>сапёром в 65-й армии генерала Батова</b>. Моя работа — не стрелять, а дорогу делать: ' +
      'рубить лозу, вязать фашины, класть гати через топь. Немец считал Паричские болота непроходимыми — ' +
      'и потому держал там жидкую оборону. Мы прошли. По нашим настилам ушли вперёд пушки и танки.<br><br>' +
      '<i>Я — собирательный образ. Таких, как я, в операции были тысячи, и половина не дошла до Бреста.</i>',

  /* Личные реплики бойца к каждому городу — добавляются к сухой справке */
  notes:{
    svetlogorsk:'Вот отсюда всё и началось. Трое суток в торфяной жиже по пояс — зато к утру по нашим гатям пошли сорокапятки.',
    vitebsk:'Про тот мост нам читали в сводке. Сапёр сапёра поймёт: мост спасти бывает труднее, чем взорвать.',
    orsha:'Под Оршей я впервые услыхал «катюши». Земля гудела так, что с бруствера песок сыпался за шиворот.',
    mogilev:'Днепр форсировали с ходу. Нашему брату там работы было — паромы, плоты, переправы под огнём.',
    bobruisk:'Бобруйский котёл я помню по дыму: он стоял над лесом три дня и не расходился.',
    minsk:'В Минск мы вошли следом за танкистами. Города не было — одни печные трубы торчали из золы.',
    polotsk:'Полоцк брали соседи, прибалтийцы. Говорили, древний город. А нам и глянуть было некогда.',
    baranovichi:'Тут нас крепко выручили партизаны: показали брод и провели мимо немецких минных полей.',
    grodno:'Дошли до Немана. Запахло границей — и ребята впервые заговорили, что скоро домой.',
    brest:'Брест — конец нашего белорусского пути. Крепость стояла обугленная и молчала. Мы тоже молчали.'
  },

  /* «Фронтовой дневник» — выдаётся случайная запись */
  diary:[
    '<b>23 июня 1944, 04:00.</b> Артподготовка. Небо стало белым, а потом рыжим. Два часа нельзя было услышать соседа.',
    '<b>24 июня.</b> Уложили за сутки одиннадцать километров настила. Руки в смоле и крови, но пушки прошли.',
    '<b>29 июня.</b> Бобруйск наш. Нашёл в кармане сухарь, который берёг с переправы. Съел не спеша.',
    '<b>3 июля.</b> Минск. Стоим на площади, а площади нет. Старшина снял каску и долго молчал.',
    '<b>16 июля.</b> Говорят, в Минске был парад партизан. Тридцать тысяч лесных людей вышли на улицы.',
    '<b>28 июля.</b> Брест. Три года и месяц война шла обратно к этой крепости. Мы её вернули.',
    '<b>Без даты.</b> Письмо домой написал в четвёртый раз. Отправить некуда — деревни больше нет.'
  ]
};

const BOT_KNOWLEDGE = [
  { keys:['привет','здравств','добрый день','добрый вечер','доброе утро','хай','ку '],
    answer:'Здравия желаю! Сапёр Громов на связи. Спрашивайте о любом городе, дате или бое — например: <b>«Когда освободили Минск?»</b> или <b>«Почему операцию так назвали?»</b>' },

  { keys:['о себе','расскажи о себе','кто ты','ты кто','как тебя зовут','твоя истори','биограф','громов','ты живой','ты настоящ','твоё имя','твое имя'],
    answer:SOLDIER.bio,
    chips:['Фронтовой дневник','Что такое гати?','Кто такой Батов?','Что ты умеешь?'] },

  { keys:['гати','гать','настил','как прошли болот','через болото','фашин'],
    answer:'<span class="msg__title">Наша работа</span>Гать — это дорога, которую кладут прямо на топь. Рубишь лозняк и мелкий лес, вяжешь фашины — связки прутьев, — бросаешь их в жижу, сверху накатник из брёвен, поперёк — настил.<br><br>За двое суток 65-я армия уложила <b>десятки километров</b> таких настилов. Немец ждал нас с сухого направления, а мы вышли из болота. Потому и прорыв получился.' },

  { keys:['что ты умеешь','помощь','помоги','что спросить','команды'],
    answer:'Докладываю, о чём могу рассказать:<br>• о любом из <b>10 городов</b> на карте;<br>• о датах, фронтах и командующих;<br>• о партизанах и «рельсовой войне»;<br>• о мемориале «Багратион»;<br>• о себе и о своём <b>фронтовом дневнике</b>.',
    chips:['Список городов','Расскажи о себе','Фронтовой дневник','Роль партизан'] },

  { keys:['когда началась','начало операц','дата начала','23 июня','когда стартов'],
    answer:'Операция началась <b>23 июня 1944 года</b> — на следующий день после третьей годовщины начала войны. Наступление открыли разведка боем и мощная артиллерийская подготовка на фронте более 1100 км.' },

  { keys:['когда закончилась','конец операц','завершилась','29 августа','окончание'],
    answer:'Операция завершилась <b>29 августа 1944 года</b>. К этому времени Красная Армия вышла к Висле, границам Восточной Пруссии и полностью освободила территорию Беларуси.' },

  { keys:['сколько длилась','сколько дней','продолжительность','81 день','длительность'],
    answer:'Операция продолжалась <b>68 суток</b> активных действий, а общая её протяжённость по календарю — <b>81 день</b> (23 июня — 29 августа 1944 года). Фронт наступления превышал 1100 километров.' },

  { keys:['почему так назван','в честь кого','откуда название','кто такой багратион','петр иванович','пётр иванович'],
    answer:'Операция названа в честь <b>Петра Ивановича Багратиона</b> (1765–1812) — генерала от инфантерии, героя Отечественной войны 1812 года, смертельно раненного в Бородинском сражении. Название предложил Ставке маршал К. К. Рокоссовский: оно подчёркивало преемственность борьбы с захватчиками.' },

  { keys:['фронт','сколько фронтов','какие фронты','направлен'],
    answer:'В операции участвовали <b>четыре фронта</b>:<br>• <b>1-й Прибалтийский</b> — И. Х. Баграмян;<br>• <b>3-й Белорусский</b> — И. Д. Черняховский;<br>• <b>2-й Белорусский</b> — Г. Ф. Захаров;<br>• <b>1-й Белорусский</b> — К. К. Рокоссовский.<br>Действия координировали представители Ставки Г. К. Жуков и А. М. Василевский.' },

  { keys:['командующ','полководц','рокоссовск','жуков','василевск','черняховск','баграмян','батов'],
    answer:'Ключевые военачальники операции: <b>К. К. Рокоссовский</b> (1-й Белорусский), <b>И. Д. Черняховский</b> (3-й Белорусский), <b>Г. Ф. Захаров</b> (2-й Белорусский), <b>И. Х. Баграмян</b> (1-й Прибалтийский). Координаторы Ставки — <b>Г. К. Жуков</b> и <b>А. М. Василевский</b>. На паричском направлении отличилась 65-я армия генерала <b>П. И. Батова</b>.' },

  { keys:['партизан','подполь','рельсовая война','разведданн'],
    answer:'Вклад партизан был огромен: <b>около 900 партизанских гарнизонов</b> передавали фронтам разведданные о системе немецкой обороны. В ночь на <b>20 июня 1944 года</b> началась третья «рельсовая война» — подорваны десятки тысяч рельсов, что парализовало переброску резервов противника. 16 июля 1944 года в освобождённом Минске прошёл партизанский парад.' },

  { keys:['мемориал','светлогор','раковичи','гати','болот','первый прорыв','комплекс'],
    answer:'<b>Мемориальный комплекс «Операция «Багратион»»</b> находится в Светлогорском районе, близ деревни Раковичи. Здесь 23–24 июня 1944 года войска 65-й армии П. И. Батова прорвали оборону через болота, считавшиеся непроходимыми: сапёры уложили десятки километров деревянных гатей, по которым прошли даже артиллерия и танки. В 2026 году комплекс обновлён.',
    chips:['Показать мемориал на карте','Кто такой Батов?'] },

  { keys:['герои советского союза','сколько героев','награжд','1600'],
    answer:'За операцию «Багратион» более <b>1600 человек</b> удостоены звания Героя Советского Союза, свыше <b>400 тысяч</b> воинов награждены орденами и медалями. 662 соединения и части получили почётные наименования по освобождённым городам.' },

  { keys:['сколько человек','2,4','2.4','масштаб','численност','сколько солдат','сколько войск'],
    answer:'С обеих сторон в сражении участвовали около <b>2,4 млн человек</b>, свыше 36 тысяч орудий и миномётов, более 5 тысяч танков и САУ, около 7 тысяч самолётов. Это одна из крупнейших операций Второй мировой войны.' },

  { keys:['итог','результат','значение','чем закончилась','почему важна'],
    answer:'Итоги операции: разгромлена группа армий «Центр» — уничтожено или пленено около 500 тысяч солдат и офицеров противника. Полностью освобождены Беларусь, часть Литвы и Польши, Красная Армия вышла к границам Восточной Пруссии. <b>17 июля 1944 года</b> по Москве провели около 57 тысяч пленных — «парад побеждённых».' },

  { keys:['котёл','котел','окружени','кольцо'],
    answer:'В ходе операции возникли сразу несколько «котлов»: <b>витебский</b> (5 дивизий, 26 июня), <b>бобруйский</b> (около 40 тысяч человек, 27 июня) и крупнейший — <b>минский</b> (свыше 100 тысяч солдат противника, начало июля). Такая тактика окружений и дала стремительный результат.' },

  { keys:['блохин','мост','западн','двин'],
    answer:'Группа сапёров под командованием <b>Фёдора Тимофеевича Блохина</b> при освобождении Витебска захватила мост через Западную Двину и не дала противнику его взорвать. Это позволило войскам быстро переправиться. Сегодня мост в Витебске носит имя Блохина, а сам он удостоен звания Героя Советского Союза.' },

  { keys:['таран','бронепоезд','комаров','бухтуев','чёрные броды','черные броды'],
    answer:'25 июня 1944 года у станции Чёрные Броды под Бобруйском экипаж танка Т-34 в составе <b>Дмитрия Комарова</b> и механика-водителя <b>Михаила Бухтуева</b> совершил <b>единственный в истории войн таран бронепоезда танком</b>. Бронепоезд был уничтожен, Бухтуев погиб; оба воина удостоены звания Героя Советского Союза.' },

  { keys:['хатынь','тростенец','оккупац','жертв','потери белорус','сожж'],
    answer:'За годы оккупации Беларусь потеряла каждого третьего жителя. Нацисты уничтожили <b>628 деревень вместе с жителями</b>, 186 из них так и не были восстановлены. Символом трагедии стала <b>Хатынь</b>, а лагерь смерти <b>Тростенец</b> под Минском — крупнейший на территории Беларуси.' },

  { keys:['список городов','какие города','все города','города на карте','сколько городов'],
    answer:'На карте отмечены 10 точек:<br>' + BAGRATION_DATA.cities.map(c => `• <b>${c.shortName}</b> — ${c.date}`).join('<br>') + '<br><br>Напишите название любого — расскажу подробнее.' },

  { keys:['проект','конкурс','патриот','автор','сайт сдела','зачем сайт'],
    answer:'Этот сайт создан в <b>2026 году</b> для Республиканского конкурса компьютерных разработок патриотической направленности <b>«ПАТРИОТ.by»</b>, номинация «Сайт». Цель — показать масштаб операции «Багратион» и связать её с мемориальным комплексом в Светлогорском районе.' },

  { keys:['спасибо','благодар','спс'],
    answer:'Рад был помочь. Главное — помнить. Вечная память освободителям ★' },

  { keys:['пока','до свидания','прощай'],
    answer:'До встречи! Берегите память о тех, кто освободил нашу землю.' }
];

/* --- Псевдонимы городов для распознавания в любых падежах --- */
const CITY_ALIASES = {
  polotsk:['полоц'], vitebsk:['витеб'], orsha:['орш'], mogilev:['могил'],
  bobruisk:['бобруйс','березин'], minsk:['минск','минс'], baranovichi:['баранович'],
  grodno:['гродн'], brest:['брест','берест'], svetlogorsk:['светлогорс','шатилк','паричск']
};

/* Быстрые вопросы под полем ввода */
const BOT_CHIPS = ['Расскажи о себе','Фронтовой дневник','Когда началась операция?','Расскажи про Минск','Роль партизан','Мемориал «Багратион»'];

const chatEl   = document.getElementById('chat');
const chatLog  = document.getElementById('chatLog');
const chatFab  = document.getElementById('chatFab');

/* Приведение текста к единому виду: нижний регистр, ё→е, без лишних знаков */
function normalize(s){
  return s.toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9ів,.\- ]/gi,' ').replace(/\s+/g,' ').trim();
}

/* Поиск ответа: сначала проверяем города, затем базу знаний (по числу совпадений) */
function findAnswer(raw){
  const q = normalize(raw);
  if (!q) return { text:'Напишите вопрос — например, «когда освободили Брест?»' };

  // 0) Фронтовой дневник — случайная запись (не повторяется подряд)
  if (/дневник|запис|что было в тот день|воспоминан/.test(q)){
    let i;
    do { i = Math.floor(Math.random() * SOLDIER.diary.length); }
    while (SOLDIER.diary.length > 1 && i === findAnswer._lastDiary);
    findAnswer._lastDiary = i;
    return { text:'<span class="msg__title">Фронтовой дневник</span>' + SOLDIER.diary[i],
             chips:['Ещё запись','Расскажи о себе','Список городов'] };
  }

  // 1) Упоминание города
  for (const city of BAGRATION_DATA.cities){
    const aliases = CITY_ALIASES[city.id] || [normalize(city.shortName).slice(0,5)];
    if (aliases.some(a => q.includes(a))){
      const wantCity = /город|истор|справк|основан|расскажи о город|чем извест/.test(q);
      let text = wantCity
        ? `<span class="msg__title">${city.shortName} · о городе</span>${city.cityInfo}`
        : `<span class="msg__title">${city.shortName} · ${city.date}</span>${city.liberationText}` +
          `<br><br><b>Силы:</b> ${city.front}`;

      // Личное воспоминание бойца — то, чего нет в сухой справке
      const note = SOLDIER.notes[city.id];
      if (note && !wantCity) text += `<div class="msg__note">${note}</div>`;

      const second = wantCity ? `Как освобождали ${city.shortName}?` : `Что за город ${city.shortName}?`;
      return { text, cityId:city.id, chips:['Показать на карте', second, 'Список городов'] };
    }
  }

  // 2) База знаний: побеждает запись с наибольшим числом совпавших ключей
  let best = null, bestScore = 0;
  for (const item of BOT_KNOWLEDGE){
    let score = 0;
    item.keys.forEach(k => { if (q.includes(k)) score += k.length; });   // длинные совпадения весомее
    if (score > bestScore){ bestScore = score; best = item; }
  }
  if (best) return { text:best.answer, chips:best.chips };

  // 3) Ничего не нашли — мягкая подсказка
  return { text:'Пока не нашёл ответа на этот вопрос в своих материалах. Попробуйте спросить о конкретном городе (например, <b>«Бобруйск»</b>), о датах, фронтах, партизанах или о мемориале «Багратион».',
           chips:['Список городов','Что ты умеешь?','Итоги операции'] };
}

/* Вывод сообщения в ленту */
function addMessage(html, who, cityId){
  const el = document.createElement('div');
  el.className = 'msg msg--' + who;
  el.innerHTML = html;
  if (cityId){
    el.dataset.city = cityId;                    // запоминаем город для кнопок-подсказок
                                                 // и добавляем кнопку перехода к карте
    const b = document.createElement('button');
    b.className = 'msg__btn';
    b.textContent = 'Показать на карте';
    b.addEventListener('click', () => botShowCity(cityId));
    el.appendChild(b);
  }
  chatLog.appendChild(el);
  chatLog.scrollTop = chatLog.scrollHeight;
  return el;
}

/* Индикатор «печатает…» */
function showTyping(){
  const t = document.createElement('div');
  t.className = 'msg msg--bot typing';
  t.innerHTML = '<span></span><span></span><span></span>';
  chatLog.appendChild(t);
  chatLog.scrollTop = chatLog.scrollHeight;
  return t;
}

/* Обработка вопроса пользователя */
function askBot(text){
  if (!text.trim()) return;
  const safe = text.replace(/</g,'&lt;').replace(/>/g,'&gt;');   // защита от вставки тегов
  addMessage(safe, 'user');

  const typing = showTyping();
  const res = findAnswer(text);
  const delay = 420 + Math.min(res.text.length * 3, 900);        // пауза «на раздумье»

  setTimeout(() => {
    typing.remove();
    addMessage(res.text, 'bot', res.cityId);
    renderChips(res.chips);
  }, delay);
}

/* Отрисовка быстрых подсказок */
function renderChips(list){
  const box = document.getElementById('chatChips');
  box.innerHTML = '';
  (list && list.length ? list : BOT_CHIPS).forEach(txt => {
    const c = document.createElement('button');
    c.className = 'chip'; c.type = 'button'; c.textContent = txt;
    c.addEventListener('click', () => {
      if (txt === 'Ещё запись'){ askBot('фронтовой дневник'); return; }
      if (txt === 'Показать на карте' || txt === 'Показать мемориал на карте'){
        const last = [...chatLog.querySelectorAll('.msg--bot')].pop();
        botShowCity(txt.includes('мемориал') ? 'svetlogorsk' : (last && last.dataset.city) || 'minsk');
        return;
      }
      askBot(txt);
    });
    box.appendChild(c);
  });
}

/* Переход к городу на карте прямо из чата */
function botShowCity(cityId){
  const idx = BAGRATION_DATA.cities.findIndex(c => c.id === cityId);
  if (idx < 0) return;
  closeChat();
  document.getElementById('map-section').scrollIntoView({ behavior:'smooth' });
  setTimeout(() => selectCity(idx), 650);
}

function openChat(){
  chatEl.classList.add('is-open');
  chatFab.classList.add('is-open');
  if (!chatLog.children.length){      // приветствие при первом открытии
    addMessage('<span class="msg__title">Здравия желаю!</span>Сапёр <b>Пётр Громов</b>, 65-я армия. Летом сорок четвёртого я клал гати через болота под Паричами — с того места и начался прорыв.<br><br>' +
               'Спрашивайте о любом городе, дате или командующем. А захотите — расскажу о себе или прочту запись из фронтового дневника.', 'bot');
    renderChips();
  }
  setTimeout(() => { if (window.innerWidth > 768) document.getElementById('chatInput').focus(); }, 380);
}
function closeChat(){
  chatEl.classList.remove('is-open');
  chatFab.classList.remove('is-open');
}

function initChat(){
  chatFab.addEventListener('click', () => chatEl.classList.contains('is-open') ? closeChat() : openChat());
  document.getElementById('chatClose').addEventListener('click', closeChat);
  document.getElementById('chatForm').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    askBot(input.value);
    input.value = '';
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeChat(); });
}

/* ============================================================================
   БЛОК JS 8 — ИНТЕРФЕЙС: кнопки, плавный скролл, «наверх»
   ============================================================================ */
function initUI(){
  // Кнопки с data-scroll плавно прокручивают к секции
  document.querySelectorAll('[data-scroll]').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelector(b.dataset.scroll).scrollIntoView({ behavior:'smooth' });
    });
  });

  // «Вся Беларусь» — вернуть обзорный вид
  document.getElementById('btnAll').addEventListener('click', () => {
    if (!map) return;
    stopPlay(); closeCard();
    map.flyTo([53.9, 27.5], window.innerWidth < 768 ? 6 : 7, { duration: 1 });
  });

  // «К мемориалу» (в панели карты и в секции мемориала)
  const goMemorial = () => {
    const idx = cities.findIndex(c => c.type === 'memorial');
    document.getElementById('map-section').scrollIntoView({ behavior:'smooth' });
    setTimeout(() => selectCity(idx), 650);
  };
  document.getElementById('btnMemorial').addEventListener('click', goMemorial);
  document.getElementById('btnMemorial2').addEventListener('click', goMemorial);

  // Закрытие полноэкранного просмотра фото
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target.id === 'lightbox') closeLightbox();      // клик по фону
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // Кнопка «наверх»
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 600);
  });
  toTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}
