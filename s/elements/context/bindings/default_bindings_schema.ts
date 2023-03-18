
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
			open_menu: {causes: ["KeyQ", "Backquote"]},

			move_forward: {causes: ["KeyE", "ArrowUp"]},
			move_backward: {causes: ["KeyD", "ArrowDown"]},
			move_leftward: {causes: ["KeyS", "ArrowLeft"]},
			move_rightward: {causes: ["KeyF", "ArrowRight"]},

			move_fast: {causes: ["KeyA"]},
			move_slow: {causes: ["KeyZ"]},

			jump: {causes: ["Space"]},
			use: {causes: ["KeyG", "Mouse3"]},
			primary: {causes: ["Mouse1"]},
			secondary: {causes: ["Mouse2"]},

			look_up: {causes: ["KeyI"]},
			look_down: {causes: ["KeyK"]},
			look_left: {causes: ["KeyJ"]},
			look_right: {causes: ["KeyL"]},

			look_fast: {causes: ["Slash"]},
			look_slow: {causes: ["Semicolon"]},
		},
	},
	menu: {
		key: {
			close_menu: {causes: ["KeyQ", "Backquote"]},
		},
	},
} satisfies BindingsSchema
