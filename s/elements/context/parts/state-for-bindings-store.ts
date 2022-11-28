
import {Bindings} from "../../../types.js"
import {jsonStorage} from "../../../tools/json-storage.js"

export function stateForBindingsStore(
		storage: Storage,
		name: string = "1",
	) {

	return () => {
		const key = `nubs_bindings_${name}`
		const json = jsonStorage(storage)

		return {
			save: (bindings: Bindings) =>
				json.setItem<Bindings>(key, bindings),

			load: () =>
				json.getItem<Bindings>(key),
		}
	}
}
