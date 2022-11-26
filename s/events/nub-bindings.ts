export class NubBindingsEvent extends CustomEvent<{}> {

	static eventName = "nub_bindings"

	constructor() {
		super(NubBindingsEvent.eventName, {
			bubbles: true,
			composed: true,
			cancelable: true,
		})
	}
}
