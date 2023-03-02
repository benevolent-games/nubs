
import {dashify} from "@chasemoskal/magical"
import {NubContext} from "../elements/context/element.js"

const tag = dashify(NubContext.name)

export function setupContextGetter(element: HTMLElement) {
	let context: NubContext | undefined

	return () => {

		if (context)
			return context

		else {
			context = element.closest<NubContext>(tag) ?? undefined

			if (!context)
				throw new Error(`unable to find <${tag}>`)

			return context
		}
	}
}
