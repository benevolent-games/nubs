
import {Bindings} from "./types/bindings.js"

export const default_mode = "humanoid"

export const fallback_bindings: Bindings = {
	[default_mode]: {
		"mouse": {
			"look": ["lookmouse"]
		},
		"vector2": {
			"look": ["lookstick"],
			"move": ["movestick"]
		},
		"key": {
			"open_menu": ["KeyQ", "Backquote"],
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
}
