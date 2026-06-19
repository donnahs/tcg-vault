# TCG Vault

Phone-first local web app for tracking Pokémon + Riftbound cards, deck builds, top decks and cheaper competitive options.

## Current v1 features

- Pokémon card search through public PokémonTCG API
- Riftbound local seed database/manual mode
- Add cards to local deck list
- Estimated deck cost
- Export deck text
- Top deck tracker seed list
- Budget competitive deck finder
- Phone scan/photo upload workflow with AI prompt placeholder
- Paperclip-inspired AI agent plan tab

## Paperclip GitHub review

Notes saved at:

```text
docs/PAPERCLIP-NOTES.md
```

Verdict: Paperclip is useful later as an orchestration layer for scan/price/meta agents, but not needed for v1.

## Run

```bash
cd /home/donnahs/projects/_active/tcg-vault/public
python3 -m http.server 8155
```

Open:

```text
http://127.0.0.1:8155
```

## Next build

- Add real OCR/vision pipeline.
- Add local card image embeddings for recognition.
- Add price sources by region/store.
- Add Limitless/TopDeck scrape/import for Pokémon.
- Add Riftbound real database once stable public data exists.
