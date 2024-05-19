const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const esbuild = require('esbuild');


const functionsDir = path.join(__dirname, 'functions');
const functions = fs.readdirSync(functionsDir).filter(file => fs.statSync(path.join(functionsDir, file)).isDirectory());

functions.forEach((func) => {
    const funcSrcDir = path.join(functionsDir, func);
    const entryFile = path.join(funcSrcDir, 'index.ts');
    const outFile = path.join(funcSrcDir, 'build', 'index.js');

    console.log(`Building function: ${func}`);
    execSync('npm install', { cwd: funcSrcDir, stdio: 'inherit' });

    esbuild.buildSync({
        entryPoints: [entryFile],
        bundle: true,
        platform: 'node',
        target: 'node18',
        outfile: outFile,
        external: ['aws-sdk'], // Exclude AWS SDK since it's included in the Lambda runtime
    });

});

console.log('Build complete');
