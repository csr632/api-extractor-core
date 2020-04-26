import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
// tsdoc only provide commonjs module
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [typescript(), resolve(), commonjs()],
  external: ["@microsoft/tsdoc", "@rushstack/node-core-library"],
  onwarn(warning, rollupWarn) {
    if (
      warning.code === "CIRCULAR_DEPENDENCY" &&
      warning.cycle.some((c) => /model\/Deserializer/.test(c))
    ) {
      return;
    }
    rollupWarn(warning);
  },
};
