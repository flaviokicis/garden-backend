import YAML from 'yaml'
import fs from 'fs';
import path from 'path';

// Load config from file
/*
OBS: 
Because this is a variable, this should be named 'gardenConfig'
But this variable is unique and will be exported as a global config across the software
*/
const GardenConfig = YAML.parse(fs.readFileSync
    (path.join(__dirname, '../../garden-config.yml'), 'utf8'));

export default GardenConfig;