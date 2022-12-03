
import {emojiCodes} from "../emojis.js"
import {decimalsToHexes} from "./decimals-to-hexes.js"

export function regexForEmojiStatement() {
	const emoji = Object
		.values(emojiCodes)
		.map(decimalsToHexes)
		.map(hexes => hexes.map(hex => `\\u{${hex}}`).join(""))
		.map(hex => `(?:${hex})`)
		.join("|")

	return new RegExp(`\\s*(${emoji})(([\\s\\S](?!${emoji}))*[\\s\\S])`, "muy")
}
