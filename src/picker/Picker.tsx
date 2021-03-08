import { ref, watch, computed, PropType, defineComponent } from 'vue';

// Utils
import {
  unitToPx,
  preventDefault,
  createNamespace,
  ComponentInstance,
} from '../utils';
import { BORDER_UNSET_TOP_BOTTOM } from '../utils/constant';

// Composables
import { useChildren } from '@vant/use';
import { useExpose } from '../composables/use-expose';

// Components
import Loading from '../loading';
import Column, {
  PICKER_KEY,
  PickerColumn,
  PickerOption,
  PickerObjectColumn,
  PickerObjectOption,
} from './PickerColumn';

const [name, bem, t] = createNamespace('picker');

export type PickerToolbarPosition = 'top' | 'bottom';

export type PickerFieldNames = {
  text?: string;
  values?: string;
  children?: string;
};

export type {
  PickerColumn,
  PickerOption,
  PickerObjectColumn,
  PickerObjectOption,
};

export const pickerProps = {
  title: String,
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  cancelButtonText: String,
  confirmButtonText: String,
  itemHeight: {
    type: [Number, String],
    default: 44,
  },
  showToolbar: {
    type: Boolean,
    default: true,
  },
  visibleItemCount: {
    type: [Number, String],
    default: 6,
  },
  swipeDuration: {
    type: [Number, String],
    default: 1000,
  },
};

export default defineComponent({
  name,

  props: {
    ...pickerProps,
    columnsFieldNames: Object as PropType<PickerFieldNames>,
    columns: {
      type: Array as PropType<PickerOption[] | PickerColumn[]>,
      default: () => [],
    },
    defaultIndex: {
      type: [Number, String],
      default: 0,
    },
    toolbarPosition: {
      type: String as PropType<PickerToolbarPosition>,
      default: 'top',
    },
    // @deprecated
    // should be removed in next major version
    valueKey: {
      type: String,
      default: 'text',
    },
  },

  emits: ['confirm', 'cancel', 'change'],

  setup(props, { emit, slots }) {
    const formattedColumns = ref<PickerObjectColumn[]>([]);

    const { text: textKey, values: valuesKey, children: childrenKey } = {
      // compatible with valueKey prop
      text: props.valueKey,
      values: 'values',
      children: 'children',
      ...props.columnsFieldNames,
    };

    const { children, linkChildren } = useChildren<ComponentInstance>(
      PICKER_KEY
    );

    linkChildren();

    const itemHeight = computed(() => unitToPx(props.itemHeight));

    const dataType = computed(() => {
      const firstColumn = props.columns[0];
      if (firstColumn && typeof firstColumn !== 'string') {
        if (childrenKey in firstColumn) {
          return 'cascade';
        }
        if (valuesKey in firstColumn) {
          return 'object';
        }
      }
      return 'plain';
    });

    const formatCascade = () => {
      const formatted: PickerObjectColumn[] = [];

      let cursor: PickerObjectColumn = {
        [childrenKey]: props.columns,
      };

      while (cursor && cursor[childrenKey]) {
        const children = cursor[childrenKey];
        let defaultIndex = cursor.defaultIndex ?? +props.defaultIndex;

        while (children[defaultIndex] && children[defaultIndex].disabled) {
          if (defaultIndex < children.length - 1) {
            defaultIndex++;
          } else {
            defaultIndex = 0;
            break;
          }
        }

        formatted.push({
          [valuesKey]: cursor[childrenKey],
          className: cursor.className,
          defaultIndex,
        });

        cursor = children[defaultIndex];
      }

      formattedColumns.value = formatted;
    };

    const format = () => {
      const { columns } = props;

      if (dataType.value === 'plain') {
        formattedColumns.value = [{ [valuesKey]: columns }];
      } else if (dataType.value === 'cascade') {
        formatCascade();
      } else {
        formattedColumns.value = columns as PickerObjectColumn[];
      }
    };

    // get indexes of all columns
    const getIndexes = () => children.map((child) => child.state.index);

    // set options of column by index
    const setColumnValues = (index: number, options: PickerOption[]) => {
      const column = children[index];
      if (column) {
        column.setOptions(options);
      }
    };

    const onCascadeChange = (columnIndex: number) => {
      let cursor: PickerObjectColumn = {
        [childrenKey]: props.columns,
      };
      const indexes = getIndexes();

      for (let i = 0; i <= columnIndex; i++) {
        cursor = cursor[childrenKey][indexes[i]];
      }

      while (cursor && cursor[childrenKey]) {
        columnIndex++;
        setColumnValues(columnIndex, cursor[childrenKey]);
        cursor = cursor[childrenKey][cursor.defaultIndex || 0];
      }
    };

    // get column instance by index
    const getChild = (index: number) => children[index];

    // get column value by index
    const getColumnValue = (index: number) => {
      const column = getChild(index);
      if (column) {
        return column.getValue();
      }
    };

    // set column value by index
    const setColumnValue = (index: number, value: string) => {
      const column = getChild(index);
      if (column) {
        column.setValue(value);
        if (dataType.value === 'cascade') {
          onCascadeChange(index);
        }
      }
    };

    // get column option index by column index
    const getColumnIndex = (index: number) => {
      const column = getChild(index);
      if (column) {
        return column.state.index;
      }
    };

    // set column option index by column index
    const setColumnIndex = (columnIndex: number, optionIndex: number) => {
      const column = getChild(columnIndex);
      if (column) {
        column.setIndex(optionIndex);
        if (dataType.value === 'cascade') {
          onCascadeChange(columnIndex);
        }
      }
    };

    // get options of column by index
    const getColumnValues = (index: number) => {
      const column = getChild(index);
      if (column) {
        return column.state.options;
      }
    };

    // get values of all columns
    const getValues = () => children.map((child) => child.getValue());

    // set values of all columns
    const setValues = (values: string[]) => {
      values.forEach((value, index) => {
        setColumnValue(index, value);
      });
    };

    // set indexes of all columns
    const setIndexes = (indexes: number[]) => {
      indexes.forEach((optionIndex, columnIndex) => {
        setColumnIndex(columnIndex, optionIndex);
      });
    };

    const emitAction = (event: 'confirm' | 'cancel') => {
      if (dataType.value === 'plain') {
        emit(event, getColumnValue(0), getColumnIndex(0));
      } else {
        emit(event, getValues(), getIndexes());
      }
    };

    const onChange = (columnIndex: number) => {
      if (dataType.value === 'cascade') {
        onCascadeChange(columnIndex);
      }

      if (dataType.value === 'plain') {
        emit('change', getColumnValue(0), getColumnIndex(0));
      } else {
        emit('change', getValues(), columnIndex);
      }
    };

    const confirm = () => {
      children.forEach((child) => child.stopMomentum());
      emitAction('confirm');
    };

    const cancel = () => emitAction('cancel');

    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props.title) {
        return <div class={[bem('title'), 'van-ellipsis']}>{props.title}</div>;
      }
    };

    const renderCancel = () => {
      const text = props.cancelButtonText || t('cancel');
      return (
        <button type="button" class={bem('cancel')} onClick={cancel}>
          {slots.cancel ? slots.cancel() : text}
        </button>
      );
    };

    const renderConfirm = () => {
      const text = props.confirmButtonText || t('confirm');
      return (
        <button type="button" class={bem('confirm')} onClick={confirm}>
          {slots.confirm ? slots.confirm() : text}
        </button>
      );
    };

    const renderToolbar = () => {
      if (props.showToolbar) {
        return (
          <div class={bem('toolbar')}>
            {slots.default
              ? slots.default()
              : [renderCancel(), renderTitle(), renderConfirm()]}
          </div>
        );
      }
    };

    const renderColumnItems = () =>
      formattedColumns.value.map((item, columnIndex) => (
        <Column
          v-slots={{ option: slots.option }}
          textKey={textKey}
          readonly={props.readonly}
          allowHtml={props.allowHtml}
          className={item.className}
          itemHeight={itemHeight.value}
          defaultIndex={item.defaultIndex ?? +props.defaultIndex}
          swipeDuration={props.swipeDuration}
          initialOptions={item[valuesKey]}
          visibleItemCount={props.visibleItemCount}
          onChange={() => onChange(columnIndex)}
        />
      ));

    const renderColumns = () => {
      const wrapHeight = itemHeight.value * +props.visibleItemCount;
      const frameStyle = { height: `${itemHeight.value}px` };
      const columnsStyle = { height: `${wrapHeight}px` };
      const maskStyle = {
        backgroundSize: `100% ${(wrapHeight - itemHeight.value) / 2}px`,
      };

      return (
        <div
          class={bem('columns')}
          style={columnsStyle}
          onTouchmove={preventDefault}
        >
          {renderColumnItems()}
          <div class={bem('mask')} style={maskStyle} />
          <div
            class={[BORDER_UNSET_TOP_BOTTOM, bem('frame')]}
            style={frameStyle}
          />
        </div>
      );
    };

    watch(() => props.columns, format, { immediate: true });

    useExpose({
      confirm,
      getValues,
      setValues,
      getIndexes,
      setIndexes,
      getColumnIndex,
      setColumnIndex,
      getColumnValue,
      setColumnValue,
      getColumnValues,
      setColumnValues,
    });

    return () => (
      <div class={bem()}>
        {props.toolbarPosition === 'top' ? renderToolbar() : null}
        {props.loading ? <Loading class={bem('loading')} /> : null}
        {slots['columns-top']?.()}
        {renderColumns()}
        {slots['columns-bottom']?.()}
        {props.toolbarPosition === 'bottom' ? renderToolbar() : null}
      </div>
    );
  },
});
