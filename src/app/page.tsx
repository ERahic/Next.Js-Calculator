"use client";

import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

export default function Home() {
  // useState to store memory of operands entered by user
  let [currentNumber, setCurrentNumber] = useState<string>("0");
  let [priorNumber, setPriorNumber] = useState<string>("");
  let [sign, setSign] = useState<string>("");
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

  // function for when a button is pressed and to have a case for each button
  const processKeystroke = (key: string) => {
    let result;
    switch (key) {
      case "C":
        setCurrentNumber("0");
        setPriorNumber("0");
        setSign("");
        break;
      case "0":
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
        if (currentNumber.length >= 20) {
          break;
        }
        if (currentNumber === "0") {
          setCurrentNumber(key);
          break;
        }
        setCurrentNumber((x) => {
          return x + key;
        });
        break;
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
      case ".":
        if (currentNumber.includes(".")) {
          return;
        } else {
          setCurrentNumber((x) => {
            return x + key;
          });
        }
        break;
      case "%":
        setPriorNumber(currentNumber);
        setCurrentNumber("0");
        setSign("%");
        break;
      case "+":
        setPriorNumber(currentNumber);
        setCurrentNumber("0");
        setSign("+");
        break;
      case "-":
        setPriorNumber(currentNumber);
        setCurrentNumber("0");
        setSign("-");
        break;
      case "x":
        setPriorNumber(currentNumber);
        setCurrentNumber("0");
        setSign("x");
        break;
      case "/":
        setPriorNumber(currentNumber);
        setCurrentNumber("0");
        setSign("/");
        break;
      case "=":
      case ".":
        parseFloat(priorNumber);
        parseFloat(currentNumber);
        switch (sign) {
          case "%":
            result = parseFloat(priorNumber) % parseFloat(currentNumber);
            setCurrentNumber(result.toString());
            setPriorNumber(result.toString());
            break;
          case "+":
            result = parseFloat(priorNumber) + parseFloat(currentNumber);
            setCurrentNumber(result.toString());
            setPriorNumber(result.toString());
            break;
          case "-":
            result = parseFloat(priorNumber) - parseFloat(currentNumber);
            setCurrentNumber(result.toString());
            setPriorNumber(result.toString());
            break;
          case "x":
            result = parseFloat(priorNumber) * parseFloat(currentNumber);
            setCurrentNumber(result.toString());
            setPriorNumber(result.toString());
            break;
          case "/":
            if (currentNumber === "0") {
              result = "Error, cannot divide by 0";
              setCurrentNumber(result.toString());
              setPriorNumber(result.toString());
              break;
            } else {
              result = parseFloat(priorNumber) / parseFloat(currentNumber);
              setCurrentNumber(result.toString());
              setPriorNumber(result.toString());
              break;
            }
        }
    }
  };

  return (
    <>
    <p>Hello! My name is Edis Rahic and thank you for checking out my first project using Next.js React.
      Please give this a try to do your homework or taxes, it works!
    </p>
      <Wrapper>
        <Screen className="screen" value={currentNumber}></Screen>
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
    </>
  );
}
