
import {AssignKeybind} from "../types.js"
import {Bindings} from "../../../bindings/types.js"
import {NubContext} from "../../context/element.js"

export function prepareAssignKeybind(context: NubContext): AssignKeybind {
	return function assignKeyBind(
			action: string,
			keyIndex: number,
			code: string,
		) {

		const bindings = <Bindings>structuredClone(context.getBindings())
		const notRedundant = !bindings.key[action].some(c => c === code)

		if (notRedundant) {
			const isEscapeKey = code === "Escape"

			if (isEscapeKey)
				bindings.key[action].splice(keyIndex, 1)
			else
				bindings.key[action][keyIndex] = code

			context.updateBindings(bindings)
		}
	}
}
