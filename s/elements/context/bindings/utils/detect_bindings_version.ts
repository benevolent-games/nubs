import {Bindings1, Bindings2} from "../types/bindings.js"

export function detect_bindings_version(bindings: Bindings1 | Bindings2) {
	if (!bindings.version || typeof bindings.version !== "number")
		return 1
	else
		return bindings.version
}
