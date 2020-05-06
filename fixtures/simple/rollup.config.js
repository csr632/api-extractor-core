import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
// tsdoc only provide commonjs module
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "iife",
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs({
      namedExports: {
        timsort: ["sort"],
      },
    }),
  ],
  onwarn(warning, rollupWarn) {
    if (
      warning.code === "CIRCULAR_DEPENDENCY" &&
      (false ||
        // warning.cycle.some((c) => /items\/ApiItem/.test(c)) ||
        warning.cycle.some((c) => /@microsoft\/tsdoc/.test(c)) ||
        false)
    ) {
      return;
    }
    if (
      warning.code === "CIRCULAR_DEPENDENCY" &&
      (false ||
        warning.cycle.some((c) => /model\/Deserializer/.test(c)) ||
        false)
    ) {
      return;
    }
    if (
      warning.code === "CIRCULAR_DEPENDENCY" &&
      warning.cycle[0].indexOf("__index.js") >= 0 &&
      warning.cycle.length === 3
    ) {
      return;
    }
    if (
      warning.code === "CIRCULAR_DEPENDENCY" &&
      ignoreMsg.indexOf(warning.message) >= 0
    ) {
      return;
    }
    debugger;
    console.log(warning.toString());
    // rollupWarn(warning);
  },
};

const ignoreMsg = [
  "Circular dependency: ../../packages/api-extractor-model/lib/__index.js -> ../../packages/api-extractor-model/lib/mixins/ApiParameterListMixin.js -> ../../packages/api-extractor-model/lib/model/Parameter.js -> ../../packages/api-extractor-model/lib/__index.js",
  "Circular dependency: ../../packages/api-extractor-model/lib/__index.js -> ../../packages/api-extractor-model/lib/mixins/ApiTypeParameterListMixin.js -> ../../packages/api-extractor-model/lib/model/TypeParameter.js -> ../../packages/api-extractor-model/lib/__index.js",
];
