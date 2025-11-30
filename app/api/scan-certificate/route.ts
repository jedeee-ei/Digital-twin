import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return Response.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Extract base64 data from data URL
    const base64Data = image.split(',')[1] || image;

    // Call Groq API with vision capabilities to analyze certificate
    const response = await groq.chat.completions.create({
      model: 'llama-2-90b-vision-preview',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Data}`,
              },
            },
            {
              type: 'text',
              text: `Analyze this certificate image and extract the title/name of the certification. 
              
              Return ONLY a JSON object in this format:
              {"title": "Certificate Title Here"}
              
              If you cannot determine a clear title, return:
              {"title": "Certificate"}
              
              Do not include any other text or explanation, just the JSON object.`,
            },
          ] as any,
        },
      ],
    });

    // Extract the text response
    const textContent = response.choices[0]?.message?.content;
    if (!textContent) {
      return Response.json(
        { error: 'Could not process certificate' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    try {
      const result = JSON.parse(textContent);
      return Response.json(result);
    } catch (parseError) {
      // If JSON parsing fails, try to extract title from text
      const titleMatch = textContent.match(/"title"\s*:\s*"([^"]+)"/);
      if (titleMatch) {
        return Response.json({ title: titleMatch[1] });
      }
      return Response.json({ title: 'Certificate' });
    }
  } catch (error) {
    console.error('Error scanning certificate:', error);
    return Response.json(
      { error: 'Failed to scan certificate' },
      { status: 500 }
    );
  }
}
