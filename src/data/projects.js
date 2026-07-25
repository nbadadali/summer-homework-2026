// All content below is adapted from the official Bright Riders School Dubai
// Grade 2 Summer Project documents ("GR2-MULTIDISCIPLINARY PROJECT.pdf" and
// "SUMMER PROJECT INSTRUCTION DOCc.docx"). Where the source material did not
// specify something (e.g. exact craft materials for the solar oven), a
// standard, safe, commonly-used suggestion is offered and clearly marked as
// a suggestion so a parent can swap it for whatever is available at home.
//
// Every `steps[].id` and `checklist[].id` is a stable progress-tracking key,
// namespaced as `${project.id}.step.N` / `${project.id}.check.N`. Do not
// rename existing ids after students have started using the portal, or their
// saved progress will appear to "reset" for that item.

export const PROJECTS = [
  {
    id: "photo-diary",
    cluster: "Cluster A · English · Independent Project",
    subject: "English",
    title: "My Summer Photo Diary",
    icon: "📔",
    color: "sky",
    tagline: "Become a memory collector and turn your summer into a storybook!",
    objective:
      "Create a Digital Photo Diary about your summer holiday using the Book Creator app. You will make four pages about special moments and add a picture, a sentence, and a voice recording to each one.",
    materials: [
      "A tablet, phone, or computer with the Book Creator app or bookcreator.com",
      "4 photos from your summer (beach, family visit, park, something new you learned)",
      "A grown-up to help you save, upload photos, or export your book",
      "A quiet space to record your voice clearly",
    ],
    vocabulary: [
      { word: "Diary", meaning: "A book where you write about things that happened to you." },
      { word: "Page", meaning: "One sheet inside your digital book." },
      { word: "Cover page", meaning: "The very first page — like the front of a book." },
      { word: "Record", meaning: "To save your voice so it can be played back later." },
      { word: "Adventure", meaning: "An exciting experience or trip." },
    ],
    steps: [
      {
        id: "photo-diary.step.1",
        title: "Set up your book",
        instruction:
          "Open Book Creator and start a brand-new book. Choose a fun cover colour or picture. On the cover page, write your name and your class.",
        hint: "Ask a grown-up to help you open the app if this is your first time.",
        example: "Cover example: \"Kiaan's Summer Diary — Grade 2\"",
      },
      {
        id: "photo-diary.step.2",
        title: "Page 1 — A Day at the Beach",
        instruction:
          "Add one photo from a beach day (or a day near water). Underneath, write ONE simple sentence about it. Then record your voice reading the sentence out loud.",
        hint: "Keep your sentence short and clear, like: \"I built a sandcastle at the beach.\"",
        example: "Picture + \"I played in the sand with my sister.\" + your voice reading it aloud.",
      },
      {
        id: "photo-diary.step.3",
        title: "Page 2 — A Family Visit",
        instruction:
          "Add a photo from a time you visited family or family visited you. Write one sentence about who you saw and what you did. Record your voice.",
        hint: "Think: Who did you visit? What was fun about it?",
        example: "\"I visited my grandma and we baked cookies together.\"",
      },
      {
        id: "photo-diary.step.4",
        title: "Page 3 — A Park Adventure",
        instruction:
          "Add a photo from a park, playground, or outdoor trip. Write one sentence and record your voice.",
        hint: "Try to use an exciting describing word, like \"fun\", \"tall\", or \"fast\".",
        example: "\"I went down the tall slide at the park.\"",
      },
      {
        id: "photo-diary.step.5",
        title: "Page 4 — Learning Something New",
        instruction:
          "Add a photo of something new you learned this summer — a skill, a game, a word, anything! Write one sentence and record your voice.",
        hint: "It can be small, like learning to ride a bike or bake a cake.",
        example: "\"I learned how to swim without my floaties.\"",
      },
      {
        id: "photo-diary.step.6",
        title: "Check and share",
        instruction:
          "Read every page again. Check your spelling. Listen to each recording — is your voice clear? Ask a grown-up to help you save or share your finished diary.",
        hint: "Reading your sentences out loud helps you catch mistakes.",
        example: null,
      },
    ],
    tips: [
      "Pick photos where the memory is easy to describe in one sentence.",
      "Speak slowly and clearly when recording your voice.",
      "Add colour or stickers in Book Creator to make each page your own.",
    ],
    avoid: [
      "Don't write long paragraphs — one clear sentence per page is enough.",
      "Don't forget your name and class on the cover page.",
      "Don't skip the voice recording — it's part of every page!",
    ],
    checklist: [
      { id: "photo-diary.check.1", label: "My diary has 4 pages — beach, family visit, park, learning something new." },
      { id: "photo-diary.check.2", label: "Every page has one picture." },
      { id: "photo-diary.check.3", label: "Every page has one simple sentence." },
      { id: "photo-diary.check.4", label: "Every page has one voice recording." },
      { id: "photo-diary.check.5", label: "My name and class are on the cover page." },
      { id: "photo-diary.check.6", label: "My pages look neat and creative." },
    ],
  },
  {
    id: "solar-oven",
    cluster: "Cluster B · Science & Mathematics · Independent Project",
    subject: "Science",
    title: "Save Energy, Save Our Future! — Solar Oven Challenge",
    icon: "☀️",
    color: "sunshine",
    tagline: "Become a Solar Energy Engineer and cook with sunshine!",
    objective:
      "Explore how the Sun is a source of energy by designing and building a simple solar oven. Find out how sunlight can warm or melt food without using any electricity, and understand how solar energy helps protect our planet.",
    problemStatement:
      "During summer, the Sun gives us lots of natural heat and light, but most families still use electricity every day to cook and warm food. Your challenge is to become a Solar Energy Engineer and design a working solar oven that uses only the Sun's heat.",
    funFacts: [
      "Solar energy is energy that comes from the Sun. It is a renewable energy source — that means it never runs out!",
      "Dark and shiny materials behave differently in sunlight: shiny foil reflects sunlight inward, while black paper soaks up (absorbs) the heat.",
      "Using solar energy instead of electricity helps save power and protect the environment, because it doesn't create pollution.",
    ],
    materials: [
      "A cardboard box, shoebox, or pizza box (ask a grown-up before cutting anything)",
      "Aluminium foil (to reflect sunlight)",
      "Plastic wrap / cling film (to trap the heat inside)",
      "Black paper or black card (to absorb heat)",
      "Tape and a ruler or skewer (to prop the reflector flap open)",
      "A simple food to test: chocolate, a marshmallow, cheese, or butter",
      "A clock, timer, or stopwatch — and a thermometer if you have one",
    ],
    vocabulary: [
      { word: "Solar energy", meaning: "Energy that comes from the Sun." },
      { word: "Renewable", meaning: "Something that never runs out, like sunlight or wind." },
      { word: "Reflect", meaning: "To bounce light or heat back, like a mirror does." },
      { word: "Absorb", meaning: "To soak up, like black paper soaking up the Sun's heat." },
      { word: "Predict", meaning: "To guess what will happen before you test it." },
      { word: "Engineer", meaning: "Someone who designs and builds things to solve a problem." },
    ],
    steps: [
      {
        id: "solar-oven.step.1",
        title: "Learn your mission",
        instruction:
          "Read the Fun Facts about solar energy above. Then, in your own words, tell a grown-up or write down: what is solar energy, and why is the Sun important?",
        hint: "Your science book from school may also have notes about the Sun — check there too if you have it handy.",
        example: null,
      },
      {
        id: "solar-oven.step.2",
        title: "Gather your materials",
        instruction:
          "Collect your box, foil, plastic wrap, black paper, and tape. Ask a grown-up to help with any cutting.",
        hint: "You can use whatever clean recycled materials you have at home — it doesn't need to be exact.",
        example: null,
      },
      {
        id: "solar-oven.step.3",
        title: "Build your solar oven",
        instruction:
          "Line the inside of your box with black paper. Cover the lid flap (or a separate flap of cardboard) with foil, shiny-side out, so it can reflect sunlight into the box. Stretch plastic wrap tightly over the box opening to trap the heat inside like a mini greenhouse.",
        hint: "The shiny foil flap works like a mirror — angle it so it bounces sunlight down into the box.",
        example: null,
      },
      {
        id: "solar-oven.step.4",
        title: "Predict before you test",
        instruction:
          "Before putting your oven in the sun, write down a prediction: which food do you think will melt or warm up fastest, and why?",
        hint: "There is no wrong answer here — a prediction is just your best scientific guess!",
        example: "\"I predict the chocolate will melt fastest because it is thin.\"",
      },
      {
        id: "solar-oven.step.5",
        title: "Test it in direct sunlight",
        instruction:
          "Place your food inside the oven. Put the oven outside in direct sunlight, with the reflector flap angled toward the Sun. Start your timer.",
        hint: "Midday sun (around 12–2pm) is usually strongest — ask a grown-up to help you pick a safe, sunny spot.",
        example: null,
      },
      {
        id: "solar-oven.step.6",
        title: "Measure and record",
        instruction:
          "Check your oven every 5 minutes. Write down what you see, and note how many minutes it takes for the food to melt or warm up. If you have a thermometer, record the starting and ending temperature too.",
        hint: "Choose one Mathematics Activity from the card below to organise your measurements.",
        example: null,
      },
      {
        id: "solar-oven.step.7",
        title: "Observe and improve",
        instruction:
          "Was your prediction correct? Write down what actually happened. Then think of one way you could improve your solar oven to make it work even better.",
        hint: "More foil? A bigger flap? A darker box lining? Try one idea and see if it helps.",
        example: null,
      },
      {
        id: "solar-oven.step.8",
        title: "Explain and present",
        instruction:
          "Explain, in your own words, how using solar energy can help save electricity and protect the environment. Then choose ONE final product from the ideas below to present your project.",
        hint: "Practise saying your explanation out loud before you present it — it will help you remember it.",
        example: null,
      },
    ],
    mathActivity: {
      title: "Mathematics Activity — choose ANY ONE",
      options: [
        "Measure the time taken for your food to melt or warm (in minutes).",
        "Record the temperature inside and outside the solar oven (if a thermometer is available).",
        "Measure and record the starting and end temperatures, and compare which food item heated the most.",
        "Compare the melting times of different food items — create a simple table to record your observations.",
        "Find the difference in time taken for two food items to melt, or compare the temperature before and after heating.",
      ],
    },
    guidingQuestions: [
      "What is solar energy?",
      "Why is the Sun an important source of energy?",
      "How does a solar oven work?",
      "Which materials help keep heat inside the oven?",
      "Which food item melted or warmed the fastest?",
      "How long did it take for the food to melt?",
      "How can you improve your solar oven?",
      "Why is solar energy better for the environment?",
      "How does using solar energy help save electricity?",
      "What can children do to use energy wisely?",
    ],
    finalProductOptions: [
      "3D Working Solar Oven Model",
      "Solar Energy Investigation Poster",
      "Solar Oven with an interactive thermometer",
      "Solar Oven Science Journal",
      "Storyboard: \"Cooking with the Sun\"",
      "Digital Presentation with photos and observations",
      "Video demonstration of the solar oven experiment",
    ],
    tips: [
      "Test on a clear, sunny day for the best results.",
      "Adult supervision is recommended for cutting cardboard and working outdoors in the sun.",
      "Take photos at each stage — build, test, and result — for your final product.",
    ],
    avoid: [
      "Don't test on a cloudy day — your results won't be accurate.",
      "Don't touch the food or box right after testing — it may be warm.",
      "Don't forget to write down your prediction BEFORE you test.",
    ],
    checklist: [
      { id: "solar-oven.check.1", label: "I found out what solar energy is." },
      { id: "solar-oven.check.2", label: "I investigated how a solar oven works." },
      { id: "solar-oven.check.3", label: "I designed and built a simple solar oven." },
      { id: "solar-oven.check.4", label: "I predicted which materials would keep it warm." },
      { id: "solar-oven.check.5", label: "I tested my oven in direct sunlight." },
      { id: "solar-oven.check.6", label: "I observed and recorded what happened to the food." },
      { id: "solar-oven.check.7", label: "I measured and recorded the time taken." },
      { id: "solar-oven.check.8", label: "I identified one way to improve my oven." },
      { id: "solar-oven.check.9", label: "I can explain how solar energy saves electricity." },
      { id: "solar-oven.check.10", label: "I chose and completed my final product." },
    ],
  },
  {
    id: "save-water",
    cluster: "Cluster B · Français · Independent Project",
    subject: "French",
    title: "Sauvons l'eau (Save Water)",
    icon: "💧",
    color: "sky",
    tagline: "Le projet des vacances d'été — apprends à protéger l'eau en français !",
    objective:
      "Comprendre l'importance de protéger l'eau et notre planète. Apprendre trois règles simples pour ne pas gaspiller l'eau à la maison. Améliorer tes compétences en vocabulaire français.",
    objectiveEn:
      "Understand the importance of protecting water and our planet. Learn three simple rules to avoid wasting water at home. Improve your French vocabulary skills.",
    materials: [
      "Papier cartonné ou une grande feuille blanche (construction paper or a large white sheet)",
      "Crayons de couleur ou feutres (coloured pencils or markers)",
      "Ciseaux et colle, si tu utilises des images découpées (scissors and glue, if using cutout images)",
      "Crayon à papier et gomme (pencil and eraser)",
    ],
    vocabulary: [
      { word: "L'eau", meaning: "Water" },
      { word: "Gaspiller", meaning: "To waste" },
      { word: "Économiser", meaning: "To save" },
      { word: "Réutiliser", meaning: "To reuse" },
      { word: "Le robinet", meaning: "The tap" },
      { word: "Se brosser les dents", meaning: "To brush your teeth" },
      { word: "Une douche", meaning: "A shower" },
      { word: "Un arrosoir", meaning: "A watering can" },
      { word: "Une goutte d'eau", meaning: "A water drop" },
      { word: "L'orthographe", meaning: "Spelling" },
    ],
    steps: [
      {
        id: "save-water.step.1",
        title: "Étape 1 — Dessine ton arrière-plan (Draw your background)",
        instruction:
          "Dessine un grand arrière-plan coloré au centre de la page : une goutte d'eau souriante, la Terre, ou une rivière propre.",
        instructionEn:
          "Draw a large, colourful background in the centre of the page — a smiling water drop, the Earth, or a clean river.",
        hint: "A big, happy, smiling water drop is a fun and easy choice!",
        example: "Exemple : Une grande goutte d'eau joyeuse qui sourit. (A large, joyful smiling water drop.)",
      },
      {
        id: "save-water.step.2",
        title: "Étape 2 — Choisis trois règles (Choose three rules)",
        instruction:
          "Choisis trois (3) règles d'économie d'eau. Tu peux utiliser les trois exemples ci-dessous ou inventer tes propres règles simples.",
        instructionEn:
          "Choose three (3) water-saving rules. You can use the three examples below, or come up with your own simple rules.",
        hint: "Think about water at home: brushing teeth, showering, watering plants, washing hands, filling the pool.",
        example: null,
      },
      {
        id: "save-water.step.3",
        title: "Étape 3 — Écris les règles (Write the rules)",
        instruction:
          "Écris chaque règle en français, en grosses lettres claires. Puis écris la signification en anglais juste en dessous.",
        instructionEn:
          "Write each rule in French, in large, clear letters. Then write the meaning in English directly underneath.",
        hint: "Copy the French carefully, letter by letter, and check accents like é and è.",
        example: null,
      },
      {
        id: "save-water.step.4",
        title: "Étape 4 — Dessine une petite image (Draw a small picture)",
        instruction:
          "Dessine une petite image à côté de chaque règle pour illustrer sa signification.",
        instructionEn: "Draw a small picture next to each rule to illustrate its meaning.",
        hint: "A simple drawing is enough — it just needs to show what the rule means.",
        example: null,
      },
      {
        id: "save-water.step.5",
        title: "Étape 5 — Vérifie et présente (Check and present)",
        instruction:
          "Vérifie l'orthographe de tes mots français et anglais. Puis présente fièrement ton affiche terminée à ta famille !",
        instructionEn: "Check the spelling of your French and English words. Then proudly present your finished poster to your family!",
        hint: "Ask a grown-up to double-check your spelling before you call it finished.",
        example: null,
      },
    ],
    exampleRules: [
      {
        french: "Je ferme le robinet quand je me brosse les dents.",
        english: "I turn off the tap when I brush my teeth.",
        drawingIdea: "A toothbrush next to a closed tap.",
      },
      {
        french: "Je prends une douche rapide au lieu d'un bain.",
        english: "I take a quick shower instead of a bath.",
        drawingIdea: "A shower head with small drops of water.",
      },
      {
        french: "Je réutilise l'eau de pluie pour arroser les plantes.",
        english: "I reuse rainwater to water the plants.",
        drawingIdea: "A watering can next to a pretty flower.",
      },
    ],
    conclusionQuestions: [
      { fr: "Qu'as-tu appris ?", en: "What have you learned?" },
      { fr: "Quelle a été la partie la plus intéressante ?", en: "What was the most interesting part?" },
      { fr: "Comment ce projet peut-il être utile dans la vie quotidienne ?", en: "How can this project be useful in daily life?" },
    ],
    selfAssessment: {
      title: "Auto-évaluation (Self-assessment)",
      instructions: "Coche la réponse qui convient. (Tick the answer that fits.)",
      criteria: [
        "J'ai respecté les consignes. (I followed the instructions.)",
        "Mon travail est bien présenté. (My work is neatly presented.)",
        "J'ai utilisé le français correctement. (I used French correctly.)",
        "J'ai terminé le projet à temps. (I finished the project on time.)",
      ],
      scale: ["Oui", "Un peu", "Non"],
    },
    rubric: {
      title: "Critères d'évaluation (Teacher's Rubric) — Total: 25 points",
      rows: [
        { criterion: "Contenu et pertinence des informations (Content & relevance)", points: 5 },
        { criterion: "Créativité et originalité (Creativity & originality)", points: 5 },
        { criterion: "Organisation et présentation (Organisation & presentation)", points: 5 },
        { criterion: "Qualité du français : grammaire, vocabulaire (Quality of French)", points: 5 },
        { criterion: "Respect des consignes (Following instructions)", points: 5 },
      ],
    },
    tips: [
      "Write the French words BIG and clear — this is a poster, not a paragraph!",
      "It's okay to use the 3 example rules exactly as given — they're perfect examples.",
      "Say each French sentence out loud a few times so it's easier to remember.",
    ],
    avoid: [
      "Don't forget the English translation under each French rule.",
      "Don't skip writing your name, class, and submission date at the top.",
      "Don't erase your pencil sketch before you're happy with the drawing — colour it in last.",
    ],
    checklist: [
      { id: "save-water.check.1", label: "Nom, classe et date écrits (Name, class and date written)." },
      { id: "save-water.check.2", label: "Grand dessin central coloré (Large, colourful central drawing)." },
      { id: "save-water.check.3", label: "3 règles écrites en français (3 rules written in French)." },
      { id: "save-water.check.4", label: "Traduction anglaise sous chaque règle (English translation under each rule)." },
      { id: "save-water.check.5", label: "Un petit dessin pour chaque règle (A small drawing for each rule)." },
      { id: "save-water.check.6", label: "Orthographe vérifiée (Spelling checked)." },
      { id: "save-water.check.7", label: "Réponses aux 3 questions de conclusion (Answered the 3 conclusion questions)." },
      { id: "save-water.check.8", label: "Auto-évaluation remplie (Self-assessment filled in)." },
    ],
  },
  {
    id: "uae-handprint",
    cluster: "Cluster C · Arabic, Islamic Studies & MSCS · Independent Project",
    subject: "MSCS / Arabic",
    title: "My UAE Handprint",
    icon: "🖐️",
    color: "grass",
    tagline: "Celebrate the UAE's culture, values, and Arabic language with your own handprint!",
    objective:
      "Develop pride in the UAE by exploring Emirati culture, heritage, the Arabic language, Islamic values, and national identity through a creative handprint artwork.",
    materials: [
      "An A4 sheet of paper (or more, for a group tree/falcon display)",
      "Poster paint or a washable ink pad, in green, red, white, or black if possible",
      "A paintbrush and water for washing hands",
      "Coloured pencils or markers for extra details",
      "Newspaper or a wipeable surface to protect your table",
    ],
    vocabulary: [
      { word: "Emirati", meaning: "Relating to the United Arab Emirates (UAE) and its people." },
      { word: "Heritage", meaning: "Traditions, culture, and history passed down over time." },
      { word: "National identity", meaning: "What makes a country and its people special and proud." },
      { word: "Value", meaning: "An important idea about how to treat others, like kindness or respect." },
    ],
    designChoices: [
      {
        name: "UAE Values Tree (شجرة قيم الإمارات)",
        description: "Your handprint becomes a leaf on a tree. As a class, many handprint-leaves fill the branches.",
      },
      {
        name: "Falcon of the UAE (صقر الإمارات)",
        description: "Draw a falcon and use handprints as its wings, with a desert and fort in the background.",
      },
    ],
    steps: [
      {
        id: "uae-handprint.step.1",
        title: "Choose your design",
        instruction: "Decide whether you'll make a Tree of Values leaf or a Falcon wing (see the two design choices above).",
        hint: "Both are equally great — pick whichever excites you more!",
        example: null,
      },
      {
        id: "uae-handprint.step.2",
        title: "Make your handprint",
        instruction:
          "Ask a grown-up to help paint your palm and fingers, or press your hand onto an ink pad. Press your hand firmly onto the paper, then lift it straight up. Wash your hands right away.",
        hint: "Press down evenly — wiggling can smudge the print.",
        example: null,
      },
      {
        id: "uae-handprint.step.3",
        title: "Choose your Arabic phrase",
        instruction: "Once your handprint is dry, choose one Arabic phrase to write inside it, from the list below.",
        hint: "Ask a family member or teacher to help you copy the Arabic letters carefully.",
        example: null,
      },
      {
        id: "uae-handprint.step.4",
        title: "Add the English phrase",
        instruction: "Write the matching English phrase inside your handprint too, underneath the Arabic.",
        hint: null,
        example: null,
      },
      {
        id: "uae-handprint.step.5",
        title: "Add your value word",
        instruction: "Choose one positive value word and write it inside your handprint as well.",
        hint: "Pick the value that means the most to you.",
        example: null,
      },
      {
        id: "uae-handprint.step.6",
        title: "Finish your artwork",
        instruction:
          "Draw the rest of your design — the tree trunk and branches, or the falcon's body and a desert scene. Add UAE flag colours (red, green, white, black) if you like.",
        hint: null,
        example: null,
      },
      {
        id: "uae-handprint.step.7",
        title: "Share it proudly",
        instruction: "Show your finished handprint artwork to your family, and bring it to school to add to the class display.",
        hint: null,
        example: null,
      },
    ],
    arabicPhrases: [
      { arabic: "أحب الإمارات", transliteration: "Uhibbu al-Imārāt", english: "I love UAE." },
      { arabic: "الإمارات وطني", transliteration: "Al-Imārāt waṭanī", english: "UAE is my home." },
      { arabic: "أفخر بالإمارات", transliteration: "Afkharu bil-Imārāt", english: "I am proud of the UAE." },
    ],
    values: [
      { word: "Respect", meaning: "Treating others the way you would like to be treated." },
      { word: "Kindness", meaning: "Being caring and gentle to people and animals." },
      { word: "Tolerance", meaning: "Accepting that people can be different from you, and that's okay." },
      { word: "Responsibility", meaning: "Taking care of your duties and your promises." },
      { word: "Cooperation", meaning: "Working well together with others." },
    ],
    tips: [
      "Let the paint dry fully before writing inside the handprint.",
      "Practise writing the Arabic phrase on scrap paper first.",
      "Bright, cheerful colours make your artwork stand out on the class display.",
    ],
    avoid: [
      "Don't press and drag your hand — it smudges the print.",
      "Don't rush the Arabic writing — take your time to copy it neatly.",
      "Don't forget to wash your hands and clean your workspace afterwards!",
    ],
    checklist: [
      { id: "uae-handprint.check.1", label: "I chose a design (tree or falcon)." },
      { id: "uae-handprint.check.2", label: "I made a neat handprint." },
      { id: "uae-handprint.check.3", label: "I wrote an Arabic phrase about the UAE." },
      { id: "uae-handprint.check.4", label: "I wrote the matching English phrase." },
      { id: "uae-handprint.check.5", label: "I wrote a positive value word." },
      { id: "uae-handprint.check.6", label: "I finished my artwork with colour and details." },
      { id: "uae-handprint.check.7", label: "I proudly shared it with my family." },
    ],
  },
];

// Part 2 of the Summer Project. The official brief confirms this component
// exists (5 marks, due 12 October) and must be submitted with Part 1, but the
// group theme/topic and Vision Paper template were not included in any
// uploaded file — so per your instruction we show a placeholder instead of
// inventing a topic.
export const VISION_PAPER = {
  id: "vision-paper",
  title: "Part 2 — Group Research Project & Vision Paper",
  dueDate: "12 October 2026",
  marks: 5,
  status: "awaiting-info",
  placeholder:
    "Please refer to your teacher's classroom instructions for your group's theme and the Vision Paper template. Additional information will be added here as soon as it is shared by school.",
};

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id);
}

export function getAllTrackableIds() {
  const ids = [];
  for (const project of PROJECTS) {
    for (const s of project.steps) ids.push(s.id);
    for (const c of project.checklist) ids.push(c.id);
  }
  return ids;
}
