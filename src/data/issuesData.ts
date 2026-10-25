import { Issue, Quest } from '../types';

export const ISSUES_DATA: Issue[] = [
  {
    id: 'academic-stress',
    title: 'Academic Stress',
    category: 'Academic',
    shortDescription: "Feeling overwhelmed by coursework, exams, or project deadlines. It's common to feel pressure to perform, which can impact sleep and focus.",
    fullDescription: "Academic stress is that overwhelming feeling when coursework, exams, or deadlines start to pile up. It's completely normal to feel this pressure in a rigorous engineering environment at PCCOE, but you don't have to carry it alone. Let's work through it together with practical cognitive reframing and step-by-step actions.",
    icon: 'menu_book',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjVgf4v3U8YUkg66P7HdnvQsLNRN2aDpdbrFI008nQHBDD-wjpJ7u5RL0L0mTMdvPrybsmzM-zqBgmsv5MUjysr50RH9PUhii6mHv0CrOg9bUeOUJYPQJxQYTK0jpOqFwJvPCmdK0QGAhF5yupNKBHsVMRCN43uPqWe6jdHqebXk_NmFlCC6EqGQ6PjnCWNwMikUtU3RjlhM1syHCtRPH1d7YNDIkKwYzzAVW2UdoVhuKZyWMw9BaoQw',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKVUKnT_htyIqBWDQGJ5BrkAPoJCwSJypr8JJ9Agro-z4wq-BVIsOetdtcwKy5iSd7nQnxu31CEA72XyldRZZTnArHEb5dh0_EhvtCee8mZCffedABBxsRyFxF0xLsX-xrfB8mXwehYlhXSt23luqUZUxN_d6YON5eOHTcEPmlVk22IatL9Jg5e6GShDDWKKYfIN6D9rjjkePk_ILCGBY55EB9bw3Re5gT9S3BQ_n81ERrBJx4EV6_Ng',
    badgeBg: 'bg-[#cbead6]',
    badgeText: 'text-[#4f6a5b]',
    cbtStrategy: {
      title: 'CBT Strategy: Thought Reframing',
      explanation: 'When stressed, our minds often jump to worst-case scenarios. Let\'s practice challenging those thoughts by examining real evidence instead of catastrophic fears.',
      negativeThought: '"If I mess up this assignment, I\'m going to fail the whole course and ruin my semester."',
      reframedThought: '"This assignment is just one part of my grade. I will do my best, and I can seek help from batchmates or faculty if I struggle."',
      distortionType: 'Catastrophizing & All-or-Nothing Thinking',
      practiceExamples: [
        {
          situation: 'Preparing for End-Sem SPPU Exams with limited revision time',
          negative: 'There is too much syllabus left. I cannot understand anything and I am bound to fail.',
          reframed: 'I may not cover every single topic perfectly, but focusing on high-weightage concepts today gives me a solid passing score and peace of mind.'
        },
        {
          situation: 'Stuck debugging code for tomorrow\'s lab submission',
          negative: 'Everyone else finished their project hours ago. I am completely incompetent at coding.',
          reframed: 'Encountering bugs is literally how software engineering works. Taking a 10-minute walk will clear my head to spot the issue.'
        }
      ]
    },
    rebtInsight: {
      title: 'REBT Insight: Preferences vs. Demands',
      explanation: 'Using Albert Ellis\'s ABC model, we can change rigid absolute demands ("I MUST get an A") into flexible healthy preferences to instantly reduce internal panic.',
      demand: '"I MUST get a perfect score, otherwise I am a complete failure as an engineer."',
      preference: '"I would PREFER to do well, but I can handle it if I don\'t. My worth isn\'t tied to one grade or one semester SGPA."',
      beliefModel: {
        activatingEvent: 'Difficult exam paper or tough viva questioning',
        irrationalBelief: 'I must never show weakness or make mistakes in front of examiners.',
        emotionalConsequence: 'Intense panic, mental block, physical sweating and shaking.',
        effectiveDispute: 'Who said humans never make mistakes under stress? Imperfection is part of learning.'
      }
    },
    copingSteps: [
      'The 5-Minute Kickstart: Commit to just 5 minutes on the hardest problem with zero expectation of completion.',
      'Reverse Pomodoro: 25 minutes of focused single-tasking followed by 5 minutes away from all screens.',
      'Brain Dump: Write down every looming task onto physical paper to free up working memory.',
      'Somatic Reset: Drop your shoulders, unclench your teeth, and exhale twice as long as you inhale.'
    ],
    suggestedSymptoms: [
      'Procrastination and delay',
      'Difficulty concentrating on lectures or code',
      'Worrying incessantly about exams',
      'Trouble falling or staying asleep',
      'Physical tension or headaches before vivas'
    ],
    suggestedTriggers: [
      'Upcoming Project Deadlines',
      'SPPU In-Sem / End-Sem Exams',
      'High Family & Relative Expectations',
      'Peer Comparison on LinkedIn & Class Groups'
    ]
  },
  {
    id: 'anxiety',
    title: 'Anxiety',
    category: 'Emotional',
    shortDescription: "Experiencing persistent worry, racing thoughts, or physical symptoms like a fast heartbeat. It can make everyday situations feel daunting.",
    fullDescription: "Anxiety is the brain's alarm system misfiring, treating everyday challenges as life-threatening crises. It manifests as restless pacing, racing thoughts, tight chest, or knots in your stomach. Understanding how physiological adrenaline interacts with automatic catastrophic thoughts is your first superpower.",
    icon: 'psychology',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPExWt3rAQ6_XDGwuJ2wPMSbUOcWlWt5is2EllDEiIGdUzdCSwCyhqLbxk2YJLKASAWYCsteEa0wKgjOkXT9v07fHT8pu5RhCUiRKnbNPmQP3equG0NkNTrcI_xFqewCXPj6EVZEz5ShYcBIO8dcOqHEWnIZPoy3hI_jzzWzG9t70iChh08B6cYVFWBQSTp4NJhwRkup3zIPP3mayUvL-WPyjzlYliV8qC1ruSJwR9q7466bCLR3eJrw',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPExWt3rAQ6_XDGwuJ2wPMSbUOcWlWt5is2EllDEiIGdUzdCSwCyhqLbxk2YJLKASAWYCsteEa0wKgjOkXT9v07fHT8pu5RhCUiRKnbNPmQP3equG0NkNTrcI_xFqewCXPj6EVZEz5ShYcBIO8dcOqHEWnIZPoy3hI_jzzWzG9t70iChh08B6cYVFWBQSTp4NJhwRkup3zIPP3mayUvL-WPyjzlYliV8qC1ruSJwR9q7466bCLR3eJrw',
    badgeBg: 'bg-[#2d7d8e]/20',
    badgeText: 'text-[#006474]',
    cbtStrategy: {
      title: 'CBT Strategy: Probability Decatastrophizing',
      explanation: 'Anxiety overestimates the probability of disaster and underestimates your coping ability. We calculate realistic outcomes instead.',
      negativeThought: '"My heart is racing so fast; I am going to have a breakdown or pass out in front of the whole class."',
      reframedThought: '"My heart is beating faster because of adrenaline, which is harmless. It is my body getting ready to act. It will settle in a few minutes."',
      distortionType: 'Emotional Reasoning & Catastrophizing',
      practiceExamples: [
        {
          situation: 'Waiting outside the viva cabin',
          negative: 'I will freeze and not be able to utter a single word.',
          reframed: 'Even if I need a moment, I can take a sip of water and say: "Could you repeat that question, sir?"'
        }
      ]
    },
    rebtInsight: {
      title: 'REBT Insight: Tolerating Uncertainty',
      explanation: 'Anxiety demands 100% certainty before feeling safe. REBT teaches us to embrace that life is probabilistic.',
      demand: '"I MUST know for certain that tomorrow will go smoothly, or else I can\'t relax tonight."',
      preference: '"I would PREFER certainty, but uncertainty is a normal part of life. I can handle surprises as they arise."',
      beliefModel: {
        activatingEvent: 'Waiting for announcement of test scores',
        irrationalBelief: 'I must have control over every outcome.',
        emotionalConsequence: 'High chronic vigilance, exhaustion, sleeplessness.',
        effectiveDispute: 'No human has complete control over the future. Releasing the need to control allows peace.'
      }
    },
    copingSteps: [
      'Box Breathing (4-4-6-2): Inhale for 4 seconds, hold for 4, exhale slowly for 6, rest for 2.',
      '5-4-3-2-1 Sensory Grounding: Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
      'Cold Water Diver\'s Reflex: Splash cold water on your temples and cheeks to trigger the vagus nerve.'
    ],
    suggestedSymptoms: [
      'Racing heart or palpitations',
      'Constant anticipation of something going wrong',
      'Tightness in chest or shallow breathing',
      'Restlessness or inability to sit still',
      'Gastrointestinal flutter / nervous stomach'
    ],
    suggestedTriggers: [
      'Speaking up in classroom or auditorium',
      'Sudden syllabus announcements',
      'Uncertainty about future or career',
      'Over-caffeinated all-nighters'
    ]
  },
  {
    id: 'depression',
    title: 'Depression',
    category: 'Emotional',
    shortDescription: "A prolonged sense of sadness, loss of interest in activities you usually enjoy, or feeling a lack of energy and motivation.",
    fullDescription: "Depression is not just feeling sad; it's a persistent fog that leaches color and vitality from things you once loved. It convinces you that effort is futile and that resting will heal you, yet isolation often deepens the numbness. Gentle, micro-actions without pressure are the secret to rebuilding momentum.",
    icon: 'cloud',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg9MFJt7vPEGUA7X7DtCcpWJ8jVdncwOAE1_wUadz2tKEbrRQvZVwqRjqD9tj_1rehewvTla8VrGy39VrPujWFS3JbaDuuJ9RNpXB1q4XrJxuZla-8WksjLHKAl1HmUvXkjje009GXucjcA4IlZIWIoG33kB4uvAJW-y5XKdzVRBr_v1E-rvD9u0n3kR3eBxDXAbkhOOpAZgMmhztuNgrOaukFjuySAb5R_-qPkfZnr1oCBQCJBiYHOg',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg9MFJt7vPEGUA7X7DtCcpWJ8jVdncwOAE1_wUadz2tKEbrRQvZVwqRjqD9tj_1rehewvTla8VrGy39VrPujWFS3JbaDuuJ9RNpXB1q4XrJxuZla-8WksjLHKAl1HmUvXkjje009GXucjcA4IlZIWIoG33kB4uvAJW-y5XKdzVRBr_v1E-rvD9u0n3kR3eBxDXAbkhOOpAZgMmhztuNgrOaukFjuySAb5R_-qPkfZnr1oCBQCJBiYHOg',
    badgeBg: 'bg-[#a66142]/20',
    badgeText: 'text-[#88492c]',
    cbtStrategy: {
      title: 'CBT Strategy: Behavioral Activation',
      explanation: 'Depression tells you: "Wait until you feel motivated before doing anything." CBT reverses this: Action precedes motivation.',
      negativeThought: '"What is the point of getting out of bed or going to the campus canteen? Nothing feels fun anymore."',
      reframedThought: '"My brain chemistry is low on dopamine right now. Doing a 5-minute walk outside won\'t solve everything, but it is 1% better than staying trapped in bed."',
      distortionType: 'Overgeneralization & Futility Bias'
    },
    rebtInsight: {
      title: 'REBT Insight: Unconditional Self-Acceptance',
      explanation: 'Stop rating yourself based on your productivity. You have intrinsic worth simply as a human being.',
      demand: '"Because I haven\'t been productive this week, I am worthless and lazy."',
      preference: '"I would prefer to have high energy every day, but experiencing a low phase does not reduce my fundamental human value."',
      beliefModel: {
        activatingEvent: 'Skipping classes or staying in hostel room',
        irrationalBelief: 'I have ruined my potential; I am defective.',
        emotionalConsequence: 'Guilt spiral, deeper depression, self-loathing.',
        effectiveDispute: 'A low phase is an indicator of emotional exhaustion, not a personal character defect.'
      }
    },
    copingSteps: [
      'Micro-Steps: Pick a task that takes less than 60 seconds (drinking a glass of water, opening the window curtains).',
      'Sunlight Exposure: Spend 10 minutes sitting in natural daylight to reset circadian rhythms.',
      'Compassionate Self-Talk: Treat yourself like a wounded friend rather than a drill sergeant.'
    ],
    suggestedSymptoms: [
      'Loss of interest in hobbies or gaming',
      'Persistent low energy even after long sleep',
      'Feelings of worthlessness or excessive guilt',
      'Changes in appetite or skipping meals',
      'Withdrawing from messages and friend groups'
    ],
    suggestedTriggers: [
      'Extended isolation during breaks or exam prep',
      'Setbacks in academics or relationships',
      'Chronic sleep deprivation',
      'Overwhelming future dread'
    ]
  },
  {
    id: 'social-anxiety',
    title: 'Social Anxiety',
    category: 'Social',
    shortDescription: "Intense fear of being judged or scrutinized in social situations, leading to avoidance of peer interactions or public speaking.",
    fullDescription: "Social anxiety makes you feel like there is a harsh spotlight following you everywhere on campus—in the canteen, while asking a doubt in lecture, or walking into a club meeting. Realizing that everyone else is primarily preoccupied with their own insecurities breaks the illusion of constant scrutiny.",
    icon: 'groups',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvxx0kjHjr9V1MjkUUgAof6ob4vqmeGPCznDht0fsvxBxD6xL3mJSY_X1gYIfV2mkBd2GyoZ49tXHZBghxXOO4bHQMniseBMRBXJpf-OFh9F6J7vWAaGhvzJ_NM2QEXD2n5WywWUeDSmh5gSm9cTFkyk6Bg7yFVicn1ZXcFJcl5_ummP627Dgdog6jrVroSz0AMNKrMSMTWO2aQMK0eartq5eFS53ZqR6DJGBVbhldb6yGKQhMU-yGmw',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvxx0kjHjr9V1MjkUUgAof6ob4vqmeGPCznDht0fsvxBxD6xL3mJSY_X1gYIfV2mkBd2GyoZ49tXHZBghxXOO4bHQMniseBMRBXJpf-OFh9F6J7vWAaGhvzJ_NM2QEXD2n5WywWUeDSmh5gSm9cTFkyk6Bg7yFVicn1ZXcFJcl5_ummP627Dgdog6jrVroSz0AMNKrMSMTWO2aQMK0eartq5eFS53ZqR6DJGBVbhldb6yGKQhMU-yGmw',
    badgeBg: 'bg-[#cbead6]',
    badgeText: 'text-[#4f6a5b]',
    cbtStrategy: {
      title: 'CBT Strategy: Diffusing the Spotlight Effect',
      explanation: 'Psychological studies prove that people notice less than 20% of what we assume they are judging us for.',
      negativeThought: '"If I stumble over my words during the seminar presentation, everyone will laugh and think I am foolish."',
      reframedThought: '"Most people are thinking about their own upcoming turns. Stumbling on a word is completely human; I will smile, pause, and continue."',
      distortionType: 'Mind Reading & The Spotlight Illusion'
    },
    rebtInsight: {
      title: 'REBT Insight: The Approval Trap',
      explanation: 'We don\'t need universal approval to live happily and successfully.',
      demand: '"Everyone in my project team MUST like and approve of me at all times."',
      preference: '"I PREFER their approval and teamwork, but if someone has a bad day or disagrees with me, I can survive it just fine."',
      beliefModel: {
        activatingEvent: 'Someone didn\'t wave back in the corridor',
        irrationalBelief: 'They secretly hate me; I must have done something wrong.',
        emotionalConsequence: 'Ruminating for 3 hours, dreading tomorrow.',
        effectiveDispute: 'They were probably looking at their phone, lost in thought, or didn\'t see me.'
      }
    },
    copingSteps: [
      'Focus Outward: Notice 3 interesting things about the other person\'s shoes, shirt, or notebook instead of monitoring your own voice.',
      'The 3-Second Rule: When you want to say something in a group, count 1-2-3 and speak before your anxiety builds a wall.',
      'Small Experiments: Say "Good morning" or "Thank you" to the campus library guard or canteen staff.'
    ],
    suggestedSymptoms: [
      'Fear of eating or speaking in public',
      'Over-analyzing conversations for hours afterwards',
      'Physical blushing, trembling hands, dry mouth',
      'Avoiding team projects or campus clubs',
      'Dread of answering questions in class'
    ],
    suggestedTriggers: [
      'Project presentations in front of professors',
      'Joining a new student club or technical team',
      'Sitting alone in a busy canteen',
      'Small talk with unfamiliar peers'
    ]
  },
  {
    id: 'loneliness',
    title: 'Loneliness',
    category: 'Social',
    shortDescription: "Feeling disconnected from others, even when surrounded by people. A sense of isolation or lacking meaningful, close relationships.",
    fullDescription: "Engineering colleges are crowded environments, yet hundreds of students sit in hostel rooms or library corners feeling invisible. Loneliness isn't about being alone physically—it's about the yearning for emotional attunement and being understood for who you truly are.",
    icon: 'person',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbmHejOUL_jNNIa0fCjRqhPL2bZVM0mGIDKfYwV9q_T1BrtIFn7zTipN4BlAFSb7H-5EXs5s0CJTMWwwpbYPVLEp2NGm6qKzoIog_zEJCW_wPgnXiQyBXGAiA9iHP30QeUvJ30jDJZ5B-6Ok_4iVVGIFgttFvgxWK7QeOca5XEHL4jqlHyJY4PPi5aLa5X3LE8fgtG6VPjN-ucrXVcTjkqDeOIonZiMgfHbKeNoG1bcojLrFBG5P9z1w',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbmHejOUL_jNNIa0fCjRqhPL2bZVM0mGIDKfYwV9q_T1BrtIFn7zTipN4BlAFSb7H-5EXs5s0CJTMWwwpbYPVLEp2NGm6qKzoIog_zEJCW_wPgnXiQyBXGAiA9iHP30QeUvJ30jDJZ5B-6Ok_4iVVGIFgttFvgxWK7QeOca5XEHL4jqlHyJY4PPi5aLa5X3LE8fgtG6VPjN-ucrXVcTjkqDeOIonZiMgfHbKeNoG1bcojLrFBG5P9z1w',
    badgeBg: 'bg-[#2d7d8e]/20',
    badgeText: 'text-[#006474]',
    cbtStrategy: {
      title: 'CBT Strategy: Testing the Isolation Belief',
      explanation: 'Loneliness generates a protective mental shell that assumes others are closed off or unwelcoming.',
      negativeThought: '"Nobody here actually cares about me. If I disappeared from campus, no one would notice."',
      reframedThought: '"Many students are feeling just as isolated and cautious as I am. A quiet connection takes time to grow, and my existence matters."',
      distortionType: 'Jumping to Conclusions & Mental Filtering'
    },
    rebtInsight: {
      title: 'REBT Insight: Courage Over Certainty',
      explanation: 'Initiating connection involves vulnerability, and that is okay.',
      demand: '"I must be guaranteed that someone will be a lifelong best friend before I risk saying hello."',
      preference: '"I would prefer deep friendships right away, but casual, low-pressure conversations are how all friendships start."',
      beliefModel: {
        activatingEvent: 'Sitting alone during lunch break',
        irrationalBelief: 'I am awkward and undesirable as a friend.',
        emotionalConsequence: 'Despair, avoiding common areas.',
        effectiveDispute: 'Awkwardness is just unfamiliarity. Practicing small warmth is a learnable skill.'
      }
    },
    copingSteps: [
      'Low-Stakes Shared Context: Work in the campus reading room or study hall where you share physical presence without needing to perform.',
      'Check in on One Person: Send a brief text to an old school friend or family member asking how their week is going.',
      'Join an Interest Group: Participate in a hackathon, music circle, or sports session where the activity does the talking.'
    ],
    suggestedSymptoms: [
      'Feeling detached in crowded classrooms',
      'Spending consecutive days in room without real conversation',
      'Excessive scrolling on social media to feel connected',
      'Belief that you don\'t fit in with the engineering crowd',
      'Hesitation to ask for help or company'
    ],
    suggestedTriggers: [
      'Hostel transitions and moving away from home',
      'Weekends when roommates go home',
      'Seeing peer groups celebrate together',
      'Difficulty relating to competitive peer banter'
    ]
  },
  {
    id: 'career-anxiety',
    title: 'Career & Placement Anxiety',
    category: 'Career',
    shortDescription: "Uncertainty or severe stress regarding future job prospects, placements, or choosing the 'right' career path in engineering.",
    fullDescription: "The placement season at PCCOE brings an emotional rollercoaster. When company shortlists arrive, when friends get high CTC offers, or when technical interviews feel brutal, it's easy to tie your entire identity and future to an offer letter. Your career is a 40-year marathon, not a 3-month sprint.",
    icon: 'work',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz7-s28bafrtcaLqNetfsbBBrezz2gFb6gR_JSsG5fNS8sgdPj3lXgrdFtyXMysHFVubrorOjObgb5BHyststP2C0akwP-U9IA0iNmnn0lyUg6VCNTFl5un1U-z-e-surY-6cCA0cSWkNzvgqkm_XeDx5MJHee1A4qidcvqGJVAjUERnPjkJtP8eiSnGT7w06aJnhSU5lykWyMcy0EAXGtJUvZ6ZckxGrsHUUv0za11OxGy5a6GjYwiw',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpo17N3_XruUldFBN9UEE5NzLdBc0-Hfv7qgQgrdQEN9np2AapJ_GQFobSstLLWDt-Fo_bHd8yy-QLF4P4YafK5pBzKKedaUjzGyGpGezX77eo4rSM1uuLHkrUgqZsOgBRrSRyACT3pzF1yEWui24XpE8W7Q6OdJqasyxOhyf9qoLoaXv2PbW4W2xjMlRDUmIKrwFX-YdQTDmvV-J7iUEr1vq-djWqnNOQdTlWesSbn7tl4htzX-rdsg',
    badgeBg: 'bg-[#a66142]/20',
    badgeText: 'text-[#88492c]',
    cbtStrategy: {
      title: 'CBT Strategy: Decoupling Identity from Rejection',
      explanation: 'Campus recruitment involves algorithmic screening, company quotas, and luck. A rejection is data on the test, not a verdict on your soul.',
      negativeThought: '"I was rejected in the second round. I will never get placed, and my 4 years of engineering were wasted."',
      reframedThought: '"Interview rejection is a routine stepping stone in tech. This specific company wasn\'t the match today, but each interview sharpens my technical communication."',
      distortionType: 'Personalization & Fortune Telling'
    },
    rebtInsight: {
      title: 'REBT Insight: Demanding Dream Companies',
      explanation: 'Unreasonable "Musts" create placement paralysis.',
      demand: '"I MUST be placed in a Tier-1 product company on Day 1, otherwise my relatives and parents will look down on me."',
      preference: '"I strongly PREFER a high-tier product company offer, but starting at any reputable firm or startup will still give me real engineering experience and room to grow."',
      beliefModel: {
        activatingEvent: 'Seeing a classmate post their offer letter on LinkedIn',
        irrationalBelief: 'Their success means my failure; I am hopelessly behind.',
        emotionalConsequence: 'Envy, bitter self-criticism, inability to study.',
        effectiveDispute: 'Careers are non-linear. Many top tech leads started at modest service firms or open source.'
      }
    },
    copingSteps: [
      'Digital Detox during Placement Drives: Mute placement announcement groups outside of checking official drive schedules.',
      'Process Goals Over Outcome Goals: Focus on solving 2 LeetCode problems or revising 1 System Design topic per day instead of stressing over offer letters.',
      'Mock Interviews with a Friend: Practice articulating your thoughts out loud under gentle simulation.'
    ],
    suggestedSymptoms: [
      'Insomnia thinking about upcoming aptitude tests',
      'Comparing your CGPA/resume compulsively with peers',
      'Paralyzing fear of technical or HR interviews',
      'Feeling like an imposter who doesn\'t truly understand coding',
      'Guilt over parental expectations and college fees'
    ],
    suggestedTriggers: [
      'On-campus placement drive season',
      'LinkedIn job update notifications',
      'Aptitude test cut-off lists',
      'Relatives asking "Where are you placed?"'
    ]
  }
];

export const DAILY_QUESTS: Quest[] = [
  {
    id: 'quest-move',
    type: 'move',
    title: '5-Minute Mindful Walk',
    duration: '5 min',
    description: 'Step outside the department building or hostel. Walk at a gentle pace without checking your phone. Notice 3 trees or campus landmarks.',
    completed: false,
    actionLabel: 'Mark Walk Done'
  },
  {
    id: 'quest-pause',
    type: 'pause',
    title: 'Quiet Quest: Screen Break',
    duration: '10 min',
    description: 'Put your phone face-down. Allow your mind to idle and let your sensory attention reset.',
    completed: false,
    actionLabel: 'Start Quiet Timer'
  },
  {
    id: 'quest-think',
    type: 'think',
    title: 'Thought Reframe Drop',
    duration: '2 min',
    description: 'Identify one negative assumption from this morning and reframe it from a rigid demand into a healthy preference.',
    completed: false,
    actionLabel: 'Practice Reframe'
  },
  {
    id: 'quest-connect',
    type: 'connect',
    title: 'Express Gratitude',
    duration: '1 min',
    description: 'Send a genuine 1-line text to a friend or lab partner thanking them for something small.',
    completed: false,
    actionLabel: 'Complete Connect'
  },
  {
    id: 'quest-reflect',
    type: 'reflect',
    title: 'Daily Useful Check-in',
    duration: '30 sec',
    description: 'Notice: What was the most useful moment of your day today?',
    completed: false,
    actionLabel: 'Reflect'
  }
];

export const RECOMMENDED_ARTICLES = [
  {
    id: 'art-1',
    title: 'Managing Placement Anxiety',
    tag: 'Career & Growth',
    readTime: '3 min read',
    description: 'Practical steps to stay grounded and focused during the placement season at engineering campuses.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpo17N3_XruUldFBN9UEE5NzLdBc0-Hfv7qgQgrdQEN9np2AapJ_GQFobSstLLWDt-Fo_bHd8yy-QLF4P4YafK5pBzKKedaUjzGyGpGezX77eo4rSM1uuLHkrUgqZsOgBRrSRyACT3pzF1yEWui24XpE8W7Q6OdJqasyxOhyf9qoLoaXv2PbW4W2xjMlRDUmIKrwFX-YdQTDmvV-J7iUEr1vq-djWqnNOQdTlWesSbn7tl4htzX-rdsg',
    content: `Placement anxiety is among the highest acute stressors for engineering students. The combination of competitive peer dynamics, family hopes, and technical tests creates an intense pressure cooker.

Key Grounding Pillars:
1. Understand the Funnel: Over 70% of hiring decisions in large drives come down to factors outside your control (branch quotas, interview slots, interviewer biases). Don't confuse an outcome with your self-worth.
2. The 30-Minute Boundary: Dedicate 30 minutes in the morning to apply, then close the placement portal. Compulsive tab-refreshing increases cortisol without increasing job offers.
3. Rest is Preparation: A well-rested brain solves algorithmic problems 40% faster than an exhausted one. Sleep is not a reward for studying; it is an active prerequisite.`
  },
  {
    id: 'art-2',
    title: 'Overcoming Imposter Syndrome in Engineering Labs',
    tag: 'Mindset',
    readTime: '4 min read',
    description: 'Why almost every coder and developer feels like they are faking it—and how to build real confidence.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjVgf4v3U8YUkg66P7HdnvQsLNRN2aDpdbrFI008nQHBDD-wjpJ7u5RL0L0mTMdvPrybsmzM-zqBgmsv5MUjysr50RH9PUhii6mHv0CrOg9bUeOUJYPQJxQYTK0jpOqFwJvPCmdK0QGAhF5yupNKBHsVMRCN43uPqWe6jdHqebXk_NmFlCC6EqGQ6PjnCWNwMikUtU3RjlhM1syHCtRPH1d7YNDIkKwYzzAVW2UdoVhuKZyWMw9BaoQw',
    content: `Imposter syndrome thrives in technical domains where the volume of information is practically infinite. No single person knows all of Linux, React, Data Structures, and Microservices.

What to Remember:
1. Senior engineers use documentation and StackOverflow every single day.
2. Asking questions in lab vivas shows intellectual curiosity, not incompetence.
3. Keep an "Evidence Folder" of problems you successfully resolved in the past.`
  }
];
