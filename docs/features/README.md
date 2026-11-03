# dom1no — Week 6 Gherkin feature narratives

These feature files describe intended behavior for the two detailed use cases. They are **BDD narratives**, not proof that the app is implemented or that Cucumber tests currently run.

| Feature | Detailed use case | Scenarios |
| --- | --- | --- |
| [Play a Domino Match](DUC-01-play-domino-match.feature) | [DUC-01](../use-cases/DUC-01-play-domino-match.md) | Start, legal move, illegal move, win, blocked game |
| [Send Friend Request](DUC-02-send-friend-request.feature) | [DUC-02](../use-cases/DUC-02-send-friend-request.md) | Search success, no match, send, existing friend, accept, decline |

## Scope notes for team review

- **DUC-01:** The `Start a new game` scenario is supporting setup from the team's broader gameplay activity diagram; the detailed use case starts after a match has been created. The four-player setup is taken from that diagram and does not settle the rules profile (`RP-01`). The blocked-game scenario intentionally leaves scoring and tie-breaking undefined until the team approves `RP-01`.
- **DUC-02:** The detailed use case is specifically *sending* a request. Accept/decline scenarios are included because the broader team activity diagram includes them, **not** because acceptance/decline have been reclassified as steps in DUC-02. The existing-friend case and exact feedback wording require confirmation under `DEC-09`.
- Scenario steps are written as intended behavior. There are no executable step definitions in this documentation-only repository yet.

## Teacher's proof / evidence checklist

1. Open each `.feature` in an IDE with Gherkin/Cucumber syntax support, showing colored `Feature`, `Scenario`, `Given`, `When`, and `Then` keywords. Save a genuine screenshot.
2. To demonstrate step-definition autocomplete, configure a real Cucumber language binding and step-definition library in the actual project. Type a step using real IDE completion and capture a genuine screenshot of the suggestion list; do not use a simulated screenshot as proof.
3. Verify each decision branch against the corresponding activity diagram and resolve any discrepancies with the team.
4. Link these narratives from DUC-01 and DUC-02 and document AI assistance in the Week 6 blog post.
5. Optional: implement a small working Cucumber example with a step-definition library; do not claim the tests run until they actually do.

## Status

Draft for team review. Gherkin syntax has been reviewed by inspection; no Cucumber parser/test runner has been used to execute or validate these files.
