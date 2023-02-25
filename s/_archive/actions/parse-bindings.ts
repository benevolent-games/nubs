
import {Bindings} from "./types/bindings.js"

export function parseBindings(text: string | undefined) {
	try {
		return text
			? JSON.parse(text) as Bindings
			: undefined
	}
	catch (error) {
		console.warn("failed to parse bindings")
	}
}
