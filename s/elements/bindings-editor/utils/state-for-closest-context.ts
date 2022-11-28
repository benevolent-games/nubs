
import {NubContextElement} from "../../context/element.js"

export function stateForClosestContext(element: HTMLElement) {
	return () => {
		const context = element
			.closest<NubContextElement>("nub-context")

		if (!context)
			throw new Error("parental nub-context element not found")

		return context
	}
}
