
import {V2} from "../../../tools/v2.js"

export function printCoordinate(a: number) {
	return a.toFixed(2).padStart(8, " ")
}

export function printVector2([x, y]: V2) {
	return `[${printCoordinate(x)}, ${printCoordinate(y)}]`
}
