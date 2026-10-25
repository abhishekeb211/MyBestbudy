import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize Google GenAI client if key is provided
let genAI: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Chat API for Best Buddy
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [], studentContext = {} } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const systemInstruction = `You are "Best Buddy", a compassionate, evidence-informed mental health and wellbeing companion designed specifically for engineering students at PCCOE (Pimpri Chinchwad College of Engineering).

Core Guidelines:
1. Warm, Empathetic, Non-Clinical: Provide supportive, grounded, and practical listening. Use gentle CBT (Cognitive Behavioral Therapy) and REBT (Rational Emotive Behavior Therapy) thought reframing. Help students identify cognitive distortions like catastrophizing ("If I fail one exam, my career is over") or black-and-white thinking, and turn rigid demands ("I MUST be placed in Day 1") into healthy preferences ("I would prefer to get placed early, but my worth and career don't depend on one company").
2. Contextual to Engineering & College Life: You understand coding marathons, back-to-back semester submissions, lab vivas, SPPU exams, placement season anxiety, hostel loneliness, and imposter syndrome.
3. Actionable Micro-Steps: Break overwhelming tasks into 5-minute actionable steps. Suggest quick grounding (like 4-7-8 or 4-6 box breathing) when acute stress is expressed.
4. Non-Diagnostic Boundary: You are NOT a doctor or therapist and do not diagnose illnesses. Never say "You have major depressive disorder" or prescribe medication.
5. Crisis Protocol: If the user communicates active self-harm, suicidal thoughts, or immediate danger, respond with unconditional warmth, validate their pain, and urge them to connect with immediate help right now:
- National Emergency: 112
- Tele-MANAS (Govt 24/7 Helpline): 14416 or 1800-891-4416
- PCCOE Campus Counselor: Room 204 or +91 20 2765 3168
- Vandrevala Foundation: 9999 666 555
Keep your tone conversational, warm, and concise (2-4 paragraphs max). Use short bullet points when giving steps.`;

    if (genAI) {
      // Build contents array with history
      const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      // Add context if provided
      if (studentContext.issue || studentContext.symptoms) {
        const ctxStr = `[Student Profile Context: Currently exploring ${studentContext.issue || 'Wellbeing'}. Recent symptoms/triggers: ${
          Array.isArray(studentContext.symptoms) ? studentContext.symptoms.join(', ') : 'academic stress'
        }]`;
        formattedContents.push({
          role: 'user',
          parts: [{ text: ctxStr }],
        });
        formattedContents.push({
          role: 'model',
          parts: [{ text: "Understood. I am here with you, holding a safe and judgment-free space. How are you feeling right at this moment?" }],
        });
      }

      // Add past messages (limit to last 6 for focus)
      const pastMessages = conversationHistory.slice(-6);
      for (const item of pastMessages) {
        formattedContents.push({
          role: item.sender === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
      }

      // Add current message
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await genAI.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I'm right here with you. Take a slow, gentle breath. What's one thing feeling heaviest right now?";
      res.json({ reply: responseText });
      return;
    }

    // Heuristic empathetic fallback if GEMINI_API_KEY is not configured
    const lower = message.toLowerCase();
    let fallbackReply = "";

    if (lower.includes('exam') || lower.includes('fail') || lower.includes('marks') || lower.includes('submission')) {
      fallbackReply = `I hear how much weight is sitting on your shoulders with exams and submissions. When deadlines pile up, our minds naturally jump to worst-case scenarios ("What if I ruin everything?").

Let's do a gentle reality check:
1. One exam or assignment is just a single evaluation point; it does not measure your intelligence, your potential as an engineer, or your worth as a human.
2. In REBT terms, try turning *"I MUST get everything done tonight without flaws"* into *"I would PREFER to make good progress, but I can only do one hour at a time."*

Let's pick just ONE small task for the next 20 minutes. What is the very first tiny step you can start with?`;
    } else if (lower.includes('placement') || lower.includes('job') || lower.includes('interview') || lower.includes('package')) {
      fallbackReply = `Placement anxiety is one of the most intense feelings engineering students face, especially when seeing batchmates get offers on LinkedIn or campus groups.

Here is a supportive anchor for today:
- Placement schedules are erratic and not a reflection of your true technical capability.
- Comparing your journey behind the scenes to someone else's highlight reel will only drain your focus.
- Control the controllables: your daily problem practice, your rest, and your peace of mind.

Take a slow breath right now. Would you like to practice a quick question together or do a 2-minute reset?`;
    } else if (lower.includes('sleep') || lower.includes('tired') || lower.includes('exhausted') || lower.includes('bed')) {
      fallbackReply = `Racing thoughts at bedtime are so exhausting when your brain refuses to switch off.

Try this simple 'Brain Dump & 4-6 Breath':
1. Write down 3 thoughts bugging you on a piece of paper and mentally tell yourself: *"I will handle this at 10 AM tomorrow. For now, my body needs restoration."*
2. Breathe in for 4 seconds through your nose, and exhale gently for 6 seconds through your mouth.
3. Unclench your jaw and let your shoulders drop away from your ears.

You don't need to solve tomorrow tonight. You've made it through today, and that is enough.`;
    } else if (lower.includes('alone') || lower.includes('lonely') || lower.includes('nobody') || lower.includes('friend')) {
      fallbackReply = `It takes courage to admit feeling lonely. Even in a crowded college campus or hostel, it is completely normal to feel disconnected or wonder if anyone truly understands what you're going through.

Remember: Feeling lonely doesn't mean you are unlovable or broken. It simply means your human need for authentic connection is speaking to you.

Can you think of one person—a friend, sibling, roommate, or campus mentor—who has shown kindness before? Even sending a short "Hey, thinking of you, how are things?" can gently bridge that gap. I am also here to talk anytime you need.`;
    } else {
      fallbackReply = `Thank you for sharing that with me. It is completely valid to feel this way, and you don't have to carry the mental load entirely alone.

When stress feels overwhelming, try asking yourself:
- *What is within my direct control in the next 15 minutes?*
- *Is there a kinder, more forgiving way to look at this situation?*

I'm here as your Best Buddy. Take your time, and tell me a bit more about what's going through your mind.`;
    }

    res.json({ reply: fallbackReply });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown server error';
    console.error('Error generating AI response:', message);
    res.json({
      reply: "I'm right here with you. Take a slow, grounding breath. Whatever you are carrying, let's take it one step at a time.",
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
