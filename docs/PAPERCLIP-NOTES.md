# Paperclip Notes for TCG Vault

Source reviewed: https://github.com/paperclipai/paperclip

## What it is

Paperclip is an open-source Node.js + React app for managing teams of AI agents at work.

Positioning from repo/search summary:

> If OpenClaw is the employee, Paperclip is the company.

It is basically an AI-agent operations layer:

- org chart of agents
- tasks/tickets
- heartbeats
- budgets/cost control
- governance/approval
- audit logs
- multi-agent workflows
- mobile-ready dashboard

## Why it matters for Matt

This is not the card scanner itself.

It could be useful later as the **agent control layer** behind TCG Vault:

- Card Scan Agent — identifies cards from photos
- Price Agent — checks current prices
- Meta Agent — imports top decks
- Budget Coach Agent — finds cheaper competitive options
- Listing Agent — turns deck/card data into Etsy/Gumroad product copy

## Fit

Good fit for NOVA/Hermes ecosystem and Matt's AI workflow interests.

But do not install or depend on Paperclip for TCG Vault v1.

Better order:

1. Build TCG Vault as simple local app.
2. Add real scanner/pricing pipeline.
3. Only then test Paperclip as orchestration layer if we need multiple background agents.

## Risks / warnings

- Large fast-moving repo.
- New/buggy ecosystem signal from Reddit/search snippets.
- Could become rabbit hole.
- Not needed for current MVP.
- Matt dislikes cron-style background automation; Paperclip heartbeats may feel like that if used poorly.

## CEO call

**B — Do Later** for TCG Vault orchestration.

**A — Research/borrow ideas now**:

- task inbox
- agent roles
- cost controls
- audit trail
- human approval before price/import changes

## TCG Vault agent design inspired by Paperclip

### Card Scan Agent
Input: phone image  
Output: card names + confidence + image crop notes

### Price Agent
Input: card names/set numbers  
Output: AUD price candidates + source + timestamp

### Meta Agent
Input: event/source URL  
Output: top decks + card counts + estimated build cost

### Budget Coach Agent
Input: target deck + owned cards + budget  
Output: cheapest upgrade path and substitutions

### Safety rule
No auto-buying, no gambling, no fake price claims. Human approves all imports.
