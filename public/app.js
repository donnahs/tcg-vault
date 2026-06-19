const $ = (s) => document.querySelector(s);
const deck = JSON.parse(localStorage.getItem('tcgVaultDeck') || '[]');

function money(n){ return new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD'}).format(Number(n||0)); }
function saveDeck(){ localStorage.setItem('tcgVaultDeck', JSON.stringify(deck)); updateDeck(); }

function setTab(name){
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===name));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active', p.id===name));
}

document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));

async function searchCards(){
  const game = $('#gameSelect').value;
  const q = $('#query').value.trim();
  $('#results').innerHTML = '<p>Searching...</p>';
  if(game === 'pokemon') return searchPokemon(q);
  return searchRiftbound(q);
}

async function searchPokemon(q){
  try{
    const url = `https://api.pokemontcg.io/v2/cards?q=name:${encodeURIComponent(q)}*&pageSize=16`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('Pokemon API failed');
    const json = await res.json();
    const cards = json.data.map(c=>({
      id:c.id, game:'pokemon', name:c.name, set:c.set?.name || '', rarity:c.rarity || '', image:c.images?.small, marketPrice:c.cardmarket?.prices?.averageSellPrice || c.tcgplayer?.prices?.holofoil?.market || c.tcgplayer?.prices?.normal?.market || 0
    }));
    renderResults(cards);
  }catch(err){
    $('#results').innerHTML = `<p>Online Pokémon search failed. Use manual scan/import. ${err.message}</p>`;
  }
}

function searchRiftbound(q){
  const cards = TCG_SEED.riftboundCards.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())).map(c=>({...c, game:'riftbound'}));
  renderResults(cards);
}

function renderResults(cards){
  if(!cards.length){ $('#results').innerHTML='<p>No cards found.</p>'; return; }
  $('#results').innerHTML = cards.map(c=>`
    <article class="card">
      ${c.image ? `<img src="${c.image}" alt="${escapeHtml(c.name)}">` : `<div class="placeholder"><span>${escapeHtml(c.game || '')}</span></div>`}
      <div class="card-body">
        <h3>${escapeHtml(c.name)}</h3>
        <span class="meta">${escapeHtml(c.set || '')} ${escapeHtml(c.rarity || '')}</span>
        <span class="price">${money(c.marketPrice)}</span>
        <button onclick='addCard(${JSON.stringify(c).replace(/'/g,"&apos;")})'>Add to deck</button>
      </div>
    </article>`).join('');
}

function addCard(card){
  const existing = deck.find(x=>x.id===card.id && x.game===card.game);
  if(existing) existing.qty += 1;
  else deck.push({...card, qty:1});
  saveDeck();
}

function removeCard(id, game){
  const idx = deck.findIndex(x=>x.id===id && x.game===game);
  if(idx>=0){ deck[idx].qty -= 1; if(deck[idx].qty<=0) deck.splice(idx,1); }
  saveDeck();
}

function updateDeck(){
  const count = deck.reduce((a,c)=>a+c.qty,0);
  const cost = deck.reduce((a,c)=>a+(Number(c.marketPrice||0)*c.qty),0);
  $('#deckCount').textContent = `${count} / 60`;
  $('#deckCost').textContent = `${money(cost)} estimated`;
  $('#deckList').innerHTML = deck.length ? deck.map(c=>`
    <div class="deck-row"><span class="qty">${c.qty}x</span><span>${escapeHtml(c.name)} <small class="meta">${escapeHtml(c.game)} · ${money(c.marketPrice)}</small></span><button onclick="removeCard('${c.id}','${c.game}')">-1</button><button onclick='addCard(${JSON.stringify(c).replace(/'/g,"&apos;")})'>+1</button></div>
  `).join('') : '<p>No cards added yet.</p>';
}

function exportDeck(){
  const lines = deck.map(c=>`${c.qty} ${c.name} [${c.game}] ${c.set || ''} ${money(c.marketPrice)}`);
  const cost = deck.reduce((a,c)=>a+(Number(c.marketPrice||0)*c.qty),0);
  $('#deckExport').value = `${lines.join('\n')}\n\nEstimated total: ${money(cost)}`;
}

function renderTopDecks(list = TCG_SEED.topDecks){
  $('#topDeckList').innerHTML = list.map(d=>deckCard(d)).join('');
}
function deckCard(d){
  return `<article class="deck-card"><strong>${escapeHtml(d.name)}</strong><p class="meta">${escapeHtml(d.game)} · ${escapeHtml(d.difficulty)}</p><div class="bar"><span style="width:${d.strength}%"></span></div><p>Strength ${d.strength}/100 · Est ${money(d.cost)}</p><p>${escapeHtml(d.note)}</p></article>`;
}
function findBudget(){
  const max = Number($('#budgetMax').value||0);
  const matches = TCG_SEED.topDecks.filter(d=>d.cost<=max).sort((a,b)=>b.strength-a.strength);
  $('#budgetResults').innerHTML = matches.length ? matches.map(deckCard).join('') : '<p>No seeded decks under that budget yet.</p>';
}

function renderAgents(){
  $('#agentCards').innerHTML = TCG_SEED.agents.map(a => `
    <article class="deck-card"><strong>${escapeHtml(a.name)}</strong><p>${escapeHtml(a.job)}</p><span class="tag">${escapeHtml(a.status)}</span></article>
  `).join('');
  $('#agentPlanOut').value = TCG_SEED.agents.map(a => `${a.name}: ${a.job} [${a.status}]`).join('\n');
}

function copyAgentPlan(){
  navigator.clipboard?.writeText($('#agentPlanOut').value);
  $('#copyAgentPlan').textContent = 'Copied';
  setTimeout(()=>$('#copyAgentPlan').textContent='Copy plan', 1200);
}

$('#imageInput').addEventListener('change', e=>{
  const file = e.target.files?.[0]; if(!file) return;
  const url = URL.createObjectURL(file); $('#preview').src=url; $('#preview').style.display='block';
});
$('#parseScan').addEventListener('click',()=>{
  const names = $('#scanText').value.split('\n').map(s=>s.trim()).filter(Boolean);
  $('#scanNames').innerHTML = names.map(n=>`<button class="chip" onclick="document.querySelector('#query').value='${escapeHtml(n).replace(/'/g,'')}';setTab('search');searchCards();">${escapeHtml(n)}</button>`).join('');
});
function escapeHtml(s){ return String(s??'').replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch])); }

$('#searchBtn').addEventListener('click',searchCards);
$('#exportDeck').addEventListener('click',exportDeck);
$('#clearDeck').addEventListener('click',()=>{ deck.splice(0,deck.length); saveDeck(); $('#deckExport').value=''; });
$('#findBudget').addEventListener('click',findBudget);
$('#copyAgentPlan').addEventListener('click',copyAgentPlan);

renderTopDecks(); findBudget(); updateDeck(); renderAgents(); searchCards();
window.addCard = addCard; window.removeCard = removeCard; window.searchCards = searchCards; window.setTab = setTab;
