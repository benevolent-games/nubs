
export const makeQueryFunction = (element: HTMLElement) => () => ({
	element,
	draggableItem: element.shadowRoot!.querySelector(".draggable-item")!,
})
