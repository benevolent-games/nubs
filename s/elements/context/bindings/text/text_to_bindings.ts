
import {Bindings2} from "../types/bindings.js"

export function text_to_bindings(text: string | undefined) {
	try {
		return text
			? JSON.parse(text) as Bindings2
			: undefined
	}
	catch (error) {
		throw new Error("invalid bindings text")
	}
}
