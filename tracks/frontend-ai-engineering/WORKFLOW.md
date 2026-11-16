# AI-assisted workflow comparison

## Feature and setup

The feature is a small settings form with a display-name field, an email field, and a save action. Both rounds were built independently from the `master` branch so the second round did not inherit the first round's context. The first branch is `fe-03-round-one`; the second is `fe-03-round-two`.

## Round one: vague prompt

The vague implementation produced the smallest possible form: two inputs, a submit button, and a success message. It prevented the browser's default submission, but it had no explicit labels, no custom validation, no error states, and no accessibility state for the result. The implementation was quick, but review immediately exposed missing requirements. A user could submit an empty display name, and the page gave no useful correction guidance.

## Round two: precise prompt

The precise implementation specified semantic labels, required fields, email validation, inline error messages, `aria-invalid`, an `aria-live` status message, autocomplete hints, and a verification pass covering empty and valid submissions. The resulting diff adds explicit behavior rather than relying on browser defaults. It also makes the form easier to review because each validation rule is visible in a small `validate` function.

## Correctness, accessibility, and review effort

Round one was faster to generate but required more corrective review. Its main mistake was treating “settings form” as a visual-only task and omitting the invalid state. Round two took more planning but reduced review effort because its constraints and checks were explicit. The precise version supports keyboard and screen-reader users better through labels, field-level messages, invalid-state attributes, and a live result region. The remaining limitation is that this static exercise does not persist data to a backend; that is intentionally outside the feature scope.

## Rules learned

1. Every form control gets an explicit label and a stable identifier.
2. Validation must expose actionable field-level feedback and invalid state.
3. User-visible status changes use an appropriate live region.
