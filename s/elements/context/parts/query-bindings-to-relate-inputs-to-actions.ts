
import {Bindings} from "../../../types.js"

export function queryBindingsToRelateInputsToActions(
		bindings: Bindings,
	) {

	function find(
			name: string,
			data: {[action: string]: string[]}
		) {

		const binds = Object.entries(data)
		const matchingActions = new Set<string>()

		for (const [action, names] of binds) {
			const isMatch = names.includes(name)
			if (isMatch)
				matchingActions.add(action)
		}

		return [...matchingActions]
	}

	return {
		key(code: string) {
			return find(code, bindings["*️⃣"])
		},
		mouse(name: string) {
			return find(name, bindings["🖱️"])
		},
		vector2(name: string) {
			return find(name, bindings["🕹️"])
		},
	}
}
