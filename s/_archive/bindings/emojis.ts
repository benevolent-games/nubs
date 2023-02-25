
import {Bindings} from "./types.js"

export const emojiCodes: {[P in keyof Bindings]: readonly number[]} = {

	// 👼
	comment: [
		128124, // U+1F579 baby angel
	],

	// *️⃣
	key: [
		42, // U+002A asterisk
		65039, // U+FE0F variation selector 16
		8419, // U+20E3 combining enclosing keycap
	],

	// 🖱
	mouse: [
		128433, // U+1F5B1 three button mouse
	],

	// 🕹️
	vector2: [
		128377, // U+1F579 joystick
	],
} as const

export const emojis: {[P in keyof Bindings]: string} = <any>Object.fromEntries(
	Object
		.entries(emojiCodes)
		.map(([channelName, decimals]) => [
			channelName,
			String.fromCodePoint(...decimals),
		])
)
