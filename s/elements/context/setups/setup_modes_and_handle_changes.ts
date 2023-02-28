
import {RegulatedSet} from "../../../tools/regulated-set/regulated-set.js"
import {ReadableSet} from "../../../tools/regulated-set/types/readable-set.js"

export default function(
		onChange: (modes: ReadableSet<string>) => void
	) {

	return new RegulatedSet(new Set<string>(), onChange)
}
