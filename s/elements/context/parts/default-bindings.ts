
import {Bindings} from "../../../types.js"

export const defaultBindings: Bindings = {
	"👼": [
		"Cool Default Bindings"
	],
	"🕹️": {
		"look": ["look"],
		"move": ["move"]
	},
	"*️⃣": {
		"forward": [["", "KeyW", "ArrowUp"]],
		"backward": [["", "KeyS", "ArrowDown"]],
		"leftward": [["", "KeyA", "ArrowLeft"]],
		"rightward": [["", "KeyD", "ArrowRight"]],
		"jump": [["", "Space"]],
		"use": [["", "KeyF", "Mouse3"]],
		"primary": [["", "Mouse1"]],
		"secondary": [["", "Mouse2"]]
	}
}
