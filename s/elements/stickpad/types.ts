import {StateSetter} from "@chasemoskal/magical"
import {NubStickpad} from "./element.js"

export interface StickpadStarters {
	stickPad: NubStickpad;
	setStick: StateSetter<boolean>;
	setCenterPosition: (e: PointerEvent) => void;
}
