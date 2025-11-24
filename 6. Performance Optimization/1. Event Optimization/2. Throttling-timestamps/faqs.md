# Throttling FAQs

## In Throttling: Are Events Queued or Ignored?

Short Answer: They are ignored.

When using throttling, once the callback runs:

- A cooldown timer (say, 3 seconds) starts.
- Any subsequent events during that time are ignored — their callbacks do not get queued or stored.
- Only the first event that fires after the cooldown can trigger the next execution

All intermediate events during the wait are completely dropped — not queued, not delayed, not executed later.
