import {attachEvents} from "../../../tools/attach-events.js"
import {LitListener} from "../../../tools/lit-listener.js"
import {NubStickpad} from "../../stickpad/element.js"
import {NubStick} from "../element.js"
import {BaseEvents} from "./prep-base-events.js"

export function setupBaseEvents(
	nubStick: NubStick | NubStickpad,
	baseEvents: BaseEvents)
{
	return () => attachEvents(nubStick, {
		mousedown: baseEvents.mousedown,
		touchstart: baseEvents.touchstart,
		touchmove: baseEvents.touchmove,
		touchend: baseEvents.touchend
	})
}
