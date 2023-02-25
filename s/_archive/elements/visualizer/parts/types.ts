
import {Nub} from "../../../types.js"
import {V2} from "../../../tools/v2.js"

export namespace Stats {
	export interface Key {
		time: number
		detail: Nub.Detail.Key & {action: string}
	}
	export interface Mouse {
		movement: V2
		position: V2
	}
	export interface Vector2 {
		vector: V2
	}
}

export interface RecentKeyStats {
	[action: string]: Stats.Key
}
