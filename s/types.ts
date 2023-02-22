
import {V2} from "./tools/v2.js"

export namespace Nub {

	export type Kind = "key" | "mouse" | "vector2"

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
			movement: V2
			position: V2
		}
		export interface Vector2 {
			vector: V2
		}
	}

	export namespace Detail {
		export interface Base {
			type: Type
			kind: Kind
			name: string
		}
		export type Key = Base & Data.Key & {
			kind: "key"
			type: Type.Key
		}
		export type Mouse = Base & Data.Mouse & {
			kind: "mouse"
			type: Type.Mouse
		}
		export type Vector2 = Base & Data.Vector2 & {
			kind: "vector2"
			type: Type.Vector2
		}
		export type Any = Mouse | Key | Vector2
		export type Action = Any & {action: string}
	}
}

type ActionGroup<xDetail extends Nub.Detail.Any> = {[action: string]: xDetail | undefined}

export interface Actions {
	key: ActionGroup<Nub.Detail.Key>
	mouse: ActionGroup<Nub.Detail.Mouse>
	vector2: ActionGroup<Nub.Detail.Vector2>
}
