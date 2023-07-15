
import {converter_1} from "../converters/1.js"
import {migrate_versions} from "./migrate_versions.js"
import {BindingsConverter} from "../types/bindings-converter.js"
import {Bindings, Bindings1, Bindings2} from "../types/bindings.js"

const converters = new Map<number, BindingsConverter<any, any>>()
	.set(1, converter_1)

export function migrate_bindings_to_latest_version(
		b: Bindings1 | Bindings2,
		current_version: number
	): Bindings {

	const {data} = migrate_versions<Bindings>({
		version: current_version,
		converters,
		data: b
	})

	return data
}
