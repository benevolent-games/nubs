
import {NubContext} from "../element.js"
import {fallbackBindings} from "./fallback-bindings.js"
import {parseBindings} from "../../../bindings/parse.js"

export function getDefaultBindings({
		defaultBindingsJson,
		"default-bindings": defaultBindings,
	}: NubContext) {

	return defaultBindingsJson
		?? (defaultBindings
			? parseBindings(defaultBindings)
			: null)
		?? fallbackBindings
}
