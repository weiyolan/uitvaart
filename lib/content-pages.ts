import type { Lang, ServiceFigure } from "./content";

export type ServiceSlug = "uitvaart" | "portret" | "huwelijk";
export type HeroVariant = "centered" | "split" | "wide";
export interface SpNav { why: string; how: string; piece: string; packages: string; faq: string; }
export interface SpHead { overline: string; title: [string, string]; sub: string; fig: ServiceFigure; }
export interface SpWhy { overline: string; lead: string; body: string[]; pull: string; fig: ServiceFigure; }
export interface SpStep { no: string; name: string; text: string; }
export interface SpHow { overline: string; title: string; note: string; steps: SpStep[]; }
export interface SpPiece { overline: string; title: string; body: string; specs: string[]; result: [string, string]; fig: ServiceFigure; }
export interface SpPackageItem { name: string; tagline: string; includes: string[]; featured?: boolean; }
export interface SpPackages { overline: string; title: string; note: string; priceNote: string; items: SpPackageItem[]; }
export interface SpFaqItem { q: string; a: string; }
export interface SpFaq { overline: string; title: string; items: SpFaqItem[]; }
export interface ServicePage {
  svc: ServiceSlug;
  hero: HeroVariant;
  back: string;
  crumb: string;
  nav: SpNav;
  head: SpHead;
  why: SpWhy;
  how: SpHow;
  piece: SpPiece;
  packages: SpPackages;
  faq: SpFaq;
}

export const MW_PAGES: Record<Lang, Record<ServiceSlug, ServicePage>> = {
  nl: {
    uitvaart: {
      svc: "uitvaart",
      hero: "centered",
      back: "Alle diensten",
      crumb: "Dienst I",
      nav: { why: "Waarom", how: "Werkwijze", piece: "Het stuk", packages: "Formules", faq: "Vragen" },
      head: {
        overline: "Dienst I — Uitvaartfotografie",
        title: ["Een leven,", "gevierd op film."],
        sub: "Discrete reportage van een afscheid, op middenformaat film — niet de droefheid, maar de atmosfeer die alles draagt. Een handgebonden album dat blijft.",
        fig: { tag: "Ilford HP5+", meta: "Ceremonie · natuurlijk licht", corner: "6×7 · 01" },
      },
      why: {
        overline: "Waarom",
        lead: "Een afscheid is de laatste keer dat een familie volledig samenkomt rond wie ze liefhadden.",
        body: [
          "Die dag verdient meer dan een telefoon die hem haastig vastlegt en weer vergeet. Niet om de droefheid te tonen, maar om de warmte te bewaren: de mensen die kwamen, het licht door het raam, de bloemen, de handen die elkaar vasthielden.",
          "We leven voort in elkaars herinnering. Daarom benader ik een uitvaart niet als een gebeurtenis om te documenteren, maar als een leven om te vieren — stil, respectvol, en met de permanentie die enkel film geeft.",
        ],
        pull: "Sterven is geen einde.\nWe blijven in elkaars\nherinnering.",
        fig: { tag: "Kodak Portra 400", meta: "De mensen samen", corner: "6×7 · 02" },
      },
      how: {
        overline: "Werkwijze",
        title: "Aanwezig, maar onzichtbaar.",
        note: "Van het eerste gesprek tot het gebonden album — een rustig traject, volledig op uw tempo.",
        steps: [
          { no: "01", name: "Voorbereidend gesprek", text: "We bespreken vooraf de wensen van de familie, het verloop van de dag en welke momenten betekenis dragen. Zonder verplichting." },
          { no: "02", name: "Discrete aanwezigheid", text: "Op de dag zelf beweeg ik me onopgemerkt tussen de mensen — nooit storend, nooit met flits, met respect voor ieder moment van stilte." },
          { no: "03", name: "Met de hand ontwikkeld", text: "Elke rolfilm wordt zorgvuldig ontwikkeld en geselecteerd. Geen overdaad, maar de beelden die de dag werkelijk dragen." },
          { no: "04", name: "Gebonden tot een stuk", text: "De selectie wordt afgewerkt tot een handgebonden fine-art album, met de gedigitaliseerde beelden om te delen met familie." },
        ],
      },
      piece: {
        overline: "Het stuk",
        title: "Een album om door te geven.",
        body: "Geen harde schijf, geen vluchtige cloud — een tastbaar, handgebonden album op archiefpapier. Een stuk dat generaties meegaat en dat u in de hand neemt wanneer u zich wil herinneren.",
        specs: [
          "Mamiya RB67 Pro SD · middenformaat 6×7",
          "Discrete reportage ter plaatse",
          "Handgebonden fine-art album, archiefkwaliteit",
          "Gedigitaliseerde beelden inbegrepen",
          "Levering binnen vier tot acht weken",
        ],
        result: ["Het stuk", "Handgebonden album"],
        fig: { tag: "Cinestill 800T", meta: "Detail · het album", corner: "6×7 · 03" },
      },
      packages: {
        overline: "Formules",
        title: "Drie manieren om af te ronden.",
        note: "Elke uitvaart is anders. Onderstaande formules zijn een vertrekpunt — alles wordt op maat besproken.",
        priceNote: "Op aanvraag",
        items: [
          { name: "De Ceremonie", tagline: "De plechtigheid zelf.", includes: ["Reportage van de dienst", "Een handgebonden album", "Gedigitaliseerde beelden"] },
          { name: "De Dag", tagline: "Van samenkomst tot afscheid.", includes: ["Volledige dagreportage", "Uitgebreid fine-art album", "Gedigitaliseerde beelden", "Drie fine-art prints"], featured: true },
          { name: "Het Erfstuk", tagline: "Voor wie alles wil bewaren.", includes: ["Volledige dagreportage", "Premium album, groot formaat", "Volledige digitale collectie", "Set ingelijste prints"] },
        ],
      },
      faq: {
        overline: "Vragen",
        title: "Wat families vaak vragen.",
        items: [
          { q: "Is een fotograaf op een uitvaart niet ongepast?", a: "Discretie staat voorop. Ik werk zonder flits, in stilte, en op afstand waar dat hoort. Veel families ervaren de beelden achteraf als een troost — een manier om de warmte van de dag te bewaren." },
          { q: "Bepalen wij wat er gefotografeerd wordt?", a: "Volledig. In het voorbereidend gesprek leggen we samen vast welke momenten en mensen belangrijk zijn, en waar ik me net afzijdig houd." },
          { q: "Waarom film en geen digitale foto's?", a: "Film vraagt traagheid en intentie. De korrel, het licht en de warmte die analoog ontstaan, laten een herinnering ademen op een manier die een scherm niet evenaart — en het resultaat is tastbaar." },
          { q: "Hoe snel zijn de beelden klaar?", a: "Het handmatig ontwikkelen en binden vraagt tijd: doorgaans vier tot acht weken. De gedigitaliseerde beelden om te delen volgen sneller." },
        ],
      },
    },

    portret: {
      svc: "portret",
      hero: "split",
      back: "Alle diensten",
      crumb: "Dienst II",
      nav: { why: "Waarom", how: "Werkwijze", piece: "Het stuk", packages: "Formules", faq: "Vragen" },
      head: {
        overline: "Dienst II — Karakterportretten",
        title: ["Het gezicht", "dat blijft."],
        sub: "Een portret op middenformaat film houdt het karakter van wie ons gevormd heeft vast zoals een schilderij dat ooit deed — een handgemaakte print om aan de muur te hangen en door te geven.",
        fig: { tag: "Cinestill 400D", meta: "Grootouder · studio", corner: "6×7 · 01" },
      },
      why: {
        overline: "Waarom",
        lead: "De gezichten die ons gevormd hebben, zullen er niet altijd zijn.",
        body: [
          "Eeuwenlang liet wie iets had om door te geven zich schilderen — een gezicht dat de tijd trotseerde, aan de muur, van generatie op generatie. Dat portret was geen ijdelheid, maar een vorm van geheugen.",
          "Vandaag doet film dat, met dezelfde zorg en dezelfde permanentie. Een portret op middenformaat legt niet enkel een gelijkenis vast, maar een karakter — de lijnen van een leven, de blik die u herkent. Geen bestand dat verdwijnt, maar een erfstuk.",
        ],
        pull: "Een karakter,\nvastgehouden zoals\neen schilderij dat deed.",
        fig: { tag: "Kodak Portra 400", meta: "Vier generaties", corner: "6×7 · 02" },
      },
      how: {
        overline: "Werkwijze",
        title: "Tijd nemen voor één gezicht.",
        note: "Een portretsessie is geen haastige fotoshoot. We nemen de tijd om tot rust en tot het ware gezicht te komen.",
        steps: [
          { no: "01", name: "Kennismaking", text: "We bespreken wie geportretteerd wordt en waar — in het atelier of bij u thuis, waar iemand zich het meest zichzelf voelt." },
          { no: "02", name: "De sessie", text: "Rustig, op film, met natuurlijk licht waar mogelijk. Van de oudste tot de jongste van de familie, alleen of samen in één compositie." },
          { no: "03", name: "Ontwikkelen & selecteren", text: "De rolfilm wordt met de hand ontwikkeld. Samen kiezen we het beeld dat het karakter het sterkst draagt." },
          { no: "04", name: "De print", text: "Het gekozen beeld wordt afgewerkt tot een handgemaakte fine-art print op archiefpapier — klaar om in te lijsten." },
        ],
      },
      piece: {
        overline: "Het stuk",
        title: "Een print als erfstuk.",
        body: "Een handgemaakte fine-art print op archiefpapier, in een formaat dat aan de muur thuishoort. Optioneel ingelijst. Een stuk dat decennia meegaat en dat van hand tot hand wordt doorgegeven.",
        specs: [
          "Mamiya RB67 · middenformaat 6×7",
          "In het atelier of bij u thuis",
          "Handgemaakte fine-art print, archiefkwaliteit",
          "Tot vier generaties in één portret",
          "Optioneel ingelijst, op maat",
        ],
        result: ["Het stuk", "Fine-art print"],
        fig: { tag: "Ilford FP4+", meta: "Print · ingelijst", corner: "6×7 · 03" },
      },
      packages: {
        overline: "Formules",
        title: "Van één gezicht tot vier generaties.",
        note: "Een portret kan intiem of uitgebreid zijn. Onderstaande formules vormen het vertrekpunt.",
        priceNote: "Op aanvraag",
        items: [
          { name: "Het Portret", tagline: "Eén gezicht, één print.", includes: ["Sessie van één uur", "Eén handgemaakte fine-art print", "Gedigitaliseerd beeld"] },
          { name: "De Generaties", tagline: "De familie samen.", includes: ["Uitgebreide sessie", "Meerdere opstellingen", "Twee fine-art prints", "Gedigitaliseerde beelden"], featured: true },
          { name: "Het Atelier", tagline: "De volledige reeks.", includes: ["Halve dag, op locatie of in atelier", "Reeks fine-art prints", "Handgebonden portretmap", "Volledige digitale collectie"] },
        ],
      },
      faq: {
        overline: "Vragen",
        title: "Goed om te weten.",
        items: [
          { q: "Moet ik kunnen poseren?", a: "Helemaal niet. Mijn werk is net om voorbij de pose te komen. We nemen de tijd, praten, en het ware gezicht volgt vanzelf — vooral bij oudere mensen die zich niet thuis voelen voor een camera." },
          { q: "Kan dit met grootouders die moeilijk verplaatsen?", a: "Ja. Ik kom met plezier bij u of bij hen thuis, in de vertrouwde omgeving. Vaak levert dat net de mooiste, meest ontspannen portretten op." },
          { q: "Kunnen meerdere generaties samen?", a: "Absoluut — tot vier generaties in één compositie. Het samenbrengen van een familie rond één beeld is vaak het hart van een portretopdracht." },
          { q: "Wat als ik twijfel over het resultaat?", a: "We kiezen samen het eindbeeld uit de ontwikkelde film, vóór er een print gemaakt wordt. U beslist mee welk beeld het karakter het best draagt." },
        ],
      },
    },

    huwelijk: {
      svc: "huwelijk",
      hero: "wide",
      back: "Alle diensten",
      crumb: "Dienst III",
      nav: { why: "Waarom", how: "Werkwijze", piece: "Het stuk", packages: "Formules", faq: "Vragen" },
      head: {
        overline: "Dienst III — Analoge huwelijken",
        title: ["Een dag", "om te beleven."],
        sub: "Uw huwelijk op film — aanwezig maar discreet, met oog voor het licht en de stilte tussen de drukte. Een handvol beelden die de dag laten ademen, gebonden tot een album dat u jaren later nog vastpakt.",
        fig: { tag: "Kodak Gold 200", meta: "Het licht van de dag", corner: "6×7 · 01" },
      },
      why: {
        overline: "Waarom",
        lead: "Een huwelijk wordt vandaag gefotografeerd voor het scherm.",
        body: [
          "Honderden beelden, gemaakt om te posten en te vergeten. De dag verdwijnt in een harde schijf die niemand nog opent. Analoog vraagt het tegenovergestelde: aanwezigheid in plaats van overdaad.",
          "Ik fotografeer uw dag op film — een handvol weloverwogen beelden in plaats van een stortvloed. De korrel, het warme licht en de kleur die enkel analoog ontstaan, geven uw herinnering een ziel die een digitaal bestand zelden haalt.",
        ],
        pull: "Aanwezigheid,\nin plaats van\noverdaad.",
        fig: { tag: "Cinestill 400D", meta: "De belofte", corner: "6×7 · 02" },
      },
      how: {
        overline: "Werkwijze",
        title: "Beleven, niet poseren.",
        note: "Een trouwdag laat zich niet regisseren. Mijn werk is aanwezig zijn waar het gebeurt, en de rest laten gebeuren.",
        steps: [
          { no: "01", name: "Kennismaking", text: "We leren elkaar kennen, lopen de dag door en bespreken de momenten die voor jullie het meest betekenen." },
          { no: "02", name: "De dag", text: "Ik fotografeer mee doorheen de dag — aanwezig maar discreet, attent op het licht, de blikken en de stilte tussen de drukte." },
          { no: "03", name: "Met de hand afgewerkt", text: "Elke rolfilm wordt zorgvuldig ontwikkeld en geselecteerd tot de beelden die de dag werkelijk laten ademen." },
          { no: "04", name: "Het trouwalbum", text: "De selectie wordt gebonden tot een handgebonden trouwalbum, met de gedigitaliseerde beelden om te delen." },
        ],
      },
      piece: {
        overline: "Het stuk",
        title: "Een album, geen harde schijf.",
        body: "Een handgebonden trouwalbum dat op de salontafel thuishoort, niet in een vergeten map. Een stuk dat u vastpakt en doorbladert in plaats van wegswipet — jaren, decennia later nog.",
        specs: [
          "Mamiya RB67 · middenformaat 6×7",
          "Aanwezig maar discreet, de hele dag",
          "Handgebonden trouwalbum, archiefkwaliteit",
          "Gedigitaliseerde beelden inbegrepen",
          "Levering binnen vier tot acht weken",
        ],
        result: ["Het stuk", "Handgebonden trouwalbum"],
        fig: { tag: "Kodak Portra 800", meta: "Avond · het feest", corner: "6×7 · 03" },
      },
      packages: {
        overline: "Formules",
        title: "Van ceremonie tot volledige dag.",
        note: "Elke trouw heeft een eigen ritme. Onderstaande formules vormen het vertrekpunt — alles wordt op maat besproken.",
        priceNote: "Op aanvraag",
        items: [
          { name: "De Belofte", tagline: "De ceremonie.", includes: ["Reportage van de plechtigheid", "Handgebonden albumpje", "Gedigitaliseerde beelden"] },
          { name: "De Dag", tagline: "Van voorbereiding tot feest.", includes: ["Volledige dagreportage", "Handgebonden trouwalbum", "Gedigitaliseerde beelden", "Drie fine-art prints"], featured: true },
          { name: "Het Album", tagline: "Alles, in één stuk.", includes: ["Volledige dagreportage", "Premium album, groot formaat", "Volledige digitale collectie", "Set ingelijste prints"] },
        ],
      },
      faq: {
        overline: "Vragen",
        title: "Veelgestelde vragen.",
        items: [
          { q: "Krijgen we niet te weinig foto's met film?", a: "Bewust minder, maar elk beeld telt. In plaats van duizend beelden om door te scrollen krijgt u een weloverwogen selectie die de dag écht vertelt — en die u ook werkelijk bekijkt." },
          { q: "Is film niet riskant voor zo'n belangrijke dag?", a: "Ik werk al jaren analoog en altijd met back-up op meerdere camera's en films. Vakmanschap en voorbereiding maken film even betrouwbaar als het mooi is." },
          { q: "Werk je samen met een digitale fotograaf?", a: "Dat kan, als u toch ook een grote digitale collectie wenst. Veel koppels kiezen er net voor om volledig analoog te gaan — voor de rust en de ziel van het resultaat." },
          { q: "Hoe lang op voorhand boeken we best?", a: "Trouwdata raken snel vol, zeker in het hoogseizoen. Zes maanden tot een jaar vooraf is ideaal, maar vraag gerust ook last-minute na." },
        ],
      },
    },
  },

  en: {
    uitvaart: {
      svc: "uitvaart", hero: "centered", back: "All services", crumb: "Service I",
      nav: { why: "Why", how: "Approach", piece: "The piece", packages: "Formulas", faq: "Questions" },
      head: {
        overline: "Service I — Funerary photography",
        title: ["A life,", "celebrated on film."],
        sub: "Discreet reportage of a farewell, on medium-format film — not the sorrow, but the atmosphere that carries everything. A hand-bound album that remains.",
        fig: { tag: "Ilford HP5+", meta: "Ceremony · natural light", corner: "6×7 · 01" },
      },
      why: {
        overline: "Why",
        lead: "A farewell is the last time a family gathers in full around the one they loved.",
        body: [
          "That day deserves more than a phone that captures it in haste and forgets it again. Not to show the sorrow, but to keep the warmth: the people who came, the light through the window, the flowers, the hands that held one another.",
          "We live on in one another's memory. So I approach a funeral not as an event to document, but as a life to celebrate — quietly, respectfully, and with the permanence that only film gives.",
        ],
        pull: "Death is no ending.\nWe remain in one\nanother's memory.",
        fig: { tag: "Kodak Portra 400", meta: "The people together", corner: "6×7 · 02" },
      },
      how: {
        overline: "Approach", title: "Present, yet unseen.",
        note: "From the first conversation to the bound album — a calm path, entirely at your pace.",
        steps: [
          { no: "01", name: "Preparatory talk", text: "Beforehand we discuss the family's wishes, the flow of the day and which moments hold meaning. With no obligation." },
          { no: "02", name: "Discreet presence", text: "On the day I move unnoticed among the people — never intrusive, never with flash, with respect for every moment of quiet." },
          { no: "03", name: "Developed by hand", text: "Each roll is carefully developed and selected. No excess, but the images that truly carry the day." },
          { no: "04", name: "Bound into a piece", text: "The selection is finished into a hand-bound fine-art album, with digitised images to share with family." },
        ],
      },
      piece: {
        overline: "The piece", title: "An album to pass on.",
        body: "No hard drive, no fleeting cloud — a tangible, hand-bound album on archival paper. A piece that travels through generations, that you take in hand whenever you wish to remember.",
        specs: ["Mamiya RB67 Pro SD · medium-format 6×7", "Discreet reportage on location", "Hand-bound fine-art album, archival", "Digitised images included", "Delivery within four to eight weeks"],
        result: ["The piece", "Hand-bound album"],
        fig: { tag: "Cinestill 800T", meta: "Detail · the album", corner: "6×7 · 03" },
      },
      packages: {
        overline: "Formulas", title: "Three ways to round it off.",
        note: "Every funeral is different. The formulas below are a starting point — everything is discussed bespoke.",
        priceNote: "On request",
        items: [
          { name: "The Ceremony", tagline: "The service itself.", includes: ["Reportage of the service", "A hand-bound album", "Digitised images"] },
          { name: "The Day", tagline: "From gathering to farewell.", includes: ["Full-day reportage", "Extended fine-art album", "Digitised images", "Three fine-art prints"], featured: true },
          { name: "The Heirloom", tagline: "For those who wish to keep everything.", includes: ["Full-day reportage", "Premium large-format album", "Full digital collection", "Set of framed prints"] },
        ],
      },
      faq: {
        overline: "Questions", title: "What families often ask.",
        items: [
          { q: "Isn't a photographer at a funeral inappropriate?", a: "Discretion comes first. I work without flash, in silence, and at a respectful distance. Many families later find the images a comfort — a way to keep the warmth of the day." },
          { q: "Do we decide what is photographed?", a: "Entirely. In the preparatory talk we set out together which moments and people matter, and where I keep my distance." },
          { q: "Why film and not digital?", a: "Film asks for slowness and intention. The grain, light and warmth of analogue let a memory breathe in a way a screen cannot — and the result is tangible." },
          { q: "How soon are the images ready?", a: "Hand-developing and binding take time: usually four to eight weeks. The digitised images to share follow sooner." },
        ],
      },
    },
    portret: {
      svc: "portret", hero: "split", back: "All services", crumb: "Service II",
      nav: { why: "Why", how: "Approach", piece: "The piece", packages: "Formulas", faq: "Questions" },
      head: {
        overline: "Service II — Character portraits",
        title: ["The face", "that remains."],
        sub: "A portrait on medium-format film holds the character of those who shaped us the way a painting once did — a hand-made print to hang on the wall and pass on.",
        fig: { tag: "Cinestill 400D", meta: "Grandparent · studio", corner: "6×7 · 01" },
      },
      why: {
        overline: "Why",
        lead: "The faces that shaped us will not always be here.",
        body: [
          "For centuries, those with something to pass on had themselves painted — a face that outlasted time, on the wall, from one generation to the next. That portrait was not vanity, but a form of memory.",
          "Today film does that, with the same care and the same permanence. A portrait on medium format captures not just a likeness but a character — the lines of a life, the gaze you recognise. Not a file that disappears, but an heirloom.",
        ],
        pull: "A character, held\nthe way a painting\nonce did.",
        fig: { tag: "Kodak Portra 400", meta: "Four generations", corner: "6×7 · 02" },
      },
      how: {
        overline: "Approach", title: "Taking time for one face.",
        note: "A portrait sitting is no hurried shoot. We take the time to settle, and to reach the true face.",
        steps: [
          { no: "01", name: "Acquaintance", text: "We discuss who is portrayed and where — in the studio or at your home, wherever someone feels most themselves." },
          { no: "02", name: "The sitting", text: "Calmly, on film, in natural light where possible. From the eldest to the youngest, alone or together in one composition." },
          { no: "03", name: "Develop & select", text: "The roll is developed by hand. Together we choose the image that carries the character most strongly." },
          { no: "04", name: "The print", text: "The chosen image is finished into a hand-made fine-art print on archival paper — ready to frame." },
        ],
      },
      piece: {
        overline: "The piece", title: "A print as heirloom.",
        body: "A hand-made fine-art print on archival paper, in a size that belongs on a wall. Optionally framed. A piece that lasts decades and is passed from hand to hand.",
        specs: ["Mamiya RB67 · medium-format 6×7", "In the studio or at your home", "Hand-made fine-art print, archival", "Up to four generations in one portrait", "Optionally framed, bespoke"],
        result: ["The piece", "Fine-art print"],
        fig: { tag: "Ilford FP4+", meta: "Print · framed", corner: "6×7 · 03" },
      },
      packages: {
        overline: "Formulas", title: "From one face to four generations.",
        note: "A portrait can be intimate or extensive. The formulas below form the starting point.",
        priceNote: "On request",
        items: [
          { name: "The Portrait", tagline: "One face, one print.", includes: ["One-hour sitting", "One hand-made fine-art print", "Digitised image"] },
          { name: "The Generations", tagline: "The family together.", includes: ["Extended sitting", "Several arrangements", "Two fine-art prints", "Digitised images"], featured: true },
          { name: "The Atelier", tagline: "The full series.", includes: ["Half day, on location or in studio", "Series of fine-art prints", "Hand-bound portrait folio", "Full digital collection"] },
        ],
      },
      faq: {
        overline: "Questions", title: "Good to know.",
        items: [
          { q: "Do I need to know how to pose?", a: "Not at all. My work is precisely about getting past the pose. We take our time, we talk, and the true face follows on its own — especially with older people uneasy before a camera." },
          { q: "Can this be done with grandparents who travel with difficulty?", a: "Yes. I gladly come to your home or theirs, in familiar surroundings. That often yields the loveliest, most relaxed portraits." },
          { q: "Can several generations be together?", a: "Absolutely — up to four generations in one composition. Bringing a family around a single image is often the heart of a portrait commission." },
          { q: "What if I'm unsure about the result?", a: "We choose the final image together from the developed film, before any print is made. You help decide which image best carries the character." },
        ],
      },
    },
    huwelijk: {
      svc: "huwelijk", hero: "wide", back: "All services", crumb: "Service III",
      nav: { why: "Why", how: "Approach", piece: "The piece", packages: "Formulas", faq: "Questions" },
      head: {
        overline: "Service III — Analogue weddings",
        title: ["A day", "to be lived."],
        sub: "Your wedding on film — present but discreet, attentive to the light and the quiet between the bustle. A handful of images that let the day breathe, bound into an album you still pick up years later.",
        fig: { tag: "Kodak Gold 200", meta: "The light of the day", corner: "6×7 · 01" },
      },
      why: {
        overline: "Why",
        lead: "A wedding today is photographed for the screen.",
        body: [
          "Hundreds of images, made to post and forget. The day disappears into a hard drive no one opens again. Analogue asks the opposite: presence instead of excess.",
          "I photograph your day on film — a handful of considered images rather than a flood. The grain, the warm light and the colour that only analogue creates give your memory a soul a digital file rarely reaches.",
        ],
        pull: "Presence,\ninstead of\nexcess.",
        fig: { tag: "Cinestill 400D", meta: "The promise", corner: "6×7 · 02" },
      },
      how: {
        overline: "Approach", title: "Lived, not posed.",
        note: "A wedding day cannot be directed. My work is to be present where it happens, and let the rest happen.",
        steps: [
          { no: "01", name: "Acquaintance", text: "We get to know each other, walk through the day and discuss the moments that mean most to you." },
          { no: "02", name: "The day", text: "I photograph through the day — present but discreet, attentive to the light, the glances and the quiet between the bustle." },
          { no: "03", name: "Finished by hand", text: "Each roll is carefully developed and selected down to the images that truly let the day breathe." },
          { no: "04", name: "The wedding album", text: "The selection is bound into a hand-bound wedding album, with digitised images to share." },
        ],
      },
      piece: {
        overline: "The piece", title: "An album, not a hard drive.",
        body: "A hand-bound wedding album that belongs on the coffee table, not in a forgotten folder. A piece you pick up and leaf through rather than swipe past — years, decades later.",
        specs: ["Mamiya RB67 · medium-format 6×7", "Present but discreet, all day", "Hand-bound wedding album, archival", "Digitised images included", "Delivery within four to eight weeks"],
        result: ["The piece", "Hand-bound wedding album"],
        fig: { tag: "Kodak Portra 800", meta: "Evening · the party", corner: "6×7 · 03" },
      },
      packages: {
        overline: "Formulas", title: "From ceremony to the full day.",
        note: "Every wedding has its own rhythm. The formulas below form the starting point — everything is discussed bespoke.",
        priceNote: "On request",
        items: [
          { name: "The Promise", tagline: "The ceremony.", includes: ["Reportage of the ceremony", "Small hand-bound album", "Digitised images"] },
          { name: "The Day", tagline: "From preparation to party.", includes: ["Full-day reportage", "Hand-bound wedding album", "Digitised images", "Three fine-art prints"], featured: true },
          { name: "The Album", tagline: "Everything, in one piece.", includes: ["Full-day reportage", "Premium large-format album", "Full digital collection", "Set of framed prints"] },
        ],
      },
      faq: {
        overline: "Questions", title: "Frequently asked.",
        items: [
          { q: "Won't we get too few photos with film?", a: "Deliberately fewer, but each image counts. Instead of a thousand images to scroll past, you get a considered selection that truly tells the day — and that you actually look at." },
          { q: "Isn't film risky for such an important day?", a: "I've worked analogue for years, always with back-up across multiple cameras and films. Craft and preparation make film as reliable as it is beautiful." },
          { q: "Do you work with a digital photographer?", a: "I can, if you also want a large digital collection. Many couples choose to go fully analogue — for the calm and the soul of the result." },
          { q: "How far ahead should we book?", a: "Wedding dates fill quickly, especially in high season. Six months to a year ahead is ideal, but do ask about last-minute too." },
        ],
      },
    },
  },

  fr: {
    uitvaart: {
      svc: "uitvaart", hero: "centered", back: "Tous les services", crumb: "Service I",
      nav: { why: "Pourquoi", how: "Démarche", piece: "La pièce", packages: "Formules", faq: "Questions" },
      head: {
        overline: "Service I — Photographie funéraire",
        title: ["Une vie,", "célébrée sur film."],
        sub: "Reportage discret d’un adieu, sur film moyen format — non la tristesse, mais l’atmosphère qui porte tout. Un album relié à la main qui demeure.",
        fig: { tag: "Ilford HP5+", meta: "Cérémonie · lumière naturelle", corner: "6×7 · 01" },
      },
      why: {
        overline: "Pourquoi",
        lead: "Un adieu est la dernière fois qu’une famille se réunit au complet autour de celui qu’elle a aimé.",
        body: [
          "Ce jour mérite mieux qu’un téléphone qui le saisit à la hâte et l’oublie aussitôt. Non pour montrer la tristesse, mais pour garder la chaleur : les proches venus, la lumière à la fenêtre, les fleurs, les mains qui se tenaient.",
          "Nous vivons dans la mémoire les uns des autres. J’aborde donc des funérailles non comme un événement à documenter, mais comme une vie à célébrer — avec calme, respect, et la permanence que seul le film offre.",
        ],
        pull: "Mourir n’est pas une fin.\nNous demeurons dans la\nmémoire les uns des autres.",
        fig: { tag: "Kodak Portra 400", meta: "Les proches réunis", corner: "6×7 · 02" },
      },
      how: {
        overline: "Démarche", title: "Présent, mais invisible.",
        note: "Du premier échange à l’album relié — un parcours serein, entièrement à votre rythme.",
        steps: [
          { no: "01", name: "Échange préparatoire", text: "Nous discutons au préalable des souhaits de la famille, du déroulé de la journée et des moments porteurs de sens. Sans engagement." },
          { no: "02", name: "Présence discrète", text: "Le jour même, je me déplace sans me faire remarquer parmi les gens — jamais intrusif, jamais au flash, respectueux de chaque instant de silence." },
          { no: "03", name: "Développé à la main", text: "Chaque pellicule est soigneusement développée et sélectionnée. Pas d’excès, mais les images qui portent réellement la journée." },
          { no: "04", name: "Relié en une pièce", text: "La sélection est finie en un album fine-art relié à la main, avec les images numérisées à partager en famille." },
        ],
      },
      piece: {
        overline: "La pièce", title: "Un album à transmettre.",
        body: "Pas de disque dur, pas de cloud éphémère — un album tangible, relié à la main sur papier d’archive. Une pièce qui traverse les générations et que l’on prend en main lorsqu’on veut se souvenir.",
        specs: ["Mamiya RB67 Pro SD · moyen format 6×7", "Reportage discret sur place", "Album fine-art relié à la main, qualité archive", "Images numérisées incluses", "Livraison sous quatre à huit semaines"],
        result: ["La pièce", "Album relié à la main"],
        fig: { tag: "Cinestill 800T", meta: "Détail · l’album", corner: "6×7 · 03" },
      },
      packages: {
        overline: "Formules", title: "Trois façons de conclure.",
        note: "Chaque cérémonie est différente. Les formules ci-dessous sont un point de départ — tout se discute sur mesure.",
        priceNote: "Sur demande",
        items: [
          { name: "La Cérémonie", tagline: "La cérémonie elle-même.", includes: ["Reportage de la cérémonie", "Un album relié à la main", "Images numérisées"] },
          { name: "La Journée", tagline: "Du rassemblement à l’adieu.", includes: ["Reportage de la journée complète", "Album fine-art étendu", "Images numérisées", "Trois tirages fine-art"], featured: true },
          { name: "L’Héritage", tagline: "Pour qui veut tout garder.", includes: ["Reportage de la journée complète", "Album premium, grand format", "Collection numérique complète", "Série de tirages encadrés"] },
        ],
      },
      faq: {
        overline: "Questions", title: "Ce que les familles demandent souvent.",
        items: [
          { q: "Un photographe à des funérailles, n’est-ce pas déplacé ?", a: "La discrétion prime. Je travaille sans flash, en silence, et à distance là où il le faut. Beaucoup de familles vivent les images après coup comme un réconfort — une manière de garder la chaleur de la journée." },
          { q: "Décidons-nous ce qui est photographié ?", a: "Entièrement. Lors de l’échange préparatoire, nous définissons ensemble les moments et les personnes qui comptent, et là où je me tiens à l’écart." },
          { q: "Pourquoi le film et non le numérique ?", a: "Le film exige lenteur et intention. Le grain, la lumière et la chaleur que crée l’analogique laissent respirer un souvenir d’une manière qu’un écran n’égale pas — et le résultat est tangible." },
          { q: "Quand les images sont-elles prêtes ?", a: "Le développement et la reliure à la main prennent du temps : généralement quatre à huit semaines. Les images numérisées à partager suivent plus vite." },
        ],
      },
    },
    portret: {
      svc: "portret", hero: "split", back: "Tous les services", crumb: "Service II",
      nav: { why: "Pourquoi", how: "Démarche", piece: "La pièce", packages: "Formules", faq: "Questions" },
      head: {
        overline: "Service II — Portraits de caractère",
        title: ["Le visage", "qui demeure."],
        sub: "Un portrait sur film moyen format retient le caractère de ceux qui nous ont façonnés comme une peinture le faisait jadis — un tirage fait main à accrocher au mur et à transmettre.",
        fig: { tag: "Cinestill 400D", meta: "Grand-parent · atelier", corner: "6×7 · 01" },
      },
      why: {
        overline: "Pourquoi",
        lead: "Les visages qui nous ont façonnés ne seront pas toujours là.",
        body: [
          "Pendant des siècles, qui avait quelque chose à transmettre se faisait peindre — un visage qui défiait le temps, au mur, de génération en génération. Ce portrait n’était pas vanité, mais une forme de mémoire.",
          "Aujourd’hui le film le fait, avec le même soin et la même permanence. Un portrait en moyen format ne capte pas seulement une ressemblance mais un caractère — les traits d’une vie, le regard que vous reconnaissez. Non un fichier qui disparaît, mais un héritage.",
        ],
        pull: "Un caractère, retenu\ncomme une peinture\nle faisait jadis.",
        fig: { tag: "Kodak Portra 400", meta: "Quatre générations", corner: "6×7 · 02" },
      },
      how: {
        overline: "Démarche", title: "Prendre le temps d’un visage.",
        note: "Une séance de portrait n’est pas une prise de vue pressée. Nous prenons le temps de nous poser, et d’atteindre le vrai visage.",
        steps: [
          { no: "01", name: "Rencontre", text: "Nous discutons de qui sera portraituré et où — en atelier ou chez vous, là où chacun se sent le plus lui-même." },
          { no: "02", name: "La séance", text: "Sereinement, sur film, en lumière naturelle si possible. De l’aîné au plus jeune, seul ou réunis dans une seule composition." },
          { no: "03", name: "Développer & choisir", text: "La pellicule est développée à la main. Ensemble, nous choisissons l’image qui porte le plus fortement le caractère." },
          { no: "04", name: "Le tirage", text: "L’image choisie est finie en un tirage fine-art fait main sur papier d’archive — prêt à encadrer." },
        ],
      },
      piece: {
        overline: "La pièce", title: "Un tirage en héritage.",
        body: "Un tirage fine-art fait main sur papier d’archive, dans un format qui a sa place au mur. Encadré en option. Une pièce qui dure des décennies et se transmet de main en main.",
        specs: ["Mamiya RB67 · moyen format 6×7", "En atelier ou chez vous", "Tirage fine-art fait main, qualité archive", "Jusqu’à quatre générations en un portrait", "Encadré en option, sur mesure"],
        result: ["La pièce", "Tirage fine-art"],
        fig: { tag: "Ilford FP4+", meta: "Tirage · encadré", corner: "6×7 · 03" },
      },
      packages: {
        overline: "Formules", title: "D’un visage à quatre générations.",
        note: "Un portrait peut être intime ou étendu. Les formules ci-dessous forment le point de départ.",
        priceNote: "Sur demande",
        items: [
          { name: "Le Portrait", tagline: "Un visage, un tirage.", includes: ["Séance d’une heure", "Un tirage fine-art fait main", "Image numérisée"] },
          { name: "Les Générations", tagline: "La famille réunie.", includes: ["Séance étendue", "Plusieurs mises en scène", "Deux tirages fine-art", "Images numérisées"], featured: true },
          { name: "L’Atelier", tagline: "La série complète.", includes: ["Demi-journée, sur place ou en atelier", "Série de tirages fine-art", "Portfolio de portraits relié à la main", "Collection numérique complète"] },
        ],
      },
      faq: {
        overline: "Questions", title: "Bon à savoir.",
        items: [
          { q: "Dois-je savoir poser ?", a: "Pas du tout. Mon travail consiste justement à dépasser la pose. Nous prenons le temps, nous parlons, et le vrai visage suit de lui-même — surtout chez les aînés mal à l’aise devant un appareil." },
          { q: "Est-ce possible avec des grands-parents qui se déplacent difficilement ?", a: "Oui. Je viens volontiers chez vous ou chez eux, dans un cadre familier. Cela donne souvent les portraits les plus beaux et les plus détendus." },
          { q: "Plusieurs générations peuvent-elles être réunies ?", a: "Absolument — jusqu’à quatre générations dans une seule composition. Réunir une famille autour d’une image est souvent le cœur d’une commande de portrait." },
          { q: "Et si je doute du résultat ?", a: "Nous choisissons ensemble l’image finale parmi la pellicule développée, avant tout tirage. Vous décidez avec moi quelle image porte le mieux le caractère." },
        ],
      },
    },
    huwelijk: {
      svc: "huwelijk", hero: "wide", back: "Tous les services", crumb: "Service III",
      nav: { why: "Pourquoi", how: "Démarche", piece: "La pièce", packages: "Formules", faq: "Questions" },
      head: {
        overline: "Service III — Mariages analogiques",
        title: ["Un jour", "à vivre."],
        sub: "Votre mariage sur film — présent mais discret, attentif à la lumière et au silence entre l’effervescence. Une poignée d’images qui laissent respirer la journée, reliées en un album que l’on reprend des années plus tard.",
        fig: { tag: "Kodak Gold 200", meta: "La lumière du jour", corner: "6×7 · 01" },
      },
      why: {
        overline: "Pourquoi",
        lead: "Un mariage aujourd’hui se photographie pour l’écran.",
        body: [
          "Des centaines d’images, faites pour publier et oublier. La journée disparaît dans un disque dur que personne ne rouvre. L’analogique demande l’inverse : de la présence plutôt que de l’excès.",
          "Je photographie votre journée sur film — une poignée d’images réfléchies plutôt qu’un déluge. Le grain, la lumière chaude et la couleur que seul l’analogique crée donnent à votre souvenir une âme qu’un fichier numérique atteint rarement.",
        ],
        pull: "De la présence,\nplutôt que\nde l’excès.",
        fig: { tag: "Cinestill 400D", meta: "La promesse", corner: "6×7 · 02" },
      },
      how: {
        overline: "Démarche", title: "Vivre, non poser.",
        note: "Un jour de mariage ne se met pas en scène. Mon travail est d’être présent là où cela se passe, et de laisser le reste advenir.",
        steps: [
          { no: "01", name: "Rencontre", text: "Nous apprenons à nous connaître, parcourons la journée et discutons des moments qui comptent le plus pour vous." },
          { no: "02", name: "Le jour", text: "Je photographie tout au long de la journée — présent mais discret, attentif à la lumière, aux regards et au silence entre l’effervescence." },
          { no: "03", name: "Fini à la main", text: "Chaque pellicule est soigneusement développée et réduite aux images qui laissent vraiment respirer la journée." },
          { no: "04", name: "L’album de mariage", text: "La sélection est reliée en un album de mariage fait main, avec les images numérisées à partager." },
        ],
      },
      piece: {
        overline: "La pièce", title: "Un album, non un disque dur.",
        body: "Un album de mariage relié à la main qui a sa place sur la table du salon, non dans un dossier oublié. Une pièce que l’on prend et feuillette plutôt que de la balayer du doigt — des années, des décennies plus tard.",
        specs: ["Mamiya RB67 · moyen format 6×7", "Présent mais discret, toute la journée", "Album de mariage relié à la main, qualité archive", "Images numérisées incluses", "Livraison sous quatre à huit semaines"],
        result: ["La pièce", "Album de mariage relié à la main"],
        fig: { tag: "Kodak Portra 800", meta: "Soir · la fête", corner: "6×7 · 03" },
      },
      packages: {
        overline: "Formules", title: "De la cérémonie à la journée entière.",
        note: "Chaque mariage a son propre rythme. Les formules ci-dessous forment le point de départ — tout se discute sur mesure.",
        priceNote: "Sur demande",
        items: [
          { name: "La Promesse", tagline: "La cérémonie.", includes: ["Reportage de la cérémonie", "Petit album relié à la main", "Images numérisées"] },
          { name: "La Journée", tagline: "Des préparatifs à la fête.", includes: ["Reportage de la journée complète", "Album de mariage relié à la main", "Images numérisées", "Trois tirages fine-art"], featured: true },
          { name: "L’Album", tagline: "Tout, en une pièce.", includes: ["Reportage de la journée complète", "Album premium, grand format", "Collection numérique complète", "Série de tirages encadrés"] },
        ],
      },
      faq: {
        overline: "Questions", title: "Questions fréquentes.",
        items: [
          { q: "N’aurons-nous pas trop peu de photos avec le film ?", a: "Volontairement moins, mais chaque image compte. Au lieu de mille images à faire défiler, vous recevez une sélection réfléchie qui raconte vraiment la journée — et que vous regardez réellement." },
          { q: "Le film n’est-il pas risqué pour un jour si important ?", a: "Je travaille en analogique depuis des années, toujours avec des sauvegardes sur plusieurs appareils et pellicules. Le métier et la préparation rendent le film aussi fiable qu’il est beau." },
          { q: "Travaillez-vous avec un photographe numérique ?", a: "C’est possible, si vous souhaitez aussi une grande collection numérique. Beaucoup de couples choisissent justement le tout analogique — pour le calme et l’âme du résultat." },
          { q: "Combien de temps à l’avance réserver ?", a: "Les dates de mariage se remplissent vite, surtout en haute saison. Six mois à un an à l’avance est idéal, mais n’hésitez pas à demander en dernière minute." },
        ],
      },
    },
  },
};
