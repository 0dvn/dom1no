# dom1no — Making the specification describe one game

*Unpublished correction post — 9 November 2026*

Our diagrams, use cases and Gherkin files did not always describe the same behavior. We corrected those disagreements and simplified the reading route from the repository README.

## What changed

The SRS now presents five semester goals, with playing a match and sending a friend request detailed for the current assignment. Computer opponents, profile customization and statistics are deferred.

Players choose two- or three-player individual draw dominoes, or four-player partnership block dominoes. Matchmaking waits for that configuration; it never automatically replaces partnerships with an individual game. Private hosts choose the configuration before players join.

The [game rules](../game-rules.md) cover setup through immediate and blocked endings. Blocked results compare pips, not tile counts: `6|6` has 12 pips, while `0|0` plus `1|1` has only 2. With open ends 2 and 2, neither hand can move, and the second hand wins despite having more tiles.

Friends search now agrees with its wireframe: search directly by a case-insensitive username substring, select a result and send. Results exclude the sender. An existing incoming request is shown with Accept/Decline instead of creating a second request. Sending alone never creates friendship.

## Concrete AI-assisted correction

**Context:** the assistant received the existing SRS, use cases, diagram images, wireframes, feature files, extracted course requirements and an audit. We asked it to improve coherence, use editable PlantUML and ask us before resolving product choices. The assistant and coding subagents edited the artifacts; the team supplied the product decisions.

**Before:** the [original gameplay sequence](../diagrams/gameplay-sequence.png) asked a player to retry an invalid move, then continued to a next-turn message. The feature required the rejected player's turn to remain active.

**After:** the [corrected sequence](../diagrams/gameplay-sequence.svg), with its [PlantUML source](../diagrams/gameplay-sequence.puml), rejects without changing state, permits a retry and advances only after a nonterminal accepted placement. Emptying a hand ends the match immediately. The [activity](../diagrams/gameplay-activity.svg) handles any participant, including an opponent winning while another player waits.

We accepted this correction because it resolves a specific contradiction. Reading the branches checks the intended flow; rendering checks syntax. Neither proves application correctness. We also replaced implementation-like “turn resolved” flags in an initial activity with questions about legal actions and whether the game has ended.

We rejected the assistant's suggestion to offer a smaller game when four players were unavailable. Our final choice was to wait for the selected configuration, which is now consistent across requirements and wireframes.

## Applying our working principles

We adopted the [three working principles](../../README.md#working-principles) on 9 November 2026; earlier posts did not explicitly track them.

1. **Playable core:** resolve match configurations and endings before promising extra modes or customization.
2. **Consistent behavior:** repair the invalid-turn contradiction and align Friends search across its flow, scenarios and screen.
3. **Evidence-sized claims:** distinguish an in-memory demonstration from application testing, and old IDE captures from screenshots of the revised text.

## Verification

Checks performed on **9 November 2026**:

- All five diagrams rendered with PlantUML 1.2026.4 and Java 21; the seven current diagram/wireframe SVGs parsed as XML. The rendered activities were visually inspected. [Rendering command](../diagrams/README.md).
- Both feature files parsed as Gherkin: gameplay had 11 definitions expanding to 17 cases; friends had 12 scenarios. Parsing does not execute them.
- The direct-search demonstration passed: one scenario, six reported steps (five Gherkin steps plus the setup hook). Exact-name, mixed-case substring and sender-exclusion examples passed together: three scenarios, 18 reported steps including hooks. Run the named demonstration with `npm ci` and `npm run test:gherkin-demo`; see [feature instructions](../features/README.md).
- The original search example from commit `95d1850` reproduced its seven-step report: six Gherkin steps plus the hook. Removing the unnecessary pre-search Add Friend action explains the current count.
- A review caught impossible odd aggregate pip totals in two blocked-game fixtures. After correction, distinct remaining hands could realize each example, match neither exposed end, and leave played tiles capable of forming one closed chain.
- Local Markdown links, JavaScript syntax and `git diff --check` passed. No WordPress or YouTrack writes were made.

## Course evidence and remaining work

The source-derived course reference used SRS task slides `SE1_03_SRS_2026_AI_Integrated.pptx.pdf`, p. 51; use-case slides `SE1_04_Use_Cases_AI_2026_Amended.pptx.pdf`, pp. 56–57; and principles in `SE1_01_Introduction-2_2026_AI_conservative.pdf`, p. 51. Week 5 slides `SE1_05_FeatureFileNarration_AI_2027_Amended.pptx.pdf`, pp. 49, 51–52, distinguish immediate feature/editor tasks, the AI extension and future execution work. The 2027 filename and older 2024/2025 project-management criteria need current-course confirmation; they do not establish a new deadline or rubric.

There is no implemented game yet. [Open product decisions](../SRS.md#7-open-decisions) remain in the SRS. Fresh IDE captures, comparison with the actual course templates and current whiteboard, and external project-management/peer-review checks are still needed. This post records the current correction, not an original prompt history or evidence of earlier weekly tracking.
