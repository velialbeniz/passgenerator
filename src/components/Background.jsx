import React from "react";
import { useState } from "react";

function Background() {

    const [color, setColor] = useState("")
    function changeColor() {
        let currentColor = color
        currentColor = Math.floor(Math.random()*16777215).toString(16);
        setColor(currentColor)
        console.log(currentColor)
        console.log(color)
    }
	return (
        <div className={`h-screen bg-[#${color}] min-w-full flex items-center justify-center duration-200`} style={{backgroundColor: `#${color}`}}>
            <button onClick={changeColor} className="rounded-md bg-green-300 p-3">Change color</button>
		</div>
	);
}

export default Background;
