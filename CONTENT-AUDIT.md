# CONTENT-AUDIT — v1.6

## Status of the audit
**The research dossier was not included in the upload, so no string in `lib/content.js` could be reconciled against it.**
Per the brief, no wording was changed and nothing was guessed. The only edit to `lib/content.js` is `site.version` → `"1.6"`.
This document therefore records (a) what was preserved, (b) items that need the dossier, and (c) new interface microcopy added in v1.6.

## Changes made
| Item | Change |
|---|---|
| `site.version` | `"1.5"` → `"1.6"` (not a claim) |
| All timeline, role, education, recognition and verification strings | none |

## Preserved exactly as flagged in the source
- **Salzburg** — "Salzburg University, Australia — wording requires verification": untouched, still labelled *Verify institution details*, still in the yellow verification list.
- **Myanmar Honorary Consul-General** — "Honorary Consul-General, Republic of the Union of Myanmar in Chattogram", *Official public record*: untouched.
- **First / founder claims** (Cornell "first Bangladeshi", training institute, tourism newspaper, tour operator founder, roadshow, Fellow, 2014–2018 awards): remain in the red list, not promoted.
- 2014, 2016, 2017, 2018 awards remain *Verify certificate*; Intraco Properties and Tangail CNG remain "current status to check / verify".

## Unresolved — needs the dossier
1. Every status label was carried over, not compared. Confirm each maps to CURRENT / 2026 VERIFIED, RECENT, HISTORICAL, SELF-REPORTED or VERIFY. The site uses richer wording (for example "Verified / documented", "Verified in corporate records", "Documented / source archive", "Official public record") that `lib/status.js` maps to five marker shapes.
2. **Languages** (Expertise page: Bengali/English "Full professional proficiency", German "Professional working proficiency", Hindi "Limited working proficiency") appear with no status label. If their source is LinkedIn they are self-reported and should be labelled so.
3. **"veteran"** (Home lead and About intro) and "decades of association" (Home scope) are unlabelled characterisations; confirm the dossier supports them.
4. **2008 "Man of Achievement"** and **2025 "Tourism Hero"** carry "Verified" wording; confirm the dossier's colour for each.
5. **LinkedIn URL** on Contact: confirm it is the correct, intended public profile.
6. **Home and About meta descriptions** are verbatim from existing copy and exceed ~160 characters (212 and 190); search engines may truncate them.
7. Whether Hotel Agrabad's exact current title should appear anywhere (dossier flags "verify current corporate documentation").

## JSON-LD `Person` (structured data)
Generated in `lib/seo.js` from `currentRoles` only, using rows whose status is current/recent or "Official public record":
Chairman WTN Bangladesh Chapter; President UTSSOB; Chairman Intraco Refueling Station PLC; Honorary Consul-General (Myanmar, Chattogram).
Excluded by construction: Intraco Properties ("current status to check"), all historical, self-reported, education and verify items, awards, and the site's positioning line.
Because the dossier was absent, "verified/current" is judged by the labels already in `content.js`, not by the dossier. Re-check when it is supplied.

## New interface microcopy in v1.6 (no new facts)
- Education "Reading the record": three definitions of *Documented*, *Self-reported*, *Verify*, each restating existing item text.
- Closing bands on Education/Expertise, 404 page text, "Back to top", "Skip to content", screen-reader status strings.

## v1.8 addendum — supplied photographs
The dossier is still missing. Photographs were added with neutral alt text and captions; nothing in `lib/content.js` changed except `navLinks` (Gallery) and `site.version`.
Open items for the client to confirm before publishing:
1. **Who is pictured** is not stated in any caption. The BAPA plaque visibly names a different recipient ("Prof. Dr. Mohammad … Chowdhury"), so that photo is **not** a recognition of H. M. Hakim Ali and is not used in Recognition.
2. **TITA 2024 trophy photo** shows a trophy before a TOAB International Tourism Award backdrop; it does not establish who received it or for what. It is not used in the 2025 Tourism Hero feature and no 2024 entry was added.
3. **Amader Shomoy bouquet card** names the sender as the BHA President; the site makes no claim about a role or relationship.
4. **Archival couple photograph**: the woman is not identified and no family relationship is stated (family information is not asserted). Confirm she and the client are content for it to be public, and consider a dated, sourced caption.
5. **Hotel Agrabad** captions on the aerial and facade photographs rely on the client's file names and the visible signboard in the third photograph; confirm.
6. Photographs are used as supplied; confirm image rights for each.
