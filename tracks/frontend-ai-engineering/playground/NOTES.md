# Accessibility playground notes

This playground implements a modal dialog, tabs, and disclosure without a component library. The modal exposes `role="dialog"` and `aria-modal`, labels itself, closes with Escape, and returns focus to its trigger. The tabs use `role="tablist"`/`role="tab"`/`aria-selected` and support Left/Right arrow navigation. The disclosure exposes `aria-expanded` and `aria-controls`.

Compared with shadcn/ui primitives, this hand-built version intentionally keeps a smaller surface area. shadcn's dialog includes stronger focus trapping and focus guards for nested portals, while this exercise returns focus and handles Escape but does not implement a full Tab-loop. shadcn's tabs also manages roving focus and orientation/activation options; this demo covers the required horizontal arrow behavior only. Those gaps are documented so the simpler implementation is not mistaken for a production primitive.
