
import {emojis} from "./emojis.js"
import {Bindings} from "./types.js"
import {buildBind} from "./building/build-bind.js"
import {buildComment} from "./building/build-comment.js"

export function buildBindings(bindings: Bindings) {
	return [
		...bindings.comment.map(buildComment),
		...buildBind(emojis.mouse, bindings.mouse),
		...buildBind(emojis.vector2, bindings.vector2),
		...buildBind(emojis.key, bindings.key),
	].flat().join("\n")
}
