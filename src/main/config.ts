import YAML from 'yaml'
import fs from 'fs';
import path from 'path';
import {ConfigWrapper} from '../wrappers/config-wrapper';

// Load config from file and export as garden configuration object



const config = YAML.parse(fs.readFileSync
    (path.join(__dirname, '../../garden-config.yml'), 'utf8'));



const GardenConfig = config as ConfigWrapper;

export default GardenConfig;