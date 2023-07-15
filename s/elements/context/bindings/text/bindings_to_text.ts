
import {Bindings} from "../types/bindings.js"

export function bindings_to_text(bindings: Bindings) {
	return JSON.stringify(bindings, undefined, " ")
}
