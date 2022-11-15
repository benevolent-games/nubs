
import {V2} from "./tools/v2.js"

export namespace Nub {
	export enum Type {
		Key,
		Vector2,
	}
	export namespace Detail {
		export interface Base {
			type: Type
			channels: string[]
		}
		export interface Key extends Base {
			type: Type.Key
			key: string
			pressed: boolean
		}
		export interface Vector2 extends Base {
			type: Type.Vector2
			vector: V2
		}
		export type Any = Key | Vector2
	}
}
