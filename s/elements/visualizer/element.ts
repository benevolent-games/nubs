
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {Nub} from "../../types.js"
import {V2} from "../../tools/v2.js"
import {NubAction} from "../../main.js"

import styles from "./styles.css.js"
import {nubActionSwitch} from "../../tools/nub-switch.js"

export namespace Stats {
	export interface Key {
		time: number
		detail: Nub.Detail.Key & {action: string}
	}
	export interface Mouse {
		movement: V2
		position: V2
	}
	export interface Vector2 {
		vector: V2
	}
}

export interface RecentKeyStats {
	[action: string]: Stats.Key
}

export const NubVisualizer = element<{
		name: string
	}>({
		styles,
		shadow: true,
		properties: {
			name: {type: String, reflect: true},
		},
	}).render(use => {

	const [recentKeyStats, setRecentKeyStats, getRecentKeyStats] = (
		use.state<RecentKeyStats>({})
	)

	const [statsForMouse, setStatsForMouse] = (
		use.state<Stats.Mouse>(() => ({
			movement: [0, 0],
			position: [0, 0],
		}))
	)

	const [statsForVector2, setStatsForVector2] = (
		use.state<Stats.Vector2>(() => ({
			vector: [0, 0],
		}))
	)

	use.setup(() => {
		function listener(e: Event) {
			nubActionSwitch(<NubAction>e, {
				key: event => {
					setRecentKeyStats({
						...getRecentKeyStats(),
						[event.detail.action]: {
							time: Date.now(),
							detail: event.detail,
						},
					})
				},
				mouse(event) {
					setStatsForMouse({
						movement: event.detail.movement,
						position: event.detail.position,
					})
				},
				vector2(event) {
					setStatsForVector2({
						vector: event.detail.vector,
					})
				},
			})
		}

		window.addEventListener("nub_action", listener)

		return () => {
			window.removeEventListener("nub_action", listener)
		}
	})

	return html`
		<div class=coordinatesbar>
			<p>
				<strong>mouse  </strong>
				<span>${printVector2(statsForMouse.movement)}</span>
				<span>${printVector2(statsForMouse.position)}</span>
			</p>
			<p>
				<strong>vector2</strong>
				<span>${printVector2(statsForVector2.vector)}</span>
			</p>
		</div>
		<ul class=keystats>
			${Object
				.entries(recentKeyStats)
				.filter(([,stats]) => stats.detail.pressed)
				.map(([action, stats]) => html`
					<li data-action="${action}">
						<strong>${action}</strong>
						<span>${stats.detail.code}</span>
					</li>
				`)}
		</ul>
	`
})

function printCoordinate(a: number) {
	return a.toFixed(2).padStart(8, " ")
}

function printVector2([x, y]: V2) {
	return `[${printCoordinate(x)}, ${printCoordinate(y)}]`
}
