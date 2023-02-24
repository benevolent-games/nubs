
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {Nub} from "../types.js"
import {Bindings} from "./types/bindings.js"
import {NubInputEvent} from "../events/input.js"
import {ActionContext} from "./action-context.js"
import {NubActionEvent} from "../events/action.js"
import {NubBindingsEvent} from "../events/bindings.js"
import {setupContextController} from "./context-controller.js"
import {ReadableSet} from "../tools/regulated-set/types/readable-set.js"
import {interpretInputEventsAsActions} from "./interpret-input-events-as-actions.js"

export class NubContext2 extends LitElement {

	@property({type: String})
	["default-bindings"]: string = ""

	@property({type: String})
	["initial-modes"]: string = "default"

	#onModesChange = (modes: ReadableSet<string>) => {

	}

	// TODO bindings any
	#onBindingsChange = (bindings: any) => {
		NubBindingsEvent
			.target(this)
			.dispatch({bindings})
	}

	#onAction = (detail: Nub.Detail.Action) => {
		NubActionEvent
			.target(this)
			.dispatch(detail)
	}

	firstUpdated() {
		const bindings: Bindings = JSON.parse(this["default-bindings"])
		const modes: string[] = this["initial-modes"].split(/\s+/gm)
		const context = new ActionContext({modes, bindings})

		const controller = setupContextController({
			context,
			onModesChange: this.#onModesChange,
			onBindingsChange: this.#onBindingsChange,
		})

		NubInputEvent
			.target(this)
			.listen(interpretInputEventsAsActions({
				context,
				onAction: this.#onAction,
			}))
	}

	render() {
		return html`<slot></slot>`
	}
}
