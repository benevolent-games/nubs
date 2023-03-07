
import {ReadableSet} from "./types/readable-set.js"
import {WritableSet} from "./types/writable-set.js"
import {OnSetChange} from "./types/on-set-change.js"

export class RegulatedSet<X> implements WritableSet<X>, ReadableSet<X> {
	#set: Set<X>
	#on_change: (r: ReadableSet<X>) => void
	#call_change() { this.#on_change(this.readable) }

	constructor(set: Set<X>, on_change: OnSetChange<X>) {
		this.#set = set
		this.#on_change = on_change
	}

	// writing methods

	add(...items: X[]) {
		for (const x of items)
			this.#set.add(x)
		this.#call_change()
	}

	delete(item: X) {
		this.#set.delete(item)
		this.#call_change()
	}

	clear() {
		this.#set.clear()
		this.#call_change()
	}

	assign(items: X[]) {
		this.#set.clear()
		for (const item of items)
			this.#set.add(item)
		this.#call_change()
	}

	// reading methods

	forEach(f: (item: X) => void) {
		this.#set.forEach(f)
	}

	has(item: X) {
		return this.#set.has(item)
	}

	array() {
		return [...this.#set]
	}

	readable: ReadableSet<X> = {
		forEach: this.forEach.bind(this),
		has: this.has.bind(this),
		array: this.array.bind(this),
	}
}
