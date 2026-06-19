/*
  The "Learn" track, a friendly, kid-first path through programming
  using wow. Each chapter teaches one programming CONCEPT (not just a
  keyword) with a plain-language explanation, a real example, and a
  small challenge to try in the playground.

  Content is authored in English, Roman Urdu, and Urdu. Code samples are
  shared across all three, only the prose changes.
*/

import type { Lang } from "./i18n";

type Loc = Record<Lang, string>;

// compact helper: L(english, romanUrdu, urdu)
const L = (en: string, roman: string, ur: string): Loc => ({ en, roman, ur });

// One line of an interactive walkthrough. `code` is the exact line shown
// (kept left-to-right, highlighted). `text` is the plain-language meaning —
// when present the line becomes tappable and reveals the explanation. Lines
// without text (blank lines, closing braces) are shown but not interactive.
export type WalkStep = { code: string; text?: Loc };

export type Block =
  | { t: "p"; text: Loc }
  | { t: "h"; text: Loc }
  | { t: "code"; code: string }
  | { t: "tip"; text: Loc }
  | { t: "try"; text: Loc }
  // A collapsible "where this comes from" note — the story behind an idea.
  | { t: "history"; title: Loc; text: Loc }
  // An interactive, line-by-line breakdown of a snippet.
  | { t: "walk"; intro?: Loc; steps: WalkStep[] };

export type Chapter = {
  slug: string;
  icon: string;
  title: Loc;
  concept: Loc;
  blocks: Block[];
};

export const chapters: Chapter[] = [
  {
    slug: "what-is-a-program",
    icon: "Brain",
    title: L("What is a program?", "Program kya hai?", "پروگرام کیا ہے؟"),
    concept: L(
      "A program is just a list of instructions a computer follows.",
      "Program sirf hidayaat ki ek list hai jo computer follow karta hai.",
      "پروگرام صرف ہدایات کی ایک فہرست ہے جسے کمپیوٹر فالو کرتا ہے۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          "Imagine writing down steps for a friend to make a sandwich: get the bread, add the filling, close it. A computer program is exactly that, a list of clear steps, in order, that the computer follows one at a time, top to bottom.",
          "Socho aap apne dost ke liye sandwich banane ke steps likh rahe hain: bread lo, filling dalo, band karo. Computer program bilkul aisa hi hai, saaf steps ki ek list, tarteeb se, jise computer ek ek kar ke upar se neeche follow karta hai.",
          "تصور کرو آپ اپنے دوست کے لیے سینڈوچ بنانے کے اسٹیپ لکھ رہے ہو: بریڈ لو، فلنگ ڈالو، بند کرو۔ کمپیوٹر پروگرام بالکل ایسا ہی ہے، صاف اسٹیپس کی ایک فہرست، ترتیب سے، جسے کمپیوٹر ایک ایک کر کے اوپر سے نیچے فالو کرتا ہے۔"
        ),
      },
      {
        t: "tip",
        text: L(
          "Computers are fast but not clever. They do exactly what you say, in the exact order you say it. Half the fun of coding is learning to give really clear instructions.",
          "Computer tez hai lekin chalak nahi. Woh bilkul wahi karta hai jo aap kehte hain, usi tarteeb mein. Coding ka aadha maza saaf hidayaat dena seekhne mein hai.",
          "کمپیوٹر تیز ہے لیکن چالاک نہیں۔ وہ بالکل وہی کرتا ہے جو آپ کہتے ہیں، اسی ترتیب میں۔ کوڈنگ کا آدھا مزہ صاف ہدایات دینا سیکھنے میں ہے۔"
        ),
      },
      {
        t: "p",
        text: L(
          "In wow, every line is one instruction. Here are three steps the computer runs in order:",
          "wow mein, har line ek hidayat hai. Yeh teen steps computer tarteeb se chalata hai:",
          "wow میں، ہر لائن ایک ہدایت ہے۔ یہ تین اسٹیپ کمپیوٹر ترتیب سے چلاتا ہے:"
        ),
      },
      {
        t: "walk",
        intro: L(
          "Here are three steps the computer runs in order. Tap each line to see what it does.",
          "Yeh teen steps computer tarteeb se chalata hai. Har line par tap kar ke dekho woh kya karti hai.",
          "یہ تین اسٹیپ کمپیوٹر ترتیب سے چلاتا ہے۔ ہر لائن پر ٹیپ کر کے دیکھو وہ کیا کرتی ہے۔"
        ),
        steps: [
          {
            code: `likho "Step 1: wake up"`,
            text: L(
              'The very first instruction. likho means "write", and everything in the quotes is shown on screen — so this prints Step 1: wake up.',
              'Sab se pehli hidayat. likho ka matlab "likhna", aur quotes ke andar jo bhi ho woh screen par dikhta hai — to yeh Step 1: wake up print karta hai.',
              'سب سے پہلی ہدایت۔ likho کا مطلب "لکھنا"، اور quotes کے اندر جو بھی ہو وہ اسکرین پر دکھتا ہے — تو یہ Step 1: wake up پرنٹ کرتا ہے۔'
            ),
          },
          {
            code: `likho "Step 2: brush teeth"`,
            text: L(
              "Only after the first line is finished does the computer move to this one. Order matters: top to bottom, one at a time.",
              "Pehli line khatam hone ke baad hi computer is par aata hai. Tarteeb ahem hai: upar se neeche, ek ek kar ke.",
              "پہلی لائن ختم ہونے کے بعد ہی کمپیوٹر اس پر آتا ہے۔ ترتیب اہم ہے: اوپر سے نیچے، ایک ایک کر کے۔"
            ),
          },
          {
            code: `likho "Step 3: eat breakfast"`,
            text: L(
              "The last step. When the computer reaches the bottom and there is nothing left, the program is finished.",
              "Aakhri step. Jab computer sab se neeche pohanch jata hai aur kuch baqi nahi rehta, program khatam ho jata hai.",
              "آخری اسٹیپ۔ جب کمپیوٹر سب سے نیچے پہنچ جاتا ہے اور کچھ باقی نہیں رہتا، پروگرام ختم ہو جاتا ہے۔"
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          'When you press Run, the computer reads line 1, does it, then line 2, then line 3. That word likho means "write", it tells the computer to show something on the screen.',
          'Jab aap Run dabate hain, computer line 1 parhta hai, use karta hai, phir line 2, phir line 3. Lafz likho ka matlab hai "likhna", yeh computer ko kuch screen par dikhane ko kehta hai.',
          'جب آپ Run دباتے ہیں، کمپیوٹر لائن 1 پڑھتا ہے، اسے کرتا ہے، پھر لائن 2، پھر لائن 3۔ لفظ likho کا مطلب ہے "لکھو"، یہ کمپیوٹر کو کچھ اسکرین پر دکھانے کو کہتا ہے۔'
        ),
      },
      {
        t: "history",
        title: L(
          "The first programmer",
          "Sab se pehli programmer",
          "سب سے پہلی پروگرامر"
        ),
        text: L(
          "The idea of a written list of instructions for a machine is almost 200 years old. In the 1840s, Ada Lovelace wrote what many call the first computer program — a list of steps for a machine that was never even finished being built (Charles Babbage's Analytical Engine). She saw, long before anyone else, that a machine could follow steps to do far more than just arithmetic. Every program you will ever write is a descendant of that one idea: a clear list of steps.",
          "Kisi machine ke liye likhi hui hidayaat ki list ka khayaal taqreeban 200 saal purana hai. 1840 ki dahai mein, Ada Lovelace ne woh likha jise bohat se log pehla computer program kehte hain — ek machine ke liye steps ki list jo kabhi mukammal bani hi nahi (Charles Babbage ka Analytical Engine). Usne sab se pehle yeh dekha ke machine sirf hisaab se kahin zyada kaam steps follow kar ke kar sakti hai. Aap jo bhi program likhenge woh isi ek khayaal ki aulaad hai: saaf steps ki ek list.",
          "کسی مشین کے لیے لکھی ہوئی ہدایات کی فہرست کا خیال تقریباً 200 سال پرانا ہے۔ 1840 کی دہائی میں، Ada Lovelace نے وہ لکھا جسے بہت سے لوگ پہلا کمپیوٹر پروگرام کہتے ہیں — ایک مشین کے لیے اسٹیپس کی فہرست جو کبھی مکمل بنی ہی نہیں (Charles Babbage کا Analytical Engine)۔ اس نے سب سے پہلے یہ دیکھا کہ مشین صرف حساب سے کہیں زیادہ کام اسٹیپس فالو کر کے کر سکتی ہے۔ آپ جو بھی پروگرام لکھیں گے وہ اسی ایک خیال کی اولاد ہے: صاف اسٹیپس کی ایک فہرست۔"
        ),
      },
      {
        t: "try",
        text: L(
          "Add a fourth step of your own. What happens if you move a line to the top, does the order of the output change?",
          "Apna chautha step shamil karo. Agar aap koi line sab se upar le jayein to kya output ki tarteeb badal jati hai?",
          "اپنا چوتھا اسٹیپ شامل کرو۔ اگر آپ کوئی لائن سب سے اوپر لے جائیں تو کیا آؤٹ پٹ کی ترتیب بدل جاتی ہے؟"
        ),
      },
    ],
  },
  {
    slug: "saying-things",
    icon: "MessageSquare",
    title: L(
      "Telling the computer to write",
      "Computer ko likhna sikhao",
      "کمپیوٹر کو لکھنا سکھاؤ"
    ),
    concept: L(
      "Use likho to print words and numbers.",
      "Lafz aur number print karne ke liye likho use karo.",
      "الفاظ اور نمبر پرنٹ کرنے کے لیے likho استعمال کرو۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          "The most common thing a beginner does is make the computer show something. In wow that word is likho (write). Whatever you put after it shows up in the output.",
          "Shuruaat mein sab se aam kaam yeh hai ke computer kuch dikhaye. wow mein woh lafz hai likho (likhna). Iske baad jo bhi likhein woh output mein nazar aata hai.",
          "شروعات میں سب سے عام کام یہ ہے کہ کمپیوٹر کچھ دکھائے۔ wow میں وہ لفظ ہے likho (لکھو)۔ اس کے بعد جو بھی لکھیں وہ آؤٹ پٹ میں نظر آتا ہے۔"
        ),
      },
      {
        t: "walk",
        steps: [
          {
            code: `likho "Salam Duniya!"`,
            text: L(
              'Prints the words exactly as written between the quotes — Salam Duniya! The quotes tell wow "this is text, show it letter for letter."',
              'Quotes ke darmiyan jo likha hai bilkul wahi print karta hai — Salam Duniya! Quotes wow ko batate hain "yeh text hai, ise harf ba harf dikhao."',
              'quotes کے درمیان جو لکھا ہے بالکل وہی پرنٹ کرتا ہے — Salam Duniya! quotes wow کو بتاتے ہیں "یہ text ہے، اسے حرف بہ حرف دکھاؤ۔"'
            ),
          },
          {
            code: `likho 7`,
            text: L(
              "No quotes here, so 7 is a number, not text. It prints the number 7.",
              "Yahan quotes nahi, to 7 ek number hai, text nahi. Yeh number 7 print karta hai.",
              "یہاں quotes نہیں، تو 7 ایک نمبر ہے، text نہیں۔ یہ نمبر 7 پرنٹ کرتا ہے۔"
            ),
          },
          {
            code: `likho 2 + 3`,
            text: L(
              'These are numbers too, so wow does the maths first and then prints the answer: 5 — not the text "2 + 3".',
              'Yeh bhi numbers hain, to wow pehle hisaab karta hai phir jawab print karta hai: 5 — text "2 + 3" nahi.',
              'یہ بھی نمبرز ہیں، تو wow پہلے حساب کرتا ہے پھر جواب پرنٹ کرتا ہے: 5 — text "2 + 3" نہیں۔'
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          'Text goes inside quotes: "like this". Numbers do not need quotes. And the computer can do the math for you, the last line prints 5, not "2 + 3".',
          'Text quotes ke andar aata hai: "is tarah". Numbers ko quotes ki zaroorat nahi. Aur computer aap ke liye hisaab bhi kar sakta hai, aakhri line 5 print karti hai, "2 + 3" nahi.',
          'ٹیکسٹ کوٹس کے اندر آتا ہے: "اس طرح"۔ نمبرز کو کوٹس کی ضرورت نہیں۔ اور کمپیوٹر آپ کے لیے حساب بھی کر سکتا ہے، آخری لائن 5 پرنٹ کرتی ہے، "2 + 3" نہیں۔'
        ),
      },
      {
        t: "h",
        text: L(
          "Putting values inside text",
          "Text ke andar values dalna",
          "ٹیکسٹ کے اندر ویلیوز ڈالنا"
        ),
      },
      {
        t: "p",
        text: L(
          'You can drop a value right into a sentence using curly braces { }. This is called string interpolation, a fancy name for "fill in the blank".',
          'Aap curly braces { } se kisi value ko seedha jumle mein daal sakte hain. Ise string interpolation kehte hain, "khaali jagah bharo" ka mushkil naam.',
          'آپ curly braces { } سے کسی ویلیو کو سیدھا جملے میں ڈال سکتے ہیں۔ اسے string interpolation کہتے ہیں، "خالی جگہ بھرو" کا مشکل نام۔'
        ),
      },
      {
        t: "code",
        code: `naam = "Ayesha"
likho "Salam {naam}, kaise ho?"`,
      },
      {
        t: "history",
        title: L(
          'Why "Hello, World!"',
          '"Hello, World!" kyun',
          '"Hello, World!" کیوں'
        ),
        text: L(
          'For almost 50 years, the very first program people write in a new language just prints "Hello, World!" on the screen. The tradition started in 1972 with a programmer named Brian Kernighan, and it stuck because printing a message is the smallest program that proves everything works. In wow we say it in Urdu — "Salam Duniya!" — but it is the same friendly first step millions of programmers have taken.',
          'Taqreeban 50 saal se, kisi nayi zaban mein logon ka sab se pehla program sirf "Hello, World!" screen par print karta hai. Yeh riwayat 1972 mein Brian Kernighan naami programmer se shuru hui, aur is liye qaim rahi ke ek paighaam print karna sab se chhota program hai jo sabit karta hai ke sab theek chal raha hai. wow mein hum ise Urdu mein kehte hain — "Salam Duniya!" — lekin yeh wahi dostana pehla qadam hai jo lakhon programmers utha chuke hain.',
          'تقریباً 50 سال سے، کسی نئی زبان میں لوگوں کا سب سے پہلا پروگرام صرف "Hello, World!" اسکرین پر پرنٹ کرتا ہے۔ یہ روایت 1972 میں Brian Kernighan نامی پروگرامر سے شروع ہوئی، اور اس لیے قائم رہی کہ ایک پیغام پرنٹ کرنا سب سے چھوٹا پروگرام ہے جو ثابت کرتا ہے کہ سب ٹھیک چل رہا ہے۔ wow میں ہم اسے اردو میں کہتے ہیں — "Salam Duniya!" — لیکن یہ وہی دوستانہ پہلا قدم ہے جو لاکھوں پروگرامرز اٹھا چکے ہیں۔'
        ),
      },
      {
        t: "try",
        text: L(
          "Print a sentence that says how old you are, using a number inside the text.",
          "Aisa jumla print karo jo bataye aap ki umar kitni hai, text ke andar number use kar ke.",
          "ایسا جملہ پرنٹ کرو جو بتائے آپ کی عمر کتنی ہے، ٹیکسٹ کے اندر نمبر استعمال کر کے۔"
        ),
      },
    ],
  },
  {
    slug: "variables",
    icon: "Archive",
    title: L("Boxes that remember", "Dabbe jo yaad rakhte hain", "ڈبے جو یاد رکھتے ہیں"),
    concept: L(
      "Variables store a value so you can use it later.",
      "Variables koi value mehfooz rakhte hain taake baad mein use ho sake.",
      "ویری ایبلز کوئی ویلیو محفوظ رکھتے ہیں تاکہ بعد میں استعمال ہو سکے۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          "A variable is like a labelled box. You put something in it and give it a name. Later, whenever you use that name, the computer looks inside the box and uses whatever is there.",
          "Variable ek naam wale dabbe jaisa hai. Aap usme kuch rakhte hain aur use naam dete hain. Baad mein, jab bhi woh naam use karein, computer dabbe ke andar dekh kar wahi cheez istemaal karta hai.",
          "ویری ایبل ایک نام والے ڈبے جیسا ہے۔ آپ اس میں کچھ رکھتے ہیں اور اسے نام دیتے ہیں۔ بعد میں، جب بھی وہ نام استعمال کریں، کمپیوٹر ڈبے کے اندر دیکھ کر وہی چیز استعمال کرتا ہے۔"
        ),
      },
      {
        t: "walk",
        steps: [
          {
            code: `umar = 12`,
            text: L(
              'Make a box named umar and put the number 12 inside it. The = does not mean "equals" — it means "store this".',
              'umar naam ka ek dabba banao aur usme number 12 rakho. = ka matlab "barabar" nahi — iska matlab "yeh rakho".',
              'umar نام کا ایک ڈبہ بناؤ اور اس میں نمبر 12 رکھو۔ = کا مطلب "برابر" نہیں — اس کا مطلب "یہ رکھو"۔'
            ),
          },
          {
            code: `likho "Aap ki umar {umar} hai"`,
            text: L(
              "Print a sentence. The {umar} part is replaced with whatever is in the box right now — 12 — so it reads Aap ki umar 12 hai.",
              "Ek jumla print karo. {umar} wala hissa is waqt dabbe mein jo hai usse badal jata hai — 12 — to yeh banta hai Aap ki umar 12 hai.",
              "ایک جملہ پرنٹ کرو۔ {umar} والا حصہ اس وقت ڈبے میں جو ہے اس سے بدل جاتا ہے — 12 — تو یہ بنتا ہے Aap ki umar 12 hai۔"
            ),
          },
          { code: `` },
          {
            code: `umar = umar + 1`,
            text: L(
              "Open the box (12), add one to get 13, and put 13 back in the same box. The old value is gone — the box now holds 13.",
              "Dabba kholo (12), ek joro to 13 milta hai, aur 13 wapas usi dabbe mein rakho. Purani value chali gayi — dabbe mein ab 13 hai.",
              "ڈبہ کھولو (12)، ایک جوڑو تو 13 ملتا ہے، اور 13 واپس اسی ڈبے میں رکھو۔ پرانی ویلیو چلی گئی — ڈبے میں اب 13 ہے۔"
            ),
          },
          {
            code: `likho "Agle saal: {umar}"`,
            text: L(
              "Print again. This time the box holds 13, so it reads Agle saal: 13. Same line of code, different value — because the box changed.",
              "Dobara print karo. Is dafa dabbe mein 13 hai, to yeh banta hai Agle saal: 13. Wahi code ki line, alag value — kyunke dabba badal gaya.",
              "دوبارہ پرنٹ کرو۔ اس دفعہ ڈبے میں 13 ہے، تو یہ بنتا ہے Agle saal: 13۔ وہی کوڈ کی لائن، الگ ویلیو — کیونکہ ڈبہ بدل گیا۔"
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          'The = sign means "put this value in the box". It is not the maths "equals". So umar = umar + 1 means "take what is in umar, add one, and put it back".',
          '= ka nishan matlab "yeh value dabbe mein rakho". Yeh hisaab wala "barabar" nahi hai. To umar = umar + 1 ka matlab "umar mein jo hai usme ek joro aur wapas rakh do".',
          '= کا نشان مطلب "یہ ویلیو ڈبے میں رکھو"۔ یہ حساب والا "برابر" نہیں ہے۔ تو umar = umar + 1 کا مطلب "umar میں جو ہے اس میں ایک جوڑو اور واپس رکھ دو"۔'
        ),
      },
      {
        t: "tip",
        text: L(
          "Pick names that describe what is inside, score, naam, total. Future-you (and your friends) will thank you when reading the code.",
          "Aise naam chuno jo bataayein andar kya hai, score, naam, total. Baad mein aap (aur aap ke dost) code parhte waqt shukar guzaar honge.",
          "ایسے نام چنو جو بتائیں اندر کیا ہے، score، naam، total۔ بعد میں آپ (اور آپ کے دوست) کوڈ پڑھتے وقت شکر گزار ہوں گے۔"
        ),
      },
      {
        t: "history",
        title: L(
          "Where the word comes from",
          "Yeh lafz kahan se aaya",
          "یہ لفظ کہاں سے آیا"
        ),
        text: L(
          'The word "variable" comes from mathematics, where it means "a value that can vary" — change. Inside a real computer, a variable is a tiny labelled spot in the machine\'s memory. When you write umar = 12, the computer reserves a spot, writes 12 there, and remembers the name umar so it can find it again. Memory used to be made of tiny magnetic rings threaded by hand in the 1950s and 60s; today it is billions of microscopic switches — but the idea is unchanged: a named place to keep a value.',
          'Lafz "variable" riyazi se aaya hai, jahan iska matlab hai "aisi value jo badal sake". Asli computer ke andar, variable machine ki memory mein ek chhoti si naam wali jagah hai. Jab aap likhte hain umar = 12, computer ek jagah mehfooz karta hai, wahan 12 likhta hai, aur naam umar yaad rakhta hai taake dobara dhoond sake. 1950 aur 60 ki dahai mein memory chhote magnetic chhallon se banti thi jo haath se piroye jate the; aaj yeh arabon microscopic switches hai — lekin khayaal wahi hai: value rakhne ki ek naam wali jagah.',
          'لفظ "variable" ریاضی سے آیا ہے، جہاں اس کا مطلب ہے "ایسی ویلیو جو بدل سکے"۔ اصلی کمپیوٹر کے اندر، variable مشین کی memory میں ایک چھوٹی سی نام والی جگہ ہے۔ جب آپ لکھتے ہیں umar = 12، کمپیوٹر ایک جگہ محفوظ کرتا ہے، وہاں 12 لکھتا ہے، اور نام umar یاد رکھتا ہے تاکہ دوبارہ ڈھونڈ سکے۔ 1950 اور 60 کی دہائی میں memory چھوٹے magnetic چھلوں سے بنتی تھی جو ہاتھ سے پروئے جاتے تھے؛ آج یہ اربوں microscopic switches ہے — لیکن خیال وہی ہے: ویلیو رکھنے کی ایک نام والی جگہ۔'
        ),
      },
      {
        t: "try",
        text: L(
          "Make two boxes, a and b, with numbers in them. Print their total without typing the numbers again.",
          "Do dabbe banao, a aur b, jin mein numbers hon. Numbers dobara likhe baghair un ka total print karo.",
          "دو ڈبے بناؤ، a اور b، جن میں نمبرز ہوں۔ نمبرز دوبارہ لکھے بغیر ان کا ٹوٹل پرنٹ کرو۔"
        ),
      },
    ],
  },
  {
    slug: "making-choices",
    icon: "GitBranch",
    title: L("Making choices", "Faisle karna", "فیصلے کرنا"),
    concept: L(
      "Use agar / warna to do different things in different situations.",
      "Mukhtalif halaat mein mukhtalif kaam ke liye agar / warna use karo.",
      "مختلف حالات میں مختلف کام کے لیے agar / warna استعمال کرو۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          'Programs get interesting when they can decide. "If it is raining, take an umbrella, otherwise wear a cap." In wow that is agar (if) and warna (otherwise / else).',
          'Program tab mazedaar hota hai jab woh faisla kar sake. "Agar baarish ho to chhatri lo, warna topi pehno." wow mein yeh hai agar (if) aur warna (else).',
          'پروگرام تب مزیدار ہوتا ہے جب وہ فیصلہ کر سکے۔ "اگر بارش ہو تو چھتری لو، ورنہ ٹوپی پہنو۔" wow میں یہ ہے agar (if) اور warna (else)۔'
        ),
      },
      {
        t: "walk",
        steps: [
          {
            code: `umar = 12`,
            text: L(
              "Put 12 in a box called umar, so we have something to ask a question about.",
              "umar naam ke dabbe mein 12 rakho, taake hamare paas sawaal poochne ke liye kuch ho.",
              "umar نام کے ڈبے میں 12 رکھو، تاکہ ہمارے پاس سوال پوچھنے کے لیے کچھ ہو۔"
            ),
          },
          { code: `` },
          {
            code: `agar umar > 10 {`,
            text: L(
              'Ask a yes/no question: is umar bigger than 10? The { opens the block that runs only when the answer is yes. Here 12 > 10 is true.',
              'Ek haan/nahi sawaal: kya umar 10 se bari hai? { woh block kholta hai jo sirf tab chalta hai jab jawab haan ho. Yahan 12 > 10 sahi hai.',
              'ایک ہاں/نہیں سوال: کیا umar 10 سے بڑی ہے؟ { وہ بلاک کھولتا ہے جو صرف تب چلتا ہے جب جواب ہاں ہو۔ یہاں 12 > 10 صحیح ہے۔'
            ),
          },
          {
            code: `    likho "You're a big kid!"`,
            text: L(
              "This line is indented because it lives inside the agar block. It only runs when the question was true — which it is, so this prints.",
              "Yeh line andar ki taraf hai kyunke yeh agar block ke andar hai. Yeh sirf tab chalti hai jab sawaal sahi ho — jo hai, to yeh print hoti hai.",
              "یہ لائن اندر کی طرف ہے کیونکہ یہ agar بلاک کے اندر ہے۔ یہ صرف تب چلتی ہے جب سوال صحیح ہو — جو ہے، تو یہ پرنٹ ہوتی ہے۔"
            ),
          },
          {
            code: `} warna {`,
            text: L(
              'warna means "otherwise". The block after it runs only when the question was false. Since our answer was true, the computer skips this part entirely.',
              'warna ka matlab "warna/otherwise". iske baad wala block sirf tab chalta hai jab sawaal ghalat ho. Hamara jawab sahi tha, is liye computer is hisse ko bilkul chhor deta hai.',
              'warna کا مطلب "otherwise"۔ اس کے بعد والا بلاک صرف تب چلتا ہے جب سوال غلط ہو۔ ہمارا جواب صحیح تھا، اس لیے کمپیوٹر اس حصے کو بالکل چھوڑ دیتا ہے۔'
            ),
          },
          {
            code: `    likho "You're a little one."`,
            text: L(
              "Skipped this time — it would only run if umar were 10 or less.",
              "Is dafa chhor diya — yeh sirf tab chalti agar umar 10 ya us se kam hoti.",
              "اس دفعہ چھوڑ دیا — یہ صرف تب چلتی اگر umar 10 یا اس سے کم ہوتی۔"
            ),
          },
          {
            code: `}`,
            text: L(
              "The closing brace marks the end of the whole choice. After this, the program carries on as normal.",
              "Band hone wala brace poore faisle ka anjaam hai. Iske baad program aam tor par aage barhta hai.",
              "بند ہونے والا brace پورے فیصلے کا انجام ہے۔ اس کے بعد پروگرام عام طور پر آگے بڑھتا ہے۔"
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          "The part inside agar ... is a question that is either true or false: is umar bigger than 10? If yes, the first block runs. If no, the warna block runs.",
          "agar ke baad wala hissa ek sawaal hai jo ya to sahi hai ya ghalat: kya umar 10 se bari hai? Agar haan, to pehla block chalta hai. Agar nahi, to warna wala block chalta hai.",
          "agar کے بعد والا حصہ ایک سوال ہے جو یا تو صحیح ہے یا غلط: کیا umar 10 سے بڑی ہے؟ اگر ہاں، تو پہلا بلاک چلتا ہے۔ اگر نہیں، تو warna والا بلاک چلتا ہے۔"
        ),
      },
      {
        t: "h",
        text: L("More than two paths", "Do se zyada raaste", "دو سے زیادہ راستے"),
      },
      {
        t: "code",
        code: `score = 75

agar score > 90 {
    likho "Shaandaar!"
} warna agar score > 50 {
    likho "Acha kaam!"
} warna {
    likho "Koshish jari rakho."
}`,
      },
      {
        t: "tip",
        text: L(
          "Comparisons you'll use a lot: > bigger, < smaller, == exactly equal. Note ==, the double equals, asks a question; a single = puts a value in a box.",
          "Aksar use hone wale comparison: > bara, < chota, == bilkul barabar. Yaad rahe == (double equals) sawaal poochta hai; ek = value dabbe mein rakhta hai.",
          "اکثر استعمال ہونے والے comparison: > بڑا، < چھوٹا، == بالکل برابر۔ یاد رہے == (ڈبل برابر) سوال پوچھتا ہے؛ ایک = ویلیو ڈبے میں رکھتا ہے۔"
        ),
      },
      {
        t: "history",
        title: L(
          "True, false, and a man named Boole",
          "Sahi, ghalat, aur ek shakhs Boole",
          "صحیح، غلط، اور ایک شخص Boole"
        ),
        text: L(
          "Every choice a computer makes comes down to true or false. That whole system of reasoning was worked out in the 1850s by an English mathematician, George Boole, long before any computer existed. He showed that logic — and, or, not — could be written like algebra. Almost a hundred years later, engineers realised electrical switches that are on or off are a perfect match for Boole's true and false. That is why, deep down, every app, game and website is just billions of tiny yes/no decisions, exactly like your agar.",
          "Computer ka har faisla sahi ya ghalat tak aata hai. Yeh poora nizaam-e-fikr 1850 ki dahai mein ek angrez riyazidaan George Boole ne tarteeb diya, kisi computer ke wujood mein aane se bohat pehle. Usne dikhaya ke mantiq — aur (and), ya (or), nahi (not) — algebra ki tarah likhi ja sakti hai. Taqreeban sau saal baad, engineers ko ehsaas hua ke electric switches jo on ya off hote hain Boole ke sahi aur ghalat se bilkul mel khate hain. Isi liye, andar se, har app, game aur website sirf arabon chhote haan/nahi faisle hai, bilkul aap ke agar ki tarah.",
          "کمپیوٹر کا ہر فیصلہ صحیح یا غلط تک آتا ہے۔ یہ پورا نظامِ فکر 1850 کی دہائی میں ایک انگریز ریاضی دان George Boole نے ترتیب دیا، کسی کمپیوٹر کے وجود میں آنے سے بہت پہلے۔ اس نے دکھایا کہ منطق — اور (and)، یا (or)، نہیں (not) — algebra کی طرح لکھی جا سکتی ہے۔ تقریباً سو سال بعد، انجینئرز کو احساس ہوا کہ electric switches جو on یا off ہوتے ہیں Boole کے صحیح اور غلط سے بالکل میل کھاتے ہیں۔ اسی لیے، اندر سے، ہر app، game اور website صرف اربوں چھوٹے ہاں/نہیں فیصلے ہے، بالکل آپ کے agar کی طرح۔"
        ),
      },
      {
        t: "try",
        text: L(
          'Write a check that prints "Even" or "Odd" for a number. Hint: an even number has no remainder when divided by 2, try the % operator.',
          'Aisa check likho jo kisi number ke liye "Even" ya "Odd" print kare. Ishaara: even number ko 2 se taqseem karne par baqi nahi bachta, % operator try karo.',
          'ایسا چیک لکھو جو کسی نمبر کے لیے "Even" یا "Odd" پرنٹ کرے۔ اشارہ: even نمبر کو 2 سے تقسیم کرنے پر باقی نہیں بچتا، % operator آزماؤ۔'
        ),
      },
    ],
  },
  {
    slug: "loops",
    icon: "RefreshCw",
    title: L("Doing things again and again", "Baar baar kaam karna", "بار بار کام کرنا"),
    concept: L(
      "Loops repeat work so you don't copy-paste.",
      "Loops kaam dohraate hain taake aap ko copy-paste na karna pare.",
      "loops کام دہراتے ہیں تاکہ آپ کو کاپی پیسٹ نہ کرنا پڑے۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          "Computers are brilliant at repeating. Instead of writing the same line ten times, you write it once inside a loop and tell the computer how many times to go round.",
          "Computer dohraane mein kamaal hai. Aik hi line das baar likhne ke bajaye, use ek loop ke andar ek baar likho aur computer ko batao kitni baar ghoomna hai.",
          "کمپیوٹر دہرانے میں کمال ہے۔ ایک ہی لائن دس بار لکھنے کے بجائے، اسے ایک loop کے اندر ایک بار لکھو اور کمپیوٹر کو بتاؤ کتنی بار گھومنا ہے۔"
        ),
      },
      {
        t: "h",
        text: L("Counting with a range", "Range se ginti", "range سے گنتی"),
      },
      {
        t: "walk",
        steps: [
          {
            code: `1 se 5 tak har i {`,
            text: L(
              'Read it as "from 1 to 5, for each i". wow makes a counter box called i and will run the block once for each value: first 1, then 2, all the way to 5.',
              'Ise parho "1 se 5 tak, har i ke liye". wow i naam ka counter dabba banata hai aur block ko har value ke liye ek baar chalata hai: pehle 1, phir 2, 5 tak.',
              'اسے پڑھو "1 se 5 tak, ہر i کے لیے"۔ wow i نام کا counter ڈبہ بناتا ہے اور بلاک کو ہر ویلیو کے لیے ایک بار چلاتا ہے: پہلے 1، پھر 2، 5 تک۔'
            ),
          },
          {
            code: `    likho "Number {i}"`,
            text: L(
              "The body of the loop. Each time round, {i} holds the current count — so this prints Number 1, then Number 2, and so on. One line of code, five lines of output.",
              "Loop ka jism. Har chakkar mein {i} maujooda ginti rakhta hai — to yeh print karta hai Number 1, phir Number 2, waghaira. Ek line code, paanch line output.",
              "loop کا جسم۔ ہر چکر میں {i} موجودہ گنتی رکھتا ہے — تو یہ پرنٹ کرتا ہے Number 1، پھر Number 2، وغیرہ۔ ایک لائن کوڈ، پانچ لائن آؤٹ پٹ۔"
            ),
          },
          {
            code: `}`,
            text: L(
              "The closing brace sends the computer back up to the top to take the next value of i. When i goes past 5, the loop stops and the program moves on.",
              "Band brace computer ko wapas upar bhej deta hai taake i ki agli value le. Jab i 5 se aage nikal jata hai, loop ruk jata hai aur program aage barhta hai.",
              "بند brace کمپیوٹر کو واپس اوپر بھیج دیتا ہے تاکہ i کی اگلی ویلیو لے۔ جب i 5 سے آگے نکل جاتا ہے، loop رک جاتا ہے اور پروگرام آگے بڑھتا ہے۔"
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          'This runs the block for i = 1, 2, 3, 4, 5. The range comes first, "1 se 5 tak", then har names the counter variable. Both ends are included.',
          'Yeh block i = 1, 2, 3, 4, 5 ke liye chalta hai. Range pehle aati hai, "1 se 5 tak", phir har counter variable ka naam deta hai. Dono siray shamil hain.',
          'یہ بلاک i = 1، 2، 3، 4، 5 کے لیے چلتا ہے۔ range پہلے آتی ہے، "1 se 5 tak", پھر har کاؤنٹر متغیر کا نام دیتا ہے۔ دونوں سرے شامل ہیں۔'
        ),
      },
      {
        t: "h",
        text: L("Going through a list", "List mein se guzarna", "list میں سے گزرنا"),
      },
      {
        t: "code",
        code: `phal = ["aam", "kela", "seb"]

har phal mein p {
    likho "I like {p}"
}`,
      },
      {
        t: "p",
        text: L(
          "And when you just want to repeat a fixed number of times, baar (times) is the shortest way:",
          "Aur jab aap ko sirf muqarrar dafaa dohrana ho, to baar sab se chhota tareeqa hai:",
          "اور جب آپ کو صرف مقررہ دفعہ دہرانا ہو، تو baar سب سے چھوٹا طریقہ ہے:"
        ),
      },
      {
        t: "code",
        code: `3 baar {
    likho "wow!"
}`,
      },
      {
        t: "history",
        title: L(
          "Loops older than computers",
          "Computer se purane loops",
          "کمپیوٹر سے پرانے loops"
        ),
        text: L(
          "The idea of repeating a stored pattern is older than electronics. In 1804 a Frenchman, Joseph-Marie Jacquard, built a weaving loom that read stiff cards with holes punched in them; the same cards could be fed in again and again to repeat a pattern in the cloth. Those punched cards inspired the first computers a century later — programs were literally loops of cards. Today a loop spares you from copy-pasting, but it carries the same old magic: write the pattern once, repeat it as many times as you like.",
          "Mehfooz pattern ko dohraane ka khayaal electronics se purana hai. 1804 mein ek Francisi, Joseph-Marie Jacquard, ne aisa karghah banaya jo sakht cards parhta tha jin mein suraakh hote the; wahi cards baar baar daal kar kapre mein pattern dohraya ja sakta tha. Unhi punched cards ne ek sadi baad pehle computers ko mutaasir kiya — programs sachmuch cards ke loops the. Aaj loop aap ko copy-paste se bachata hai, lekin ismein wahi purana jaadu hai: pattern ek baar likho, jitni baar chaho dohrao.",
          "محفوظ pattern کو دہرانے کا خیال electronics سے پرانا ہے۔ 1804 میں ایک فرانسیسی، Joseph-Marie Jacquard، نے ایسا کرگھا بنایا جو سخت cards پڑھتا تھا جن میں سوراخ ہوتے تھے؛ وہی cards بار بار ڈال کر کپڑے میں pattern دہرایا جا سکتا تھا۔ انہی punched cards نے ایک صدی بعد پہلے کمپیوٹرز کو متاثر کیا — programs سچ مچ cards کے loops تھے۔ آج loop آپ کو copy-paste سے بچاتا ہے، لیکن اس میں وہی پرانا جادو ہے: pattern ایک بار لکھو، جتنی بار چاہو دہراؤ۔"
        ),
      },
      {
        t: "try",
        text: L(
          "Print the 7 times table from 7 × 1 to 7 × 10 using a range loop.",
          "Range loop se 7 ka pahara 7 × 1 se 7 × 10 tak print karo.",
          "range loop سے 7 کا پہاڑہ 7 × 1 سے 7 × 10 تک پرنٹ کرو۔"
        ),
      },
    ],
  },
  {
    slug: "functions",
    icon: "Hammer",
    title: L(
      "Teaching the computer new tricks",
      "Computer ko naye gur sikhana",
      "کمپیوٹر کو نئے گُر سکھانا"
    ),
    concept: L(
      "Functions package steps under one name you can reuse.",
      "Functions kai steps ko ek naam ke neeche jama karte hain jise dobara use kar sakte hain.",
      "functions کئی اسٹیپس کو ایک نام کے نیچے جمع کرتے ہیں جسے دوبارہ استعمال کر سکتے ہیں۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          'A function is a set of steps you give a name to. Once it is named, you can run all those steps again just by calling the name, like teaching a dog the trick "sit" and then saying "sit" whenever you want.',
          'Function steps ka ek set hai jise aap naam dete hain. Naam milne ke baad, sirf naam bula kar woh saare steps dobara chala sakte hain, jaise kutte ko "baith" sikhana aur phir jab chaaho "baith" kehna.',
          'function اسٹیپس کا ایک سیٹ ہے جسے آپ نام دیتے ہیں۔ نام ملنے کے بعد، صرف نام بلا کر وہ سارے اسٹیپس دوبارہ چلا سکتے ہیں، جیسے کتے کو "بیٹھ" سکھانا اور پھر جب چاہو "بیٹھ" کہنا۔'
        ),
      },
      {
        t: "p",
        text: L(
          "In wow you make one with banao (make) and send a result back with bhejo (send).",
          "wow mein aap ek function banao (make) se banate hain aur nateeja bhejo (send) se wapas bhejte hain.",
          "wow میں آپ ایک function banao (make) سے بناتے ہیں اور نتیجہ bhejo (send) سے واپس بھیجتے ہیں۔"
        ),
      },
      {
        t: "walk",
        steps: [
          {
            code: `banao salam(naam) {`,
            text: L(
              'banao means "make". This names a new trick salam and says it takes one input, naam. Nothing happens yet — we are only teaching the trick, not performing it.',
              'banao ka matlab "banao". Yeh ek naya gur salam naam deta hai aur kehta hai ke ise ek input chahiye, naam. Abhi kuch nahi hota — hum sirf gur sikha rahe hain, kar nahi rahe.',
              'banao کا مطلب "بناؤ"۔ یہ ایک نیا گُر salam نام دیتا ہے اور کہتا ہے کہ اسے ایک input چاہیے، naam۔ ابھی کچھ نہیں ہوتا — ہم صرف گُر سکھا رہے ہیں، کر نہیں رہے۔'
            ),
          },
          {
            code: `    likho "Salam {naam}! Kaise ho?"`,
            text: L(
              "These are the steps inside the trick. {naam} will be filled in with whatever name is handed over when the trick is performed.",
              "Yeh gur ke andar ke steps hain. {naam} us naam se bhar jayega jo gur karte waqt diya jayega.",
              "یہ گُر کے اندر کے اسٹیپس ہیں۔ {naam} اس نام سے بھر جائے گا جو گُر کرتے وقت دیا جائے گا۔"
            ),
          },
          {
            code: `}`,
            text: L(
              "End of the trick's definition. The computer now remembers salam, ready to use, but has not run it even once yet.",
              "Gur ki tareef khatam. Computer ab salam yaad rakhta hai, istemaal ke liye tayar, lekin abhi tak ek baar bhi nahi chalaya.",
              "گُر کی تعریف ختم۔ کمپیوٹر اب salam یاد رکھتا ہے، استعمال کے لیے تیار، لیکن ابھی تک ایک بار بھی نہیں چلایا۔"
            ),
          },
          { code: `` },
          {
            code: `salam("Ahmad")`,
            text: L(
              'Now we perform the trick — this is called "calling" the function. naam becomes "Ahmad", and the steps run, printing Salam Ahmad! Kaise ho?',
              'Ab hum gur karte hain — ise function "call karna" kehte hain. naam ban jata hai "Ahmad", aur steps chalte hain, print karte hue Salam Ahmad! Kaise ho?',
              'اب ہم گُر کرتے ہیں — اسے function "call کرنا" کہتے ہیں۔ naam بن جاتا ہے "Ahmad"، اور اسٹیپس چلتے ہیں، پرنٹ کرتے ہوئے Salam Ahmad! Kaise ho?'
            ),
          },
          {
            code: `salam("Sara")`,
            text: L(
              "The same trick again, with a different input. We wrote the steps once but use them as many times as we like — that is the whole point of a function.",
              "Wahi gur dobara, alag input ke saath. Humne steps ek baar likhe lekin jitni baar chahein istemaal karte hain — yahi function ka asal maqsad hai.",
              "وہی گُر دوبارہ، الگ input کے ساتھ۔ ہم نے اسٹیپس ایک بار لکھے لیکن جتنی بار چاہیں استعمال کرتے ہیں — یہی function کا اصل مقصد ہے۔"
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          'Here salam is the trick\'s name, and naam is an input, the function uses whatever name you hand it. Calling salam("Sara") runs the steps with naam set to "Sara".',
          'Yahan salam gur ka naam hai, aur naam ek input hai, function jo bhi naam aap dein wahi istemaal karta hai. salam("Sara") bulane par steps naam = "Sara" ke saath chalte hain.',
          'یہاں salam گُر کا نام ہے، اور naam ایک input ہے، function جو بھی نام آپ دیں وہی استعمال کرتا ہے۔ salam("Sara") بلانے پر اسٹیپس naam = "Sara" کے ساتھ چلتے ہیں۔'
        ),
      },
      {
        t: "h",
        text: L("Sending a value back", "Value wapas bhejna", "ویلیو واپس بھیجنا"),
      },
      {
        t: "code",
        code: `banao jama(a, b) {
    bhejo a + b
}

total = jama(3, 4)
likho "Total: {total}"`,
      },
      {
        t: "tip",
        text: L(
          "bhejo hands a value back to whoever called the function, so you can store it in a box and use it later. A function without bhejo just does its steps and returns nothing.",
          "bhejo value us ko wapas deta hai jisne function bulaya tha, to aap use dabbe mein rakh kar baad mein istemaal kar sakte hain. bhejo ke baghair function sirf apne steps karta hai aur kuch wapas nahi karta.",
          "bhejo ویلیو اس کو واپس دیتا ہے جس نے function بلایا تھا، تو آپ اسے ڈبے میں رکھ کر بعد میں استعمال کر سکتے ہیں۔ bhejo کے بغیر function صرف اپنے اسٹیپس کرتا ہے اور کچھ واپس نہیں کرتا۔"
        ),
      },
      {
        t: "history",
        title: L(
          "Reuse: the programmer's superpower",
          "Dobara istemaal: programmer ki superpower",
          "دوبارہ استعمال: programmer کی superpower"
        ),
        text: L(
          "In the 1940s the first programmers noticed they were writing the same sequences of steps over and over. Grace Hopper, a US Navy officer and one of computing's great pioneers, championed the idea of writing a useful chunk of code once, giving it a name, and reusing it everywhere — what we now call functions (or subroutines). She also helped invent the idea that programs could be written in words humans understand instead of raw numbers. wow stands on her shoulders: banao lets you bottle up steps once and pour them out whenever you need them.",
          "1940 ki dahai mein pehle programmers ne dekha ke woh ek hi tarkeeb baar baar likh rahe hain. Grace Hopper, US Navy ki officer aur computing ki ek bari pioneer, ne yeh khayaal aam kiya ke kaam ka ek tukra ek baar likho, use naam do, aur har jagah dobara istemaal karo — jise hum ab functions (ya subroutines) kehte hain. Usne yeh khayaal bhi diya ke programs insaani lafzon mein likhe ja sakte hain, khaalis numbers ke bajaye. wow usi ke kandhon par khara hai: banao aap ko steps ek baar bottle mein band karne deta hai aur jab zaroorat ho undel dene deta hai.",
          "1940 کی دہائی میں پہلے programmers نے دیکھا کہ وہ ایک ہی ترکیب بار بار لکھ رہے ہیں۔ Grace Hopper، US Navy کی آفیسر اور computing کی ایک بڑی pioneer، نے یہ خیال عام کیا کہ کام کا ایک ٹکڑا ایک بار لکھو، اسے نام دو، اور ہر جگہ دوبارہ استعمال کرو — جسے ہم اب functions (یا subroutines) کہتے ہیں۔ اس نے یہ خیال بھی دیا کہ programs انسانی لفظوں میں لکھے جا سکتے ہیں، خالص numbers کے بجائے۔ wow اسی کے کندھوں پر کھڑا ہے: banao آپ کو اسٹیپس ایک بار bottle میں بند کرنے دیتا ہے اور جب ضرورت ہو انڈیل دینے دیتا ہے۔"
        ),
      },
      {
        t: "try",
        text: L(
          "Write a function double(n) that sends back n times 2, then print double(21).",
          "Aisa function double(n) likho jo n ka do guna wapas bheje, phir double(21) print karo.",
          "ایسا function double(n) لکھو جو n کا دو گنا واپس بھیجے، پھر double(21) پرنٹ کرو۔"
        ),
      },
    ],
  },
  {
    slug: "lists-and-tools",
    icon: "Wrench",
    title: L("Lists and your toolbox", "Lists aur aap ka toolbox", "lists اور آپ کا toolbox"),
    concept: L(
      "Hold many values in a list and shape them with your toolbox.",
      "Bohat si values ek list mein rakho aur toolbox se unhe sanwaaro.",
      "بہت سی ویلیوز ایک list میں رکھو اور toolbox سے انہیں سنوارو۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          "A list holds many values in order, written inside square brackets. It is perfect for a class of students, a set of scores, or a basket of fruit.",
          "List bohat si values tarteeb se rakhti hai, square brackets ke andar likhi hui. Yeh class ke bachhon, scores ke set, ya phalon ki tokri ke liye behtareen hai.",
          "list بہت سی ویلیوز ترتیب سے رکھتی ہے، اسکوائر بریکٹس کے اندر لکھی ہوئی۔ یہ کلاس کے بچوں، اسکورز کے سیٹ، یا پھلوں کی ٹوکری کے لیے بہترین ہے۔"
        ),
      },
      {
        t: "walk",
        steps: [
          {
            code: `numbers = [4, 8, 15, 16, 23, 42]`,
            text: L(
              "The square brackets make a list, and the commas separate its items. The whole list — all six numbers — goes into one box called numbers.",
              "Square brackets ek list banate hain, aur commas iske items ko alag karte hain. Poori list — chhwo ke chhe numbers — ek dabbe numbers mein jaati hai.",
              "square brackets ایک list بناتے ہیں، اور commas اس کے items کو الگ کرتے ہیں۔ پوری list — چھ کے چھ numbers — ایک ڈبے numbers میں جاتی ہے۔"
            ),
          },
          {
            code: `likho "There are {ginti(numbers)} numbers"`,
            text: L(
              "ginti is a tool that counts how many items are in a list. ginti(numbers) gives 6, which drops into the sentence: There are 6 numbers.",
              "ginti ek tool hai jo ginta hai ke list mein kitne items hain. ginti(numbers) 6 deta hai, jo jumle mein girta hai: There are 6 numbers.",
              "ginti ایک tool ہے جو گنتا ہے کہ list میں کتنے items ہیں۔ ginti(numbers) 6 دیتا ہے، جو جملے میں گرتا ہے: There are 6 numbers۔"
            ),
          },
          {
            code: `likho "Their total is {jama(numbers)}"`,
            text: L(
              "jama is another tool — it adds every number in the list together. One short word does what would otherwise take a whole loop.",
              "jama ek aur tool hai — yeh list ke har number ko jama kar deta hai. Ek chhota lafz woh kaam karta hai jis ke liye warna poora loop chahiye hota.",
              "jama ایک اور tool ہے — یہ list کے ہر number کو جمع کر دیتا ہے۔ ایک چھوٹا لفظ وہ کام کرتا ہے جس کے لیے ورنہ پورا loop چاہیے ہوتا۔"
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          "wow comes with a built-in toolbox. It is always available, no import needed. ginti counts items, jama adds them up, tarteeb sorts them, and many more.",
          "wow ke saath ek built-in toolbox aata hai. Yeh hamesha mojood hai, import ki zaroorat nahi. ginti items ginta hai, jama unhe jorta hai, tarteeb unhe tarteeb deta hai, aur bohat kuch.",
          "wow کے ساتھ ایک built-in toolbox آتا ہے۔ یہ ہمیشہ موجود ہے، import کی ضرورت نہیں۔ ginti آئٹمز گنتا ہے، jama انہیں جوڑتا ہے، tarteeb انہیں ترتیب دیتا ہے، اور بہت کچھ۔"
        ),
      },
      {
        t: "h",
        text: L("Picking and changing items", "Items chunna aur badalna", "آئٹمز چننا اور بدلنا"),
      },
      {
        t: "code",
        code: `numbers = [4, 8, 15, 16, 23, 42]

bade = chuno(numbers, x > 15)
likho bade`,
      },
      {
        t: "p",
        text: L(
          "chuno (choose) keeps only the items that pass a test. Here x stands for each item in turn, and we keep the ones bigger than 15.",
          "chuno (chuno) sirf woh items rakhta hai jo test paas karein. Yahan x baari baari har item ko zaahir karta hai, aur hum 15 se bare wale rakhte hain.",
          "chuno صرف وہ آئٹمز رکھتا ہے جو ٹیسٹ پاس کریں۔ یہاں x باری باری ہر آئٹم کو ظاہر کرتا ہے، اور ہم 15 سے بڑے والے رکھتے ہیں۔"
        ),
      },
      {
        t: "history",
        title: L(
          "Standing on a shared toolbox",
          "Ek mushtarka toolbox par",
          "ایک مشترکہ toolbox پر"
        ),
        text: L(
          "Early programmers had to write every small tool — sorting, counting, searching — from scratch, every single time. It was slow and full of mistakes. Over the decades, programmers began collecting these common tools into shared libraries that come built into the language, so nobody has to reinvent them. wow's auzaar is exactly that: a ready-made box of well-tested tools. Learning to reach for the right tool instead of rebuilding it is one of the biggest leaps from beginner to real programmer.",
          "Pehle programmers ko har chhota tool — tarteeb, ginti, talaash — har baar shuru se likhna parta tha. Yeh sust aur ghaltiyon se bhara tha. Dahaiyon mein, programmers ne in aam tools ko mushtarka libraries mein jama karna shuru kiya jo zaban ke andar aati hain, taake kisi ko inhe dobara banana na pare. wow ka auzaar bilkul yahi hai: achhi tarah aazmaye gaye tools ka tayaar dabba. Sahi tool uthana seekhna, usse dobara banane ke bajaye, beginner se asli programmer banne ki sab se bari chhalaang hai.",
          "پہلے programmers کو ہر چھوٹا tool — ترتیب، گنتی، تلاش — ہر بار شروع سے لکھنا پڑتا تھا۔ یہ سست اور غلطیوں سے بھرا تھا۔ دہائیوں میں، programmers نے ان عام tools کو مشترکہ libraries میں جمع کرنا شروع کیا جو زبان کے اندر آتی ہیں، تاکہ کسی کو انہیں دوبارہ بنانا نہ پڑے۔ wow کا auzaar بالکل یہی ہے: اچھی طرح آزمائے گئے tools کا تیار ڈبہ۔ صحیح tool اٹھانا سیکھنا، اسے دوبارہ بنانے کے بجائے، beginner سے اصلی programmer بننے کی سب سے بڑی چھلانگ ہے۔"
        ),
      },
      {
        t: "try",
        text: L(
          "Make a list of your friends' ages and print the largest one with max(list).",
          "Apne doston ki umron ki ek list banao aur max(list) se sab se bari print karo.",
          "اپنے دوستوں کی عمروں کی ایک list بناؤ اور max(list) سے سب سے بڑی پرنٹ کرو۔"
        ),
      },
    ],
  },
  {
    slug: "pipelines",
    icon: "Workflow",
    title: L("Pipelines with phir", "phir ke saath pipelines", "phir کے ساتھ pipelines"),
    concept: L(
      "Chain steps left-to-right so they read like a sentence.",
      "Steps ko baayein se daayein jodo taake woh jumle ki tarah parhe jaayein.",
      "اسٹیپس کو بائیں سے دائیں جوڑو تاکہ وہ جملے کی طرح پڑھے جائیں۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          "Sometimes you want to do several things to a list one after another: filter it, then sort it, then take the first item. You could use a box for each step, or you can connect them with phir (then).",
          "Kabhi aap ek list ke saath kai kaam yake baad deegre karna chahte hain: filter karo, phir tarteeb do, phir pehla item lo. Har step ke liye dabba use kar sakte hain, ya unhe phir (then) se jod sakte hain.",
          "کبھی آپ ایک list کے ساتھ کئی کام یکے بعد دیگرے کرنا چاہتے ہیں: فلٹر کرو، پھر ترتیب دو، پھر پہلا آئٹم لو۔ ہر اسٹیپ کے لیے ڈبہ استعمال کر سکتے ہیں، یا انہیں phir (then) سے جوڑ سکتے ہیں۔"
        ),
      },
      {
        t: "walk",
        steps: [
          {
            code: `numbers = [1, 5, 3, 8, 2, 9]`,
            text: L(
              "Start with a list of six numbers in a box. This is the raw material the pipeline will work on.",
              "Ek dabbe mein chhe numbers ki list se shuru karo. Yeh woh kachcha maal hai jis par pipeline kaam karega.",
              "ایک ڈبے میں چھ numbers کی list سے شروع کرو۔ یہ وہ کچا مال ہے جس پر pipeline کام کرے گا۔"
            ),
          },
          { code: `` },
          {
            code: `nateeja = numbers`,
            text: L(
              "Begin the pipeline. The value flowing through it starts as the whole list, and the final result will be stored in nateeja.",
              "Pipeline shuru karo. Ismein behne wali value poori list se shuru hoti hai, aur aakhri nateeja nateeja mein mehfooz hoga.",
              "pipeline شروع کرو۔ اس میں بہنے والی ویلیو پوری list سے شروع ہوتی ہے، اور آخری نتیجہ nateeja میں محفوظ ہوگا۔"
            ),
          },
          {
            code: `    phir chuno(x > 4)`,
            text: L(
              'phir means "then". Take the list and keep only the items where x > 4. After this step the value flowing on is [5, 8, 9].',
              'phir ka matlab "phir". List lo aur sirf woh items rakho jahan x > 4 ho. Is step ke baad aage behne wali value [5, 8, 9] hai.',
              'phir کا مطلب "پھر"۔ list لو اور صرف وہ items رکھو جہاں x > 4 ہو۔ اس step کے بعد آگے بہنے والی ویلیو [5, 8, 9] ہے۔'
            ),
          },
          {
            code: `    phir tarteeb`,
            text: L(
              "Then sort what is flowing through into order: [5, 8, 9]. Each phir takes the result of the line above and hands it to the next tool.",
              "Phir jo beh raha hai use tarteeb mein lagao: [5, 8, 9]. Har phir upar wali line ka nateeja le kar agle tool ko de deta hai.",
              "پھر جو بہہ رہا ہے اسے ترتیب میں لگاؤ: [5, 8, 9]۔ ہر phir اوپر والی لائن کا نتیجہ لے کر اگلے tool کو دے دیتا ہے۔"
            ),
          },
          {
            code: `    phir pehla`,
            text: L(
              "Finally take just the first item of the sorted list: 5. That single value is what lands in nateeja.",
              "Aakhir mein tarteeb shuda list ka sirf pehla item lo: 5. Wahi ek value nateeja mein aati hai.",
              "آخر میں ترتیب شدہ list کا صرف پہلا item لو: 5۔ وہی ایک ویلیو nateeja میں آتی ہے۔"
            ),
          },
          { code: `` },
          {
            code: `likho nateeja`,
            text: L(
              "Print the end of the pipeline: 5. Four small, clear steps chained into one readable flow.",
              "Pipeline ka anjaam print karo: 5. Chaar chhote, saaf steps ek parhne layak behao mein jude.",
              "pipeline کا انجام پرنٹ کرو: 5۔ چار چھوٹے، صاف اسٹیپس ایک پڑھنے لائق بہاؤ میں جڑے۔"
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          'Read it out loud: "the numbers, then choose the big ones, then sort, then take the first." phir hands the value on the left into the tool on the right. It is the same as doing each step separately, just tidier.',
          'Zor se parho: "numbers, phir bare wale chuno, phir tarteeb do, phir pehla lo." phir baayein taraf ki value ko daayein taraf ke tool ko de deta hai. Yeh har step alag karne jaisa hi hai, bas zyada saaf suthra.',
          'زور سے پڑھو: "numbers، پھر بڑے والے چنو، پھر ترتیب دو، پھر پہلا لو۔" phir بائیں طرف کی ویلیو کو دائیں طرف کے ٹول کو دے دیتا ہے۔ یہ ہر اسٹیپ الگ کرنے جیسا ہی ہے، بس زیادہ صاف ستھرا۔'
        ),
      },
      {
        t: "tip",
        text: L(
          "Pipelines shine when each step is small and clear. If a chain gets hard to read, it is fine to break it back into named boxes.",
          "Pipelines tab achi lagti hain jab har step chhota aur saaf ho. Agar chain parhna mushkil ho jaye, to use dobara naam wale dabbon mein torna theek hai.",
          "pipelines تب اچھی لگتی ہیں جب ہر اسٹیپ چھوٹا اور صاف ہو۔ اگر chain پڑھنا مشکل ہو جائے، تو اسے دوبارہ نام والے ڈبوں میں توڑنا ٹھیک ہے۔"
        ),
      },
      {
        t: "history",
        title: L(
          "The pipe that changed everything",
          "Woh pipe jisne sab badal diya",
          "وہ pipe جس نے سب بدل دیا"
        ),
        text: L(
          'In 1973, while building the Unix operating system at Bell Labs, a programmer named Doug McIlroy pushed for a simple idea: let small programs each do one thing well, then connect them so the output of one flows straight into the next — a "pipe". It was added overnight and changed how software is built forever. Half a century later, that same idea lives in the command line every developer uses, and in wow\'s phir. Small pieces, clearly joined, beat one giant tangled program almost every time.',
          '1973 mein, Bell Labs mein Unix operating system banate waqt, Doug McIlroy naami programmer ne ek saada khayaal par zor diya: chhote programs har ek ek kaam achhi tarah karein, phir unhe jodo taake ek ka output seedha agle mein behe — ek "pipe". Yeh raat-o-raat shamil hua aur software banane ka tareeqa hamesha ke liye badal diya. Aadhi sadi baad, wahi khayaal har developer ki command line mein zinda hai, aur wow ke phir mein. Chhote tukre, saaf jude hue, taqreeban har baar ek bare uljhe program ko maat dete hain.',
          '1973 میں، Bell Labs میں Unix operating system بناتے وقت، Doug McIlroy نامی programmer نے ایک سادہ خیال پر زور دیا: چھوٹے programs ہر ایک ایک کام اچھی طرح کریں، پھر انہیں جوڑو تاکہ ایک کا output سیدھا اگلے میں بہے — ایک "pipe"۔ یہ رات و رات شامل ہوا اور software بنانے کا طریقہ ہمیشہ کے لیے بدل دیا۔ آدھی صدی بعد، وہی خیال ہر developer کی command line میں زندہ ہے، اور wow کے phir میں۔ چھوٹے ٹکڑے، صاف جڑے ہوئے، تقریباً ہر بار ایک بڑے الجھے program کو مات دیتے ہیں۔'
        ),
      },
      {
        t: "try",
        text: L(
          "Start from a list of numbers and build a pipeline that doubles each one (badlo) and then sums them (jama).",
          "Numbers ki ek list se shuru karo aur aisa pipeline banao jo har ek ko double kare (badlo) phir un ko jama kare (jama).",
          "نمبرز کی ایک list سے شروع کرو اور ایسا pipeline بناؤ جو ہر ایک کو ڈبل کرے (badlo) پھر ان کو جمع کرے (jama)۔"
        ),
      },
    ],
  },
  {
    slug: "when-things-go-wrong",
    icon: "LifeBuoy",
    title: L("When things go wrong", "Jab kuch ghalat ho jaye", "جب کچھ غلط ہو جائے"),
    concept: L(
      "Catch errors with koshish / pakro instead of crashing.",
      "Crash hone ke bajaye koshish / pakro se ghaltiyan pakdo.",
      "کریش ہونے کے بجائے koshish / pakro سے غلطیاں پکڑو۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          "Everyone makes mistakes, even computers hit situations they can't handle, like dividing a number by zero. Instead of letting the whole program stop, you can try something risky and catch the problem if it happens.",
          "Har koi ghalti karta hai, computer bhi aise mauqe se takrata hai jinhe woh handle nahi kar sakta, jaise kisi number ko sifr se taqseem karna. Poore program ko rukne dene ke bajaye, aap koi khatre wala kaam koshish kar sakte hain aur masla hone par use pakad sakte hain.",
          "ہر کوئی غلطی کرتا ہے، کمپیوٹر بھی ایسے موقع سے ٹکراتا ہے جنہیں وہ ہینڈل نہیں کر سکتا، جیسے کسی نمبر کو صفر سے تقسیم کرنا۔ پورے پروگرام کو رکنے دینے کے بجائے، آپ کوئی خطرے والا کام koshish کر سکتے ہیں اور مسئلہ ہونے پر اسے پکڑ سکتے ہیں۔"
        ),
      },
      {
        t: "walk",
        steps: [
          {
            code: `koshish {`,
            text: L(
              'koshish means "try". It opens a block of risky steps and tells wow: "attempt these, but if something breaks, do not crash the whole program."',
              'koshish ka matlab "koshish karo". Yeh khatre wale steps ka block kholta hai aur wow se kehta hai: "inhe aazmao, lekin agar kuch toot jaye to poora program crash mat karo."',
              'koshish کا مطلب "کوشش کرو"۔ یہ خطرے والے اسٹیپس کا بلاک کھولتا ہے اور wow سے کہتا ہے: "انہیں آزماؤ، لیکن اگر کچھ ٹوٹ جائے تو پورا program crash مت کرو۔"'
            ),
          },
          {
            code: `    natija = 10 / 0`,
            text: L(
              "This is the risky line. Dividing by zero is impossible, so wow raises an error right here and immediately jumps out of the koshish block.",
              "Yeh khatre wali line hai. Sifr se taqseem namumkin hai, to wow yahin ek error uthata hai aur foran koshish block se baahar kood jata hai.",
              "یہ خطرے والی لائن ہے۔ صفر سے تقسیم ناممکن ہے، تو wow یہیں ایک error اٹھاتا ہے اور فوراً koshish بلاک سے باہر کود جاتا ہے۔"
            ),
          },
          {
            code: `    likho natija`,
            text: L(
              "Never runs! Because the line above failed, wow skips straight past this one — there is no answer to print.",
              "Kabhi nahi chalti! Upar wali line fail ho gayi, is liye wow seedha ise chhor deta hai — print karne ke liye koi jawab hai hi nahi.",
              "کبھی نہیں چلتی! اوپر والی لائن fail ہو گئی، اس لیے wow سیدھا اسے چھوڑ دیتا ہے — پرنٹ کرنے کے لیے کوئی جواب ہے ہی نہیں۔"
            ),
          },
          {
            code: `} pakro ghalti {`,
            text: L(
              'pakro means "catch". When the try block breaks, control lands here, and the box ghalti is filled with a message describing what went wrong.',
              'pakro ka matlab "pakro". Jab try block tootta hai, control yahan aata hai, aur dabba ghalti us paighaam se bhar jata hai jo bataata hai kya ghalat hua.',
              'pakro کا مطلب "پکڑو"۔ جب try بلاک ٹوٹتا ہے، control یہاں آتا ہے، اور ڈبہ ghalti اس پیغام سے بھر جاتا ہے جو بتاتا ہے کیا غلط ہوا۔'
            ),
          },
          {
            code: `    likho "Oops: {ghalti}"`,
            text: L(
              "This runs instead of crashing. It prints a friendly message including ghalti — here, Oops: sifr se taqseem nahi ho sakta.",
              "Yeh crash hone ke bajaye chalti hai. Yeh ek dostana paighaam print karti hai jismein ghalti shamil hai — yahan, Oops: sifr se taqseem nahi ho sakta.",
              "یہ crash ہونے کے بجائے چلتی ہے۔ یہ ایک دوستانہ پیغام پرنٹ کرتی ہے جس میں ghalti شامل ہے — یہاں، Oops: sifr se taqseem nahi ho sakta۔"
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          'koshish (try) runs the risky steps. If anything goes wrong, the pakro (catch) block runs instead, and ghalti holds a message describing what happened, here, "sifr se taqseem nahi ho sakta" (you can\'t divide by zero).',
          'koshish (try) khatre wale steps chalata hai. Agar kuch ghalat ho, to uski jagah pakro (catch) block chalta hai, aur ghalti ek paighaam rakhta hai jo bataata hai kya hua, yahan, "sifr se taqseem nahi ho sakta".',
          'koshish (try) خطرے والے اسٹیپس چلاتا ہے۔ اگر کچھ غلط ہو، تو اس کی جگہ pakro (catch) بلاک چلتا ہے، اور ghalti ایک پیغام رکھتا ہے جو بتاتا ہے کیا ہوا، یہاں، "sifr se taqseem nahi ho sakta"۔'
        ),
      },
      {
        t: "tip",
        text: L(
          "Good error messages are a kindness to yourself. wow writes its mistakes in plain Roman Urdu and points at the exact spot, so you can fix them quickly.",
          "Achhe error messages apne aap par meharbani hain. wow apni ghaltiyan saaf Roman Urdu mein likhta hai aur theek jagah ishaara karta hai, taake aap jaldi theek kar sakein.",
          "اچھے error messages اپنے آپ پر مہربانی ہیں۔ wow اپنی غلطیاں صاف رومن اردو میں لکھتا ہے اور ٹھیک جگہ اشارہ کرتا ہے، تاکہ آپ جلدی ٹھیک کر سکیں۔"
        ),
      },
      {
        t: "history",
        title: L(
          "The very first computer bug",
          "Sab se pehla computer bug",
          "سب سے پہلا computer bug"
        ),
        text: L(
          'We call mistakes in code "bugs", and there is a real bug behind the word. In 1947, a team led by Grace Hopper found that a huge early computer had stopped working — because an actual moth had got trapped in it. They taped the moth into the logbook and wrote "first actual case of bug being found." Mistakes are not a sign you are bad at coding; they are a normal, expected part of it. Even the pioneers spent their days finding and fixing them. koshish and pakro are wow\'s way of handling the bugs you can see coming.',
          'Code ki ghaltiyon ko hum "bugs" kehte hain, aur is lafz ke peeche ek asli keera (bug) hai. 1947 mein, Grace Hopper ki team ne dekha ke ek bara purana computer ruk gaya — kyunke ek asli patanga usmein phans gaya tha. Unhone patange ko logbook mein chipka diya aur likha "bug milne ka pehla asli waqia." Ghaltiyan is baat ki nishani nahi ke aap coding mein bure hain; yeh iska aam, mutawaqqa hissa hain. Pioneers bhi apne din inhe dhoondne aur theek karne mein guzaarte the. koshish aur pakro wow ka tareeqa hai un bugs ko sambhaalne ka jo aap aate dekh sakte hain.',
          'code کی غلطیوں کو ہم "bugs" کہتے ہیں، اور اس لفظ کے پیچھے ایک اصلی کیڑا (bug) ہے۔ 1947 میں، Grace Hopper کی team نے دیکھا کہ ایک بڑا پرانا computer رک گیا — کیونکہ ایک اصلی پتنگا اس میں پھنس گیا تھا۔ انہوں نے پتنگے کو logbook میں چپکا دیا اور لکھا "bug ملنے کا پہلا اصلی واقعہ۔" غلطیاں اس بات کی نشانی نہیں کہ آپ coding میں برے ہیں؛ یہ اس کا عام، متوقع حصہ ہیں۔ pioneers بھی اپنے دن انہیں ڈھونڈنے اور ٹھیک کرنے میں گزارتے تھے۔ koshish اور pakro wow کا طریقہ ہے ان bugs کو سنبھالنے کا جو آپ آتے دیکھ سکتے ہیں۔'
        ),
      },
      {
        t: "try",
        text: L(
          "Wrap some code that might fail in koshish, and print a friendly message in the pakro block.",
          "Aisa code jo fail ho sakta hai use koshish mein lapeto, aur pakro block mein ek dostana paighaam print karo.",
          "ایسا کوڈ جو فیل ہو سکتا ہے اسے koshish میں لپیٹو، اور pakro بلاک میں ایک دوستانہ پیغام پرنٹ کرو۔"
        ),
      },
    ],
  },
  {
    slug: "objects",
    icon: "Package",
    title: L("Objects, grouping things together", "Objects, cheezein saath rakhna", "آبجیکٹس، چیزیں ساتھ رکھنا"),
    concept: L(
      "An object groups related values under one name so you can describe a thing, a person, a card, a score, in one place.",
      "Object mutaalliq values ko ek naam ke neeche jama karta hai taake aap ek cheez, insaan, card, score, ko ek jagah bayan kar sakein.",
      "آبجیکٹ متعلق ویلیوز کو ایک نام کے نیچے جمع کرتا ہے تاکہ آپ ایک چیز، انسان، کارڈ، اسکور، کو ایک جگہ بیان کر سکیں۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          "So far we have stored one thing in a box, a number, a word, a list. But sometimes one thing has many parts: a person has a name, an age, and a city. An object lets you keep all of those together under one name.",
          "Ab tak hum ek dabbe mein ek cheez rakhte aaye hain, number, lafz, list. Lekin kabhi ek cheez ke kai hisse hote hain: ek insaan ka naam, umar, aur shahar hota hai. Object yeh sab ek naam ke neeche rakhne deta hai.",
          "اب تک ہم ایک ڈبے میں ایک چیز رکھتے آئے ہیں، نمبر، لفظ، list۔ لیکن کبھی ایک چیز کے کئی حصے ہوتے ہیں: ایک انسان کا نام، عمر، اور شہر ہوتا ہے۔ آبجیکٹ یہ سب ایک نام کے نیچے رکھنے دیتا ہے۔"
        ),
      },
      {
        t: "walk",
        steps: [
          {
            code: `shaks = { naam: "Ahmad", umar: 14, shahar: "Karachi" }`,
            text: L(
              'Build one object describing a person and store it in shaks. Each naam: value pair is a labelled fact: the name is Ahmad, the age is 14, the city is Karachi.',
              'Ek insaan ko bayan karta object banao aur use shaks mein rakho. Har naam: value jora ek naam wali haqeeqat hai: naam Ahmad, umar 14, shahar Karachi.',
              'ایک انسان کو بیان کرتا object بناؤ اور اسے shaks میں رکھو۔ ہر naam: value جوڑا ایک نام والی حقیقت ہے: نام Ahmad، عمر 14، شہر Karachi۔'
            ),
          },
          { code: `` },
          {
            code: `likho shaks.naam`,
            text: L(
              'The dot reaches inside the object and picks one labelled part. shaks.naam means "the naam of shaks", so this prints Ahmad.',
              'Dot object ke andar pohanch kar ek naam wala hissa nikalta hai. shaks.naam ka matlab "shaks ka naam", to yeh Ahmad print karta hai.',
              'dot object کے اندر پہنچ کر ایک نام والا حصہ نکالتا ہے۔ shaks.naam کا مطلب "shaks کا naam"، تو یہ Ahmad پرنٹ کرتا ہے۔'
            ),
          },
          {
            code: `likho shaks.umar`,
            text: L(
              "The same object, a different label. shaks.umar reaches in for the age and prints 14. One box, many neatly labelled parts.",
              "Wahi object, alag label. shaks.umar umar ke liye andar jata hai aur 14 print karta hai. Ek dabba, kai saaf naam wale hisse.",
              "وہی object، الگ label۔ shaks.umar عمر کے لیے اندر جاتا ہے اور 14 پرنٹ کرتا ہے۔ ایک ڈبہ، کئی صاف نام والے حصے۔"
            ),
          },
        ],
      },
      {
        t: "p",
        text: L(
          'The curly braces { } create the object. Inside, each key: value pair describes one fact about the thing. A dot after the variable name lets you pick out one piece: shaks.naam gives you "Ahmad".',
          'Curly braces { } object banate hain. Andar, har key: value pair cheez ke baare mein ek haqeeqat bayan karta hai. Variable ke baad dot ek hissa nikalne deta hai: shaks.naam aap ko "Ahmad" deta hai.',
          'Curly braces { } آبجیکٹ بناتے ہیں۔ اندر، ہر key: value pair چیز کے بارے میں ایک حقیقت بیان کرتا ہے۔ ویری ایبل کے بعد dot ایک حصہ نکالنے دیتا ہے: shaks.naam آپ کو "Ahmad" دیتا ہے۔'
        ),
      },
      {
        t: "h",
        text: L("Updating and adding properties", "Properties update aur add karna", "properties اپ ڈیٹ اور شامل کرنا"),
      },
      {
        t: "code",
        code: `shaks = { naam: "Ahmad", umar: 14 }

# Update an existing property
shaks.umar = 15
likho "Agla saal: {shaks.umar}"

# Add a new property that didn't exist before
shaks.email = "ahmad@example.com"
likho shaks.email`,
      },
      {
        t: "p",
        text: L(
          "You can update or add any property the same way you set a regular variable, just write shaks.something = value.",
          "Aap kisi bhi property ko waise hi update ya add kar sakte hain jaise regular variable set karte hain, bas shaks.kuch = value likho.",
          "آپ کسی بھی property کو ویسے ہی اپ ڈیٹ یا شامل کر سکتے ہیں جیسے regular ویری ایبل سیٹ کرتے ہیں، بس shaks.kuch = value لکھو۔"
        ),
      },
      {
        t: "h",
        text: L("Safe access with ka / ki / kay", "Ka / ki / kay se safe access", "ka / ki / kay سے safe access"),
      },
      {
        t: "p",
        text: L(
          "A plain dot crashes the program if the object is empty (khali). The Urdu possessives ka, ki, and kay give you a safe alternative that returns khali instead of crashing. Pick whichever sounds natural for the noun.",
          "Saada dot program crash kar deta hai agar object khali ho. Urdu possessives ka, ki, aur kay ek safe option dete hain jo crash ki jagah khali wapas karte hain. Jo noun ke liye theek lage woh chunein.",
          "سادہ dot پروگرام crash کر دیتا ہے اگر آبجیکٹ خالی ہو۔ اردو possessives ka، ki، اور kay ایک safe آپشن دیتے ہیں جو crash کی جگہ khali واپس کرتے ہیں۔ جو noun کے لیے فطری لگے وہ چنیں۔"
        ),
      },
      {
        t: "code",
        code: `shaks = { naam: "Ahmad", umar: 14 }

# Safe: returns khali if the key doesn't exist
likho shaks ka email

# Safe dot, same thing, different style
likho shaks?.email

# Only assign if currently khali
shaks.email ?= "ahmad@example.com"
likho shaks.email`,
      },
      {
        t: "tip",
        text: L(
          "ka is masculine, ki is feminine, kay is plural or general. They all do the same thing in code, pick the one that reads most naturally in the sentence.",
          "ka mard ke liye, ki aurat ke liye, kay jamah ya aam ke liye. Sab code mein ek hi kaam karte hain, jo jumle mein sabse qudrati lage woh chunein.",
          "ka مذکر کے لیے، ki مؤنث کے لیے، kay جمع یا عام کے لیے۔ سب کوڈ میں ایک ہی کام کرتے ہیں، جو جملے میں سب سے قدرتی لگے وہ چنیں۔"
        ),
      },
      {
        t: "h",
        text: L("Lists of objects", "Objects ki list", "آبجیکٹس کی list"),
      },
      {
        t: "p",
        text: L(
          "One of the most useful patterns in programming is a list of objects, for example, a class roll with each student's name and score.",
          "Programming mein sab se mufeed pattern object ki list hai, maslan, class roll jisme har student ka naam aur score ho.",
          "پروگرامنگ میں سب سے مفید pattern آبجیکٹ کی list ہے، مثلاً، کلاس رول جس میں ہر اسٹوڈنٹ کا نام اور اسکور ہو۔"
        ),
      },
      {
        t: "code",
        code: `log = [
    { naam: "Ahmad", score: 88 },
    { naam: "Sara",  score: 95 },
    { naam: "Bilal", score: 72 },
]

har log mein taliba {
    likho "{taliba.naam}: {taliba.score}"
}`,
      },
      {
        t: "h",
        text: L("Object toolbox", "Object ka toolbox", "آبجیکٹ کا toolbox"),
      },
      {
        t: "code",
        code: `shaks = { naam: "Ahmad", umar: 14, shahar: "Karachi" }

likho mafta(shaks)            # keys
likho qeemtain(shaks)         # values
likho key_hai(shaks, "naam")  # sahi
likho key_hai(shaks, "email") # ghalat

naya = hata(shaks, "umar")
likho mafta(naya)             # naam aur shahar, umar hata diya`,
      },
      {
        t: "history",
        title: L(
          "Modelling the real world",
          "Asli duniya ka naqsha",
          "اصلی دنیا کا نقشہ"
        ),
        text: L(
          "The idea of grouping data into objects that mirror real things — a person, a car, a bank account — grew up in Norway in the 1960s, in a language called Simula built by Ole-Johan Dahl and Kristen Nygaard to simulate the real world. It was such a powerful way of thinking that it spread into almost every modern language and became known as object-oriented programming. The heart of it is simple and human: instead of loose scattered facts, you describe whole things, with all their parts kept together — just like shaks.",
          "Maloomat ko objects mein jama karne ka khayaal — jo asli cheezon ki tarah hon: insaan, car, bank account — 1960 ki dahai mein Norway mein paida hua, ek zaban Simula mein jise Ole-Johan Dahl aur Kristen Nygaard ne asli duniya ki naqal banane ke liye banaya. Yeh sochne ka itna taqatwar tareeqa tha ke yeh taqreeban har jadeed zaban mein phail gaya aur object-oriented programming kehlaya. Iska dil saada aur insaani hai: bikhri hui haqaiq ke bajaye, aap poori cheezein bayan karte hain, un ke tamaam hisson ke saath — bilkul shaks ki tarah.",
          "معلومات کو objects میں جمع کرنے کا خیال — جو اصلی چیزوں کی طرح ہوں: انسان، car، bank account — 1960 کی دہائی میں Norway میں پیدا ہوا، ایک زبان Simula میں جسے Ole-Johan Dahl اور Kristen Nygaard نے اصلی دنیا کی نقل بنانے کے لیے بنایا۔ یہ سوچنے کا اتنا طاقتور طریقہ تھا کہ یہ تقریباً ہر جدید زبان میں پھیل گیا اور object-oriented programming کہلایا۔ اس کا دل سادہ اور انسانی ہے: بکھری ہوئی حقائق کے بجائے، آپ پوری چیزیں بیان کرتے ہیں، ان کے تمام حصوں کے ساتھ — بالکل shaks کی طرح۔"
        ),
      },
      {
        t: "try",
        text: L(
          "Make an object for your favourite book with at least three properties (title, author, year). Print a sentence like \"Title ki Author ne year mein likhi\" using those properties.",
          "Apni pasandida kitaab ka object banao jis mein kam az kam teen properties hon (title, author, year). Unhe use karte hue aisa jumla print karo: \"Title ki Author ne year mein likhi\".",
          "اپنی پسندیدہ کتاب کا آبجیکٹ بناؤ جس میں کم از کم تین properties ہوں (title، author، year)۔ انہیں استعمال کرتے ہوئے ایسا جملہ پرنٹ کرو: \"Title کی Author نے year میں لکھی\"۔"
        ),
      },
    ],
  },
];

export const chapterBySlug = (slug: string) => chapters.find((c) => c.slug === slug);

// UI strings for the Learn section + docs sidebar headers.
export const learnUi: Record<
  Lang,
  {
    overview: string;
    learn: string;
    forKids: string;
    kicker: string;
    heroTitle: string;
    heroSub: string;
    start: string;
    lesson: string;
    allLessons: string;
    previous: string;
    next: string;
    openPlayground: string;
    goodToKnow: string;
    tryIt: string;
    walkthrough: string;
    walkHint: string;
    expandAll: string;
    collapseAll: string;
    historyLabel: string;
  }
> = {
  en: {
    overview: "Overview",
    learn: "Learn",
    forKids: "for kids",
    kicker: "Learn · for kids",
    heroTitle: "Learn to code with wow",
    heroSub:
      'A gentle path from "what even is a program?" to writing your own. Each lesson explains one idea in plain words, shows a real example, and gives you something to try. No experience needed, just curiosity.',
    start: "Start lesson 1 →",
    lesson: "Lesson",
    allLessons: "← All lessons",
    previous: "Previous",
    next: "Next",
    openPlayground: "Open playground",
    goodToKnow: "Good to know",
    tryIt: "Try it",
    walkthrough: "Line by line",
    walkHint: "Tap any line to see exactly what it does.",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    historyLabel: "A bit of history",
  },
  roman: {
    overview: "Jaiza",
    learn: "Seekho",
    forKids: "bachhon ke liye",
    kicker: "Seekho · bachhon ke liye",
    heroTitle: "wow ke saath coding seekho",
    heroSub:
      '"Program aakhir hai kya?" se le kar apna program likhne tak ek aasaan raasta. Har lesson ek khayaal ko saade lafzon mein samjhaata hai, ek asli misaal dikhata hai, aur aap ko kuch karne ko deta hai. Koi tajurba nahi chahiye, bas thori si dilchaspi.',
    start: "Lesson 1 shuru karo →",
    lesson: "Lesson",
    allLessons: "← Saare lessons",
    previous: "Pichla",
    next: "Agla",
    openPlayground: "Playground kholo",
    goodToKnow: "Yaad rahe",
    tryIt: "Khud karo",
    walkthrough: "Line ba line",
    walkHint: "Kisi bhi line par tap karo aur dekho woh kya karti hai.",
    expandAll: "Sab kholo",
    collapseAll: "Sab band karo",
    historyLabel: "Thori si tareekh",
  },
  ur: {
    overview: "جائزہ",
    learn: "سیکھو",
    forKids: "بچوں کے لیے",
    kicker: "سیکھو · بچوں کے لیے",
    heroTitle: "wow کے ساتھ کوڈنگ سیکھو",
    heroSub:
      '"پروگرام آخر ہے کیا؟" سے لے کر اپنا پروگرام لکھنے تک ایک آسان راستہ۔ ہر سبق ایک خیال کو سادے لفظوں میں سمجھاتا ہے، ایک اصلی مثال دکھاتا ہے، اور آپ کو کچھ کرنے کو دیتا ہے۔ کوئی تجربہ نہیں چاہیے، بس تھوڑی سی دلچسپی۔',
    start: "سبق 1 شروع کرو →",
    lesson: "سبق",
    allLessons: "← تمام اسباق",
    previous: "پچھلا",
    next: "اگلا",
    openPlayground: "پلے گراؤنڈ کھولو",
    goodToKnow: "یاد رہے",
    tryIt: "خود کرو",
    walkthrough: "لائن بہ لائن",
    walkHint: "کسی بھی لائن پر ٹیپ کرو اور دیکھو وہ کیا کرتی ہے۔",
    expandAll: "سب کھولو",
    collapseAll: "سب بند کرو",
    historyLabel: "تھوڑی سی تاریخ",
  },
};
