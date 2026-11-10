# UML diagrams

| Diagram | Read | Edit |
| --- | --- | --- |
| Five semester use cases | [SVG](overall-use-cases.svg) | [PlantUML](overall-use-cases.puml) |
| Play a match: activity | [SVG](gameplay-activity.svg) | [PlantUML](gameplay-activity.puml) |
| Send a friend request: activity | [SVG](friends-activity.svg) | [PlantUML](friends-activity.puml) |
| Gameplay interaction example | [SVG](gameplay-sequence.svg) | [PlantUML](gameplay-sequence.puml) |
| Friend-request interaction example | [SVG](friends-sequence.svg) | [PlantUML](friends-sequence.puml) |

The activities describe the two detailed user goals. Sequence diagrams are supporting interaction examples, not additional use cases or an exhaustive protocol design.

Render with Java and PlantUML 1.2026.4:

```sh
java -Djava.awt.headless=true -jar /path/to/plantuml-1.2026.4.jar -tsvg -failfast2 docs/diagrams/*.puml
```

Run this from the repository root and commit the sources and SVGs together. The overview uses PlantUML's Smetana layout, so Graphviz is not needed. The renderer is a tool, not an application dependency.

Use the SVGs for current designs. The PNGs remain for [published blog links](../../README.md#reporting-and-evidence).
