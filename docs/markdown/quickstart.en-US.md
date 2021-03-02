# Quickstart

## Install

### npm

```bash
# Install Vant 2 for Vue 2 project
npm i vant -S

# Install Vant 3 for Vue 3 project
npm i vant@next -S
```

### CDN

The easiest way to use Vant is to include a CDN link in the html file, after which you can access all components via the global variable `vant`.

```html
<!-- import style -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/vant@next/lib/index.css"
/>

<!-- import script -->
<script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
<script src="https://cdn.jsdelivr.net/npm/vant@next/lib/vant.min.js"></script>

<script>
  // Render the Button component
  const app = Vue.createApp({
    template: `<van-button>Button</van-button>`,
  });
  app.use(vant);

  // Register Lazyload directive
  app.use(vant.Lazyload);

  // Call function component
  vant.Toast('Message');

  app.mount('#app');
</script>
```

### CLI

We recommend to use [Vue Cli](https://cli.vuejs.org/) to create a new project.

```bash
# Install Vue Cli
npm install -g @vue/cli

# Create a project
vue create hello-world

# Open GUI
vue ui
```

![](https://img01.yzcdn.cn/vant/vue-cli-demo-201809030812.png)

In the GUI, click on 'Dependencies' -> `Install Dependencies` and add `vant` to the dependencies.

## Usage

### 1. Import on demand

Use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) to import components on demand.

```bash
# Install plugin
npm i babel-plugin-import -D
```

Set babel config in .babelrc or babel-loader:

```json
// Note: Don't set libraryDirectory if you are using webpack 1.
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```

```js
// For users who use babel7, that can be configured in babel.config.js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
  ],
};
```

Then you can import components from vant:

```js
import { Button } from 'vant';
```

#### Vite Plugin

If you are using Vite, please use [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) or [vite-plugin-imp](https://github.com/onebay/vite-plugin-imp) instead.

#### TypeScript Plugin

If you are using TypeScript，please use [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) instead.

### 2. Manually import

```js
import Button from 'vant/lib/button';
import 'vant/lib/button/style';
```

### 3. Import all components

```js
import { createApp } from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp();
app.use(Vant);
```

> If you configured babel-plugin-import, you won't be allowed to import all components.
