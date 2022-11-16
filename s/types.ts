
import {V2} from "./tools/v2.js"

export namespace Nub {

	export enum Type {
		Key,
		Vector2,
	}

	export namespace Data {
		export interface Key {
			code: string
			pressed: boolean
		}
		export interface Vector2 {
			vector: V2
		}
	}

	export namespace Detail {
		export interface Base {
			type: Type
			channels: string[]
		}
		export type Key = Base & Data.Key & {type: Type.Key}
		export type Vector2 = Base & Data.Vector2 & {type: Type.Vector2}
		export type Any = Key | Vector2
	}
}

export interface Bindings {

	/** comments */
	"👼": string[]

	/** vector2 action bindings */
	"🕹️": {
		[key: string]: string[]
	}

	/** key action bindings */
	"*️⃣": {
		[key: string]: string[][]
	}
}
