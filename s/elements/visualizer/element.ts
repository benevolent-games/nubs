
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./styles.css.js"
import {printVector2} from "./parts/printing.js"
import {RecentKeyStats, Stats} from "./parts/types.js"
import {setupListeningToEffectsAndRecordingStats} from "./parts/setup-listening-to-effects-and-recording-stats.js"

@mixinCss(styles)
export class NubVisualizer extends MagicElement {

	realize() {
		const {use} = this

		const [recentKeyStats, setRecentKeyStats, getRecentKeyStats] = (
			use.state<RecentKeyStats>({})
		)

		const [statsForPointer, setStatsForPointer] = (
			use.state<Stats.Pointer>(() => ({
				movement: [0, 0],
				position: [0, 0],
			}))
		)

		const [statsForStick, setStatsForStick] = (
			use.state<Stats.Stick>(() => ({
				vector: [0, 0],
			}))
		)

		use.setup(setupListeningToEffectsAndRecordingStats({
			eventTarget: window,
			getRecentKeyStats,
			setRecentKeyStats,
			setStatsForPointer,
			setStatsForStick,
		}))

		return html`

			<div class=coordinatesbar>
				<p>
					<strong>pointer</strong>
					<span>${printVector2(statsForPointer.movement)}</span>
					<span>${printVector2(statsForPointer.position)}</span>
				</p>

				<p>
					<strong>stick  </strong>
					<span>${printVector2(statsForStick.vector)}</span>
				</p>
			</div>

			<ul class=keystats>
				${Object
					.entries(recentKeyStats)
					.filter(([,stats]) => stats.detail.pressed)
					.map(([effect, stats]) => html`
						<li data-effect="${effect}">
							<strong>${effect}</strong>
							<span>${stats.detail.cause}</span>
						</li>
					`)}
			</ul>
		`
	}
}
