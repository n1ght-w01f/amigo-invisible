# Amigo Invisible (Secret Santa)

A fully static, server-less "amigo invisible" random selector designed for GitHub Pages.

## Structure

- `index.html` — markup
- `styles.css` — styles
- `app.js` — logic

## How it works

1. Open the published page.
2. Create groups (houses). Members of the same group are never assigned to each other.
3. Add people (name, group, optional blacklist).
4. Click **Generate assignments**. The app computes a valid random derangement respecting:
   - no self-assignment
   - no same-group assignment
   - personal blacklists (person numbers and/or `g1`, `g2` group references)
   - group blacklists
5. Share one generated link per person. Each link contains the recipient's name (base64) in the `?to=` query parameter. Opening it reveals who to gift.

## Languages

The UI supports English and Spanish via the language selector (top right). The choice is saved in the browser.

## Hosting on GitHub Pages

1. Push all files to a repository.
2. Settings → Pages → deploy from the branch.
3. Open the published URL.

All data stays in the browser (localStorage). No backend required.

## Blacklist syntax

- Person numbers are 1-based in list order, e.g. `2, 5`.
- Group references use `g1`, `g2`, … (creation order), e.g. `g1 g3`.
- Same group is excluded automatically.

## Export / import

- **Export setup (JSON)** opens a panel with the JSON text (copy or download as a file).
- **Import setup (JSON)** restores a saved setup.
