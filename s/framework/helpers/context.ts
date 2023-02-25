
import {dashify} from "@chasemoskal/magical"
import {NubContext2} from "../../elements/context2/element.js"

const tag = dashify(NubContext2.name)

export function setupContextGetter(element: HTMLElement) {
	let context: NubContext2 | undefined

	return () => {

		if (context)
			return context

		else {
			context = element.closest<NubContext2>(tag) ?? undefined

			if (!context)
				throw new Error(`unable to find <${tag}>`)

			return context
		}
	}
}
