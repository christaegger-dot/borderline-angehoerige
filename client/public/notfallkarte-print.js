(function () {
  var PRINT_MESSAGE_TYPE = "notfallkarte-print-data";

  function applyData(d) {
    if (!d) return;

    // Kontaktpersonen (bis zu 3 Zeilen)
    var contacts = d.personalContacts || [];
    for (var i = 0; i < 3; i++) {
      var c = contacts[i];
      var setField = function (id, val) {
        var el = document.getElementById(id);
        if (el && val) {
          el.value = val;
          el.removeAttribute("placeholder");
        }
      };
      if (c) {
        setField("contact-" + i + "-name", c.name);
        setField("contact-" + i + "-phone", c.phone);
        setField("contact-" + i + "-relation", c.relation);
      }
    }

    // Beruhigungsstrategien (bis zu 4 Slots)
    var strategies = d.calmingStrategies || [];
    for (var j = 0; j < 4; j++) {
      var s = strategies[j];
      var sEl = document.getElementById("strategy-" + j);
      if (sEl) {
        if (s && s.text) {
          sEl.value = s.text;
          sEl.removeAttribute("placeholder");
        } else if (j >= strategies.length) {
          sEl.value = "";
          sEl.placeholder = "Eigene Strategie eingeben…";
        }
      }
    }

    // Persönliche Notizen
    var notesEl = document.getElementById("notes");
    if (notesEl && d.notes) {
      notesEl.value = d.notes;
      notesEl.removeAttribute("placeholder");
    }
  }

  // Die React-App schreibt die Daten unter "notfallkarte-print-data"
  // in localStorage, bevor sie dieses Fenster öffnet. Wenn dieser
  // Speicher blockiert ist, folgt die Übergabe per postMessage.
  try {
    var raw = localStorage.getItem("notfallkarte-print-data");
    if (raw) {
      applyData(JSON.parse(raw));
      localStorage.removeItem("notfallkarte-print-data");
    }
  } catch (_error) {
    // Fehler ignorieren – Felder bleiben leer / mit Platzhaltern
  }

  window.addEventListener("message", function (event) {
    if (event.origin !== window.location.origin) return;
    var payload = event.data;
    if (!payload || payload.type !== PRINT_MESSAGE_TYPE || !payload.data) {
      return;
    }

    applyData(payload.data);
  });

  if (new URLSearchParams(window.location.search).get("print") === "1") {
    window.addEventListener("load", function () {
      setTimeout(function () {
        window.print();
      }, 300);
    });
  }
})();
