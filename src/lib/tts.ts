// Text-to-Speech implementation using ElevenLabs
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID; // Default voice ID can be set in .env.local

/**
 * Converts text to speech using ElevenLabs API
 * @param text The text to convert to speech
 * @returns Audio data as ArrayBuffer
 */
export async function textToSpeech(text: string): Promise<ArrayBuffer> {
  if (!ELEVENLABS_API_KEY) {
    throw new Error("Missing ElevenLabs API Key in environment variables.");
  }
  if (!ELEVENLABS_VOICE_ID) {
    console.warn(
      "Missing ElevenLabs Voice ID in environment variables. Using a default."
    );
    // Optional: Provide a fallback default if you still want one, but it's better to require it.
    // ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
    throw new Error("Missing ElevenLabs Voice ID in environment variables.");
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2", // Or your preferred model
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `ElevenLabs API error: ${response.status} - ${errorBody}`
      );
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error("Error generating speech with ElevenLabs:", error);
    // Re-throw the error to be handled by the API route
    throw error;
  }
}

/**
 * Client-side function to call the TTS API endpoint
 * @param text The text to convert to speech
 * @returns URL to the audio file
 */
export async function generateSpeech(text: string): Promise<string> {
  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error fetching TTS: ${response.status} - ${
          errorData.error || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    return data.audioUrl;
  } catch (error) {
    console.error("Error calling TTS API route:", error);
    throw error; // Re-throw for component-level handling
  }
}
