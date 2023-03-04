
import {V2} from "../../../tools/v2.js"
import {NubDetail} from "../../../events/types/detail.js"

export namespace Stats {
	export interface Key {
		time: number
		detail: NubDetail.Key & {effect: string}
	}
	export interface Pointer {
		movement: V2
		position: V2
	}
	export interface Stick {
		vector: V2
	}
}

export interface RecentKeyStats {
	[effect: string]: Stats.Key
}
