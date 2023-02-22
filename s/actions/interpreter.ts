
import {Nub} from "../types.js"
import {NubInputEvent} from "../events/input.js"

export type CoolActionReports = {
	[action: string]: Nub.Detail.Any
}

export type CoolActions = {
	[kind: string]: CoolActionReports
}

export type CoolBinds = {
	[action: string]: string[]
}

export type CoolKinds = {
	[kind: string]: CoolBinds
}

export type CoolBindings = {
	[mode: string]: CoolKinds
}

export function makeActionSystem({}: {
		initialBindings: CoolBindings
	}) {

	return {
		actions: {},
		setBindings() {},
	}
}

export class Interpreter {
	#actions: CoolActions = {}
	#onAction: (detail: Nub.Detail.Action) => void = () => {}
	
	bindings: CoolBindings = {}
	modes = new Set<string>()
	dispose = () => {}

	getAction(kind: string, name: string) {
		return this.#actions[kind][name]
	}

	#findActionsForInputName(kind: string, name: string) {
		const actions = new Set<string>()

		for (const mode of this.modes) {
			const kindbinds = this.bindings[mode] ?? {}
			const binds = kindbinds[kind] ?? {}
			for (const [action, bindlist] of Object.entries(binds)) {
				const isMatch = bindlist.includes(name)
				if (isMatch)
					actions.add(action)
			}
		}

		return [...actions]
	}

	#translateInputIntoAction = ({detail}: NubInputEvent) => {
		const {kind, name} = detail
		const matchingActions = this.#findActionsForInputName(kind, name)

		if (!this.#actions.hasOwnProperty(kind))
			this.#actions[kind] = {}

		for (const action of matchingActions) {
			this.#actions[kind][action] = detail
			this.#onAction({...detail, action})
		}
	}

	constructor({modes, bindings, eventTarget, onAction}: {
			modes: string[]
			bindings: CoolBindings
			eventTarget: EventTarget
			onAction: (detail: Nub.Detail.Action) => void
		}) {

		this.bindings = bindings
		this.#onAction = onAction

		for (const mode of modes)
			this.modes.add(mode)

		this.dispose = NubInputEvent
			.target(eventTarget)
			.listen(({detail: {name, type}}) => {
				const lol = name
			})
	}
}
