
import {LitElement} from "lit"
import {Actions} from "../../../types.js"
import {makeActionsMemory} from "./actions-memory.js"

export function stateForActions(element: LitElement & {actions: Actions}) {
	const memory = makeActionsMemory()
	element.actions = memory.readable
	return memory.writable
}
