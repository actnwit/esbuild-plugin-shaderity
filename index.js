const requireFile = require("shaderity-node").requireFile;
const getShaderStage = require("shaderity-node").shaderStage;
const path = require('path');
const fs = require('fs');
module.exports = options => {
  return {
    name: 'shaderity',
    setup (build) {
      build.onResolve({ filter: /\.(glsl|vs|fs|vert|frag|wgsl)$/ }, (args) => {
        return {
          path: path.resolve(args.resolveDir, args.path),
          namespace: 'shaderity'
        }
      });
      build.onLoad({ filter: /.*/, namespace: 'shaderity' }, (args) => {
        const source = fs.readFileSync(args.path, 'utf-8')
        const code = requireFile(source, args.path)
        const shaderStage = getShaderStage(args.path)
        const isFragmentShader = shaderStage === 'fragment'

        const json = {
          code,
          shaderStage,
          isFragmentShader,
        };

        return {
          contents: JSON.stringify(json),
          loader: 'json'
        }
      });
    }
  }
}
