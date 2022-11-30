
import {Bindings} from "../../../types.js"

export const defaultBindingsText = () => `
👼 Cool Default Bindings
🖱 look :: lookmouse
🕹️ look :: lookstick
🕹️ move :: movestick
*️⃣ forward :: KeyW ArrowUp
*️⃣ backward :: KeyS ArrowDown
*️⃣ leftward :: KeyA ArrowLeft
*️⃣ rightward :: KeyD ArrowRight
*️⃣ jump :: Space
*️⃣ use :: KeyF Mouse3
*️⃣ primary :: Mouse1
*️⃣ secondary :: Mouse2
`.trim()

export const defaultBindings: Bindings = {
	"👼": [
		"Cool Default Bindings"
	],
	"🖱": {
		"look": ["lookmouse"]
	},
	"🕹️": {
		"look": ["lookstick"],
		"move": ["movestick"]
	},
	"*️⃣": {
		"forward": ["KeyW", "ArrowUp"],
		"backward": ["KeyS", "ArrowDown"],
		"leftward": ["KeyA", "ArrowLeft"],
		"rightward": ["KeyD", "ArrowRight"],
		"jump": ["Space"],
		"use": ["KeyF", "Mouse3"],
		"primary": ["Mouse1"],
		"secondary": ["Mouse2"]
	}
}
