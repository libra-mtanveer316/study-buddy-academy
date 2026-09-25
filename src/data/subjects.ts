import { Subject } from '../types';

export const SUBJECTS: Subject[] = [
  // 1. Programming & Web
  {
    id: 'python-programming',
    name: 'Python Programming',
    category: 'Programming & Web',
    description: 'Master high-level syntax, control flow, functions, OOP, and data structures in Python.',
    icon: 'Code2',
    progress: 80,
    lessonsCount: 24,
    suggestedPrompts: [
      'Explain Python functions with an example',
      'What is a Python list and how does it differ from a tuple?',
      'Quiz me on Python syntax and concepts',
      'How does list comprehension work in Python?'
    ],
    flashcards: [
      {
        id: 'py-1',
        question: 'What is a Python list?',
        answer: 'A mutable, ordered collection of items that allows duplicates and can store mixed data types.'
      },
      {
        id: 'py-2',
        question: 'Which keyword is used to define a function in Python?',
        answer: 'The "def" keyword is used to define a function, followed by the function name and parentheses.'
      },
      {
        id: 'py-3',
        question: 'What is the difference between a list and a tuple?',
        answer: 'Lists are mutable (can be changed using append/pop), while tuples are immutable and defined with parentheses ().'
      },
      {
        id: 'py-4',
        question: 'What does the __init__ method do in a Python class?',
        answer: 'It is the constructor method automatically called when a new instance of a class is created to initialize attributes.'
      },
      {
        id: 'py-5',
        question: 'What is a lambda function in Python?',
        answer: 'A small, anonymous single-line function defined with the "lambda" keyword, typically used for short throwaway operations.'
      }
    ],
    quiz: [
      {
        id: 'py-q1',
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'define', 'def', 'fun'],
        correctIndex: 2,
        explanation: 'In Python, the "def" keyword is used to declare and define user functions.'
      },
      {
        id: 'py-q2',
        question: 'Which data type is immutable in Python?',
        options: ['List', 'Dictionary', 'Set', 'Tuple'],
        correctIndex: 3,
        explanation: 'Tuples cannot be altered once created, making them immutable.'
      },
      {
        id: 'py-q3',
        question: 'What will "type([1, 2, 3])" return in Python?',
        options: ['<class \'array\'>', '<class \'list\'>', '<class \'tuple\'>', '<class \'sequence\'>'],
        correctIndex: 1,
        explanation: 'Square brackets define a standard Python list object.'
      },
      {
        id: 'py-q4',
        question: 'How do you insert an element at a specific index in a Python list?',
        options: ['list.add(index, item)', 'list.insert(index, item)', 'list.push(index, item)', 'list.append(index, item)'],
        correctIndex: 1,
        explanation: 'The insert(index, item) method places an element at the specified position.'
      }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming & Web',
    description: 'Learn fast, compiled programming with pointers, memory allocation, references, and classes.',
    icon: 'Cpu',
    progress: 65,
    lessonsCount: 20,
    suggestedPrompts: [
      'What is a C++ pointer?',
      'Explain the difference between pass-by-value and pass-by-reference in C++',
      'What is RAII in modern C++?',
      'How does memory management work with new and delete?'
    ],
    flashcards: [
      {
        id: 'cpp-1',
        question: 'What is a pointer in C++?',
        answer: 'A pointer is a variable that stores the memory address of another variable rather than the direct value.'
      },
      {
        id: 'cpp-2',
        question: 'What is the purpose of the virtual destructor in C++?',
        answer: 'It ensures that the derived class destructor is invoked when an object is deleted through a base class pointer.'
      },
      {
        id: 'cpp-3',
        question: 'What operator is used to access the value at an address pointed to by a pointer?',
        answer: 'The dereference operator (*), e.g., *ptr retrieves the stored value.'
      },
      {
        id: 'cpp-4',
        question: 'What header file provides standard input/output streams in C++?',
        answer: '<iostream> provides std::cin, std::cout, and std::cerr.'
      }
    ],
    quiz: [
      {
        id: 'cpp-q1',
        question: 'Which operator is used to allocate memory dynamically on the heap in C++?',
        options: ['malloc', 'alloc', 'new', 'create'],
        correctIndex: 2,
        explanation: 'C++ provides the "new" operator to dynamically allocate heap memory with type safety.'
      },
      {
        id: 'cpp-q2',
        question: 'What does the "&" operator represent when preceding a variable name in an expression?',
        options: ['Dereference', 'Address-of', 'Logical AND', 'Bitwise XOR'],
        correctIndex: 1,
        explanation: 'The address-of operator (&) returns the memory location of the operand.'
      },
      {
        id: 'cpp-q3',
        question: 'Which concept allows a class in C++ to inherit members from more than one class?',
        options: ['Multithreading', 'Multiple Inheritance', 'Polymorphism', 'Overloading'],
        correctIndex: 1,
        explanation: 'C++ explicitly supports multiple inheritance from multiple base classes.'
      }
    ]
  },
  {
    id: 'html-css',
    name: 'HTML & CSS',
    category: 'Programming & Web',
    description: 'Build semantic web documents, responsive layouts with Flexbox and Grid, and modern UI styles.',
    icon: 'Layout',
    progress: 75,
    lessonsCount: 18,
    suggestedPrompts: [
      'Explain HTML tags and semantic elements',
      'What is the difference between Flexbox and CSS Grid?',
      'How does the CSS box model work?',
      'Explain CSS specificity simply'
    ],
    flashcards: [
      {
        id: 'hc-1',
        question: 'What are the 4 layers of the CSS Box Model?',
        answer: 'Content, Padding, Border, and Margin (from inside to outside).'
      },
      {
        id: 'hc-2',
        question: 'Why should we use semantic HTML tags like <header>, <nav>, and <article>?',
        answer: 'They improve accessibility for screen readers, provide clear structure for developers, and assist search engines.'
      },
      {
        id: 'hc-3',
        question: 'What is the main difference between Flexbox and CSS Grid?',
        answer: 'Flexbox is primarily one-dimensional (row or column), while CSS Grid is two-dimensional (rows and columns simultaneously).'
      }
    ],
    quiz: [
      {
        id: 'hc-q1',
        question: 'Which CSS property defines how extra space along the main axis is distributed in Flexbox?',
        options: ['align-items', 'justify-content', 'flex-basis', 'align-content'],
        correctIndex: 1,
        explanation: 'justify-content aligns items along the primary main axis of the flex container.'
      },
      {
        id: 'hc-q2',
        question: 'Which HTML element represents self-contained, independently distributable content?',
        options: ['<section>', '<aside>', '<article>', '<div>'],
        correctIndex: 2,
        explanation: '<article> represents an independent, reusable composition like a post, card, or comment.'
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming & Web',
    description: 'Explore the language of the web: closures, event loop, asynchronous promises, and DOM manipulation.',
    icon: 'FileCode2',
    progress: 70,
    lessonsCount: 22,
    suggestedPrompts: [
      'Explain the JavaScript Event Loop simply',
      'What is the difference between let, const, and var?',
      'How do Promises and async/await work?',
      'What is a closure in JavaScript?'
    ],
    flashcards: [
      {
        id: 'js-1',
        question: 'What is a closure in JavaScript?',
        answer: 'A closure gives an inner function access to its outer lexical scope even after the outer function has finished executing.'
      },
      {
        id: 'js-2',
        question: 'What is the difference between "==" and "==="?',
        answer: '"==" performs type coercion before comparison, while "===" checks both value and strict data type.'
      },
      {
        id: 'js-3',
        question: 'What are JavaScript Promises?',
        answer: 'Objects representing the eventual completion (resolve) or failure (reject) of an asynchronous operation.'
      }
    ],
    quiz: [
      {
        id: 'js-q1',
        question: 'Which keyword creates a block-scoped variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correctIndex: 2,
        explanation: '"const" declares a block-scoped identifier whose reference cannot be reassigned.'
      },
      {
        id: 'js-q2',
        question: 'What is the output of "typeof NaN" in JavaScript?',
        options: ['"undefined"', '"null"', '"number"', '"NaN"'],
        correctIndex: 2,
        explanation: 'In JavaScript specifications, NaN (Not-a-Number) is technically of type "number".'
      }
    ]
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    category: 'Programming & Web',
    description: 'Understand core OOP pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism.',
    icon: 'Boxes',
    progress: 65,
    lessonsCount: 16,
    suggestedPrompts: [
      'Help me understand OOP principles',
      'Explain the difference between abstraction and encapsulation',
      'What is polymorphism with a real-world example?',
      'Explain method overloading vs method overriding'
    ],
    flashcards: [
      {
        id: 'oop-1',
        question: 'What are the 4 fundamental pillars of OOP?',
        answer: 'Encapsulation, Abstraction, Inheritance, and Polymorphism.'
      },
      {
        id: 'oop-2',
        question: 'What is Encapsulation?',
        answer: 'Bundling data and methods that operate on that data within a single unit, and restricting direct external access to internal state.'
      },
      {
        id: 'oop-3',
        question: 'What is Polymorphism?',
        answer: 'The ability of different classes to respond to the same interface or method call in their own specific ways.'
      }
    ],
    quiz: [
      {
        id: 'oop-q1',
        question: 'Which OOP pillar focuses on hiding internal implementation details and showing only necessary features?',
        options: ['Inheritance', 'Abstraction', 'Polymorphism', 'Composition'],
        correctIndex: 1,
        explanation: 'Abstraction displays essential features while concealing implementation intricacies.'
      },
      {
        id: 'oop-q2',
        question: 'When a subclass provides a specific implementation of a method already defined in its superclass, this is:',
        options: ['Method Overloading', 'Method Overriding', 'Encapsulation', 'Coupling'],
        correctIndex: 1,
        explanation: 'Method overriding redefines a parent class method in a child class with identical signature.'
      }
    ]
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    category: 'Cybersecurity & Networking',
    description: 'Explore cloud service models (IaaS, PaaS, SaaS), deployment architectures, virtualization, serverless, storage, and scalability.',
    icon: 'Cloud',
    progress: 55,
    lessonsCount: 18,
    suggestedPrompts: [
      'What is the difference between IaaS, PaaS, and SaaS?',
      'How does cloud auto-scaling work?',
      'What is the difference between public, private, and hybrid clouds?',
      'Explain serverless computing and functions-as-a-service'
    ],
    flashcards: [
      {
        id: 'cloud-1',
        question: 'What are the three primary cloud service models?',
        answer: 'IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service).'
      },
      {
        id: 'cloud-2',
        question: 'What is the key difference between horizontal scaling and vertical scaling?',
        answer: 'Horizontal scaling (scaling out) adds more server instances or nodes, while vertical scaling (scaling up) adds more compute power (CPU, RAM) to an existing server.'
      },
      {
        id: 'cloud-3',
        question: 'What is Serverless Computing (FaaS)?',
        answer: 'A cloud execution model where cloud providers dynamically manage server provisioning, executing functions on demand and charging only for actual compute time.'
      },
      {
        id: 'cloud-4',
        question: 'What is a Virtual Private Cloud (VPC)?',
        answer: 'An isolated, secure private virtual network dedicated to your cloud account within a public cloud infrastructure.'
      }
    ],
    quiz: [
      {
        id: 'cloud-q1',
        question: 'Which cloud service model provides managed virtual machines, raw storage, and virtual networks while leaving OS and application management to the user?',
        options: ['SaaS (Software as a Service)', 'IaaS (Infrastructure as a Service)', 'PaaS (Platform as a Service)', 'Serverless FaaS'],
        correctIndex: 1,
        explanation: 'IaaS provides fundamental compute resources like VMs and raw block storage, where users install and manage their own OS and software stack.'
      },
      {
        id: 'cloud-q2',
        question: 'What cloud deployment model combines on-premises private infrastructure with one or more public cloud providers?',
        options: ['Multi-tenant Cloud', 'Hybrid Cloud', 'Community Cloud', 'Edge-only Cloud'],
        correctIndex: 1,
        explanation: 'A Hybrid Cloud environment integrates private, on-premise data centers with public cloud platforms, sharing data and applications across them.'
      },
      {
        id: 'cloud-q3',
        question: 'Which cloud benefit refers to the ability to automatically adjust compute resources up or down in response to real-time traffic demand?',
        options: ['Elasticity', 'Portability', 'Latency', 'Single-tenancy'],
        correctIndex: 0,
        explanation: 'Elasticity allows cloud systems to dynamically provision resources during traffic spikes and de-provision them during idle periods.'
      }
    ]
  },
  {
    id: 'algorithms',
    name: 'Data Structures & Algorithms',
    category: 'Programming & Web',
    description: 'Master core data structures, Big O notation, sorting, search algorithms, recursion, and graph traversals.',
    icon: 'Binary',
    progress: 50,
    lessonsCount: 19,
    suggestedPrompts: [
      'Explain recursion simply',
      'What is Big O notation?',
      'How does Binary Search work?',
      'Compare QuickSort and MergeSort',
      'What is the difference between a Stack and a Queue?'
    ],
    flashcards: [
      {
        id: 'algo-1',
        question: 'What are the two essential requirements for a recursive function?',
        answer: 'A base case (termination condition to stop) and a recursive step (reducing problem towards base case).'
      },
      {
        id: 'algo-2',
        question: 'What is the prerequisite for running a Binary Search algorithm?',
        answer: 'The collection must already be sorted in order.'
      },
      {
        id: 'algo-3',
        question: 'What is the time complexity of Binary Search?',
        answer: 'O(log n) because the search space is halved on each step.'
      },
      {
        id: 'algo-4',
        question: 'What is the fundamental difference between a Stack and a Queue?',
        answer: 'A Stack operates on LIFO (Last-In, First-Out), whereas a Queue operates on FIFO (First-In, First-Out).'
      }
    ],
    quiz: [
      {
        id: 'algo-q1',
        question: 'What is the best average-case time complexity for comparison-based sorting like MergeSort?',
        options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n^2)'],
        correctIndex: 1,
        explanation: 'MergeSort consistently achieves O(n log n) across best, average, and worst cases.'
      },
      {
        id: 'algo-q2',
        question: 'Which data structure is ideal for tracking undo/redo history or browser back navigation?',
        options: ['Queue', 'Stack', 'Binary Heap', 'Graph'],
        correctIndex: 1,
        explanation: 'A Stack follows LIFO, making it ideal for retrieving the most recently performed operation or visited page.'
      }
    ]
  },

  // 2. Data & Analytics
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    category: 'Data & Analytics',
    description: 'Extract actionable business insights through descriptive, diagnostic, predictive, and prescriptive analysis.',
    icon: 'BarChart3',
    progress: 70,
    lessonsCount: 18,
    suggestedPrompts: [
      'How does data analytics work?',
      'What is the difference between descriptive and predictive analytics?',
      'How do analysts handle missing data values?',
      'What are key performance indicators (KPIs)?'
    ],
    flashcards: [
      {
        id: 'da-1',
        question: 'What are the four primary types of data analytics?',
        answer: 'Descriptive (what happened), Diagnostic (why it happened), Predictive (what might happen), and Prescriptive (what action to take).'
      },
      {
        id: 'da-2',
        question: 'What is data cleaning (data wrangling)?',
        answer: 'The process of fixing or removing incorrect, corrupted, incorrectly formatted, duplicate, or incomplete data in a dataset.'
      }
    ],
    quiz: [
      {
        id: 'da-q1',
        question: 'Which type of analytics answers the question: "Why did sales drop last month?"',
        options: ['Descriptive', 'Diagnostic', 'Predictive', 'Prescriptive'],
        correctIndex: 1,
        explanation: 'Diagnostic analytics digs into historical data to identify underlying causes of anomalies.'
      }
    ]
  },
  {
    id: 'data-science',
    name: 'Data Science',
    category: 'Data & Analytics',
    description: 'Combine statistics, machine learning, Python pandas/numpy, and domain knowledge to build predictive models.',
    icon: 'Sparkles',
    progress: 45,
    lessonsCount: 22,
    suggestedPrompts: [
      'What is the typical data science pipeline?',
      'Explain overfitting and how to avoid it',
      'What is feature engineering in data science?',
      'Explain confusion matrix metrics (precision vs recall)'
    ],
    flashcards: [
      {
        id: 'ds-sci-1',
        question: 'What is overfitting in machine learning models?',
        answer: 'When a model learns noise and training data peculiarities too closely, performing poorly on unseen validation data.'
      },
      {
        id: 'ds-sci-2',
        question: 'What is feature engineering?',
        answer: 'Selecting, manipulating, and transforming raw data into informative features that improve model learning performance.'
      }
    ],
    quiz: [
      {
        id: 'ds-sci-q1',
        question: 'Which metric measures the proportion of actual positives that were correctly identified?',
        options: ['Accuracy', 'Precision', 'Recall (Sensitivity)', 'F1 Score'],
        correctIndex: 2,
        explanation: 'Recall = True Positives / (True Positives + False Negatives).'
      }
    ]
  },
  {
    id: 'advanced-excel',
    name: 'Advanced Excel',
    category: 'Data & Analytics',
    description: 'Master PivotTables, XLOOKUP, nested logical formulas, data validation, and automated macros.',
    icon: 'Sheet',
    progress: 55,
    lessonsCount: 15,
    suggestedPrompts: [
      'Explain PivotTables in Excel',
      'What is XLOOKUP and how is it better than VLOOKUP?',
      'How do nested IF statements work in Excel?',
      'Explain conditional formatting best practices'
    ],
    flashcards: [
      {
        id: 'xl-1',
        question: 'What is a PivotTable in Excel?',
        answer: 'An interactive calculation tool that quickly aggregates, reorganizes, calculates, and summarizes large volumes of raw tabular data.'
      },
      {
        id: 'xl-2',
        question: 'What makes XLOOKUP superior to classic VLOOKUP?',
        answer: 'XLOOKUP can search in any direction (left or right), defaults to exact match, and doesn\'t break when columns are rearranged.'
      }
    ],
    quiz: [
      {
        id: 'xl-q1',
        question: 'Which Excel function counts cells that meet multiple specified criteria?',
        options: ['COUNT', 'COUNTA', 'COUNTIF', 'COUNTIFS'],
        correctIndex: 3,
        explanation: 'COUNTIFS allows filtering by multiple condition ranges simultaneously.'
      }
    ]
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Data & Analytics',
    description: 'Query relational databases using SELECT, JOIN, GROUP BY, subqueries, and window functions.',
    icon: 'Database',
    progress: 70,
    lessonsCount: 17,
    suggestedPrompts: [
      'Explain databases and relational tables',
      'What is the difference between INNER JOIN and LEFT JOIN?',
      'How does GROUP BY with HAVING work in SQL?',
      'What is a primary key vs a foreign key?'
    ],
    flashcards: [
      {
        id: 'sql-1',
        question: 'What is the difference between WHERE and HAVING in SQL?',
        answer: 'WHERE filters rows before aggregation occurs; HAVING filters grouped rows after aggregation functions like SUM or COUNT.'
      },
      {
        id: 'sql-2',
        question: 'What does a LEFT JOIN return?',
        answer: 'All rows from the left table, and matching rows from the right table. If no match, NULL is returned for right table columns.'
      }
    ],
    quiz: [
      {
        id: 'sql-q1',
        question: 'Which SQL clause is used to eliminate duplicate rows from a query result set?',
        options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'ISOLATE'],
        correctIndex: 1,
        explanation: 'SELECT DISTINCT returns only unique tuples in the result.'
      }
    ]
  },
  {
    id: 'power-bi',
    name: 'Power BI',
    category: 'Data & Analytics',
    description: 'Build interactive dashboards, data models, DAX measures, and automated executive reporting.',
    icon: 'LineChart',
    progress: 50,
    lessonsCount: 14,
    suggestedPrompts: [
      'What is Power BI and why is it used?',
      'What is DAX (Data Analysis Expressions)?',
      'Explain Star Schema in Power BI data modeling',
      'How do drill-through filters work in Power BI reports?'
    ],
    flashcards: [
      {
        id: 'pbi-1',
        question: 'What is DAX in Power BI?',
        answer: 'Data Analysis Expressions (DAX) is a formula expression language used to create custom calculated columns and measures.'
      },
      {
        id: 'pbi-2',
        question: 'What is a Star Schema in data modeling?',
        answer: 'A relational schema consisting of a central Fact table surrounded by associated Dimension tables.'
      }
    ],
    quiz: [
      {
        id: 'pbi-q1',
        question: 'Which Power BI tool is used for ETL (Extract, Transform, Load) data transformation before loading?',
        options: ['Power Pivot', 'Power View', 'Power Query', 'DAX Studio'],
        correctIndex: 2,
        explanation: 'Power Query handles data ingestion, cleaning, shaping, and ETL logic.'
      }
    ]
  },

  // 3. Artificial Intelligence
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence & Robotics',
    category: 'Artificial Intelligence',
    description: 'Learn the basics of Artificial Intelligence, robotics, sensors, automation, computer vision, and intelligent machines.',
    icon: 'Brain',
    progress: 65,
    lessonsCount: 24,
    suggestedPrompts: [
      'What is Artificial Intelligence and how does it power modern robotics?',
      'What is the difference between a sensor and an actuator in robotics?',
      'What is the difference between Narrow AI and General AI (AGI)?',
      'How does computer vision enable robot perception and navigation?',
      'Explain the Turing Test and intelligent behavior'
    ],
    flashcards: [
      {
        id: 'ai-1',
        question: 'What is Artificial Intelligence (AI)?',
        answer: 'The simulation of human intelligence processes by computational systems, including learning, reasoning, perception, and self-correction.'
      },
      {
        id: 'ai-2',
        question: 'What is Narrow AI (Weak AI)?',
        answer: 'AI designed and trained for a specific, defined task—such as speech recognition, chess, or autonomous path planning.'
      },
      {
        id: 'rob-1',
        question: 'What is an autonomous robot?',
        answer: 'A programmable mechanical system that senses its physical environment, processes information via intelligent controllers, and executes actions in the real world.'
      },
      {
        id: 'rob-2',
        question: 'What is the difference between a sensor and an actuator?',
        answer: 'Sensors detect physical phenomena (light, sound, distance) and convert them to electronic data; actuators (motors, pistons) convert control signals into physical mechanical motion.'
      },
      {
        id: 'rob-3',
        question: 'What is the role of a controller in a robot?',
        answer: 'The "brain" of the robot (e.g. microcontroller or onboard computer) that receives sensor inputs, executes control software, and sends commands to actuators.'
      },
      {
        id: 'rob-4',
        question: 'What is robot perception?',
        answer: 'The computational ability to interpret sensor data (cameras, LiDAR, ultrasonic) to understand 3D spatial layout, identify objects, and navigate safely.'
      },
      {
        id: 'rob-5',
        question: 'How is computer vision used in robotics?',
        answer: 'Algorithms process visual camera feeds to detect objects, recognize faces, estimate depth, and guide robotic manipulation.'
      },
      {
        id: 'rob-6',
        question: 'What is automation in robotics?',
        answer: 'The technique of making a process or system operate automatically without requiring continuous human intervention.'
      }
    ],
    quiz: [
      {
        id: 'ai-q1',
        question: 'Which test evaluates a machine\'s ability to exhibit intelligent behavior indistinguishable from a human?',
        options: ['Voight-Kampff Test', 'Turing Test', 'Benchmark Alpha', 'Lovelace Test'],
        correctIndex: 1,
        explanation: 'Alan Turing proposed the Turing Test in 1950 to evaluate human-like conversational intelligence.'
      },
      {
        id: 'rob-q1',
        question: 'Which component converts electrical control signals into physical mechanical movement in a robotic system?',
        options: ['Sensor', 'Controller', 'Actuator', 'Transceiver'],
        correctIndex: 2,
        explanation: 'Actuators (such as servo motors, stepper motors, and hydraulic pistons) convert energy into mechanical movement.'
      },
      {
        id: 'rob-q2',
        question: 'What technology uses pulsed laser light to measure distances and generate high-resolution 3D point clouds for autonomous robot navigation?',
        options: ['LiDAR', 'Sonar', 'Barometer', 'Potentiometer'],
        correctIndex: 0,
        explanation: 'LiDAR (Light Detection and Ranging) maps 3D environments accurately for self-driving and robotic navigation.'
      },
      {
        id: 'rob-q3',
        question: 'In robotic arms, the study of motion without considering the forces that cause it is called:',
        options: ['Dynamics', 'Kinematics', 'Statics', 'Thermodynamics'],
        correctIndex: 1,
        explanation: 'Kinematics calculates position, velocity, and acceleration of robot joints and end-effectors.'
      },
      {
        id: 'rob-q4',
        question: 'Which sensor measures distance by emitting ultrasonic sound pulses and timing their echo?',
        options: ['Photodiode', 'Ultrasonic Sensor', 'Thermistor', 'Gyroscope'],
        correctIndex: 1,
        explanation: 'Ultrasonic sensors bounce high-frequency sound waves off obstacles to calculate distance.'
      }
    ]
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'Artificial Intelligence',
    description: 'Supervised, unsupervised, and reinforcement learning algorithms: regression, classification, clustering, and neural nets.',
    icon: 'Atom',
    progress: 40,
    lessonsCount: 20,
    suggestedPrompts: [
      'Explain machine learning simply',
      'What is the difference between supervised and unsupervised learning?',
      'Explain gradient descent in simple terms',
      'What is reinforcement learning?'
    ],
    flashcards: [
      {
        id: 'ml-1',
        question: 'What is Supervised Learning?',
        answer: 'A learning paradigm where the algorithm is trained on labeled input-output pairs to predict outcomes for unseen data.'
      },
      {
        id: 'ml-2',
        question: 'What is Unsupervised Learning?',
        answer: 'Training models on unlabeled data to discover hidden patterns, clusters, or intrinsic groupings.'
      }
    ],
    quiz: [
      {
        id: 'ml-q1',
        question: 'Predicting house prices based on square footage and location is an example of:',
        options: ['Classification', 'Regression', 'Clustering', 'Dimensionality Reduction'],
        correctIndex: 1,
        explanation: 'Predicting continuous numerical outcomes is handled by regression algorithms.'
      }
    ]
  },
  {
    id: 'generative-ai',
    name: 'Generative AI',
    category: 'Artificial Intelligence',
    description: 'Learn transformers, attention mechanisms, diffusion models, and token-based language generation.',
    icon: 'Bot',
    progress: 55,
    lessonsCount: 16,
    suggestedPrompts: [
      'What is Generative AI?',
      'How does the Transformer architecture work?',
      'What is a token in Large Language Models?',
      'Explain temperature and top-p in text generation'
    ],
    flashcards: [
      {
        id: 'genai-1',
        question: 'What is Generative AI?',
        answer: 'AI systems capable of generating novel text, code, images, audio, or other media using learned probabilistic patterns from training data.'
      },
      {
        id: 'genai-2',
        question: 'What is the Attention mechanism in Transformers?',
        answer: 'A technique allowing models to dynamically weigh the importance of different words/tokens across a sequence when processing context.'
      }
    ],
    quiz: [
      {
        id: 'genai-q1',
        question: 'What core architecture revolutionized NLP in 2017 ("Attention Is All You Need")?',
        options: ['Convolutional Neural Network (CNN)', 'Recurrent Neural Network (RNN)', 'Transformer', 'Markov Decision Process'],
        correctIndex: 2,
        explanation: 'The Transformer architecture introduced self-attention mechanisms, superseding recurrent models.'
      }
    ]
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    category: 'Artificial Intelligence',
    description: 'Autonomous AI agents capable of goal decomposition, tool calling, reasoning loops (ReAct), and environment interaction.',
    icon: 'Workflow',
    progress: 35,
    lessonsCount: 14,
    suggestedPrompts: [
      'What is Agentic AI?',
      'How do AI agents use tools and APIs?',
      'Explain the ReAct (Reason + Act) prompting framework',
      'What is the difference between a chatbot and an autonomous agent?'
    ],
    flashcards: [
      {
        id: 'agent-1',
        question: 'What defines an Agentic AI system?',
        answer: 'An AI system that exhibits agency: pursuing open-ended goals, planning multi-step actions, invoking tools/APIs, and self-reflecting on results.'
      },
      {
        id: 'agent-2',
        question: 'What is the ReAct loop in agent architectures?',
        answer: 'A reasoning and acting framework where an agent iteratively Generates Thought -> Takes Action -> Observes Environment -> Repeats.'
      }
    ],
    quiz: [
      {
        id: 'agent-q1',
        question: 'What allows an AI agent to execute tasks beyond text generation, such as querying databases or running code?',
        options: ['Tool Calling / Function Calling', 'Tokenization', 'Quantization', 'Word Embeddings'],
        correctIndex: 0,
        explanation: 'Tool calling allows models to structure outputs as API parameters to execute actions externally.'
      }
    ]
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    category: 'Artificial Intelligence',
    description: 'Techniques for crafting effective prompts: zero-shot, few-shot, chain-of-thought, and system persona framing.',
    icon: 'MessageSquareCode',
    progress: 45,
    lessonsCount: 12,
    suggestedPrompts: [
      'What is Few-Shot prompting?',
      'Explain Chain-of-Thought (CoT) prompting with an example',
      'How do system instructions guide model behavior?',
      'What is prompt injection and how is it mitigated?'
    ],
    flashcards: [
      {
        id: 'pe-1',
        question: 'What is Few-Shot prompting?',
        answer: 'Providing the model with a few concrete demonstration examples of inputs and desired outputs inside the prompt before asking the actual query.'
      },
      {
        id: 'pe-2',
        question: 'What is Chain-of-Thought (CoT) prompting?',
        answer: 'Encouraging the model to explain step-by-step reasoning ("Think step by step") prior to delivering the final answer.'
      }
    ],
    quiz: [
      {
        id: 'pe-q1',
        question: 'Prompting a model with no prior examples, relying purely on instructions, is called:',
        options: ['Few-Shot', 'Zero-Shot', 'One-Shot', 'Fine-Tuning'],
        correctIndex: 1,
        explanation: 'Zero-shot prompting poses a task directly without providing prior input-output examples.'
      }
    ]
  },

  // 4. Cybersecurity & Networking
  {
    id: 'computer-networking',
    name: 'Computer Networking',
    category: 'Cybersecurity & Networking',
    description: 'Learn LAN, WAN, IP addresses, routers, switches, DNS, TCP/UDP, OSI layers, and HTTP/HTTPS protocol handshakes.',
    icon: 'Globe',
    progress: 50,
    lessonsCount: 18,
    suggestedPrompts: [
      'Explain basic computer networking',
      'What is an IP address and how does subnetting work?',
      'What is the difference between a router and a switch?',
      'What is DNS and why is it called the internet phonebook?',
      'Explain the difference between TCP and UDP'
    ],
    flashcards: [
      {
        id: 'net-1',
        question: 'What is a computer network?',
        answer: 'A system of interconnected computing devices that exchange data and share resources using wireless or physical media.'
      },
      {
        id: 'net-2',
        question: 'What is an IP address?',
        answer: 'A unique numerical identifier assigned to every device connected to a network that communicates via the Internet Protocol.'
      },
      {
        id: 'net-3',
        question: 'What is a router?',
        answer: 'A network device that directs data packets between different networks (Layer 3) based on their destination IP addresses.'
      },
      {
        id: 'net-4',
        question: 'What is a switch?',
        answer: 'A device that connects devices within the same Local Area Network (Layer 2) using MAC addresses to forward data frames.'
      },
      {
        id: 'net-5',
        question: 'What is DNS (Domain Name System)?',
        answer: 'The directory system that translates human-friendly domain names (e.g. google.com) into numerical IP addresses (e.g. 142.250.190.46).'
      },
      {
        id: 'net-6',
        question: 'What is HTTP/HTTPS?',
        answer: 'Hypertext Transfer Protocol; the application protocol used for transmitting web pages. HTTPS adds SSL/TLS encryption for confidentiality.'
      },
      {
        id: 'net-7',
        question: 'What is the main difference between TCP and UDP?',
        answer: 'TCP is connection-oriented and guarantees reliable packet delivery via handshakes; UDP is connectionless and prioritized for low-latency streaming.'
      },
      {
        id: 'net-8',
        question: 'What is the difference between a LAN and a WAN?',
        answer: 'A LAN (Local Area Network) covers a small area like a home or school; a WAN (Wide Area Network) connects LANs across cities or global scales.'
      }
    ],
    quiz: [
      {
        id: 'net-q1',
        question: 'Which device operates at Layer 3 (Network Layer) to forward packets between different subnets?',
        options: ['Hub', 'Switch', 'Router', 'Repeater'],
        correctIndex: 2,
        explanation: 'Routers inspect IP packet headers to route traffic between disparate networks.'
      },
      {
        id: 'net-q2',
        question: 'Which transport layer protocol performs a three-way handshake (SYN, SYN-ACK, ACK)?',
        options: ['UDP', 'ICMP', 'TCP', 'IP'],
        correctIndex: 2,
        explanation: 'TCP establishes a reliable, error-checked connection using the three-way handshake.'
      },
      {
        id: 'net-q3',
        question: 'What protocol translates human-readable domain names like "studybuddy.edu" into numeric IP addresses?',
        options: ['DHCP', 'DNS', 'FTP', 'SNMP'],
        correctIndex: 1,
        explanation: 'DNS (Domain Name System) functions as the decentralized phonebook of the internet.'
      },
      {
        id: 'net-q4',
        question: 'Which standard port does secure encrypted HTTPS web traffic typically utilize?',
        options: ['Port 80', 'Port 21', 'Port 443', 'Port 25'],
        correctIndex: 2,
        explanation: 'Port 443 is the standard port designated for encrypted HTTPS web communications.'
      }
    ]
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    category: 'Cybersecurity & Networking',
    description: 'Understand threats, malware, CIA triad (Confidentiality, Integrity, Availability), firewalls, and encryption.',
    icon: 'ShieldCheck',
    progress: 50,
    lessonsCount: 16,
    suggestedPrompts: [
      'Explain cybersecurity basics',
      'What is the CIA Triad in cybersecurity?',
      'What is phishing and social engineering?',
      'How does public-key (asymmetric) cryptography work?'
    ],
    flashcards: [
      {
        id: 'sec-1',
        question: 'What is the CIA Triad in cybersecurity?',
        answer: 'Confidentiality (prevent unauthorized viewing), Integrity (prevent unauthorized modification), and Availability (ensure timely access).'
      },
      {
        id: 'sec-2',
        question: 'What is a firewall?',
        answer: 'A network security barrier that monitors and filters incoming and outgoing network traffic based on predefined security rules.'
      },
      {
        id: 'sec-3',
        question: 'What is phishing?',
        answer: 'A social engineering attack where malicious actors impersonate trusted entities via email/links to trick users into divulging sensitive credentials.'
      }
    ],
    quiz: [
      {
        id: 'sec-q1',
        question: 'Which principle of the CIA triad ensures that data is accurate, consistent, and unaltered by unauthorized parties?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'Authenticity'],
        correctIndex: 1,
        explanation: 'Integrity safeguards data accuracy and ensures it has not been tampered with or modified.'
      },
      {
        id: 'sec-q2',
        question: 'What security mechanism requires two or more pieces of evidence before granting access to an account?',
        options: ['Single Sign-On (SSO)', 'Multi-Factor Authentication (MFA)', 'Hash Function', 'Digital Signature'],
        correctIndex: 1,
        explanation: 'MFA adds critical defense by demanding something you know, something you have, or something you are.'
      }
    ]
  },

  // 5. Digital Skills
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'Digital Skills',
    description: 'Learn SEO, SEM, content strategy, email marketing, social campaigns, analytics, and conversion funnels.',
    icon: 'Megaphone',
    progress: 60,
    lessonsCount: 15,
    suggestedPrompts: [
      'What is SEO (Search Engine Optimization)?',
      'What is a marketing conversion funnel?',
      'Explain the difference between organic and paid traffic',
      'What is A/B testing in digital marketing?'
    ],
    flashcards: [
      {
        id: 'dm-1',
        question: 'What is SEO?',
        answer: 'Search Engine Optimization: improving a website\'s technical structure and content quality to rank higher organically in search engines.'
      },
      {
        id: 'dm-2',
        question: 'What are the main stages of a customer conversion funnel?',
        answer: 'Awareness -> Interest/Consideration -> Decision/Intent -> Action/Purchase.'
      }
    ],
    quiz: [
      {
        id: 'dm-q1',
        question: 'Which term describes testing two versions of a webpage to see which performs better?',
        options: ['Multivariate testing', 'A/B Testing', 'Beta Testing', 'Unit Testing'],
        correctIndex: 1,
        explanation: 'A/B testing splits traffic between variants A and B to measure conversion differences.'
      }
    ]
  }
];

export const CATEGORIES: Array<Subject['category']> = [
  'Programming & Web',
  'Data & Analytics',
  'Artificial Intelligence',
  'Cybersecurity & Networking',
  'Digital Skills'
];
