
import {Bindings} from "./types/bindings.js"
import {extract_bindings} from "./extract_bindings.js"
import {BindingsSchema} from "./types/bindings-schema.js"
import {jsonStorageProxy} from "../../../tools/json-storage.js"
import {default_bindings_schema} from "./default_bindings_schema.js"
import {detect_bindings_version} from "./utils/detect_bindings_version.js"
import {convert_bindings_from_version_1_to_2} from "./utils/convert_bindings_from_version_1_to_2.js"

export class Bindings_Controller {
	storage_key: string = `nub_bindings`

	#schema: BindingsSchema = default_bindings_schema

	#bindings: Bindings = this.defaults

	#store: {[key: string]: any | undefined}

	#on_bindings_change: (b: Bindings) => void

	constructor({storage, on_bindings_change}: {
			storage: Storage
			on_bindings_change: (b: Bindings) => void
		}) {
		this.#store = jsonStorageProxy(storage)
		this.#on_bindings_change = on_bindings_change
	}

	get defaults() {
		return extract_bindings(this.#schema)
	}

	get schema() {
		return this.#schema
	}

	set schema(s: BindingsSchema) {
		this.#schema = s
		this.bindings = this.defaults
	}

	get bindings() {
		return this.#bindings
	}

	set bindings(b: Bindings) {
		this.#bindings = b
		this.save_to_storage()
		this.#on_bindings_change(b)
	}

	save_to_storage() {
		this.#store[this.storage_key] = this.#bindings
	}

	load_from_storage() {
		const read_bindings = (
			this.#store[this.storage_key]
				?? this.defaults
		)
		const bindings_version = detect_bindings_version(read_bindings)
		const LATEST_VERSION = 2
		if (bindings_version < LATEST_VERSION) {
			this.bindings = convert_bindings_from_version_1_to_2(read_bindings)
		} else {
			this.#bindings = read_bindings
		}
		this.#on_bindings_change(this.#bindings)
	}
}
