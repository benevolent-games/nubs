
export function findTouchAppleFriendly(
		pointerId: undefined | number,
		pointers: PointerEvent[],
	) {

	if (pointerId === undefined)
		return undefined

	for (const pointer of pointers) {
		if (pointer.pointerId === pointerId)
			return pointer
	}
}
