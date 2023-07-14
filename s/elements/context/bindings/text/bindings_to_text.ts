
import {Bindings2} from "../types/bindings.js"

export function bindings_to_text(bindings: Bindings2) {
	return JSON.stringify(bindings, undefined, " ")
}
