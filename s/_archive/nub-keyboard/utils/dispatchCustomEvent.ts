export const dispatchCustomEvent = (element: HTMLElement, data: any) => {
		const newEvent = new CustomEvent("nub-input", {
			bubbles: true,
			cancelable: false,
			composed: true,
			detail: data
		})
		element.dispatchEvent(newEvent)
}
