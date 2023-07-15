
import {converters} from "../converters/converters.js"
import {Bindings, Bindings1, Bindings2} from "../types/bindings.js"

export function migrate_bindings_to_latest_version(
		b: Bindings1 | Bindings2,
		current_version: number
	): Bindings {

	const LATEST_VERSION = 2
	let bindings = b

	for (let i = current_version; i < LATEST_VERSION; i++) {
		const converter = converters.get(i)
		if(!converter)
			break
		bindings = converter(bindings)
	}

	return bindings as Bindings
}
