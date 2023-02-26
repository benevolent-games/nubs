
import {NubDetail} from "./types/detail.js"
import {ev, MagicEventBase} from "@chasemoskal/magical"

type Any = NubDetail.Any

export class NubEffectEvent<D extends Any = Any>
	extends MagicEventBase<D> {

	static type = "nub_effect"
	static target = ev(this).target

	static switch<R = void>(
			event: NubEffectEvent,
			handlers: {
				key: (event: NubEffectEvent<NubDetail.Key>) => R
				pointer: (event: NubEffectEvent<NubDetail.Pointer>) => R
				stick: (event: NubEffectEvent<NubDetail.Stick>) => R
			},
		): R {

		switch (event.detail.kind) {
			case "key": return handlers.key(<any>event)
			case "pointer": return handlers.pointer(<any>event)
			case "stick": return handlers.stick(<any>event)
		}
	}
}
