
import {Bindings} from "../../../bindings/types.js"

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
	"comment": [
		" Cool Default Bindings"
	],
	"mouse": {
		"look": ["lookmouse"]
	},
	"vector2": {
		"look": ["lookstick"],
		"move": ["movestick"]
	},
	"key": {
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
