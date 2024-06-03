import React, { useState } from "react";
import { debounce } from "lodash";
import FormSection from "./FormSelection";
import AnswerSection from "./Answer/Answer";
import { OpenAI } from "openai";

export const ChatGPT = () => {
  const openai = new OpenAI({
    organization: "org-JcBaCfmfICAngu1swKaV75yc",
    apiKey: "sk-proj-7VCYoMtB0r7O0Y2TB5zqT3BlbkFJaugoxuemNw2ufbArc60A",
    // basePath: "https://api.openai.com",
    dangerouslyAllowBrowser: true,
  });

  const [storedValues, setStoredValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedGenerateResponse = debounce(
    async (newQuestion, setNewQuestion) => {
      setIsLoading(true);
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: newQuestion }],
        });
        console.log("response", response);

        if (response.choices && response.choices.length > 0) {
          setStoredValues([
            {
              question: newQuestion,
              answer: response.choices[0].text,
            },
            ...storedValues,
          ]);
          setNewQuestion("");
        }
      } catch (error) {
        console.error("Error generating response:", error);
      } finally {
        setIsLoading(false);
      }
    },
    1000 // Adjust the debounce delay as needed
  );

  const generateResponse = (newQuestion, setNewQuestion) => {
    debouncedGenerateResponse(newQuestion, setNewQuestion);
  };

  return (
    <>
      <div>
        <div
          className="header-section"
          style={{ marginLeft: "250px", marginRight: "30px" }}
        >
          <h1>ChatGPT 🤖</h1>
          <p>
            I am an automated question and answer system, designed to assist you
            in finding relevant information. You are welcome to ask me any
            queries you may have, and I will do my utmost to offer you a
            reliable response. Kindly keep in mind that I am a machine and
            operate solely based on programmed algorithms.
          </p>
        </div>

        <FormSection
          generateResponse={generateResponse}
          isLoading={isLoading}
        />
        <AnswerSection storedValues={["qqwe", "qweqwe"]} />
      </div>
    </>
  );
};

export default ChatGPT;
