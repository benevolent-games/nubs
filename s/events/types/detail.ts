
import {V2} from "../../tools/v2.js"

export namespace NubDetail {
	export type Kind = "key" | "pointer" | "stick"

	export interface Base {
		kind: Kind
		cause: string
	}

	export interface Key extends Base {
		kind: "key"
		pressed: boolean
		is_a_modifier?: boolean
	}

	export interface Pointer extends Base {
		kind: "pointer"
		movement: V2
		position: V2
	}

	export interface Stick extends Base {
		kind: "stick"
		vector: V2
	}

	export type Any = Key | Pointer | Stick
	export type Effect<D extends Any = Any> = D & {effect: string}
}
