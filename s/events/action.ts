
import {Nub} from "../types.js"
import {event, MagicEventBase} from "@chasemoskal/magical"

type Any = Nub.Detail.Any

export class NubActionEvent
		<D extends Any = Any>
		extends MagicEventBase<D & {action: string}> {

	static type = "nub_action"
	static target = event(this).target

	static switch<R = void>(
			event: NubActionEvent,
			handlers: {
				key: (event: NubActionEvent<Nub.Detail.Key>) => R
				mouse: (event: NubActionEvent<Nub.Detail.Mouse>) => R
				vector2: (event: NubActionEvent<Nub.Detail.Vector2>) => R
			},
		): R {

		switch (event.detail.type) {
			case Nub.Type.Key: return handlers.key(<any>event)
			case Nub.Type.Mouse: return handlers.mouse(<any>event)
			case Nub.Type.Vector2: return handlers.vector2(<any>event)
		}
	}
}
