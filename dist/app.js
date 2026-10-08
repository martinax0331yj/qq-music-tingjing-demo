(function () {
  'use strict';
  const KEY = 'tingjing-demo-v3';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const copy = value => JSON.parse(JSON.stringify(value));
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const newId = () => 'space-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const official = {
    heavy: 'https://nmixx.jype.com/discography/dru5zt6g',
    forward: 'https://nmixx.jype.com/discography/wg7a3gtv',
    blue: 'https://nmixx.jype.com/discography/gg0x5rid',
    break: 'https://nmixx.jype.com/discography/sw7egr8t'
  };
  const artwork = {
    heavy: './assets/nmixx-heavy.webp',
    forward: './assets/nmixx-forward.webp',
    blue: './assets/nmixx-blue.webp',
    break: './assets/nmixx-break.webp',
    kiss: 'https://i.ytimg.com/vi/75ZD27EsyLk/hqdefault.jpg'
  };
  const tracks = [
    {id:'kiss',title:'Kiss (Instrumental)',artist:'NMIXX',album:'Kiss',date:'2022-07-31',art:artwork.kiss,source:'https://www.youtube.com/watch?v=75ZD27EsyLk',sourceLabel:'NMIXX 官方频道',video:'75ZD27EsyLk',energy:20,vocal:0,familiar:70,genre:'纯音乐',note:'《Kiss》的纯音乐版本。歌曲和封面入口来自 NMIXX 官方艺人频道。'},
    {id:'superior',title:'Superior',artist:'NMIXX',album:'Heavy Serenade',date:'2026-05-11',art:artwork.heavy,source:official.heavy,sourceLabel:'JYP 官方作品页',video:'HvbggieqqUk',energy:84,vocal:68,familiar:71,genre:'高能量',note:'JYP 将这首歌描述为由行进鼓点与富有张力的人声推动的高能量作品。'},
    {id:'papillon',title:'Papillon',artist:'NMIXX',album:'Fe3O4: FORWARD',date:'2025-03-17',art:artwork.forward,source:official.forward,sourceLabel:'JYP 官方作品页',video:'qQhEwaHszKo',energy:72,vocal:60,familiar:74,genre:'嘻哈',note:'JYP 官方介绍：动态展开的嘻哈曲目，前副歌突出成员的人声表现。'},
    {id:'know',title:'KNOW ABOUT ME',artist:'NMIXX',album:'Fe3O4: FORWARD',date:'2025-03-17',art:artwork.forward,source:official.forward,sourceLabel:'JYP 官方作品页',video:'aFrQIJ5cbRc',energy:56,vocal:61,familiar:88,genre:'嘻哈',note:'JYP 将主打曲描述为冷静而有力量的现代嘻哈，使用 trap 鼓点和大胆的合成器。'},
    {id:'heavy',title:'Heavy Serenade',artist:'NMIXX',album:'Heavy Serenade',date:'2026-05-11',art:artwork.heavy,source:official.heavy,sourceLabel:'JYP 官方作品页',video:'6Ycn9qZK09I',energy:81,vocal:72,familiar:91,genre:'电子流行',note:'JYP 官方介绍：作品融合 trance、acid 与鼓打贝斯等电子音乐元素。'},
    {id:'blue',title:'Blue Valentine',artist:'NMIXX',album:'Blue Valentine',date:'2025-10-13',art:artwork.blue,source:official.blue,sourceLabel:'JYP 官方作品页',video:'EmeW6li6bbo',energy:60,vocal:70,familiar:93,genre:'流行',note:'收录于 NMIXX 2025 年同名专辑《Blue Valentine》，可通过官方音乐视频播放。'},
    {id:'dash',title:'DASH',artist:'NMIXX',album:'Fe3O4: BREAK',date:'2024-01-15',art:artwork.break,source:official.break,sourceLabel:'JYP 官方作品页',video:'7UecFm_bSTU',energy:88,vocal:72,familiar:87,genre:'MIXX POP',note:'JYP 官方介绍：融合 old school hip-hop、流动低音线与 pop punk 的动态作品。'}
  ];
  const members = [
    {id:'lily',name:'LILY',initial:'L',photo:'./assets/lily-user.jpg',position:'31%',invite:'把好声音交给夜晚，我们从这一首开始。'},
    {id:'haewon',name:'HAEWON',initial:'H',photo:'./assets/haewon-user.jpg',invite:'先把忙碌放一旁，陪我听完这一段旋律。'},
    {id:'sullyoon',name:'SULLYOON',initial:'S',photo:'./assets/sullyoon-user.jpg',position:'31%',invite:'让今天慢一点，从喜欢的歌开始。'},
    {id:'bae',name:'BAE',initial:'B',photo:'./assets/bae-user.jpg',position:'30%',invite:'想换个节奏吗？这一首一起试试。'},
    {id:'jiwoo',name:'JIWOO',initial:'J',photo:'./assets/jiwoo-user.jpg',position:'35%',invite:'把心情调亮一点，按下播放吧。'},
    {id:'kyujin',name:'KYUJIN',initial:'K',photo:'./assets/kyujin-user.jpg',position:'31%',invite:'跟着下一拍出发，今晚的歌由你决定。'},
    {id:'group',name:'NMIXX 组合',initial:'N',photo:'./assets/nmixx-group-user.jpg',position:'64%',group:true,invite:'六种音色一起，陪你把这一首听完。'}
  ];
  const seeds = [
    {id:'nmixx',name:'NMIXX 听境',icon:'♫',rec:{familiarity:82,exploration:22,energy:68,vocal:67,positive:['流行','熟悉曲目'],negative:[]},player:{timer:0},memory:['喜欢的艺人和作品放在同一个听境']},
    {id:'focus',name:'论文听境',icon:'▦',rec:{familiarity:80,exploration:20,energy:28,vocal:15,positive:['纯音乐','熟悉曲目'],negative:['强节奏']},player:{timer:120},memory:['写作时偏好低干扰音乐']},
    {id:'night',name:'深夜听境',icon:'☾',rec:{familiarity:75,exploration:20,energy:20,vocal:12,positive:['纯音乐','慢节奏'],negative:['强节奏']},player:{timer:30},memory:['睡前更喜欢柔和的音乐']},
    {id:'commute',name:'回家路上',icon:'◒',rec:{familiarity:67,exploration:38,energy:60,vocal:60,positive:['流行','熟悉曲目'],negative:[]},player:{timer:0},memory:['通勤时愿意听有节奏的歌']}
  ];
  const starter = () => ({spaces:copy(seeds),activeId:'nmixx',theme:'blue',accent:null,companion:'none',member:'haewon',density:'normal',favorites:[],queueOpen:false,contextOpen:false,listenHistory:{}});
  let saved;
  try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (_) { saved = null; }
  if (!saved || !Array.isArray(saved.spaces) || !saved.spaces.length) saved = starter();
  if (!members.some(member => member.id === saved.member)) saved.member = 'haewon';
  if (!['quiet','normal','deep'].includes(saved.density)) saved.density = 'normal';
  if (!saved.listenHistory || typeof saved.listenHistory !== 'object' || Array.isArray(saved.listenHistory)) saved.listenHistory = {};
  let current = copy(saved.spaces.find(space => space.id === saved.activeId) || saved.spaces[0]);
  let draft = copy(current), editingId = null, currentTrackId = 'heavy';
  let sessionMemory = [], skipped = new Set(), searchText = '', friendPick = null;
  let videoOpen = false, player = null, playerReady = false, apiRequested = false, playing = false, connecting = false, connectionTimer = null, playedSeconds = 0, progressLoop = null, toastTimer = null;
  let roomOpen = false, roomSeconds = 0, lastListenTick = Date.now(), historyUnsaved = 0, calendarSample = false;

  function persist() { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (_) { toast('当前浏览器未能保存设置'); } }
  function toast(message) { const element = $('#toast'); element.textContent = message; element.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove('show'), 2800); }
  function song() { return tracks.find(track => track.id === currentTrackId) || tracks[0]; }
  function time(seconds) { seconds = Math.max(0, Math.floor(seconds || 0)); return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2,'0'); }
  function openDialog(selector) { closeView(); const dialog = $(selector); if (dialog && !dialog.open) dialog.showModal(); }
  function closeDialog(selector) { const dialog = $(selector); if (dialog && dialog.open) dialog.close(); }
  function closeView() { ['#create-view','#spaces-view','#artist-view'].forEach(closeDialog); }
  function openView(name) { closeView(); const dialog = $('#' + name + '-view'); if (!dialog) return; if (name === 'create') renderDraft(); if (name === 'spaces') renderSpaces(); if (name === 'artist') {renderMembers();renderArtistTracks();} dialog.showModal(); }
  function score(track) {
    const r = current.rec;
    let result = 110 - Math.abs(track.energy-r.energy)*.55 - Math.abs(track.vocal-r.vocal)*.28;
    result += (track.familiar-50)*(r.familiarity-50)/85;
    if (r.positive.some(tag => track.genre.includes(tag) || (tag === '熟悉曲目' && track.familiar > 85))) result += 18;
    if (r.negative.some(tag => track.genre.includes(tag) || (tag === '强节奏' && track.energy > 72))) result -= 32;
    if (skipped.has(track.id)) result -= 90;
    return result;
  }
  function ranked() { return tracks.slice().sort((a,b) => score(b)-score(a)); }
  function adjacentTrack(direction) { const order=ranked(), index=order.findIndex(track=>track.id===currentTrackId); return order[(index+direction+order.length)%order.length]; }
  function nextCandidate() { return ranked().find(track => track.id !== currentTrackId && !skipped.has(track.id)) || ranked().find(track => track.id !== currentTrackId) || tracks[0]; }
  function renderClock() { const now = new Date(); $('#clock').textContent = now.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}); $('#weather').textContent = (now.getMonth()+1) + '/' + String(now.getDate()).padStart(2,'0') + ' · 你的音乐时刻'; }
  function renderTheme() {
    document.body.dataset.theme = saved.theme || 'blue';
    document.body.style.removeProperty('--accent'); document.body.style.removeProperty('--accent-ink');
    if (saved.accent) {
      document.body.style.setProperty('--accent', saved.accent);
      const hex = saved.accent.replace('#',''), rgb = [0,2,4].map(i => parseInt(hex.slice(i,i+2),16));
      const luminance = (.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2])/255;
      document.body.style.setProperty('--accent-ink', luminance > .57 ? '#13202b' : '#fff');
      $('#custom-accent').value = saved.accent;
    }
    $$('[data-theme-choice]').forEach(button => button.classList.toggle('selected', button.dataset.themeChoice === saved.theme && !saved.accent));
  }
  function renderMembers() {
    $('#member-grid').innerHTML = members.map(member => '<button class="member-card' + (member.group ? ' group-card' : '') + '" type="button" data-member="' + member.id + '" aria-pressed="' + (saved.member === member.id) + '"><span class="member-card-visual"><img src="' + member.photo + '" alt="" loading="lazy"></span><span><strong>' + member.name + '</strong><small>' + escapeHtml(member.invite) + '</small></span></button>').join('');
  }
  function renderMoment(elapsed = 0) {
    if (!roomOpen) return;
    const visual = $('#room-visual'), box = $('.room-bottom');
    let message = playing ? '音乐正在继续，陪听视觉与你同步。' : '按下播放，画面会跟随音乐轻轻变化。';
    let active = false;
    if (saved.density === 'quiet') {
      message = '安静陪听中。只有音乐、画面和这一段时间。';
    } else if (saved.density === 'deep' && playing && elapsed >= 90 && elapsed < 101) {
      active = true;
      message = '作品资料：' + song().note;
    } else if (playing && elapsed >= 45 && elapsed < 53) {
      active = true;
      message = '音乐时刻：留意这一段的层次变化。';
    } else if (saved.density === 'deep') {
      message = '深度陪听中。作品线索会跟随当前歌曲展开。';
    }
    $('#room-moment').textContent = message;
    visual.classList.toggle('moment-active', active);
    box.classList.toggle('is-active', active);
  }
  function renderRoomProgress(elapsed = 0, duration = 0) {
    if (!roomOpen) return;
    $('#room-elapsed').textContent = time(elapsed);
    $('#room-duration').textContent = duration ? time(duration) : '--:--';
    $('#room-seek').disabled = !duration;
    if (duration) $('#room-seek').max = Math.ceil(duration);
    $('#room-seek').value = Math.floor(elapsed);
    $('#room-session').textContent = '本次陪听 ' + time(roomSeconds);
    renderMoment(elapsed);
  }
  function renderRoom() {
    if (!roomOpen) return;
    const member = members.find(item => item.id === saved.member) || members[1], track = song(), pick = adjacentTrack(1);
    $('#room-title').textContent = member.group ? 'NMIXX 一起听' : member.name + ' 陪你听';
    $('#room-member').textContent = member.name;
    $('#room-presence').textContent = member.invite;
    $('#room-space').textContent = current.name + ' × ' + member.name;
    $('#room-scene-label').textContent = member.group ? 'NMIXX · ALL MEMBERS' : 'NMIXX · LISTENING WITH YOU';
    $('#room-density').value = saved.density;
    const room = $('#artist-room');
    for (const mode of ['quiet','normal','deep']) room.classList.toggle('mode-' + mode, saved.density === mode);
    $('#room-mode-cue').textContent = ({quiet:'安静陪听 · 收起提示，留给音乐更多空间',normal:'默认陪听 · 音乐与轻量提示自然出现',deep:'深度陪听 · 作品线索随歌曲展开'})[saved.density];
    $('#member-bubble-link').textContent = member.name + ' 的泡泡 ↗';
    $('#member-bubble-link').setAttribute('aria-label', member.name + ' 的泡泡，演示入口');
    $('#room-portrait').hidden = !member.photo;
    if (member.photo) { $('#room-portrait').src = member.photo; $('#room-portrait').alt = '用户提供的 ' + member.name + ' 照片'; }
    $('#room-monogram').textContent = member.initial;
    $('#room-visual').classList.toggle('has-photo', !!member.photo);
    $('#room-visual').classList.toggle('is-group', !!member.group);
    $('#room-visual').style.setProperty('--portrait-image', 'url("' + member.photo + '")');
    $('#room-visual').style.setProperty('--portrait-position', member.position || '30%');
    $('#room-cover').src = track.art;
    $('#room-cover').alt = track.album + ' 官方封面';
    $('#room-song-title').textContent = track.title;
    $('#room-song-artist').textContent = track.artist + ' · ' + track.album;
    $('#room-song-note').textContent = saved.density === 'quiet' ? '音乐优先，资料已收起。' : track.note;
    $('#room-deep-detail').hidden = saved.density !== 'deep';
    $('#room-deep-text').textContent = track.genre + ' · ' + track.album + ' · ' + track.date;
    $('#room-source').href = track.source;
    $('#room-recommend-title').textContent = pick.title;
    $('#room-favorite').setAttribute('aria-pressed', saved.favorites.includes(track.id) ? 'true' : 'false');
    let duration = 0, elapsed = 0;
    if (playerReady) { try {duration = player.getDuration() || 0;elapsed = player.getCurrentTime() || 0;} catch (_) {} }
    renderRoomProgress(elapsed, duration);
  }
  function dateKey(date) { return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0'); }
  function listenTime(seconds) { const whole=Math.floor(Math.max(0,seconds||0)); if(whole<60)return whole+' 秒'; const minutes=Math.floor(whole/60); if(minutes<60)return minutes+' 分 '+(whole%60)+' 秒'; return Math.floor(minutes/60)+' 小时 '+(minutes%60)+' 分'; }
  function compactListenTime(seconds) { if(seconds<60)return Math.floor(seconds)+'s'; if(seconds<3600)return Math.floor(seconds/60)+'m'; return Math.floor(seconds/3600)+'h'; }
  function flushHistory() { if(historyUnsaved>0){persist();historyUnsaved=0;} }
  function recordListening() {
    const now=Date.now(), delta=Math.min(2,Math.max(0,(now-lastListenTick)/1000));
    lastListenTick=now;
    if(!playing || !roomOpen || !delta)return;
    roomSeconds+=delta;
    const key=dateKey(new Date(now));
    saved.listenHistory[key]=(Number(saved.listenHistory[key])||0)+delta;
    historyUnsaved+=delta;
    if(historyUnsaved>=5)flushHistory();
  }
  function renderCalendar() {
    const today=new Date(), days=[];
    const sample={};
    for(const [offset,seconds] of [[12,18*60],[5,42*60],[1,27*60]])sample[dateKey(new Date(today.getFullYear(),today.getMonth(),today.getDate()-offset))]=seconds;
    for(let offset=27;offset>=0;offset--){const date=new Date(today.getFullYear(),today.getMonth(),today.getDate()-offset),key=dateKey(date),seconds=Math.max(0,Number(calendarSample?sample[key]:saved.listenHistory[key])||0);days.push({key,date,seconds});}
    const total=days.reduce((sum,day)=>sum+day.seconds,0);
    $('#calendar-intro').textContent=calendarSample?'正在预览样例记录，不会写入你的实际陪听时长。':'只记录你在本机实际播放且打开陪听空间的时间。';
    $('#calendar-sample').textContent=calendarSample?'查看我的记录':'预览样例记录';
    $('#calendar-total').textContent=listenTime(total);
    $('#calendar-grid').innerHTML=days.map(day=>'<div class="calendar-day'+(day.seconds>=1?' is-active':'')+(day.key===dateKey(today)?' is-today':'')+'" role="listitem" aria-label="'+day.key+' 陪听 '+listenTime(day.seconds)+'"><strong>'+day.date.getDate()+'</strong><small>'+(day.seconds>=1?compactListenTime(day.seconds):'—')+'</small></div>').join('');
    const active=days.filter(day=>day.seconds>=1).reverse();
    $('#calendar-list').innerHTML=active.length?active.map(day=>'<div class="calendar-list-row"><span>'+day.key+'</span><strong>'+listenTime(day.seconds)+'</strong></div>').join(''):'<p class="calendar-empty">还没有陪听记录。播放官方视频后，这里会按日期记录时长。</p>';
  }
  function openArtistRoom() {
    closeView();
    const dialog = $('#artist-room');
    if (!dialog.open) dialog.showModal();
    if(!roomOpen)roomSeconds=0;
    roomOpen = true;
    lastListenTick=Date.now();
    $('#room-video-slot').appendChild($('#official-player-wrap'));
    saved.companion = 'nmixx';
    persist();
    renderCompanion();
    renderRoom();
  }
  function closeArtistRoom() {
    recordListening();
    flushHistory();
    $('#player-video-home').appendChild($('#official-player-wrap'));
    const dialog = $('#artist-room');
    if (dialog.open) dialog.close();
    roomOpen = false;
  }
  function renderSong() {
    const track = song(), image = $('#album-image');
    image.hidden = false;
    image.onerror = () => { image.hidden = true; };
    image.src = track.art;
    image.alt = track.album + ' 官方作品封面或视频缩略图';
    $('#cover-source').href = track.source;
    $('#cover-source').setAttribute('aria-label','查看 ' + track.album + ' 的官方作品页');
    $('#song-title').textContent = track.title;
    $('#song-artist').textContent = track.artist + ' · ' + track.album;
    $('#song-release').textContent = track.date + ' · 官方作品';
    $('#song-note').textContent = track.note;
    $('#release-source-link').href = track.source;
    $('#release-source-link').textContent = track.sourceLabel;
    $('#video-source-link').href = 'https://www.youtube.com/watch?v=' + track.video;
    $('#official-video-link').href = 'https://www.youtube.com/watch?v=' + track.video;
    $('#favorite').setAttribute('aria-pressed', saved.favorites.includes(track.id) ? 'true' : 'false');
    if (!videoOpen) { $('#elapsed').textContent = '0:00'; $('#duration').textContent = '--:--'; $('#seek').value = 0; $('#seek').disabled = true; }
  }
  function renderQueue() {
    let order = ranked();
    if (friendPick) { const index = order.findIndex(track => track.id === friendPick); if (index > 1) order.splice(1,0,order.splice(index,1)[0]); }
    const active = song();
    order = [active].concat(order.filter(track => track.id !== active.id));
    if (searchText) order = order.filter(track => (track.title + track.artist + track.album).toLowerCase().includes(searchText.toLowerCase()));
    $('#queue-count').textContent = order.length + ' 首';
    $('#queue-list').innerHTML = order.length ? order.map(track => '<button class="queue-row ' + (track.id === currentTrackId ? 'active' : '') + '" type="button" data-track="' + track.id + '"><img class="queue-cover" src="' + track.art + '" alt="" loading="lazy"><span class="queue-info"><b>' + escapeHtml(track.title) + '</b><small>' + escapeHtml(track.artist) + ' · ' + escapeHtml(track.album) + '</small></span><span class="queue-action">' + (track.id === currentTrackId ? '当前' : '播放') + '</span></button>').join('') : '<p class="side-prefs">没有找到匹配曲目。</p>';
    $('#queue-toggle').setAttribute('aria-expanded', saved.queueOpen ? 'true' : 'false');
    $('#queue-list').hidden = !saved.queueOpen;
  }
  function renderCompanion() {
    const member = members.find(item => item.id === saved.member) || members[1];
    $('#companion-title').textContent = '现在在听';
    $('#companion-body').innerHTML = '<span class="side-label">CURRENT SPACE</span><div class="side-space-name">' + escapeHtml(current.name) + '</div><div class="side-prefs">熟悉度 ' + current.rec.familiarity + '% · 探索 ' + current.rec.exploration + '%<br>能量 ' + current.rec.energy + '% · 人声 ' + current.rec.vocal + '%</div><div class="memory-pills">' + current.memory.slice(0,2).map(item => '<span>' + escapeHtml(item) + '</span>').join('') + '</div><div class="side-next"><span class="side-label">UP NEXT</span><b>' + escapeHtml(nextCandidate().title) + '</b><small>NMIXX · ' + escapeHtml(nextCandidate().album) + '</small></div><div class="side-bottom">' + escapeHtml(sessionMemory[0] || '本次还没有微调') + '</div>';
    $('#artist-chip').classList.toggle('active', saved.companion === 'nmixx');
    $('#artist-chip-label').textContent = saved.companion === 'nmixx' ? member.name + ' 陪听' : '艺人陪听';
    $('#companion-panel').hidden = !saved.contextOpen;
    $('#current-space-chip').setAttribute('aria-expanded', saved.contextOpen ? 'true' : 'false');
  }
  function renderPlayer() {
    $('#current-space-label').textContent = current.name;
    $('#context-line').textContent = (current.rec.familiarity >= 70 ? '熟悉歌曲优先' : '多一点新歌') + ' · ' + (current.rec.exploration <= 30 ? '低探索' : '适度探索') + ' · ' + (current.rec.energy < 50 ? '中低能量' : '高能量');
    renderSong(); renderQueue(); renderCompanion(); renderRoom();
  }
  function renderSpaces() {
    $('#spaces-grid').innerHTML = saved.spaces.map(space => '<button class="space-card" type="button" data-space="' + escapeHtml(space.id) + '"><span class="space-icon">' + escapeHtml(space.icon) + '</span><span><h3>' + escapeHtml(space.name) + '</h3><p>熟悉度 ' + space.rec.familiarity + ' · 能量 ' + space.rec.energy + '</p></span><span>进入 ↗</span></button>').join('');
  }
  function renderArtistTracks() {
    $('#artist-tracks').innerHTML = tracks.filter(track => track.id !== 'kiss').slice(0,6).map(track => '<button type="button" data-artist-select="' + track.id + '"><img src="' + track.art + '" alt="" loading="lazy"><span><strong>' + escapeHtml(track.title) + '</strong><small>' + escapeHtml(track.album) + ' · ' + track.date + '</small></span><span>播放</span></button>').join('');
  }
  function renderDraft() {
    $('#draft-name').textContent = draft.name;
    ['familiarity','exploration','energy','vocal'].forEach(key => { $('#' + key + '-range').value = draft.rec[key]; $('#' + key + '-value').textContent = draft.rec[key] + '%'; });
    $('#positive-tags').innerHTML = draft.rec.positive.map(tag => '<b>' + escapeHtml(tag) + '</b>').join('');
    $('#negative-tags').innerHTML = draft.rec.negative.map(tag => '<b>' + escapeHtml(tag) + '</b>').join('');
    $('#timer-select').value = String(draft.player.timer);
  }
  function interpret(phrase) {
    const focus = /论文|学习|写作|工作|专注|复习|赶稿/.test(phrase), sleep = /睡|助眠|晚安|深夜/.test(phrase), commute = /通勤|地铁|回家|路上/.test(phrase), sport = /运动|健身|跑步|训练/.test(phrase);
    const tired = /困|提神|有劲/.test(phrase), familiar = /熟悉|常听|老歌|收藏/.test(phrase), instrumental = /纯音乐|不要人声|没有歌词/.test(phrase);
    const minutes = phrase.match(/(\d{1,3})\s*分钟/), hours = phrase.match(/(\d{1,2})\s*小时/);
    const requested = minutes ? Number(minutes[1]) : hours ? Number(hours[1])*60 : sleep ? 30 : focus ? 120 : 0;
    const timer = [0,15,30,60,120].reduce((best,item) => Math.abs(item-requested) < Math.abs(best-requested) ? item : best,0);
    const result = {id:newId(),name:focus?'论文听境':sleep?'睡前听境':commute?'回家路上':sport?'运动听境':'我的听境',icon:focus?'▦':sleep?'☾':commute?'◒':sport?'✶':'◉',rec:{familiarity:familiar?84:67,exploration:familiar?16:36,energy:sleep?20:sport?86:commute?60:focus?(tired?45:28):50,vocal:instrumental?0:focus?18:sleep?15:60,positive:instrumental?['纯音乐','熟悉曲目']:focus?['纯音乐','熟悉曲目']:sport?['高能量','MIXX POP']:['流行','熟悉曲目'],negative:/不要太吵|安静|白噪音/.test(phrase)?['强节奏']:[]},player:{timer},memory:[]};
    const tags = [focus?'专注':sleep?'睡前':commute?'通勤':sport?'运动':'自由听歌'];
    if(familiar)tags.push('熟悉歌曲优先'); if(instrumental)tags.push('减少人声'); if(tired)tags.push('适度提神'); if(timer)tags.push(timer+' 分钟定时');
    return {space:result,tags};
  }
  function selectSpace(spaceId) { const found = saved.spaces.find(space => space.id === spaceId); if(!found)return; current = copy(found); saved.activeId = spaceId; sessionMemory = []; skipped.clear(); friendPick = null; playedSeconds = 0; currentTrackId = ranked()[0].id; persist(); closeView(); chooseTrack(currentTrackId); toast('已进入「' + current.name + '」'); }
  function chooseTrack(trackId) { if (!tracks.some(track => track.id === trackId)) return; currentTrackId = trackId; playedSeconds = 0; renderPlayer(); if (videoOpen && playerReady) { setConnecting(true); try { player.loadVideoById(song().video); } catch (_) { playbackFailure('切歌失败，请在官方播放器中重试。'); } } else if (!videoOpen) { setPlaying(false); } }
  function skip(direction) { const next = adjacentTrack(direction); if(direction > 0)skipped.add(currentTrackId); chooseTrack(next.id); }
  function applyReason(reason) { const rec = current.rec; let label = '重新排序'; if(reason==='loud'){rec.energy=Math.max(0,rec.energy-20);label='降低节奏强度';} if(reason==='slow'){rec.energy=Math.min(100,rec.energy+20);label='提高能量';} if(reason==='unfamiliar'){rec.exploration=Math.max(0,rec.exploration-20);rec.familiarity=Math.min(100,rec.familiarity+15);label='减少陌生歌曲';} if(reason==='vocal'){rec.vocal=Math.max(0,rec.vocal-25);label='减少人声';} if(reason==='style'){rec.positive=['纯音乐','熟悉曲目'];label='换一种风格';} if(reason==='today'){label='本次减少这首歌';} sessionMemory.unshift(label); skipped.add(currentTrackId); chooseTrack(nextCandidate().id); closeDialog('#adjust-dialog'); toast('本次已调整：'+label); }
  function applyAdjust(kind,phrase) { const rec=current.rec;let label=phrase||'已微调'; if(kind==='familiar'){rec.familiarity=Math.min(100,rec.familiarity+15);rec.exploration=Math.max(0,rec.exploration-10);label='熟悉一点';} else if(kind==='quiet'){rec.energy=Math.max(0,rec.energy-14);label='安静一点';} else if(kind==='energy'){rec.energy=Math.min(100,rec.energy+16);label='有劲一点';} else if(kind==='instrumental'){rec.vocal=0;label='减少人声';} else if(kind==='different'){rec.exploration=Math.min(100,rec.exploration+18);label='换种风格';} else if(/安静|太吵/.test(phrase))rec.energy=Math.max(0,rec.energy-14); else if(/熟悉|太陌生/.test(phrase))rec.familiarity=Math.min(100,rec.familiarity+15); else if(/提神|有劲/.test(phrase))rec.energy=Math.min(100,rec.energy+16); sessionMemory.unshift(label); renderPlayer(); closeDialog('#adjust-dialog'); toast('已调整本次听境'); }
  function justRight() { const track=song(); current.rec.energy=Math.round(current.rec.energy*.4+track.energy*.6); current.rec.vocal=Math.round(current.rec.vocal*.4+track.vocal*.6); if(!current.rec.positive.includes(track.genre))current.rec.positive.unshift(track.genre); sessionMemory.unshift('接下来更像「'+track.title+'」'); renderPlayer(); closeDialog('#adjust-dialog'); toast('后续会更像这首歌'); }
  function saveSession() { const stored=saved.spaces.find(space=>space.id===current.id); if(stored){current.memory=sessionMemory.concat(current.memory).slice(0,8);Object.assign(stored,copy(current));persist();sessionMemory=[];renderCompanion();toast('已保存到「'+current.name+'」');}closeDialog('#adjust-dialog'); }
  function setConnecting(value) { if(value && playing){recordListening();flushHistory();} connecting=value; clearTimeout(connectionTimer); if(value)playing=false; for(const selector of ['#play-pause','#room-play']) { const button=$(selector); button.classList.toggle('is-connecting',value); if(value)button.classList.remove('is-playing'); button.setAttribute('aria-busy',value?'true':'false'); button.setAttribute('aria-label',value?'正在连接官方播放器':playing?'暂停官方视频':'播放官方视频'); } if(value) { $('#player-status').textContent='正在连接官方播放器…'; connectionTimer=setTimeout(()=>{if(videoOpen&&connecting)playbackFailure('连接超时，请检查网络或打开官方频道。');},9000); } }
  function setPlaying(value) { if(playing)recordListening(); if(!value)flushHistory(); setConnecting(false); playing=value; lastListenTick=Date.now(); for(const selector of ['#play-pause','#room-play']) {$(selector).classList.toggle('is-playing',value);$(selector).setAttribute('aria-label',value?'暂停官方视频':'播放官方视频');} renderMoment(playerReady ? (()=>{try{return player.getCurrentTime()||0}catch(_){return 0}})() : 0); }
  function playbackFailure(message) { setPlaying(false); $('#player-status').textContent=message; toast(message); }
  function refreshProgress() { if(!playerReady)return; try { const duration=player.getDuration()||0, elapsed=player.getCurrentTime()||0; if(duration>0){$('#seek').disabled=false;$('#seek').max=Math.ceil(duration);$('#seek').value=Math.floor(elapsed);$('#duration').textContent=time(duration);$('#elapsed').textContent=time(elapsed);}recordListening();renderRoomProgress(elapsed,duration);if(playing&&current.player.timer){playedSeconds+=.5;if(playedSeconds>=current.player.timer*60){player.pauseVideo();toast('定时播放已结束');}} } catch(_){} }
  function mountYouTube() {
    if (!videoOpen || player) return;
    if (!window.YT || !window.YT.Player) return;
    player = new window.YT.Player('yt-player',{width:'100%',height:'100%',videoId:song().video,playerVars:{playsinline:1,rel:0,origin:location.origin},events:{onReady:event=>{playerReady=true;$('#player-status').textContent='已连接官方播放器。若没有自动开始，请点视频中的播放键。';try{event.target.loadVideoById(song().video);event.target.playVideo();}catch(_){playbackFailure('无法启动视频，请在官方播放器中重试。');} if(!progressLoop)progressLoop=setInterval(refreshProgress,500);},onStateChange:event=>{if(event.data===1)setPlaying(true);else if(event.data===2)setPlaying(false);else if(event.data===0){setPlaying(false);skip(1);}},onError:()=>playbackFailure('当前视频无法嵌入，请使用官方频道入口。')}});
  }
  function ensureYouTube() { if(window.YT && window.YT.Player){mountYouTube();return;}if(apiRequested)return;apiRequested=true;window.onYouTubeIframeAPIReady=mountYouTube;const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.async=true;script.onerror=()=>{apiRequested=false;script.remove();playbackFailure('当前网络无法连接官方播放器，请使用官方频道入口。');};document.head.appendChild(script); }
  function togglePlayback() { if(connecting){toast('官方播放器正在连接，请稍候');return;} if(!videoOpen){videoOpen=true;$('#official-player-wrap').hidden=false;$('#official-player-wrap').scrollIntoView({behavior:'smooth',block:'nearest'});setConnecting(true);if(playerReady){try{player.loadVideoById(song().video);player.playVideo();}catch(_){playbackFailure('无法启动视频，请在官方播放器中重试。');}}else ensureYouTube();return;} if(!playerReady){setConnecting(true);ensureYouTube();return;} try{if(playing){setPlaying(false);player.pauseVideo();}else{setConnecting(true);player.playVideo();}}catch(_){playbackFailure('请在官方播放器中操作播放。');} }
  function closeVideo() { if(playerReady){try{player.stopVideo();}catch(_){}}videoOpen=false;playedSeconds=0;$('#official-player-wrap').hidden=true;setPlaying(false);$('#seek').disabled=true;$('#seek').value=0;$('#elapsed').textContent='0:00';$('#duration').textContent='--:--';renderRoomProgress(); }
  function toggleFavorite() { const index=saved.favorites.indexOf(currentTrackId);if(index<0)saved.favorites.push(currentTrackId);else saved.favorites.splice(index,1);persist();renderSong();renderRoom();toast(index<0?'已收藏这首歌':'已取消收藏'); }

  $('#nav-spaces').addEventListener('click',()=>openView('spaces'));
  $('#nav-artist').addEventListener('click',()=>openView('artist'));
  $('#artist-chip').addEventListener('click',()=>saved.companion==='nmixx'?openArtistRoom():openView('artist'));
  $('#member-bubble-link').addEventListener('click',event=>{event.preventDefault();toast('泡泡入口为演示占位，暂未接入');});
  $('#friend-chip').addEventListener('click',()=>openDialog('#friend-dialog'));
  $('#current-space-chip').addEventListener('click',()=>{saved.contextOpen=!saved.contextOpen;persist();renderCompanion();});
  $('#collapse-side').addEventListener('click',()=>{saved.contextOpen=false;persist();renderCompanion();$('#current-space-chip').focus();});
  $('#queue-toggle').addEventListener('click',()=>{saved.queueOpen=!saved.queueOpen;persist();renderQueue();});
  $('#queue-list').addEventListener('click',event=>{const row=event.target.closest('[data-track]');if(row)chooseTrack(row.dataset.track);});
  $('#search-input').addEventListener('input',event=>{searchText=event.target.value.trim();if(searchText)saved.queueOpen=true;renderQueue();});
  $('#edit-space').addEventListener('click',()=>{draft=copy(current);editingId=current.id;$('#intent-input').value='';$('#intent-tags').innerHTML='';openView('create');});
  $('#adjust-trigger').addEventListener('click',()=>openDialog('#adjust-dialog'));
  $('#prev-track').addEventListener('click',()=>skip(-1));
  $('#next-track').addEventListener('click',()=>skip(1));
  $('#play-pause').addEventListener('click',togglePlayback);
  $('#close-video').addEventListener('click',closeVideo);
  $('#seek').addEventListener('input',event=>{if(playerReady)try{player.seekTo(Number(event.target.value),true);}catch(_){}});
  $('#favorite').addEventListener('click',toggleFavorite);
  $('#just-right').addEventListener('click',justRight);
  $$('[data-close]').forEach(button=>button.addEventListener('click',()=>closeDialog('#'+button.dataset.close)));
  $$('[data-close-view]').forEach(button=>button.addEventListener('click',closeView));
  $$('[data-reason]').forEach(button=>button.addEventListener('click',()=>applyReason(button.dataset.reason)));
  $$('[data-adjust]').forEach(button=>button.addEventListener('click',()=>applyAdjust(button.dataset.adjust)));
  $('#adjust-form').addEventListener('submit',event=>{event.preventDefault();const phrase=$('#adjust-input').value.trim();if(!phrase){toast('说一句想怎么调整');return;}applyAdjust('',phrase);$('#adjust-input').value='';});
  $('#save-session').addEventListener('click',saveSession);
  $('#create-from-spaces').addEventListener('click',()=>{draft=copy(current);draft.id=newId();draft.name='我的新听境';editingId=null;$('#intent-input').value='';$('#intent-tags').innerHTML='';openView('create');});
  $('#spaces-grid').addEventListener('click',event=>{const button=event.target.closest('[data-space]');if(button)selectSpace(button.dataset.space);});
  $('#intent-form').addEventListener('submit',event=>{event.preventDefault();const phrase=$('#intent-input').value.trim();if(!phrase){toast('先描述你的听歌需求');return;}const result=interpret(phrase);draft=result.space;editingId=null;renderDraft();$('#intent-tags').innerHTML=result.tags.map(tag=>'<span>'+escapeHtml(tag)+'</span>').join('');toast('听境配置已生成，可继续微调');});
  $$('[data-prompt]').forEach(button=>button.addEventListener('click',()=>{$('#intent-input').value=button.dataset.prompt;$('#intent-form').requestSubmit();}));
  ['familiarity','exploration','energy','vocal'].forEach(key=>$('#'+key+'-range').addEventListener('input',event=>{draft.rec[key]=Number(event.target.value);$('#'+key+'-value').textContent=event.target.value+'%';}));
  $('#timer-select').addEventListener('change',event=>{draft.player.timer=Number(event.target.value);});
  $('#rename-space').addEventListener('click',()=>{const next=window.prompt('给听境起个名字',draft.name);if(next&&next.trim()){draft.name=next.trim().slice(0,18);renderDraft();}});
  $('#start-space').addEventListener('click',()=>{if(!draft.name.trim())draft.name='我的听境';if(editingId){draft.id=editingId;const index=saved.spaces.findIndex(space=>space.id===editingId);if(index>=0)saved.spaces[index]=copy(draft);}else{draft.id=newId();saved.spaces.unshift(copy(draft));}saved.activeId=draft.id;current=copy(draft);sessionMemory=[];skipped.clear();currentTrackId=ranked()[0].id;persist();closeView();chooseTrack(currentTrackId);toast('已进入「'+current.name+'」');});
  $('#member-grid').addEventListener('click',event=>{const button=event.target.closest('[data-member]');if(!button)return;saved.member=button.dataset.member;persist();renderMembers();});
  $('#artist-tracks').addEventListener('click',event=>{const button=event.target.closest('[data-artist-select]');if(!button)return;chooseTrack(button.dataset.artistSelect);openArtistRoom();toast('已进入陪听空间');});
  $('#choose-artist').addEventListener('click',()=>{openArtistRoom();toast('已进入陪听空间');});
  $('#choose-none').addEventListener('click',()=>{closeArtistRoom();saved.companion='none';saved.contextOpen=false;persist();renderCompanion();closeView();toast('已切换为只听音乐');});
  $('#room-back').addEventListener('click',closeArtistRoom);
  $('#artist-room').addEventListener('cancel',event=>{event.preventDefault();closeArtistRoom();});
  $('#room-switch').addEventListener('click',()=>{closeArtistRoom();openView('artist');});
  $('#room-density').addEventListener('change',event=>{saved.density=event.target.value;persist();renderRoom();toast(({quiet:'已切换安静陪听',normal:'已切换默认陪听',deep:'已切换深度陪听'})[saved.density]);});
  $('#room-prev').addEventListener('click',()=>skip(-1));
  $('#room-play').addEventListener('click',togglePlayback);
  $('#room-next').addEventListener('click',()=>skip(1));
  $('#room-seek').addEventListener('input',event=>{if(playerReady)try{player.seekTo(Number(event.target.value),true);}catch(_){}});
  $('#room-favorite').addEventListener('click',toggleFavorite);
  $('#room-tune').addEventListener('click',()=>openDialog('#adjust-dialog'));
  $('#room-calendar').addEventListener('click',()=>{calendarSample=false;renderCalendar();openDialog('#calendar-dialog');});
  $('#calendar-sample').addEventListener('click',()=>{calendarSample=!calendarSample;renderCalendar();});
  $('#room-keep-queue').addEventListener('click',()=>{skip(1);if(!videoOpen)togglePlayback();toast('继续你的待播列表');});
  $('#copy-invite').addEventListener('click',async()=>{const text='来和我一起听「'+current.name+'」——QQ音乐·听境概念演示';try{await navigator.clipboard.writeText(text);toast('邀请文案已复制');}catch(_){toast(text);}});
  $('#friend-add').addEventListener('click',()=>{friendPick='papillon';saved.queueOpen=true;renderQueue();$('#friend-state').textContent='模拟好友投歌：Papillon 已排进本次队列。';toast('朋友投了一首歌 · 单机示意');});
  $('#friend-mix').addEventListener('click',()=>{current.rec.familiarity=70;current.rec.energy=50;sessionMemory.unshift('Friend Mix 已融合（单机示意）');renderPlayer();$('#friend-state').textContent='Friend Mix：熟悉度 70 · 能量 50（单机模拟）。';toast('Friend Mix 已生成 · 单机示意');});
  $('#open-settings').addEventListener('click',()=>openDialog('#settings-dialog'));
  $$('[data-theme-choice]').forEach(button=>button.addEventListener('click',()=>{saved.theme=button.dataset.themeChoice;saved.accent=null;persist();renderTheme();toast('主题已切换');}));
  $('#custom-accent').addEventListener('input',event=>{saved.accent=event.target.value;persist();renderTheme();});
  window.addEventListener('pagehide',()=>{recordListening();flushHistory();});
  renderClock(); setInterval(renderClock,30000); renderTheme(); renderPlayer(); renderSpaces(); renderMembers(); renderArtistTracks();
})();
