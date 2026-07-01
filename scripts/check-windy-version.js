import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION_FILE_PATH = path.join(__dirname, 'windy-embed-version.json');
const SNAPSHOT_FILE_PATH = path.join(__dirname, 'windy-embed-snapshot.js');

async function checkVersion() {
  try {
    console.log('Fetching Windy embed page...');
    const response = await fetch('https://embed.windy.com/embed.html');
    if (!response.ok) {
      throw new Error(`Failed to fetch Windy embed page: ${response.statusText}`);
    }
    const html = await response.text();

    // Parse W variable parameters: W={version:"41.1.0",encodedVersion:"...",assets:"41.1.0.emb.f2a8",target:"embed2",build:"2026-04-14, 10:37"...}
    const versionMatch = html.match(/version:\s*"([^"]+)"/);
    const assetsMatch = html.match(/assets:\s*"([^"]+)"/);
    const buildMatch = html.match(/build:\s*"([^"]+)"/);

    if (!versionMatch || !assetsMatch || !buildMatch) {
      throw new Error('Could not parse Windy version variables from embed.html');
    }

    const onlineVersion = versionMatch[1];
    const onlineAssets = assetsMatch[1];
    const onlineBuild = buildMatch[1];

    console.log(`Online Windy Embed Version: ${onlineVersion}`);
    console.log(`Online Assets Path: ${onlineAssets}`);
    console.log(`Online Build Date: ${onlineBuild}`);

    let currentMetadata = { version: '', assets: '', build: '' };
    if (fs.existsSync(VERSION_FILE_PATH)) {
      currentMetadata = JSON.parse(fs.readFileSync(VERSION_FILE_PATH, 'utf8'));
    }

    const isNewVersion = onlineVersion !== currentMetadata.version || onlineAssets !== currentMetadata.assets;
    const snapshotMissing = !fs.existsSync(SNAPSHOT_FILE_PATH);

    if (isNewVersion || snapshotMissing) {
      console.log('New version or missing snapshot detected. Downloading Windy embed script...');
      const scriptUrl = `https://embed.windy.com/v/${onlineAssets}/embed2.js`;
      const scriptResponse = await fetch(scriptUrl);
      if (!scriptResponse.ok) {
        throw new Error(`Failed to fetch script from ${scriptUrl}: ${scriptResponse.statusText}`);
      }
      const scriptCode = await scriptResponse.text();

      // Write script code to snapshot file
      fs.writeFileSync(SNAPSHOT_FILE_PATH, scriptCode, 'utf8');

      // Write updated version metadata
      const updatedMetadata = {
        version: onlineVersion,
        assets: onlineAssets,
        build: onlineBuild,
      };
      fs.writeFileSync(VERSION_FILE_PATH, JSON.stringify(updatedMetadata, null, 2) + '\n', 'utf8');

      console.log('Windy embed script downloaded and metadata updated.');
      console.log(`Outputs: updated=true, version=${onlineVersion}, assets=${onlineAssets}, build=${onlineBuild}`);
      if (process.env.GITHUB_OUTPUT) {
        fs.appendFileSync(
          process.env.GITHUB_OUTPUT,
          `updated=true\nversion=${onlineVersion}\nassets=${onlineAssets}\nbuild=${onlineBuild}\n`,
        );
      }
    } else {
      console.log('No updates found. Local Windy embed version is up to date.');
      console.log('Outputs: updated=false');
      if (process.env.GITHUB_OUTPUT) {
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `updated=false\n`);
      }
    }
  } catch (error) {
    console.error('Error checking Windy version:', error);
    process.exit(1);
  }
}

checkVersion();
