
import {V2} from "./tools/v2.js"

export namespace Nub {

	export enum Type {
		Key,
		Mouse,
		Vector2,
	}

	export namespace Data {
		export interface Key {
			code: string
			pressed: boolean
		}
		export interface Mouse {
			clientX: number
			clientY: number
			movementX: number
			movementY: number
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
		export type Mouse = Base & Data.Mouse & {type: Type.Mouse}
		export type Vector2 = Base & Data.Vector2 & {type: Type.Vector2}
		export type Any = Mouse | Key | Vector2
	}
}

export interface Bindings {

	/** comments */
	"👼": string[]

	/** mouse action bindings */
	"🖱️": {
		[action: string]: string[]
	}

	/** vector2 action bindings */
	"🕹️": {
		[action: string]: string[]
	}

	/** key action bindings.. [channelName, ...keyCodes][] */
	"*️⃣": {
		[action: string]: string[][]
	}
}

type ActionGroup<xDetail extends Nub.Detail.Any> = {[action: string]: xDetail | undefined}

export interface Actions {
	key: ActionGroup<Nub.Detail.Key>
	mouse: ActionGroup<Nub.Detail.Mouse>
	vector2: ActionGroup<Nub.Detail.Vector2>
}
