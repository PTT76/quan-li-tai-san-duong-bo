# AGENTS.md

## Project overview

This repository is an early product-discovery and UI/UX prototype for a Vietnamese road-infrastructure maintenance management system. It currently contains requirements and design documents plus a static web prototype; it is not yet a production application.

The intended product covers road patrols, incidents and violations, maintenance work and acceptance, infrastructure assets and GIS, periodic-repair projects and disbursement, capital-construction projects, records, reporting, administration, integrations, and mobile/offline field work.

## Source-of-truth files

- `Khai quat cac chuc nang.docx`: original feature checklist supplied by the stakeholder.
- `DANH_GIA_VA_DRAFT_UI_UX.md`: product assessment, proposed workflows, information architecture, UX direction, delivery phases, and open decisions.
- `MA_TRAN_48_CHUC_NANG_MAN_HINH.md`: traceability matrix from every requirement to a proposed screen/UX pattern.
- `RMMS_Intro.pdf`: supporting product-introduction material.
- `ui-ux-draft/index.html`: Vietnamese static web prototype populated with illustrative data.

When requirements conflict, preserve the original intent, document the conflict, and prefer the clarified analysis/matrix only where it explicitly corrects or refines the checklist. Ask for stakeholder confirmation before making a material business-policy decision.

## Important domain facts

- The checklist says 45 functions, but the verified total is 48: group G contains 19 functions rather than 16. Preserve the IDs in `MA_TRAN_48_CHUC_NANG_MAN_HINH.md` for traceability.
- The core MVP loop is: offline road patrol -> finding/incident -> verification -> assignment/work order -> execution -> acceptance or rework -> closure -> asset condition and maintenance-history update.
- Incidents are inputs to work orders; do not duplicate their location, evidence, or history.
- Periodic repair (SCĐK) and capital construction (XDCB) should share a Project Core and differ through templates/workflows.
- GIS, documents, alerts, reports, audit, and identity/permissions are shared platform capabilities, not isolated copies per module.
- The public citizen-facing map must use a separately approved/sanitized dataset and workflow.
- Project completion must hand over validated data into the asset database without re-entry.

## Product and UX rules

- Keep user-facing text in natural Vietnamese and save text files as UTF-8.
- Treat all prototype records and metrics as illustrative unless a real data source is explicitly provided.
- Design around roles and exceptions. Dashboards must drill down to source records; do not add KPIs whose formula or source cannot be explained.
- Reuse the documented patterns: synchronized map/straight-line diagram/table views, consistent detail workspaces, exception queues, autosaving wizards, and versioned forms/templates.
- Field workflows must support intermittent connectivity, per-record sync state, retries, receipts, and explicit conflict handling. An emergency alert must never appear successfully sent when it is only queued offline.
- Preserve evidence provenance where applicable: original media, timestamp, coordinates and accuracy, user/device identity, audit history, and signatures/hashes when required.
- Accessibility and responsive behavior are required. Prefer semantic HTML, keyboard access, visible focus, useful labels, and mobile layouts suitable for one-handed field use.
- Do not put desktop-heavy Gantt, BI, or complex administration screens into the mobile field app unless a concrete workflow requires them.

## Data and configuration rules

- Do not hard-code agency names, organizational structures, road scopes, approval authorities, alert thresholds, KPI formulas, or report/form text as permanent business rules.
- Regulatory forms must be versioned and configurable with code, legal basis, effective dates, expiry dates, and scope. Verify current authoritative legal sources before implementing regulatory behavior; the design notes currently reference TT 41/2024/TT-BGTVT as amended by TT 72/2025/TT-BXD.
- Model road location consistently: route, managed segment, increasing-kilometre direction, branch, carriageway/direction/lane, Km+m, geometry, coordinate reference system, and measurement/accuracy metadata.
- Authorization combines role, organization, route/segment/project scope, action, and field sensitivity. Sensitive exports and financial actions require auditability.
- Prefer append-only history or explicit versioning for workflow transitions, asset state, financial changes, approvals, and published GIS data.

## Repository and implementation conventions

- Keep documentation changes synchronized: a scope change should update both the assessment/backlog narrative and the 48-function traceability matrix when applicable.
- Keep requirement IDs (`A01` through `G7.03`) in issues, stories, screen notes, and acceptance criteria.
- Make focused changes and preserve unrelated user edits.
- Search with `rg`/`rg --files` before introducing new files, dependencies, or duplicate components.
- Prefer local, reusable CSS/JavaScript modules and design tokens over one-off inline styling as the prototype becomes an application.
- Never commit real credentials, personal data, production coordinates/media, or unapproved financial data. Add sanitized fixtures for demos and tests.

## Current prototype status

`ui-ux-draft` is a dependency-free static review prototype. `index.html`, `styles.css`, and `app.js` render 14 desktop and 5 mobile/PWA concept frames through URLs such as `index.html?screen=D01&state=default`. `capture-screens.ps1` reproduces the PNG review set with Microsoft Edge headless. All displayed records remain illustrative and the prototype does not persist data or call real services.

There is currently no package manifest, production application framework, automated test suite, linter, or documented production build command. The approved implementation is expected to be planned separately before any code is added under `Source code`. When a production stack is introduced, add the smallest standard scripts for development, linting, tests, and production build, then update this file and the project README with exact commands.

## Validation expectations

For documentation-only changes:

- Check UTF-8 rendering and heading/table structure.
- Reconcile feature counts and requirement IDs against `MA_TRAN_48_CHUC_NANG_MAN_HINH.md`.
- Clearly label assumptions, open stakeholder decisions, and illustrative data.

For UI changes:

- Verify all local `href`/`src` references exist.
- Exercise navigation, search/filtering, forms, dialogs, notifications, tables, map controls, empty/loading/error states, and keyboard focus.
- Check representative desktop and mobile widths and avoid horizontal overflow.
- Test at least the seven mandatory UX scenarios in section 13 of `DANH_GIA_VA_DRAFT_UI_UX.md` when the relevant workflow exists.

For business logic or persistence changes:

- Add automated tests for state transitions, permissions/scopes, offline retries/conflicts, audit history, KPI formulas, and project-to-asset handover.
- Include failure and authorization cases, not only happy paths.
- Report commands run and any checks that could not be completed.
