import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numChoice, setNumChoice] = useState(false);
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numChoice) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numChoice, charAllowed]);

  const copypasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // auto-reset copied state
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numChoice, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-[#393E46] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-slate-400 p-6 rounded-xl shadow-md flex flex-col gap-6">
        <h1 className="text-3xl sm:text-4xl text-white text-center font-bold">
          Password Generator
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            placeholder="Generated Password"
            className="flex-1 px-4 py-2 rounded bg-slate-200 text-sm"
          />
          <button
            onClick={copypasswordtoClipboard}
            className={`px-4 py-2 rounded text-white text-sm transition ${
              copied ? "bg-slate-600" : "bg-stone-800"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label className="flex items-center gap-2 text-white text-sm w-full sm:w-auto">
            Length: {length}
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer w-full sm:w-48"
            />
          </label>

          <div className="flex gap-4 text-white text-sm">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={numChoice}
                onChange={() => setNumChoice((prev) => !prev)}
              />
              Numbers
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
