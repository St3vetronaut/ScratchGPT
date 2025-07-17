class ScratchGPT {
  constructor() {
    this.apiKey = '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'; // ⚠️ Setze hier DEINEN OpenRouter-API-Key ein
  }

  getInfo() {
    return {
      id: 'scratchgpt',
      name: 'ScratchGPT',
      blocks: [
        {
          opcode: 'askGPT',
          blockType: Scratch.BlockType.REPORTER,
          text: 'frage GPT: [PROMPT]',
          arguments: {
            PROMPT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Was ist die Hauptstadt von Deutschland?'
            }
          }
        }
      ]
    };
  }

  async askGPT(args) {
    const prompt = args.PROMPT;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mmistralai/mistral-7b-instruct:free', // oder openai/gpt-3.5-turbo
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const json = await response.json();
    return json.choices?.[0]?.message?.content || 'Fehler';
  }
}

Scratch.extensions.register(new ScratchGPT());
