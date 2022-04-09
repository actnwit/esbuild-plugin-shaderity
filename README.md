# esbuild-plugin-shaderity

## Config

Write a node program file as following:

```javascript
// build.js
const esbuild = require('esbuild');
const shaderity  = require('esbuild-plugin-shaderity');
esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  outdir: 'dist',
  plugins: [
    shaderity(),
  ]
});
```

## Code Sample

```glsl
// simple.frag
precision mediump float;
in vec4 vColor;

void main() {
  gl_FlagColor = vColor;
}
```

```javascript
// ./src/index.js
import simpleFragmentShader from './simple.frag';

console.log(simpleFragmentShader);
```

## Build

Run the written build.js with node.

```bash
$ node build.js
```

The built file must be output to the ./dist directory.
