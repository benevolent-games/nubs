
import {V2} from "../../../tools/v2.js"

export function stick_vector_to_pixels(
		radius: number | undefined,
		[x, y]: V2,
	) {

	return radius !== undefined
		? [(x * radius), -(y * radius)]
		: [0, 0]
}
