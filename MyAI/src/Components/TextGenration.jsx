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
  const [questionHistory, setQuestionHistory] = useState([]); // State to track question history

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  // Function to handle submission
  async function handleSubmit() {
    setLoading(true); // Set loading to true when generating text
    const generatedResponse = await GenerateText(prompt);
    setResponse(generatedResponse);
    setLoading(false); // Set loading to false when text is generated
    setQuestionHistory((prevHistory) => [
      ...prevHistory,
      { question: prompt, response: generatedResponse }
    ]); // Append new question-response pair to history
    setPrompt(""); // Clear the input box after submission
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-center text-4xl text-blue-900">
        MY AI : Text-Generation
      </h1>

      <div className="my-10 mx-auto max-w-screen-lg">
        {questionHistory.map((item, index) => (
          <div key={index} className="my-4">
            <p className="font-bold text-lg mb-2">Question {index + 1}:</p>
            <p className="text-xl mb-2">{item.question}</p>
            <p className="font-bold text-lg mb-2">Response:</p>
            <p className="text-xl mb-2">{item.response}</p>
          </div>
        ))}
        <div className="my-4">
          <label className="block mb-2" htmlFor="Enter your prompt">
            Enter your prompt
          </label>
          <div className="flex">
            <input
              type="text"
              value={prompt}
              onChange={handleChange}
              className="border w-full  rounded border-black"
            />
            <button
              onClick={handleSubmit}
              className="border rounded-r-lg border-black bg-blue-900 text-white px-2 ml-2"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
          {loading && (
            <div className="flex justify-center mt-2">
              <div className="w-20 h-20 border-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextGeneration;
