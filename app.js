/* Long Môn HSK4 — ứng dụng một trang, chạy trực tiếp từ file. */
(function () {
  "use strict";

  /* =================== Tiện ích =================== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const hasCJK = (s) => /[㐀-鿿]/.test(s);
  const norm = (s) => String(s).replace(/[\s，。！？、：；“”‘’「」,.!?:;"'（）()…·—-]/g, "");
  const icon = (id, cls = "") => `<svg class="ico ${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const LETTERS = "ABCDEF";
  function shuffle(arr, avoidSame) {
    const a = arr.slice();
    for (let tries = 0; tries < 8; tries++) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      if (!avoidSame || a.length < 2 || a.some((x, i) => x !== arr[i])) break;
    }
    return a;
  }
  const blankify = (zh) => esc(zh).replace(/_{2,}/g, '<span class="blank" aria-label="chỗ trống"></span>');
  const COLOR_BG = { red: "bg-red", blue: "bg-blue", yellow: "bg-yellow", green: "bg-green" };

  /* =================== Tài khoản (lưu trên máy) =================== */
  const ACC_KEY = "longmon-accounts-v1";
  const GUEST_KEY = "longmon-hsk4-v1";
  const userKey = (u) => `${GUEST_KEY}:u:${u}`;
  const todayStr = (t = Date.now()) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };

  const accounts = {
    data: { users: {}, current: null },
    load() {
      try { const raw = localStorage.getItem(ACC_KEY); if (raw) this.data = Object.assign({ users: {}, current: null }, JSON.parse(raw)); } catch (e) {}
      if (this.data.current && !this.data.users[this.data.current]) this.data.current = null;
    },
    save() { try { localStorage.setItem(ACC_KEY, JSON.stringify(this.data)); } catch (e) {} },
    user() { return this.data.current ? Object.assign({ username: this.data.current }, this.data.users[this.data.current]) : null; },
    list() { return Object.keys(this.data.users).map((u) => Object.assign({ username: u }, this.data.users[u])); },
    async hash(pw, salt) {
      const buf = new TextEncoder().encode(`${salt}:${pw}`);
      if (window.crypto && crypto.subtle) {
        const d = await crypto.subtle.digest("SHA-256", buf);
        return Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, "0")).join("");
      }
      let h = 2166136261; for (const b of buf) { h ^= b; h = Math.imul(h, 16777619); } // dự phòng khi không có Web Crypto
      return "f" + (h >>> 0).toString(16);
    },
    async register(username, name, pw, importGuest) {
      const salt = Array.from(crypto.getRandomValues(new Uint8Array(8))).map((b) => b.toString(16).padStart(2, "0")).join("");
      this.data.users[username] = { name, salt, hash: await this.hash(pw, salt), created: Date.now() };
      if (importGuest) {
        try { const g = localStorage.getItem(GUEST_KEY); if (g) { localStorage.setItem(userKey(username), g); localStorage.removeItem(GUEST_KEY); } } catch (e) {}
      }
      this.data.current = username; this.save();
    },
    async check(username, pw) {
      const u = this.data.users[username];
      return !!u && (await this.hash(pw, u.salt)) === u.hash;
    },
    login(username) { this.data.current = username; this.save(); },
    logout() { this.data.current = null; this.save(); },
    remove(username) {
      delete this.data.users[username];
      if (this.data.current === username) this.data.current = null;
      try { localStorage.removeItem(userKey(username)); } catch (e) {}
      this.save();
    }
  };

  /* =================== Lưu tiến độ (theo từng tài khoản) =================== */
  const store = {
    data: { q: {}, rate: 0.9, days: {} },
    key() { return accounts.data.current ? userKey(accounts.data.current) : GUEST_KEY; },
    load() {
      this.data = { q: {}, rate: 0.9, days: {} };
      try {
        const raw = localStorage.getItem(this.key());
        if (raw) this.data = Object.assign(this.data, JSON.parse(raw));
      } catch (e) { /* bộ nhớ không khả dụng: chạy không lưu */ }
      this.data.days = this.data.days || {};
    },
    save() { try { localStorage.setItem(this.key(), JSON.stringify(this.data)); } catch (e) {} },
    record(id, correct) {
      const r = this.data.q[id] || { a: 0, w: 0 };
      r.a += 1; r.w = wrongCount(r) + (correct ? 0 : 1); r.c = !!correct; r.t = Date.now();
      this.data.q[id] = r;
      const d = todayStr(), day = this.data.days[d] || { a: 0, c: 0 };
      day.a += 1; if (correct) day.c += 1; this.data.days[d] = day;
      this.save(); updateBadge();
    },
    get(id) { return this.data.q[id]; },
    wrongIds() { return Object.keys(this.data.q).filter((k) => this.data.q[k].c === false && REG[k]); },
    reset() { this.data.q = {}; this.data.days = {}; this.save(); updateBadge(); }
  };
  // Số lần sai của một câu (bản ghi cũ chưa có trường w)
  function wrongCount(r) { return r ? (typeof r.w === "number" ? r.w : (r.c === false ? 1 : 0)) : 0; }

  /* =================== Giọng đọc (Web Speech API) =================== */
  const TTS = {
    ok: "speechSynthesis" in window,
    voices: [],
    init() {
      if (!this.ok) return;
      const load = () => { this.voices = speechSynthesis.getVoices().filter((v) => /^zh|cmn/i.test(v.lang)); };
      load();
      speechSynthesis.addEventListener("voiceschanged", load);
    },
    pick(speaker) {
      const v = this.voices;
      if (!v.length) return null;
      const cn = v.filter((x) => /zh[-_]CN|cmn/i.test(x.lang));
      const pool = cn.length ? cn : v;
      const female = /xiaoxiao|xiaoyi|huihui|yaoyao|ting|female|女/i;
      const male = /kangkang|yunxi|yunyang|yunjian|male|男/i;
      if (speaker === "男") return pool.find((x) => male.test(x.name)) || pool[1] || pool[0];
      if (speaker === "女") return pool.find((x) => female.test(x.name)) || pool[0];
      return pool.find((x) => female.test(x.name)) || pool[0];
    },
    stop() { if (this.ok) speechSynthesis.cancel(); },
    speak(text, onend) {
      if (!this.ok) { onend && onend(); return; }
      speechSynthesis.cancel();
      const lines = String(text).split(/\n+/).filter(Boolean);
      lines.forEach((line, i) => {
        const m = line.match(/^(男|女|问)：(.*)$/);
        const u = new SpeechSynthesisUtterance(m ? m[2] : line);
        u.lang = "zh-CN";
        u.rate = store.data.rate || 0.9;
        const voice = this.pick(m ? m[1] : null);
        if (voice) u.voice = voice;
        if (i === lines.length - 1 && onend) { u.onend = onend; u.onerror = onend; }
        speechSynthesis.speak(u);
      });
    }
  };

  /* =================== Xây dựng bộ câu hỏi =================== */
  const SETS = {};
  const REG = {}; // id câu hỏi -> câu hỏi gốc

  function addSet(set) {
    set.questions.forEach((q, i) => { q.id = q.id || `${set.id}-${i + 1}`; q.setId = set.id; REG[q.id] = q; });
    SETS[set.id] = set;
  }

  LESSONS.forEach((L) => {
    // Ngữ pháp
    addSet({
      id: `L${L.id}-ngu-phap`, lesson: L.id,
      title: `Bài ${L.id} · Ngữ pháp`, sub: L.topics.join(" · "),
      back: `#/bai/${L.id}/ngu-phap`,
      questions: L.exercises.map((ex) => ex.type === "order"
        ? { kind: "order", label: "Sắp xếp thành câu", tokens: ex.tokens, alts: ex.alts, explain: ex.explain }
        : { kind: "mc", label: ex.zh ? "Điền vào chỗ trống" : "Chọn đáp án", prompt: ex.prompt, zh: ex.zh, options: ex.options, answer: ex.answer, explain: ex.explain })
    });
    // Từ vựng (tự sinh từ danh sách từ)
    const V = L.vocab;
    const others = (i, col) => shuffle(V.filter((_, j) => j !== i).map((w) => w[col])).slice(0, 3);
    addSet({
      id: `L${L.id}-tu-vung`, lesson: L.id, vocab: true,
      title: `Bài ${L.id} · Từ vựng`, sub: `${V.length} từ mới`,
      back: `#/bai/${L.id}/tu-vung`,
      questions: V.map((w, i) => {
        const mode = i % 3;
        const base = { id: `L${L.id}-tv-${w[0]}`, word: w, explain: `${w[0]} (${w[1]}): ${w[2]}` };
        if (mode === 0) return Object.assign(base, { kind: "mc", label: "Chọn nghĩa đúng", zhBig: w[0], speakText: w[0], options: [w[2], ...others(i, 2)], answer: 0, regen: [i, 2] });
        if (mode === 1) return Object.assign(base, { kind: "mc", label: "Chọn chữ Hán", prompt: `Từ nào có nghĩa là “${w[2]}”?`, options: [w[0], ...others(i, 0)], answer: 0, regen: [i, 0] });
        return Object.assign(base, { kind: "mc", label: "Nghe và chọn từ", audio: w[0], audioHint: "Nghe từ và chọn chữ Hán tương ứng", options: [w[0], ...others(i, 0)], answer: 0, regen: [i, 0] });
      })
    });
  });

  Object.keys(EXAM).forEach((skill) => {
    EXAM[skill].parts.forEach((P) => {
      let qs = [];
      if (P.type === "tf") qs = P.items.map((it) => ({ kind: "tf", label: "Nghe · Đúng / Sai", audio: it.audio, stmt: it.stmt, options: ["Đúng", "Sai"], answer: it.answer ? 0 : 1, vi: it.vi, fixed: true }));
      if (P.type === "listen") qs = P.items.map((it) => ({ kind: "mc", label: "Nghe · Chọn đáp án", audio: it.audio, options: it.options, answer: it.answer, vi: it.vi }));
      if (P.type === "bank") P.groups.forEach((g) => g.items.forEach((it) => qs.push({ kind: "mc", label: "Chọn từ điền vào chỗ trống", zh: it.zh, bank: g.bank, options: g.bank, answer: it.answer, vi: it.vi, fixed: true })));
      if (P.type === "order") qs = P.items.map((it) => ({ kind: "order", label: skill === "doc" ? "Sắp xếp thứ tự A · B · C" : "Hoàn thành câu", tokens: it.tokens, alts: it.alts, lettered: skill === "doc", vi: it.vi }));
      if (P.type === "mc") qs = P.items.map((it) => ({ kind: "mc", label: "Đọc hiểu", passage: it.passage, ask: it.q, options: it.options, answer: it.answer, vi: it.vi }));
      if (P.type === "write") qs = P.items.map((it) => ({ kind: "write", label: "Viết câu", word: it.word, scene: it.scene, sample: it.sample, vi: it.vi }));
      addSet({ id: P.id, skill, title: P.title, sub: P.desc, back: `#/luyen-thi/${skill}`, questions: qs });
    });
  });

  function setStats(set) {
    let answered = 0, correct = 0;
    set.questions.forEach((q) => { const r = store.get(q.id); if (r) { answered++; if (r.c) correct++; } });
    return { total: set.questions.length, answered, correct, pct: Math.round((answered / set.questions.length) * 100) };
  }
  function allStats(filter) {
    let total = 0, answered = 0, correct = 0;
    Object.values(SETS).filter(filter || (() => true)).forEach((s) => { const st = setStats(s); total += st.total; answered += st.answered; correct += st.correct; });
    return { total, answered, correct };
  }

  /* =================== Gắn nhãn điểm ngữ pháp / kỹ năng =================== */
  const GRAMMAR_TAGS = [
    { id: "cunxian", name: "Câu tồn hiện 存现句", lesson: 11, re: /存现|tồn hiện|sự xuất hiện|sự biến mất|上(放|挂|种|躺)着|里(种|放|挂)着|过来一|搬走了一|来了两个/ },
    { id: "yue", name: "越来越 / 越…越", lesson: 11, re: /越/ },
    { id: "ba", name: "Câu chữ 把", lesson: 12, re: /把/ },
    { id: "bei", name: "Câu chữ 被 (bị động)", lesson: 14, re: /被/ },
    { id: "youzai", name: "又 / 再", lesson: 14, re: /又|再/ },
    { id: "keneng", name: "Bổ ngữ khả năng", lesson: 15, re: /khả năng|得懂|不懂|不了|得了|不下|得下|不动|得动|来得及|来不及|不清楚|得见|不见|不住|上不去|不上去|得完|不出来|修得|说不出|拿不|听不|看不/ },
    { id: "zhiyao", name: "只要……就……", lesson: 16, re: /只要/ },
    { id: "zhiyou", name: "只有……才……", lesson: 17, re: /只有/ },
    { id: "quxiang", name: "Bổ ngữ xu hướng (nghĩa mở rộng)", lesson: 17, re: /xu hướng|起来|出来|下来|下去|考上|爱上|交上来/ },
    { id: "yiwen", name: "Đại từ nghi vấn phiếm chỉ", lesson: 18, re: /phiếm chỉ|hô ứng|什么都|谁想去|怎么做就|随便/ },
    { id: "yibian", name: "一边……一边……", lesson: 18, re: /一边/ },
    { id: "shunxu", name: "先……再……然后……最后", lesson: 18, re: /先|然后|最后/ },
    { id: "chongdie", name: "Lặp số lượng từ", lesson: 19, re: /一个一个|一本一本|个个|天天|Lặp lượng từ/ },
    { id: "zhuangtai", name: "Bổ ngữ trạng thái", lesson: 19, re: /trạng thái|đến mức|得很|得非常|得干干净净|得满头|得跳|得一句|得走不动|得说不出|得越来越/ },
    { id: "wuguanlian", name: "Câu phức không từ nối", lesson: 19, re: /không từ nối|有困难找警察|不去不行/ },
    { id: "fanwen", name: "Câu phản vấn", lesson: 20, re: /phản vấn|难道|不是.*吗|谁不知道/ },
    { id: "lian", name: "连……也 / 都……", lesson: 20, re: /连/ },
    { id: "shuangfou", name: "Phủ định kép", lesson: 20, re: /phủ định kép|不得不|没有人不|不会不/ }
  ];
  const SKILL_TAGS = {
    "nghe-1": ["k-nghe-tf", "Nghe: phán đoán đúng sai"], "nghe-2": ["k-nghe-ngan", "Nghe: hội thoại ngắn"], "nghe-3": ["k-nghe-dai", "Nghe: hội thoại / đoạn văn dài"],
    "doc-1": ["k-dien-tu", "Đọc: chọn từ điền chỗ trống"], "doc-2": ["k-sap-xep", "Đọc: sắp xếp thứ tự câu"], "doc-3": ["k-doc-hieu", "Đọc: đọc hiểu đoạn văn"],
    "viet-1": ["k-hoan-thanh", "Viết: hoàn thành câu"], "viet-2": ["k-viet-cau", "Viết: viết câu với từ cho sẵn"]
  };
  const TAG_INFO = {};
  GRAMMAR_TAGS.forEach((t) => { TAG_INFO[t.id] = { name: t.name, group: "Ngữ pháp", href: `#/bai/${t.lesson}/ngu-phap`, lesson: t.lesson }; });
  LESSONS.forEach((L) => {
    TAG_INFO[`tv-${L.id}`] = { name: `Từ vựng bài ${L.id}`, group: "Từ vựng", href: `#/bai/${L.id}/tu-vung`, lesson: L.id };
    TAG_INFO[`np-${L.id}`] = { name: `Ngữ pháp bài ${L.id}`, group: "Ngữ pháp", href: `#/bai/${L.id}/ngu-phap`, lesson: L.id };
  });
  Object.keys(SKILL_TAGS).forEach((sid) => { const [id, name] = SKILL_TAGS[sid]; TAG_INFO[id] = { name, group: "Kỹ năng", href: `#/luyen-thi/${sid.split("-")[0]}` }; });

  function grammarTagsOf(q) {
    // Chỉ dùng phần “lõi” của câu hỏi (không dùng bài nghe / đoạn văn dài để tránh gắn nhãn thừa)
    const core = [q.zh, q.prompt, (q.tokens || []).join(""), q.stmt, q.ask, q.sample, q.explain,
      q.kind === "mc" || q.kind === "tf" ? q.options[q.answer] : ""].filter(Boolean).join(" ");
    return GRAMMAR_TAGS.filter((t) => t.re.test(core)).map((t) => t.id);
  }
  Object.values(REG).forEach((q) => {
    const set = SETS[q.setId];
    if (set.vocab) q.tags = [`tv-${set.lesson}`];
    else if (set.lesson) { const g = grammarTagsOf(q); q.tags = g.length ? g : [`np-${set.lesson}`]; }
    else q.tags = [SKILL_TAGS[set.id][0]].concat(set.id.startsWith("nghe") ? [] : grammarTagsOf(q));
  });

  /* Phân tích điểm yếu: gom số lần sai theo nhãn */
  function analyze() {
    const stat = {};
    Object.values(REG).forEach((q) => {
      const r = store.get(q.id);
      q.tags.forEach((t) => {
        const s = stat[t] || (stat[t] = { tag: t, total: 0, seen: 0, a: 0, w: 0, cur: 0 });
        s.total++;
        if (r) { s.seen++; s.a += r.a; s.w += wrongCount(r); if (r.c === false) s.cur++; }
      });
    });
    return Object.values(stat)
      .filter((s) => s.w > 0)
      .map((s) => Object.assign(s, { rate: s.w / s.a, score: s.cur * 2 + s.w + (s.w / s.a) * 3 }))
      .sort((x, y) => y.score - x.score);
  }

  /* Bài tập riêng: câu đang sai + câu chưa làm cùng điểm yếu + câu từng sai */
  function buildPersonal(tagIds, size) {
    const used = new Set(), out = [];
    const per = Math.ceil(size / tagIds.length);
    tagIds.forEach((t) => {
      const qs = Object.values(REG).filter((q) => q.tags.includes(t));
      const st = (q) => store.get(q.id);
      const cur = shuffle(qs.filter((q) => st(q) && st(q).c === false));
      const fresh = shuffle(qs.filter((q) => !st(q)));
      const past = shuffle(qs.filter((q) => st(q) && st(q).c && wrongCount(st(q)) > 0));
      const rest = shuffle(qs.filter((q) => st(q) && st(q).c && wrongCount(st(q)) === 0));
      const order = cur.slice(0, Math.ceil(per / 2)).concat(fresh, past, rest, cur);
      let n = 0;
      for (const q of order) { if (n >= per) break; if (!used.has(q.id)) { used.add(q.id); out.push(q); n++; } }
    });
    return shuffle(out).slice(0, size);
  }

  /* Tạo bản câu hỏi để làm: xáo trộn đáp án / thẻ từ */
  function materialize(q) {
    const c = Object.assign({}, q);
    if (c.kind === "mc" && !c.fixed) {
      let opts = c.options;
      if (c.regen) { // từ vựng: chọn lại phương án nhiễu mỗi lần làm
        const L = LESSONS.find((x) => x.id === SETS[c.setId].lesson);
        const [i, col] = c.regen;
        opts = [L.vocab[i][col], ...shuffle(L.vocab.filter((_, j) => j !== i).map((w) => w[col])).slice(0, 3)];
      }
      const correctText = opts[c.answer];
      c.options = shuffle(opts);
      c.answer = c.options.indexOf(correctText);
    }
    if (c.kind === "order") c.pool = shuffle(c.tokens.map((t, i) => ({ t, i })), true).map((o, k) => Object.assign(o, { letter: LETTERS[k] }));
    return c;
  }

  /* =================== Hình minh họa =================== */
  const INK = "#141210", RED = "#d7261c", YEL = "#ffc629", GRN = "#1f9a4b", CRM = "#fff2d4", BLU = "#2f4fd6";
  function dragonSVG() {
    const cx = 200, cy = 205;
    const ring = (n, r1, r2, off) => {
      const p = [];
      for (let i = 0; i < n * 2; i++) {
        const a = (Math.PI * 2 * i) / (n * 2) - Math.PI / 2 + off;
        const r = i % 2 === 0 ? r1 : r2;
        p.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1));
      }
      return p.join(" ");
    };
    const tri = (pts) => `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${CRM}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
    return `
<svg viewBox="0 0 400 420" role="img" aria-labelledby="dragonTitle">
  <title id="dragonTitle">Mặt rồng đỏ phong cách tranh dân gian, bờm lửa vàng</title>
  <g class="mane-spin">
    <polygon points="${ring(24, 198, 150, 0)}" fill="${YEL}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <polygon points="${ring(18, 166, 136, Math.PI / 18)}" fill="${GRN}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  </g>
  <g class="dragon-breathe">
    <g id="dh1">
      <path d="M150 118 C128 70 96 44 52 34 C80 56 92 84 104 112 C84 100 66 98 48 104 C76 116 100 132 120 150 Z" fill="${GRN}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <polygon points="200,346 186,388 174,350 154,378 150,340 128,360 132,324" fill="${YEL}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    </g>
    <use href="#dh1" transform="translate(400 0) scale(-1 1)"/>
    <path d="M200 96 C262 96 312 130 322 190 C330 240 316 292 280 322 C256 342 228 350 200 350 C172 350 144 342 120 322 C84 292 70 240 78 190 C88 130 138 96 200 96 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/>
    <g id="dh2">
      <circle cx="112" cy="248" r="22" fill="${GRN}" stroke="${INK}" stroke-width="5"/>
      <path d="M104 248 a8 8 0 1 1 8 8 a4 4 0 0 1 -4 -4" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      <path d="M100 178 L116 150 L128 166 L140 140 L152 160 L166 142 L172 166 L188 158 L182 186 C160 174 130 172 100 178 Z" fill="${YEL}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M108 202 C128 184 160 180 188 198 C168 216 134 218 108 202 Z" fill="${CRM}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="158" cy="200" r="11" fill="${YEL}" stroke="${INK}" stroke-width="4"/>
      <circle cx="158" cy="200" r="5" fill="${INK}"/>
      <path d="M104 196 C130 176 164 172 194 192" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
      <path d="M190 150 C188 180 186 205 178 228" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    </g>
    <use href="#dh2" transform="translate(400 0) scale(-1 1)"/>
    <polygon points="200,116 216,140 200,164 184,140" fill="${YEL}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="200" cy="140" r="6" fill="${RED}" stroke="${INK}" stroke-width="3"/>
    <path d="M160 238 C170 222 230 222 240 238 C250 254 236 268 222 264 C214 260 206 258 200 258 C194 258 186 260 178 264 C164 268 150 254 160 238 Z" fill="#ef4a2f" stroke="${INK}" stroke-width="5"/>
    <path d="M118 278 C150 270 176 274 200 274 C224 274 250 270 282 278 C272 320 240 338 200 338 C160 338 128 320 118 278 Z" fill="${INK}"/>
    <path d="M172 320 C182 306 218 306 228 320 C218 332 182 332 172 320 Z" fill="${RED}"/>
    <g id="dh3">
      <circle cx="182" cy="247" r="6" fill="${INK}"/>
      ${tri([[124, 281], [138, 279], [133, 297]])}
      ${tri([[146, 277], [166, 275], [158, 312]])}
      ${tri([[172, 275], [190, 274], [181, 292]])}
      ${tri([[148, 329], [164, 333], [158, 314]])}
      ${tri([[174, 335], [192, 336], [185, 320]])}
      <path d="M166 262 C130 272 100 250 70 262 C40 274 30 302 4 298" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>
      <path d="M166 262 C130 272 100 250 70 262 C40 274 30 302 4 298" fill="none" stroke="${CRM}" stroke-width="6" stroke-linecap="round"/>
      <path d="M150 234 C110 220 80 232 54 214 C34 200 30 176 8 170" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/>
      <path d="M150 234 C110 220 80 232 54 214 C34 200 30 176 8 170" fill="none" stroke="${CRM}" stroke-width="5" stroke-linecap="round"/>
    </g>
    <use href="#dh3" transform="translate(400 0) scale(-1 1)"/>
  </g>
</svg>`;
  }
  function ribbonsSVG() {
    const ribbon = (d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${CRM}" stroke-width="8" stroke-linecap="round"/>`;
    const flames = [];
    for (let i = 0; i < 14; i++) {
      const x = 40 + i * 90, y = 600;
      flames.push(`<polygon points="${x},${y} ${x + 22},${y - 46} ${x + 34},${y - 18} ${x + 48},${y - 60} ${x + 66},${y}" fill="${YEL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`);
    }
    return `<svg class="hero__ribbons" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      ${ribbon("M-40 30 C160 -10 300 60 480 24 S760 -20 900 40 S1140 90 1260 20")}
      <g class="rb-side">
        ${ribbon("M600 640 C590 520 700 470 660 360 S600 160 700 60 S880 -10 960 -40")}
        ${ribbon("M1260 300 C1180 360 1220 460 1120 520 S980 560 900 640")}
      </g>
      ${flames.join("")}
    </svg>`;
  }

  /* =================== Giao diện chung =================== */
  const main = $("#main");
  function updateBadge() {
    const n = store.wrongIds().length;
    const b = $("#wrongBadge");
    b.hidden = n === 0;
    b.textContent = n;
    b.setAttribute("aria-label", `${n} câu sai`);
  }
  function setNav(key) {
    $$(".nav a, #acctBtn").forEach((a) => {
      if (a.dataset.nav === key) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("is-show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("is-show"), 3200);
  }
  const progressBar = (pct, label) => `<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="${esc(label || "Tiến độ")}"><span style="width: ${pct}%"></span></div>`;

  /* =================== Trang chủ =================== */
  function viewHome() {
    setNav("");
    const st = allStats();
    const strip = LESSONS.concat(LESSONS).map((L, i) => `
      <a class="strip__card ${COLOR_BG[L.color]}" href="#/bai/${L.id}" ${i >= LESSONS.length ? 'tabindex="-1" aria-hidden="true"' : ""}>
        <span class="g zh" aria-hidden="true">${L.glyph}</span>
        <span class="n">Bài<b>${L.id}</b></span>
      </a>`).join("");
    main.innerHTML = `
      <section class="hero">
        ${ribbonsSVG()}
        <div class="hero__inner">
          <div>
            <span class="hero__kicker">${icon("i-sparkle")} Giáo trình Hán ngữ quyển 4 · Bài 11–20</span>
            <h1>Vượt <span class="stroke">Long Môn</span>,<br>chinh phục HSK4</h1>
            <p class="hero__zh" lang="zh">鲤鱼跃龙门 · 一步一步</p>
            <p class="hero__lead">Luyện từ vựng, ngữ pháp từng bài và làm đề theo đúng dạng thi HSK4: Nghe, Đọc, Viết. Có giọng đọc tiếng Trung và lưu lại câu sai để ôn.</p>
            <div class="hero__ctas">
              <a class="btn btn--yellow" href="#/bai-hoc">${icon("i-book")} Học theo bài</a>
              <a class="btn btn--primary" href="#/luyen-thi/nghe">${icon("i-target")} Luyện thi HSK4</a>
            </div>
          </div>
          <div class="hero__art">
            ${dragonSVG()}
            <div class="hero__stamp" aria-hidden="true"><span><b>${st.total}</b>câu hỏi</span></div>
          </div>
        </div>
      </section>

      <section class="strip" aria-label="Danh sách bài học">
        <div class="strip__track">${strip}</div>
      </section>
      ${homePersonal()}

      <section class="section">
        <div class="wrap">
          <div class="section__head">
            <div>
              <h2 class="h2"><span class="zh" lang="zh">练习</span>Bắt đầu luyện tập</h2>
              <p class="sub">Chọn cách học phù hợp. Tiến độ được lưu tự động trên trình duyệt này.</p>
            </div>
          </div>
          <div class="grid grid--3">
            <a class="card tile tile--red" href="#/bai-hoc">
              <span class="tile__glyph zh" aria-hidden="true">课</span>
              ${icon("i-book", "ico--lg")}
              <h3>Theo bài học</h3>
              <p>10 bài (11–20): thẻ từ vựng có phát âm, tóm tắt ngữ pháp và bài tập cho từng điểm.</p>
              <span class="tile__go">Vào học ${icon("i-arrow-right")}</span>
            </a>
            <a class="card tile tile--blue" href="#/luyen-thi/nghe">
              <span class="tile__glyph zh" aria-hidden="true">考</span>
              ${icon("i-target", "ico--lg")}
              <h3>Luyện thi HSK4</h3>
              <p>Đề theo dạng chuẩn: phán đoán đúng sai, hội thoại, điền từ, sắp xếp câu, đọc hiểu, viết câu.</p>
              <span class="tile__go">Làm đề ${icon("i-arrow-right")}</span>
            </a>
            <a class="card tile tile--yellow" href="#/cau-sai">
              <span class="tile__glyph zh" aria-hidden="true">错</span>
              ${icon("i-redo", "ico--lg")}
              <h3>Ôn câu sai</h3>
              <p>Mọi câu làm sai được gom lại. Làm đúng lại thì câu đó tự rời khỏi danh sách.</p>
              <span class="tile__go">Ôn ngay ${icon("i-arrow-right")}</span>
            </a>
          </div>
        </div>
      </section>

      <section class="section section--tight">
        <div class="wrap">
          <h2 class="h2" style="margin-bottom:16px"><span class="zh" lang="zh">进度</span>Tiến độ của bạn</h2>
          <div class="stats">
            <div class="card stat"><b>${st.answered}</b><span>Câu đã làm</span></div>
            <div class="card stat"><b>${st.correct}</b><span>Trả lời đúng</span></div>
            <div class="card stat"><b>${store.wrongIds().length}</b><span>Câu cần ôn</span></div>
          </div>
        </div>
      </section>`;
  }

  function homePersonal() {
    const u = accounts.user();
    if (!u) {
      return `
      <section class="section section--tight" style="padding-bottom:0">
        <div class="wrap">
          <div class="card hello">
            <span class="avatar avatar--lg" aria-hidden="true">${icon("i-user", "ico--lg")}</span>
            <div class="hello__body">
              <h2>Học theo cách của riêng bạn</h2>
              <p>Tạo tài khoản để lưu tiến độ riêng, xem lỗi sai hay mắc và nhận bài tập luyện điểm yếu.</p>
            </div>
            <a class="btn btn--primary" href="#/dang-nhap/tao">${icon("i-sparkle")} Tạo tài khoản</a>
          </div>
        </div>
      </section>`;
    }
    const top = analyze().slice(0, 3);
    return `
      <section class="section section--tight" style="padding-bottom:0">
        <div class="wrap">
          <div class="card hello">
            <span class="avatar avatar--lg" aria-hidden="true">${esc(initial(u.name))}</span>
            <div class="hello__body">
              <h2>Chào ${esc(u.name)}!</h2>
              <p>${top.length ? `Điểm cần luyện: ${top.map((t) => `<b>${esc(TAG_INFO[t.tag].name)}</b>`).join(", ")}.` : "Làm vài bài tập để hệ thống tìm ra điểm yếu của bạn."}</p>
            </div>
            <a class="btn btn--primary" href="${top.length ? "#/lam/ca-nhan" : "#/bai-hoc"}">${icon("i-target")} ${top.length ? "Bài tập riêng" : "Bắt đầu học"}</a>
          </div>
        </div>
      </section>`;
  }

  /* =================== Danh sách bài học =================== */
  function viewLessons() {
    setNav("bai");
    main.innerHTML = `
      <section class="pagehead pagehead--red">
        <span class="pagehead__glyph zh" aria-hidden="true">课</span>
        <div class="wrap">
          <nav class="crumbs" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span aria-hidden="true">/</span><span>Bài học</span></nav>
          <h1>Bài học 11–20</h1>
          <p class="zh-title" lang="zh">汉语教程 第四册</p>
        </div>
      </section>
      <section class="section section--tight">
        <div class="wrap">
          <div class="grid grid--2">
            ${LESSONS.map((L) => {
              const a = setStats(SETS[`L${L.id}-tu-vung`]), b = setStats(SETS[`L${L.id}-ngu-phap`]);
              const pct = Math.round(((a.answered + b.answered) / (a.total + b.total)) * 100);
              return `
              <a class="card lesson-card" href="#/bai/${L.id}">
                <span class="lesson-card__glyph zh ${COLOR_BG[L.color]}" aria-hidden="true">${L.glyph}</span>
                <span>
                  <span class="lesson-card__num">Bài ${L.id} · 第${["十一","十二","十三","十四","十五","十六","十七","十八","十九","二十"][L.id - 11]}课</span>
                  <span class="lesson-card__title zh" lang="zh" style="display:block">${esc(L.title)}</span>
                  <span class="lesson-card__vi" style="display:block">${esc(L.vi)}</span>
                  ${progressBar(pct, `Tiến độ bài ${L.id}`)}
                </span>
              </a>`;
            }).join("")}
          </div>
        </div>
      </section>`;
  }

  /* =================== Chi tiết bài học =================== */
  let flashIdx = 0;
  function viewLesson(id, tab) {
    setNav("bai");
    const L = LESSONS.find((x) => x.id === +id);
    if (!L) return viewNotFound();
    tab = tab || "tu-vung";
    const headColor = { red: "red", blue: "blue", yellow: "yellow", green: "green" }[L.color];
    const tabs = [["tu-vung", "Từ vựng", "i-cards"], ["ngu-phap", "Ngữ pháp", "i-read"]];
    let body = "";
    if (tab === "tu-vung") {
      const set = SETS[`L${L.id}-tu-vung`], st = setStats(set);
      body = `
        <div class="vocab-tools">
          <a class="btn btn--primary" href="#/lam/${set.id}">${icon("i-target")} Kiểm tra từ vựng (${st.total} câu)</a>
          <button class="btn" type="button" data-act="flash">${icon("i-cards")} Học bằng thẻ</button>
        </div>
        <div id="flashZone"></div>
        <h2 class="h2" style="font-size:24px;margin:8px 0 14px">Danh sách từ mới</h2>
        <div class="vocab-list">
          ${L.vocab.map((w) => `
            <div class="word">
              <div><div class="word__hz zh" lang="zh">${w[0]}</div><div class="word__py">${w[1]}</div></div>
              <button class="iconbtn" type="button" data-say="${esc(w[0])}" aria-label="Nghe phát âm ${esc(w[0])}">${icon("i-volume")}</button>
              <div class="word__vi">${esc(w[2])}</div>
            </div>`).join("")}
        </div>`;
    } else {
      const set = SETS[`L${L.id}-ngu-phap`], st = setStats(set);
      body = `
        ${L.grammar.map((g) => `
          <article class="card gnote">
            <h3>${esc(g.name)}</h3>
            <p class="formula">${esc(g.formula)}</p>
            <p>${esc(g.note)}</p>
            <ul class="examples">
              ${g.examples.map((e) => `
                <li>
                  ${hasCJK(e[0]) && !/^[✗✓]/.test(e[0]) ? `<button class="iconbtn" type="button" data-say="${esc(e[0])}" aria-label="Nghe câu ví dụ">${icon("i-volume")}</button>` : `<span aria-hidden="true"></span>`}
                  <span class="zh" lang="zh">${esc(e[0])}</span>
                  <span class="vi">${esc(e[1])}</span>
                </li>`).join("")}
            </ul>
          </article>`).join("")}
        <div class="card part" style="margin-top:8px">
          <div class="part__top">
            <div><h3>Bài tập ngữ pháp bài ${L.id}</h3><p>${st.total} câu · Đã làm ${st.answered} · Đúng ${st.correct}</p></div>
            <span class="part__icon bg-yellow">${icon("i-pen", "ico--lg")}</span>
          </div>
          ${progressBar(st.pct, "Tiến độ bài tập ngữ pháp")}
          <div><a class="btn btn--primary" href="#/lam/${set.id}">${icon("i-arrow-right")} Làm bài tập</a></div>
        </div>`;
    }
    main.innerHTML = `
      <section class="pagehead pagehead--${headColor}">
        <span class="pagehead__glyph zh" aria-hidden="true">${L.glyph}</span>
        <div class="wrap">
          <nav class="crumbs" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span aria-hidden="true">/</span><a href="#/bai-hoc">Bài học</a><span aria-hidden="true">/</span><span>Bài ${L.id}</span></nav>
          <h1>Bài ${L.id}: ${esc(L.vi)}</h1>
          <p class="zh-title" lang="zh">${esc(L.title)}</p>
          <div class="chips" style="margin-top:12px">${L.topics.map((t) => `<span class="chip" style="color:var(--ink)">${esc(t)}</span>`).join("")}</div>
        </div>
      </section>
      <section class="section section--tight" style="padding-top:0">
        <div class="wrap">
          <div style="height:22px"></div>
          <nav class="tabs" aria-label="Nội dung bài ${L.id}">
            ${tabs.map(([k, n, ic]) => `<a class="tab" href="#/bai/${L.id}/${k}" ${k === tab ? 'aria-current="page"' : ""}>${icon(ic)} ${n}</a>`).join("")}
          </nav>
          ${body}
        </div>
      </section>`;
    const fbtn = $('[data-act="flash"]');
    if (fbtn) fbtn.addEventListener("click", () => { flashIdx = 0; renderFlash(L); });
  }

  function renderFlash(L) {
    const zone = $("#flashZone");
    const w = L.vocab[flashIdx];
    zone.innerHTML = `
      <div class="flash" style="margin-bottom:34px">
        <button class="flash__card" type="button" aria-pressed="false" aria-label="Thẻ từ ${flashIdx + 1}: ${esc(w[0])}. Nhấn để lật thẻ.">
          <span class="flash__inner">
            <span class="flash__face flash__face--front">
              <span class="flash__hz zh" lang="zh">${w[0]}</span>
              <span class="flash__hint">Nhấn để xem nghĩa</span>
            </span>
            <span class="flash__face flash__face--back">
              <span class="flash__hz zh" lang="zh" style="font-size:48px">${w[0]}</span>
              <span class="flash__py">${w[1]}</span>
              <span class="flash__vi">${esc(w[2])}</span>
            </span>
          </span>
        </button>
        <div class="flash__nav">
          <button class="btn btn--sm" type="button" data-f="prev" ${flashIdx === 0 ? "disabled" : ""}>${icon("i-arrow-left")} Trước</button>
          <button class="iconbtn" type="button" data-say="${esc(w[0])}" aria-label="Nghe phát âm">${icon("i-volume")}</button>
          <span class="flash__count" aria-live="polite">${flashIdx + 1} / ${L.vocab.length}</span>
          <button class="btn btn--sm btn--blue" type="button" data-f="next" ${flashIdx === L.vocab.length - 1 ? "disabled" : ""}>Sau ${icon("i-arrow-right")}</button>
        </div>
      </div>`;
    const card = $(".flash__card", zone);
    card.addEventListener("click", () => card.setAttribute("aria-pressed", card.getAttribute("aria-pressed") === "true" ? "false" : "true"));
    $$("[data-f]", zone).forEach((b) => b.addEventListener("click", () => {
      flashIdx += b.dataset.f === "next" ? 1 : -1;
      renderFlash(L);
      $(`[data-f="${b.dataset.f}"]`, zone)?.focus();
    }));
    if (!zone.dataset.scrolled) { zone.scrollIntoView({ behavior: "smooth", block: "center" }); zone.dataset.scrolled = "1"; }
  }

  /* =================== Luyện thi (giống Migii) =================== */
  function viewExam(skill) {
    setNav("luyen-thi");
    skill = EXAM[skill] ? skill : "nghe";
    const E = EXAM[skill];
    const skills = [["nghe", "Luyện nghe", "i-headphones"], ["doc", "Luyện đọc", "i-read"], ["viet", "Luyện viết", "i-pen"]];
    const total = allStats((s) => s.skill === skill);
    const colors = ["bg-red", "bg-blue", "bg-yellow"];
    main.innerHTML = `
      <section class="pagehead pagehead--blue">
        <span class="pagehead__glyph zh" aria-hidden="true">考</span>
        <div class="wrap">
          <nav class="crumbs" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span aria-hidden="true">/</span><span>Luyện thi HSK4</span></nav>
          <h1>Luyện thi HSK4</h1>
          <p class="zh-title" lang="zh">汉语水平考试 四级</p>
        </div>
      </section>
      <section class="section section--tight" style="padding-top:0">
        <div class="wrap">
          <div style="height:22px"></div>
          <nav class="tabs" aria-label="Kỹ năng">
            ${skills.map(([k, n, ic]) => `<a class="tab" href="#/luyen-thi/${k}" ${k === skill ? 'aria-current="page"' : ""}>${icon(ic)} ${n}</a>`).join("")}
          </nav>
          ${skill === "nghe" && TTS.ok && !TTS.voices.length ? `<div class="notice">${icon("i-volume")}<span>Trình duyệt chưa tải giọng đọc tiếng Trung. Hãy dùng Chrome hoặc Edge bản mới; nếu vẫn không có tiếng, bạn có thể bấm “Xem lời thoại” trong mỗi câu.</span></div>` : ""}
          <div class="card overview">
            <h2>Tổng quan phần ${esc(E.label)}</h2>
            <span class="kv">Số câu đã làm: <b>${total.answered}</b> / ${total.total}</span>
            <span class="kv">Trả lời đúng: <b>${total.correct}</b> câu</span>
          </div>
          <div class="grid grid--3">
            ${E.parts.map((P, i) => {
              const st = setStats(SETS[P.id]);
              return `
              <article class="card part">
                <div class="part__top">
                  <div><h3>${esc(P.title)}</h3><p>${esc(P.desc)}</p></div>
                  <span class="part__icon ${colors[i % 3]}">${icon(skills.find((s) => s[0] === skill)[2], "ico--lg")}</span>
                </div>
                <div class="part__nums">
                  <div><b>${st.total}</b><span>Tổng</span></div>
                  <div><b>${st.answered}</b><span>Đã trả lời</span></div>
                  <div><b>${st.correct}</b><span>Trả lời đúng</span></div>
                </div>
                ${progressBar(st.pct, `Hoàn thành ${P.title}`)}
                <div class="part__foot">
                  <span class="pct">Hoàn thành: ${st.pct}%</span>
                  <a class="btn btn--sm btn--primary" href="#/lam/${P.id}">Luyện tập ${icon("i-arrow-right")}</a>
                </div>
              </article>`;
            }).join("")}
          </div>
          <div class="card part" style="margin-top:22px;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:space-between">
            <div><h3>Luyện tập câu sai</h3><p>Số câu hỏi: ${store.wrongIds().filter((id) => SETS[REG[id].setId].skill === skill).length}</p></div>
            <a class="btn btn--yellow btn--sm" href="#/cau-sai">${icon("i-redo")} Làm lại ngay</a>
          </div>
        </div>
      </section>`;
  }

  /* =================== Câu sai =================== */
  function viewReview() {
    setNav("cau-sai");
    const ids = store.wrongIds();
    const groups = {};
    ids.forEach((id) => { const s = REG[id].setId; (groups[s] = groups[s] || []).push(id); });
    main.innerHTML = `
      <section class="pagehead pagehead--yellow">
        <span class="pagehead__glyph zh" aria-hidden="true">错</span>
        <div class="wrap">
          <nav class="crumbs" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span aria-hidden="true">/</span><span>Câu sai</span></nav>
          <h1>Ôn lại câu sai</h1>
          <p class="zh-title" lang="zh">温故而知新</p>
        </div>
      </section>
      <section class="section section--tight">
        <div class="wrap">
          ${ids.length === 0 ? `
            <div class="card empty">
              <div class="empty__glyph zh" aria-hidden="true">好</div>
              <h2>Chưa có câu sai nào</h2>
              <p>Làm bài tập hoặc luyện đề, câu nào sai sẽ xuất hiện ở đây để bạn ôn lại.</p>
              <a class="btn btn--primary" href="#/luyen-thi/nghe">${icon("i-target")} Bắt đầu luyện tập</a>
            </div>` : `
            <div class="card overview">
              <h2>Bạn có ${ids.length} câu cần ôn</h2>
              <span class="kv">Làm đúng lại thì câu sẽ được xóa khỏi danh sách.</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:22px">
              <a class="btn btn--primary" href="#/lam/cau-sai">${icon("i-redo")} Ôn tất cả (${ids.length} câu)</a>
            </div>
            <div class="grid grid--2">
              ${Object.keys(groups).map((sid) => `
                <article class="card part">
                  <div class="part__top"><div><h3>${esc(SETS[sid].title)}</h3><p>${groups[sid].length} câu sai</p></div></div>
                  <div><a class="btn btn--sm" href="#/lam/cau-sai/${sid}">Ôn phần này ${icon("i-arrow-right")}</a></div>
                </article>`).join("")}
            </div>`}
          <div style="margin-top:34px">
            <button class="btn btn--ghost btn--sm" type="button" id="resetAll">${icon("i-trash")} Xóa toàn bộ tiến độ</button>
          </div>
        </div>
      </section>`;
    $("#resetAll").addEventListener("click", async () => {
      if (await askConfirm("Xóa toàn bộ tiến độ?", "Toàn bộ câu đã làm và danh sách câu sai sẽ bị xóa. Thao tác này không thể hoàn tác.", "Xóa tiến độ")) {
        store.reset(); viewReview(); toast("Đã xóa toàn bộ tiến độ.");
      }
    });
  }

  /* =================== Làm bài =================== */
  let R = null; // trạng thái lượt làm bài

  function startRun(setId, sub) {
    setNav(setId === "cau-sai" ? "cau-sai" : (setId === "ca-nhan" || setId === "diem-yeu") ? "ca-nhan" : (SETS[setId] && SETS[setId].skill ? "luyen-thi" : "bai"));
    let set;
    if (setId === "ca-nhan" || setId === "diem-yeu") {
      const weak = analyze();
      const tags = setId === "diem-yeu" ? (TAG_INFO[sub] ? [sub] : []) : weak.slice(0, 3).map((w) => w.tag);
      const qs = tags.length ? buildPersonal(tags, setId === "diem-yeu" ? 12 : 15) : [];
      if (!qs.length) { location.hash = "#/ca-nhan"; return; }
      set = {
        id: setId, runArgs: [setId, sub],
        title: setId === "diem-yeu" ? `Luyện riêng · ${TAG_INFO[sub].name}` : "Bài tập riêng cho bạn",
        sub: setId === "diem-yeu" ? `${qs.length} câu: câu bạn từng sai và câu tương tự` : `${qs.length} câu tập trung vào: ${tags.map((t) => TAG_INFO[t].name).join(" · ")}`,
        back: "#/ca-nhan", questions: qs
      };
    } else if (setId === "cau-sai") {
      const ids = store.wrongIds().filter((id) => !sub || REG[id].setId === sub);
      if (!ids.length) { location.hash = "#/cau-sai"; return; }
      set = { id: "cau-sai", title: sub ? `Ôn câu sai · ${SETS[sub].title}` : "Ôn tất cả câu sai", sub: `${ids.length} câu`, back: "#/cau-sai", questions: ids.map((id) => REG[id]) };
    } else {
      set = SETS[setId];
      if (!set) return viewNotFound();
    }
    R = { set, qs: set.questions.map(materialize), idx: 0, results: [], sel: null, placed: [], checked: false };
    renderQ();
  }

  function retryWrong() {
    const wrong = R.qs.filter((q, i) => R.results[i] === false);
    if (!wrong.length) return;
    R = { set: R.set, qs: wrong.map((q) => materialize(REG[q.id])), idx: 0, results: [], sel: null, placed: [], checked: false };
    renderQ();
  }

  function renderQ() {
    TTS.stop();
    const q = R.qs[R.idx], n = R.qs.length;
    R.sel = null; R.placed = []; R.checked = false; R.selfMarked = false;
    const pct = Math.round((R.idx / n) * 100);
    let body = "";

    if (q.audio) {
      body += `
        <div class="player">
          <button class="player__play" type="button" data-act="play" aria-label="Phát âm thanh">${icon("i-play", "ico--fill")}</button>
          <div class="player__meta"><b>${q.kind === "tf" ? "Nghe đoạn văn" : (q.word ? "Nghe từ" : "Nghe hội thoại")}</b><span>${esc(q.audioHint || "Có thể nghe lại nhiều lần")}</span></div>
          <label>Tốc độ
            <select data-act="rate" aria-label="Tốc độ đọc">
              ${[[0.6, "Chậm"], [0.8, "Vừa"], [0.9, "Chuẩn"], [1.1, "Nhanh"]].map(([v, t]) => `<option value="${v}" ${+store.data.rate === v ? "selected" : ""}>${t}</option>`).join("")}
            </select>
          </label>
        </div>`;
    }
    if (q.prompt) body += `<p class="q__prompt">${esc(q.prompt)}</p>`;
    if (q.zhBig) body += `<div style="display:flex;align-items:center;gap:14px;margin:0 0 18px"><span class="zh" lang="zh" style="font-size:56px;font-weight:700;line-height:1.1">${esc(q.zhBig)}</span><button class="iconbtn" type="button" data-say="${esc(q.speakText)}" aria-label="Nghe phát âm">${icon("i-volume")}</button></div>`;
    if (q.bank) body += `<div class="bank" aria-label="Từ cho sẵn">${q.bank.map((w, i) => `<span lang="zh"><b>${LETTERS[i]}</b>${esc(w)}</span>`).join("")}</div>`;
    if (q.zh) body += `<p class="q__zh" lang="zh">${blankify(q.zh)}</p>`;
    if (q.stmt) body += `<p class="q__stmt" lang="zh">${esc(q.stmt)}</p>`;
    if (q.passage) body += `<p class="q__passage" lang="zh">${esc(q.passage)}</p>`;
    if (q.ask) body += `<p class="q__ask" lang="zh">${esc(q.ask)}</p>`;

    if (q.kind === "mc" || q.kind === "tf") {
      const isZh = q.options.some(hasCJK);
      const two = q.kind === "tf" || q.options.every((o) => o.length <= 12);
      body += `<div class="opts ${two ? "opts--2" : ""}" role="group" aria-label="Các phương án">
        ${q.options.map((o, i) => `
          <button class="opt" type="button" data-opt="${i}" aria-pressed="false">
            <span class="opt__key" aria-hidden="true">${q.kind === "tf" ? (i === 0 ? "√" : "×") : LETTERS[i]}</span>
            <span class="opt__txt ${isZh ? "zh" : ""}" ${isZh ? 'lang="zh"' : ""}>${esc(o)}</span>
            <span class="opt__mark"></span>
          </button>`).join("")}
      </div>`;
    }
    if (q.kind === "order") {
      body += `
        <div class="order">
          <p class="q__prompt">${q.lettered ? "Chạm vào các vế theo đúng thứ tự:" : "Chạm vào các từ để ghép thành câu đúng:"}</p>
          <div class="order__answer" id="orderAnswer" aria-live="polite" data-empty="Câu trả lời của bạn sẽ hiện ở đây"></div>
          <div class="order__pool" id="orderPool"></div>
          <div class="order__tools"><button class="btn btn--ghost btn--sm" type="button" data-act="clear">${icon("i-redo")} Làm lại</button></div>
        </div>`;
    }
    if (q.kind === "write") {
      body += `
        <div class="write">
          <div class="write__word zh" lang="zh">${esc(q.word)}</div>
          <p class="write__scene"><b>Tình huống:</b> ${esc(q.scene)}</p>
          <label for="writeBox">Câu của bạn (có dùng từ “${esc(q.word)}”)</label>
          <textarea id="writeBox" lang="zh" placeholder="请写一个句子……" aria-describedby="writeHelp"></textarea>
          <p class="helper" id="writeHelp">Viết bằng chữ Hán. Sau khi bấm “Kiểm tra”, hãy so sánh với câu mẫu và tự đánh giá.</p>
        </div>`;
    }

    main.innerHTML = `
      <div class="runner">
        <div class="runner__bar">
          <a class="btn btn--ghost btn--sm" href="${R.set.back}" aria-label="Thoát, quay lại">${icon("i-x")}</a>
          ${progressBar(pct, "Tiến độ làm bài")}
          <span class="runner__count">${R.idx + 1}/${n}</span>
        </div>
        <h1 class="runner__title">${esc(R.set.title)}</h1>
        <p class="runner__sub">${esc(R.set.sub || "")}</p>
        <section class="card q" aria-labelledby="qType">
          <span class="q__type" id="qType" tabindex="-1">Câu ${R.idx + 1} · ${esc(q.label)}</span>
          ${body}
          <div id="feedback" aria-live="polite"></div>
          <div class="runner__actions">
            <span class="spacer"></span>
            <button class="btn btn--primary" type="button" data-act="check" ${q.kind === "write" ? "" : "disabled"}>${icon("i-check")} Kiểm tra</button>
          </div>
        </section>
        <p class="kbd-hint">Phím tắt: <kbd>1</kbd>–<kbd>4</kbd> chọn đáp án · <kbd>Enter</kbd> kiểm tra / câu tiếp${q.audio ? " · <kbd>Space</kbd> nghe lại" : ""}</p>
      </div>`;

    if (q.kind === "order") renderOrder();
    bindRunner();
    $("#qType").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
    if (q.audio) setTimeout(() => playAudio(), 350);
  }

  function renderOrder() {
    const q = R.qs[R.idx];
    const ans = $("#orderAnswer"), pool = $("#orderPool");
    const tokBtn = (o, placed) => `<button class="tok ${placed ? "tok--placed" : ""}" type="button" data-tok="${o.i}" ${R.checked ? "disabled" : ""} lang="zh">${q.lettered ? `<b>${o.letter}</b>` : ""}${esc(o.t)}</button>`;
    ans.innerHTML = R.placed.map((i) => tokBtn(q.pool.find((o) => o.i === i), true)).join("");
    pool.innerHTML = q.pool.filter((o) => !R.placed.includes(o.i)).map((o) => tokBtn(o, false)).join("");
    $$(".tok", ans).forEach((b) => b.addEventListener("click", () => { R.placed = R.placed.filter((i) => i !== +b.dataset.tok); renderOrder(); updateCheck(); focusAfterToken(pool); }));
    $$(".tok", pool).forEach((b) => b.addEventListener("click", () => { R.placed.push(+b.dataset.tok); renderOrder(); updateCheck(); focusAfterToken(pool); }));
  }
  function focusAfterToken(pool) { const f = $(".tok", pool) || $("#orderAnswer .tok:last-child"); if (f) f.focus(); }

  function updateCheck() {
    const q = R.qs[R.idx], btn = $('[data-act="check"]');
    if (!btn || R.checked) return;
    if (q.kind === "order") btn.disabled = R.placed.length !== q.tokens.length;
    else if (q.kind === "mc" || q.kind === "tf") btn.disabled = R.sel === null;
  }

  function playAudio() {
    const q = R.qs[R.idx];
    const btn = $('[data-act="play"]');
    if (!btn) return;
    if (!TTS.ok || !TTS.voices.length) {
      toast(TTS.ok ? "Không tìm thấy giọng đọc tiếng Trung trên trình duyệt này." : "Trình duyệt không hỗ trợ đọc văn bản.");
      showTranscriptButton();
      return;
    }
    btn.classList.add("is-playing"); btn.setAttribute("aria-label", "Đang phát");
    TTS.speak(q.audio, () => { btn.classList.remove("is-playing"); btn.setAttribute("aria-label", "Phát lại âm thanh"); });
  }
  function showTranscriptButton() {
    if ($("#peek")) return;
    const fb = $("#feedback");
    fb.insertAdjacentHTML("beforebegin", `<button class="btn btn--ghost btn--sm transcript-toggle" id="peek" type="button">${icon("i-eye")} Xem lời thoại</button>`);
    $("#peek").addEventListener("click", (e) => { e.currentTarget.outerHTML = `<div class="transcript" lang="zh">${esc(R.qs[R.idx].audio)}</div>`; });
  }

  function bindRunner() {
    const q = R.qs[R.idx];
    $$(".opt").forEach((b) => b.addEventListener("click", () => selectOpt(+b.dataset.opt)));
    $('[data-act="check"]').addEventListener("click", onCheck);
    $('[data-act="play"]')?.addEventListener("click", playAudio);
    $('[data-act="rate"]')?.addEventListener("change", (e) => { store.data.rate = +e.target.value; store.save(); });
    $('[data-act="clear"]')?.addEventListener("click", () => { if (!R.checked) { R.placed = []; renderOrder(); updateCheck(); } });
  }

  function selectOpt(i) {
    if (R.checked) return;
    R.sel = i;
    $$(".opt").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.opt === i ? "true" : "false"));
    updateCheck();
  }

  function onCheck() {
    const q = R.qs[R.idx];
    if (R.checked) return next();
    if (q.kind === "write") return checkWrite();
    let ok = false, answerText = "";
    if (q.kind === "mc" || q.kind === "tf") {
      if (R.sel === null) return;
      ok = R.sel === q.answer;
      $$(".opt").forEach((b) => {
        const i = +b.dataset.opt;
        b.disabled = true;
        if (i === q.answer) { b.classList.add("is-correct"); $(".opt__mark", b).innerHTML = `${icon("i-check")} Đáp án đúng`; }
        else if (i === R.sel) { b.classList.add("is-wrong"); $(".opt__mark", b).innerHTML = `${icon("i-x")} Bạn chọn`; }
      });
      answerText = (q.kind === "tf" ? (q.answer === 0 ? "√ Đúng" : "× Sai") : `${LETTERS[q.answer]}. ${q.options[q.answer]}`);
    } else if (q.kind === "order") {
      const user = norm(R.placed.map((i) => q.tokens[i]).join(""));
      const valid = [q.tokens].concat(q.alts || []).map((t) => norm(t.join("")));
      ok = valid.includes(user);
      $("#orderAnswer").classList.add(ok ? "is-correct" : "is-wrong");
      answerText = q.lettered
        ? q.tokens.map((t) => q.pool.find((o) => o.t === t).letter).join(" → ") + "　" + q.tokens.join("")
        : q.tokens.join("");
    }
    R.checked = true;
    R.results[R.idx] = ok;
    store.record(q.id, ok);
    renderOrderLocked(q);
    showFeedback(ok, answerText, q);
  }

  function renderOrderLocked(q) {
    if (q.kind !== "order") return;
    renderOrder();
    $(".order__tools")?.remove();
  }

  function showFeedback(ok, answerText, q) {
    const fb = $("#feedback");
    const transcript = q.audio && !q.word ? `<div class="transcript" lang="zh">${esc(q.audio)}</div>` : "";
    fb.innerHTML = `
      <div class="feedback ${ok ? "feedback--ok" : "feedback--bad"}">
        <p class="feedback__head">${icon(ok ? "i-check" : "i-x")} ${ok ? "Chính xác!" : "Chưa đúng"}</p>
        ${!ok ? `<p>Đáp án đúng: <span class="answer-line" lang="zh">${esc(answerText)}</span></p>` : ""}
        ${q.explain ? `<p>${esc(q.explain)}</p>` : ""}
        ${q.vi ? `<p><b>Dịch:</b> ${esc(q.vi)}</p>` : ""}
        ${transcript}
      </div>`;
    $("#peek")?.remove();
    const btn = $('[data-act="check"]');
    btn.disabled = false;
    btn.className = "btn btn--blue";
    btn.innerHTML = R.idx === R.qs.length - 1 ? `Xem kết quả ${icon("i-arrow-right")}` : `Câu tiếp ${icon("i-arrow-right")}`;
    btn.focus({ preventScroll: true });
    fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function checkWrite() {
    const q = R.qs[R.idx];
    const val = $("#writeBox").value.trim();
    if (!val) { $("#writeHelp").innerHTML = `<span style="color:var(--bad);font-weight:700">Hãy viết một câu trước khi kiểm tra.</span>`; $("#writeBox").focus(); return; }
    const usesWord = val.includes(q.word);
    $("#writeBox").readOnly = true;
    $("#feedback").innerHTML = `
      <div class="feedback feedback--info">
        <p class="feedback__head">${icon("i-eye")} So sánh với câu mẫu</p>
        ${usesWord ? "" : `<p style="color:var(--bad);font-weight:700">Lưu ý: câu của bạn chưa có từ “${esc(q.word)}”.</p>`}
        <p>Câu mẫu: <span class="answer-line" lang="zh">${esc(q.sample)}</span>
          <button class="iconbtn" type="button" data-say="${esc(q.sample)}" aria-label="Nghe câu mẫu" style="display:inline-grid;vertical-align:middle;margin-left:6px">${icon("i-volume")}</button></p>
        <p><b>Dịch:</b> ${esc(q.vi)}</p>
        <p style="margin-top:12px;font-weight:700">Câu của bạn có đúng ngữ pháp và dùng từ hợp lý không?</p>
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:8px">
          <button class="btn btn--green btn--sm" type="button" data-self="1">${icon("i-check")} Câu của tôi đạt</button>
          <button class="btn btn--sm" type="button" data-self="0">${icon("i-x")} Chưa đạt, cần ôn</button>
        </div>
      </div>`;
    const btn = $('[data-act="check"]');
    btn.disabled = true;
    btn.innerHTML = `${icon("i-check")} Tự đánh giá để tiếp tục`;
    $$("[data-self]").forEach((b) => b.addEventListener("click", () => {
      const ok = b.dataset.self === "1" && usesWord;
      R.checked = true; R.results[R.idx] = ok; store.record(q.id, ok);
      $$("[data-self]").forEach((x) => x.disabled = true);
      btn.disabled = false; btn.className = "btn btn--blue";
      btn.innerHTML = R.idx === R.qs.length - 1 ? `Xem kết quả ${icon("i-arrow-right")}` : `Câu tiếp ${icon("i-arrow-right")}`;
      btn.focus();
      if (b.dataset.self === "1" && !usesWord) toast("Câu chưa dùng từ yêu cầu nên được tính là chưa đạt.");
    }));
  }

  function next() {
    if (R.idx < R.qs.length - 1) { R.idx++; renderQ(); }
    else renderResult();
  }

  function renderResult() {
    TTS.stop();
    const total = R.qs.length, correct = R.results.filter(Boolean).length, wrong = total - correct;
    const pct = Math.round((correct / total) * 100);
    const C = 2 * Math.PI * 70;
    const msg = pct === 100 ? ["Xuất sắc!", "Bạn đã vượt Long Môn ở phần này."] : pct >= 70 ? ["Làm tốt lắm!", "Ôn lại vài câu sai là hoàn hảo."] : ["Cố lên!", "Xem lại ngữ pháp rồi thử lại nhé."];
    main.innerHTML = `
      <div class="runner">
        <section class="card result" aria-labelledby="resTitle">
          <svg class="ring" viewBox="0 0 170 170" role="img" aria-label="Đúng ${correct} trên ${total} câu">
            <circle cx="85" cy="85" r="70" fill="${CRM}" stroke="${INK}" stroke-width="4"/>
            <circle cx="85" cy="85" r="70" fill="none" stroke="${pct >= 70 ? GRN : RED}" stroke-width="14" stroke-dasharray="${(C * pct) / 100} ${C}" transform="rotate(-90 85 85)" stroke-linecap="round"/>
            <circle cx="85" cy="85" r="56" fill="#fff" stroke="${INK}" stroke-width="3"/>
            <text x="85" y="84" text-anchor="middle" font-size="34" fill="${INK}">${correct}/${total}</text>
            <text x="85" y="108" text-anchor="middle" font-size="15" fill="#5b5248">${pct}% đúng</text>
          </svg>
          <h2 id="resTitle" tabindex="-1">${msg[0]}</h2>
          <p>${msg[1]}</p>
          <div class="result__actions">
            ${wrong ? `<button class="btn btn--primary" type="button" data-act="retry-wrong">${icon("i-redo")} Làm lại ${wrong} câu sai</button>` : ""}
            <button class="btn" type="button" data-act="restart">${icon("i-shuffle")} Làm lại từ đầu</button>
            <a class="btn btn--yellow" href="${R.set.back}">${icon("i-arrow-left")} Quay lại</a>
          </div>
        </section>
      </div>`;
    $("#resTitle").focus();
    $('[data-act="retry-wrong"]')?.addEventListener("click", retryWrong);
    $('[data-act="restart"]').addEventListener("click", () => (R.set.runArgs ? startRun(...R.set.runArgs) : startRun(R.set.id)));
  }

  /* =================== Tài khoản: giao diện =================== */
  const initial = (name) => (name || "?").trim().charAt(0).toUpperCase();
  function renderAccount() {
    const u = accounts.user(), a = $("#acctBtn");
    if (u) {
      a.href = "#/ca-nhan";
      a.innerHTML = `<span class="avatar" aria-hidden="true">${esc(initial(u.name))}</span><span class="acct__name">${esc(u.name)}</span>`;
      a.setAttribute("aria-label", `Trang cá nhân của ${u.name}`);
      a.dataset.nav = "ca-nhan";
    } else {
      a.href = "#/dang-nhap";
      a.innerHTML = `${icon("i-user")}<span class="acct__name">Đăng nhập</span>`;
      a.setAttribute("aria-label", "Đăng nhập");
      a.dataset.nav = "dang-nhap";
    }
  }
  function switchUser(username) {
    if (username) accounts.login(username); else accounts.logout();
    store.load(); renderAccount(); updateBadge();
  }
  const USER_RE = /^[a-z0-9_.-]{3,20}$/;

  function viewAuth(mode) {
    setNav("dang-nhap");
    const u = accounts.user();
    if (u) { location.hash = "#/ca-nhan"; return; }
    const isReg = mode === "register";
    const locals = accounts.list();
    let guestHas = false;
    try { const g = JSON.parse(localStorage.getItem(GUEST_KEY) || "{}"); guestHas = g.q && Object.keys(g.q).length > 0; } catch (e) {}
    main.innerHTML = `
      <section class="pagehead pagehead--red">
        <span class="pagehead__glyph zh" aria-hidden="true">门</span>
        <div class="wrap">
          <nav class="crumbs" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span aria-hidden="true">/</span><span>${isReg ? "Tạo tài khoản" : "Đăng nhập"}</span></nav>
          <h1>${isReg ? "Tạo tài khoản" : "Đăng nhập"}</h1>
          <p class="zh-title" lang="zh">${isReg ? "欢迎加入龙门" : "欢迎回来"}</p>
        </div>
      </section>
      <section class="section section--tight" style="padding-top:0">
        <div class="wrap auth">
          <div style="height:22px"></div>
          <nav class="tabs" aria-label="Chọn thao tác">
            <a class="tab" href="#/dang-nhap" ${!isReg ? 'aria-current="page"' : ""}>${icon("i-user")} Đăng nhập</a>
            <a class="tab" href="#/dang-nhap/tao" ${isReg ? 'aria-current="page"' : ""}>${icon("i-sparkle")} Tạo tài khoản</a>
          </nav>
          <form class="card auth__form" id="authForm" novalidate>
            ${isReg ? `
              <div class="field">
                <label for="fName">Tên hiển thị <span class="req" aria-hidden="true">*</span></label>
                <input id="fName" name="name" autocomplete="nickname" maxlength="30" required aria-describedby="eName">
                <p class="err" id="eName" role="alert"></p>
              </div>` : ""}
            <div class="field">
              <label for="fUser">Tên đăng nhập <span class="req" aria-hidden="true">*</span></label>
              <input id="fUser" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="20" required aria-describedby="hUser eUser">
              ${isReg ? `<p class="helper" id="hUser">3–20 ký tự: chữ thường không dấu, số, dấu chấm, gạch dưới, gạch ngang.</p>` : `<span id="hUser" hidden></span>`}
              <p class="err" id="eUser" role="alert"></p>
            </div>
            <div class="field">
              <label for="fPass">Mật khẩu <span class="req" aria-hidden="true">*</span></label>
              <div class="pw">
                <input id="fPass" name="password" type="password" autocomplete="${isReg ? "new-password" : "current-password"}" required aria-describedby="${isReg ? "hPass " : ""}ePass">
                <button class="btn btn--ghost btn--sm" type="button" data-act="pw" aria-pressed="false" aria-controls="fPass">${icon("i-eye")} Hiện</button>
              </div>
              ${isReg ? `<p class="helper" id="hPass">Ít nhất 4 ký tự.</p>` : ""}
              <p class="err" id="ePass" role="alert"></p>
            </div>
            ${isReg ? `
              <div class="field">
                <label for="fPass2">Nhập lại mật khẩu <span class="req" aria-hidden="true">*</span></label>
                <input id="fPass2" name="password2" type="password" autocomplete="new-password" required aria-describedby="ePass2">
                <p class="err" id="ePass2" role="alert"></p>
              </div>
              ${guestHas ? `<label class="check"><input type="checkbox" id="fImport" checked> Chuyển tiến độ đã làm (khi chưa đăng nhập) vào tài khoản này</label>` : ""}` : ""}
            <button class="btn btn--primary" type="submit" style="width:100%">${isReg ? `${icon("i-sparkle")} Tạo tài khoản` : `${icon("i-arrow-right")} Đăng nhập`}</button>
            <p class="helper" style="margin-top:12px">${isReg ? "Đã có tài khoản? " : "Chưa có tài khoản? "}<a href="${isReg ? "#/dang-nhap" : "#/dang-nhap/tao"}">${isReg ? "Đăng nhập" : "Tạo tài khoản mới"}</a></p>
          </form>
          ${!isReg && locals.length ? `
            <div class="card auth__locals">
              <h2>Tài khoản trên máy này</h2>
              <div class="chips">${locals.map((x) => `<button class="chip chip--btn" type="button" data-pick="${esc(x.username)}"><span class="avatar avatar--sm" aria-hidden="true">${esc(initial(x.name))}</span>${esc(x.name)} <small>@${esc(x.username)}</small></button>`).join("")}</div>
            </div>` : ""}
          <div class="notice" style="margin-top:18px">${icon("i-eye")}<span>Tài khoản và tiến độ chỉ lưu trong trình duyệt trên máy này. Mật khẩu giúp tách dữ liệu giữa những người dùng chung máy, không phải bảo mật như tài khoản online. Muốn chuyển sang máy khác, dùng nút “Xuất dữ liệu” trong trang Cá nhân.</span></div>
        </div>
      </section>`;

    const form = $("#authForm");
    const setErr = (id, msg) => { const e = $("#" + id); e.textContent = msg; const input = e.closest(".field").querySelector("input"); input.setAttribute("aria-invalid", msg ? "true" : "false"); };
    $('[data-act="pw"]').addEventListener("click", (e) => {
      const b = e.currentTarget, show = b.getAttribute("aria-pressed") !== "true";
      $("#fPass").type = show ? "text" : "password"; if ($("#fPass2")) $("#fPass2").type = show ? "text" : "password";
      b.setAttribute("aria-pressed", String(show)); b.innerHTML = `${icon("i-eye")} ${show ? "Ẩn" : "Hiện"}`;
    });
    $$("[data-pick]").forEach((b) => b.addEventListener("click", () => { $("#fUser").value = b.dataset.pick; $("#fPass").focus(); }));
    $("#fUser").addEventListener("blur", (e) => { e.target.value = e.target.value.trim().toLowerCase(); });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = $("#fUser").value.trim().toLowerCase();
      const pw = $("#fPass").value;
      ["eName", "eUser", "ePass", "ePass2"].forEach((id) => $("#" + id) && setErr(id, ""));
      const errs = [];
      if (isReg) {
        const name = $("#fName").value.trim();
        if (!name) errs.push(["eName", "Hãy nhập tên hiển thị."]);
        if (!USER_RE.test(username)) errs.push(["eUser", "Tên đăng nhập cần 3–20 ký tự: chữ thường không dấu, số, . _ -"]);
        else if (accounts.data.users[username]) errs.push(["eUser", "Tên đăng nhập này đã có trên máy. Hãy chọn tên khác hoặc đăng nhập."]);
        if (pw.length < 4) errs.push(["ePass", "Mật khẩu cần ít nhất 4 ký tự."]);
        if ($("#fPass2").value !== pw) errs.push(["ePass2", "Hai mật khẩu chưa giống nhau."]);
        if (errs.length) { errs.forEach(([id, m]) => setErr(id, m)); $("#" + errs[0][0]).closest(".field").querySelector("input").focus(); return; }
        await accounts.register(username, name, pw, $("#fImport") ? $("#fImport").checked : false);
        switchUser(username);
        toast(`Chào mừng ${name}! Tài khoản đã được tạo.`);
        location.hash = "#/ca-nhan";
      } else {
        if (!username) errs.push(["eUser", "Hãy nhập tên đăng nhập."]);
        if (!pw) errs.push(["ePass", "Hãy nhập mật khẩu."]);
        if (errs.length) { errs.forEach(([id, m]) => setErr(id, m)); $("#" + errs[0][0]).closest(".field").querySelector("input").focus(); return; }
        if (!(await accounts.check(username, pw))) { setErr("ePass", "Tên đăng nhập hoặc mật khẩu không đúng."); $("#fPass").focus(); return; }
        switchUser(username);
        toast(`Chào ${accounts.user().name}!`);
        location.hash = "#/ca-nhan";
      }
    });
  }

  function viewProfile() {
    setNav("ca-nhan");
    const u = accounts.user();
    if (!u) {
      main.innerHTML = `
        <div class="wrap section"><div class="card empty">
          <div class="empty__glyph zh" aria-hidden="true">我</div>
          <h2>Đăng nhập để xem phần cá nhân</h2>
          <p>Tạo tài khoản để hệ thống ghi lại lỗi sai của riêng bạn và tạo bài tập luyện điểm yếu.</p>
          <div class="result__actions"><a class="btn btn--primary" href="#/dang-nhap/tao">${icon("i-sparkle")} Tạo tài khoản</a><a class="btn" href="#/dang-nhap">Đăng nhập</a></div>
        </div></div>`;
      return;
    }
    const st = allStats();
    const attempts = Object.values(store.data.q).reduce((s, r) => s + r.a, 0);
    const wrongs = Object.values(store.data.q).reduce((s, r) => s + wrongCount(r), 0);
    const acc = attempts ? Math.round(((attempts - wrongs) / attempts) * 100) : 0;
    const weak = analyze();
    const top = weak.slice(0, 3);
    const days = Object.keys(store.data.days).length;

    // Độ chính xác theo nhóm kỹ năng
    const groups = [["Từ vựng", (s) => s.vocab], ["Ngữ pháp", (s) => s.lesson && !s.vocab], ["Nghe", (s) => s.skill === "nghe"], ["Đọc", (s) => s.skill === "doc"], ["Viết", (s) => s.skill === "viet"]];
    const skillRows = groups.map(([name, f]) => {
      let a = 0, w = 0, seen = 0, total = 0;
      Object.values(SETS).filter(f).forEach((s) => s.questions.forEach((q) => { total++; const r = store.get(q.id); if (r) { seen++; a += r.a; w += wrongCount(r); } }));
      return { name, seen, total, acc: a ? Math.round(((a - w) / a) * 100) : null };
    });

    // 14 ngày gần nhất
    const dayRows = [];
    for (let i = 13; i >= 0; i--) { const t = Date.now() - i * 86400000, k = todayStr(t), d = store.data.days[k] || { a: 0, c: 0 }; dayRows.push({ k, d, label: new Date(t).getDate() }); }
    const maxA = Math.max(1, ...dayRows.map((x) => x.d.a));

    main.innerHTML = `
      <section class="pagehead pagehead--green">
        <span class="pagehead__glyph zh" aria-hidden="true">我</span>
        <div class="wrap profile__head">
          <span class="avatar avatar--lg" aria-hidden="true">${esc(initial(u.name))}</span>
          <div>
            <nav class="crumbs" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span aria-hidden="true">/</span><span>Cá nhân</span></nav>
            <h1>${esc(u.name)}</h1>
            <p class="zh-title">@${esc(u.username)} · tham gia ${new Date(u.created).toLocaleDateString("vi-VN")}</p>
          </div>
        </div>
      </section>
      <section class="section section--tight">
        <div class="wrap">
          <div class="stats stats--4">
            <div class="card stat"><b>${st.answered}</b><span>Câu đã làm</span></div>
            <div class="card stat"><b>${attempts ? acc + "%" : "–"}</b><span>Tỉ lệ đúng</span></div>
            <div class="card stat"><b>${store.wrongIds().length}</b><span>Câu chưa sửa</span></div>
            <div class="card stat"><b>${days}</b><span>Ngày đã học</span></div>
          </div>

          <article class="card personal">
            <span class="personal__glyph zh" aria-hidden="true">练</span>
            <h2>Bài tập riêng cho bạn</h2>
            ${top.length ? `
              <p>Tạo từ những lỗi bạn hay mắc nhất. Gồm câu bạn đang sai, câu từng sai và câu mới cùng điểm ngữ pháp để luyện thêm.</p>
              <div class="chips" style="margin:4px 0 16px">${top.map((t) => `<span class="chip">${esc(TAG_INFO[t.tag].name)}</span>`).join("")}</div>
              <a class="btn btn--yellow" href="#/lam/ca-nhan">${icon("i-target")} Làm bài tập riêng (15 câu)</a>` : `
              <p>Chưa có dữ liệu lỗi sai. Hãy làm vài bài tập hoặc phần luyện thi, hệ thống sẽ tự tìm điểm yếu và tạo bài tập riêng cho bạn.</p>
              <a class="btn btn--yellow" href="#/bai-hoc">${icon("i-book")} Bắt đầu với bài học</a>`}
          </article>

          <div class="profile__grid">
            <section class="card panel" aria-labelledby="weakTitle">
              <h2 id="weakTitle">Lỗi sai hay mắc</h2>
              ${weak.length ? `
                <ol class="weak">
                  ${weak.slice(0, 8).map((w, i) => {
                    const info = TAG_INFO[w.tag], pct = Math.round(w.rate * 100);
                    return `
                    <li class="weak__row">
                      <span class="weak__rank" aria-hidden="true">${i + 1}</span>
                      <div class="weak__body">
                        <div class="weak__top"><b>${esc(info.name)}</b><span class="chip chip--sm">${info.group}</span></div>
                        <div class="meter" role="img" aria-label="Tỉ lệ sai ${pct}%"><span style="width:${Math.max(4, pct)}%"></span></div>
                        <p class="weak__meta">Sai ${w.w}/${w.a} lượt (${pct}%) · ${w.cur} câu chưa sửa · đã làm ${w.seen}/${w.total} câu</p>
                        <div class="weak__acts">
                          <a class="btn btn--sm btn--primary" href="#/lam/diem-yeu/${w.tag}">${icon("i-target")} Luyện riêng</a>
                          <a class="btn btn--sm btn--ghost" href="${info.href}">${icon("i-read")} Ôn lý thuyết</a>
                        </div>
                      </div>
                    </li>`;
                  }).join("")}
                </ol>` : `<p class="sub">Bạn chưa làm sai câu nào. Tiếp tục luyện tập để hệ thống hiểu bạn hơn.</p>`}
            </section>

            <div class="profile__side">
              <section class="card panel" aria-labelledby="skillTitle">
                <h2 id="skillTitle">Theo kỹ năng</h2>
                <ul class="skills">
                  ${skillRows.map((s) => `
                    <li>
                      <div class="skills__top"><b>${s.name}</b><span>${s.acc === null ? "Chưa làm" : `${s.acc}% đúng`}</span></div>
                      <div class="meter meter--ok" role="img" aria-label="${s.name}: ${s.acc === null ? "chưa làm" : s.acc + "% đúng"}"><span style="width:${s.acc || 0}%"></span></div>
                      <p class="weak__meta">Đã làm ${s.seen}/${s.total} câu</p>
                    </li>`).join("")}
                </ul>
              </section>
              <section class="card panel" aria-labelledby="dayTitle">
                <h2 id="dayTitle">14 ngày gần đây</h2>
                <div class="days" role="img" aria-label="Số câu làm mỗi ngày trong 14 ngày gần đây, tổng ${dayRows.reduce((s, x) => s + x.d.a, 0)} câu">
                  ${dayRows.map((x) => `<div class="days__col" title="${x.k}: ${x.d.a} câu, đúng ${x.d.c}"><span class="days__bar" style="height:${Math.round((x.d.a / maxA) * 100)}%"></span><span class="days__lbl">${x.label}</span></div>`).join("")}
                </div>
              </section>
              <section class="card panel" aria-labelledby="accTitle">
                <h2 id="accTitle">Tài khoản</h2>
                <div class="acct-actions">
                  <button class="btn btn--sm" type="button" data-act="export">${icon("i-download")} Xuất dữ liệu</button>
                  <button class="btn btn--sm" type="button" data-act="import">${icon("i-upload")} Nhập dữ liệu</button>
                  <button class="btn btn--sm btn--blue" type="button" data-act="logout">${icon("i-arrow-left")} Đăng xuất</button>
                </div>
                <hr class="sep">
                <button class="btn btn--ghost btn--sm danger" type="button" data-act="delete">${icon("i-trash")} Xóa tài khoản này</button>
              </section>
            </div>
          </div>
        </div>
      </section>`;

    $('[data-act="logout"]').addEventListener("click", () => { switchUser(null); toast("Đã đăng xuất."); location.hash = "#/"; });
    $('[data-act="delete"]').addEventListener("click", async () => {
      if (!(await askConfirm("Xóa tài khoản này?", `Tài khoản “${u.name}” và toàn bộ tiến độ của nó trên máy này sẽ bị xóa. Thao tác không thể hoàn tác.`, "Xóa tài khoản"))) return;
      accounts.remove(u.username); switchUser(null); toast("Đã xóa tài khoản."); location.hash = "#/";
    });

    // Xuất: hiện dữ liệu để sao chép (trang trên claude.ai chặn tải file), kèm nút tải file khi mở trên máy
    $('[data-act="export"]').addEventListener("click", () => {
      const json = JSON.stringify({ app: "longmon-hsk4", version: 1, user: { username: u.username, name: u.name }, exported: new Date().toISOString(), progress: store.data });
      openModal("Xuất dữ liệu",
        `<p>Sao chép đoạn dữ liệu dưới đây rồi dán vào ô “Nhập dữ liệu” trên máy khác. Khi mở website từ file trên máy, bạn cũng có thể tải về file .json.</p>
         <label class="visually-hidden" for="exportBox">Dữ liệu tiến độ</label>
         <textarea id="exportBox" class="modal__text" readonly>${esc(json)}</textarea>`,
        [
          { label: `${icon("i-download")} Tải file .json`, cls: "btn--ghost", keep: true, onClick: () => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
            a.download = `longmon-hsk4-${u.username}.json`;
            document.body.appendChild(a); a.click(); a.remove();
          } },
          { label: `${icon("i-check")} Sao chép`, cls: "btn--blue", keep: true, onClick: (d) => {
            const box = $("#exportBox", d);
            const fallback = () => { box.focus(); box.select(); toast("Đã chọn sẵn dữ liệu, bấm Ctrl+C để sao chép."); };
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json).then(() => toast("Đã sao chép dữ liệu."), fallback);
            else fallback();
          } },
          { label: "Đóng", value: "close", cls: "btn--yellow" }
        ]);
    });

    // Nhập: chọn file hoặc dán dữ liệu
    $('[data-act="import"]').addEventListener("click", () => {
      openModal("Nhập dữ liệu",
        `<p>Dữ liệu sẽ được <b>gộp</b> vào tài khoản này: với mỗi câu, bản ghi mới hơn được giữ lại.</p>
         <label class="btn btn--sm" for="importFile" style="margin-bottom:10px">${icon("i-upload")} Chọn file .json</label>
         <input type="file" id="importFile" accept="application/json,.json" class="visually-hidden">
         <label for="importBox" style="display:block;font-weight:700;margin-bottom:6px">Hoặc dán dữ liệu vào đây</label>
         <textarea id="importBox" class="modal__text" placeholder="{&quot;app&quot;:&quot;longmon-hsk4&quot;, …}"></textarea>
         <p class="err" id="importErr" role="alert"></p>`,
        [
          { label: "Hủy", value: "cancel", cls: "btn--ghost" },
          { label: `${icon("i-upload")} Nhập dữ liệu`, cls: "btn--primary", keep: true, onClick: (d) => {
            try {
              const j = JSON.parse($("#importBox", d).value);
              if (j.app !== "longmon-hsk4" || !j.progress || typeof j.progress.q !== "object") throw new Error("bad");
              Object.keys(j.progress.q).forEach((id) => { const mine = store.data.q[id], theirs = j.progress.q[id]; if (!mine || (theirs.t || 0) > (mine.t || 0)) store.data.q[id] = theirs; });
              Object.keys(j.progress.days || {}).forEach((k) => { if (!store.data.days[k]) store.data.days[k] = j.progress.days[k]; });
              store.save(); updateBadge(); d.close(); toast("Đã nhập dữ liệu."); viewProfile();
            } catch (err) { $("#importErr", d).textContent = "Dữ liệu không hợp lệ. Hãy dán đúng đoạn dữ liệu (hoặc chọn file) được xuất từ Long Môn HSK4."; }
          } }
        ],
        (d) => {
          $("#importFile", d).addEventListener("change", (e) => {
            const f = e.target.files[0]; if (!f) return;
            const rd = new FileReader();
            rd.onload = () => { $("#importBox", d).value = rd.result; $("#importErr", d).textContent = ""; };
            rd.readAsText(f);
          });
        });
    });
  }

  /* =================== Hộp thoại trong trang =================== */
  function openModal(title, bodyHTML, buttons, onOpen) {
    return new Promise((resolve) => {
      let d = $("#modal");
      if (!d) { d = document.createElement("dialog"); d.id = "modal"; d.className = "modal"; d.setAttribute("aria-labelledby", "modalTitle"); document.body.appendChild(d); }
      d.innerHTML = `
        <h2 class="modal__title" id="modalTitle">${esc(title)}</h2>
        <div class="modal__body">${bodyHTML}</div>
        <div class="modal__actions">${buttons.map((b, i) => `<button class="btn btn--sm ${b.cls || ""}" type="button" data-mi="${i}">${b.label}</button>`).join("")}</div>`;
      let result = null;
      d.onclose = () => resolve(result);
      $$("[data-mi]", d).forEach((el) => el.addEventListener("click", () => {
        const b = buttons[+el.dataset.mi];
        if (b.onClick) b.onClick(d);
        if (!b.keep) { result = b.value; d.close(); }
      }));
      if (onOpen) onOpen(d);
      d.showModal();
    });
  }
  function askConfirm(title, msg, okLabel) {
    return openModal(title, `<p>${esc(msg)}</p>`, [
      { label: "Hủy", value: "no", cls: "btn--ghost" },
      { label: esc(okLabel), value: "yes", cls: "btn--primary" }
    ]).then((v) => v === "yes");
  }

  /* =================== Router =================== */
  function viewNotFound() {
    main.innerHTML = `<div class="wrap section"><div class="card empty"><div class="empty__glyph zh" aria-hidden="true">迷</div><h2>Không tìm thấy trang</h2><p>Đường dẫn này không tồn tại.</p><a class="btn btn--primary" href="#/">Về trang chủ</a></div></div>`;
  }
  function route() {
    if (location.hash === "#main") { main.focus(); return; } // liên kết “bỏ qua tới nội dung chính”
    TTS.stop();
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const [a, b, c] = parts;
    R = null;
    if (!a) viewHome();
    else if (a === "bai-hoc") viewLessons();
    else if (a === "bai") viewLesson(b, c);
    else if (a === "luyen-thi") viewExam(b);
    else if (a === "cau-sai") viewReview();
    else if (a === "lam") startRun(b, c);
    else if (a === "dang-nhap") viewAuth(b === "tao" ? "register" : "login");
    else if (a === "ca-nhan") viewProfile();
    else viewNotFound();
    if (a !== "lam") { window.scrollTo({ top: 0, behavior: "instant" }); main.focus({ preventScroll: true }); }
  }

  /* Ủy quyền sự kiện: nút phát âm */
  document.addEventListener("click", (e) => {
    const s = e.target.closest("[data-say]");
    if (s) {
      if (!TTS.ok || !TTS.voices.length) { toast("Không tìm thấy giọng đọc tiếng Trung trên trình duyệt này."); return; }
      TTS.speak(s.dataset.say);
    }
  });

  /* Phím tắt khi làm bài */
  document.addEventListener("keydown", (e) => {
    if (!R || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "textarea" || tag === "select" || tag === "input") return;
    const q = R.qs[R.idx];
    if (!q) return;
    if (/^[1-6]$/.test(e.key) && q.options && +e.key <= q.options.length) { selectOpt(+e.key - 1); e.preventDefault(); }
    else if (e.key === "Enter" && tag !== "button" && tag !== "a") { const b = $('[data-act="check"]'); if (b && !b.disabled) { b.click(); e.preventDefault(); } }
    else if (e.key === " " && q.audio && tag !== "button") { playAudio(); e.preventDefault(); }
  });

  accounts.load();
  store.load();
  TTS.init();
  window.addEventListener("hashchange", route);
  renderAccount();
  updateBadge();
  route();
})();
