
import {Bindings} from "./types/bindings.js"

export const default_mode = "humanoid"

export const fallback_bindings: Bindings = {
	[default_mode]: {
		"pointer": {
			"look": ["Pointer", "Lookpad"]
		},
		"stick": {
			"move": ["Stick", "Stickpad"],
			"look": ["Stick2", "Stickpad2"]
		},
		"key": {
			"open menu": ["KeyQ", "Backquote"],
			"forward": ["KeyW", "ArrowUp"],
			"backward": ["KeyS", "ArrowDown"],
			"leftward": ["KeyA", "ArrowLeft"],
			"rightward": ["KeyD", "ArrowRight"],
			"jump": ["Space"],
			"use": ["KeyF", "Mouse3"],
			"primary": ["Mouse1"],
			"secondary": ["Mouse2"]
		}
	},
	"menu": {
		"key": {
			"back": ["KeyQ"],
		},
	},
}
