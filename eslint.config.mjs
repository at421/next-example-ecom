// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
    // Add a new configuration object specifically for ignore patterns
    {
        ignores: [
            "node_modules/", // Ignore the node_modules directory
            ".next/",        // Ignore the Next.js build output directory
            "dist/",         // Common build output directory (if you use one)
            "build/",        // Another common build output directory
            "src/generated/**/*.ts", // Example: Ignore specific generated files
            "public/",       // Often public assets don't need linting
        ]
    },

    // Your existing compat configuration object
    ...compat.config({
        "extends": ['next/core-web-vitals', 'next/typescript'],
        "rules": {
            "react/no-unescaped-entities": "off"
        }
    })
];

export default eslintConfig;