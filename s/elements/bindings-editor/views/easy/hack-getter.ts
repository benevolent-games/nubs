
import {Use} from "@chasemoskal/magical/x/view/types.js"

/**
 * currently, magical view use.state doesn't provide a getter.
 * this hack workaround provides a getter until a future version
 * of magical can.
 */
export function hackGetter<X>(use: Use, x: X) {
	const [hack] = use.state<{x: X}>({x: <X>undefined})
	hack.x = x
	return () => hack.x
}
