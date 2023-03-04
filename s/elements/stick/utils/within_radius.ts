
import {V2} from "../../../tools/v2.js"

export function within_radius(radius: number, [x, y]: V2) {
	return (x ** 2) + (y ** 2) < (radius ** 2)
}
