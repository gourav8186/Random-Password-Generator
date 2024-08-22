import { useState } from "react";
import "./App.css";
import tick from "./assets/tick.svg";
import copy from "./assets/copy.svg";

function App() {
  const [options, setOptions] = useState({
    length: "",
    uppercase: false,
    lowercase: false,
    number: false,
    symbols: false,
    isError: false,
  });
  const [isError, setIsError] = useState({ type: "", message: "" });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState("");

  let password = "";
  const generateRandomPassword = () => {
    setIsError({ type: "", message: "" });

    // Validation
    if (!options?.length) {
      setIsError({
        type: "length",
        message: "Please enter the length of your password.",
      });
      return;
    }
    if (options.length < 5 || options.length > 16) {
      setIsError({
        type: "length",
        message: "Password length should be between 5 and 16 characters.",
      });
      return;
    }
    if (
      !options?.uppercase &&
      !options?.lowercase &&
      !options?.number &&
      !options?.symbols
    ) {
      setIsError({
        type: "checkbox",
        message:
          "Please select at least one option (uppercase, lowercase, number, or symbols).",
      });
      return;
    }

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbercaseChars = "1234567890";
    const symbolscaseChars = '!@#$%^&*()_+-=|:;"<>,.?/~';

    let passwordChars = "";

    if (options.uppercase) {
      passwordChars += uppercaseChars;
    }
    if (options.lowercase) {
      passwordChars += lowercaseChars;
    }
    if (options.number) {
      passwordChars += numbercaseChars;
    }

    if (options.symbols) {
      passwordChars += symbolscaseChars;
    }

    const passwordLength = options.length;

    // Random password generate program
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * passwordChars.length);
      password += passwordChars[randomIndex];
    }
    setGeneratedPassword(password);
  };

  // Password Copy function
  const handleCopy = () => {
    setCopied(generatedPassword);
    navigator.clipboard.writeText(generatedPassword);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <p className="title">Generate Random Password</p>
        </div>
        <div className="card-body">
          <label>Password lenght</label>
          <input
            type="number"
            value={options.length}
            onChange={({ target }) => {
              setOptions({ ...options, length: target.value });
            }}
            name="confirmPassword"
            placeholder="Password length"
          />
          <div className="row">
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="languages"
                id="uppercase"
                checked={options.uppercase}
                onChange={() => {
                  setOptions({ ...options, uppercase: !options.uppercase });
                }}
              />
              <label htmlFor="uppercase">Uppercase</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="languages"
                id="lowercase"
                checked={options.lowercase}
                onChange={() => {
                  setOptions({ ...options, lowercase: !options.lowercase });
                }}
              />
              <label htmlFor="lowercase">Lowercase</label>
            </div>
          </div>
          <div className="row">
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="languages"
                id="number"
                checked={options.number}
                onChange={() => {
                  setOptions({ ...options, number: !options.number });
                }}
              />
              <label htmlFor="number">Number</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="languages"
                id="symbols"
                checked={options.symbols}
                onChange={() => {
                  setOptions({ ...options, symbols: !options.symbols });
                }}
              />
              <label htmlFor="symbols">Symbols</label>
            </div>
          </div>
          {isError.message && <span className="error">{isError.message}</span>}
          <button className="btn" onClick={generateRandomPassword}>
            Generate Password
          </button>
        </div>
      </div>
      {generatedPassword && (
        <div className="password">
          <label>Generated Password</label>
          <div className="generatedpassword">
            <p>{generatedPassword}</p>
            <div className="copy-password" onClick={handleCopy}>
              <img
                src={copied === generatedPassword ? tick : copy}
                width={20}
                height={20}
                alt="copy icon"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
