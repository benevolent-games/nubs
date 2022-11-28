
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

import {Bindings} from "../../../types.js"
import {NubContextElement} from "../../context/element.js"
import {NubBindingsEvent} from "../../../events/bindings.js"
import {setupEventListener} from "./setup-event-listeners.js"

export function setupListenForBindingsChanges(
		context: NubContextElement,
		setBindings: StateSetter<Bindings>,
	) {

	return () => setupEventListener(
		context,
		NubBindingsEvent,
		(e: Event) => setBindings(
			(<NubBindingsEvent>e).detail.bindings
		),
	)
}
