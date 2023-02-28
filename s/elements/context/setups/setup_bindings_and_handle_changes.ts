
import {clone} from "../../../tools/clone.js"
import {Bindings} from "../bindings/types/bindings.js"

export default function(onChange: (bindings: Bindings) => void) {
	let bindings: Bindings = {}
	const cloneBindings = () => clone(bindings)

	return {
		get bindings() {
			return bindings
		},
		set bindings(b: Bindings) {
			bindings = b
			onChange(cloneBindings())
		},
	}
}
