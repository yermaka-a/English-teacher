const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  ...expoConfig,
  {
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "!@/components/*/index",
                "@/components/*/*",
                "!@/components/ui/*",
              ],

              message:
                "Direct import of components is prohibited. Use index.ts.",
            },
          ],
        },
      ],
    },
    ignores: ["dist/*"],
  },
]);
