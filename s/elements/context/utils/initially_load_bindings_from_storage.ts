
import {BindingsStore} from "../bindings/bindings_store.js"
import {extract_bindings} from "../bindings/extract_bindings.js"
import {Bindings_Controller} from "../bindings/bindings_controller.js"

export function initially_load_bindings_from_storage(
		bindings_controller: Bindings_Controller,
		bindings_store: BindingsStore,
	) {

	bindings_controller.bindings = (
		bindings_store.bindings
			?? extract_bindings(bindings_controller.schema)
	)
}
