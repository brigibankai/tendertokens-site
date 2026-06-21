/* ============================================================
   Tender Tokens Studio — script.js
   gallery generation · prompt shuffle · paper confetti ·
   scroll reveal · gentle hero parallax/cursor-tilt
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ============================================================
     COLLECTION — build 54 scrapbook tiles
     To use real photos later: add filenames to IMAGES below
     (e.g. "images/token-01.jpg"). Any tile without an image
     shows a labelled placeholder. Order is preserved.
     ============================================================ */
  var IMAGES = [
    "images/token-01.jpg", "images/token-02.jpg", "images/token-03.jpg",
    "images/token-04.jpg", "images/token-05.jpg", "images/token-06.jpg",
    "images/token-07.jpg", "images/token-08.jpg", "images/token-09.jpg",
    "images/token-10.jpg"
    // add more real photos here — each lines up with the caption at the same index
  ];

  var CAPTIONS = [
    "blue marker mood", "warm marker practice", "tender tokens, again",
    "sticker evidence", "tiny wrapper, huge feeling", "receipt saved",
    "palm springs mood", "happy hands", "hi, baby!", "kept because cute",
    "torn ticket stub",
    "candy label love", "a very good tag", "found on the floor",
    "coffee sleeve", "washi happy", "almost tossed it",
    "tiny note to self", "pressed + taped", "the good fortune",
    "stamp of a tuesday", "wrapper, rescued", "soft paper feelings",
    "proof of snack", "kept the crumbs", "doodle in the margin",
    "loose thread day", "a sweet receipt", "label peeled gently",
    "ticket to nowhere", "matchbook memory", "sticker hoard",
    "smol but mighty", "the dog-eared one", "blue ink smudge",
    "a folded secret", "gum wrapper gold", "saved the band-aid",
    "tea bag tag", "pocket lint poem", "stub of a good day",
    "a tender little tag", "kept the wrapper", "paper scrap joy",
    "receipt confetti", "the cute sticker", "a museum of mondays",
    "evidence of joy", "tiny taped thing", "marker bled through",
    "a soft little proof", "saved on purpose", "almost-trash treasure",
    "the keepable bit", "one good scrap", "still smells nice",
    "a paper hug", "kept it anyway", "tender token #54"
  ];

  var TONES = ["--receipt", "--apricot", "--sage", "--plum", "--moss"];
  var TONE_HEX = {
    "--receipt": "#E8DEC8", "--apricot": "#D89A7A", "--sage": "#AAB39A",
    "--plum": "#85758C", "--moss": "#7B8B74"
  };

  function buildGallery() {
    var gallery = document.getElementById("gallery");
    if (!gallery) return;
    var frag = document.createDocumentFragment();

    for (var i = 0; i < 54; i++) {
      var n = i + 1;
      var cap = CAPTIONS[i] || "tender token #" + n;
      var rot = (Math.random() * 6 - 3).toFixed(2); // -3..3 deg

      var tile = document.createElement("figure");
      tile.className = "tile";
      tile.style.transform = "rotate(" + rot + "deg)";
      tile.setAttribute("data-base-rot", rot);

      var pin = document.createElement("span");
      pin.className = "pin";
      pin.setAttribute("aria-hidden", "true");

      var num = document.createElement("span");
      num.className = "tile-num";
      num.textContent = "#" + n;

      var photo = document.createElement("div");
      photo.className = "tile-photo";

      if (IMAGES[i]) {
        var img = document.createElement("img");
        img.src = IMAGES[i];
        img.loading = "lazy";
        img.alt = cap + " — handmade tender token #" + n;
        photo.appendChild(img);
      } else {
        var ph = document.createElement("div");
        ph.className = "tile-ph";
        var tone = TONES[i % TONES.length];
        ph.style.backgroundColor = TONE_HEX[tone];
        ph.textContent = "scrap #" + n;
        photo.appendChild(ph);
        photo.setAttribute("role", "img");
        photo.setAttribute("aria-label", cap + " — placeholder for handmade tender token #" + n);
      }

      var capEl = document.createElement("figcaption");
      capEl.className = "tile-cap";
      capEl.textContent = cap;

      tile.appendChild(pin);
      tile.appendChild(num);
      tile.appendChild(photo);
      tile.appendChild(capEl);
      frag.appendChild(tile);
    }
    gallery.appendChild(frag);

    // unrotate on hover, restore base rotation on leave
    gallery.addEventListener("mouseover", function (e) {
      var t = e.target.closest(".tile");
      if (t) t.style.transform = "rotate(0deg) translateY(-6px) scale(1.03)";
    });
    gallery.addEventListener("mouseout", function (e) {
      var t = e.target.closest(".tile");
      if (t) t.style.transform = "rotate(" + t.getAttribute("data-base-rot") + "deg)";
    });
  }
  buildGallery();

  /* ============================================================
     TENDER PROMPT — shuffle
     ============================================================ */
  var PROMPTS = [
    "what did you almost throw away today?",
    "what wrapper deserves a second life?",
    "what tiny thing felt weirdly important?",
    "save one scrap from today and name the feeling.",
    "which receipt tells a secret little story?",
    "what label is too cute to recycle?",
    "what did you keep just because?"
  ];
  var promptText = document.getElementById("promptText");
  var shuffleBtn = document.getElementById("shuffleBtn");
  var lastPrompt = 0;
  if (promptText && shuffleBtn) {
    shuffleBtn.addEventListener("click", function () {
      var idx;
      do { idx = Math.floor(Math.random() * PROMPTS.length); }
      while (idx === lastPrompt && PROMPTS.length > 1);
      lastPrompt = idx;

      if (prefersReduced) {
        promptText.textContent = PROMPTS[idx];
        return;
      }
      promptText.classList.add("swap");
      setTimeout(function () {
        promptText.textContent = PROMPTS[idx];
        promptText.classList.remove("swap");
      }, 250);
    });
  }

  /* ============================================================
     PAPER CONFETTI — on CTA click (tiny scraps)
     ============================================================ */
  var CONFETTI_COLORS = ["#C97857", "#D89A7A", "#AAB39A", "#85758C", "#00A9C8", "#FBF8F1"];
  function burstConfetti(x, y) {
    if (prefersReduced) return;
    var count = 18;
    for (var i = 0; i < count; i++) {
      (function (i) {
        var p = document.createElement("span");
        p.className = "confetti-piece";
        var c = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        p.style.background = c;
        if (i % 4 === 0) p.style.borderRadius = "50%";
        p.style.left = x + "px";
        p.style.top = y + "px";
        document.body.appendChild(p);

        var angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
        var dist = 60 + Math.random() * 90;
        var dx = Math.cos(angle) * dist;
        var dy = Math.sin(angle) * dist - 40; // bias upward
        var rot = (Math.random() * 720 - 360) + "deg";

        p.animate(
          [
            { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
            { transform: "translate(" + dx + "px," + (dy + 140) + "px) rotate(" + rot + ")", opacity: 0 }
          ],
          { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" }
        ).onfinish = function () { p.remove(); };
      })(i);
    }
  }
  document.querySelectorAll(".js-confetti").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var r = btn.getBoundingClientRect();
      burstConfetti(r.left + r.width / 2, r.top + r.height / 2);
      // let the mailto proceed normally
    });
  });

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ============================================================
     HERO — gentle parallax + cursor-follow tilt
     ============================================================ */
  var collage = document.getElementById("collage");
  var spread = document.getElementById("collageSpread");
  if (collage && spread && !prefersReduced) {
    var targetRX = 0, targetRY = 0, curRX = 0, curRY = 0, raf = null;

    function loop() {
      curRX += (targetRX - curRX) * 0.08;
      curRY += (targetRY - curRY) * 0.08;
      spread.style.transform =
        "rotate(2.2deg) perspective(800px) rotateX(" + curRX.toFixed(2) +
        "deg) rotateY(" + curRY.toFixed(2) + "deg)";
      if (Math.abs(targetRX - curRX) > 0.05 || Math.abs(targetRY - curRY) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else { raf = null; }
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }

    collage.addEventListener("mousemove", function (e) {
      var r = collage.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      targetRY = px * 12;
      targetRX = -py * 10;
      kick();
    });
    collage.addEventListener("mouseleave", function () {
      targetRX = 0; targetRY = 0; kick();
    });

    // subtle scroll parallax on floating scraps
    var floats = collage.querySelectorAll(".float");
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y > 700) return;
      floats.forEach(function (f, i) {
        var depth = (i + 1) * 0.04;
        f.style.marginTop = (-y * depth) + "px";
      });
    }, { passive: true });
  }
})();
