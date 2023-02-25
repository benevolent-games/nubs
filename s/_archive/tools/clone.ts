
export function clone<X>(x: X): X {
	return structuredClone(x)
}
