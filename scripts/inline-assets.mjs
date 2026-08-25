/* Fold the built JS and CSS into index.html so the published page is a single
   self-contained file.

   On GitHub Pages the separate asset requests were the whole failure surface:
   a cached index.html naming a hashed bundle 404s, and a CDN edge can serve
   the new HTML before the new asset. With nothing to fetch beyond the
   document itself, neither can happen. The bundle is ~76 kB gzipped, so the
   cost of re-sending it per load is not worth another blank page. */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

/** Identifies this build to the page and to version.json, so a stale cached
    copy can notice it is behind and reload itself. */
function buildId() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'local';
  }
}

const dist = 'dist';
const htmlPath = join(dist, 'index.html');
let html = readFileSync(htmlPath, 'utf8');
let inlinedJs = 0;
let inlinedCss = 0;

html = html.replace(
  /<script\b[^>]*\bsrc="\.\/assets\/([^"]+)"[^>]*><\/script>/g,
  (_match, file) => {
    // A literal </script> inside the bundle would close this tag early.
    const code = readFileSync(join(dist, 'assets', file), 'utf8').replace(/<\/script/gi, '<\\/script');
    inlinedJs += 1;
    return `<script type="module">\n${code}\n</script>`;
  },
);

html = html.replace(
  /<link\b[^>]*\bhref="\.\/assets\/([^"]+\.css)"[^>]*>/g,
  (_match, file) => {
    inlinedCss += 1;
    return `<style>\n${readFileSync(join(dist, 'assets', file), 'utf8')}\n</style>`;
  },
);

if (!inlinedJs || !inlinedCss) {
  throw new Error(`inline-assets: expected a script and a stylesheet to inline, got ${inlinedJs} and ${inlinedCss}`);
}

const build = buildId();
const builtAt = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
html = html.replace('__BUILD__', build).replace('__BUILT_AT__', builtAt);

writeFileSync(htmlPath, html);
writeFileSync(join(dist, 'version.json'), `${JSON.stringify({ build, at: builtAt })}\n`);
rmSync(join(dist, 'assets'), { recursive: true, force: true });
console.log(`inlined ${inlinedJs} script(s) and ${inlinedCss} stylesheet(s) into ${htmlPath} (build ${build})`);
