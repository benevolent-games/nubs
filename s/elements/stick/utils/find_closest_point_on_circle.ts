
import {V2} from "../../../tools/v2.js"

export function find_closest_point_on_circle(
		radius: number,
		[x, y]: V2,
	): V2 {

	const magnitude = Math.sqrt((x ** 2) + (y ** 2))

	return [
		x / magnitude * radius,
		y / magnitude * radius,
	]
}
