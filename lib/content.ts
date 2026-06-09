/* Milo Weiler — bilingual copy + data, typed.
   Converted from the browser-global content.js (window.MW) to a typed module.
   Copy text (NL / EN / FR) preserved verbatim. */

export type Lang = "nl" | "en" | "fr";

export interface Nav {
  filosofie: string;
  uitvaart: string;
  portret: string;
  huwelijk: string;
  werk: string;
  contact: string;
}

export interface Hero {
  overline: string;
  title: [string, string];
  sub: string;
  cue: string;
  cta: string;
}

export interface PhiloService {
  key: string;
  no: string;
  name: string;
  note: string;
  fig: [string, string];
}

export interface Philosophy {
  overline: string;
  pull: string;
  lead: string;
  body: string;
  name: string;
  role: string;
  indexOverline: string;
  services: PhiloService[];
}

export interface ServiceFigure {
  tag: string;
  meta: string;
  corner: string;
}

export interface Service {
  id: string;
  overline: string;
  kicker: string;
  title: string;
  why: string;
  bodyTitle: string;
  body: string[];
  bodyTitleEn?: string;
  specs: string[];
  result: [string, string];
  figures: ServiceFigure[];
}

export interface ProcessStep {
  no: string;
  name: string;
  text: string;
}

export interface ProcessInfo {
  overline: string;
  title: string;
  note: string;
  steps: ProcessStep[];
}

export interface WorkFrame {
  stock: string;
  meta: string;
  corner: string;
}

export interface Work {
  overline: string;
  title: string;
  note: string;
  frames: WorkFrame[];
}

export interface Closing {
  overline: string;
  statement: string;
  sub: string;
}

export interface ContactLine {
  k: string;
  v: string;
  href: string;
}

export interface Contact {
  overline: string;
  title: string;
  body: string;
  callBtn: string;
  mailBtn: string;
  lines: ContactLine[];
}

export interface Foot {
  tagline: string;
  navTitle: string;
  contactTitle: string;
  legalTitle: string;
  legal: string[];
  rights: string;
  made: string;
}

export interface SiteContent {
  nav: Nav;
  hero: Hero;
  philosophy: Philosophy;
  services: Service[];
  process: ProcessInfo;
  work: Work;
  closing: Closing;
  contact: Contact;
  foot: Foot;
}

export const MW: Record<Lang, SiteContent> = {
  nl: {
    nav: { filosofie: "Filosofie", uitvaart: "Uitvaart", portret: "Portret", huwelijk: "Huwelijk", werk: "Werk", contact: "Contact" },

    hero: {
      overline: "Analoge fotografie · Antwerpen & Brussel",
      title: ["Een viering", "van het leven."],
      sub: "High-end fotografie op film voor de momenten die blijven — een afscheid, een gezicht, een belofte. Want sterven is geen einde: we leven voort in elkaars herinnering.",
      cue: "Ontdek",
      cta: "Maak kennis",
    },

    /* 01 — overkoepelend: wat en waarom bied ik dit aan */
    philosophy: {
      overline: "01 — Wat & waarom",
      pull: "Analoog\nherinnert.",
      lead: "We leven sneller en zien meer dan ooit. Duizenden beelden per dag, gemaakt om te scrollen en te vergeten. Analoog is het tegenovergestelde: traag, met intentie, gemaakt om te blijven.",
      body: "Ik geloof dat de mooiste momenten van een leven die traagheid verdienen. Daarom werk ik op middenformaat film — niet om een moment vast te grijpen, maar om het door te geven. Een beeld dat je in de hand neemt, dat aan de muur hangt, dat generaties meegaat. Die filosofie vertaal ik naar drie diensten rond de momenten die er echt toe doen.",
      name: "Milo Weiler",
      role: "Analoog fotograaf — Antwerpen & Brussel",
      indexOverline: "Drie diensten",
      services: [
        { key: "uitvaart", no: "I",   name: "Uitvaartfotografie",     note: "Een leven, gevierd op film.", fig: ["UITVAART", "6×7 · I"] },
        { key: "portret",  no: "II",  name: "Karakterportretten",     note: "Het gezicht dat blijft.",     fig: ["PORTRET", "6×7 · II"] },
        { key: "huwelijk", no: "III", name: "Analoge huwelijken",     note: "Een dag om te beleven.",      fig: ["HUWELIJK", "6×7 · III"] },
      ],
    },

    /* Drie diensten, telkens van A tot Z: waarom → wat & hoe → het stuk */
    services: [
      {
        id: "uitvaart",
        overline: "02 — Uitvaartfotografie",
        kicker: "Dienst I",
        title: "Een leven, gevierd.",
        why: "Een afscheid is de laatste keer dat een familie volledig samenkomt rond wie ze liefhadden. Die dag verdient meer dan een telefoon die hem haastig vastlegt en weer vergeet.",
        bodyTitle: "Wat ik doe, en hoe",
        body: [
          "Met respect en volledige discretie leg ik de dag vast op middenformaat film — zonder de momenten te verstoren waarop mensen alleen willen zijn. Niet de droefheid, maar de atmosfeer die alles draagt: het licht, de bloemen, de mensen samen.",
          "Geen overdaad aan beelden, maar een weloverwogen selectie, met de hand ontwikkeld en afgewerkt. Het resultaat is een handgebonden fine-art album dat blijft — en de gedigitaliseerde foto’s om te delen.",
        ],
        specs: [
          "Mamiya RB67 Pro SD · middenformaat film",
          "Discrete reportage ter plaatse",
          "Een handgebonden fine-art album",
          "Gedigitaliseerde foto’s inbegrepen",
          "Levering binnen vier tot acht weken",
        ],
        result: ["Het stuk", "Handgebonden album"],
        figures: [
          { tag: "Ilford HP5+", meta: "Sfeer · ceremonie", corner: "6×7 · A" },
          { tag: "Kodak Portra 400", meta: "De mensen samen", corner: "6×7 · B" },
        ],
      },
      {
        id: "portret",
        overline: "03 — Karakterportretten",
        kicker: "Dienst II",
        title: "Het gezicht dat blijft.",
        why: "De gezichten die ons gevormd hebben — een grootouder, een ouder — zullen er niet altijd zijn. Een portret op film houdt hun karakter vast zoals een schilderij dat ooit deed.",
        bodyTitle: "Wat ik doe, en hoe",
        body: [
          "Eeuwenlang liet wie iets had om door te geven zich schilderen — een gezicht dat de tijd trotseerde, aan de muur, van generatie op generatie. Vandaag doet film dat, met dezelfde zorg en dezelfde permanentie.",
          "Een portret op middenformaat, in de studio of bij u thuis. Van de oudste tot de jongste van de familie, samen in één stuk. Geen bestand dat verdwijnt, maar een handgemaakte fine-art print — een erfstuk om door te geven.",
        ],
        specs: [
          "Mamiya RB67 · middenformaat film",
          "In de studio of bij u thuis",
          "Handgemaakte fine-art print",
          "Tot vier generaties in één portret",
          "Een stuk om door te geven",
        ],
        result: ["Het stuk", "Fine-art print"],
        figures: [
          { tag: "Cinestill 400D", meta: "Grootouder · studio", corner: "6×7 · A" },
          { tag: "Kodak Portra 400", meta: "Vier generaties", corner: "6×7 · B" },
        ],
      },
      {
        id: "huwelijk",
        overline: "04 — Analoge huwelijken",
        kicker: "Dienst III",
        title: "Een dag om te beleven.",
        why: "Een huwelijk wordt vandaag gefotografeerd voor het scherm: honderden beelden, gemaakt om te posten en te vergeten. Analoog vraagt om aanwezigheid in plaats van overdaad.",
        bodyTitle: "Wat ik doe, en hoe",
        body: [
          "Ik fotografeer uw dag op film — aanwezig maar discreet, met oog voor het licht, de blikken en de stilte tussen de drukte. Een handvol beelden die de dag laten ademen, in plaats van een harde schijf die hem verzwelgt.",
          "Elke rolfilm wordt met zorg ontwikkeld en met de hand afgewerkt tot een handgebonden trouwalbum — een stuk dat u jaren later nog vastpakt, niet wegswipet.",
        ],
        specs: [
          "Mamiya RB67 · middenformaat film",
          "Aanwezig maar discreet, de hele dag",
          "Een handgebonden trouwalbum",
          "Gedigitaliseerde beelden inbegrepen",
          "Levering binnen vier tot acht weken",
        ],
        result: ["Het stuk", "Handgebonden trouwalbum"],
        figures: [
          { tag: "Kodak Gold 200", meta: "Het licht van de dag", corner: "6×7 · A" },
          { tag: "Cinestill 400D", meta: "De belofte", corner: "6×7 · B" },
        ],
      },
    ],

    /* Stappenplan — één heldere weg, zo laagdrempelig mogelijk */
    process: {
      overline: "05 — Zo verloopt het",
      title: "Van eerste gesprek tot stuk in handen.",
      note: "Eén aanspreekpunt, een vaste prijs vooraf, geen verrassingen. Hetzelfde eenvoudige traject voor elke dienst.",
      steps: [
        { no: "I",   name: "Kennismaking", text: "Een vrijblijvend gesprek, per telefoon of in persoon. We bespreken wat u wil vastleggen — zonder enige verplichting." },
        { no: "II",  name: "Boeking",      text: "We leggen datum en omvang vast en u krijgt een heldere prijs. Een klein voorschot bevestigt de afspraak." },
        { no: "III", name: "De opname",    text: "Ik kom op het afgesproken moment — rustig, op film, en laat de dag z’n gang gaan." },
        { no: "IV",  name: "Het stuk",     text: "Met de hand ontwikkeld, geselecteerd en gebonden. Geleverd binnen vier tot acht weken, saldo bij levering." },
      ],
    },

    /* Portfolio — voorbeeldbeelden van het eindproduct */
    work: {
      overline: "06 — Portfolio",
      title: "Licht, warmte, leven.",
      note: "Een selectie sfeerbeelden op film. De korrel, het licht en de kleur die enkel analoog ontstaan — en die een herinnering laten ademen.",
      frames: [
        { stock: "Cinestill 400D", meta: "Portret", corner: "6×7 · A" },
        { stock: "Kodak Portra 400", meta: "Familie", corner: "6×7 · B" },
        { stock: "Kodak Gold 200", meta: "Sfeer", corner: "6×7 · C" },
        { stock: "Ilford HP5+", meta: "Detail", corner: "6×7 · D" },
      ],
    },

    /* Slotstatement */
    closing: {
      overline: "07 — Tot slot",
      statement: "Sommige momenten\nkomen één keer.",
      sub: "Laten we ze maken om te blijven.",
    },

    contact: {
      overline: "08 — Maak kennis",
      title: "Laten we kennismaken.",
      body: "Voor een afscheid, een portret, een huwelijk of gewoon een eerste gesprek ben ik rechtstreeks bereikbaar. Vertel me wat u wil vastleggen — we maken er samen een stuk van dat blijft.",
      callBtn: "Bel +32 476 50 62 09",
      mailBtn: "Stuur een bericht",
      lines: [
        { k: "Telefoon", v: "+32 476 50 62 09", href: "tel:+32476506209" },
        { k: "E-mail", v: "milo.weiler@gmail.com", href: "mailto:milo.weiler@gmail.com" },
        { k: "Atelier", v: "Hof Savelkoul 40, 2640 Mortsel", href: "" },
        { k: "Instagram", v: "@miloweiler", href: "https://instagram.com/miloweiler" },
      ],
    },

    foot: {
      tagline: "Analoge fotografie die herinnert.",
      navTitle: "Pagina",
      contactTitle: "Contact",
      legalTitle: "Administratief",
      legal: ["BTW BE 0791 549 197", "KBC BE07 7370 6524 4566"],
      rights: "© 2026 Milo Weiler. Alle rechten voorbehouden.",
      made: "Op film, met zorg.",
    },
  },

  en: {
    nav: { filosofie: "Philosophy", uitvaart: "Funerary", portret: "Portrait", huwelijk: "Weddings", werk: "Work", contact: "Contact" },

    hero: {
      overline: "Analogue photography · Antwerp & Brussels",
      title: ["A celebration", "of life."],
      sub: "High-end photography on film for the moments that last — a farewell, a face, a promise. For death is no ending: we live on in one another’s memory.",
      cue: "Discover",
      cta: "Get acquainted",
    },

    philosophy: {
      overline: "01 — What & why",
      pull: "Analogue\nremembers.",
      lead: "We live faster and see more than ever. Thousands of images a day, made to scroll past and forget. Film is the opposite: slow, intentional, made to last.",
      body: "I believe the finest moments of a life deserve that slowness. So I work on medium-format film — not to seize a moment, but to pass it on. An image you take in your hand, that hangs on the wall, that travels through generations. I translate that philosophy into three services, around the moments that truly matter.",
      name: "Milo Weiler",
      role: "Analogue photographer — Antwerp & Brussels",
      indexOverline: "Three services",
      services: [
        { key: "uitvaart", no: "I",   name: "Funerary photography",  note: "A life, celebrated on film.", fig: ["FUNERARY", "6×7 · I"] },
        { key: "portret",  no: "II",  name: "Character portraits",   note: "The face that remains.",      fig: ["PORTRAIT", "6×7 · II"] },
        { key: "huwelijk", no: "III", name: "Analogue weddings",     note: "A day to be lived.",          fig: ["WEDDING", "6×7 · III"] },
      ],
    },

    services: [
      {
        id: "uitvaart",
        overline: "02 — Funerary photography",
        kicker: "Service I",
        title: "A life, celebrated.",
        why: "A farewell is the last time a family gathers in full around the one they loved. That day deserves more than a phone that captures it in haste and forgets it again.",
        bodyTitle: "What I do, and how",
        body: [
          "With respect and complete discretion I capture the day on medium-format film — without disturbing the moments where people wish to be alone. Not the sorrow, but the atmosphere that carries everything: the light, the flowers, the people together.",
          "No flood of images, but a considered selection, developed and finished by hand. The result is a hand-bound fine-art album that remains — and the digitised photographs to share.",
        ],
        bodyTitleEn: "What I do, and how",
        specs: [
          "Mamiya RB67 Pro SD · medium-format film",
          "Discreet reportage on location",
          "A hand-bound fine-art album",
          "Digitised photographs included",
          "Delivery within four to eight weeks",
        ],
        result: ["The piece", "Hand-bound album"],
        figures: [
          { tag: "Ilford HP5+", meta: "Atmosphere · ceremony", corner: "6×7 · A" },
          { tag: "Kodak Portra 400", meta: "The people together", corner: "6×7 · B" },
        ],
      },
      {
        id: "portret",
        overline: "03 — Character portraits",
        kicker: "Service II",
        title: "The face that remains.",
        why: "The faces that shaped us — a grandparent, a parent — will not always be here. A portrait on film holds their character the way a painting once did.",
        bodyTitle: "What I do, and how",
        body: [
          "For centuries, those with something to pass on had themselves painted — a face that outlasted time, on the wall, from one generation to the next. Today film does that, with the same care and the same permanence.",
          "A portrait on medium format, in the studio or at your home. From the eldest to the youngest of the family, together in a single piece. Not a file that disappears, but a hand-made fine-art print — an heirloom to pass on.",
        ],
        specs: [
          "Mamiya RB67 · medium-format film",
          "In the studio or at your home",
          "Hand-made fine-art print",
          "Up to four generations in one portrait",
          "A piece to pass on",
        ],
        result: ["The piece", "Fine-art print"],
        figures: [
          { tag: "Cinestill 400D", meta: "Grandparent · studio", corner: "6×7 · A" },
          { tag: "Kodak Portra 400", meta: "Four generations", corner: "6×7 · B" },
        ],
      },
      {
        id: "huwelijk",
        overline: "04 — Analogue weddings",
        kicker: "Service III",
        title: "A day to be lived.",
        why: "A wedding today is photographed for the screen: hundreds of images, made to post and forget. Analogue asks for presence instead of excess.",
        bodyTitle: "What I do, and how",
        body: [
          "I photograph your day on film — present but discreet, attentive to the light, the glances and the quiet between the bustle. A handful of images that let the day breathe, rather than a hard drive that swallows it.",
          "Each roll is developed with care and finished by hand into a bound wedding album — a piece you still pick up years later, instead of swiping past.",
        ],
        specs: [
          "Mamiya RB67 · medium-format film",
          "Present but discreet, all day",
          "A hand-bound wedding album",
          "Digitised images included",
          "Delivery within four to eight weeks",
        ],
        result: ["The piece", "Hand-bound wedding album"],
        figures: [
          { tag: "Kodak Gold 200", meta: "The light of the day", corner: "6×7 · A" },
          { tag: "Cinestill 400D", meta: "The promise", corner: "6×7 · B" },
        ],
      },
    ],

    process: {
      overline: "05 — How it unfolds",
      title: "From first conversation to a piece in hand.",
      note: "One point of contact, a fixed price up front, no surprises. The same simple path for every service.",
      steps: [
        { no: "I",   name: "Acquaintance", text: "A no-obligation conversation, by phone or in person. We discuss what you wish to capture — with no commitment." },
        { no: "II",  name: "Booking",      text: "We set the date and scope and you receive a clear price. A small deposit confirms the appointment." },
        { no: "III", name: "The sitting",  text: "I arrive at the agreed moment — calmly, on film, and let the day unfold." },
        { no: "IV",  name: "The piece",    text: "Developed, selected and bound by hand. Delivered within four to eight weeks, balance on delivery." },
      ],
    },

    work: {
      overline: "06 — Portfolio",
      title: "Light, warmth, life.",
      note: "A selection of images on film. The grain, the light and the colour that only analogue creates — and that lets a memory breathe.",
      frames: [
        { stock: "Cinestill 400D", meta: "Portrait", corner: "6×7 · A" },
        { stock: "Kodak Portra 400", meta: "Family", corner: "6×7 · B" },
        { stock: "Kodak Gold 200", meta: "Atmosphere", corner: "6×7 · C" },
        { stock: "Ilford HP5+", meta: "Detail", corner: "6×7 · D" },
      ],
    },

    closing: {
      overline: "07 — In closing",
      statement: "Some moments\ncome only once.",
      sub: "Let’s make them to last.",
    },

    contact: {
      overline: "08 — Get acquainted",
      title: "Let’s get acquainted.",
      body: "For a farewell, a portrait, a wedding or simply a first conversation, I am directly reachable. Tell me what you wish to capture — together we will make a piece that remains.",
      callBtn: "Call +32 476 50 62 09",
      mailBtn: "Send a message",
      lines: [
        { k: "Phone", v: "+32 476 50 62 09", href: "tel:+32476506209" },
        { k: "E-mail", v: "milo.weiler@gmail.com", href: "mailto:milo.weiler@gmail.com" },
        { k: "Studio", v: "Hof Savelkoul 40, 2640 Mortsel", href: "" },
        { k: "Instagram", v: "@miloweiler", href: "https://instagram.com/miloweiler" },
      ],
    },

    foot: {
      tagline: "Analogue photography that remembers.",
      navTitle: "Page",
      contactTitle: "Contact",
      legalTitle: "Administrative",
      legal: ["VAT BE 0791 549 197", "KBC BE07 7370 6524 4566"],
      rights: "© 2026 Milo Weiler. All rights reserved.",
      made: "On film, with care.",
    },
  },

  fr: {
    nav: { filosofie: "Philosophie", uitvaart: "Funéraire", portret: "Portrait", huwelijk: "Mariages", werk: "Travail", contact: "Contact" },

    hero: {
      overline: "Photographie analogique · Anvers & Bruxelles",
      title: ["Une célébration", "de la vie."],
      sub: "Photographie haut de gamme sur film pour les instants qui demeurent — un adieu, un visage, une promesse. Car mourir n’est pas une fin : nous vivons dans la mémoire les uns des autres.",
      cue: "Découvrir",
      cta: "Faire connaissance",
    },

    philosophy: {
      overline: "01 — Quoi & pourquoi",
      pull: "L’analogique\nse souvient.",
      lead: "Nous vivons plus vite et voyons plus que jamais. Des milliers d’images par jour, faites pour défiler et s’oublier. L’analogique est l’inverse : lent, intentionnel, fait pour durer.",
      body: "Je crois que les plus beaux instants d’une vie méritent cette lenteur. C’est pourquoi je travaille sur film moyen format — non pour saisir un instant, mais pour le transmettre. Une image que l’on tient dans la main, que l’on accroche au mur, qui traverse les générations. Je décline cette philosophie en trois services, autour des moments qui comptent vraiment.",
      name: "Milo Weiler",
      role: "Photographe analogique — Anvers & Bruxelles",
      indexOverline: "Trois services",
      services: [
        { key: "uitvaart", no: "I",   name: "Photographie funéraire", note: "Une vie, célébrée sur film.", fig: ["FUNÉRAIRE", "6×7 · I"] },
        { key: "portret",  no: "II",  name: "Portraits de caractère", note: "Le visage qui demeure.",     fig: ["PORTRAIT", "6×7 · II"] },
        { key: "huwelijk", no: "III", name: "Mariages analogiques",   note: "Un jour à vivre.",           fig: ["MARIAGE", "6×7 · III"] },
      ],
    },

    services: [
      {
        id: "uitvaart",
        overline: "02 — Photographie funéraire",
        kicker: "Service I",
        title: "Une vie, célébrée.",
        why: "Un adieu est la dernière fois qu’une famille se réunit au complet autour de celui qu’elle a aimé. Ce jour mérite mieux qu’un téléphone qui le saisit à la hâte et l’oublie aussitôt.",
        bodyTitle: "Ce que je fais, et comment",
        body: [
          "Avec respect et une discrétion totale, je capte la journée sur film moyen format — sans troubler les moments où chacun souhaite être seul. Non la tristesse, mais l’atmosphère qui porte tout : la lumière, les fleurs, les gens réunis.",
          "Pas un flot d’images, mais une sélection réfléchie, développée et finie à la main. Le résultat est un album fine-art relié à la main qui demeure — et les photographies numérisées à partager.",
        ],
        specs: [
          "Mamiya RB67 Pro SD · film moyen format",
          "Reportage discret sur place",
          "Un album fine-art relié à la main",
          "Photographies numérisées incluses",
          "Livraison sous quatre à huit semaines",
        ],
        result: ["La pièce", "Album relié à la main"],
        figures: [
          { tag: "Ilford HP5+", meta: "Ambiance · cérémonie", corner: "6×7 · A" },
          { tag: "Kodak Portra 400", meta: "Les proches réunis", corner: "6×7 · B" },
        ],
      },
      {
        id: "portret",
        overline: "03 — Portraits de caractère",
        kicker: "Service II",
        title: "Le visage qui demeure.",
        why: "Les visages qui nous ont façonnés — un grand-parent, un parent — ne seront pas toujours là. Un portrait sur film en retient le caractère comme une peinture le faisait jadis.",
        bodyTitle: "Ce que je fais, et comment",
        body: [
          "Pendant des siècles, qui avait quelque chose à transmettre se faisait peindre — un visage qui défiait le temps, au mur, de génération en génération. Aujourd’hui le film le fait, avec le même soin et la même permanence.",
          "Un portrait en moyen format, en atelier ou chez vous. De l’aîné au plus jeune de la famille, ensemble dans une seule pièce. Non un fichier qui disparaît, mais un tirage fine-art fait main — un héritage à transmettre.",
        ],
        specs: [
          "Mamiya RB67 · film moyen format",
          "En atelier ou chez vous",
          "Tirage fine-art fait main",
          "Jusqu’à quatre générations en un portrait",
          "Une pièce à transmettre",
        ],
        result: ["La pièce", "Tirage fine-art"],
        figures: [
          { tag: "Cinestill 400D", meta: "Grand-parent · atelier", corner: "6×7 · A" },
          { tag: "Kodak Portra 400", meta: "Quatre générations", corner: "6×7 · B" },
        ],
      },
      {
        id: "huwelijk",
        overline: "04 — Mariages analogiques",
        kicker: "Service III",
        title: "Un jour à vivre.",
        why: "Un mariage aujourd’hui se photographie pour l’écran : des centaines d’images, faites pour publier et oublier. L’analogique demande de la présence plutôt que de l’excès.",
        bodyTitle: "Ce que je fais, et comment",
        body: [
          "Je photographie votre journée sur film — présent mais discret, attentif à la lumière, aux regards et au silence entre l’effervescence. Une poignée d’images qui laissent respirer la journée, plutôt qu’un disque dur qui l’engloutit.",
          "Chaque pellicule est développée avec soin et finie à la main en un album de mariage relié — une pièce que l’on reprend des années plus tard, au lieu de la balayer du doigt.",
        ],
        specs: [
          "Mamiya RB67 · film moyen format",
          "Présent mais discret, toute la journée",
          "Un album de mariage relié à la main",
          "Images numérisées incluses",
          "Livraison sous quatre à huit semaines",
        ],
        result: ["La pièce", "Album de mariage relié à la main"],
        figures: [
          { tag: "Kodak Gold 200", meta: "La lumière du jour", corner: "6×7 · A" },
          { tag: "Cinestill 400D", meta: "La promesse", corner: "6×7 · B" },
        ],
      },
    ],

    process: {
      overline: "05 — Comment cela se déroule",
      title: "Du premier échange à la pièce en main.",
      note: "Un seul interlocuteur, un prix fixe à l’avance, aucune surprise. Le même parcours simple pour chaque service.",
      steps: [
        { no: "I",   name: "Rencontre",   text: "Un échange sans engagement, par téléphone ou en personne. Nous discutons de ce que vous souhaitez immortaliser — sans aucune obligation." },
        { no: "II",  name: "Réservation", text: "Nous fixons la date et l’ampleur et vous recevez un prix clair. Un petit acompte confirme le rendez-vous." },
        { no: "III", name: "La prise de vue", text: "J’arrive au moment convenu — sereinement, sur film, et je laisse la journée se dérouler." },
        { no: "IV",  name: "La pièce",    text: "Développée, sélectionnée et reliée à la main. Livrée sous quatre à huit semaines, solde à la livraison." },
      ],
    },

    work: {
      overline: "06 — Portfolio",
      title: "Lumière, chaleur, vie.",
      note: "Une sélection d’images sur film. Le grain, la lumière et la couleur que seul l’analogique crée — et qui laissent respirer un souvenir.",
      frames: [
        { stock: "Cinestill 400D", meta: "Portrait", corner: "6×7 · A" },
        { stock: "Kodak Portra 400", meta: "Famille", corner: "6×7 · B" },
        { stock: "Kodak Gold 200", meta: "Ambiance", corner: "6×7 · C" },
        { stock: "Ilford HP5+", meta: "Détail", corner: "6×7 · D" },
      ],
    },

    closing: {
      overline: "07 — Pour finir",
      statement: "Certains instants\nne viennent qu’une fois.",
      sub: "Faisons-les pour qu’ils demeurent.",
    },

    contact: {
      overline: "08 — Faire connaissance",
      title: "Faisons connaissance.",
      body: "Pour un adieu, un portrait, un mariage ou simplement un premier échange, je suis joignable directement. Dites-moi ce que vous souhaitez immortaliser — ensemble, nous en ferons une pièce qui demeure.",
      callBtn: "Appeler le +32 476 50 62 09",
      mailBtn: "Envoyer un message",
      lines: [
        { k: "Téléphone", v: "+32 476 50 62 09", href: "tel:+32476506209" },
        { k: "E-mail", v: "milo.weiler@gmail.com", href: "mailto:milo.weiler@gmail.com" },
        { k: "Atelier", v: "Hof Savelkoul 40, 2640 Mortsel", href: "" },
        { k: "Instagram", v: "@miloweiler", href: "https://instagram.com/miloweiler" },
      ],
    },

    foot: {
      tagline: "Une photographie analogique qui se souvient.",
      navTitle: "Page",
      contactTitle: "Contact",
      legalTitle: "Administratif",
      legal: ["TVA BE 0791 549 197", "KBC BE07 7370 6524 4566"],
      rights: "© 2026 Milo Weiler. Tous droits réservés.",
      made: "Sur film, avec soin.",
    },
  },
};

export const LANGS: Lang[] = ["nl", "en", "fr"];
