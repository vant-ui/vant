# Calendar

### Intro

Calendar component for selecting dates or date ranges.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Calendar } from 'vant';

const app = createApp();
app.use(Calendar);
```

## Usage

### Select Switch Mode

By default, all months will be displayed without showing the switch button. When there are too many months, it may affect the page's interactivity performance. You can display the year and month switching buttons by setting the `switch-mode` prop.

```html
<van-calendar v-model:show="show" switch-mode="year-month" />
```

### Select Single Date

The `confirm` event will be emitted after the date selection is completed.

```html
<van-cell title="Select Single Date" :value="date" @click="show = true" />
<van-calendar v-model:show="show" @confirm="onConfirm" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const date = ref('');
    const show = ref(false);

    const formatDate = (date) => {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };
    const onConfirm = (value) => {
      show.value = false;
      date.value = formatDate(value);
    };

    return {
      date,
      show,
      onConfirm,
    };
  },
};
```

### Select Multiple Date

```html
<van-cell title="Select Multiple Date" :value="text" @click="show = true" />
<van-calendar v-model:show="show" type="multiple" @confirm="onConfirm" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const text = ref('');
    const show = ref(false);

    const onConfirm = (dates) => {
      show.value = false;
      text.value = `${dates.length} dates selected`;
    };

    return {
      text,
      show,
      onConfirm,
    };
  },
};
```

### Select Date Range

You can select a date range after setting `type` to`range`. In range mode, the date returned by the `confirm` event is an array, the first item in the array is the start time and the second item is the end time.

```html
<van-cell title="Select Date Range" :value="date" @click="show = true" />
<van-calendar v-model:show="show" type="range" @confirm="onConfirm" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const date = ref('');
    const show = ref(false);

    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (values) => {
      const [start, end] = values;
      show.value = false;
      date.value = `${formatDate(start)} - ${formatDate(end)}`;
    };

    return {
      date,
      show,
      onConfirm,
    };
  },
};
```

### Quick Select

Set `show-confirm` to `false` to hide the confirm button. In this case, the `confirm` event will be emitted immediately after the selection is completed.

```html
<van-calendar v-model:show="show" :show-confirm="false" />
```

### Custom Color

Use `color` prop to custom calendar color.

```html
<van-calendar v-model:show="show" color="#ee0a24" />
```

### Custom Date Range

Use `min-date` and `max-date` to custom date range.

```html
<van-calendar v-model:show="show" :min-date="minDate" :max-date="maxDate" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);

    return {
      show,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2010, 0, 31),
    };
  },
};
```

### Custom Confirm Text

Use `confirm-text` and `confirm-disabled-text` to custom confirm text.

```html
<van-calendar
  v-model:show="show"
  type="range"
  confirm-text="OK"
  confirm-disabled-text="Select End Time"
/>
```

### Custom Day Text

Use `formatter` to custom day text.

```html
<van-calendar v-model:show="show" type="range" :formatter="formatter" />
```

```js
export default {
  setup() {
    const formatter = (day) => {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();

      if (month === 5) {
        if (date === 1) {
          day.topInfo = 'Labor Day';
        } else if (date === 4) {
          day.topInfo = 'Youth Day';
        } else if (date === 11) {
          day.text = 'Today';
        }
      }

      if (day.type === 'start') {
        day.bottomInfo = 'In';
      } else if (day.type === 'end') {
        day.bottomInfo = 'Out';
      }

      return day;
    };

    return {
      formatter,
    };
  },
};
```

### Custom Position

Use `position` to custom popup position, can be set to `top`、`left`、`right`.

```html
<van-calendar v-model:show="show" :round="false" position="right" />
```

### Max Range

When selecting a date range, you can use the `max-range` prop to specify the maximum number of selectable days.

```html
<van-calendar type="range" :max-range="3" />
```

### Custom First Day Of Week

Use `first-day-of-week` to custom the start day of week

```html
<van-calendar first-day-of-week="1" />
```

### Tiled display

Set `poppable` to `false`, the calendar will be displayed directly on the page instead of appearing as a popup

```html
<van-calendar
  title="Calendar"
  :poppable="false"
  :show-confirm="false"
  :style="{ height: '500px' }"
/>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| type | Type, can be set to `range` `multiple` | _string_ | `single` |
| switch-mode `v4.9.0` | Switch mode:<br>`none` Display all months in a tiled format without switch buttons <br>`month` Support switching by month, displaying buttons for previous month/next month <br>`year-month` Support switching by year, as well as by month, displaying buttons for previous year/next year and previous month/next month | _string_ | `none` |
| title | Title of calendar | _string_ | `Calendar` |
| color | Color for the bottom button and selected date | _string_ | `#1989fa` |
| min-date | Min date | _Date_ | When `switch-mode` is set to `none`, the default value is the today |
| max-date | Max date | _Date_ | When `switch-mode` is set to `none`, the default value is six months after the today |
| default-date | Default selected date | _Date \| Date[] \| null_ | Today |
| row-height | Row height | _number \| string_ | `64` |
| formatter | Day formatter | _(day: Day) => Day_ | - |
| poppable | Whether to show the calendar inside a popup | _boolean_ | `true` |
| lazy-render | Whether to enable lazy render | _boolean_ | `true` |
| show-mark | Whether to show background month mark | _boolean_ | `true` |
| show-title | Whether to show title | _boolean_ | `true` |
| show-subtitle | Whether to show subtitle | _boolean_ | `true` |
| show-confirm | Whether to show confirm button | _boolean_ | `true` |
| readonly | Whether to be readonly | _boolean_ | `false` |
| confirm-text | Confirm button text | _string_ | `Confirm` |
| confirm-disabled-text | Confirm button text when disabled | _string_ | `Confirm` |
| first-day-of-week | Set the start day of week | _0-6_ | `0` |

### Calendar Poppable Props

Following props are supported when the poppable is true

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:show | Whether to show calendar | _boolean_ | `false` |
| position | Popup position, can be set to `top` `right` `left` | _string_ | `bottom` |
| round | Whether to show round corner | _boolean_ | `true` |
| close-on-popstate | Whether to close when popstate | _boolean_ | `true` |
| close-on-click-overlay | Whether to close when overlay is clicked | _boolean_ | `true` |
| safe-area-inset-top | Whether to enable top safe area adaptation | _boolean_ | `false` |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | _boolean_ | `true` |
| teleport | Specifies a target element where Calendar will be mounted | _string \| Element_ | - |

### Calendar Range Props

Following props are supported when the type is range

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| max-range | Number of selectable days | _number \| string_ | Unlimited |
| range-prompt | Error message when exceeded max range | _string_ | `Choose no more than xx days` |
| show-range-prompt | Whether prompt error message when exceeded max range | _boolean_ | `true` |
| allow-same-day | Whether the start and end time of the range is allowed on the same day | _boolean_ | `false` |

### Calendar Multiple Props

Following props are supported when the type is multiple

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| max-range | Max count of selectable days | _number \| string_ | Unlimited |
| range-prompt | Error message when exceeded max count | _string_ | `Choose no more than xx days` |

### Data Structure of Day

| Key | Description | Type |
| --- | --- | --- |
| date | Date | _Date_ |
| type | Type, can be set to `selected`、`start`、`middle`、`end`、`disabled`、`start-end`、`multiple-selected`、`multiple-middle`、`placeholder` | _string_ |
| text | Text | _string_ |
| topInfo | Top info | _string_ |
| bottomInfo | Bottom info | _string_ |
| className | Extra className | _string_ |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| select | Emitted when date is selected | _value: Date \| Date[]_ |
| confirm | Emitted after date selection is complete, if `show-confirm` is `true`, it is Emitted after clicking the confirm button | _value: Date \| Date[]_ |
| open | Emitted when opening Popup | - |
| close | Emitted when closing Popup | - |
| opened | Emitted when Popup is opened | - |
| closed | Emitted when Popup is closed | - |
| unselect | Emitted when unselect date when type is multiple | _value: Date_ |
| month-show | Emitted when a month enters the visible area (effective when `switch mode` is `none`) | _value: { date: Date, title: string }_ |
| over-range | Emitted when exceeded max range | - |
| click-subtitle | Emitted when clicking the subtitle | _event: MouseEvent_ |
| click-disabled-date `v4.7.0` | Emitted when clicking disabled date | _value: Date \| Date[]_ |
| click-overlay `v4.9.16` | Emitted when overlay is clicked | _event: MouseEvent_ |
| panel-change | Emitted when switching calendar panel (effective when `switch mode` is not `none`) | _{ date: Date }_ |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| title | Custom title | - |
| subtitle | Custom subtitle | _{ text: string, date?: Date }_ |
| month-title `v4.0.9` | Custom title of every month | _{ text: string, date: Date }_ |
| footer | Custom footer | - |
| confirm-text | Custom confirm text | _{ disabled: boolean }_ |
| top-info | Custom top info of day | _day: Day_ |
| bottom-info | Custom bottom info of day | _day: Day_ |
| text | Custom text of day | _day: Day_ |
| prev-month | Custom previous month button | _{ disabled: boolean }_ |
| prev-year | Custom previous year button | _{ disabled: boolean }_ |
| next-month | Custom next month button | _{ disabled: boolean }_ |
| next-year | Custom next year button | _{ disabled: boolean }_ |

### Methods

Use [ref](https://vuejs.org/guide/essentials/template-refs.html) to get Calendar instance and call instance methods.

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| reset | Reset selected date, will reset to default date when no params passed | _date?: Date \| Date[]_ | - |
| scrollToDate | Scroll to date | _date: Date_ | - |
| getSelectedDate | get selected date | - | _Date \| Date[] \| null_ |

### Types

The component exports the following type definitions:

```ts
import type {
  CalendarSwitchMode,
  CalendarType,
  CalendarProps,
  CalendarDayItem,
  CalendarDayType,
  CalendarInstance,
} from 'vant';
```

`CalendarInstance` is the type of component instance:

```ts
import { ref } from 'vue';
import type { CalendarInstance } from 'vant';

const calendarRef = ref<CalendarInstance>();

calendarRef.value?.reset();
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --van-calendar-background | _var(--van-background-2)_ | - |
| --van-calendar-popup-height | _80%_ | - |
| --van-calendar-header-shadow | _0 2px 10px rgba(125, 126, 128, 0.16)_ | - |
| --van-calendar-header-title-height | _44px_ | - |
| --van-calendar-header-title-font-size | _var(--van-font-size-lg)_ | - |
| --van-calendar-header-subtitle-font-size | _var(--van-font-size-md)_ | - |
| --van-calendar-header-action-width | _28px_ | - |
| --van-calendar-header-action-color | _var(--van-text-color)_ | - |
| --van-calendar-header-action-disabled-color | _var(--van-text-color-3)_ | - |
| --van-calendar-weekdays-height | _30px_ | - |
| --van-calendar-weekdays-font-size | _var(--van-font-size-sm)_ | - |
| --van-calendar-month-title-font-size | _var(--van-font-size-md)_ | - |
| --van-calendar-month-mark-color | _fade(var(--van-gray-2), 80%)_ | - |
| --van-calendar-month-mark-font-size | _160px_ | - |
| --van-calendar-day-height | _64px_ | - |
| --van-calendar-day-font-size | _var(--van-font-size-lg)_ | - |
| --van-calendar-day-margin-bottom | _4px_ | - |
| --van-calendar-day-disabled-color | _var(--van-text-color-3)_ | - |
| --van-calendar-range-edge-color | _var(--van-white)_ | - |
| --van-calendar-range-edge-background | _var(--van-primary-color)_ | - |
| --van-calendar-range-middle-color | _var(--van-primary-color)_ | - |
| --van-calendar-range-middle-background-opacity | _0.1_ | - |
| --van-calendar-selected-day-size | _54px_ | - |
| --van-calendar-selected-day-color | _var(--van-white)_ | - |
| --van-calendar-selected-day-background | _var(--van-primary-color)_ | - |
| --van-calendar-info-font-size | _var(--van-font-size-xs)_ | - |
| --van-calendar-info-line-height | _var(--van-line-height-xs)_ | - |
| --van-calendar-confirm-button-height | _36px_ | - |
| --van-calendar-confirm-button-margin | _7px 0_ | - |

## FAQ

### How to use asynchronously returned data in the 'formatter'?

If you need to use asynchronously returned data in a 'formatter', you can dynamically create a 'formatter' function using computed properties, as shown in the following example:

```js
const asyncData = ref();

const formatter = computed(() => {
  if (!asyncData.value) {
    return (day) => day;
  }
  return (day) => {
    day.bottomInfo = asyncData.value;
    return day;
  };
});

setTimeout(() => {
  asyncData.value = 'text';
}, 3000);
```

### Failed to initialize components on iOS system?

If you encounter an issue where components cannot be rendered on iOS, please confirm that you did not use the `new Date ('2020-01-01')` notation when creating the Date object. iOS does not support date formats separated by a dash. The correct notation is `new Date ('2020/01/01')`.

Detailed explanation of this issue: [stackoverflow](https://stackoverflow.com/questions/13363673/javascript-date-is-invalid-on-ios).

Alternatively, you should adopt a more compatible writing style across different systems and browsers: `new Date (2020, 0, 1)`, but it should be noted that the month starts from 0.
