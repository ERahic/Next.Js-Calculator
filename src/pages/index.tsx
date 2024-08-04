import "tailwindcss/tailwind.css";
import "../app/globals.css";
import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import Wrapper from "../components/Wrapper";
import Screen from "../components/Screen";
import ButtonBox from "../components/ButtonBox";
import Button from "../components/Button";
import Legend from "../components/Legend";

export default function Home() {
  // useState to store memory of operands entered by user
  const [currentNumber, setCurrentNumber] = useState<string>("0");
  const [priorNumber, setPriorNumber] = useState<string>("");
  const [sign, setSign] = useState<string>("");
  const [priorSign, setPriorSign] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>("");
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

  // Key mappings for legend display of keyboard shortcuts
  const keyMappings = [
    { key: "0-1", description: "Numbers" },
    { key: ".", description: "decimal" },
    { key: "c", description: "Clear Screen" },
    { key: "+", description: "Addition" },
    { key: "-", description: "Subtraction" },
    { key: "/", description: "Division" },
    { key: "Enter or =", description: "Evaluate & Display Result" },
    { key: "* or x", description: "Multiply" },
    { key: "n", description: "Toggle positive/negative" },
  ];

  // Function for when a button is pressed and to have a case for each button
  const processKeystroke = (key: string) => {
    // Whichever key is pressed will be highlighted and pressed onto the calculator
    setActiveButton(key);
    switch (key) {
      // Case to clear screen and useState of any variables saved
      case "C":
        setCurrentNumber("0");
        setPriorNumber("");
        setSign("");
        setPriorSign("");
        setSolution("");
        break;
      // case for number button keys
      case "0":
        // Stop adding 0 if first character of current number is 0
        if (currentNumber === "0") {
          break;
        }
        // Stop new numbers from being added onto screen when equals sign is pressed for solution
        if (currentNumber === solution && sign === "=") {
          return;
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
        if (currentNumber.length >= 16) {
          break;
        }
        // Change 0 to key entered
        if (currentNumber === "0") {
          setCurrentNumber(key);
          break;
        }
        // Stop new numbers from being added onto screen when equals sign is pressed for solution
        if (currentNumber === solution && sign === "=") {
          return;
        }
        // Stop new numbers from replacing 0 if the solution was 0 to begin with
        if (currentNumber && solution === "0" && sign === "=") {
          return;
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
        // Stop new decimal from being added onto screen when equals sign is pressed for solution
        if (currentNumber === solution && sign === "=") {
          return;
        }
        // If screen already displays number with decimal
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
        // If equals sign was pressed and user wishes to continue equating solution number
        if (sign === "=" && solution) {
          setPriorNumber(solution);
          setCurrentNumber("0");
          setSign(key);
          if (key === "x") {
            setSign("*");
          }
          break;
        }
        // If key entered is multiplication, change "x" to "*"
        if (key === "x") {
          if (priorNumber && sign && currentNumber) {
            setSign("*");
            setPriorSign("*");
            setSolution(evaluate(priorNumber + sign + currentNumber));
            setPriorNumber(evaluate(priorNumber + sign + currentNumber));
            setCurrentNumber("0");
            break;
          }
          setSign("*");
          setPriorSign("*");
          setPriorNumber(currentNumber);
          setCurrentNumber("0");
          break;
        }
        // If user tries to divide number by 0, return error screen
        if (priorNumber && key === "/" && currentNumber === "0") {
          setCurrentNumber("Error, Cannot Divide By 0");
          break;
        }
        // If equation is continuous and equals button not pressed
        if (priorNumber && sign && currentNumber) {
          setSolution(evaluate(priorNumber + sign + currentNumber));
          setPriorNumber(evaluate(priorNumber + sign + currentNumber));
          setCurrentNumber("0");
          setPriorSign(key);
          setSign(key);
          break;
        }
        // sets sign to whichever sign button was pressed and saves the prior number to move onto current
        setSign(key);
        setPriorSign(key);
        setPriorNumber(currentNumber);
        setCurrentNumber("0");
        break;
      // Case for when evaluating given equation
      case "=":
        if (priorNumber && sign === "/" && currentNumber === "0") {
          setCurrentNumber("Error, Cannot Divide By 0");
          break;
        }
        // Prevent syntax error when pressing equals button again
        if (currentNumber === solution && sign === "=") {
          return;
        }
        setCurrentNumber(`${evaluate(priorNumber + sign + currentNumber)}`);
        setSolution(`${evaluate(priorNumber + sign + currentNumber)}`);
        setSign(key);
    }
    // Reset active button once animation is complete
    setTimeout(() => setActiveButton(""), 200);
  };

  // Funciton for when a key is pressed and to assign each key press to each appropriate button
  const handleKeyDown = (e: KeyboardEvent) => {
    // If statement for each specified key press
    let key = e.key;
    // If user presses lower case "c" key, screen is cleared
    if (key === "c") {
      key = "C";
    }
    // if user presses "Enter" key, result will be displayed
    if (key === "Enter") {
      key = "=";
    }
    // if user presses "*" key, it will be recognized as "x"
    if (key === "*") {
      key = "x";
    }
    // If user presses "n", convert current number to negative or positive
    if (key === "n") {
      key = "+-";
    }
    // If user presses ".", add decimal to current number (if not already 0)
    if (key === ".") {
      key = ".";
    }
    console.log(`Key Pressed: ${key}`);
    processKeystroke(key);
  };

  // useEffect will add the "keydown event listener" to the page and will remove the listener to help clean memory leaks
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <p>
        Hello! My name is Edis Rahic and thank you for checking out my first
        project using Next.js React. Please give this a try to do your homework
        or taxes, it works!
      </p>
      <Wrapper className="wrapper">
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
                isActive={btn === activeButton}
              ></Button>
            );
          })}
        </ButtonBox>
      </Wrapper>
      <Legend keyMappings={keyMappings} />
    </>
  );
}
