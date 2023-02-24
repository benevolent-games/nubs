
import {Bindings} from "./types/bindings.js"
import {ActionContext} from "./action-context.js"
import {RegulatedSet} from "../tools/regulated-set/regulated-set.js"
import {ReadableSet} from "../tools/regulated-set/types/readable-set.js"

export function setupContextController({
		context,
		onModesChange,
		onBindingsChange,
	}: {
		context: ActionContext
		onModesChange: (modes: ReadableSet<string>) => void
		onBindingsChange: (bindings: Bindings) => void
	}) {

	const modes = new RegulatedSet(context.modes, onModesChange)

	return {
		get modes() { return modes.writable },
		get bindings() { return context.bindings },
		set bindings(b: Bindings) {
			context.bindings = b
			onBindingsChange(b)
		},
	}
}
