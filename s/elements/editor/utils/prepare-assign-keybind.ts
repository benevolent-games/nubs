
import {AssignKeybind} from "../types.js"
import {NubContext} from "../../context/element.js"
import {Bindings} from "../../context/bindings/types/bindings.js"

export function prepareAssignKeybind(context: NubContext): AssignKeybind {
	return function assignKeyBind(
			action: string,
			keyIndex: number,
			code: string,
		) {

		const {bindings} = context

	// 	const bindings = <Bindings>structuredClone(context.bindings)
	// 	const notRedundant = !bindings.key[action].some(c => c === code)

	// 	if (notRedundant) {
	// 		const isEscapeKey = code === "Escape"

	// 		if (isEscapeKey)
	// 			bindings.key[action].splice(keyIndex, 1)
	// 		else
	// 			bindings.key[action][keyIndex] = code

	// 		context.bindings = bindings
	// 	}

	}
}
