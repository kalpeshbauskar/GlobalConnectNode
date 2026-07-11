import { withBase } from '../assetPath'

export const sessions = [
  {
    title: 'Introduction to AI and Computer Basics',
    icon: '🤖',
    img: withBase('/images/ai-basics.png'),
    project: 'AI timeline + robot drawing',
    data: 'AI means computers learn patterns from examples. Computers use input, process, output, memory, and software.',
    activity: 'Write 3 AI examples from home or school, then draw input-process-output.',
    videos: [
      ['Introduction To Artificial Intelligence', 'SSE4M0gcmvE'],
      ['AI Basics for Beginners', 'JMUxmLyrhSk'],
      ['What is a Computer?', 'mCq8-xTH7jA'],
    ],
  },
  {
    title: 'Types of AI, Prompting, Ethical AI',
    icon: '⚖️',
    img: withBase('/images/ai-types-prompting-ethics.png'),
    project: 'Safe AI pledge',
    data: 'Narrow AI does one task. Strong prompts include role, task, audience, format, and safety.',
    activity: 'Create one strong prompt and one safe AI rule for students.',
    videos: [
      ['Types of Artificial Intelligence Explained', '2ePf9rue1Ao'],
      ['Prompt Engineering for Beginners', 'dOxUroR57xs'],
      ['Ethics of AI Explained Simply', '7Zx9KJv4XK0'],
    ],
  },
  {
    title: 'AI for Academics & Generative AI',
    icon: '✨',
    img: withBase('/images/ai-academics.png'),
    project: 'Study helper prompt pack',
    data: 'Generative AI can create text, images, summaries, and ideas, but students must verify facts.',
    activity: 'Ask AI for a study plan, then mark which parts need teacher checking.',
    videos: [
      ['Generative AI Explained', 'G2fqAlgmoPo'],
      ['What is Generative AI?', 'hfIUstzHs9A'],
      ['AI for Students and Education', 'Y63Y6PDlvJk'],
    ],
  },
  {
    title: 'Basics of Coding Languages',
    icon: '💻',
    img: withBase('/images/coding-languages.png'),
    project: 'First code sheet',
    data: 'HTML structures pages, CSS styles them, JavaScript adds action, Python is friendly for logic.',
    activity: 'Run one hello program and explain what each line does.',
    videos: [
      ['Programming Languages Explained', 'EGQh5SZctaE'],
      ['Python for Beginners', '_uQrJ0TkZlc'],
      ['JavaScript Tutorial for Beginners', 'W6NZfCO5SIk'],
      ['C++ Tutorial for Beginners', 'vLnPwxZdW4Y'],
    ],
  },
  {
    title: 'Basics of HTML',
    icon: '🌐',
    img: withBase('/images/html-basics.png'),
    project: 'Personal profile page',
    data: 'HTML uses tags like headings, paragraphs, images, links, and buttons to create page structure.',
    activity: 'Build a mini profile page in the Code Lab with one button.',
    videos: [
      ['HTML in 100 Seconds', 'ok-plXXHlWw'],
      ['HTML Full Course for Beginners', 'pQN-pnXPaVg'],
      ['Learn HTML in 12 Minutes', 'bWPMSSsVdPk'],
    ],
  },
  {
    title: 'Basics of Website Development',
    icon: '🎨',
    img: withBase('/images/website-development.png'),
    project: 'Mini portfolio',
    data: 'Frontend is what users see. Backend stores and processes data. Static sites need no backend.',
    activity: 'Draw a website map with home, videos, games, and dashboard pages.',
    videos: [
      ['Web Development Full Course', 'Q33KBiDriJY'],
      ['Frontend vs Backend Explained', 'Ukg_U3CnJWI'],
      ['Build Your First Website', 'PlxWf493en4'],
    ],
  },
  {
    title: 'Basic Game Development',
    icon: '🎮',
    img: withBase('/images/game-development.png'),
    project: 'First learning game',
    data: 'Games use rules, input, score, feedback, levels, and clear goals.',
    activity: 'Design a 3-rule game that teaches one AI concept.',
    videos: [
      ['Game Development for Beginners', 'j48LtUkZRjU'],
      ['How Video Games Are Made', 'QYkY2jZDJ4g'],
      ['Python Game Development Tutorial', 'AY9MnQ4x3zk'],
    ],
  },
  {
    title: 'Chatbot Generation',
    icon: '💬',
    img: withBase('/images/chatbot-generation.png'),
    project: 'School chatbot plan',
    data: 'Chatbots use intents, examples, responses, and safety limits to guide conversations.',
    activity: 'Write 5 student questions and safe chatbot answers.',
    videos: [
      ['Build Your First AI Chatbot', 'Rs_rAxEsAvI'],
      ['Python Chatbot Tutorial', '8NJlUribp3c'],
      ['How ChatGPT Works', '7xTGNNLPyMI'],
    ],
  },
  {
    title: 'Basic App Development',
    icon: '📱',
    img: withBase('/images/app-development.png'),
    project: 'Helpful school app idea',
    data: 'Apps solve user problems with screens, buttons, data, and feedback.',
    activity: 'Sketch 3 screens for an app that helps your class.',
    videos: [
      ['Android App Development for Beginners', 'fis26HvvDII'],
      ['Flutter App Development Tutorial', '1ukSR1GRtMU'],
      ['Mobile App Development Explained', 'u64gyCdqawU'],
    ],
  },
  {
    title: 'IoT Introduction',
    icon: '🔌',
    img: withBase('/images/iot-introduction.png'),
    project: 'Smart classroom sensor',
    data: 'IoT connects sensors and devices. AI can use sensor data to make useful decisions.',
    activity: 'Design one sensor for classroom safety or energy saving.',
    videos: [
      ['Internet of Things Explained', 'LlhmzVL5bm8'],
      ['IoT Full Course for Beginners', 'h0gWfVCSGQQ'],
      ['What is IoT?', 'QSIPNhOiMoE'],
    ],
  },
]

export const allVideos = sessions.flatMap((s, si) =>
  s.videos.map((v, vi) => ({
    session: s.title,
    icon: s.icon,
    title: v[0],
    id: v[1],
    data: s.data,
    activity: s.activity,
    task: s.activity,
    num: `${si + 1}.${vi + 1}`,
  }))
)

export const schoolPasswords = {
  KVU: 'KVU-SH8C4',
  KSN: 'KSN-VPIOP',
  MRG: 'MRG-SM4B4',
  NHK: 'NHK-K642M',
  PPS: 'PPS-65U4E',
}

export const colleges = [
  { code: 'KVU', name: 'Kanya Vidyalay, Uchagav' },
  { code: 'KSN', name: 'Kendra Shala, Nagdevwadi' },
  { code: 'MRG', name: 'M. R. High School, Gadhinglaj' },
  { code: 'NHK', name: 'New High School, Kolhapur' },
  { code: 'PPS', name: 'Princess Padma Raje Girls High School, Kolhapur' },
]

export const simDefs = [
  ['neural', 'Neural Network Lab', 'Train a real network to tell cats from dogs.'],
  ['prompt', 'Prompt Builder', 'Build role, task, audience, format, and safety.'],
  ['vision', 'Pixel Vision', 'Draw pixels and classify a pattern.'],
  ['session1quiz', 'Session 1 Quiz', 'Test your knowledge of AI basics.'],
  ['session2quiz', 'Session 2 Quiz', 'AI concepts, prompting, and ethics challenge.'],
  ['promptsorter', 'The Prompt Sorter', 'Sort prompts: normal chat or Game Maker?'],
]

export const games = [
  ['quiz', 'Prompt Detective', 'Good or bad prompt? You decide!', withBase('/games/prompt-detective.html')],
  ['balance', 'AI Detective', 'Spot the AI hallucination before it fools you.', withBase('/games/ai-detective.html')],
  ['htmldebugger', 'HTML Debugger Pro', 'Find and fix the buggy HTML syntax.', withBase('/games/html-debugger.html')],
  ['repairshop', 'Website Repair Shop', 'Fix real bugs to satisfy each customer request.', withBase('/games/website-repair-shop.html')],
  ['robot', 'Train the Robot', 'Teach an AI, then test what it learned.', withBase('/games/train-the-robot.html')],
  ['pixel', 'Pixel Code Lab', 'Decode binary and RGB like a computer sees images.', withBase('/games/pixel-code-lab.html')],
  ['gamemaker', 'Game Maker Match-Up', 'Match tech words to their kid-friendly meaning.', withBase('/games/game-maker-matchup.html')],
]

export const compilerLinks = {
  html: 'https://codepen.io/pen/',
  css: 'https://codepen.io/pen/',
  javascript: 'https://playcode.io/javascript',
  python: 'https://www.programiz.com/python-programming/online-compiler/',
  cpp: 'https://www.programiz.com/cpp-programming/online-compiler/',
  c: 'https://www.programiz.com/c-programming/online-compiler/',
  java: 'https://www.programiz.com/java-programming/online-compiler/',
  php: 'https://www.programiz.com/php/online-compiler/',
  ruby: 'https://www.programiz.com/ruby/online-compiler/',
  go: 'https://www.programiz.com/golang/online-compiler/',
  rust: 'https://www.programiz.com/rust/online-compiler/',
  swift: 'https://www.programiz.com/swift/online-compiler/',
  kotlin: 'https://www.programiz.com/kotlin/online-compiler/',
  sql: 'https://sqliteonline.com/',
}

export const templates = {
  html: '<h1>Hello AI4All</h1>\n<p>I am learning AI and coding.</p>\n<button onclick="alert(\'Great job!\')">Click me</button>',
  css: 'body { font-family: sans-serif; background: #eef2ff; }\nh1 { color: #5b4bff; }\n.card { padding: 20px; border-radius: 20px; background: white; }',
  javascript: 'let name = "Student";\nconsole.log("Hello " + name);\nfor (let i = 1; i <= 3; i++) {\n  console.log("AI idea " + i);\n}',
  python: 'name = "Student"\nprint("Hello", name)\nprint("AI helps us learn patterns")',
  cpp: '#include <iostream>\nusing namespace std;\nint main(){ cout << "Hello AI4All"; return 0; }',
  c: '#include <stdio.h>\nint main(){ printf("Hello AI4All"); return 0; }',
  java: 'class Main { public static void main(String[] args) { System.out.println("Hello AI4All"); } }',
  php: '<?php echo "Hello AI4All"; ?>',
  ruby: 'puts "Hello AI4All"',
  go: 'package main\nimport "fmt"\nfunc main(){ fmt.Println("Hello AI4All") }',
  rust: 'fn main(){ println!("Hello AI4All"); }',
  swift: 'print("Hello AI4All")',
  kotlin: 'fun main(){ println("Hello AI4All") }',
  sql: 'CREATE TABLE students(name TEXT);\nINSERT INTO students VALUES ("AI learner");\nSELECT * FROM students;',
}
