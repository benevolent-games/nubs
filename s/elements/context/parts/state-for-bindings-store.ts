
import {BindingsStore} from "../../../bindings/types.js"
import {jsonStorage} from "../../../tools/json-storage.js"

export function stateForBindingsStore(
		storage: Storage,
		name: string = "1",
	) {

	return (): BindingsStore => {
		const key = `nubs_bindings_${name}`
		const json = jsonStorage(storage)

		return {
			save: (bindings) =>
				json.setItem(key, bindings),

			load: () =>
				json.getItem(key),
		}
	}
}
