import "tailwindcss/tailwind.css";
import "../app/globals.css";
import React, { useState } from "react";
import { evaluate } from "mathjs";
import Wrapper from "../components/Wrapper";
import Screen from "../components/Screen";
import ButtonBox from "../components/ButtonBox";
import Button from "../components/Button";

export default function Home() {
  // useState to store memory of operands entered by user
  const [currentNumber, setCurrentNumber] = useState<string>("0");
  const [priorNumber, setPriorNumber] = useState<string>("");
  const [sign, setSign] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  // Array of buttons that will be set on each button via .map()
  const buttonValues = [
    "C",
    "+-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  // Function for when a button is pressed and to have a case for each button
  const processKeystroke = (key: string) => {
    switch (key) {
      // Case to clear screen and useState of any variables saved
      case "C":
        setCurrentNumber("0");
        setPriorNumber("");
        setSign("");
        setSolution("");
        break;
      // case for number button keys
      case "0":
        // Stop adding 0 if first character of current number is 0
        if (currentNumber === "0") {
          break;
        }
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        // Calculator screen display limit
        if (currentNumber.length >= 20) {
          break;
        }
        // Change 0 to key entered
        if (currentNumber === "0") {
          setCurrentNumber(key);
          break;
        }
        // Add new number keys onto current number
        setCurrentNumber((x) => {
          return x + key;
        });
        break;
      // Case for converting current number to negative/positive
      case "+-":
        if (currentNumber === "0") {
          break;
        } else if (currentNumber.includes("-")) {
          setCurrentNumber((x) => {
            return x.replace("-", "");
          });
        } else {
          setCurrentNumber((x) => {
            return `${"-" + x}`;
          });
        }
        break;
      // Case for decimal key
      case ".":
        if (currentNumber.includes(".")) {
          return;
        } else {
          setCurrentNumber((x) => {
            return x + key;
          });
        }
        break;
      // Case for signs
      case "%":
      case "+":
      case "-":
      case "x":
      case "/":
        // If key entered is multiplication
        if (key === "x") {
          if (priorNumber && sign && currentNumber) {
            setSign("*");
            setSolution(evaluate(priorNumber + sign + currentNumber));
            setPriorNumber(evaluate(priorNumber + sign + currentNumber));
            setCurrentNumber("0");
            break;
          }
          setSign("*");
          setPriorNumber(currentNumber);
          setCurrentNumber("0");
          break;
        }
        // If user tries to divide number by 0
        if (priorNumber && key === "/" && currentNumber === "0") {
          setCurrentNumber("Error, Cannot Divide By 0");
          break;
        }
        // If equation is continuous and equals button not pressed
        if (priorNumber && sign && currentNumber) {
          setSolution(evaluate(priorNumber + sign + currentNumber));
          setPriorNumber(evaluate(priorNumber + sign + currentNumber));
          setCurrentNumber("0");
          setSign(key);
          break;
        }
        // sets sign to sign button pressed and saves the prior number to move onto current
        setSign(key);
        setPriorNumber(currentNumber);
        setCurrentNumber("0");
        break;
      // Case for when evaluating given equation
      case "=":
        if (priorNumber && sign === "/" && currentNumber === "0") {
          setCurrentNumber("Error, Cannot Divide By 0");
          break;
        }
        setCurrentNumber(`${evaluate(priorNumber + sign + currentNumber)}`);
        setSolution(`${evaluate(priorNumber + sign + currentNumber)}`);
    }
  };

  return (
    <>
      <div className="w-flex">
        <p>
          Hello! My name is Edis Rahic and thank you for checking out my first
          project using Next.js React. Please give this a try to do your
          homework or taxes, it works!
        </p>
        <Wrapper>
          <Screen
            className={`screen ${currentNumber === "Error, Cannot Divide By 0" ? "error" : "screen"}`}
            value={currentNumber}
          ></Screen>
          <ButtonBox className="buttonBox">
            {buttonValues.map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={`button ${btn === "=" ? "equals" : ""}`}
                  value={btn}
                  onClick={processKeystroke}
                ></Button>
              );
            })}
          </ButtonBox>
        </Wrapper>
      </div>
    </>
  );
}
