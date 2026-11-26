#!/usr/bin/env python3
"""Nachprüfung #832: die Schritte «Layout test» und «Report layout test result» aus verify-authoring.yml lesen und so ausführen,
wie es der Runner tut (bash -e, continue-on-error, if-Bedingung von Hand nachgebildet). Aufruf: workflow-probe.py <Kopie mit site/ und authoring/>
Gibt outcome des Layouttest-Schritts, Exit des Berichtsschritts und das Ergebnis des Jobs aus."""
import sys, os, subprocess, yaml, pathlib
repo = pathlib.Path(__file__).resolve().parents[2]; work = sys.argv[1]
wf = yaml.safe_load((repo / '.github/workflows/verify-authoring.yml').read_text())
steps = wf['jobs']['build-and-compare']['steps']
lt = next(s for s in steps if s.get('id') == 'layouttest'); rp = steps[steps.index(lt) + 1]
print('Schritte:', len(steps), '| Layouttest continue-on-error:', lt.get('continue-on-error'), '| Bericht if:', rp['if'], '| Bericht continue-on-error:', rp.get('continue-on-error'))
print('Bericht ist letzter Schritt:', rp is steps[-1], '| Bericht env:', rp['env'], '| run:', rp['run'])
env = dict(os.environ)  # PLAYWRIGHT_MODULE der Umgebung, nicht der Pfad des Runners
r1 = subprocess.run(['bash', '-e', '-c', lt['run']], cwd=work, env=env, capture_output=True, text=True)
outcome = 'success' if r1.returncode == 0 else 'failure'
env2 = dict(env, LAYOUT_OUTCOME=outcome, GITHUB_STEP_SUMMARY=os.path.join(work, 'summary-wf.md'))
r2 = subprocess.run(['bash', '-e', '-c', rp['run']], cwd=work, env=env2, capture_output=True, text=True)
print('Layouttest exit', r1.returncode, '=> outcome', outcome, '(conclusion wegen continue-on-error: success)')
print('Bericht exit', r2.returncode, '| stdout:', r2.stdout.strip().replace('\n', ' ¦ '))
print('JOB:', 'success' if r2.returncode == 0 else 'failure')
