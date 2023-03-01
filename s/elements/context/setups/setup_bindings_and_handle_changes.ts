
import {clone} from "../../../tools/clone.js"
import {Bindings} from "../bindings/types/bindings.js"

type OnBindingsChange = (bindings: Bindings) => void

export function setup_bindings_and_handle_changes(onChange: OnBindingsChange) {
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
