
/** stop an event from bubbling up further in the dom */
export function stop<E extends Event>(fun: (event: E) => void) {
	return (event: E) => {
		event.preventDefault()
		event.stopPropagation()
		fun(event)
	}
}
