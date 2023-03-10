
export function on_element_resize(
		element: HTMLElement,
		resize: () => void
	) {

	new ResizeObserver(resize).observe(element)

}
