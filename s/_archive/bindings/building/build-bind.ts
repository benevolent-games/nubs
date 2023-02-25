
import {Binds} from "../types.js"

export function buildBind(emoji: string, binds: Binds) {
	return Object
		.entries(binds)
		.map(([action, items]) => `${emoji} ${action} :: ${items.join(" ")}`)
}
