
import {BindingsSchema} from "./types/bindings-schema.js"

export const default_mode = "humanoid"

export const default_bindings_schema = {
	[default_mode]: {
		pointer: {
			look: {causes: ["Pointer", "Lookpad"]},
		},
		stick: {
			move: {causes: ["Stick"]},
			look: {causes: ["Stick2"]},
		},
		key: {
			"open menu": {causes: ["KeyQ", "Backquote"]},
			"forward": {causes: ["KeyW", "ArrowUp"]},
			"backward": {causes: ["KeyS", "ArrowDown"]},
			"leftward": {causes: ["KeyA", "ArrowLeft"]},
			"rightward": {causes: ["KeyD", "ArrowRight"]},
			"jump": {causes: ["Space"]},
			"use": {causes: ["KeyF", "Mouse3"]},
			"primary": {causes: ["Mouse1"]},
			"secondary": {causes: ["Mouse2"]},
		},
	},
	menu: {
		key: {
			"menu": {causes: ["KeyQ"]},
		},
	},
} satisfies BindingsSchema
