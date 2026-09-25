export interface EducationalTopicResponse {
  keywords: string[];
  title: string;
  subjectCategory: string;
  response: string;
  followUps: string[];
}

export const KNOWLEDGE_BASE: EducationalTopicResponse[] = [
  {
    keywords: ['recursion', 'recursive'],
    title: 'Recursion Simply Explained',
    subjectCategory: 'Data Structures & Algorithms',
    response: `Recursion occurs when a function calls itself to solve a smaller instance of the same problem.

Think of it like nested Russian Matryoshka dolls: to open the entire set, you open one doll, which reveals a slightly smaller doll, until you reach the solid inner doll that cannot be opened.

**Every recursive function requires two parts:**
1. **Base Case:** The condition where the function stops calling itself (preventing infinite loops / stack overflow).
2. **Recursive Step:** The logic that breaks the problem down and calls the function with a modified parameter.

**Python Example:**
\`\`\`python
def factorial(n):
    if n <= 1:           # Base Case
        return 1
    return n * factorial(n - 1)  # Recursive Step
\`\`\`

**Tip:** Always verify that your recursive call is moving closer to the base case!`,
    followUps: ['What is the call stack in recursion?', 'Compare recursion with iterative loops', 'What is Big O of recursive Fibonacci?']
  },
  {
    keywords: ['oop', 'object oriented', 'object-oriented', 'encapsulation', 'polymorphism', 'inheritance', 'abstraction'],
    title: 'Object-Oriented Programming (OOP) Pillars',
    subjectCategory: 'Programming & Web',
    response: `Object-Oriented Programming organizes software design around data, or objects, rather than functions and logic.

**The 4 Core Pillars of OOP:**
1. **Encapsulation:** Packaging data and the methods that operate on it inside a class, keeping internal variables private to protect them from unintended outside modification.
2. **Abstraction:** Hiding complex internal implementation details and exposing only what the user needs to know (e.g. driving a car by using pedals without needing to know engine physics).
3. **Inheritance:** Creating new classes based on existing ones to reuse code and establish hierarchical relationships (e.g. a \`Student\` class inheriting from a \`Person\` class).
4. **Polymorphism:** Allowing different classes to provide different implementations for the same interface or method call (e.g. \`draw()\` executing differently on a \`Circle\` vs a \`Square\`).`,
    followUps: ['Explain method overriding vs overloading', 'Show an OOP example in Python or C++', 'What is the difference between composition and inheritance?']
  },
  {
    keywords: ['python function', 'functions in python', 'def keyword', 'python def'],
    title: 'Python Functions',
    subjectCategory: 'Python Programming',
    response: `In Python, functions are defined using the \`def\` keyword. Functions organize code into modular, reusable blocks.

**Basic Syntax:**
\`\`\`python
def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    return "C"

# Calling the function
result = calculate_grade(88)
print(result) # Output: B
\`\`\`

**Key Features to Remember:**
- **Default Arguments:** \`def greet(name, title="Student"):\`
- **Keyword Arguments:** You can pass arguments by parameter name (\`greet(title="Dr", name="Ali")\`).
- **Return Statement:** Functions return \`None\` by default if no explicit return is provided.
- **Docstrings:** Use triple quotes \`"""Documentation here"""\` right after the definition to document your function.`,
    followUps: ['What are *args and **kwargs in Python?', 'Explain Python lambda functions', 'How does variable scope work inside functions?']
  },
  {
    keywords: ['pointer', 'c++ pointer', 'memory address', 'pointers'],
    title: 'Pointers in C++',
    subjectCategory: 'C++',
    response: `A pointer in C++ is a variable that holds the memory address of another variable, rather than holding a direct value.

**Why Use Pointers?**
- Pass large structures and objects efficiently without copying overhead.
- Dynamically allocate memory on the heap at runtime.
- Build flexible data structures like linked lists, trees, and graphs.

**Syntax and Operators:**
\`\`\`cpp
int number = 42;
int* ptr = &number; // '&' is the address-of operator

std::cout << ptr;   // Prints the memory address (e.g., 0x7ffee4)
std::cout << *ptr;  // '*' is dereference: prints the value 42
\`\`\`

**Safe Practice Tip:** Always initialize pointers to \`nullptr\` if they don't yet point to a valid memory location to avoid undefined segmentation faults.`,
    followUps: ['What is the difference between a pointer and a reference in C++?', 'Explain dynamic allocation with new and delete', 'What are smart pointers in modern C++ (unique_ptr, shared_ptr)?']
  },
  {
    keywords: ['html tag', 'html tags', 'semantic html', 'html elements'],
    title: 'HTML Tags & Semantic Web Structure',
    subjectCategory: 'HTML & CSS',
    response: `HTML tags are code elements that tell the web browser how to format, structure, and display content.

**1. Document Foundation:**
- \`<!DOCTYPE html>\`: Declares modern HTML5.
- \`<html>\`: Root element.
- \`<head>\`: Contains metadata, page title, styles, and viewport settings.
- \`<body>\`: Contains all visible webpage content.

**2. Semantic Tags (Best Practice):**
Instead of using generic \`<div>\` tags everywhere, use semantic tags:
- \`<header>\`: Introductory banners and navigation bars.
- \`<nav>\`: Navigation link containers.
- \`<main>\`: The primary, non-repeating content of the page.
- \`<article>\`: Independent, self-contained widgets or blog posts.
- \`<section>\`: Thematic groupings of content.
- \`<footer>\`: Bottom metadata, copyright, and student credentials.

**Why Semantics Matter:** Semantic HTML ensures assistive screen readers can interpret your page correctly and boosts search engine indexing.`,
    followUps: ['What is the CSS Box Model?', 'How do Flexbox and CSS Grid differ?', 'How do I make a website responsive on mobile?']
  },
  {
    keywords: ['database', 'databases', 'relational database', 'sql basics'],
    title: 'Databases & Relational Systems',
    subjectCategory: 'Data & Analytics',
    response: `A database is an organized, structured collection of digital information designed for rapid storage, retrieval, and modification.

**Relational Databases (RDBMS):**
- Data is organized into structured **Tables** containing **Rows** (records) and **Columns** (fields).
- Relationships between tables are formed using **Primary Keys** (unique identifiers) and **Foreign Keys** (references to primary keys in other tables).
- Examples: PostgreSQL, MySQL, SQLite, Oracle, Microsoft SQL Server.

**The Core SQL Operations (CRUD):**
- **Create:** \`INSERT INTO students (name, gpa) VALUES ('Sarah', 3.8);\`
- **Read:** \`SELECT name, gpa FROM students WHERE gpa >= 3.5;\`
- **Update:** \`UPDATE students SET gpa = 3.9 WHERE name = 'Sarah';\`
- **Delete:** \`DELETE FROM students WHERE name = 'Sarah';\`

Relational databases guarantee ACID properties (Atomicity, Consistency, Isolation, Durability) to ensure reliable transactional data integrity.`,
    followUps: ['Explain INNER JOIN vs LEFT JOIN', 'What is database normalization (1NF, 2NF, 3NF)?', 'What is the difference between SQL and NoSQL?']
  },
  {
    keywords: ['data analytics', 'data analysis', 'analytics work'],
    title: 'How Data Analytics Works',
    subjectCategory: 'Data & Analytics',
    response: `Data analytics is the science of analyzing raw datasets to uncover patterns, identify correlations, answer business questions, and guide strategic decisions.

**The 5-Step Analytics Workflow:**
1. **Identify the Business Problem:** Clearly define what question needs answering (e.g. "Why are student completion rates declining in week 4?").
2. **Data Collection:** Gather data from databases, web logs, surveys, or sensors.
3. **Data Cleaning & Wrangling:** Fix missing values, eliminate duplicate rows, and convert data types (typically 60-70% of an analyst's effort).
4. **Analysis & Modeling:** Compute statistics, correlations, trends, and build models using tools like Excel, SQL, Python, or Power BI.
5. **Visualization & Storytelling:** Present actionable charts and dashboards to stakeholders with clean recommendations.

**The 4 Types of Analytics:**
- **Descriptive:** What happened in the past?
- **Diagnostic:** Why did it happen?
- **Predictive:** What is likely to happen next?
- **Prescriptive:** What specific steps should we take?`,
    followUps: ['How do PivotTables work in Excel?', 'What is the difference between data analytics and data science?', 'How do analysts handle outliers in data?']
  },
  {
    keywords: ['pivottable', 'pivottables', 'excel pivot', 'excel'],
    title: 'PivotTables in Advanced Excel',
    subjectCategory: 'Advanced Excel',
    response: `A PivotTable is one of Excel\'s most powerful analytical features. It lets you take thousands of rows of raw tabular data and instantly calculate, summarize, filter, and reorganize it without writing complex formulas.

**The 4 Fields of a PivotTable:**
1. **Rows:** Defines the categories that stack vertically (e.g., Department, Student Name, Subject).
2. **Columns:** Defines categories that extend horizontally (e.g., Months, Quarters).
3. **Values:** The numerical data to calculate (e.g., Sum of Sales, Average Score, Count of Submissions).
4. **Filters:** Global page-level filters to narrow down the dataset (e.g., Filter by Academic Year).

**Pro Tips:**
- Always ensure your raw data has unique column headers and no merged cells before inserting a PivotTable.
- Right-click any value to change summary calculation from \`SUM\` to \`AVERAGE\`, \`COUNT\`, or \`% of Total\`.`,
    followUps: ['What is XLOOKUP and how does it compare to VLOOKUP?', 'How do IF and IFS formulas work in Excel?', 'How do I create automated charts from a PivotTable?']
  },
  {
    keywords: ['machine learning', 'ml simply', 'supervised learning'],
    title: 'Machine Learning Simply Explained',
    subjectCategory: 'Artificial Intelligence',
    response: `Traditional computer programming works like a recipe: a human writes explicit rules (code), inputs data, and gets an output.

**Machine Learning (ML)** flips this around: you feed the computer data and observed outputs, and the computer algorithm figures out the statistical mathematical rules itself!

**The 3 Main Types of Machine Learning:**
1. **Supervised Learning (Learning with a Teacher):**
   - The model learns from labeled examples (Inputs + Correct Labels).
   - *Example:* Predicting house prices from square footage (Regression) or detecting email spam (Classification).
2. **Unsupervised Learning (Finding Hidden Patterns):**
   - The model is given unlabeled data and must discover natural groupings or clusters on its own.
   - *Example:* Grouping customers by purchasing habits (Clustering with K-Means).
3. **Reinforcement Learning (Learning by Trial and Error):**
   - An agent interacts with an environment, receiving rewards for good actions and penalties for mistakes.
   - *Example:* Training autonomous robots or game-playing algorithms (AlphaGo).`,
    followUps: ['What is overfitting and how do we prevent it?', 'Explain the difference between classification and regression', 'How do artificial neural networks work?']
  },
  {
    keywords: ['generative ai', 'genai', 'gen ai', 'llm', 'large language model'],
    title: 'Generative AI & How It Works',
    subjectCategory: 'Artificial Intelligence',
    response: `Generative AI refers to algorithms capable of producing brand new, synthetic content—including natural language text, realistic images, synthetic audio, and programming code—that resembles human creation.

**How Does It Work?**
- **Deep Neural Networks:** Models (such as transformer-based Large Language Models) are trained on massive textual corpora spanning books, code, articles, and websites.
- **Transformers & Self-Attention:** The revolutionary Transformer architecture allows the model to process words in parallel and assign "attention" weights to understand which words relate to one another, even across long paragraphs.
- **Next-Token Prediction:** At its foundational core, a language model predicts what word (or sub-word "token") is statistically most likely to come next given the entire preceding prompt.
- **RLHF & Instruction Tuning:** Human feedback and alignment tuning teach the raw model to follow instructions safely and converse helpfully rather than just completing random sentences.`,
    followUps: ['What is Agentic AI and how does it differ from Generative AI?', 'What is a token in LLMs?', 'How does Prompt Engineering improve results?']
  },
  {
    keywords: ['agentic ai', 'agentic', 'ai agent', 'autonomous agent'],
    title: 'Agentic AI & Autonomous Decision-Making',
    subjectCategory: 'Artificial Intelligence',
    response: `While standard Generative AI responds to single prompts with text, **Agentic AI** systems are autonomous entities that can pursue complex, multi-step goals over time.

**Key Characteristics of Agentic AI:**
1. **Goal Decomposition:** Breaking a high-level goal ("Plan a study schedule and verify homework") into concrete intermediate sub-tasks.
2. **Tool Use & Function Calling:** Calling external APIs, running code interpreters, querying databases, or browsing documentation to gather facts.
3. **Memory:** Maintaining short-term working memory (context) and long-term memory (vector databases) across reasoning steps.
4. **Self-Reflection:** Inspecting the outcome of an action, identifying mistakes or syntax errors, and revising its strategy iteratively.

**The ReAct Framework:**
Most modern agents follow the **Reason + Act** loop:
\`[Thought -> Action -> Observation -> Next Thought -> Final Answer]\``,
    followUps: ['How do AI agents handle unexpected errors?', 'What is the role of memory in AI agents?', 'What safety guardrails are needed for agentic systems?']
  },
  {
    keywords: ['robotics', 'robot', 'robots', 'actuator', 'actuators', 'sensors in robotics', 'artificial intelligence and robotics', 'intelligent machines', 'kinematics'],
    title: 'Artificial Intelligence & Robotics Fundamentals',
    subjectCategory: 'Artificial Intelligence & Robotics',
    response: `Artificial Intelligence & Robotics combines computer science, cognitive algorithms, mechanical design, and electrical control to build autonomous physical systems that can sense, reason, and act in the physical world.

**The 4 Core Subsystems of Every Robot:**
1. **Sensors (The Senses):**
   - Gather data about the environment and internal status.
   - Examples: Ultrasonic distance sensors, infrared sensors, LiDAR, gyroscopes, encoders, and cameras.
2. **Controllers (The Brain):**
   - Microcontrollers (e.g. Arduino, ESP32) or single-board computers (Raspberry Pi, NVIDIA Jetson) running AI perception and motion control software.
3. **Actuators (The Muscles):**
   - Convert stored energy (electrical, pneumatic, or hydraulic) into physical mechanical motion.
   - Examples: DC motors, servo motors, stepper motors, and linear actuators.
4. **Power & End Effectors (The Body & Tools):**
   - Structural chassis and batteries, alongside grippers, robotic arms, or tools tailored for specific automation tasks.

**Perception, Computer Vision & Autonomous Decision-Making:**
Modern robotics uses computer vision and neural networks to perceive surroundings, generate SLAM maps, avoid obstacles, and navigate autonomously.`,
    followUps: ['What is the difference between a sensor and an actuator?', 'Explain Kinematics in robotic arms', 'How does LiDAR work in autonomous robots?', 'How does AI enable robot perception?']
  },
  {
    keywords: ['cloud', 'cloud computing', 'iaas', 'paas', 'saas', 'serverless', 'aws', 'azure', 'gcp', 'cloud architecture', 'virtual machine', 'vpc'],
    title: 'Cloud Computing Fundamentals',
    subjectCategory: 'Cloud Computing',
    response: `Cloud computing delivers computing resources—such as servers, high-speed storage, databases, networking, and software—on demand over the internet with flexible pay-as-you-go pricing.

**The 3 Foundational Cloud Service Models:**
1. **IaaS (Infrastructure as a Service):** Offers raw compute power, storage, and networking. You choose the OS and software stack while the provider handles physical hardware and data centers (e.g. AWS EC2, Google Compute Engine, Azure VMs).
2. **PaaS (Platform as a Service):** Provides a ready-to-code runtime and environment. The cloud vendor manages the operating system, web server, and patching; you only write and deploy application code (e.g. AWS Elastic Beanstalk, Google App Engine).
3. **SaaS (Software as a Service):** Complete, fully managed software accessible via browser or API (e.g. Google Drive, Microsoft 365).

**Cloud Deployment Models:**
- **Public Cloud:** Multi-tenant infrastructure managed by providers like AWS, Google Cloud, or Microsoft Azure.
- **Private Cloud:** Cloud infrastructure operated strictly for a single enterprise or organization.
- **Hybrid Cloud:** Unifies private on-premise infrastructure with public clouds to share data and workloads dynamically.

**Key Cloud Advantages:**
- **Elasticity & Auto-scaling:** Resources expand during high traffic and shrink during off-peak times.
- **High Availability & Fault Tolerance:** Multi-zone redundancy ensures uninterrupted service uptime.`,
    followUps: ['What is the difference between horizontal and vertical scaling?', 'Explain Serverless and Function-as-a-Service (FaaS)', 'What is a Virtual Private Cloud (VPC)?']
  },
  {
    keywords: ['networking', 'computer network', 'ip address', 'router', 'switch', 'tcp', 'udp', 'dns'],
    title: 'Computer Networking Basics',
    subjectCategory: 'Computer Networking',
    response: `A computer network is a system of interconnected digital devices that share data and communication resources.

**Key Networking Building Blocks:**
- **IP Address:** A unique numerical address (e.g., IPv4 \`192.168.1.1\` or IPv6) that identifies each host on a network.
- **MAC Address:** The permanent physical hardware identifier burned into a device\'s network interface card (NIC).
- **Switch (Layer 2):** Connects devices within the same Local Area Network (LAN) using MAC addresses to forward data frames efficiently.
- **Router (Layer 3):** Connects disparate networks together (e.g. connecting your home LAN to the global Internet WAN) using IP addresses to route packets.
- **DNS (Domain Name System):** The internet\'s phonebook that translates human names like \`studybuddy.edu\` into numeric IP addresses.
- **TCP vs. UDP:**
  - **TCP (Transmission Control Protocol):** Connection-oriented, performs a 3-way handshake (SYN, SYN-ACK, ACK), guarantees reliable, ordered packet delivery.
  - **UDP (User Datagram Protocol):** Connectionless, sends packets without delivery guarantees; ideal for live video streaming and gaming where low latency matters most.`,
    followUps: ['Explain the 7 layers of the OSI Model', 'What is the difference between HTTP and HTTPS?', 'What is a subnet mask and how does CIDR work?']
  },
  {
    keywords: ['cybersecurity', 'cyber security', 'cia triad', 'firewall', 'phishing'],
    title: 'Cybersecurity Principles & Threat Defense',
    subjectCategory: 'Cyber Security',
    response: `Cybersecurity is the practice of protecting computer networks, systems, hardware, and digital data from digital attacks, unauthorized access, and disruption.

**The Foundational CIA Triad:**
1. **Confidentiality:** Ensuring sensitive data is only accessible to authorized individuals (implemented via encryption, access controls, and passwords).
2. **Integrity:** Ensuring information is accurate, trustworthy, and has not been maliciously modified or tampered with (enforced via cryptographic checksums and digital signatures).
3. **Availability:** Ensuring critical systems, databases, and networks remain reliably accessible when authorized users need them (safeguarded via redundancy, backups, and DDoS mitigation).

**Common Security Threats & Defenses:**
- **Phishing:** Deceptive emails mimicking trusted brands to steal credentials. Always inspect sender domains and never click urgent links!
- **Firewalls:** Software or hardware barriers that inspect incoming/outgoing traffic against security rules.
- **Multi-Factor Authentication (MFA):** Demands two or more authentication factors (password + smartphone authenticator prompt) before granting access.`,
    followUps: ['How does asymmetric encryption (public/private keys) work?', 'What is social engineering and how can we prevent it?', 'What are the top web vulnerabilities (OWASP Top 10)?']
  },
  {
    keywords: ['study plan', 'study planning', 'plan my study', 'schedule', 'consistent'],
    title: 'Effective Student Study Planning',
    subjectCategory: 'Study Support',
    response: `Building a structured study plan is the single most effective way to eliminate cramming stress, improve retention, and succeed in your Aptech coursework!

**The 4 Pillars of a High-Impact Study Schedule:**
1. **The Pomodoro Technique:**
   - 25 minutes of deep, undivided focus.
   - 5 minutes of restorative break.
   - After 4 rounds, take a longer 15-30 minute break.
   *(You can use the built-in Study Buddy Focus Timer right now!)*
2. **Active Recall over Passive Rereading:**
   - Don't just re-read textbook chapters or highlight lines.
   - Test yourself using subject flashcards and quizzes before looking at the answers.
3. **Spaced Repetition:**
   - Review difficult concepts 1 day after learning, then 3 days, then 7 days, then 14 days. This shifts facts from short-term memory into permanent long-term recall.
4. **Daily Micro-Goals:**
   - Set 3 to 4 specific, actionable daily goals (e.g. "Complete Python lesson 3", "Review 15 networking flashcards") and check them off in your Study Buddy dashboard!`,
    followUps: ['How should I prepare for a technical coding exam?', 'How can I avoid burnout during study marathons?', 'Show me flashcards for my selected subject']
  },
  {
    keywords: ['quiz me on python', 'python quiz', 'quiz python'],
    title: 'Quick Python Knowledge Check',
    subjectCategory: 'Python Programming',
    response: `Here is a quick practice question to test your Python knowledge:

**Question:** What is the output of the following snippet?
\`\`\`python
numbers = [10, 20, 30]
numbers.append([40, 50])
print(len(numbers))
\`\`\`

**Options:**
- A) \`5\`
- B) \`4\`
- C) \`3\`
- D) \`TypeError\`

*(Think about it for a second...)*

**Answer:** **B) 4**!
**Explanation:** The \`append()\` method adds the entire list \`[40, 50]\` as a single nested element at index 3. The list becomes \`[10, 20, 30, [40, 50]]\`. If you wanted 5 elements, you would use \`numbers.extend([40, 50])\`.

Head over to the **Quiz** section in the navigation bar to take full subject quizzes!`,
    followUps: ['Explain list slicing in Python', 'What is the difference between append() and extend()?', 'Take me to the Quiz section']
  }
];

export function findEducationalResponse(input: string, currentSubjectName?: string): EducationalTopicResponse {
  const query = input.toLowerCase().trim();

  // If query specifically mentions or current subject matches and prompt is generic
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(keyword => query.includes(keyword.toLowerCase()))) {
      return item;
    }
  }

  // Check current subject context if query is short or generic
  if (currentSubjectName) {
    const subName = currentSubjectName.toLowerCase();
    if (subName.includes('robot') || subName.includes('intelligence')) {
      const rob = KNOWLEDGE_BASE.find(k => k.keywords.includes('robotics'));
      if (rob) return rob;
    }
    if (subName.includes('network')) {
      const net = KNOWLEDGE_BASE.find(k => k.keywords.includes('networking'));
      if (net) return net;
    }
    if (subName.includes('python')) {
      const py = KNOWLEDGE_BASE.find(k => k.keywords.includes('python function'));
      if (py) return py;
    }
    if (subName.includes('c++')) {
      const cpp = KNOWLEDGE_BASE.find(k => k.keywords.includes('c++ pointer'));
      if (cpp) return cpp;
    }
    if (subName.includes('cyber')) {
      const cy = KNOWLEDGE_BASE.find(k => k.keywords.includes('cybersecurity'));
      if (cy) return cy;
    }
  }

  // Default fallback response
  return {
    keywords: [],
    title: 'Study Buddy Academy Assistant',
    subjectCategory: 'General Educational Guidance',
    response: `Welcome! As your local Study Buddy Academy educational assistant, I am prepared to help you understand computer science, programming, data analytics, artificial intelligence & robotics, cybersecurity, and study habits.

**Here are some topics you can ask me to explain:**
- *"Explain recursion simply"*
- *"What is a C++ pointer?"*
- *"Help me understand OOP principles"*
- *"How does data analytics work?"*
- *"What is Artificial Intelligence & Robotics and what are sensors/actuators?"*
- *"Explain basic computer networking (routers, switches, IP)"*
- *"What is the CIA triad in cybersecurity?"*
- *"Help me create a study plan"*

Click any suggested prompt chip below or type a concept from your courses to get started!`,
    followUps: [
      'Explain recursion simply',
      'What is a C++ pointer?',
      'Explain basic computer networking',
      'What is Artificial Intelligence & Robotics?'
    ]
  };
}
