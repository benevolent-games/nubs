
import {AssignKeybind} from "../types.js"
import {Bindings} from "../../../types.js"
import {NubContext} from "../../context/element.js"

export function prepareAssignKeybind(context: NubContext): AssignKeybind {
	return function assignKeyBind(
			action: string,
			keyIndex: number,
			code: string,
		) {

		const bindings = <Bindings>structuredClone(context.getBindings())
		const notRedundant = !bindings["*️⃣"][action].some(c => c === code)

		if (notRedundant) {
			const isEscapeKey = code === "Escape"

			if (isEscapeKey)
				bindings["*️⃣"][action].splice(keyIndex, 1)
			else
				bindings["*️⃣"][action][keyIndex] = code

			context.updateBindings(bindings)
		}
	}
}
