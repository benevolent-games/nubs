
import {Bindings} from "../bindings/types/bindings.js"
import {BindingsStore} from "../bindings/bindings_store.js"
import {fallback_bindings} from "../bindings/fallback_bindings.js"

export function initially_load_bindings_from_storage(
		bindings_rig: {bindings: Bindings},
		bindings_store: BindingsStore,
		context_name: string,
	) {

	bindings_store.name = context_name

	bindings_rig.bindings = (
		bindings_store.bindings
			?? fallback_bindings
	)
}
