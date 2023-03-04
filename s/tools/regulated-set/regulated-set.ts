
import {obtool} from "@chasemoskal/magical"

import {Fun} from "./types/fun.js"
import {ReadableSet} from "./types/readable-set.js"
import {WritableSet} from "./types/writable-set.js"
import {OnSetChange} from "./types/on-set-change.js"
import {SetWritingFunctions} from "./types/set-writing-functions.js"

export class RegulatedSet<T> {
	#set: Set<T>
	#writing: SetWritingFunctions<T> = {
		add: (...xs) => {
			for (const x of xs)
				this.#set.add(x)
		},
		delete: x => {
			this.#set.delete(x)
		},
		clear: () => {
			this.#set.clear()
		},
		assign: items => {
			this.#set.clear()
			for (const item of items)
				this.#set.add(item)
		},
	}

	writable: WritableSet<T>
	readable: ReadableSet<T> = {
		forEach: f => this.#set.forEach(f),
		has: x => this.#set.has(x),
		array: () => [...this.#set],
	}

	constructor(set: Set<T>, onChange: OnSetChange<T>) {
		this.#set = set

		const writingFunctionsThatWillCallOnChange = (
			obtool(this.#writing)
				.map((fun: Fun) => (...args: any[]) => {
					const result = fun(...args)
					onChange(this.readable)
					return result
				})
		)

		this.writable = {
			...this.readable,
			...writingFunctionsThatWillCallOnChange,
		}
	}
}
