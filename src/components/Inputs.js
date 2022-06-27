import React from "react";
import { useState, useRef } from "react";
import { BiCopy } from "react-icons/bi";

function Inputs() {
  const lowercase = useRef(null);
  const uppercase = useRef(null);
  const numberInput = useRef(null);
  const specialInput = useRef(null);
  const passwordLengthInput = useRef(null);

  let options = {
    lowercase: true,
    uppercase: false,
    numbers: false,
    special_c: false,
    password_length: 8,
  };

  const [inputs, setInputs] = useState(options);
  const [password, setPassword] = useState("");

  let letters = [];
  let numbersArray = [];
  let specials = [];

  const special_c = "[!@#$%^&*()_+-=[]{};:|,.<>/?]+";

  for (let index = 0; index < 10; index++) {
    numbersArray.push(index);
  }

  for (let char = 10; char < 36; char++) {
    let letter = char.toString(36);
    letters.push(letter);
  }

  for (let index = 0; index < special_c.length; index++) {
    const character = special_c.charAt(index);
    specials.push(character);
  }

  function createPassword() {
    let password = "";
    let { uppercase, numbers, special_c, password_length } = inputs;

    function setCharAt(str, index, chr) {
      if (index > str.length - 1) return str;
      return str.substring(0, index) + chr + str.substring(index + 1);
    }

    for (let index = 0; index < password_length; index++) {
      let random = Math.floor(Math.random() * letters.length);
      password += letters[random];
    }

    if (uppercase) {
      console.log(uppercase);
      for (let index = 0; index < password_length / 3; index++) {
        let random = Math.floor(Math.random() * password.length);
        let upper = password.charAt(random).toUpperCase();
        password = setCharAt(password, random, upper);
      }
    }

    if (numbers) {
      let random = Math.floor(Math.random() * password.length);
      let random2 = Math.floor(Math.random() * numbersArray.length);
      password = setCharAt(password, random, random2);
    }

    if (special_c) {
      let random = Math.floor(Math.random() * password.length);
      let random2 = Math.floor(Math.random() * specials.length);
      password = setCharAt(password, random, specials[random2]);
    }

    setPassword(password);
  }

  function copyPasswordToClipboard(){
    navigator.clipboard.writeText(password);
  }

  return (
    <div>
      <div className="generator">
        <h3 className="title">Password Generator</h3>
        <form action="#" className="inputs">
          <div className="input-group">
            <label htmlFor={"lowercase"}>Lowercase letters</label>
            <input
              type={"checkbox"}
              name={"lowercase"}
              ref={lowercase}
              checked={inputs.lowercase}
              disabled
            />
          </div>
          <div className="input-group">
            <label htmlFor={"uppercase"}>Uppercase letters</label>
            <input
              type={"checkbox"}
              name={"uppercase"}
              ref={uppercase}
              onChange={() => {
                setInputs({ ...inputs, uppercase: uppercase.current.checked });
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor={"numbers"}>Numbers</label>
            <input
              type={"checkbox"}
              name={"numbers"}
              ref={numberInput}
              onChange={() => {
                setInputs({ ...inputs, numbers: numberInput.current.checked });
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor={"special_c"}>Special Characters</label>
            <input
              type={"checkbox"}
              name={"special_c"}
              ref={specialInput}
              onChange={() => {
                setInputs({
                  ...inputs,
                  special_c: specialInput.current.checked,
                });
              }}
            />
          </div>
          <div className="input-group2">
            <label htmlFor={"password_length"}>
              How long password do you need?
            </label>
            <div className="range">
              <input
                type={"range"}
                name={"password_length"}
                min={6}
                max={32}
                ref={passwordLengthInput}
                defaultValue={8}
                onChange={() => {
                  setInputs({
                    ...inputs,
                    password_length: passwordLengthInput.current.value,
                  });
                }}
              />
              <span>{inputs.password_length}</span>
            </div>
          </div>
          <button
            className="generate"
            onClick={(event) => {
              event.preventDefault();
              createPassword();
            }}
          >
            Generate
          </button>
        </form>
      </div>
      <div>
        <div className="show">
          <div className="copypassword">
            <h4>Your password</h4>
            <button onClick={()=>{copyPasswordToClipboard()}}>
              <BiCopy></BiCopy>
            </button>
          </div>
          <div>
              <h1>{password}</h1>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Inputs;
