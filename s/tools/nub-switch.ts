
import {Nub} from "../types.js"
import {NubAction} from "../main.js"

export function nubActionSwitch<R = void>(
		event: NubAction,
		handlers: {
			key: (event: NubAction<Nub.Detail.Key>) => R
			mouse: (event: NubAction<Nub.Detail.Mouse>) => R
			vector2: (event: NubAction<Nub.Detail.Vector2>) => R
		},
	): R {

	switch (event.detail.type) {
		case Nub.Type.Key: return handlers.key(<any>event)
		case Nub.Type.Mouse: return handlers.mouse(<any>event)
		case Nub.Type.Vector2: return handlers.vector2(<any>event)
	}
}
