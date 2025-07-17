class ScratchGPT {
  constructor() {
    this.apiKey = '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';
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
    console.log("Sending prompt to OpenRouter:", prompt);
    console.log("Model:", this.model);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mmistralai/mistral-7b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });
    const data = await response.json();
    console.log("OpenRouter response:", data);


    const json = await response.json();
    return json.choices?.[0]?.message?.content || 'Fehler';
  }
}

Scratch.extensions.register(new ScratchGPT());
