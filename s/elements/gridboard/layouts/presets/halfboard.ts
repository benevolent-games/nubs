
import {KeyLayout} from "../key-layout.js"

export const halfboard = [
	[
		["~", "Backquote"],
		["1", "Digit1"],
		["2", "Digit2"],
		["3", "Digit3"],
		["4", "Digit4"],
		["5", "Digit5"],
	],
	[
		["tab", "Tab"],
		["q", "KeyQ"],
		["w", "KeyW"],
		["e", "KeyE"],
		["r", "KeyR"],
		["t", "KeyT"],
	],
	[
		["caps", "CapsLock"],
		["a", "KeyA"],
		["s", "KeyS"],
		["d", "KeyD"],
		["f", "KeyF"],
		["g", "KeyG"],
	],
	[
		["shift", "ShiftLeft"],
		["z", "KeyZ"],
		["x", "KeyX"],
		["c", "KeyC"],
		["v", "KeyV"],
		["b", "KeyB"],
	],
	[
		["ctrl", "ControlLeft"],
		["meta", "MetaLeft"],
		["alt", "AltLeft"],
		["space", "Space"],
	],
] satisfies KeyLayout
