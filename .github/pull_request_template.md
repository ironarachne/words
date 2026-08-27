## What changed

<!-- A short description of the change and why it is needed. -->

## Related issue

<!-- e.g. Closes #123. Write "None" if this is not tied to an issue. -->

## Type of change

- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change (changes existing behavior or the public API)
- [ ] Documentation or tooling only

## Language behavior

- [ ] This change does **not** alter the output of an existing function for
      input it already handled.
- [ ] It does alter existing output, and I have called that out below as a
      breaking change.

<!--
Adding an irregular plural, tightening a rule, or changing how a word is
inflected can change results that callers already rely on. Widening coverage
to input that previously fell through is not breaking; changing an answer the
library already gave is. See CODE_STYLE.md.
-->

## Checklist

- [ ] `npm run check` passes locally (lint, build, tests).
- [ ] Tests cover the new behavior, including boundaries and thrown errors.
- [ ] TSDoc comments are updated for any changed public API.
- [ ] `README.md` is updated if the public API changed.
- [ ] The change follows [CODE_STYLE.md](../CODE_STYLE.md).
