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
    rollupWarn(warning);
  },
};
