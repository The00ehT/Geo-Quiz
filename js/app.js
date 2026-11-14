"use strict";
const REGIONS=['EU','AS','AF','NA','SA','OC'];
const MODES=['cap','flag','mapc','mapt'];
const QN=10, HINT_MULT=[1,.7,.45];
const T={
de:{kmap:'Wissenskarte',q_hi:'sehr nah',cPrec:'Genauigkeit',cSeen:'{n} von {t} Ländern beantwortet',q_mid:'nah dran',q_lo:'eher daneben',q_bad:'weit daneben',roundsN:'{n} Runden',tipsN:'{n} Tipps',hEmpty:'Keine Tipps in diesem Bereich',hCloser:'{p} deiner Tipps lagen näher',hBest:'Deine genauesten Tipps',hLast:'zuletzt am {d}',kmapSub:'Jedes Land ist nach deinem Stand eingefärbt. Tippe ein Land an, um deinen Verlauf zu sehen.',all:'Alle Modi',st_good:'Sicher',st_mid:'Wackelig',st_bad:'Oft falsch',st_new:'Noch nie gefragt',
 knowState:'Wissensstand',knowSub:'Anteil der Länder nach Stand',contAcc:'Genauigkeit nach Kontinent',contAccSub:'Wie nah du im Schnitt liegst – knapp daneben zählt teilweise',radar:'Kontinente im Vergleich',radarSub:'Genauigkeit je Modus und Kontinent · Legende antippen zum Ein- und Ausblenden',
 distTrend:'Entfernung pro Kartenrunde',distTrendSub:'Durchschnittlich daneben in km, alle Runden je Kartenmodus – je niedriger, desto genauer',distSplit:'Wie genau du tippst',histHint:'Über das Diagramm ziehen für Details',hOver:'über {v} km',hUnder:'unter {v} km',hUpTo:'bis {v} km',hAll:'insgesamt',distSplitSub:'Alle Kartenantworten nach Entfernung',
 modeShare:'Gespielte Runden',modeShareSub:'Verteilung nach Modus',noMapData:'Noch keine Kartenantworten mit Entfernung. Spiele eine Runde „Länder finden“ oder „Städte finden“.',
 noData:'Für diese Auswahl gibt es noch keine Antworten.',weakTitle:'Schwächen üben',weakNone:'Keine Problemländer – stark!',practiceWeak:'Runde mit diesen Ländern starten',
 detailHint:'Tippe auf der Karte ein Land an, um deinen Verlauf zu sehen.',history:'Letzte Antworten',noHistory:'Noch keine einzelnen Antworten gespeichert. Ab jetzt wird jede Antwort mitgeschrieben.',
 toCards:'Als Karteikarte merken',cardsAdded:'{n} Karteikarten gemerkt',retryWrong:'Fehler nochmal üben',wrongToCards:'Fehler als Karteikarten merken',saved:'Gemerkt',
 answers:'{n} Antworten',km:'km',scoreTrendSub:'Ergebnis in Prozent der Höchstpunktzahl',trendModes:'Verlauf nach Spielmodus',trendModesSub:'Ergebnis in % der Höchstpunktzahl, alle Runden seit der ersten',perRound:'je Runde',avgOf:'Schnitt über {n} Runden',noRoundsYet:'Noch keine Runde gespielt',roundNo:'Runde {n}',trendVs:'Letzte 3 Runden im Vergleich zu den 3 davor',rs_EU:'Europa',rs_AS:'Asien',rs_AF:'Afrika',rs_NA:'N-/M-Amerika',rs_SA:'Süd­amerika',rs_OC:'Ozea­nien',
 b100:'unter 100 km',b500:'100–500 km',b1500:'500–1.500 km',bfar:'über 1.500 km',inCountry:'im Land',
allRegions:'Alle Kontinente',showInfo:'Infos zeigen',hideInfo:'Infos einklappen',cardsRegHint:'Gilt nur für die Karteikarten im Lernen-Tab. Mindestens ein Kontinent bleibt aktiv.',change:'Ändern',population:'Einwohner',languages:'Sprachen',area:'Fläche',density:'Bevölkerungsdichte',perKm:'Einw./km²',currency:'Währung',fxTitle:'Kurs zum Euro',fxSwap:'Tippen, um die Richtung umzudrehen',fxNote:'Wechselkurse vom {d}.',gdp:'BIP gesamt',gdppc:'BIP pro Kopf',dial:'Telefonvorwahl',tld:'Internet-Domain',tz:'Zeitzone',tzs:'Zeitzonen',sea:'Zugang zum Meer',yes:'Ja',noLand:'Nein, Binnenstaat',neighbors:'Nachbarländer',noNeighbors:'Keine Landgrenzen',moreInfo:'Mehr Infos',howCards:'So funktionieren die Karteikarten',dataNote:'Einwohner und BIP sind aktuelle Schätzungen und gerundet.',lookTitle:'Sprache & Darstellung',region:'Region',
play:'Spielen',learn:'Lernen',stats:'Statistik',badges:'Erfolge',options:'Einstellungen',
 chooseMode:'Was möchtest du üben?',homeSub:'Jede Runde hat {n} Fragen. Länder, die du oft falsch hast, kommen häufiger dran. Bei Bedarf hilft dir ein Hinweis.',
 m_cap:'Hauptstädte',m_cap_d:'Land gegeben, Hauptstadt nennen',m_flag:'Flaggen',m_flag_d:'Flagge sehen, Land erkennen',
 m_mapc:'Länder finden',m_mapc_d:'Das Land auf Globus oder Karte antippen',m_mapt:'Städte finden',m_mapt_d:'Die Hauptstadt möglichst genau markieren',
 best:'Bestwert',never:'Noch nicht gespielt',difficulty:'Schwierigkeit',easy:'Leicht',hard:'Schwer',
 diffHint:'Leicht: 4 Antworten zur Auswahl, Ländergrenzen sichtbar und das angetippte Land wird angezeigt. Schwer: freie Eingabe, keine Grenzen.',
 regions:'Kontinente',regionsHint:'Mindestens ein Kontinent bleibt aktiv.',countriesN:'{n} Länder',
 r_EU:'Europa',r_AS:'Asien',r_AF:'Afrika',r_NA:'Nord- & Mittelamerika',r_SA:'Südamerika',r_OC:'Ozeanien',
 qOf:'Frage {i} von {n}',capOf:'Hauptstadt von',whichCountry:'Zu welchem Land gehört die Flagge?',find:'Finde',
 typeCap:'Hauptstadt eingeben',typeCountry:'Land eingeben',check:'Prüfen',skip:'Weiß nicht',next:'Weiter',finish:'Auswerten',confirm:'Bestätigen',
 tapEarth:'Tippe auf die Erde',pinSet:'Markierung gesetzt',selected:'Ausgewählt',correct:'Richtig',wrong:'Falsch – richtig ist {a}',youSaid:'Deine Antwort: {a}',
 inside:'Treffer im Land',kmAway:'{d} km daneben',points:'Punkte',quit:'Runde abbrechen',
 hint:'Hinweis',hintCost:'−{p} %',h_5050:'Zwei falsche Antworten ausgeblendet',h_cont:'Kontinent: {c} · {n} Buchstaben',h_letter:'So beginnt es: {p}',
 h_region:'Liegt in {c} – markiert',h_circle:'Liegt im gelben Kreis',h_country:'Liegt in {c} – markiert',
 globe:'Globus',map:'Karte',zoomIn:'Vergrößern',zoomOut:'Verkleinern',zoomFit:'Ganze Ansicht',loading:'Erde wird geladen …',noGL:'Dein Gerät oder Browser kann die 3D-Erde nicht darstellen (WebGL fehlt). Hauptstädte und Flaggen funktionieren trotzdem.',
 roundDone:'Runde beendet',again:'Nochmal',menu:'Zur Auswahl',correctN:'{c} von {n} richtig',hintsUsed:'{h} Hinweise genutzt',
 statsTitle:'Deine Statistik',rounds:'Runden',questions:'Fragen',accuracy:'Trefferquote',avgScore:'⌀ Ergebnis',
 byMode:'Bestwerte nach Modus',mode:'Modus',bestR:'Bester',avg:'Schnitt',trend:'Verlauf der letzten Runden',trendSub:'Ergebnis in Prozent der Höchstpunktzahl',
 weakest:'Hier lohnt sich Üben',weakSub:'Länder mit den meisten Fehlern',recent:'Letzte Runden',xWrong:'{w}× falsch · {r}× richtig',
 learnStats:'Karteikarten',learnStatsSub:'Wie viele Karten in welchem Fach liegen',
 noStats:'Noch keine Runden gespielt. Nach deiner ersten Runde siehst du hier Trefferquote, Verlauf und deine Problemländer.',startNow:'Erste Runde starten',
 badgesTitle:'Erfolge',badgesSub:'{u} von {n} freigeschaltet',unlocked:'Freigeschaltet am {d}',newBadge:'Erfolg freigeschaltet: {t}',
 atlas:'Atlas',cards:'Karteikarten',atlasHint:'Tippe ein Land an oder suche danach',search:'Land suchen',capital:'Hauptstadt',continent:'Kontinent',inEnglish:'Auf Englisch',inGerman:'Auf Deutsch',
 seenN:'{n} von {t} Ländern angesehen',
 deck:'Stapel',deck_cap:'Hauptstädte',deck_flag:'Flaggen',flip:'Umdrehen',known:'Gewusst',unknown:'Nochmal',
 cardsSub:'Gewusste Karten wandern ein Fach weiter und kommen seltener. Nicht gewusste starten wieder in Fach 1.',
 box0:'Neu',boxN:'Fach {n}',mastered:'Gemeistert',due:'{n} fällig',allDone:'Für heute ist alles wiederholt.',allDoneSub:'Du kannst trotzdem weiterüben, dann kommen die Karten aus den niedrigsten Fächern.',
 keepGoing:'Weiterüben',whatCap:'Wie heißt die Hauptstadt?',whatCountry:'Welches Land ist das?',tapFlip:'Tippe auf die Karte oder drücke die Leertaste',
 settingsTitle:'Einstellungen',language:'Sprache',theme:'Darstellung',light:'Hell',dark:'Dunkel',system:'System',quiz:'Quiz',
 earthSet:'Erde',defView:'Startansicht im Kartenmodus',clouds:'Wolken auf dem Globus',on:'An',off:'Aus',
 data:'Statistik-Daten',dataHint:'Die Statistik liegt nur in diesem Browser. Sichere sie als CSV-Datei oder übertrage sie auf ein anderes Gerät.',
 exportCsv:'CSV exportieren',importCsv:'CSV importieren',showCsv:'CSV als Text anzeigen',copy:'Kopieren',copied:'In die Zwischenablage kopiert',
 exportFallback:'Speichern ist hier nicht möglich. Kopiere den Text und sichere ihn als .csv-Datei.',
 exported:'CSV gespeichert',exportDeclined:'Export abgebrochen',
 importFound:'Datei enthält {r} Runden. Du hast aktuell {c} Runden.',replace:'Ersetzen',merge:'Zusammenführen',cancel:'Abbrechen',
 importDone:'{r} Runden importiert',importBad:'Diese Datei ist keine Weltatlas-Quiz-CSV. Es fehlt die Kopfzeile mit „type,date,mode“.',
 pasteCsv:'Oder CSV-Text einfügen',pasteImport:'Text importieren',
 reset:'Statistik löschen',resetQ:'Alle Runden, Länderwerte, Karteikarten und Erfolge werden gelöscht. Das lässt sich nicht rückgängig machen.',resetYes:'Endgültig löschen',resetDone:'Statistik gelöscht',
 a_first:'Erste Reise',a_first_d:'Spiele deine erste Runde.',a_ten:'Stammgast',a_ten_d:'Spiele 10 Runden.',a_fifty:'Kartenkenner',a_fifty_d:'Spiele 50 Runden.',
 a_perfect:'Fehlerfrei',a_perfect_d:'10 von 10 bei Hauptstädten oder Flaggen.',a_perfectHard:'Ohne Netz',a_perfectHard_d:'10 von 10 auf „Schwer“ bei Hauptstädten oder Flaggen.',
 a_carto:'Kartograf',a_carto_d:'Mindestens 9.000 Punkte in einer Kartenrunde.',a_bull:'Volltreffer',a_bull_d:'Eine Hauptstadt auf weniger als 25 km genau markieren.',
 a_nohint:'Aus eigener Kraft',a_nohint_d:'Eine Runde mit 8 richtigen Antworten ohne Hinweis.',
 a_allModes:'Allrounder',a_allModes_d:'Spiele jeden der vier Modi.',a_streak:'Lauf',a_streak_d:'15 richtige Antworten am Stück.',
 a_flags:'Flaggenkunde',a_flags_d:'100 Flaggen richtig erkannt.',a_caps:'Hauptstadt-Profi',a_caps_d:'100 Hauptstädte richtig genannt.',
 a_explorer:'Entdecker',a_explorer_d:'Schau dir 50 Länder im Atlas an.',a_learner:'Fleißig gelernt',a_learner_d:'Bringe 25 Karteikarten in Fach 4 oder höher.',
 a_trotter:'Weltenbummler',a_trotter_d:'100 verschiedene Länder richtig beantwortet.',a_world:'Die ganze Welt',a_world_d:'Alle 194 Länder mindestens einmal richtig.'},
en:{kmap:'Knowledge map',q_hi:'very close',cPrec:'Precision',cSeen:'{n} of {t} countries answered',q_mid:'close',q_lo:'rather off',q_bad:'far off',roundsN:'{n} rounds',tipsN:'{n} taps',hEmpty:'No taps in this range',hCloser:'{p} of your taps were closer',hBest:'Your most precise taps',hLast:'last on {d}',kmapSub:'Each country is coloured by how well you know it. Tap a country to see your history.',all:'All modes',st_good:'Solid',st_mid:'Shaky',st_bad:'Often wrong',st_new:'Never asked',
 knowState:'Knowledge',knowSub:'Share of countries by state',contAcc:'Precision by continent',contAccSub:'How close you are on average – near misses count partly',radar:'Continents compared',radarSub:'Precision per mode and continent · tap the legend to show or hide',
 distTrend:'Distance per map round',distTrendSub:'Average km off, every round per map mode – lower is more precise',distSplit:'How precise you tap',histHint:'Drag across the chart for details',hOver:'over {v} km',hUnder:'under {v} km',hUpTo:'up to {v} km',hAll:'overall',distSplitSub:'All map answers by distance',
 modeShare:'Rounds played',modeShareSub:'Split by mode',noMapData:'No map answers with distance yet. Play a round of “Find countries” or “Find cities”.',
 noData:'No answers for this selection yet.',weakTitle:'Practice weak spots',weakNone:'No problem countries – great!',practiceWeak:'Start a round with these countries',
 detailHint:'Tap a country on the map to see your history.',history:'Recent answers',noHistory:'No individual answers saved yet. From now on every answer is recorded.',
 toCards:'Save as flashcard',cardsAdded:'{n} flashcards saved',retryWrong:'Practice mistakes again',wrongToCards:'Save mistakes as flashcards',saved:'Saved',
 answers:'{n} answers',km:'km',scoreTrendSub:'Result as a percentage of the maximum score',trendModes:'Progress by game mode',trendModesSub:'Result in % of the maximum score, every round since your first',perRound:'per round',avgOf:'average of {n} rounds',noRoundsYet:'No rounds played yet',roundNo:'Round {n}',trendVs:'Last 3 rounds compared with the 3 before',rs_EU:'Europe',rs_AS:'Asia',rs_AF:'Africa',rs_NA:'N/C America',rs_SA:'S America',rs_OC:'Oceania',
 b100:'under 100 km',b500:'100–500 km',b1500:'500–1,500 km',bfar:'over 1,500 km',inCountry:'in country',
allRegions:'All continents',showInfo:'Show facts',hideInfo:'Collapse facts',cardsRegHint:'Applies only to the flashcards in the Learn tab. At least one continent stays on.',change:'Change',population:'Population',languages:'Languages',area:'Area',density:'Population density',perKm:'people/km²',currency:'Currency',fxTitle:'Rate vs euro',fxSwap:'Tap to flip the direction',fxNote:'Exchange rates from {d}.',gdp:'GDP total',gdppc:'GDP per person',dial:'Calling code',tld:'Internet domain',tz:'Time zone',tzs:'Time zones',sea:'Sea access',yes:'Yes',noLand:'No, landlocked',neighbors:'Neighbours',noNeighbors:'No land borders',moreInfo:'More facts',howCards:'How the flashcards work',dataNote:'Population and GDP are recent estimates, rounded.',lookTitle:'Language & appearance',region:'Region',
play:'Play',learn:'Learn',stats:'Statistics',badges:'Achievements',options:'Settings',
 chooseMode:'What do you want to practice?',homeSub:'Each round has {n} questions. Countries you often miss come up more often. A hint helps when you’re stuck.',
 m_cap:'Capitals',m_cap_d:'Country given, name the capital',m_flag:'Flags',m_flag_d:'See a flag, name the country',
 m_mapc:'Find countries',m_mapc_d:'Tap the country on the globe or map',m_mapt:'Find cities',m_mapt_d:'Mark the capital as precisely as you can',
 best:'Best',never:'Not played yet',difficulty:'Difficulty',easy:'Easy',hard:'Hard',
 diffHint:'Easy: pick from 4 answers, borders visible and the tapped country is named. Hard: type your answer, no borders.',
 regions:'Continents',regionsHint:'At least one continent stays on.',countriesN:'{n} countries',
 r_EU:'Europe',r_AS:'Asia',r_AF:'Africa',r_NA:'North & Central America',r_SA:'South America',r_OC:'Oceania',
 qOf:'Question {i} of {n}',capOf:'Capital of',whichCountry:'Which country does this flag belong to?',find:'Find',
 typeCap:'Type the capital',typeCountry:'Type the country',check:'Check',skip:'Don’t know',next:'Next',finish:'See results',confirm:'Confirm',
 tapEarth:'Tap the Earth',pinSet:'Marker placed',selected:'Selected',correct:'Correct',wrong:'Wrong – it’s {a}',youSaid:'Your answer: {a}',
 inside:'Inside the country',kmAway:'{d} km off',points:'points',quit:'Quit round',
 hint:'Hint',hintCost:'−{p} %',h_5050:'Two wrong answers removed',h_cont:'Continent: {c} · {n} letters',h_letter:'It starts like this: {p}',
 h_region:'It’s in {c} – highlighted',h_circle:'It’s inside the yellow circle',h_country:'It’s in {c} – highlighted',
 globe:'Globe',map:'Map',zoomIn:'Zoom in',zoomOut:'Zoom out',zoomFit:'Show all',loading:'Loading the Earth …',noGL:'Your device or browser can’t display the 3D Earth (WebGL missing). Capitals and flags still work.',
 roundDone:'Round complete',again:'Play again',menu:'Back to modes',correctN:'{c} of {n} correct',hintsUsed:'{h} hints used',
 statsTitle:'Your statistics',rounds:'Rounds',questions:'Questions',accuracy:'Accuracy',avgScore:'Avg. result',
 byMode:'Best scores by mode',mode:'Mode',bestR:'Best',avg:'Average',trend:'Recent rounds',trendSub:'Result as a percentage of the maximum score',
 weakest:'Worth practicing',weakSub:'Countries you miss most',recent:'Recent rounds',xWrong:'{w}× wrong · {r}× right',
 learnStats:'Flashcards',learnStatsSub:'How many cards sit in which box',
 noStats:'No rounds played yet. After your first round you’ll see your accuracy, progress and problem countries here.',startNow:'Start your first round',
 badgesTitle:'Achievements',badgesSub:'{u} of {n} unlocked',unlocked:'Unlocked {d}',newBadge:'Achievement unlocked: {t}',
 atlas:'Atlas',cards:'Flashcards',atlasHint:'Tap a country or search for one',search:'Search country',capital:'Capital',continent:'Continent',inEnglish:'In English',inGerman:'In German',
 seenN:'{n} of {t} countries viewed',
 deck:'Deck',deck_cap:'Capitals',deck_flag:'Flags',flip:'Flip',known:'Knew it',unknown:'Again',
 cardsSub:'Cards you know move up a box and come back less often. Cards you miss go back to box 1.',
 box0:'New',boxN:'Box {n}',mastered:'Mastered',due:'{n} due',allDone:'You’re done for today.',allDoneSub:'You can keep practicing; cards from the lowest boxes come first.',
 keepGoing:'Keep practicing',whatCap:'What is the capital?',whatCountry:'Which country is this?',tapFlip:'Tap the card or press Space',
 settingsTitle:'Settings',language:'Language',theme:'Appearance',light:'Light',dark:'Dark',system:'System',quiz:'Quiz',
 earthSet:'Earth',defView:'Starting view in map modes',clouds:'Clouds on the globe',on:'On',off:'Off',
 data:'Statistics data',dataHint:'Your statistics live only in this browser. Back them up as a CSV file or move them to another device.',
 exportCsv:'Export CSV',importCsv:'Import CSV',showCsv:'Show CSV as text',copy:'Copy',copied:'Copied to clipboard',
 exportFallback:'Saving isn’t available here. Copy the text and save it as a .csv file.',
 exported:'CSV saved',exportDeclined:'Export cancelled',
 importFound:'The file contains {r} rounds. You currently have {c} rounds.',replace:'Replace',merge:'Merge',cancel:'Cancel',
 importDone:'Imported {r} rounds',importBad:'This isn’t a World Atlas Quiz CSV. The header row starting with “type,date,mode” is missing.',
 pasteCsv:'Or paste CSV text',pasteImport:'Import text',
 reset:'Delete statistics',resetQ:'All rounds, country results, flashcards and achievements will be deleted. This can’t be undone.',resetYes:'Delete for good',resetDone:'Statistics deleted',
 a_first:'First trip',a_first_d:'Play your first round.',a_ten:'Regular',a_ten_d:'Play 10 rounds.',a_fifty:'Map reader',a_fifty_d:'Play 50 rounds.',
 a_perfect:'Flawless',a_perfect_d:'10 out of 10 in capitals or flags.',a_perfectHard:'No safety net',a_perfectHard_d:'10 out of 10 on Hard in capitals or flags.',
 a_carto:'Cartographer',a_carto_d:'Score at least 9,000 points in a map round.',a_bull:'Bullseye',a_bull_d:'Mark a capital within 25 km.',
 a_nohint:'On your own',a_nohint_d:'A round with 8 correct answers and no hints.',
 a_allModes:'All-rounder',a_allModes_d:'Play each of the four modes.',a_streak:'On a roll',a_streak_d:'15 correct answers in a row.',
 a_flags:'Vexillologist',a_flags_d:'Recognise 100 flags.',a_caps:'Capital pro',a_caps_d:'Name 100 capitals correctly.',
 a_explorer:'Explorer',a_explorer_d:'View 50 countries in the atlas.',a_learner:'Diligent learner',a_learner_d:'Get 25 flashcards to box 4 or higher.',
 a_trotter:'Globetrotter',a_trotter_d:'Answer 100 different countries correctly.',a_world:'The whole world',a_world_d:'Get all 194 countries right at least once.'}
};
const C=COUNTRIES; const byC={},byNum={}; C.forEach(c=>{byC[c.c]=c;byNum[c.n]=c});

/* ---------- state ---------- */
const KEY='weltatlas.v1';
const defaults=()=>({settings:{lang:'de',theme:'system',diff:'easy',regions:[...REGIONS],learnRegions:[...REGIONS],view:'globe',clouds:false,deck:'cap'},rounds:[],items:{},ach:{},streak:0,bestStreak:0,cards:{},seen:{},log:[]});
let S=defaults();
try{const raw=localStorage.getItem(KEY);if(raw){const p=JSON.parse(raw);const d=defaults();S={...d,...p,settings:{...d.settings,...(p.settings||{})}}}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const L=()=>S.settings.lang;
function t(k,v){let s=(T[L()]&&T[L()][k])??T.de[k]??k;if(v)for(const x in v)s=s.split('{'+x+'}').join(v[x]);return s}
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const nf=n=>new Intl.NumberFormat(L()==='de'?'de-DE':'en-GB').format(n);
const pct=x=>Math.round(x*100)+' %';
const cname=c=>L()==='de'?c.de:c.en;
const capname=c=>L()==='de'?c.cd:c.ce;
const flag=c=>`flags/${c.c}.svg`;
const fdate=d=>new Date(d).toLocaleDateString(L()==='de'?'de-DE':'en-GB',{day:'numeric',month:'short',year:'numeric'});
function applyTheme(){const th=S.settings.theme;if(th==='system')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',th);document.documentElement.lang=L()}

/* ---------- icons ---------- */
const I={
 play:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg>',
 learn:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 5.5c3-1.3 6-1.3 9 .5 3-1.8 6-1.8 9-.5V19c-3-1.3-6-1.3-9 .5-3-1.8-6-1.8-9-.5z"/><path d="M12 6v13.5"/></svg>',
 stats:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
 badges:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></svg>',
 options:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
 cap:'<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="13" cy="13" r="10"/><path d="m13 7.5 1.6 3.4 3.7.4-2.8 2.5.8 3.7-3.3-1.9-3.3 1.9.8-3.7-2.8-2.5 3.7-.4z" fill="currentColor" stroke="none"/></svg>',
 flag:'<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 23V3"/><path d="M6 4h14l-3 4.5 3 4.5H6"/></svg>',
 mapc:'<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 5l6 2 3-2 5 3-1 5 2 4-5 4-5-2-4 2-3-5 2-4z"/></svg>',
 mapt:'<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="13" cy="13" r="9"/><circle cx="13" cy="13" r="4"/><circle cx="13" cy="13" r="1" fill="currentColor"/></svg>',
 close:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>',
 bulb:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/></svg>',
 globeI:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c2.6 2.6 2.6 15.4 0 18"/></svg>',
 mapI:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/></svg>',
 plus:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>',
 minus:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/></svg>',
 fit:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
 check:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
 pin:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
 search:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
 medal:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="7"/><path d="m12 8.5 1.1 2.3 2.5.3-1.9 1.7.5 2.5-2.2-1.3-2.2 1.3.5-2.5-1.9-1.7 2.5-.3z" fill="currentColor" stroke="none"/></svg>'
};

/* ---------- routing / shell ---------- */
const TABS=['play','learn','stats','badges','options'];
let tab='play', G=null, R=null, learnView='atlas';
const main=document.getElementById('main');
function go(name){if(!TABS.includes(name))name='play';tab=name;if(location.hash!=='#'+name){try{history.replaceState(null,'','#'+name)}catch(e){location.hash=name}}render()}
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(TABS.includes(h)&&h!==tab){tab=h;render()}});
function renderTabs(){document.getElementById('tabs').innerHTML=TABS.map(k=>`<button class="tab" data-tab="${k}" ${k===tab?'aria-current="page"':''}><span class="ic">${I[k]}</span><span>${t(k)}</span></button>`).join('');
 document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>go(b.dataset.tab))}
function render(){applyTheme();renderTabs();document.getElementById('appname').textContent=L()==='de'?'Weltatlas Quiz':'World Atlas Quiz';
 document.getElementById('topmeta').textContent=G&&tab==='play'?t('m_'+G.mode):'';
 Earth.detach();main.classList.remove('full');
 if(tab==='play'){if(G)renderGame();else if(R)renderResult();else renderHome()}
 else if(tab==='learn')renderLearn();else if(tab==='stats')renderStats();else if(tab==='badges')renderBadges();else renderSettings();
 main.scrollTop=0}
let toastT;function toast(msg){const el=document.getElementById('toast');el.innerHTML=msg;el.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove('show'),2600)}

/* ---------- filters ---------- */
function pool(mode,regs=S.settings.regions){return C.filter(c=>regs.includes(c.r)&&(mode!=='mapc'||c.m))}
function regionSummary(k='regions'){const rs=S.settings[k]||REGIONS;return rs.length===REGIONS.length?t('allRegions'):rs.map(r=>t('r_'+r)).join(', ')}
function regionChecks(k='regions'){return `<div class="checks">${REGIONS.map(r=>`<label class="check"><input type="checkbox" data-regc="${r}" data-rk="${k}" ${S.settings[k].includes(r)?'checked':''}><span class="cbox">${I.check}</span><span class="cl">${t('r_'+r)}</span><span class="cnt num">${C.filter(c=>c.r===r).length}</span></label>`).join('')}</div>`}
function diffSeg(){return `<div class="seg" role="group" aria-label="${t('difficulty')}">${['easy','hard'].map(d=>`<button data-diff="${d}" aria-pressed="${S.settings.diff===d}">${t(d)}</button>`).join('')}</div>`}
function bindRegionChecks(root,rerender){root.querySelectorAll('[data-regc]').forEach(cb=>cb.onchange=()=>{const r=cb.dataset.regc,k=cb.dataset.rk||'regions';const rs=S.settings[k].filter(x=>x!==r);if(cb.checked)rs.push(r);if(!rs.length){cb.checked=true;toast(esc(t('regionsHint')));return}S.settings[k]=REGIONS.filter(x=>rs.includes(x));save();FC.cur=null;rerender()})}
function bindDiff(root,rerender){root.querySelectorAll('[data-diff]').forEach(b=>b.onclick=()=>{S.settings.diff=b.dataset.diff;save();rerender()})}
/* ---------- home ---------- */
function bestFor(m){const rs=S.rounds.filter(r=>r.m===m);if(!rs.length)return null;return Math.max(...rs.map(r=>r.s))}
function renderHome(){
 main.innerHTML=`<div class="page gut">
  <div><div class="eyebrow">${t('play')}</div><h1 class="h1">${t('chooseMode')}</h1></div>
  <div class="setline">${diffSeg()}<button class="linkish" id="toSet"><span class="ls">${esc(regionSummary())} · <span class="num">${t('countriesN',{n:pool('cap').length})}</span></span><span class="lc">${t('change')} ›</span></button></div>
  <div class="modes">${MODES.map(m=>{const b=bestFor(m);return `<button class="mode ${m.startsWith('map')?'earthy':''}" data-mode="${m}"><span class="glyph">${I[m]}</span><b>${t('m_'+m)}</b><small>${t('m_'+m+'_d')}</small>
   <span class="best">${b==null?t('never'):`${t('best')}: <span class="num">${nf(b)}</span> / ${nf(QN*1000)}`}</span></button>`}).join('')}</div>
  <p class="sub" style="margin:0;font-size:13.5px">${t('homeSub',{n:QN})} ${t('diffHint')}</p></div>`;
 main.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>startGame(b.dataset.mode));
 bindDiff(main,renderHome);document.getElementById('toSet').onclick=()=>{openSecs.add('quiz');go('options')}}
/* ---------- game ---------- */
function weight(mode,c){const it=S.items[mode+'|'+c.c];if(!it)return 1.4;return Math.max(.35,1+it[1]*1.6-it[0]*.35)}
function sample(arr,n,wf){const a=arr.map(x=>({x,k:Math.pow(Math.random(),1/(wf?wf(x):1))}));a.sort((p,q)=>q.k-p.k);return a.slice(0,n).map(o=>o.x)}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}
function distractors(c){const same=C.filter(x=>x!==c&&x.r===c.r);let d=sample(same,3);if(d.length<3)d=d.concat(sample(C.filter(x=>x!==c&&!d.includes(x)),3-d.length));return shuffle([c,...d])}
function startGame(mode,list){const p=pool(mode);let qs;
 if(list&&list.length){let l=shuffle(list.filter(c=>mode!=='mapc'||c.m)).slice(0,QN);if(l.length<5)l=l.concat(sample(p.filter(c=>!l.includes(c)),5-l.length,c=>weight(mode,c)));qs=shuffle(l)}
 else qs=sample(p,Math.min(QN,p.length),c=>weight(mode,c));
 G={mode,rid:Date.now(),diff:S.settings.diff,regs:list&&list.length?REGIONS.filter(r=>qs.some(c=>c.r===r)):[...S.settings.regions],qs:qs.map(c=>({c,opts:S.settings.diff==='easy'&&(mode==='cap'||mode==='flag')?distractors(c):null})),i:0,ans:[],phase:'ask',pin:null,sel:null,hint:0,hid:[],flags:{}};
 R=null;render()}
const tickCls=a=>a.ok?'g':(a.pts>=400?'m':'b');
function ticksHTML(){return `<div class="ticks" aria-label="${t('qOf',{i:G.i+1,n:G.qs.length})}">${G.qs.map((q,i)=>{const a=G.ans[i];let c='';if(a)c=tickCls(a);else if(i===G.i)c='cur';return `<i class="${c}"></i>`}).join('')}</div>`}
const score=()=>G.ans.reduce((s,a)=>s+a.pts,0);
function gbarInner(){return `<button class="iconbtn" id="quit" aria-label="${t('quit')}" title="${t('quit')}">${I.close}</button>${ticksHTML()}<span class="num gscore">${nf(score())}</span>`}
function renderGame(){if(G.mode==='mapc'||G.mode==='mapt')renderMapQ();else renderQuizQ()}
function bindQuit(){const q=document.getElementById('quit');if(q)q.onclick=()=>{G=null;render()}}
function norm(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/ß/g,'ss').replace(/\bsaint\b|\bsankt\b/g,'st').replace(/[^a-z]/g,'')}
function lev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=Array.from({length:n+1},(_,i)=>i);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
function matches(input,cands){const x=norm(input);if(!x)return false;return cands.some(c=>{const y=norm(c);if(!y)return false;const tol=y.length<=4?0:y.length<=7?1:y.length<=12?2:3;return lev(x,y)<=tol})}
function cands(q){const c=q.c;return G.mode==='cap'?[c.ce,c.cd,...c.ca]:[c.en,c.de,...c.a]}
function answerText(c){return G.mode==='cap'||G.mode==='mapt'?capname(c):cname(c)}
function record(c,ok,base,extra={}){const pts=Math.round(base*HINT_MULT[G.hint]);
 G.ans[G.i]={c:c.c,ok,pts,h:G.hint,...extra};const k=G.mode+'|'+c.c;const it=S.items[k]||[0,0];it[ok?0:1]++;S.items[k]=it;
 const e={t:Date.now(),r:G.rid,m:G.mode,c:c.c,ok:ok?1:0,p:pts,h:G.hint,df:G.diff};if(extra.dist!=null)e.d=Math.round(extra.dist);if(extra.given)e.g=extra.given;else if(extra.sel&&byNum[extra.sel])e.g=byNum[extra.sel].c;
 if(!Array.isArray(S.log))S.log=[];S.log.push(e);if(S.log.length>8000)S.log.splice(0,S.log.length-8000);
 if(ok){S.streak++;S.bestStreak=Math.max(S.bestStreak,S.streak)}else S.streak=0;save();G.phase='reveal'}
function maxHints(){if(G.mode==='cap'||G.mode==='flag')return G.qs[G.i].opts?1:2;return 2}
function hintBtnHTML(){const can=G.phase==='ask'&&G.hint<maxHints();const cost=Math.round((1-HINT_MULT[Math.min(G.hint+1,2)])*100);const lbl=t('hint')+(can?' ('+t('hintCost',{p:cost})+')':'');
 return `<button class="iconbtn hintic" id="hintb" ${can?'':'disabled'} title="${lbl}" aria-label="${lbl}">${I.bulb}${can?`<span class="hbadge num">${G.hint+1}</span>`:''}</button>`}
function pattern(s){return [...s].map((ch,i)=>i===0?ch:/[\s\-’'.,()]/.test(ch)?ch:'_').join(' ').replace(/ {3}/g,'   ')}
function hintNote(){const c=G.qs[G.i].c;const out=[];
 if(G.mode==='cap'||G.mode==='flag'){const ans=answerText(c);if(G.qs[G.i].opts&&G.hint>=1)out.push(t('h_5050'));
  else{if(G.hint>=1)out.push(t('h_cont',{c:t('r_'+c.r),n:[...ans].filter(ch=>/\p{L}/u.test(ch)).length}));if(G.hint>=2)out.push(t('h_letter',{p:'<span class="num">'+esc(pattern(ans))+'</span>'}))}}
 else{if(G.hint>=1)out.push(G.mode==='mapc'?t('h_region',{c:t('r_'+c.r)}):t('h_country',{c:esc(cname(c))}));if(G.hint>=2)out.push(t('h_circle'))}
 return out}
function renderQuizQ(){const q=G.qs[G.i],c=q.c,a=G.ans[G.i],rev=G.phase==='reveal';
 const prompt=G.mode==='cap'?`<span class="ask">${t('capOf')}</span><img class="flagmid" src="${flag(c)}" alt=""><div class="big">${esc(cname(c))}</div>`
  :`<span class="ask">${t('whichCountry')}</span><img class="flagbig" src="${flag(c)}" alt="Flag">`;
 let body='';
 if(q.opts){body=`<div class="opts">${q.opts.map((o,i)=>{let cl='';const hid=!rev&&G.hid.includes(o.c);if(rev){if(o===c)cl='ok';else if(a.given===o.c)cl='no'}
   return `<button class="opt ${cl} ${hid?'gone':''}" data-o="${o.c}" ${rev||hid?'disabled':''}><span class="k">${i+1}</span>${G.mode==='flag'&&rev?`<img class="flagsm" src="${flag(o)}" alt="">`:''}<span>${esc(answerText(o))}</span></button>`}).join('')}</div>`}
 else if(!rev){body=`<form class="answer" id="af"><input id="ans" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="${G.mode==='cap'?t('typeCap'):t('typeCountry')}" aria-label="${G.mode==='cap'?t('typeCap'):t('typeCountry')}"><button class="btn primary" type="submit">${t('check')}</button><button class="btn" type="button" id="skip">${t('skip')}</button></form>`}
 const notes=hintNote();
 let verdict='';if(rev){verdict=`<div class="verdict ${a.ok?'ok':'no'}"><span class="dot ${a.ok?'g':'b'}"></span><span class="vt">${a.ok?t('correct')+': '+esc(answerText(c)):t('wrong',{a:'<b>'+esc(answerText(c))+'</b>'})}${!q.opts&&!a.ok&&a.typed?` <span style="color:var(--muted)">· ${t('youSaid',{a:esc(a.typed)})}</span>`:''}</span><span class="pts">+${nf(a.pts)}</span><button class="btn primary" id="next">${G.i===G.qs.length-1?t('finish'):t('next')} →</button></div>`}
 main.innerHTML=`<div class="page gut game"><div class="gbar">${gbarInner()}${rev?'':hintBtnHTML()}</div>
  <div class="qcard">${prompt}</div>${notes.length&&!rev?`<div class="hintnote">${I.bulb}<span>${notes.join(' · ')}</span></div>`:''}${verdict}${body}</div>`;
 bindQuit();
 const hb=document.getElementById('hintb');if(hb)hb.onclick=()=>{G.hint++;if(q.opts){G.hid=shuffle(q.opts.filter(o=>o!==c)).slice(0,2).map(o=>o.c)}renderQuizQ()};
 main.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{if(G.phase!=='ask')return;const ok=b.dataset.o===c.c;record(c,ok,ok?1000:0,{given:b.dataset.o});renderQuizQ()});
 const f=document.getElementById('af');if(f){const inp=document.getElementById('ans');setTimeout(()=>inp.focus({preventScroll:true}),30);
  f.onsubmit=e=>{e.preventDefault();const v=inp.value.trim();if(!v)return;const ok=matches(v,cands(q));record(c,ok,ok?1000:0,{typed:v});renderQuizQ()};
  document.getElementById('skip').onclick=()=>{record(c,false,0,{typed:''});renderQuizQ()}}
 const n=document.getElementById('next');if(n){n.onclick=nextQ;setTimeout(()=>n.focus({preventScroll:true}),30)}}
function nextQ(){if(G.i<G.qs.length-1){G.i++;G.phase='ask';G.pin=null;G.sel=null;G.hint=0;G.hid=[];renderGame()}else finishGame()}
document.addEventListener('keydown',e=>{if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
 if(tab==='learn'&&learnView==='cards'){if(e.key===' '){e.preventDefault();const f=document.getElementById('flash');if(f&&!FC.flipped)f.click()}else if(FC.flipped&&(e.key==='1'||e.key==='2')){const b=document.getElementById(e.key==='1'?'fcNo':'fcYes');if(b)b.click()}return}
 if(tab!=='play'||!G)return;const q=G.qs[G.i];
 if(G.phase==='ask'&&q.opts&&/^[1-4]$/.test(e.key)){const b=main.querySelectorAll('[data-o]')[+e.key-1];if(b&&!b.disabled)b.click()}
 else if(e.key==='Enter'&&G.phase==='ask'&&G.pin&&(G.mode==='mapc'||G.mode==='mapt')){e.preventDefault();submitMap()}});

/* ---------- earth stage (shared by game + atlas) ---------- */
function stageHTML(inner){return `<div class="stage" id="stage"><div class="loading" id="eload"><div class="spinner"></div><span>${t('loading')}</span></div>
 <div class="viewtog seg" role="group" aria-label="${t('globe')} / ${t('map')}"><button data-v="globe" aria-pressed="${S.settings.view==='globe'}">${I.globeI}<span>${t('globe')}</span></button><button data-v="map" aria-pressed="${S.settings.view==='map'}">${I.mapI}<span>${t('map')}</span></button></div>
 <div class="zoomctl"><button id="zin" aria-label="${t('zoomIn')}" title="${t('zoomIn')}">${I.plus}</button><button id="zout" aria-label="${t('zoomOut')}" title="${t('zoomOut')}">${I.minus}</button><button id="zfit" aria-label="${t('zoomFit')}" title="${t('zoomFit')}">${I.fit}</button></div>
 ${inner}</div>`}
function mountEarth(onReady,fitFn){const st=document.getElementById('stage');
 if(!Earth.supported()){st.querySelector('#eload').innerHTML=`<p class="nogl">${t('noGL')}</p>`;return}
 Earth.init().then(()=>{const s=document.getElementById('stage');if(!s||s!==st)return;s.querySelector('#eload')?.remove();
  Earth.attach(s);Earth.setClouds(!!S.settings.clouds);Earth.setView(S.settings.view,false);
  Earth.on('view',v=>{S.settings.view=v;save();s.querySelectorAll('[data-v]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v))});
  s.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{Earth.setView(b.dataset.v);setTimeout(fitFn,40)});
  s.querySelector('#zin').onclick=()=>Earth.zoomBy(.6);s.querySelector('#zout').onclick=()=>Earth.zoomBy(1.6);s.querySelector('#zfit').onclick=fitFn;
  onReady(s)}).catch(()=>{const l=st.querySelector('#eload');if(l)l.innerHTML=`<p class="nogl">${t('noGL')}</p>`})}
const capLL=c=>[c.ll[1],c.ll[0]];
function focusPts(regs){return pool('cap',regs).map(capLL)}

/* ---------- map question ---------- */
function renderMapQ(){
 const q=G.qs[G.i],c=q.c,easy=G.diff==='easy',city=G.mode==='mapt';
 main.classList.add('full');
 main.innerHTML=`<div class="mapview"><div class="gbar gut mapbar">${gbarInner()}</div>
  ${stageHTML(`<div class="prompt"><div class="glass"><img class="flagsm" src="${flag(c)}" alt="" ${!easy?'hidden':''}><div style="min-width:0"><div class="ask">${t('find')} · ${t('qOf',{i:G.i+1,n:G.qs.length})}</div><div class="big">${esc(city?capname(c):cname(c))}</div>${city&&easy?`<div class="ctry">${esc(cname(c))}</div>`:''}</div></div></div>
   <div class="hintwrap" id="hintwrap"></div>
   <div class="actbar" id="act"></div>`)}</div>`;
 bindQuit();renderAct();
 mountEarth(()=>{Earth.clearAll();Earth.setBorders(easy);Earth.setHover(easy&&!city);
  Earth.on('tap',ll=>{if(G.phase!=='ask')return;
   if(!city){const hit=Earth.findCountry(ll,24);G.pin=hit?hit.ll:ll;G.sel=hit?hit.id:null}else{G.pin=ll;const h=Earth.containsAt(ll);G.sel=h?h.id:null}
   Earth.setPin(G.pin);applyMapOverlay();renderAct()});
  if(G.phase==='reveal')drawReveal(0);else{applyMapOverlay();if(G.pin)Earth.setPin(G.pin);if(G.hint)hintView(0);else Earth.flyTo(focusPts(G.regs),{dur:G.i?700:0})}
 },()=>{if(G.phase==='reveal')drawReveal(500);else Earth.flyTo(focusPts(G.regs),{dur:500})})}
function hintCircle(){const c=G.qs[G.i].c;if(!G.circle){const city=G.mode==='mapt';const km=city?320:Math.max(420,Math.sqrt(Earth.countryArea(c.n))*.9);
  const ref=city?capLL(c):(Earth.countryPts(c.n)[0]||capLL(c));const dest=d3.geoRotation([-ref[0],-ref[1]]).invert(d3.geoCircle().center([0,0]).radius(km*.45/111.2*Math.random())().coordinates[0][Math.random()*32|0]);
  G.circle={ll:dest,km}}return G.circle}
function applyMapOverlay(){const c=G.qs[G.i].c,easy=G.diff==='easy',city=G.mode==='mapt';const o={};
 if(G.hint>=1){if(city)o.hintCountry=c.n;else o.region=c.r}if(G.hint>=2)o.circle=hintCircle();
 if(easy&&G.sel&&!city)o.sel=G.sel;Earth.setOverlay(o);Earth.setOutline(easy&&G.sel&&!city?G.sel:null)}
function hintView(dur=900){const c=G.qs[G.i].c,city=G.mode==='mapt';
 if(G.hint>=2){const ci=hintCircle();Earth.flyTo([ci.ll],{minKm:ci.km*1.6,dur})}
 else if(city)Earth.flyTo(Earth.countryPts(c.n).concat([capLL(c)]),{dur,minKm:250});
 else Earth.flyTo(pool('cap',[c.r]).map(capLL),{dur})}
function renderAct(){const act=document.getElementById('act');if(!act)return;const a=G.ans[G.i],easy=G.diff==='easy',city=G.mode==='mapt';
 const hw=document.getElementById('hintwrap');
 if(hw){const n=hintNote();hw.innerHTML=G.phase==='ask'?`${n.length?`<div class="glass hintnote">${I.bulb}<span>${n[n.length-1]}</span></div>`:''}`:''}
 if(G.phase==='ask'){let label;
  if(!G.pin)label=`<span class="msg">${I.pin}${t('tapEarth')}</span>`;
  else label=`<span class="msg sel"><b>${t('pinSet')}</b></span>`;
  act.innerHTML=`<div class="glass actin">${hintBtnHTML()}${label}<button class="btn primary cta" id="conf" ${G.pin?'':'disabled'}>${I.check}<span>${t('confirm')}</span></button></div>`;
  document.getElementById('conf').onclick=submitMap;
  const hb=document.getElementById('hintb');if(hb)hb.onclick=()=>{G.hint++;applyMapOverlay();hintView();renderAct()}}
 else{const last=G.i===G.qs.length-1;const c=G.qs[G.i].c;
  act.innerHTML=`<div class="glass actin res"><span class="dot ${tickCls(a)}"></span><div class="resv"><b class="num">+${nf(a.pts)}</b><span>${a.inside?t('inside'):t('kmAway',{d:nf(Math.round(a.dist))})}${city?' · '+esc(capname(c)):!a.inside?' · '+esc(cname(c)):''}</span></div><button class="btn primary cta" id="next"><span>${last?t('finish'):t('next')}</span> →</button></div>`;
  const n=document.getElementById('next');n.onclick=nextQ;setTimeout(()=>n.focus({preventScroll:true}),30)}}
function mapScore(d,city){if(city)return d<=75?1000:Math.round(1000*Math.exp(-(d-75)/1500));return Math.min(950,Math.round(1000*Math.exp(-d/1500)))}
function submitMap(){if(!G.pin||G.phase!=='ask')return;const c=G.qs[G.i].c,city=G.mode==='mapt';let dist,near,inside=false;
 if(city){near=capLL(c);dist=d3.geoDistance(G.pin,near)*6371}
 else if(G.sel===c.n){dist=0;near=G.pin;inside=true}
 else{const r=Earth.distToCountry(c.n,G.pin);dist=r.d;near=r.pt||G.pin;inside=r.inside}
 const base=inside?1000:mapScore(dist,city);const ok=city?dist<200:(inside||dist<100);if(city&&dist<25)G.flags.bull=true;
 record(c,ok,base,{dist,inside,near,pin:G.pin,sel:G.sel});drawReveal(900);renderAct();
 const b=main.querySelector('.gscore');if(b)b.textContent=nf(score());const tk=main.querySelector('.ticks');if(tk)tk.outerHTML=ticksHTML()}
function drawReveal(dur){const a=G.ans[G.i],c=G.qs[G.i].c,city=G.mode==='mapt';const tll=capLL(c);
 Earth.setOverlay({target:city?null:c.n,miss:!city&&!a.inside&&a.sel&&a.sel!==c.n?a.sel:null,hintCountry:city?c.n:null});
 Earth.setOutline(c.n,city?0xffd27a:0x7dffc0);Earth.removeMarkers();
 if(city)Earth.addMarker('ring',tll,{color:0x3CC887});
 Earth.addMarker('pin',a.pin);if(!a.inside)Earth.setArc(a.pin,a.near);else Earth.setArc(null);
 const pts=[a.pin,a.near];if(city)pts.push(tll);else pts.push(...Earth.countryPts(c.n).slice(0,12));Earth.flyTo(pts,{dur,minKm:city?150:200})}

/* ---------- finish / achievements ---------- */
const ACH=[
 {id:'first',goal:1,v:()=>S.rounds.length},{id:'ten',goal:10,v:()=>S.rounds.length},{id:'fifty',goal:50,v:()=>S.rounds.length},
 {id:'allModes',goal:4,v:()=>new Set(S.rounds.map(r=>r.m)).size},
 {id:'perfect',ev:r=>(r.m==='cap'||r.m==='flag')&&r.n>=10&&r.ok===r.n},
 {id:'perfectHard',ev:r=>(r.m==='cap'||r.m==='flag')&&r.df==='hard'&&r.n>=10&&r.ok===r.n},
 {id:'carto',ev:r=>(r.m==='mapc'||r.m==='mapt')&&r.s>=9000},
 {id:'bull',ev:(r,fl)=>fl&&fl.bull},
 {id:'nohint',ev:r=>r.ok>=8&&!r.hn},
 {id:'streak',goal:15,v:()=>S.bestStreak},
 {id:'flags',goal:100,v:()=>sumRight('flag')},{id:'caps',goal:100,v:()=>sumRight('cap')},
 {id:'explorer',goal:50,v:()=>Object.keys(S.seen).length},
 {id:'learner',goal:25,v:()=>Object.values(S.cards).filter(x=>x[0]>=4).length},
 {id:'trotter',goal:100,v:()=>distinctRight()},{id:'world',goal:194,v:()=>distinctRight()}];
function sumRight(m){let s=0;for(const k in S.items)if(k.startsWith(m+'|'))s+=S.items[k][0];return s}
function distinctRight(){const s=new Set();for(const k in S.items)if(S.items[k][0]>0)s.add(k.split('|')[1]);return s.size}
function checkAch(round,flags){const fresh=[];const now=new Date().toISOString();
 for(const a of ACH){if(S.ach[a.id])continue;const got=a.ev?(round&&a.ev(round,flags)):a.v()>=a.goal;if(got){S.ach[a.id]=now;fresh.push(a.id)}}return fresh}
function announce(fresh){fresh.forEach((id,i)=>setTimeout(()=>toast(I.medal+' '+esc(t('newBadge',{t:t('a_'+id)}))),400+i*2800))}
function finishGame(){const s=score(),ok=G.ans.filter(a=>a.ok).length,hn=G.ans.reduce((x,a)=>x+(a.h||0),0);
 const round={d:new Date().toISOString(),m:G.mode,df:G.diff,s,mx:G.qs.length*1000,ok,n:G.qs.length,rg:G.regs.join(' '),hn,rid:G.rid};
 const ds=G.ans.filter(a=>a.dist!=null);if(ds.length)round.ad=Math.round(ds.reduce((x,a)=>x+(a.inside?0:a.dist),0)/ds.length);
 S.rounds.push(round);const fresh=checkAch(round,G.flags);save();
 R={round,qs:G.qs.map(q=>q.c),ans:G.ans,mode:G.mode};G=null;render();announce(fresh)}
function renderResult(){const r=R.round,map=R.mode==='mapc'||R.mode==='mapt';
 main.innerHTML=`<div class="page gut">
  <div><div class="eyebrow">${t('roundDone')} · ${t('m_'+R.mode)} · ${t(r.df)}</div>
  <div class="scorehead"><span class="total num">${nf(r.s)}</span><span class="of">/ ${nf(r.mx)} ${t('points')}</span></div>
  <p class="sub">${t('correctN',{c:r.ok,n:r.n})}${r.hn?' · '+t('hintsUsed',{h:r.hn}):''}</p></div>
  <div class="list">${R.ans.map((a,i)=>{const c=R.qs[i];
   const sub=map?(a.inside?t('inside'):t('kmAway',{d:nf(Math.round(a.dist))})):(R.mode==='cap'?esc(capname(c)):'');
   return `<div class="li"><img class="flagsm" src="${flag(c)}" alt=""><div><div class="t"><span class="dot ${tickCls(a)}"></span>${esc(R.mode==='mapt'?capname(c):cname(c))}${a.h?` <span class="hintmark" title="${t('hint')}">${I.bulb}</span>`:''}</div><div class="s">${R.mode==='mapt'?esc(cname(c))+' · ':''}${sub}</div></div><div class="p">${nf(a.pts)}</div></div>`}).join('')}</div>
  ${wrongOf(R).length?`<div class="row"><button class="btn" id="retry">${I.bulb}${t('retryWrong')}</button><button class="btn" id="w2c" ${R.saved?'disabled':''}>${R.saved?I.check+t('saved'):I.learn+t('wrongToCards')}</button></div>`:''}
  <div class="row"><button class="btn primary" id="again">${t('again')}</button><button class="btn" id="menu">${t('menu')}</button></div></div>`;
 document.getElementById('again').onclick=()=>startGame(R.mode);document.getElementById('menu').onclick=()=>{R=null;render()};
 const rt=document.getElementById('retry');if(rt)rt.onclick=()=>startGame(R.mode,wrongOf(R));
 const wc=document.getElementById('w2c');if(wc)wc.onclick=()=>{const n=addCards(wrongOf(R),[deckFor(R.mode)]);R.saved=true;toast(I.learn+' '+esc(t('cardsAdded',{n})));renderResult()}}
function wrongOf(Rr){return Rr.ans.map((a,i)=>a.ok?null:Rr.qs[i]).filter(Boolean)}
const deckFor=m=>m==='cap'||m==='mapt'?'cap':'flag';
function addCards(cs,decks){let n=0;const now=Date.now();for(const c of cs)for(const d of decks){const k=d+'|'+c.c;S.cards[k]=[1,now];n++}FC.cur=null;const f=checkAch(null);save();announce(f);return n}

/* ---------- learn ---------- */
function learnSwitch(){return `<div class="seg learnseg" role="group">${['atlas','cards'].map(v=>`<button data-lv="${v}" aria-pressed="${learnView===v}">${t(v)}</button>`).join('')}</div>`}
function bindLearnSwitch(){main.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{learnView=b.dataset.lv;render()})}
function renderLearn(){if(learnView==='atlas')renderAtlas();else renderCards()}
let AT={sel:null};
function atlasPick(c){AT.sel=c;if(c&&!S.seen[c.c]){S.seen[c.c]=1;const f=checkAch(null);save();announce(f)}atlasInfo();atlasDraw(true)}
function renderAtlas(){main.classList.add('full');
 const opts=C.slice().sort((a,b)=>cname(a).localeCompare(cname(b),L())).map(c=>`<option value="${esc(cname(c))}"></option>`).join('');
 main.innerHTML=`<div class="mapview"><div class="gbar gut mapbar">${learnSwitch()}<form class="searchf" id="sf">${I.search}<input id="sq" list="clist" placeholder="${t('search')}" aria-label="${t('search')}" autocomplete="off"><datalist id="clist">${opts}</datalist></form></div>
  ${stageHTML(`<div class="prompt atlasprompt" id="aprompt" hidden><div class="glass atlascard" id="ainfo"></div></div>`)}</div>`;
 bindLearnSwitch();atlasInfo();
 document.getElementById('sf').onsubmit=e=>{e.preventDefault();const v=norm(document.getElementById('sq').value);if(!v)return;const c=C.find(x=>norm(x.de)===v||norm(x.en)===v)||C.find(x=>norm(x.de).startsWith(v)||norm(x.en).startsWith(v));if(c){atlasPick(c);document.getElementById('sq').blur()}};
 document.getElementById('sq').oninput=e=>{const v=norm(e.target.value);const c=C.find(x=>norm(cname(x))===v);if(c)atlasPick(c)};
 mountEarth(()=>{Earth.clearAll();Earth.setBorders(true);Earth.setHover(true);
  Earth.on('tap',ll=>{const h=Earth.findCountry(ll,24);const c=h?byNum[h.id]:null;atlasPick(c||null)});
  if(AT.sel)atlasDraw(false);else Earth.flyTo(focusPts(REGIONS),{dur:0})},()=>{if(AT.sel)atlasDraw(true);else Earth.flyTo(focusPts(REGIONS))})}
function cardRoom(){const st=document.getElementById('stage'),cd=document.getElementById('ainfo');if(!st||!cd||!cd.offsetHeight)return{};const f=Math.min(.7,(cd.offsetHeight+16)/st.clientHeight);return{shiftY:f*.5,fit:Math.max(.3,1-f)}}
function atlasDraw(anim){const c=AT.sel;Earth.removeMarkers();
 if(!c){Earth.setOverlay({});Earth.setOutline(null);return}
 Earth.setOverlay(c.m?{sel:c.n}:{});Earth.setOutline(c.m?c.n:null);Earth.addMarker('ring',capLL(c),{color:0xffffff,px:20});
 Earth.flyTo(c.m?Earth.countryPts(c.n).concat([capLL(c)]):[capLL(c)],{dur:anim?900:0,minKm:c.m?350:500,maxDist:3,...cardRoom()})}
const loc=()=>L()==='de'?'de-DE':'en-GB';
const compact=n=>new Intl.NumberFormat(loc(),{notation:'compact',maximumFractionDigits:n<1e6?0:1}).format(n);
const usd=(n,c)=>new Intl.NumberFormat(loc(),{style:'currency',currency:'USD',notation:c?'compact':'standard',maximumFractionDigits:c?1:0}).format(n);
/* exchange rates vs euro: built-in snapshot, refreshed from jsDelivr when online */
let FXL=FX;try{const c=JSON.parse(localStorage.getItem('geoquiz-fx')||'null');if(c&&c.r&&c.date>FXL.date)FXL=c}catch(e){}
const FXSYM=(()=>{const n={};for(const k in CURR){const y=CURR[k][2];if(y)n[y]=(n[y]||0)+1}return n})();
const fxSym=k=>{const y=CURR[k]&&CURR[k][2];return y&&FXSYM[y]===1?y:k};
const fxDate=()=>new Date(FXL.date+'T12:00:00Z').toLocaleDateString(loc(),{day:'numeric',month:'short',year:'numeric'});
function fxFmt(v){const o=v>=100?{maximumFractionDigits:0}:v>=1?{maximumFractionDigits:2}:{maximumSignificantDigits:3};return new Intl.NumberFormat(loc(),o).format(v)}
function fxText(k){const r=FXL.r[k];if(!r)return'';const y=fxSym(k);
 if((S.settings.fxDir||'eur')==='eur')return`<span><b>1 €</b> = <b>${fxFmt(r)} ${esc(y)}</b></span>`;
 const v=1/r;let x=`<span><b>1 ${esc(y)}</b> = <b>${fxFmt(v)} €</b></span>`;
 if(v<.01){const n=10**Math.ceil(Math.log10(1/v));x+=`<small>${nf(n)} ${esc(y)} ≈ ${new Intl.NumberFormat(loc(),{minimumFractionDigits:2,maximumFractionDigits:2}).format(n*v)} €</small>`}
 return x}
function fxRow(c){const ks=c.cu.filter(k=>k!=='EUR'&&FXL.r[k]);if(!ks.length)return'';
 return`<div class="wide"><dt>${t('fxTitle')}</dt><dd class="fxs">${ks.map(k=>`<button class="fx" data-fx="${k}" aria-label="${t('fxSwap')}" title="${t('fxSwap')}"><span class="fxv">${fxText(k)}</span><span class="fxi" aria-hidden="true">⇄</span></button>`).join('')}</dd></div>`}
function fxPaint(){document.querySelectorAll('.fx[data-fx]').forEach(b=>{const v=b.querySelector('.fxv');if(v)v.innerHTML=fxText(b.dataset.fx)})}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.fx[data-fx]');if(!b)return;S.settings.fxDir=(S.settings.fxDir||'eur')==='eur'?'loc':'eur';save();fxPaint()});
(function fxRefresh(){if(!window.fetch)return;fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.min.json').then(r=>r.ok?r.json():null).then(d=>{if(!d||!d.eur||!d.date||!(d.date>FXL.date))return;const r={};for(const k in FXL.r){const v=+d.eur[k.toLowerCase()];r[k]=v>0?v:FXL.r[k]}FXL={date:d.date,r};try{localStorage.setItem('geoquiz-fx',JSON.stringify(FXL))}catch(e){}fxPaint()}).catch(()=>{})})();
function factsHTML(c){const li=L()==='de'?0:1;
 const langs=c.ln.map(k=>LANGS[k]?LANGS[k][li]:k);const cur=c.cu.map(k=>CURR[k]?`${CURR[k][li]}${CURR[k][2]?' ('+CURR[k][2]+')':''}`:k);
 const f=(k,v,cls='')=>`<div class="${cls}"><dt>${t(k)}</dt><dd>${v}</dd></div>`;
 const key=`<dl class="facts">${f('capital',esc(capname(c)))}${f('population',`<span class="num">${compact(c.p)}</span>`)}${f('languages',esc(langs.join(', ')),'wide')}</dl>`;
 const more=`<dl class="facts more">
  ${f('area',`<span class="num">${nf(c.ar)}</span> km²`)}${f('density',`<span class="num">${c.p/Math.max(1,c.ar)<1?'< 1':nf(Math.round(c.p/Math.max(1,c.ar)))}</span> ${t('perKm')}`)}
  ${f('currency',esc(cur.join(', ')))}${fxRow(c)}${c.g?f('gdp',`<span class="num">${usd(c.g*1e6,true)}</span>`)+f('gdppc',`<span class="num">${usd(c.g*1e6/c.p,false)}</span>`):''}
  ${f('region',esc(c.sr[li]))}${f('sea',c.lk?t('noLand'):t('yes'))}
  ${f(c.tz.length>1?'tzs':'tz',`<span class="num">${c.tz.join(c.tzr?' … ':', ')}</span>`)}${f('dial',`<span class="num">${esc(c.dial)}</span>`)}${f('tld',`<span class="num">${esc(c.tld)}</span>`)}
  ${f(L()==='de'?'inEnglish':'inGerman',esc(L()==='de'?c.en+(c.ce!==c.cd?' · '+c.ce:''):c.de+(c.ce!==c.cd?' · '+c.cd:'')))}
  <div class="wide"><dt>${t('neighbors')}</dt><dd>${c.nb.length?`<span class="nbs">${c.nb.map(x=>byC[x]).filter(Boolean).sort((a,b)=>cname(a).localeCompare(cname(b),L())).map(n=>`<button class="nb" data-nb="${n.c}"><img src="${flag(n)}" alt="">${esc(cname(n))}</button>`).join('')}</span>`:t('noNeighbors')}</dd></div>
  <p class="note wide">${t('dataNote')}${c.cu.some(k=>k!=='EUR'&&FXL.r[k])?' '+t('fxNote').replace('{d}',fxDate()):''}</p></dl>`;
 return {key,more}}
function atlasInfo(){const el=document.getElementById('ainfo'),wrap=document.getElementById('aprompt');if(!el)return;const c=AT.sel;
 wrap.hidden=!c;if(!c){el.innerHTML='';return}
 el.classList.toggle('mini',!!AT.min);
 if(AT.min){el.innerHTML=`<button class="apill" id="aexp" aria-expanded="false" aria-label="${t('showInfo')}"><img class="flagsm" src="${flag(c)}" alt=""><b>${esc(cname(c))}</b><span class="pillhint">${t('showInfo')}</span><span class="chev" aria-hidden="true">⌄</span></button><button class="iconbtn" id="aclose" aria-label="${t('cancel')}">${I.close}</button>`;
  document.getElementById('aexp').onclick=()=>{AT.min=false;atlasInfo();atlasDraw(true)};
  document.getElementById('aclose').onclick=()=>{AT.sel=null;atlasInfo();atlasDraw(false)};return}
 const fx=factsHTML(c);
 el.innerHTML=`<div class="ahead"><img class="flagmid" src="${flag(c)}" alt=""><div class="aname"><div class="big">${esc(cname(c))}</div><div class="asub">${esc(c.sr[L()==='de'?0:1])} · ${t('r_'+c.r)}</div></div><button class="iconbtn" id="amin" aria-expanded="true" aria-label="${t('hideInfo')}" title="${t('hideInfo')}"><span class="chev up" aria-hidden="true">⌄</span></button><button class="iconbtn" id="aclose" aria-label="${t('cancel')}">${I.close}</button></div>
  ${fx.key}<details class="moreinfo" id="amore" ${AT.more?'open':''}><summary>${t('moreInfo')}<span class="chev" aria-hidden="true">⌄</span></summary>${fx.more}</details>`;
 document.getElementById('amin').onclick=()=>{AT.min=true;atlasInfo();atlasDraw(true)};
 document.getElementById('aclose').onclick=()=>{AT.sel=null;atlasInfo();atlasDraw(false)};
 document.getElementById('amore').ontoggle=e=>{if(AT.more!==e.target.open){AT.more=e.target.open;atlasDraw(true)}};
 el.querySelectorAll('[data-nb]').forEach(b=>b.onclick=()=>atlasPick(byC[b.dataset.nb]))}
/* flashcards (Leitner) */
const BOXT=[0,10*60e3,864e5,3*864e5,7*864e5,16*864e5];
const FC={cur:null,flipped:false,last:null,extra:false};
function deckPool(){return pool('cap',S.settings.learnRegions)}
function cardOf(c){return S.cards[S.settings.deck+'|'+c.c]}
function nextCard(){const now=Date.now(),p=deckPool();const due=[],fresh=[];
 for(const c of p){const k=cardOf(c);if(!k)fresh.push(c);else if(k[1]<=now)due.push({c,k})}
 const avoid=x=>x!==FC.last||p.length<2;
 const dd=due.filter(x=>avoid(x.c)).sort((a,b)=>a.k[0]-b.k[0]||a.k[1]-b.k[1]);
 if(dd.length&&(dd[0].k[0]<=1||!fresh.length||Math.random()<.65))return dd[0].c;
 const ff=fresh.filter(avoid);if(ff.length)return ff[Math.random()*ff.length|0];
 if(dd.length)return dd[0].c;
 if(FC.extra){const all=p.filter(avoid).sort((a,b)=>(cardOf(a)?.[0]??0)-(cardOf(b)?.[0]??0)||Math.random()-.5);return all[0]||null}
 return null}
function boxCounts(deck){const p=deckPool();const n=[0,0,0,0,0,0];for(const c of p){const k=S.cards[deck+'|'+c.c];n[k?k[0]:0]++}return n}
function boxBar(n){const tot=n.reduce((a,b)=>a+b,0)||1;return `<div class="boxbar">${n.map((v,i)=>v?`<i class="b${i}" style="flex:${v}" title="${i?t('boxN',{n:i}):t('box0')}: ${v}"></i>`:'').join('')}</div>
 <div class="boxlegend">${n.map((v,i)=>`<span><i class="b${i}"></i>${i===0?t('box0'):i===5?t('mastered'):t('boxN',{n:i})} <b class="num">${v}</b></span>`).join('')}</div>`}
function renderCards(){if(!FC.cur)FC.cur=nextCard();const c=FC.cur,deck=S.settings.deck;
 const now=Date.now();const dueN=deckPool().filter(x=>{const k=cardOf(x);return k&&k[1]<=now}).length;
 main.innerHTML=`<div class="page gut game">
  <div class="cardhead">${learnSwitch()}<div class="seg" role="group" aria-label="${t('deck')}">${['cap','flag'].map(d=>`<button data-deck="${d}" aria-pressed="${deck===d}">${t('deck_'+d)}</button>`).join('')}</div></div>
  <div id="fcwrap">${c?flashHTML(c):`<div class="empty">${I.check}<b>${t('allDone')}</b><span>${t('allDoneSub')}</span><button class="btn primary" id="more">${t('keepGoing')}</button></div>`}</div>
  <div class="panel compactp"><div class="row" style="justify-content:space-between"><span class="eyebrow">${t('due',{n:dueN})}</span></div>${boxBar(boxCounts(deck))}</div>
  <details class="sect"><summary><span><b>${t('howCards')}</b></span><span class="chev" aria-hidden="true">⌄</span></summary><div class="sbody"><p class="sub" style="margin:0">${t('cardsSub')}</p></div></details></div>`;
 bindLearnSwitch();
 main.querySelectorAll('[data-deck]').forEach(b=>b.onclick=()=>{S.settings.deck=b.dataset.deck;save();FC.cur=null;FC.flipped=false;FC.extra=false;renderCards()});
 const more=document.getElementById('more');if(more)more.onclick=()=>{FC.extra=true;FC.cur=null;renderCards()};
 const f=document.getElementById('flash');if(f){f.onclick=()=>{if(FC.flipped)return;FC.flipped=true;f.classList.add('flipped');document.getElementById('fcgrade').classList.add('on');setTimeout(()=>document.getElementById('fcYes')?.focus({preventScroll:true}),350)};
  const grade=okk=>{const key=deck+'|'+c.c;const k=S.cards[key]||[0,0];const b=okk?Math.min(5,k[0]+1):1;S.cards[key]=[b,Date.now()+(okk?BOXT[b]:60e3)];
   const fr=checkAch(null);save();announce(fr);FC.last=c;FC.cur=nextCard();FC.flipped=false;renderCards()};
  document.getElementById('fcYes').onclick=e=>{e.stopPropagation();if(FC.flipped)grade(true)};document.getElementById('fcNo').onclick=e=>{e.stopPropagation();if(FC.flipped)grade(false)}}}
function flashHTML(c){const deck=S.settings.deck,k=cardOf(c),box=k?k[0]:0;
 const front=deck==='cap'?`<span class="ask">${t('whatCap')}</span><img class="flagmid" src="${flag(c)}" alt=""><div class="big">${esc(cname(c))}</div>`
  :`<span class="ask">${t('whatCountry')}</span><img class="flagbig" src="${flag(c)}" alt="Flag">`;
 const back=deck==='cap'?`<span class="ask">${t('capital')}</span><div class="big">${esc(capname(c))}</div><span class="sub2">${esc(cname(c))} · ${t('r_'+c.r)}</span>`
  :`<img class="flagmid" src="${flag(c)}" alt=""><div class="big">${esc(cname(c))}</div><span class="sub2">${t('capital')}: ${esc(capname(c))} · ${t('r_'+c.r)}</span>`;
 return `<div class="flashwrap"><button class="flash ${FC.flipped?'flipped':''}" id="flash" aria-label="${t('flip')}"><span class="flash-in">
   <span class="face front"><span class="boxtag"><i class="b${box}"></i>${box===0?t('box0'):t('boxN',{n:box})}</span>${front}<span class="tip">${t('tapFlip')}</span></span>
   <span class="face back">${back}</span></span></button>
  <div class="row grade ${FC.flipped?'on':''}" id="fcgrade"><button class="btn no" id="fcNo"><span class="k">1</span>${t('unknown')}</button><button class="btn primary" id="fcYes"><span class="k">2</span>${t('known')}</button></div></div>`}

/* ---------- stats ---------- */
const MCOL={cap:'var(--m-cap)',flag:'var(--m-flag)',mapc:'var(--m-mapc)',mapt:'var(--m-mapt)'};
const STC={good:'var(--good)',mid:'var(--mid)',bad:'var(--bad)',new:'var(--unk)'};
const STCANVAS={good:'rgba(52,196,128,.62)',mid:'rgba(242,181,48,.62)',bad:'rgba(236,88,66,.68)',new:'rgba(150,162,172,.34)'};
const SST={mode:'all',sel:null,flown:false,hide:{radar:[],line:[],hist:[]}};
function rwOf(mode,cc){if(mode==='all'){let r=0,w=0;for(const m of MODES){const it=S.items[m+'|'+cc];if(it){r+=it[0];w+=it[1]}}return r+w?[r,w]:null}return S.items[mode+'|'+cc]||null}
function lastOk(mode,cc){const L2=S.log||[];for(let i=L2.length-1;i>=0;i--){const e=L2[i];if(e.c===cc&&(mode==='all'||e.m===mode))return !!e.ok}return true}
function status(mode,cc){const x=rwOf(mode,cc);if(!x)return 'new';const [r,w]=x;if(w>r)return 'bad';if(w===0||(r/(r+w)>=.75&&lastOk(mode,cc)))return 'good';return 'mid'}
const statPool=mode=>mode==='mapc'?C.filter(c=>c.m):C;
function statusCounts(mode){const n={good:0,mid:0,bad:0,new:0};for(const c of statPool(mode))n[status(mode,c.c)]++;return n}
function regionAcc(mode){return REGIONS.map(r=>{let x=0,y=0;for(const c of C){if(c.r!==r)continue;const v=rwOf(mode,c.c);if(v){x+=v[0];y+=v[1]}}return{r,acc:x+y?x/(x+y):null,n:x+y}})}
function regionScore(mode){const ms=mode==='all'?MODES:[mode];const lg=(S.log||[]).filter(e=>ms.includes(e.m));
 return REGIONS.map(r=>{const es=lg.filter(e=>byC[e.c]&&byC[e.c].r===r);if(es.length){const cl=e=>Math.min(1,e.p/(HINT_MULT[e.h||0]*1000));const v=es.reduce((s,e)=>s+cl(e),0)/es.length;const pc={};es.forEach(e=>{(pc[e.c]=pc[e.c]||[]).push(cl(e))});
   const cs=Object.entries(pc).map(([c,xs])=>({c,v:xs.reduce((p,q)=>p+q,0)/xs.length,n:xs.length})).sort((p,q)=>q.v-p.v||q.n-p.n);return{r,v,n:es.length,ok:es.filter(e=>e.ok).length,cs}}
  let x=0,y=0;for(const c of C){if(c.r!==r)continue;for(const m of ms){const it=S.items[m+'|'+c.c];if(it){x+=it[0];y+=it[1]}}}const cs=[];for(const c of C){if(c.r!==r)continue;let p=0,q=0;for(const m of ms){const it=S.items[m+'|'+c.c];if(it){p+=it[0];q+=it[1]}}if(p+q)cs.push({c:c.c,v:p/(p+q),n:p+q})}cs.sort((u,w)=>w.v-u.v||w.n-u.n);return{r,v:x+y?x/(x+y):null,n:x+y,ok:x,cs}})}
const qcol=v=>v==null?'var(--unk)':v>=.75?'var(--good)':v>=.5?'#9bbf3a':v>=.3?'var(--mid)':'var(--bad)';
const RL={de:{EU:['Europa'],AS:['Asien'],AF:['Afrika'],NA:['Nord-/Mittel-','amerika'],SA:['Süd-','amerika'],OC:['Ozeanien']},en:{EU:['Europe'],AS:['Asia'],AF:['Africa'],NA:['North/Central','America'],SA:['South','America'],OC:['Oceania']}};
let SCRUB={};
function chartFrame(nb){const narrow=(main.clientWidth||innerWidth)<600;const W=narrow?400:640,H=narrow?236:246,l=narrow?34:42,r=10,tp=14,b=40,pw=W-l-r,ph=H-tp-b,bw=pw/nb;return{W,H,l,r,tp,b,pw,ph,bw,nb,narrow}}
function colsHTML(rows){const F=chartFrame(rows.length);const {W,H,l,r,tp,ph,bw}=F;const y=v=>tp+ph*(1-v);const best=Math.max(...rows.filter(x=>x.v!=null).map(x=>x.v),-1);
 let g='';[0,.25,.5,.75,1].forEach(v=>{g+=`<line x1="${l}" x2="${W-r}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" style="stroke:var(--line)${v?';stroke-dasharray:3 4':''}"/><text x="${l-8}" y="${(y(v)+4).toFixed(1)}" text-anchor="end" style="fill:var(--muted);font:11px var(--f-mono)">${v*100}%</text>`});
 rows.forEach((x,i)=>{const gap=F.narrow?5:9;const x0=l+i*bw+gap,w=bw-2*gap,cx=l+(i+.5)*bw;
  if(x.v!=null){const hh=Math.max(2,ph*x.v);g+=`<g class="hbin" data-i="${i}"><rect x="${x0.toFixed(1)}" y="${(tp+ph-hh).toFixed(1)}" width="${w.toFixed(1)}" height="${hh.toFixed(1)}" rx="3" style="fill:var(--accent)"/></g>`;
   g+=`<text x="${cx.toFixed(1)}" y="${(tp+ph-hh-6).toFixed(1)}" text-anchor="middle" style="fill:var(--ink);font:700 ${F.narrow?11:12}px var(--f-body)">${x.v===best?'🏆 ':''}${Math.round(x.v*100)} %</text>`}
  else g+=`<text x="${cx.toFixed(1)}" y="${(tp+ph-6).toFixed(1)}" text-anchor="middle" style="fill:var(--muted);font:12px var(--f-body)">–</text>`;
  const lines=(RL[L()]||RL.de)[x.r];lines.forEach((s,k)=>{g+=`<text x="${cx.toFixed(1)}" y="${(tp+ph+15+k*13).toFixed(1)}" text-anchor="middle" style="fill:var(--muted);font:600 ${F.narrow?10:11}px var(--f-body)">${esc(s)}</text>`})});
 SCRUB.cols={F,tip:i=>{const x=rows[i];const nm=t('r_'+x.r);if(!x.n)return `<b>🌍 ${esc(nm)}</b><span>${t('noData')}</span>`;const cs=x.cs||[];const bestC=cs[0],worst=cs.length>1?cs[cs.length-1]:null;
  return `<b>🌍 ${esc(nm)}</b><span>🎯 ${t('cPrec')}: ${pct(x.v)}</span><span>📊 ${t('answers',{n:nf(x.n)})} · ✅ ${nf(x.ok||0)}</span>${bestC?`<span>💪 ${esc(cname(byC[bestC.c]))} · ${pct(bestC.v)}</span>`:''}${worst?`<span>🤔 ${esc(cname(byC[worst.c]))} · ${pct(worst.v)}</span>`:''}<span>🗺️ ${t('cSeen',{n:cs.length,t:C.filter(c=>c.r===x.r).length})}</span>`}};
 return `<div class="histwrap scrub" data-scrub="cols" tabindex="0" aria-label="${t('contAcc')}"><svg class="chart histo" viewBox="0 0 ${W} ${H}" role="img">${g}<rect x="${l}" y="0" width="${F.pw}" height="${H}" style="fill:transparent"/></svg><div class="hline" aria-hidden="true"></div><div class="htip" role="status"></div></div>`}
function bindScrubs(){document.querySelectorAll('.scrub').forEach(w=>{if(w._b)return;w._b=1;const M=SCRUB[w.dataset.scrub];if(!M)return;const F=M.F;const svg=w.querySelector('svg'),line=w.querySelector('.hline'),tip=w.querySelector('.htip');let cur=-1;
 const show=px=>{const r=svg.getBoundingClientRect(),wr=w.getBoundingClientRect();const sc=r.width/F.W;px=Math.max(F.l*sc,Math.min((F.W-F.r)*sc-1,px));const i=Math.min(F.nb-1,Math.floor((px/sc-F.l)/F.bw));
  line.style.left=(r.left-wr.left+px)+'px';line.style.top=(r.top-wr.top+F.tp*sc-6)+'px';line.style.height=(F.ph*sc+6)+'px';w.classList.add('on');
  if(i!==cur){cur=i;svg.querySelectorAll('.hbin').forEach(g=>g.classList.toggle('dim',+g.dataset.i!==i));tip.innerHTML=M.tip(i)}
  const tw=tip.offsetWidth,lx=r.left-wr.left+px;tip.style.left=(lx+12+tw<=wr.width?lx+12:Math.max(0,lx-12-tw))+'px';tip.style.top=(r.top-wr.top+4)+'px'};
 const hide=()=>{w.classList.remove('on');cur=-1;svg.querySelectorAll('.hbin').forEach(g=>g.classList.remove('dim'))};
 const at=e=>show(e.clientX-svg.getBoundingClientRect().left);
 svg.addEventListener('pointerdown',at);svg.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'||e.buttons)at(e)});
 svg.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')hide()});svg.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')hide()});svg.addEventListener('pointercancel',hide);
 w.addEventListener('keydown',e=>{if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;e.preventDefault();const sc=svg.getBoundingClientRect().width/F.W;const i=cur<0?0:Math.max(0,Math.min(F.nb-1,cur+(e.key==='ArrowRight'?1:-1)));show((F.l+(i+.5)*F.bw)*sc)});
 w.addEventListener('blur',hide)})}
function legendTog(chart,items){const hid=SST.hide[chart];return `<div class="chiplegend tog" data-chart="${chart}">${items.map(s=>`<button class="lg ${hid.includes(s.k)?'off':''}" data-k="${s.k}" aria-pressed="${!hid.includes(s.k)}"><i style="background:${s.col}"></i>${s.label}${s.extra&&!hid.includes(s.k)?s.extra:''}</button>`).join('')}</div>`}
function weakList(mode){const ms=mode==='all'?MODES:[mode];const arr=[];for(const m of ms)for(const c of statPool(m)){const it=S.items[m+'|'+c.c];if(it&&it[1]>0&&(it[1]>=it[0]||!lastOk(m,c.c)))arr.push({m,c,r:it[0],w:it[1],s:it[1]*1.6-it[0]*.7+(lastOk(m,c.c)?0:1.2)})}return arr.sort((p,q)=>q.s-p.s)}
const kmFmt=v=>nf(Math.round(v))+' km';
function donutSVG(segs,big,small){const tot=segs.reduce((s,x)=>s+x.v,0);const R1=56,R0=38,cx=64,cy=64;let a0=-Math.PI/2,paths='';
 const P=(ang,rr)=>(cx+rr*Math.cos(ang)).toFixed(2)+' '+(cy+rr*Math.sin(ang)).toFixed(2);
 if(!tot)paths=`<circle cx="64" cy="64" r="${(R1+R0)/2}" style="fill:none;stroke:var(--surface-2);stroke-width:${R1-R0}"/>`;
 for(const s of segs){if(!s.v||!tot)continue;const fr=s.v/tot;if(fr>=.9999){paths+=`<circle cx="64" cy="64" r="${(R1+R0)/2}" style="fill:none;stroke:${s.col};stroke-width:${R1-R0}"><title>${esc(s.label)}</title></circle>`;continue}
  const a1=a0+fr*2*Math.PI,lg=a1-a0>Math.PI?1:0;paths+=`<path d="M${P(a0,R1)}A${R1} ${R1} 0 ${lg} 1 ${P(a1,R1)}L${P(a1,R0)}A${R0} ${R0} 0 ${lg} 0 ${P(a0,R0)}Z" style="fill:${s.col};stroke:var(--surface);stroke-width:1.5"><title>${esc(s.label)}: ${s.v}</title></path>`;a0=a1}
 return `<div class="donut"><svg class="chart" viewBox="0 0 128 128" role="img" aria-label="${esc(small||'')}">${paths}<text x="64" y="64" text-anchor="middle" style="fill:var(--ink);font:800 21px var(--f-display)">${big}</text><text x="64" y="80" text-anchor="middle" style="fill:var(--muted);font:500 9.5px var(--f-body)">${esc(small||'')}</text></svg>
  <ul class="legend">${segs.map(s=>`<li><i style="background:${s.col}"></i><span>${esc(s.label)}</span><b class="num">${nf(s.v)}<small> · ${tot?pct(s.v/tot):'–'}</small></b></li>`).join('')}</ul></div>`}
function hbarsHTML(rows,mark=true){const best=mark?Math.max(...rows.filter(x=>x.v!=null).map(x=>x.v),-1):-2;
 return `<div class="hbars">${rows.map(x=>`<div class="hb ${x.v!=null&&x.v===best?'best':''}"><span class="hl">${esc(x.label)}${x.n?`<small class="num">${t('answers',{n:nf(x.n)})}</small>`:''}</span><span class="ht"><i style="width:${x.v==null?0:Math.max(2,x.v*100)}%;background:${x.col||'var(--accent)'}"></i></span><span class="hv num">${x.v==null?'–':pct(x.v)}</span></div>`).join('')}</div>`}
function radarSVG(all){const series=all.filter(s=>!SST.hide.radar.includes(s.k));const W=320,H=270,cx=160,cy=136,R0=96,n=REGIONS.length;const ang=i=>-Math.PI/2+i*2*Math.PI/n;const pt=(i,v)=>[cx+R0*v*Math.cos(ang(i)),cy+R0*v*Math.sin(ang(i))];
 let g='';for(const lv of [.25,.5,.75,1])g+=`<polygon points="${REGIONS.map((_,i)=>pt(i,lv).map(z=>z.toFixed(1)).join(',')).join(' ')}" style="fill:none;stroke:var(--line);stroke-width:1"/>`;
 REGIONS.forEach((r,i)=>{const [x,y]=pt(i,1);g+=`<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" style="stroke:var(--line)"/>`;const [lx,ly]=pt(i,1.17);const c=Math.cos(ang(i));
  g+=`<text x="${lx.toFixed(1)}" y="${(ly+4).toFixed(1)}" text-anchor="${Math.abs(c)<.2?'middle':c>0?'start':'end'}" style="fill:var(--muted);font:600 11px var(--f-body)">${t('rs_'+r)}</text>`});
 [.5,1].forEach(lv=>{g+=`<text x="${cx+7}" y="${(cy-R0*lv+14).toFixed(1)}" style="fill:var(--muted);font:10px var(--f-mono)">${lv*100}%</text>`});
 for(const s of series){const pts=s.vals.map((v,i)=>pt(i,v==null?0:v));g+=`<polygon points="${pts.map(p=>p.map(z=>z.toFixed(1)).join(',')).join(' ')}" style="fill:${s.col};fill-opacity:.13;stroke:${s.col};stroke-width:2;stroke-linejoin:round"/>`;
  g+=pts.map((p,i)=>s.vals[i]==null?'':`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.2" style="fill:${s.col};stroke:var(--surface);stroke-width:1.2"><title>${esc(s.label)} · ${t('r_'+REGIONS[i])}: ${pct(s.vals[i])}</title></circle>`).join('')}
 return `<svg viewBox="0 0 ${W} ${H}" class="chart radar" role="img" aria-label="${t('radar')}">${g}</svg>${legendTog('radar',all.map(s=>({k:s.k,col:s.col,label:esc(s.label)})))}`}
function lineSVG(series,count){const W=640,H=190,l=56,rr=16,tp=14,b=22;const vis=series.filter(s=>!SST.hide.line.includes(s.k));const all=vis.flatMap(s=>s.pts.map(p=>p.v));const mx=Math.max(100,...all);
 const step=[100,200,250,500,1000,2000,2500,5000,10000].find(s=>mx/s<=4)||5000;const top=Math.ceil(mx/step)*step;
 const x=i=>count<2?l+(W-l-rr)/2:l+i*(W-l-rr)/(count-1),y=v=>tp+(1-v/top)*(H-tp-b);let g='';
 for(let v=0;v<=top;v+=step)g+=`<line x1="${l}" x2="${W-rr}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--line)${v?';stroke-dasharray:3 4':''}"/><text x="${l-8}" y="${y(v)+4}" text-anchor="end" style="fill:var(--muted);font:11px var(--f-mono)">${nf(v)}</text>`;
 for(const s of vis){if(!s.pts.length)continue;const d=s.pts.map((p,i)=>(i?'L':'M')+x(p.i).toFixed(1)+' '+y(p.v).toFixed(1)).join(' ');
  g+=`<path d="${d}" style="fill:none;stroke:${s.col};stroke-width:2.2;stroke-linejoin:round;stroke-linecap:round"/>`+s.pts.map((p,i)=>`<circle cx="${x(p.i).toFixed(1)}" cy="${y(p.v).toFixed(1)}" r="${i===s.pts.length-1?5:2.6}" style="fill:${s.col};stroke:var(--surface);stroke-width:${i===s.pts.length-1?2:0}"><title>${esc(s.label)}: ${kmFmt(p.v)}</title></circle>`).join('')}
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t('distTrend')}">${g}</svg>${legendTog('line',series.filter(s=>s.pts.length).map(s=>({k:s.k,col:s.col,label:esc(s.label),extra:` · <b class="num">${kmFmt(s.pts[s.pts.length-1].v)}</b>`})))}`}
/* per-mode trend minis: each game mode gets its own small chart with its own round counter */
function miniSVG(m,vals,o){const W=320,H=128,l=38,rr=10,tp=10,b=20,n=vals.length;const many=n>30;
 const top=o.km?([100,250,500,1000,2000,5000,10000,20000].find(s=>s>=Math.max(...vals))||20000):1;
 const x=i=>n<2?l+(W-l-rr)/2:l+i*(W-l-rr)/(n-1),y=v=>tp+(1-Math.min(v,top)/top)*(H-tp-b);
 const ticks=[0,top/2,top];let g=ticks.map(v=>`<line x1="${l}" x2="${W-rr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" style="stroke:var(--line)${v?';stroke-dasharray:3 4':''}"/><text x="${l-6}" y="${(y(v)+4).toFixed(1)}" text-anchor="end" style="fill:var(--muted);font:10px var(--f-mono)">${o.km?(v>=1000?nf(v/1000)+'k':nf(v)):Math.round(v*100)+'%'}</text>`).join('');
 const path=a=>a.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)).join(' ');const ln=path(vals);
 // moving average for long histories so the long-term trend stays readable
 const win=Math.max(3,Math.round(n/12));const ma=n>15?vals.map((_,i)=>{const a=vals.slice(Math.max(0,i-win+1),i+1);return a.reduce((s,v)=>s+v,0)/a.length}):null;
 if(n>1)g+=`<path d="${ln} L${x(n-1).toFixed(1)} ${y(0).toFixed(1)} L${x(0).toFixed(1)} ${y(0).toFixed(1)} Z" style="fill:${MCOL[m]};fill-opacity:.1"/>`;
 g+=`<path d="${ln}" style="fill:none;stroke:${MCOL[m]};stroke-width:${ma?1.2:2.2};stroke-opacity:${ma?.5:1};stroke-linejoin:round;stroke-linecap:round"/>`;
 if(ma)g+=`<path d="${path(ma)}" style="fill:none;stroke:${MCOL[m]};stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round"/>`;
 g+=vals.map((v,i)=>{const last=i===n-1;if(many&&!last)return`<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4" style="fill:transparent"><title>${t('roundNo',{n:i+1})}: ${o.km?kmFmt(v):pct(v)}</title></circle>`;
  return `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${last?4.5:2.2}" style="fill:${MCOL[m]};stroke:var(--surface);stroke-width:${last?2:0}"><title>${t('roundNo',{n:i+1})}: ${o.km?kmFmt(v):pct(v)}</title></circle>`}).join('');
 const lab=(i,a)=>`<text x="${x(i).toFixed(1)}" y="${H-4}" text-anchor="${a}" style="fill:var(--muted);font:10px var(--f-mono)">#${i+1}</text>`;
 g+=lab(0,'start')+(n>1?lab(n-1,'end'):'')+(n>=10?lab(Math.round((n-1)/2),'middle'):'');
 return `<svg class="chart mini" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t('m_'+m)}">${g}</svg>${ma?`<div class="tmleg"><span><i class="ln thin"></i>${t('perRound')}</span><span><i class="ln"></i>${t('avgOf',{n:win})}</span></div>`:''}`}
function trendMini(m,km){const all=S.rounds.filter(r=>r.m===m&&(!km||r.ad!=null));const rs=all;
 const vals=rs.map(r=>km?r.ad:r.s/r.mx);
 let head=`<div class="tmh"><span class="glyph" style="color:${MCOL[m]}">${I[m]}</span><b>${t('m_'+m)}</b>`;
 if(!rs.length)return head+`</div><div class="tmempty">${t('noRoundsYet')}</div>`;
 const last=vals[vals.length-1];const prev=vals.slice(-6,-3),rec=vals.slice(-3);
 let chip='';if(prev.length&&rec.length>=3){const a=rec.reduce((s,v)=>s+v,0)/rec.length,bb=prev.reduce((s,v)=>s+v,0)/prev.length;const better=km?a<bb:a>bb;const d=km?Math.abs(a-bb):Math.abs(a-bb)*100;
  if(d>=(km?25:3))chip=`<span class="tchip ${better?'up':'down'}" title="${t('trendVs')}">${better?'▲':'▼'} ${km?kmFmt(d):Math.round(d)+' %'}</span>`;else chip=`<span class="tchip" title="${t('trendVs')}">＝</span>`}
 head+=`<span class="tml num">${km?kmFmt(last):pct(last)}</span>${chip}</div>`;
 head=head.replace('</b>',`</b><span class="tmn">${t('roundsN',{n:rs.length})}</span>`);return head+miniSVG(m,vals,{km})}
function trendCard(){return card(t('trendModes'),t('trendModesSub'),`<div class="tminis">${MODES.map(m=>`<div class="tmini" style="--mc:${MCOL[m]}">${trendMini(m,false)}</div>`).join('')}</div>`,'','c_trend')}
function distTrendCard(){return card(t('distTrend'),t('distTrendSub'),`<div class="tminis two">${['mapc','mapt'].map(m=>`<div class="tmini" style="--mc:${MCOL[m]}">${trendMini(m,true)}</div>`).join('')}</div>`,'','c_line')}
function card(title,subt,body,cls='',id=''){return `<section class="scard ${cls}"${id?` id="${id}"`:''}><div class="shead"><h2 class="h2">${title}</h2>${subt?`<p class="ssub">${subt}</p>`:''}</div>${body}</section>`}
function modeFilterHTML(){return `<div class="mfilter" role="group" aria-label="${t('mode')}">${['all',...MODES].map(m=>`<button data-sm="${m}" aria-pressed="${SST.mode===m}">${m==='all'?'':`<i style="background:${MCOL[m]}"></i>`}${m==='all'?t('all'):t('m_'+m)}</button>`).join('')}</div>`}
function dynHTML(){const m=SST.mode;const sc=statusCounts(m);const tot=statPool(m).length;const rsc=regionScore(m);const known=sc.good;
 const weak=weakList(m).slice(0,8);
 const wk=weak.length?`<div class="list">${weak.map(w=>`<div class="li"><img class="flagsm" src="${flag(w.c)}" alt=""><div><div class="t"><span class="dot b"></span>${esc(w.m==='cap'||w.m==='mapt'?capname(w.c)+' · '+cname(w.c):cname(w.c))}</div><div class="s">${t('m_'+w.m)}</div></div><div class="p wk num" title="${t('xWrong',{w:w.w,r:w.r})}">${w.w} ✗ · ${w.r} ✓</div></div>`).join('')}</div>
   <button class="btn primary" id="pweak">${I.bulb}${t('practiceWeak')}</button>`:`<div class="empty small">${I.check}<span>${t('weakNone')}</span></div>`;
 return `<div class="sgrid">
  ${card(t('knowState'),t('knowSub'),donutSVG(['good','mid','bad','new'].map(k=>({v:sc[k],col:STC[k],label:t('st_'+k)})),nf(known),t('st_good')+' / '+nf(tot)))}
  ${card(t('contAcc'),t('contAccSub'),rsc.some(x=>x.n)?colsHTML(rsc):`<p class="ssub">${t('noData')}</p>`)}
 </div>${card(t('weakTitle'),'',wk,'weak')}`}
function radarCard(){const series=MODES.map(m=>({k:m,label:t('m_'+m),col:MCOL[m],vals:regionScore(m).map(x=>x.v)})).filter(s=>s.vals.some(v=>v!=null));
 return card(t('radar'),t('radarSub'),series.length?radarSVG(series):`<p class="ssub">${t('noData')}</p>`,'','c_radar')}
function lineCard(){const mr=S.rounds.filter(r=>r.ad!=null).slice(-24);const lser=['mapc','mapt'].map(m=>({k:m,label:t('m_'+m),col:MCOL[m],pts:mr.map((r,i)=>r.m===m?{i,v:r.ad}:null).filter(Boolean)}));
 return card(t('distTrend'),t('distTrendSub'),mr.length?lineSVG(lser,mr.length):`<p class="ssub">${t('noMapData')}</p>`,'','c_line')}
function histCard(){const all=(S.log||[]).filter(e=>e.d!=null);const ds=all.filter(e=>!SST.hide.hist.includes(e.m));
 const med=ds.length?ds.map(e=>e.d).sort((p,q)=>p-q)[ds.length>>1]:0;
 return card(t('distSplit'),ds.length?t('distSplitSub')+' · Median <b class="num">'+kmFmt(med)+'</b>':t('distSplitSub'),all.length?histHTML(ds,med,all):`<p class="ssub">${t('noMapData')}</p>`,'','c_hist')}
function modeTiles(){const rs=S.rounds;return `<div class="mtiles">${MODES.map(m=>{const x=rs.filter(r=>r.m===m);const best=x.length?Math.max(...x.map(r=>r.s)):null;const avg=x.length?Math.round(x.reduce((s,r)=>s+r.s,0)/x.length):null;const acc=x.length?x.reduce((s,r)=>s+r.ok,0)/x.reduce((s,r)=>s+r.n,0):null;
  return `<div class="mtile" style="--mc:${MCOL[m]}"><span class="glyph">${I[m]}</span><div class="mtn"><b>${t('m_'+m)}</b><span class="mtm num">${t('roundsN',{n:x.length})}${avg==null?'':` · ⌀ ${nf(avg)} · ✅ ${pct(acc)}`}</span></div>
   <div class="mtb" title="${t('bestR')}"><small>🏆</small><b class="num">${best==null?'–':nf(best)}</b></div><div class="bar"><i style="width:${(acc||0)*100}%;background:${MCOL[m]}"></i></div></div>`}).join('')}</div>`}
function staticHTML(){const rs=S.rounds;
 const share=MODES.map(m=>({v:rs.filter(r=>r.m===m).length,col:MCOL[m],label:t('m_'+m)}));
 return `<div class="sgrid">${radarCard()}
  ${card(t('modeShare'),t('modeShareSub'),donutSVG(share,nf(rs.length),t('rounds')))}</div>
 ${trendCard()}
 ${distTrendCard()}
 ${histCard()}
 ${card(t('byMode'),'',modeTiles())}
 ${Object.keys(S.cards).length?card(t('learnStats'),t('learnStatsSub'),['cap','flag'].map(d=>`<div class="deckrow"><b>${t('deck_'+d)}</b>${boxBar(boxCounts(d))}</div>`).join('')):''}
 ${rs.length?card(t('recent'),'',`<div class="list">${rs.slice(-8).reverse().map(r=>`<div class="li"><span class="glyph" style="color:${MCOL[r.m]};display:grid">${I[r.m]}</span><div><div class="t">${t('m_'+r.m)} · ${t(r.df)}</div><div class="s">${fdate(r.d)} · ${t('correctN',{c:r.ok,n:r.n})}${r.ad!=null?' · ⌀ '+kmFmt(r.ad):''}${r.hn?' · '+t('hintsUsed',{h:r.hn}):''}</div></div><div class="p">${nf(r.s)}</div></div>`).join('')}</div>`):''}`}
const HB=[0,50,100,250,500,1000,2000,4000,Infinity];
function histHTML(ds,med,all){const nb=HB.length-1;const bins=Array.from({length:nb},(_,i)=>({lo:HB[i],hi:HB[i+1],es:[]}));
 for(const e of ds){const i=HB.findIndex((x,k)=>e.d>=x&&e.d<HB[k+1]);if(i>=0)bins[i].es.push(e)}
 const F=chartFrame(nb);F.b=28;F.ph=F.H-10-F.tp-28;const {W,H,l,r,tp,ph,bw}=F;const mx=Math.max(1,...bins.map(x=>x.es.length));
 const step=[1,2,5,10,20,25,50,100,200,250,500,1000].find(s=>mx/s<=4)||1000;const top=Math.ceil(mx/step)*step;const y=v=>tp+ph*(1-v/top);
 let g='';for(let v=0;v<=top;v+=step)g+=`<line x1="${l}" x2="${W-r}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" style="stroke:var(--line)${v?';stroke-dasharray:3 4':''}"/><text x="${l-8}" y="${(y(v)+4).toFixed(1)}" text-anchor="end" style="fill:var(--muted);font:11px var(--f-mono)">${nf(v)}</text>`;
 bins.forEach((x,i)=>{const n=x.es.length;if(!n)return;const hh=ph*n/top;g+=`<g class="hbin" data-i="${i}"><rect x="${(l+i*bw+1).toFixed(1)}" y="${(tp+ph-hh).toFixed(1)}" width="${(bw-2).toFixed(1)}" height="${hh.toFixed(1)}" style="fill:var(--accent)"/></g>`});
 const lab=v=>v>=1000?nf(v/1000)+'k':nf(v);
 HB.slice(0,-1).forEach((v,i)=>{g+=`<text x="${(l+i*bw).toFixed(1)}" y="${tp+ph+16}" text-anchor="${i?'middle':'start'}" style="fill:var(--muted);font:11px var(--f-mono)">${lab(v)}</text>`});
 g+=`<text x="${W-r}" y="${tp+ph+16}" text-anchor="end" style="fill:var(--muted);font:11px var(--f-mono)">km</text>`;
 if(ds.length){const mi=HB.findIndex((x,k)=>med>=x&&med<HB[k+1]);if(mi>=0){const f=HB[mi+1]===Infinity?.5:(med-HB[mi])/(HB[mi+1]-HB[mi]);const mxp=l+(mi+f)*bw;g+=`<line x1="${mxp.toFixed(1)}" x2="${mxp.toFixed(1)}" y1="${tp-4}" y2="${tp+ph}" style="stroke:var(--ink);stroke-width:1.5;opacity:.55"/><text x="${(mxp+4).toFixed(1)}" y="${tp+6}" style="fill:var(--ink);font:600 10.5px var(--f-body);opacity:.75">Median</text>`}}
 const tot=ds.length;const rng=x=>x.hi===Infinity?t('hOver',{v:nf(x.lo)}):x.lo===0?t('hUnder',{v:nf(x.hi)}):`${nf(x.lo)}–${nf(x.hi)} km`;
 SCRUB.hist={F,tip:i=>{const x=bins[i];const n=x.es.length;const em=x.hi<=100?'🎯':x.hi<=500?'👍':x.hi<=2000?'🤏':'🌊';if(!n)return `<b>${em} ${rng(x)}</b><span>${t('hEmpty')}</span>`;
  const closer=bins.slice(0,i).reduce((s,b)=>s+b.es.length,0);const avgP=Math.round(x.es.reduce((s,e)=>s+e.p,0)/n);const fq={};x.es.forEach(e=>fq[e.c]=(fq[e.c]||0)+1);
  const top3=Object.entries(fq).sort((p,q)=>q[1]-p[1]).slice(0,3).map(([cc,k])=>esc(cname(byC[cc]))+(k>1?` ×${k}`:'')).join(', ');const last=x.es.reduce((m,e)=>e.t>m?e.t:m,0);
  return `<b>${em} ${rng(x)}</b><span>📊 ${t('tipsN',{n:nf(n)})} · ${pct(n/tot)}</span><span>⭐ ⌀ ${nf(avgP)} ${t('points')}</span><span>📍 ${top3}</span><span>${i===0||!closer?'🏆 '+t('hBest'):'🏁 '+t('hCloser',{p:pct(closer/tot)})}</span><span>🕒 ${t('hLast',{d:fdate(last)})}</span>`}};
 const cnt=m=>all.filter(e=>e.m===m).length;
 return `<div class="histwrap scrub" data-scrub="hist" tabindex="0" aria-label="${t('distSplit')}"><svg class="chart histo" viewBox="0 0 ${W} ${H}" role="img">${g}<rect x="${l}" y="0" width="${F.pw}" height="${H}" style="fill:transparent"/></svg><div class="hline" aria-hidden="true"></div><div class="htip" role="status"></div></div>
  ${legendTog('hist',[{k:'mapc',col:'var(--accent)',label:'🌍 '+t('m_mapc'),extra:` · <span class="num">${nf(cnt('mapc'))}</span>`},{k:'mapt',col:'var(--accent)',label:'🏙️ '+t('m_mapt'),extra:` · <span class="num">${nf(cnt('mapt'))}</span>`}])}`}
const bindHist=bindScrubs;
function bindLegends(){main.addEventListener('click',e=>{const b=e.target.closest('.chiplegend.tog .lg');if(!b||tab!=='stats')return;const ch=b.closest('.chiplegend').dataset.chart,k=b.dataset.k,hid=SST.hide[ch];
 if(hid.includes(k))hid.splice(hid.indexOf(k),1);else{const n=b.parentElement.querySelectorAll('.lg').length;if(n-hid.length<=1){b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),400);return}hid.push(k)}
 const el=document.getElementById('c_'+ch);if(!el)return;el.outerHTML=ch==='radar'?radarCard():ch==='line'?lineCard():histCard();if(ch==='hist')bindHist()})}
function renderStats(){const rs=S.rounds;
 if(!rs.length&&!Object.keys(S.items).length){main.innerHTML=`<div class="page gut"><div><div class="eyebrow">${t('stats')}</div><h1 class="h1">${t('statsTitle')}</h1></div><div class="empty">${I.stats}<span>${t('noStats')}</span><button class="btn primary" id="st">${t('startNow')}</button></div></div>`;document.getElementById('st').onclick=()=>go('play');return}
 const q=rs.reduce((s,r)=>s+r.n,0),ok=rs.reduce((s,r)=>s+r.ok,0),avg=rs.length?rs.reduce((s,r)=>s+r.s/r.mx,0)/rs.length:0;
 main.innerHTML=`<div class="page gut statpage">
  <div><div class="eyebrow">${t('stats')}</div><h1 class="h1">${t('statsTitle')}</h1></div>
  <div class="kpis"><div class="kpi"><b>${nf(rs.length)}</b><span>${t('rounds')}</span></div><div class="kpi"><b>${nf(q)}</b><span>${t('questions')}</span></div><div class="kpi"><b>${q?pct(ok/q):'–'}</b><span>${t('accuracy')}</span></div><div class="kpi"><b>${rs.length?pct(avg):'–'}</b><span>${t('avgScore')}</span></div></div>
  <div class="mfwrap">${modeFilterHTML()}</div>
  <section class="scard mapcard"><div class="shead"><h2 class="h2">${t('kmap')}</h2><p class="ssub">${t('kmapSub')}</p></div>
   <div class="statmap">${stageHTML('')}</div>
   <div class="kleg">${['good','mid','bad','new'].map(k=>`<span><i style="background:${STC[k]}"></i>${t('st_'+k)}</span>`).join('')}</div>
   <div id="sdetail"></div></section>
  <div id="sdyn">${dynHTML()}</div>
  ${staticHTML()}</div>`;
 bindStatsDyn();renderDetail();bindHist();if(!main._lg){main._lg=1;bindLegends()}
 main.querySelectorAll('[data-sm]').forEach(b=>b.onclick=()=>{SST.mode=b.dataset.sm;main.querySelectorAll('[data-sm]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.sm===SST.mode));document.getElementById('sdyn').innerHTML=dynHTML();bindStatsDyn();paintKnowledge();renderDetail()});
 mountEarth(()=>{Earth.clearAll();Earth.setBorders(true);Earth.setHover(true);paintKnowledge();
  Earth.on('tap',ll=>{const h=Earth.findCountry(ll,24);const c=h?byNum[h.id]:null;SST.sel=c?c.c:null;paintKnowledge();renderDetail()});
  if(!SST.flown){Earth.flyTo(focusPts(REGIONS),{dur:0});SST.flown=true}},()=>Earth.flyTo(focusPts(REGIONS)))}
function bindStatsDyn(){bindScrubs();const b=document.getElementById('pweak');if(b)b.onclick=()=>{const wl=weakList(SST.mode);if(!wl.length)return;const m=wl[0].m;startGame(m,wl.filter(w=>w.m===m).slice(0,QN).map(w=>w.c));go('play')}}
function paintKnowledge(){if(!document.getElementById('stage'))return;const colors={};for(const c of statPool(SST.mode))if(c.m)colors[c.n]=STCANVAS[status(SST.mode,c.c)];
 try{Earth.setOverlay({colors});const s=SST.sel&&byC[SST.sel];Earth.setOutline(s&&s.m?s.n:null,0xffffff)}catch(e){}}
function renderDetail(){const el=document.getElementById('sdetail');if(!el)return;const c=SST.sel&&byC[SST.sel];
 if(!c){el.innerHTML=`<p class="ssub dhint">${I.pin}${t('detailHint')}</p>`;return}
 const hist=(S.log||[]).filter(e=>e.c===c.c).slice(-8).reverse();
 el.innerHTML=`<div class="sdet"><div class="ahead"><img class="flagmid" src="${flag(c)}" alt=""><div class="aname"><div class="big">${esc(cname(c))}</div><div class="asub">${esc(capname(c))} · ${t('r_'+c.r)}</div></div><button class="iconbtn" id="sdclose" aria-label="${t('cancel')}">${I.close}</button></div>
  <div class="mstat">${MODES.map(m=>{const x=S.items[m+'|'+c.c];const s=status(m,c.c);return `<div class="ms"><span class="msl"><i class="mdot" style="background:${MCOL[m]}"></i>${t('m_'+m)}</span><span class="pill" style="--pc:${STC[s]}">${t('st_'+s)}</span><span class="num msn">${x?`${x[0]} ✓ · ${x[1]} ✗`:'–'}</span></div>`}).join('')}</div>
  <div class="field"><span class="lbl">${t('history')}</span>${hist.length?`<div class="hist">${hist.map(e=>`<div class="he"><span class="dot ${e.ok?'g':'b'}"></span><span class="hm">${t('m_'+e.m)}</span><span class="hd num">${fdate(e.t)}</span><span class="hp num">${e.d!=null?(e.d===0?t('inCountry'):kmFmt(e.d)):'+'+nf(e.p)}</span></div>`).join('')}</div>`:`<p class="ssub">${t('noHistory')}</p>`}</div>
  <div class="row"><button class="btn" id="sdcard">${I.learn}${t('toCards')}</button></div></div>`;
 document.getElementById('sdclose').onclick=()=>{SST.sel=null;paintKnowledge();renderDetail()};
 document.getElementById('sdcard').onclick=e=>{addCards([c],['cap','flag']);toast(I.learn+' '+esc(t('cardsAdded',{n:2})));e.currentTarget.disabled=true}}
function sparkSVG(rs){const W=640,H=170,l=40,rr=14,tp=12,b=24;const n=rs.length;const x=i=>n<2?l+(W-l-rr)/2:l+i*(W-l-rr)/(n-1);const y=v=>tp+(1-v)*(H-tp-b);
 const pts=rs.map((r,i)=>[x(i),y(r.s/r.mx)]);const line=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
 const area=n>1?line+` L${x(n-1)} ${y(0)} L${x(0)} ${y(0)} Z`:'';
 const grid=[0,.5,1].map(v=>`<line x1="${l}" x2="${W-rr}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--line)${v?';stroke-dasharray:3 4':''}"/><text x="${l-8}" y="${y(v)+4}" text-anchor="end" style="fill:var(--muted);font:11px var(--f-mono)">${v*100}%</text>`).join('');
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t('trend')}">${grid}${area?`<path d="${area}" style="fill:var(--accent);fill-opacity:.12"/>`:''}<path d="${line}" style="fill:none;stroke:var(--accent);stroke-width:2.2;stroke-linejoin:round"/>${pts.map((p,i)=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i===n-1?5:2.5}" style="fill:${MCOL[rs[i].m]};stroke:var(--surface);stroke-width:${i===n-1?2:0}"><title>${t('m_'+rs[i].m)}: ${pct(rs[i].s/rs[i].mx)}</title></circle>`).join('')}</svg>`}

/* ---------- badges ---------- */
function renderBadges(){const u=ACH.filter(a=>S.ach[a.id]).length;
 main.innerHTML=`<div class="page gut"><div><div class="eyebrow">${t('badges')}</div><h1 class="h1">${t('badgesTitle')}</h1><p class="sub">${t('badgesSub',{u,n:ACH.length})}</p></div>
 <div class="badges">${ACH.map(a=>{const on=!!S.ach[a.id];let prog='';
  if(on)prog=`<span class="prog">${t('unlocked',{d:fdate(S.ach[a.id])})}</span>`;else if(a.goal){const v=Math.min(a.v(),a.goal);prog=`<span class="prog"><span class="bar"><i style="width:${v/a.goal*100}%"></i></span><span class="num">${v}/${a.goal}</span></span>`}
  return `<div class="badge ${on?'on':''}"><span class="medal">${I.medal}</span><b>${t('a_'+a.id)}</b><small>${t('a_'+a.id+'_d')}</small>${prog}</div>`}).join('')}</div></div>`}

/* ---------- CSV ---------- */
const CSVH=['type','date','mode','difficulty','score','max','correct','total','regions','country','right','wrong','achievement','hints','distance','given','round'];
const q=v=>{v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
const row=o=>CSVH.map(h=>q(o[h])).join(',');
function toCSV(){const rows=[CSVH.join(',')];
 S.rounds.forEach(r=>rows.push(row({type:'round',date:r.d,mode:r.m,difficulty:r.df,score:r.s,max:r.mx,correct:r.ok,total:r.n,regions:r.rg,hints:r.hn||0,round:r.rid||'',distance:r.ad??''})));
 (S.log||[]).forEach(e=>rows.push(row({type:'answer',date:new Date(e.t).toISOString(),mode:e.m,difficulty:e.df,country:e.c,correct:e.ok,score:e.p,hints:e.h||0,distance:e.d??'',given:e.g||'',round:e.r||''})));
 for(const k in S.items){const [m,c]=k.split('|');rows.push(row({type:'item',mode:m,country:c,right:S.items[k][0],wrong:S.items[k][1]}))}
 for(const k in S.cards){const [m,c]=k.split('|');rows.push(row({type:'card',mode:m,country:c,right:S.cards[k][0],date:new Date(S.cards[k][1]).toISOString()}))}
 for(const c in S.seen)rows.push(row({type:'seen',country:c}));
 for(const id in S.ach)rows.push(row({type:'achievement',date:S.ach[id],achievement:id}));
 rows.push(row({type:'meta',wrong:String(S.bestStreak),achievement:'beststreak'}));
 return rows.join('\n')}
function parseCSV(txt){const out=[];let rw=[],f='',i=0,inq=false;txt=txt.replace(/^﻿/,'');
 while(i<txt.length){const ch=txt[i];if(inq){if(ch==='"'){if(txt[i+1]==='"'){f+='"';i++}else inq=false}else f+=ch}
  else if(ch==='"')inq=true;else if(ch===','){rw.push(f);f=''}else if(ch==='\n'||ch==='\r'){if(ch==='\r'&&txt[i+1]==='\n')i++;rw.push(f);out.push(rw);rw=[];f=''}else f+=ch;i++}
 if(f||rw.length){rw.push(f);out.push(rw)}return out.filter(r=>r.some(x=>x!==''))}
function fromCSV(txt){const rows=parseCSV(txt);if(!rows.length||rows[0][0]!=='type'||rows[0][2]!=='mode')return null;const h=rows[0];const ix=n=>h.indexOf(n);
 const d={rounds:[],items:{},ach:{},bestStreak:0,cards:{},seen:{},log:[]};
 for(const r of rows.slice(1)){const g=n=>ix(n)<0?'':(r[ix(n)]??'');const ty=g('type');
  if(ty==='round'&&MODES.includes(g('mode')))d.rounds.push({d:g('date'),m:g('mode'),df:g('difficulty')==='hard'?'hard':'easy',s:+g('score')||0,mx:+g('max')||10000,ok:+g('correct')||0,n:+g('total')||10,rg:g('regions'),hn:+g('hints')||0,...(g('round')?{rid:+g('round')}:{}),...(g('distance')!==''?{ad:+g('distance')}:{})});
  else if(ty==='answer'&&MODES.includes(g('mode'))&&byC[g('country')]){const e={t:Date.parse(g('date'))||0,r:+g('round')||0,m:g('mode'),c:g('country'),ok:+g('correct')?1:0,p:+g('score')||0,h:+g('hints')||0,df:g('difficulty')==='hard'?'hard':'easy'};if(g('distance')!=='')e.d=+g('distance');if(g('given'))e.g=g('given');d.log.push(e)}
  else if(ty==='item'&&MODES.includes(g('mode'))&&byC[g('country')])d.items[g('mode')+'|'+g('country')]=[+g('right')||0,+g('wrong')||0];
  else if(ty==='card'&&['cap','flag'].includes(g('mode'))&&byC[g('country')])d.cards[g('mode')+'|'+g('country')]=[Math.max(0,Math.min(5,+g('right')||0)),Date.parse(g('date'))||Date.now()];
  else if(ty==='seen'&&byC[g('country')])d.seen[g('country')]=1;
  else if(ty==='achievement'&&ACH.some(a=>a.id===g('achievement')))d.ach[g('achievement')]=g('date');
  else if(ty==='meta'&&g('achievement')==='beststreak')d.bestStreak=+g('wrong')||0}
 return d}
function applyImport(d,mode){if(mode==='replace'){S.rounds=d.rounds;S.items=d.items;S.ach=d.ach;S.bestStreak=d.bestStreak;S.streak=0;S.cards=d.cards;S.seen=d.seen;S.log=d.log}
 else{const seen=new Set(S.rounds.map(r=>r.d+r.m+r.s));d.rounds.forEach(r=>{if(!seen.has(r.d+r.m+r.s))S.rounds.push(r)});S.rounds.sort((a,b)=>a.d<b.d?-1:1);
  for(const k in d.items){const a=S.items[k]||[0,0];S.items[k]=[a[0]+d.items[k][0],a[1]+d.items[k][1]]}
  for(const k in d.cards){if(!S.cards[k]||S.cards[k][0]<d.cards[k][0])S.cards[k]=d.cards[k]}Object.assign(S.seen,d.seen);if(!Array.isArray(S.log))S.log=[];const lk=new Set(S.log.map(e=>e.t+e.m+e.c));d.log.forEach(e=>{if(!lk.has(e.t+e.m+e.c))S.log.push(e)});S.log.sort((p,q)=>p.t-q.t);
  for(const id in d.ach)if(!S.ach[id]||d.ach[id]<S.ach[id])S.ach[id]=d.ach[id];S.bestStreak=Math.max(S.bestStreak,d.bestStreak)}
 checkAch(null);save()}
let dlNS;try{if(window.claude&&window.claude.use)window.claude.use('downloads').then(x=>{dlNS=x}).catch(()=>{dlNS=null})}catch(e){}

/* ---------- settings ---------- */
let pendingImport=null,showCsv=false,confirmReset=false;
function segRow(attr,opts,cur){return `<div class="seg">${opts.map(([k,n])=>`<button ${attr}="${k}" aria-pressed="${cur===k}">${n}</button>`).join('')}</div>`}
const openSecs=new Set();
function sect(id,title,summary,body){return `<details class="sect" data-sec="${id}" ${openSecs.has(id)?'open':''}><summary><span><b>${title}</b><small>${summary}</small></span><span class="chev" aria-hidden="true">⌄</span></summary><div class="sbody">${body}</div></details>`}
function renderSettings(){const S2=S.settings;
 main.innerHTML=`<div class="page gut"><div><div class="eyebrow">${t('options')}</div><h1 class="h1">${t('settingsTitle')}</h1></div>
 <div class="sects">
 ${sect('look',t('lookTitle'),`${L()==='de'?'Deutsch':'English'} · ${t(S2.theme)}`,`<div class="field"><span class="lbl">${t('language')}</span>${segRow('data-lang',[['de','Deutsch'],['en','English']],L())}</div>
  <div class="field"><span class="lbl">${t('theme')}</span>${segRow('data-theme-opt',['light','dark','system'].map(k=>[k,t(k)]),S2.theme)}</div>`)}
 ${sect('quiz',t('quiz'),`${t(S2.diff)} · ${esc(regionSummary())} · ${t('countriesN',{n:pool('cap').length})}`,`<div class="field"><span class="lbl">${t('difficulty')}</span>${diffSeg()}<span class="hint">${t('diffHint')}</span></div>
  <div class="field"><span class="lbl">${t('regions')}</span>${regionChecks()}<span class="hint">${t('regionsHint')}</span></div>`)}
 ${sect('cards',t('cards'),`${esc(regionSummary('learnRegions'))} · ${t('countriesN',{n:pool('cap',S2.learnRegions).length})}`,`<div class="field"><span class="lbl">${t('regions')}</span>${regionChecks('learnRegions')}<span class="hint">${t('cardsRegHint')}</span></div>`)}
 ${sect('earth',t('earthSet'),`${t(S2.view==='map'?'map':'globe')} · ${t('clouds')}: ${S2.clouds?t('on'):t('off')}`,`<div class="field"><span class="lbl">${t('defView')}</span>${segRow('data-view',[['globe',t('globe')],['map',t('map')]],S2.view)}</div>
  <div class="field"><span class="lbl">${t('clouds')}</span>${segRow('data-clouds',[['1',t('on')],['0',t('off')]],S2.clouds?'1':'0')}</div>`)}
 ${sect('data',t('data'),`${nf(S.rounds.length)} ${t('rounds')} · CSV`,`<p class="sub" style="margin:0">${t('dataHint')}</p>
  <div class="row"><button class="btn primary" id="exp">${t('exportCsv')}</button><label class="btn" for="impf" style="cursor:pointer">${t('importCsv')}</label><input type="file" id="impf" accept=".csv,text/csv,text/plain" class="sr"><button class="btn" id="showcsv">${t('showCsv')}</button></div>
  ${pendingImport?`<div class="confirm" style="border-color:var(--accent);background:var(--accent-soft)"><span>${t('importFound',{r:pendingImport.rounds.length,c:S.rounds.length})}</span><div class="row"><button class="btn primary" id="impR">${t('replace')}</button><button class="btn" id="impM">${t('merge')}</button><button class="btn" id="impC">${t('cancel')}</button></div></div>`:''}
  ${showCsv?`<div class="field"><span class="hint" id="csvhint"></span><textarea id="csvtxt" spellcheck="false" aria-label="CSV">${esc(toCSV())}</textarea><div class="row"><button class="btn" id="copy">${t('copy')}</button></div></div>`:''}
  <div class="field"><label for="paste">${t('pasteCsv')}</label><textarea id="paste" spellcheck="false" style="min-height:70px" placeholder="type,date,mode,…"></textarea><div class="row"><button class="btn" id="pasteImp">${t('pasteImport')}</button></div></div>
  <div>${confirmReset?`<div class="confirm"><span>${t('resetQ')}</span><div class="row"><button class="btn danger" id="resY">${t('resetYes')}</button><button class="btn" id="resN">${t('cancel')}</button></div></div>`:`<button class="btn danger" id="res">${t('reset')}</button>`}</div>`)}
 </div></div>`;
 const rr=()=>{const st=main.scrollTop;renderSettings();main.scrollTop=st};
 main.querySelectorAll('details.sect').forEach(d=>d.ontoggle=()=>{if(d.open)openSecs.add(d.dataset.sec);else openSecs.delete(d.dataset.sec)});
 main.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{S.settings.lang=b.dataset.lang;save();render()});
 main.querySelectorAll('[data-theme-opt]').forEach(b=>b.onclick=()=>{S.settings.theme=b.dataset.themeOpt;save();applyTheme();rr()});
 main.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{S.settings.view=b.dataset.view;save();rr()});
 main.querySelectorAll('[data-clouds]').forEach(b=>b.onclick=()=>{S.settings.clouds=b.dataset.clouds==='1';save();rr()});
 bindDiff(main,rr);bindRegionChecks(main,rr);
 document.getElementById('exp').onclick=async()=>{const csv=toCSV();const name='weltatlas-quiz-'+new Date().toISOString().slice(0,10)+'.csv';
  if(dlNS){try{await dlNS.save({filename:name,data:csv});toast(t('exported'));return}catch(e){if(e&&e.code==='declined'){toast(t('exportDeclined'));return}if(e&&e.code==='rate_limited')return}}
  if(!window.claude){try{const u=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));const l2=document.createElement('a');l2.href=u;l2.download=name;document.body.appendChild(l2);l2.click();l2.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);toast(t('exported'));return}catch(e){}}
  showCsv=true;openSecs.add('data');rr();const h=document.getElementById('csvhint');if(h)h.textContent=t('exportFallback')};
 document.getElementById('showcsv').onclick=()=>{showCsv=!showCsv;rr()};
 const cp=document.getElementById('copy');if(cp)cp.onclick=()=>{const ta=document.getElementById('csvtxt');navigator.clipboard.writeText(ta.value).then(()=>toast(t('copied')),()=>{ta.focus();ta.select()})};
 const take=txt=>{const d=fromCSV(txt);if(!d){toast(esc(t('importBad')));return}if(!S.rounds.length&&!Object.keys(S.items).length&&!Object.keys(S.cards).length&&!(S.log||[]).length){applyImport(d,'replace');toast(t('importDone',{r:d.rounds.length}));rr()}else{pendingImport=d;rr()}};
 document.getElementById('impf').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>take(String(r.result));r.readAsText(f);e.target.value=''};
 document.getElementById('pasteImp').onclick=()=>{const v=document.getElementById('paste').value;if(v.trim())take(v)};
 if(pendingImport){openSecs.add('data');const done=m=>{const n=pendingImport.rounds.length;applyImport(pendingImport,m);pendingImport=null;toast(t('importDone',{r:n}));rr()};
  document.getElementById('impR').onclick=()=>done('replace');document.getElementById('impM').onclick=()=>done('merge');document.getElementById('impC').onclick=()=>{pendingImport=null;rr()}}
 if(confirmReset){document.getElementById('resY').onclick=()=>{const st=S.settings;S=defaults();S.settings=st;save();confirmReset=false;FC.cur=null;toast(t('resetDone'));rr()};document.getElementById('resN').onclick=()=>{confirmReset=false;rr()}}
 else document.getElementById('res').onclick=()=>{confirmReset=true;rr()}}

/* ---------- boot ---------- */
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',applyTheme);
{const h=location.hash.slice(1);tab=TABS.includes(h)?h:'play'}
render();
if(Earth.supported())setTimeout(()=>Earth.init().catch(()=>{}),300);
