
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

/**
 * Converts a black and white image to color using the Gemini API.
 * @param base64Image The base64 encoded string of the image.
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @returns A promise that resolves to the base64 encoded string of the colorized image.
 */
export const colorizeImage = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'Colorize this black and white image with realistic and vibrant colors. Do not alter the content of the image, only add color.',
          },
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        return part.inlineData.data;
      }
    }

    throw new Error('No colorized image found in the API response.');

  } catch (error) {
    console.error('Error colorizing image with Gemini API:', error);
    throw new Error('Failed to colorize image. Please try again later.');
  }
};
