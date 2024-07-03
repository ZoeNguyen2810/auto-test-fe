import React, { useState } from "react";
import { debounce } from "lodash";
import FormSection from "./FormSelection";
import AnswerSection from "./Answer/Answer";
import { OpenAI } from "openai";

export const ChatGPT = () => {
  
   

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

      
      </div>
    </>
  );
};

export default ChatGPT;
