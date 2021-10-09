import YAML from 'yaml'
import fs from 'fs';
import path from 'path';

// Load config from file and export as garden configuration object

const GardenConfig = YAML.parse(fs.readFileSync
    (path.join(__dirname, '../../garden-config.yml'), 'utf8'));

export default GardenConfig;