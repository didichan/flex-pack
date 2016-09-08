var fs = require('fs');
var path = require('path');
var packagePath = path.resolve('../../../package.json');
try{
var packageJson = JSON.parse(fs.readFileSync(packagePath));
}catch(e){
  console.error(e);
  process.exit();
}
var scripts = ['dev', 'build', 'test'];

if(!packageJson.scripts){
  packageJson.scripts = {};
}

for(var i of scripts){
  if(!packageJson.scripts[i]){
    packageJson.scripts[i] = 'build ' + i;
  }
}

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
