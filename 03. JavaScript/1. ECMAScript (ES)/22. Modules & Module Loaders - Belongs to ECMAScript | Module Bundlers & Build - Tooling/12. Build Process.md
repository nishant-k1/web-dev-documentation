# Build

In JavaScript, build generally refers to the process of optimizing and preparing the JavaScript code for production deployment. This involves several steps, such as:

**Transpilation** – Converting modern JavaScript (ES6+) into older versions for browser compatibility (e.g., using Babel).
**Bundling** – Combining multiple JavaScript files into a single file or smaller chunks (e.g., using Webpack, Rollup, or Parcel).
**Minification** – Removing unnecessary characters like whitespace, comments, and shortening variable names to reduce file size.
**Tree Shaking** – Eliminating unused code to optimize performance.
**Compression** – Further reducing file size using algorithms like `Gzip` or `Brotli`.

Tools like `Webpack`, `Vite`, and `Parcel` help automate this process. The build process improves performance by reducing load times and ensuring compatibility across different browsers.

## Bundling vs Build

Bundling refers to combining multiple JavaScript files into one or more optimized files to reduce HTTP requests and improve performance. This is usually done using tools like Webpack, Rollup, or Parcel.

Creating a build is a broader process that includes `bundling`, along with `transpilation` (Babel), `minification`, `tree shaking`, and other optimizations to generate a production-ready version of your project.

So, **bundling is one step in the build process**, but the build process involves more than just bundling.

## Webpack is bundler or build tool

Webpack is primarily a bundler, but it can also act as a build tool.

As a bundler, Webpack takes multiple JavaScript (and other asset) files and bundles them into one or more optimized files.
As a build tool, Webpack can handle transpilation (with Babel), minification, tree shaking, asset optimization (CSS, images), and more, making it a complete build solution when configured properly.
However, modern tools like Vite, esbuild, and Parcel are often preferred for their faster performance compared to Webpack.
