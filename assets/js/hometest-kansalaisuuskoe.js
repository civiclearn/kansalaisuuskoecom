// hometest-kansalaisuuskoe.js
// Trilingual (FI / SV / EN) — follows the same architecture as hometest-medborgarskapsprov.js
// Exposed: window.initQuiz(lang) — called by applyLang() in index.html

// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

// ----------------------------
// FULL QUESTION POOL
// Finnish civics: constitution, government, history, rights, society, language
// Correct answer is always index 0 — shuffled at runtime
// ----------------------------
const INLINE_TEST_QUESTIONS = {

fi: [
  { q: 'Milloin Suomen nykyinen perustuslaki tuli voimaan?',
    a: ['Vuonna 2000', 'Vuonna 1919', 'Vuonna 1995'] },
  { q: 'Mikä viranomainen vastaa Suomen väestötietojärjestelmästä?',
    a: ['Digi- ja väestötietovirasto (DVV)', 'Kela', 'Migri'] },
  { q: "Mitä 'jokamiehenoikeus' tarkoittaa Suomessa?",
    a: ['Oikeus liikkua luonnossa vapaasti', 'Äänioikeus vaaleissa', 'Oikeus maksuttomaan koulutukseen'] },
  { q: 'Kuinka pitkä on presidenttikausi Suomessa?',
    a: ['6 vuotta', '4 vuotta', '5 vuotta'] },
  { q: 'Milloin Suomi liittyi Euroopan unioniin?',
    a: ['Vuonna 1995', 'Vuonna 2004', 'Vuonna 1999'] },
  { q: 'Kuinka monta kansanedustajaa Suomen eduskunnassa on?',
    a: ['200', '201', '150'] },
  { q: 'Mitä Kela tarkoittaa?',
    a: ['Kansaneläkelaitos', 'Suomen parlamentti', 'Verohallinto'] },
  { q: 'Milloin Suomi itsenäistyi?',
    a: ['6. joulukuuta 1917', '17. heinäkuuta 1919', '1. tammikuuta 1918'] },
  { q: 'Kuinka monta virallista kieltä Suomessa on?',
    a: ['Kaksi (suomi ja ruotsi)', 'Yksi (suomi)', 'Kolme (suomi, ruotsi ja saame)'] },
  { q: 'Mikä periaate tarkoittaa, että kaikki ovat tasavertaisia lain edessä?',
    a: ['Oikeusvaltioperiaate ja yhdenvertaisuus', 'Sananvapaus', 'Yksityisyyden suoja'] },
  { q: 'Mikä on Suomen hallitusmuoto?',
    a: ['Parlamentaarinen tasavalta', 'Perustuslaillinen monarkia', 'Presidenttivaltainen tasavalta'] },
  { q: 'Mitä tarkoittaa julkisuusperiaate Suomessa?',
    a: ['Viranomaisten asiakirjat ovat lähtökohtaisesti julkisia', 'Kaikki oikeudenkäynnit ovat julkisia', 'Kaikkien kansalaisten on äänestettävä vaaleissa'] },
  { q: 'Miten Suomen pääministeri valitaan?',
    a: ['Eduskunta valitsee pääministerin', 'Kansalaiset valitsevat suoraan', 'Presidentti nimittää ilman eduskunnan hyväksyntää'] },
  { q: 'Kuinka usein eduskuntavaalit järjestetään Suomessa?',
    a: ['Neljän vuoden välein', 'Viiden vuoden välein', 'Kolmen vuoden välein'] },
  { q: 'Mikä on oikeusasiamiehen tehtävä Suomessa?',
    a: ['Valvoa perusoikeuksien toteutumista ja viranomaisten lainmukaisuutta', 'Johtaa tuomioistuinlaitosta', 'Edustaa Suomea kansainvälisissä elimissä'] },
  { q: 'Mikä on Suomen pääkaupunki?',
    a: ['Helsinki', 'Turku', 'Tampere'] },
  { q: 'Mikä on kunnallisen itsehallinnon ydin Suomessa?',
    a: ['Kunnat vastaavat paikallisista palveluista kuten koulutuksesta ja sosiaalipalveluista', 'Kunnat voivat säätää omia lakejaan', 'Kuntien on noudatettava vain EU-direktiivejä'] },
  { q: 'Ketä Suomen uusi kansalaisuuskoevaatimus koskee?',
    a: ['18–64-vuotiaita kansalaisuudenhakijoita', 'Kaikkia ulkomaalaisia Suomessa', 'Vain EU:n ulkopuolelta tulevia hakijoita'] },
  { q: 'Mikä on eduskunnan päätehtävä?',
    a: ['Säätää lakeja ja päättää valtion talousarviosta', 'Johtaa ulkopolitiikkaa', 'Nimetä presidentti suoraan'] },
  { q: 'Milloin kansalaisuuskokeeseen liittyvä lainsäädäntö on suunniteltu tulemaan voimaan?',
    a: ['Tammikuussa 2027', 'Kesäkuussa 2026', 'Tammikuussa 2028'] },
],

sv: [
  { q: 'När trädde Finlands nuvarande grundlag i kraft?',
    a: ['År 2000', 'År 1919', 'År 1995'] },
  { q: 'Vilken myndighet ansvarar för Finlands befolkningsdatasystem?',
    a: ['Myndigheten för digitalisering och befolkningsdata (DVV)', 'FPA (Kela)', 'Migrationsverket (Migri)'] },
  { q: "Vad innebär 'allemansrätten' (jokamiehenoikeus) i Finland?",
    a: ['Rätten att röra sig fritt i naturen', 'Rösträtten i val', 'Rätten till avgiftsfri utbildning'] },
  { q: 'Hur lång är presidentperioden i Finland?',
    a: ['6 år', '4 år', '5 år'] },
  { q: 'När gick Finland med i Europeiska unionen?',
    a: ['1995', '2004', '1999'] },
  { q: 'Hur många riksdagsledamöter finns det i Finlands riksdag?',
    a: ['200', '201', '150'] },
  { q: 'Vad är FPA (Kela)?',
    a: ['Folkpensionsanstalten', 'Finlands parlament', 'Skattemyndigheten'] },
  { q: 'När förklarade Finland sin självständighet?',
    a: ['6 december 1917', '17 juli 1919', '1 januari 1918'] },
  { q: 'Hur många officiella språk har Finland?',
    a: ['Två (finska och svenska)', 'Ett (finska)', 'Tre (finska, svenska och samiska)'] },
  { q: 'Vilket begrepp innebär att alla är lika inför lagen i Finland?',
    a: ['Rättsstatsprincipen och jämlikhet', 'Yttrandefrihet', 'Rätten till privatliv'] },
  { q: 'Vad är Finlands statsform?',
    a: ['Parlamentarisk republik', 'Konstitutionell monarki', 'Presidentrepublik'] },
  { q: 'Vad innebär offentlighetsprincipen i Finland?',
    a: ['Myndigheternas handlingar är i grunden offentliga', 'Alla rättegångar är offentliga', 'Alla medborgare är skyldiga att rösta'] },
  { q: 'Hur väljs Finlands statsminister?',
    a: ['Riksdagen väljer statsministern', 'Medborgarna väljer direkt', 'Presidenten utnämner utan riksdagens godkännande'] },
  { q: 'Hur ofta hålls riksdagsval i Finland?',
    a: ['Vart fjärde år', 'Vart femte år', 'Vart tredje år'] },
  { q: 'Vad är justitieombudsmannens uppgift i Finland?',
    a: ['Övervaka att grundläggande rättigheter respekteras och att myndigheter följer lagen', 'Leda domstolsväsendet', 'Representera Finland i internationella organ'] },
  { q: 'Vad är Finlands huvudstad?',
    a: ['Helsingfors', 'Åbo', 'Tammerfors'] },
  { q: 'Vad innebär kommunal självstyre i Finland?',
    a: ['Kommunerna ansvarar för lokala tjänster som utbildning och socialtjänst', 'Kommunerna kan stifta egna lagar', 'Kommunerna behöver bara följa EU-direktiv'] },
  { q: 'Vem gäller Finlands nya krav på medborgarskapsprov?',
    a: ['Medborgarskapssökande i åldern 18–64 år', 'Alla utlänningar i Finland', 'Endast sökande från länder utanför EU'] },
  { q: 'Vad är riksdagens huvuduppgift?',
    a: ['Stifta lagar och besluta om statsbudgeten', 'Leda utrikespolitiken', 'Utse presidenten direkt'] },
  { q: 'När planeras lagstiftningen om medborgarskapsprovet träda i kraft?',
    a: ['Januari 2027', 'Juni 2026', 'Januari 2028'] },
],

en: [
  { q: "When did Finland's current constitution come into force?",
    a: ['In 2000', 'In 1919', 'In 1995'] },
  { q: "Which authority is responsible for Finland's population data system?",
    a: ['Digital and Population Data Services Agency (DVV)', 'Social Insurance Institution (Kela)', 'Finnish Immigration Service (Migri)'] },
  { q: "What does 'everyman's right' (jokamiehenoikeus) mean in Finland?",
    a: ['The right to move freely in nature', 'The right to vote in elections', 'The right to free education'] },
  { q: 'How long is the presidential term in Finland?',
    a: ['6 years', '4 years', '5 years'] },
  { q: 'When did Finland join the European Union?',
    a: ['1995', '2004', '1999'] },
  { q: "How many members does Finland's parliament (Eduskunta) have?",
    a: ['200', '201', '150'] },
  { q: 'What is Kela?',
    a: ["The Social Insurance Institution of Finland", "Finland's parliament", "The tax authority"] },
  { q: 'When did Finland declare independence?',
    a: ['6 December 1917', '17 July 1919', '1 January 1918'] },
  { q: 'How many official languages does Finland have?',
    a: ['Two (Finnish and Swedish)', 'One (Finnish)', 'Three (Finnish, Swedish and Sámi)'] },
  { q: 'Which principle means that everyone is equal before the law in Finland?',
    a: ['Rule of law and equality', 'Freedom of speech', 'Right to privacy'] },
  { q: "What is Finland's form of government?",
    a: ['Parliamentary republic', 'Constitutional monarchy', 'Presidential republic'] },
  { q: 'What does the principle of public access to documents mean in Finland?',
    a: ['Government documents are publicly accessible by default', 'All court proceedings are public', 'All citizens are required to vote'] },
  { q: "How is Finland's prime minister chosen?",
    a: ['The parliament elects the prime minister', 'Citizens elect directly', 'The president appoints without parliamentary approval'] },
  { q: 'How often are parliamentary elections held in Finland?',
    a: ['Every four years', 'Every five years', 'Every three years'] },
  { q: "What is the role of the Parliamentary Ombudsman in Finland?",
    a: ['To oversee the protection of fundamental rights and ensure authorities follow the law', 'To lead the court system', 'To represent Finland in international bodies'] },
  { q: "What is Finland's capital city?",
    a: ['Helsinki', 'Turku', 'Tampere'] },
  { q: 'What does municipal self-government mean in Finland?',
    a: ['Municipalities are responsible for local services such as education and social care', 'Municipalities can enact their own laws', 'Municipalities only need to follow EU directives'] },
  { q: "Who is required to take Finland's new citizenship test?",
    a: ['Citizenship applicants aged 18–64', 'All foreigners in Finland', 'Only applicants from non-EU countries'] },
  { q: "What is the main role of Finland's parliament (Eduskunta)?",
    a: ['To enact legislation and approve the state budget', 'To lead foreign policy', 'To directly appoint the president'] },
  { q: 'When is the citizenship test legislation planned to enter into force?',
    a: ['January 2027', 'June 2026', 'January 2028'] },
]

};

// ----------------------------
// I18N — progress, feedback, end card
// ----------------------------
const HOMETEST_I18N = {
  fi: {
    progress:   'Edistyminen',
    questions:  'kysymystä',
    correct:    'Oikein!',
    wrongPfx:   'Oikea vastaus: ',
    t80: 'Erinomainen tulos!',
    t50: 'Hyvä suoritus!',
    t25: 'Hyvä alku!',
    t0:  'Jatka harjoittelua!',
    body: 'Olet nyt kokeillut joitain harjoituskysymyksiämme. Hanki pääsy <strong>800 kysymykseen 5 aihealueelta yksityiskohtaisella palautteella</strong> ja harjoittele omaan tahtiisi.',
    cta: 'Hanki täysi käyttöoikeus',
    ctaUrl: 'https://civiclearn.com/kansalaisuuskoe/checkout'
  },
  sv: {
    progress:   'Framsteg',
    questions:  'frågor',
    correct:    'Rätt!',
    wrongPfx:   'Rätt svar: ',
    t80: 'Utmärkt jobbat!',
    t50: 'Bra gjort!',
    t25: 'Bra start!',
    t0:  'Fortsätt träna!',
    body: 'Du har nu provat några av våra exempelfrågor. Få tillgång till <strong>800 frågor i 5 ämnesområden med detaljerad feedback</strong> och träna i din egen takt.',
    cta: 'Fullständig tillgång',
    ctaUrl: 'https://civiclearn.com/kansalaisuuskoe/checkout'
  },
  en: {
    progress:   'Progress',
    questions:  'questions',
    correct:    'Correct!',
    wrongPfx:   'Correct answer: ',
    t80: 'Excellent result!',
    t50: 'Well done!',
    t25: 'Good start!',
    t0:  'Keep practising!',
    body: 'You have now tried some of our practice questions. Get access to <strong>800 questions across 5 topic areas with detailed feedback</strong> and train at your own pace.',
    cta: 'Get full access',
    ctaUrl: 'https://civiclearn.com/kansalaisuuskoe/checkout'
  }
};

// ----------------------------
// SHUFFLE helper
// ----------------------------
function shuffleAnswers(question) {
  var combined = question.a.map(function (opt, index) {
    return { text: opt, isCorrect: index === 0 };
  });
  for (var i = combined.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = combined[i]; combined[i] = combined[j]; combined[j] = tmp;
  }
  question.a = combined.map(function (item) { return item.text; });
  question.correct = combined.findIndex(function (item) { return item.isCorrect; });
}

// ----------------------------
// DONUT chart (Finnish flag blue)
// ----------------------------
function createDonutChart(pct) {
  var C = 2 * Math.PI * 40;
  return (
    '<div class="donut-wrapper">' +
      '<svg width="120" height="120" viewBox="0 0 100 100">' +
        '<circle cx="50" cy="50" r="40" stroke="#dce8f7" stroke-width="12" fill="none"></circle>' +
        '<circle cx="50" cy="50" r="40" stroke="#003580" stroke-width="12" fill="none"' +
          ' stroke-dasharray="' + ((pct / 100) * C).toFixed(2) + ' ' + ((1 - pct / 100) * C).toFixed(2) + '"' +
          ' transform="rotate(-90 50 50)" stroke-linecap="round"></circle>' +
      '</svg>' +
      '<div class="donut-center">' + pct + '%</div>' +
    '</div>'
  );
}

// ----------------------------
// MAIN init — resets and rebuilds quiz for given language
// ----------------------------
window.initQuiz = function (lang) {

  lang = (lang && INLINE_TEST_QUESTIONS[lang]) ? lang : 'fi';
  var i18n = HOMETEST_I18N[lang];

  // Deep-copy and shuffle question pool for this language
  var pool = INLINE_TEST_QUESTIONS[lang].map(function (q) {
    return { q: q.q, a: q.a.slice(), correct: 0 };
  });
  pool.forEach(shuffleAnswers);

  // Build rows
  var rows = [];
  for (var i = 0; i < pool.length; i += QUESTIONS_PER_ROW) {
    rows.push(pool.slice(i, i + QUESTIONS_PER_ROW));
  }

  var totalQuestions   = pool.length;
  var correctCount     = 0;
  var answeredCount    = 0;
  var currentRow       = 0;
  var rowAnsweredCounts = new Array(rows.length).fill(0);

  // Reset DOM
  var container = document.getElementById('inline-test-questions');
  if (!container) return;
  container.innerHTML = '';

  // Reset progress
  function updateProgress() {
    var bar = document.getElementById('inline-progressbar');
    var txt = document.getElementById('inline-progress-text');
    if (bar) bar.style.width = ((answeredCount / totalQuestions) * 100) + '%';
    if (txt) txt.textContent = i18n.progress + ': ' + answeredCount + ' / ' + totalQuestions + ' ' + i18n.questions;
  }

  // End card
  function createEndCard() {
    var pct  = Math.round((correctCount / totalQuestions) * 100);
    var card = document.createElement('div');
    card.className = 'inline-question-card end-card';
    var title = pct >= 80 ? i18n.t80 : pct >= 50 ? i18n.t50 : pct >= 25 ? i18n.t25 : i18n.t0;
    card.innerHTML =
      '<h3>' + title + '</h3>' +
      createDonutChart(pct) +
      '<p>' + i18n.body + '</p>' +
      '<a href="' + i18n.ctaUrl + '" class="hero-primary-btn">' + i18n.cta + '</a>';
    return card;
  }

  // Question card
  function createQuestionCard(questionObj, absoluteIndex, rowIndex) {
    var card = document.createElement('div');
    card.className = 'inline-question-card';

    var title = document.createElement('h3');
    title.textContent = questionObj.q;
    card.appendChild(title);

    var feedback = document.createElement('div');
    feedback.className = 'inline-feedback';

    questionObj.a.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'inline-option-btn';
      btn.textContent = opt;

      btn.onclick = function () {
        answeredCount++;
        rowAnsweredCounts[rowIndex]++;
        updateProgress();

        var allBtns = card.querySelectorAll('button');
        allBtns.forEach(function (b) { b.disabled = true; });

        if (i === questionObj.correct) {
          correctCount++;
          btn.style.background  = 'rgba(24, 160, 110, 0.15)';
          btn.style.borderColor = '#18a06e';
          btn.style.color       = '#14805a';
          feedback.textContent  = i18n.correct;
          feedback.classList.add('inline-correct');
        } else {
          btn.style.background  = 'rgba(230, 57, 70, 0.12)';
          btn.style.borderColor = '#e63946';
          btn.style.color       = '#c5303b';
          allBtns[questionObj.correct].style.background  = 'rgba(24, 160, 110, 0.15)';
          allBtns[questionObj.correct].style.borderColor = '#18a06e';
          allBtns[questionObj.correct].style.color       = '#14805a';
          feedback.textContent = i18n.wrongPfx + questionObj.a[questionObj.correct];
          feedback.classList.add('inline-wrong');
        }

        card.appendChild(feedback);

        // Last question → show end card
        if (absoluteIndex === totalQuestions - 1) {
          setTimeout(function () { container.appendChild(createEndCard()); }, 300);
          return;
        }

        // Row complete → reveal next row
        var rowSize = rows[rowIndex].length;
        if (rowAnsweredCounts[rowIndex] === rowSize) {
          currentRow++;
          setTimeout(function () { renderRow(currentRow); }, 150);
        }
      };

      card.appendChild(btn);
    });

    return card;
  }

  // Render a row of cards
  function renderRow(rowIndex) {
    if (!rows[rowIndex]) return;
    rows[rowIndex].forEach(function (q, offset) {
      var absoluteIndex = rowIndex * QUESTIONS_PER_ROW + offset;
      container.appendChild(createQuestionCard(q, absoluteIndex, rowIndex));
    });
  }

  // Kick off
  renderRow(0);
  updateProgress();
};

// ----------------------------
// Auto-init on first load
// ----------------------------
document.addEventListener('DOMContentLoaded', function () {
  var saved = localStorage.getItem('kk_lang');
  var lang  = (saved && INLINE_TEST_QUESTIONS[saved]) ? saved : 'fi';
  window.initQuiz(lang);
});
