
import {Bindings} from "./types/bindings.js"
import {jsonStorageProxy} from "../tools/json-storage.js"

export class BindingsStore {
	name: string = "default"

	#json: {[key: string]: any | undefined}

	get #storageKey() {
		return `nub_bindings_${this.name}`
	}

	constructor(storage: Storage) {
		this.#json = jsonStorageProxy(storage)
	}

	get bindings(): Bindings | undefined {
		return this.#json[this.#storageKey]
	}

	set bindings(b: Bindings | undefined) {
		this.#json[this.#storageKey] = b
	}
}
