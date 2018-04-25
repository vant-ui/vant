## Loading

### Install
``` javascript
import { Loading } from 'vant';

Vue.use(Loading);
```

### Usage

#### Circular

```html
<van-loading color="black" />
<van-loading color="white" />
```

#### Spinner

```html
<van-loading type="spinner" color="black" />
<van-loading type="spinner" color="white" />
```

### API

| Attribute | Description | Type | Default | Accepted Values |
|-----------|-----------|-----------|-------------|-------------|
| color | Color | `String` | `black` | `black` `white` |
| type | Type | `String` | `circular` | `spinner` |
| size | Size | `String` | `30px` | - |
