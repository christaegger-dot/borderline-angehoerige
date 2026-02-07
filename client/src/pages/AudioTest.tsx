/**
 * Isolierte Audio-Testseite – nur zum Debugging auf iOS.
 * Testet 4 verschiedene Audio-Methoden, damit wir herausfinden,
 * welche auf dem iPhone des Users funktioniert.
 * Wird nach dem Debugging wieder entfernt.
 */
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MP3_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NuJzTwfObzgArAmO.mp3";

export default function AudioTest() {
  const [log, setLog] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const addLog = (msg: string) => {
    const ts = new Date().toLocaleTimeString();
    setLog((prev) => [`[${ts}] ${msg}`, ...prev]);
  };

  /* ── Test 1: Einfachstes HTML5 Audio ─────────────── */
  const test1_simpleAudio = () => {
    addLog("Test 1: new Audio() + play()");
    try {
      const a = new Audio(MP3_URL);
      a.volume = 1.0;
      const p = a.play();
      if (p) {
        p.then(() => addLog("✅ Test 1: play() resolved – Ton sollte spielen"))
         .catch((e) => addLog(`❌ Test 1: play() rejected: ${e.message}`));
      }
    } catch (e: any) {
      addLog(`❌ Test 1: Exception: ${e.message}`);
    }
  };

  /* ── Test 2: DOM <audio> Element (im HTML sichtbar) ── */
  const test2_domAudio = () => {
    addLog("Test 2: DOM <audio> element play()");
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1.0;
      const p = audioRef.current.play();
      if (p) {
        p.then(() => addLog("✅ Test 2: play() resolved – Ton sollte spielen"))
         .catch((e) => addLog(`❌ Test 2: play() rejected: ${e.message}`));
      }
    } else {
      addLog("❌ Test 2: audioRef ist null");
    }
  };

  /* ── Test 3: Web Audio API Oscillator ────────────── */
  const test3_webAudioOscillator = () => {
    addLog("Test 3: Web Audio API Oscillator (Piep-Ton)");
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        addLog("❌ Test 3: AudioContext nicht verfügbar");
        return;
      }
      const ctx = new AudioCtx();
      addLog(`Test 3: AudioContext state = ${ctx.state}`);

      if (ctx.state === "suspended") {
        ctx.resume().then(() => {
          addLog(`Test 3: AudioContext resumed, state = ${ctx.state}`);
          playOsc(ctx);
        }).catch((e) => addLog(`❌ Test 3: resume() rejected: ${e.message}`));
      } else {
        playOsc(ctx);
      }
    } catch (e: any) {
      addLog(`❌ Test 3: Exception: ${e.message}`);
    }
  };

  const playOsc = (ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 528;
    gain.gain.value = 0.5;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
    addLog("✅ Test 3: Oscillator gestartet (0.5s, 528Hz)");
  };

  /* ── Test 4: Web Audio API + MP3 fetch ───────────── */
  const test4_webAudioBuffer = () => {
    addLog("Test 4: Web Audio API + fetch MP3 + decodeAudioData");
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        addLog("❌ Test 4: AudioContext nicht verfügbar");
        return;
      }
      const ctx = new AudioCtx();

      const resumeAndPlay = () => {
        addLog(`Test 4: AudioContext state = ${ctx.state}`);
        fetch(MP3_URL)
          .then((r) => {
            addLog(`Test 4: fetch status = ${r.status}`);
            return r.arrayBuffer();
          })
          .then((buf) => {
            addLog(`Test 4: ArrayBuffer size = ${buf.byteLength}`);
            return ctx.decodeAudioData(buf);
          })
          .then((decoded) => {
            const source = ctx.createBufferSource();
            source.buffer = decoded;
            source.connect(ctx.destination);
            source.start();
            addLog("✅ Test 4: BufferSource gestartet – Ton sollte spielen");
          })
          .catch((e) => addLog(`❌ Test 4: ${e.message}`));
      };

      if (ctx.state === "suspended") {
        ctx.resume().then(resumeAndPlay).catch((e) => addLog(`❌ Test 4: resume failed: ${e.message}`));
      } else {
        resumeAndPlay();
      }
    } catch (e: any) {
      addLog(`❌ Test 4: Exception: ${e.message}`);
    }
  };

  /* ── Geräte-Info ─────────────────────────────────── */
  const showDeviceInfo = () => {
    const info = [
      `UA: ${navigator.userAgent.slice(0, 100)}`,
      `maxTouchPoints: ${navigator.maxTouchPoints}`,
      `AudioContext: ${typeof AudioContext !== "undefined" ? "ja" : "nein"}`,
      `webkitAudioContext: ${typeof (window as any).webkitAudioContext !== "undefined" ? "ja" : "nein"}`,
    ];
    info.forEach((i) => addLog(i));
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-2">Audio-Test (iOS Debug)</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Bitte tippen Sie jeden Button und berichten Sie, ob Sie einen Ton hören.
        <br />
        <strong>Wichtig:</strong> Mute-Switch aus, Lautstärke hoch.
      </p>

      {/* Sichtbares audio-Element für Test 2 */}
      <audio
        ref={audioRef}
        src={MP3_URL}
        preload="auto"
        playsInline
        controls
        className="w-full mb-4"
      />
      <p className="text-xs text-muted-foreground mb-4">
        ↑ Nativer Audio-Player. Können Sie hier abspielen? (Drücken Sie Play)
      </p>

      <div className="space-y-3 mb-6">
        <Card>
          <CardContent className="p-3">
            <Button onClick={test1_simpleAudio} className="w-full" variant="outline">
              Test 1: new Audio() + play()
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <Button onClick={test2_domAudio} className="w-full" variant="outline">
              Test 2: DOM audio element play()
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <Button onClick={test3_webAudioOscillator} className="w-full" variant="outline">
              Test 3: Web Audio Oscillator (Piep)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <Button onClick={test4_webAudioBuffer} className="w-full" variant="outline">
              Test 4: Web Audio + fetch MP3
            </Button>
          </CardContent>
        </Card>

        <Button onClick={showDeviceInfo} variant="ghost" size="sm" className="w-full">
          Geräte-Info anzeigen
        </Button>
      </div>

      {/* Log */}
      <div className="bg-muted/30 rounded-lg p-3 max-h-64 overflow-y-auto">
        <p className="text-xs font-mono text-muted-foreground mb-1">Log:</p>
        {log.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">Noch keine Tests durchgeführt</p>
        ) : (
          log.map((entry, i) => (
            <p key={i} className={`text-xs font-mono ${entry.includes("✅") ? "text-green-700" : entry.includes("❌") ? "text-red-600" : "text-muted-foreground"}`}>
              {entry}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
