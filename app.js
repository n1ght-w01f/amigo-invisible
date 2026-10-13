(function () {
  'use strict';

  const state = {
    groups: [{ name: 'Group 1', blacklist: '' }],
    people: []
  };

  let lang = (localStorage.getItem('amigoLang') || (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en');

  const I18N = {
    en: {
      title: 'Amigo Invisible',
      subtitle: 'A fully client-side secret-santa generator for GitHub Pages.',
      language: 'Language',
      groups: 'Groups (houses)',
      groupsHelp: 'People in the same group never gift each other. Groups are numbered in creation order; reference them in blacklists as g1, g2, …',
      addGroup: '+ Add group',
      people: 'People',
      peopleHelp: 'Index numbers (#) follow the list order. Blacklist entries can be person numbers (e.g. 2, 5) or groups (e.g. g1). Same group is excluded automatically.',
      nameLabel: 'Name',
      groupLabel: 'Group',
      blacklistLabel: 'Blacklist',
      namePlaceholder: 'Name',
      groupSelectPlaceholder: 'Select group',
      blacklistPlaceholder: 'Blacklist (optional)',
      addPerson: '+ Add person',
      noPeople: 'No people yet.',
      colIndex: '#',
      colName: 'Name',
      colGroup: 'Group',
      colBlacklist: 'Blacklist',
      generate: 'Generate assignments',
      clearAll: 'Clear all',
      exportSetup: 'Export setup (JSON)',
      importSetup: 'Import setup (JSON)',
      importPlaceholder: '{"groups":[...],"people":[...]}',
      importBtn: 'Import',
      resultsTitle: 'Secret links (share individually)',
      resultsHelp: 'Each link reveals only the recipient for that person. Do not open someone else’s link.',
      copyAll: 'Copy all links',
      downloadLinks: 'Download links (.txt)',
      person: 'Person',
      secretLink: 'Secret link',
      copy: 'Copy',
      copied: 'Copied',
      colGiver: 'Person',
      yourAssignment: 'Your Secret Santa assignment',
      youGiftTo: 'You gift to:',
      revealHint: 'Share the base URL with the organizer to start over.',
      backOrg: 'Back to organizer',
      previous: 'Previous results',
      exportTitle: 'Exported setup (JSON)',
      exportHelp: 'Copy the JSON below or download it as a file.',
      copyJson: 'Copy JSON',
      downloadJson: 'Download JSON',
      close: 'Close',
      needTwo: 'Need at least 2 people.',
      needNames: 'All people need a name.',
      needGroupNames: 'All groups need a name.',
      tooStrict: 'Constraints too strict: some person has no valid recipient. Adjust blacklists/groups.',
      noAssign: 'Could not find a valid assignment. Relax constraints.',
      generated: 'Generated {n} secret links.',
      imported: 'Imported successfully.',
      importFailed: 'Import failed: {err}',
      confirmClear: 'Clear all people and groups?',
      confirmDeleteGroup: 'Delete group #{n}?',
      confirmDeletePerson: 'Delete person #{n}? Indices may shift.',
      groupHasMembers: 'Group has members. Reassign or delete them first.',
      keepOneGroup: 'Keep at least one group.',
      needName: 'Enter a name.',
      invalidLink: '(invalid link)',
      empty: '(empty)',
    },
    es: {
      title: 'Amigo Invisible',
      subtitle: 'Generador de amigo invisible 100% en el navegador, ideal para GitHub Pages.',
      language: 'Idioma',
      groups: 'Grupos (casas)',
      groupsHelp: 'Las personas del mismo grupo nunca se regalan entre sí. Los grupos se numeran en orden de creación; refiérelos en listas negras como g1, g2, …',
      addGroup: '+ Añadir grupo',
      people: 'Personas',
      peopleHelp: 'Los números (#) siguen el orden de la lista. Las listas negras pueden incluir números de persona (p. ej. 2, 5) o grupos (p. ej. g1). El mismo grupo se excluye automáticamente.',
      nameLabel: 'Nombre',
      groupLabel: 'Grupo',
      blacklistLabel: 'Lista negra',
      namePlaceholder: 'Nombre',
      groupSelectPlaceholder: 'Seleccionar grupo',
      blacklistPlaceholder: 'Lista negra (opcional)',
      addPerson: '+ Añadir persona',
      noPeople: 'Aún no hay personas.',
      colIndex: '#',
      colName: 'Nombre',
      colGroup: 'Grupo',
      colBlacklist: 'Lista negra',
      generate: 'Generar asignaciones',
      clearAll: 'Borrar todo',
      exportSetup: 'Exportar configuración (JSON)',
      importSetup: 'Importar configuración (JSON)',
      importPlaceholder: '{"groups":[...],"people":[...]}',
      importBtn: 'Importar',
      resultsTitle: 'Enlaces secretos (compartir individualmente)',
      resultsHelp: 'Cada enlace revela solo el destinatario de esa persona. No abras el enlace de otra persona.',
      copyAll: 'Copiar todos los enlaces',
      downloadLinks: 'Descargar enlaces (.txt)',
      person: 'Persona',
      secretLink: 'Enlace secreto',
      copy: 'Copiar',
      copied: 'Copiado',
      colGiver: 'Persona',
      yourAssignment: 'Tu asignación de Amigo Invisible',
      youGiftTo: 'Le regalas a:',
      revealHint: 'Comparte la URL base con el organizador para empezar de nuevo.',
      backOrg: 'Volver al panel',
      previous: 'Resultados anteriores',
      exportTitle: 'Configuración exportada (JSON)',
      exportHelp: 'Copia el JSON o descárgalo como archivo.',
      copyJson: 'Copiar JSON',
      downloadJson: 'Descargar JSON',
      close: 'Cerrar',
      needTwo: 'Se necesitan al menos 2 personas.',
      needNames: 'Todas las personas deben tener nombre.',
      needGroupNames: 'Todos los grupos deben tener nombre.',
      tooStrict: 'Restricciones demasiado estrictas: alguna persona no tiene destinatario válido. Ajusta listas negras/grupos.',
      noAssign: 'No se pudo encontrar una asignación válida. Relaja las restricciones.',
      generated: 'Generados {n} enlaces secretos.',
      imported: 'Importado correctamente.',
      importFailed: 'Error al importar: {err}',
      confirmClear: '¿Borrar todas las personas y grupos?',
      confirmDeleteGroup: '¿Eliminar el grupo #{n}?',
      confirmDeletePerson: '¿Eliminar la persona #{n}? Los índices pueden cambiar.',
      groupHasMembers: 'El grupo tiene miembros. Reasígnalos o elimínalos primero.',
      keepOneGroup: 'Mantén al menos un grupo.',
      needName: 'Introduce un nombre.',
      invalidLink: '(enlace no válido)',
      empty: '(vacío)',
    }
  };

  function t(key, vars) {
    let s = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
    if (vars) Object.keys(vars).forEach(k => { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    // title
    document.title = t('title');
    renderAll();
    const res = loadResult();
    if (res && document.getElementById('resultsCard') && !document.getElementById('resultsCard').classList.contains('hidden')) {
      renderResults(res);
    }
    renderResultsFromStorage(false);
  }

  // ---------- storage ----------
  function saveState() {
    try { localStorage.setItem('amigoState', JSON.stringify(state)); } catch (e) {}
  }
  function loadState() {
    try {
      const raw = localStorage.getItem('amigoState');
      if (raw) {
        const o = JSON.parse(raw);
        if (Array.isArray(o.groups) && o.groups.length) state.groups = o.groups;
        if (Array.isArray(o.people)) state.people = o.people;
      }
    } catch (e) {}
  }
  function saveResult(res) {
    try { localStorage.setItem('amigoResult', JSON.stringify(res)); } catch (e) {}
  }
  function loadResult() {
    try { return JSON.parse(localStorage.getItem('amigoResult')); } catch (e) { return null; }
  }

  // ---------- helpers ----------
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function escapeAttr(s){ return escapeHtml(s).replace(/"/g,'&quot;'); }

  function utf8ToBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    bytes.forEach(b => bin += String.fromCharCode(b));
    return btoa(bin);
  }
  function base64ToUtf8(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function showMsg(text, type) {
    const box = document.getElementById('msgBox');
    box.innerHTML = `<div class="msg ${type} fade-in">${escapeHtml(text)}</div>`;
  }

  // ---------- blacklist parsing ----------
  function parseTokens(text) {
    return (text || '').split(/[\s,;]+/).map(t => t.trim()).filter(Boolean);
  }
  function tokenToPersonIndices(tok, people) {
    const res = new Set();
    const low = tok.toLowerCase();
    if (low.startsWith('g') || low.startsWith('group') || low.startsWith('grupo')) {
      const num = parseInt(low.replace(/\D/g, ''), 10);
      if (isNaN(num)) return res;
      const gi = num - 1;
      people.forEach((p, i) => { if (p.groupId === gi) res.add(i); });
      return res;
    }
    const num = parseInt(tok, 10);
    if (isNaN(num)) return res;
    const idx = num - 1;
    if (idx >= 0 && idx < people.length) res.add(idx);
    return res;
  }
  function buildForbidden() {
    const n = state.people.length;
    const forbidden = [];
    for (let i = 0; i < n; i++) {
      const p = state.people[i];
      const set = new Set();
      set.add(i);
      state.people.forEach((q, j) => { if (q.groupId === p.groupId) set.add(j); });
      parseTokens(p.blacklist).forEach(tok => {
        tokenToPersonIndices(tok, state.people).forEach(j => set.add(j));
      });
      const g = state.groups[p.groupId];
      if (g) parseTokens(g.blacklist).forEach(tok => {
        tokenToPersonIndices(tok, state.people).forEach(j => set.add(j));
      });
      forbidden.push(set);
    }
    return forbidden;
  }

  function feasible(forbidden) {
    const n = forbidden.length;
    for (let i = 0; i < n; i++) {
      if (n - forbidden[i].size < 1) return false;
    }
    return true;
  }

  function solveAssignment(forbidden, attempts) {
    const n = forbidden.length;
    for (let att = 0; att < (attempts || 40); att++) {
      const assigned = new Array(n).fill(-1);
      const used = new Set();
      const priority = shuffle([...Array(n).keys()]);
      function candidates(i) {
        const out = [];
        for (let r = 0; r < n; r++) {
          if (!used.has(r) && !forbidden[i].has(r)) out.push(r);
        }
        return out;
      }
      function backtrack(remaining) {
        if (remaining === 0) return true;
        let best = -1, bestOpts = null;
        for (let idx = 0; idx < n; idx++) {
          if (assigned[idx] !== -1) continue;
          const opts = candidates(idx);
          if (bestOpts === null || opts.length < bestOpts.length) {
            bestOpts = opts; best = idx;
          }
          if (opts.length === 0) break;
        }
        if (best === -1) return true;
        if (bestOpts.length === 0) return false;
        const shuffled = shuffle([...bestOpts]);
        for (const r of shuffled) {
          assigned[best] = r; used.add(r);
          if (backtrack(remaining - 1)) return true;
          assigned[best] = -1; used.delete(r);
        }
        return false;
      }
      if (backtrack(n)) return assigned.slice();
    }
    return null;
  }

  // ---------- render ----------
  function renderGroups() {
    const c = document.getElementById('groupsContainer');
    c.innerHTML = '';
    const list = document.createElement('div');
    list.className = 'item-list';
    state.groups.forEach((g, gi) => {
      const card = document.createElement('div');
      card.className = 'item-card fade-in';
      card.innerHTML = `
        <div class="item-card-head">
          <span class="idx-badge">#${gi + 1}</span>
          <button class="btn btn-danger btn-small" data-delg="${gi}" title="${escapeAttr(lang === 'es' ? 'Eliminar grupo' : 'Delete group')}">
            ${lang === 'es' ? 'Eliminar' : 'Delete'}
          </button>
        </div>
        <input data-g="${gi}" data-f="name" value="${escapeAttr(g.name)}" placeholder="${escapeAttr(t('namePlaceholder'))}" />
        <input data-g="${gi}" data-f="blacklist" value="${escapeAttr(g.blacklist)}" placeholder="2, g2" />
      `;
      list.appendChild(card);
    });
    c.appendChild(list);
    c.querySelectorAll('input[data-g]').forEach(inp => {
      inp.addEventListener('input', e => {
        const gi = +e.target.dataset.g;
        const f = e.target.dataset.f;
        state.groups[gi][f] = e.target.value;
        saveState();
      });
    });
    c.querySelectorAll('button[data-delg]').forEach(b => {
      b.addEventListener('click', e => {
        const gi = +e.target.dataset.delg;
        const used = state.people.some(p => p.groupId === gi);
        if (used) { showMsg(t('groupHasMembers'), 'err'); return; }
        if (state.groups.length <= 1) { showMsg(t('keepOneGroup'), 'err'); return; }
        if (!confirm(t('confirmDeleteGroup', { n: gi + 1 }))) return;
        state.groups.splice(gi, 1);
        state.people.forEach(p => { if (p.groupId > gi) p.groupId--; });
        saveState();
        renderAll();
      });
    });
  }

  function renderNewGroupOptions() {
    const sel = document.getElementById('newGroup');
    const cur = sel.value;
    sel.innerHTML = `<option value="" disabled>${escapeHtml(t('groupSelectPlaceholder'))}</option>`;
    state.groups.forEach((g, gi) => {
      const opt = document.createElement('option');
      opt.value = gi;
      opt.textContent = `#${gi + 1} ${g.name || ''}`;
      sel.appendChild(opt);
    });
    if (cur !== '' && +cur < state.groups.length) sel.value = cur;
    else if (state.groups.length) sel.value = 0;
  }

  function renderPeople() {
    const c = document.getElementById('peopleContainer');
    if (state.people.length === 0) {
      c.innerHTML = `<p class="muted">${escapeHtml(t('noPeople'))}</p>`;
      return;
    }
    const list = document.createElement('div');
    list.className = 'item-list';
    state.people.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'item-card fade-in';
      card.innerHTML = `
        <div class="item-card-head">
          <span class="idx-badge">#${i + 1}</span>
          <button class="btn btn-danger btn-small" data-delp="${i}" title="${escapeAttr(lang === 'es' ? 'Eliminar persona' : 'Delete person')}">
            ${lang === 'es' ? 'Eliminar' : 'Delete'}
          </button>
        </div>
        <input data-p="${i}" data-f="name" value="${escapeAttr(p.name)}" placeholder="${escapeAttr(t('namePlaceholder'))}" />
        <select data-p="${i}" data-f="groupId">
          ${state.groups.map((g, gi) => `<option value="${gi}" ${p.groupId === gi ? 'selected' : ''}>#${gi + 1} ${escapeHtml(g.name || '')}</option>`).join('')}
        </select>
        <input data-p="${i}" data-f="blacklist" value="${escapeAttr(p.blacklist || '')}" placeholder="2, g1" />
      `;
      list.appendChild(card);
    });
    c.innerHTML = '';
    c.appendChild(list);
    c.querySelectorAll('input[data-p],select[data-p]').forEach(inp => {
      const handler = e => {
        const pi = +e.target.dataset.p;
        const f = e.target.dataset.f;
        let v = e.target.value;
        if (f === 'groupId') v = +v;
        state.people[pi][f] = v;
        saveState();
      };
      inp.addEventListener('input', handler);
      inp.addEventListener('change', handler);
    });
    c.querySelectorAll('button[data-delp]').forEach(b => {
      b.addEventListener('click', e => {
        const pi = +e.target.dataset.delp;
        if (!confirm(t('confirmDeletePerson', { n: pi + 1 }))) return;
        state.people.splice(pi, 1);
        saveState();
        renderAll();
      });
    });
  }

  function renderAll() {
    renderGroups();
    renderNewGroupOptions();
    renderPeople();
  }

  function renderResults(results) {
    const card = document.getElementById('resultsCard');
    card.classList.remove('hidden');
    const c = document.getElementById('resultsContainer');
    const list = document.createElement('div');
    list.className = 'item-list';
    results.forEach(r => {
      const rc = document.createElement('div');
      rc.className = 'result-card fade-in';
      rc.innerHTML = `
        <div class="result-card-head">${escapeHtml(r.giver)}</div>
        <div class="link-box"><a href="${escapeAttr(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.url)}</a></div>
        <div class="item-card-actions">
          <button class="btn btn-ghost btn-small" data-copy="${escapeAttr(r.url)}">${escapeHtml(t('copy'))}</button>
        </div>
      `;
      list.appendChild(rc);
    });
    c.innerHTML = '';
    c.appendChild(list);
    c.querySelectorAll('button[data-copy]').forEach(b => {
      b.addEventListener('click', e => {
        navigator.clipboard.writeText(e.target.dataset.copy).then(() => {
          e.target.textContent = t('copied');
          setTimeout(() => e.target.textContent = t('copy'), 1200);
        });
      });
    });
  }

  function renderResultsFromStorage(force) {
    const res = loadResult();
    if (!res || !res.length) return;
    if (!force && !document.getElementById('resultsCard').classList.contains('hidden')) return;
    // show previous only if not reveal mode
    const params = new URLSearchParams(window.location.search);
    if (params.get('to')) return;
    const card = document.getElementById('prevCard');
    card.classList.remove('hidden');
    const c = document.getElementById('prevContainer');
    const list = document.createElement('div');
    list.className = 'item-list';
    res.forEach(r => {
      const rc = document.createElement('div');
      rc.className = 'result-card fade-in';
      rc.innerHTML = `
        <div class="result-card-head">${escapeHtml(r.giver)}</div>
        <div class="link-box"><a href="${escapeAttr(r.url)}">${escapeHtml(r.url)}</a></div>
      `;
      list.appendChild(rc);
    });
    c.innerHTML = '';
    c.appendChild(list);
  }

  // ---------- generate ----------
  function generate() {
    const n = state.people.length;
    if (n < 2) { showMsg(t('needTwo'), 'err'); return; }
    for (const p of state.people) {
      if (!p.name || !p.name.trim()) { showMsg(t('needNames'), 'err'); return; }
    }
    for (const g of state.groups) {
      if (!g.name || !g.name.trim()) { showMsg(t('needGroupNames'), 'err'); return; }
    }
    const forbidden = buildForbidden();
    if (!feasible(forbidden)) {
      showMsg(t('tooStrict'), 'err');
      return;
    }
    const assignment = solveAssignment(forbidden, 40);
    if (!assignment) {
      showMsg(t('noAssign'), 'err');
      return;
    }
    const base = window.location.origin + window.location.pathname;
    const results = state.people.map((p, i) => {
      const recipientName = state.people[assignment[i]].name;
      const encoded = utf8ToBase64(recipientName);
      const url = base + '?to=' + encodeURIComponent(encoded);
      return { giver: p.name, recipient: recipientName, url };
    });
    renderResults(results);
    saveResult(results);
    showMsg(t('generated', { n: results.length }), 'ok');
  }

  // ---------- wiring ----------
  document.getElementById('langSelect').value = lang;
  document.getElementById('langSelect').addEventListener('change', e => {
    lang = e.target.value;
    localStorage.setItem('amigoLang', lang);
    applyLang();
  });

  document.getElementById('addGroupBtn').addEventListener('click', () => {
    state.groups.push({ name: 'Group ' + (state.groups.length + 1), blacklist: '' });
    saveState();
    renderAll();
  });

  document.getElementById('addPersonBtn').addEventListener('click', () => {
    const name = document.getElementById('newName').value.trim();
    const groupId = +document.getElementById('newGroup').value;
    const bl = document.getElementById('newBlacklist').value.trim();
    if (!name) { showMsg(t('needName'), 'err'); return; }
    state.people.push({ name, groupId, blacklist: bl });
    document.getElementById('newName').value = '';
    document.getElementById('newBlacklist').value = '';
    saveState();
    renderAll();
  });

  document.getElementById('generateBtn').addEventListener('click', generate);

  document.getElementById('clearBtn').addEventListener('click', () => {
    if (!confirm(t('confirmClear'))) return;
    state.groups = [{ name: 'Group 1', blacklist: '' }];
    state.people = [];
    try { localStorage.removeItem('amigoResult'); } catch (e) {}
    saveState();
    renderAll();
    document.getElementById('resultsCard').classList.add('hidden');
    document.getElementById('msgBox').innerHTML = '';
    document.getElementById('exportPanel').classList.add('hidden');
    document.getElementById('prevCard').classList.add('hidden');
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    const json = JSON.stringify(state, null, 2);
    document.getElementById('exportArea').value = json;
    document.getElementById('exportPanel').classList.remove('hidden');
    document.getElementById('exportPanel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  document.getElementById('copyJsonBtn').addEventListener('click', () => {
    const area = document.getElementById('exportArea');
    navigator.clipboard.writeText(area.value).then(() => {
      const b = document.getElementById('copyJsonBtn');
      b.textContent = t('copied');
      setTimeout(() => b.textContent = t('copyJson'), 1200);
    });
  });

  document.getElementById('downloadJsonBtn').addEventListener('click', () => {
    const data = document.getElementById('exportArea').value;
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'amigo-setup.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('exportCloseBtn').addEventListener('click', () => {
    document.getElementById('exportPanel').classList.add('hidden');
  });

  document.getElementById('importBtn').addEventListener('click', () => {
    try {
      const o = JSON.parse(document.getElementById('importArea').value);
      if (!Array.isArray(o.groups) || !o.groups.length) throw new Error('groups required');
      if (!Array.isArray(o.people)) throw new Error('people required');
      state.groups = o.groups;
      state.people = o.people;
      saveState();
      renderAll();
      showMsg(t('imported'), 'ok');
    } catch (e) {
      showMsg(t('importFailed', { err: e.message }), 'err');
    }
  });

  document.getElementById('copyAllBtn').addEventListener('click', () => {
    const links = [...document.querySelectorAll('#resultsContainer a')].map(a => a.href).join('\n');
    navigator.clipboard.writeText(links).then(() => {
      const b = document.getElementById('copyAllBtn');
      const old = b.textContent;
      b.textContent = t('copied');
      setTimeout(() => b.textContent = old, 1200);
    });
  });

  document.getElementById('downloadBtn').addEventListener('click', () => {
    const rows = [...document.querySelectorAll('#resultsContainer tr')].slice(1);
    let out = '';
    rows.forEach(tr => {
      const cells = tr.querySelectorAll('td');
      out += cells[0].textContent + '\t' + cells[1].textContent + '\n';
    });
    const blob = new Blob([out], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'amigo-links.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = window.location.origin + window.location.pathname;
  });

  // ---------- reveal mode ----------
  function initReveal() {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (!to) return false;
    document.getElementById('orgView').classList.add('hidden');
    document.getElementById('revealView').classList.remove('hidden');
    let name = '';
    try { name = base64ToUtf8(to); }
    catch (e) { name = t('invalidLink'); }
    const el = document.getElementById('revealName');
    el.textContent = name || t('empty');
    document.getElementById('prevCard').classList.add('hidden');
    // set "you gift to" prefix
    const eyebrow = document.querySelector('#revealView .reveal-eyebrow');
    if (eyebrow) eyebrow.textContent = t('yourAssignment');
    return true;
  }

  // ---------- boot ----------
  loadState();
  applyLang();
  if (!initReveal()) {
    renderResultsFromStorage(true);
  }
})();
