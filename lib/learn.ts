/*
  The "Learn" track — a friendly, kid-first path through programming
  using wow. Each chapter teaches one programming CONCEPT (not just a
  keyword) with a plain-language explanation, a real example, and a
  small challenge to try in the playground.

  Content is authored in English, Roman Urdu, and Urdu. Code samples are
  shared across all three — only the prose changes.
*/

import type { Lang } from "./i18n";

type Loc = Record<Lang, string>;

// compact helper: L(english, romanUrdu, urdu)
const L = (en: string, roman: string, ur: string): Loc => ({ en, roman, ur });

export type Block =
  | { t: "p"; text: Loc }
  | { t: "h"; text: Loc }
  | { t: "code"; code: string }
  | { t: "tip"; text: Loc }
  | { t: "try"; text: Loc };

export type Chapter = {
  slug: string;
  emoji: string;
  title: Loc;
  concept: Loc;
  blocks: Block[];
};

export const chapters: Chapter[] = [
  {
    slug: "what-is-a-program",
    emoji: "🧠",
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
          "Imagine writing down steps for a friend to make a sandwich: get the bread, add the filling, close it. A computer program is exactly that — a list of clear steps, in order, that the computer follows one at a time, top to bottom.",
          "Socho aap apne dost ke liye sandwich banane ke steps likh rahe hain: bread lo, filling dalo, band karo. Computer program bilkul aisa hi hai — saaf steps ki ek list, tarteeb se, jise computer ek ek kar ke upar se neeche follow karta hai.",
          "تصور کرو آپ اپنے دوست کے لیے سینڈوچ بنانے کے اسٹیپ لکھ رہے ہو: بریڈ لو، فلنگ ڈالو، بند کرو۔ کمپیوٹر پروگرام بالکل ایسا ہی ہے — صاف اسٹیپس کی ایک فہرست، ترتیب سے، جسے کمپیوٹر ایک ایک کر کے اوپر سے نیچے فالو کرتا ہے۔"
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
        t: "code",
        code: `bol "Step 1: wake up"
bol "Step 2: brush teeth"
bol "Step 3: eat breakfast"`,
      },
      {
        t: "p",
        text: L(
          'When you press Run, the computer reads line 1, does it, then line 2, then line 3. That word bol means "say" — it tells the computer to show something on the screen.',
          'Jab aap Run dabate hain, computer line 1 parhta hai, use karta hai, phir line 2, phir line 3. Lafz bol ka matlab hai "kaho" — yeh computer ko kuch screen par dikhane ko kehta hai.',
          'جب آپ Run دباتے ہیں، کمپیوٹر لائن 1 پڑھتا ہے، اسے کرتا ہے، پھر لائن 2، پھر لائن 3۔ لفظ bol کا مطلب ہے "کہو" — یہ کمپیوٹر کو کچھ اسکرین پر دکھانے کو کہتا ہے۔'
        ),
      },
      {
        t: "try",
        text: L(
          "Add a fourth step of your own. What happens if you move a line to the top — does the order of the output change?",
          "Apna chautha step shamil karo. Agar aap koi line sab se upar le jayein to kya output ki tarteeb badal jati hai?",
          "اپنا چوتھا اسٹیپ شامل کرو۔ اگر آپ کوئی لائن سب سے اوپر لے جائیں تو کیا آؤٹ پٹ کی ترتیب بدل جاتی ہے؟"
        ),
      },
    ],
  },
  {
    slug: "saying-things",
    emoji: "💬",
    title: L(
      "Telling the computer to speak",
      "Computer ko bolna sikhao",
      "کمپیوٹر کو بولنا سکھاؤ"
    ),
    concept: L(
      "Use bol to print words and numbers.",
      "Lafz aur number print karne ke liye bol use karo.",
      "الفاظ اور نمبر پرنٹ کرنے کے لیے bol استعمال کرو۔"
    ),
    blocks: [
      {
        t: "p",
        text: L(
          "The most common thing a beginner does is make the computer show something. In wow that word is bol (say). Whatever you put after it shows up in the output.",
          "Shuruaat mein sab se aam kaam yeh hai ke computer kuch dikhaye. wow mein woh lafz hai bol (kaho). Iske baad jo bhi likhein woh output mein nazar aata hai.",
          "شروعات میں سب سے عام کام یہ ہے کہ کمپیوٹر کچھ دکھائے۔ wow میں وہ لفظ ہے bol (کہو)۔ اس کے بعد جو بھی لکھیں وہ آؤٹ پٹ میں نظر آتا ہے۔"
        ),
      },
      {
        t: "code",
        code: `bol "Salam Duniya!"
bol 7
bol 2 + 3`,
      },
      {
        t: "p",
        text: L(
          'Text goes inside quotes: "like this". Numbers do not need quotes. And the computer can do the math for you — the last line prints 5, not "2 + 3".',
          'Text quotes ke andar aata hai: "is tarah". Numbers ko quotes ki zaroorat nahi. Aur computer aap ke liye hisaab bhi kar sakta hai — aakhri line 5 print karti hai, "2 + 3" nahi.',
          'ٹیکسٹ کوٹس کے اندر آتا ہے: "اس طرح"۔ نمبرز کو کوٹس کی ضرورت نہیں۔ اور کمپیوٹر آپ کے لیے حساب بھی کر سکتا ہے — آخری لائن 5 پرنٹ کرتی ہے، "2 + 3" نہیں۔'
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
          'You can drop a value right into a sentence using curly braces { }. This is called string interpolation — a fancy name for "fill in the blank".',
          'Aap curly braces { } se kisi value ko seedha jumle mein daal sakte hain. Ise string interpolation kehte hain — "khaali jagah bharo" ka mushkil naam.',
          'آپ curly braces { } سے کسی ویلیو کو سیدھا جملے میں ڈال سکتے ہیں۔ اسے string interpolation کہتے ہیں — "خالی جگہ بھرو" کا مشکل نام۔'
        ),
      },
      {
        t: "code",
        code: `naam = "Ayesha"
bol "Salam {naam}, kaise ho?"`,
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
    emoji: "📦",
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
        t: "code",
        code: `umar = 12
bol "Aap ki umar {umar} hai"

umar = umar + 1
bol "Agle saal: {umar}"`,
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
          "Pick names that describe what is inside — score, naam, total. Future-you (and your friends) will thank you when reading the code.",
          "Aise naam chuno jo bataayein andar kya hai — score, naam, total. Baad mein aap (aur aap ke dost) code parhte waqt shukar guzaar honge.",
          "ایسے نام چنو جو بتائیں اندر کیا ہے — score، naam، total۔ بعد میں آپ (اور آپ کے دوست) کوڈ پڑھتے وقت شکر گزار ہوں گے۔"
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
    emoji: "🔀",
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
        t: "code",
        code: `umar = 12

agar umar > 10 {
    bol "You're a big kid!"
} warna {
    bol "You're a little one."
}`,
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
    bol "Shaandaar!"
} warna agar score > 50 {
    bol "Acha kaam!"
} warna {
    bol "Koshish jari rakho."
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
        t: "try",
        text: L(
          'Write a check that prints "Even" or "Odd" for a number. Hint: an even number has no remainder when divided by 2 — try the % operator.',
          'Aisa check likho jo kisi number ke liye "Even" ya "Odd" print kare. Ishaara: even number ko 2 se taqseem karne par baqi nahi bachta — % operator try karo.',
          'ایسا چیک لکھو جو کسی نمبر کے لیے "Even" یا "Odd" پرنٹ کرے۔ اشارہ: even نمبر کو 2 سے تقسیم کرنے پر باقی نہیں بچتا — % operator آزماؤ۔'
        ),
      },
    ],
  },
  {
    slug: "loops",
    emoji: "🔁",
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
        t: "code",
        code: `har i 1 se 5 tak {
    bol "Number {i}"
}`,
      },
      {
        t: "p",
        text: L(
          'This runs the block for i = 1, 2, 3, 4, 5. The word har means "each", and se ... tak means "from ... to". The range includes both ends.',
          'Yeh block i = 1, 2, 3, 4, 5 ke liye chalta hai. Lafz har matlab "har ek", aur se ... tak matlab "se ... tak". Range dono siron ko shamil karti hai.',
          'یہ بلاک i = 1، 2، 3، 4، 5 کے لیے چلتا ہے۔ لفظ har مطلب "ہر ایک"، اور se ... tak مطلب "سے ... تک"۔ range دونوں سروں کو شامل کرتی ہے۔'
        ),
      },
      {
        t: "h",
        text: L("Going through a list", "List mein se guzarna", "list میں سے گزرنا"),
      },
      {
        t: "code",
        code: `phal = ["aam", "kela", "seb"]

har p mein phal {
    bol "I like {p}"
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
    bol "wow!"
}`,
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
    emoji: "🛠️",
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
          'A function is a set of steps you give a name to. Once it is named, you can run all those steps again just by calling the name — like teaching a dog the trick "sit" and then saying "sit" whenever you want.',
          'Function steps ka ek set hai jise aap naam dete hain. Naam milne ke baad, sirf naam bula kar woh saare steps dobara chala sakte hain — jaise kutte ko "baith" sikhana aur phir jab chaaho "baith" kehna.',
          'function اسٹیپس کا ایک سیٹ ہے جسے آپ نام دیتے ہیں۔ نام ملنے کے بعد، صرف نام بلا کر وہ سارے اسٹیپس دوبارہ چلا سکتے ہیں — جیسے کتے کو "بیٹھ" سکھانا اور پھر جب چاہو "بیٹھ" کہنا۔'
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
        t: "code",
        code: `banao salam(naam) {
    bol "Salam {naam}! Kaise ho?"
}

salam("Ahmad")
salam("Sara")`,
      },
      {
        t: "p",
        text: L(
          'Here salam is the trick\'s name, and naam is an input — the function uses whatever name you hand it. Calling salam("Sara") runs the steps with naam set to "Sara".',
          'Yahan salam gur ka naam hai, aur naam ek input hai — function jo bhi naam aap dein wahi istemaal karta hai. salam("Sara") bulane par steps naam = "Sara" ke saath chalte hain.',
          'یہاں salam گُر کا نام ہے، اور naam ایک input ہے — function جو بھی نام آپ دیں وہی استعمال کرتا ہے۔ salam("Sara") بلانے پر اسٹیپس naam = "Sara" کے ساتھ چلتے ہیں۔'
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
bol "Total: {total}"`,
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
    slug: "lists-and-auzaar",
    emoji: "🧰",
    title: L("Lists and your toolbox", "Lists aur aap ka auzaar", "lists اور آپ کا اوزار"),
    concept: L(
      "Hold many values in a list and shape them with auzaar.",
      "Bohat si values ek list mein rakho aur auzaar se unhe sanwaaro.",
      "بہت سی ویلیوز ایک list میں رکھو اور auzaar سے انہیں سنوارو۔"
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
        t: "code",
        code: `numbers = [4, 8, 15, 16, 23, 42]
bol "There are {ginti(numbers)} numbers"
bol "Their total is {jama(numbers)}"`,
      },
      {
        t: "p",
        text: L(
          "wow comes with a built-in toolbox called auzaar (tools). It is always available — no import needed. ginti counts items, jama adds them up, tarteeb sorts them, and many more.",
          "wow ke saath ek built-in toolbox aata hai jise auzaar kehte hain. Yeh hamesha mojood hai — import ki zaroorat nahi. ginti items ginta hai, jama unhe jorta hai, tarteeb unhe tarteeb deta hai, aur bohat kuch.",
          "wow کے ساتھ ایک built-in toolbox آتا ہے جسے auzaar کہتے ہیں۔ یہ ہمیشہ موجود ہے — import کی ضرورت نہیں۔ ginti آئٹمز گنتا ہے، jama انہیں جوڑتا ہے، tarteeb انہیں ترتیب دیتا ہے، اور بہت کچھ۔"
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
bol bade`,
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
    emoji: "➡️",
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
          "Sometimes you want to do several things to a list one after another: filter it, then sort it, then take the first item. You could use a box for each step — or you can connect them with phir (then).",
          "Kabhi aap ek list ke saath kai kaam yake baad deegre karna chahte hain: filter karo, phir tarteeb do, phir pehla item lo. Har step ke liye dabba use kar sakte hain — ya unhe phir (then) se jod sakte hain.",
          "کبھی آپ ایک list کے ساتھ کئی کام یکے بعد دیگرے کرنا چاہتے ہیں: فلٹر کرو، پھر ترتیب دو، پھر پہلا آئٹم لو۔ ہر اسٹیپ کے لیے ڈبہ استعمال کر سکتے ہیں — یا انہیں phir (then) سے جوڑ سکتے ہیں۔"
        ),
      },
      {
        t: "code",
        code: `numbers = [1, 5, 3, 8, 2, 9]

nateeja = numbers
    phir chuno(x > 4)
    phir tarteeb
    phir pehla

bol nateeja`,
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
    emoji: "🛟",
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
          "Everyone makes mistakes — even computers hit situations they can't handle, like dividing a number by zero. Instead of letting the whole program stop, you can try something risky and catch the problem if it happens.",
          "Har koi ghalti karta hai — computer bhi aise mauqe se takrata hai jinhe woh handle nahi kar sakta, jaise kisi number ko sifr se taqseem karna. Poore program ko rukne dene ke bajaye, aap koi khatre wala kaam koshish kar sakte hain aur masla hone par use pakad sakte hain.",
          "ہر کوئی غلطی کرتا ہے — کمپیوٹر بھی ایسے موقع سے ٹکراتا ہے جنہیں وہ ہینڈل نہیں کر سکتا، جیسے کسی نمبر کو صفر سے تقسیم کرنا۔ پورے پروگرام کو رکنے دینے کے بجائے، آپ کوئی خطرے والا کام koshish کر سکتے ہیں اور مسئلہ ہونے پر اسے پکڑ سکتے ہیں۔"
        ),
      },
      {
        t: "code",
        code: `koshish {
    natija = 10 / 0
    bol natija
} pakro ghalti {
    bol "Oops: {ghalti}"
}`,
      },
      {
        t: "p",
        text: L(
          'koshish (try) runs the risky steps. If anything goes wrong, the pakro (catch) block runs instead, and ghalti holds a message describing what happened — here, "sifr se taqseem nahi ho sakta" (you can\'t divide by zero).',
          'koshish (try) khatre wale steps chalata hai. Agar kuch ghalat ho, to uski jagah pakro (catch) block chalta hai, aur ghalti ek paighaam rakhta hai jo bataata hai kya hua — yahan, "sifr se taqseem nahi ho sakta".',
          'koshish (try) خطرے والے اسٹیپس چلاتا ہے۔ اگر کچھ غلط ہو، تو اس کی جگہ pakro (catch) بلاک چلتا ہے، اور ghalti ایک پیغام رکھتا ہے جو بتاتا ہے کیا ہوا — یہاں، "sifr se taqseem nahi ho sakta"۔'
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
        t: "try",
        text: L(
          "Wrap some code that might fail in koshish, and print a friendly message in the pakro block.",
          "Aisa code jo fail ho sakta hai use koshish mein lapeto, aur pakro block mein ek dostana paighaam print karo.",
          "ایسا کوڈ جو فیل ہو سکتا ہے اسے koshish میں لپیٹو، اور pakro بلاک میں ایک دوستانہ پیغام پرنٹ کرو۔"
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
  }
> = {
  en: {
    overview: "Overview",
    learn: "Learn",
    forKids: "for kids",
    kicker: "Learn · for kids",
    heroTitle: "Learn to code with wow",
    heroSub:
      'A gentle path from "what even is a program?" to writing your own. Each lesson explains one idea in plain words, shows a real example, and gives you something to try. No experience needed — just curiosity.',
    start: "Start lesson 1 →",
    lesson: "Lesson",
    allLessons: "← All lessons",
    previous: "Previous",
    next: "Next",
    openPlayground: "Open playground",
    goodToKnow: "Good to know",
    tryIt: "Try it",
  },
  roman: {
    overview: "Jaiza",
    learn: "Seekho",
    forKids: "bachhon ke liye",
    kicker: "Seekho · bachhon ke liye",
    heroTitle: "wow ke saath coding seekho",
    heroSub:
      '"Program aakhir hai kya?" se le kar apna program likhne tak ek aasaan raasta. Har lesson ek khayaal ko saade lafzon mein samjhaata hai, ek asli misaal dikhata hai, aur aap ko kuch karne ko deta hai. Koi tajurba nahi chahiye — bas thori si dilchaspi.',
    start: "Lesson 1 shuru karo →",
    lesson: "Lesson",
    allLessons: "← Saare lessons",
    previous: "Pichla",
    next: "Agla",
    openPlayground: "Playground kholo",
    goodToKnow: "Yaad rahe",
    tryIt: "Khud karo",
  },
  ur: {
    overview: "جائزہ",
    learn: "سیکھو",
    forKids: "بچوں کے لیے",
    kicker: "سیکھو · بچوں کے لیے",
    heroTitle: "wow کے ساتھ کوڈنگ سیکھو",
    heroSub:
      '"پروگرام آخر ہے کیا؟" سے لے کر اپنا پروگرام لکھنے تک ایک آسان راستہ۔ ہر سبق ایک خیال کو سادے لفظوں میں سمجھاتا ہے، ایک اصلی مثال دکھاتا ہے، اور آپ کو کچھ کرنے کو دیتا ہے۔ کوئی تجربہ نہیں چاہیے — بس تھوڑی سی دلچسپی۔',
    start: "سبق 1 شروع کرو →",
    lesson: "سبق",
    allLessons: "← تمام اسباق",
    previous: "پچھلا",
    next: "اگلا",
    openPlayground: "پلے گراؤنڈ کھولو",
    goodToKnow: "یاد رہے",
    tryIt: "خود کرو",
  },
};
