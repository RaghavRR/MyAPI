import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

// Initialization of Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

// Function for text generation
async function GenerateText(promptProvided) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = promptProvided;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

const TextGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading status

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  // Function to handle submission
  async function handleSubmit() {
    setLoading(true); // Set loading to true when generating text
    const generatedResponse = await GenerateText(prompt);
    setResponse(generatedResponse);
    setLoading(false); // Set loading to false when text is generated
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-center text-4xl text-blue-900">
        MY AI : Text-Generation
      </h1>

      <div className="my-10 mx-auto max-w-screen-lg">
        <label className="block my-4" htmlFor="Enter your prompt">
          Enter your prompt
        </label>
        <input
          type="text"
          onChange={handleChange}
          className="border w-full  rounded border-black"
        />
        <button
          onClick={handleSubmit}
          className="block border rounded-r-lg border-black bg-blue-900 text-white px-2 my-4"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      <div className="my-4 max-w-screen-xl">
        <p>{response}</p>
      </div>
    </div>
  );
};

export default TextGeneration;
