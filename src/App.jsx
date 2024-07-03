import { useState, useCallback, useEffect, useRef } from "react";

function App() {
    
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState("");
	const [isCoppied, setIsCoppied] = useState(false);

    const passwordRef = useRef(null)

	const generatePassword = useCallback(() => {
		let pass = "";
		let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

		if (numberAllowed) str += "0123456789";
		if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

		for (let i = 0; i < length; i++) {
			const char = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, numberAllowed, charAllowed]);

	const copyPasswordToClipboard = () => {
		setIsCoppied((current) => !current);
		setTimeout(() => {
			setIsCoppied(false);
		}, 1000);
        passwordRef.current.select()
		navigator.clipboard.writeText(password);
	};

	useEffect(() => {
		generatePassword();
	}, [length, numberAllowed, charAllowed]);

	return (
		<div className="w-full p-16 max-w-md mx-auto shadow-md rounded-md px-4 my-8 bg-gray-600 text-orange-500">
			<h1 className="text-white text-center">Password Generator</h1>
			<div className="flex rounded-lg overflow-hidden mb-4">
				<input
					type="text"
					value={password}
					className="outline-none w-full py-1 px-3"
					placeholder="password"
					readOnly
                    ref={passwordRef}
				/>
				<button
					onClick={copyPasswordToClipboard}
					className="outline-none bg-blue-500 text-white px-3 py-0.5">
					Copy
				</button>
			</div>
			<div className="flex text-sm gap-x-2">
				<div className="flex items-center gap-x-1">
					<input
						type="range"
						min={6}
						max={100}
						value={length}
						onChange={(e) => setLength(e.target.value)}
						name=""
						id=""
					/>
					<label htmlFor="length">Length: {length}</label>
				</div>
				<div className="flex items-center gap-x-1">
					<input
						type="checkbox"
						defaultChecked={numberAllowed}
						onChange={(e) => setNumberAllowed((prev) => !prev)}
						name=""
						id=""
					/>
					<label htmlFor="number">Numbers</label>
				</div>
				<div className="flex items-center gap-x-1">
					<input
						type="checkbox"
						defaultChecked={charAllowed}
						onChange={(e) => setCharAllowed((prev) => !prev)}
						name=""
						id=""
					/>
					<label htmlFor="charInput">Character</label>
				</div>
			</div>
			{isCoppied ? (
				<div className="p-3 shadow-md bg-slate-50 rounded-md mt-4 transition-all duration-1000">
					<p>Coppied!</p>
				</div>
			) : null}
		</div>
	);
}

export default App;
