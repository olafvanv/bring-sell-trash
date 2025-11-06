import {
  DynamicButtonToggles,
  DynamicFormFieldConfig,
  DynamicFormFieldModel,
  DynamicFormValidators,
  DynamicInput,
  DynamicSelect,
  DynamicSelectConfig,
} from '@olafvv/ngx-dynamic-form';
import { MOVE_DECISIONS } from './move-state.enum';

type DynamicFormFieldGetter<T = DynamicFormFieldConfig> = (
  ops?: T
) => DynamicFormFieldModel;

export const NAME_FIELD: DynamicFormFieldGetter = () =>
  new DynamicInput({
    inputType: 'text',
    name: 'name',
    label: 'Item name',
    validators: [DynamicFormValidators.required('Item name is required')],
  });

export const CATEGORY_FIELD: DynamicFormFieldGetter<
  Pick<DynamicSelectConfig<string>, 'options'>
> = (ops) =>
  new DynamicSelect({
    name: 'categoryId',
    label: 'Category',
    options: ops?.options,
    validators: [DynamicFormValidators.required('Category is required')],
  });

export const DECISION_FIELD: DynamicFormFieldGetter = () =>
  new DynamicButtonToggles({
    name: 'state',
    options: MOVE_DECISIONS,
    validators: [DynamicFormValidators.required('Decision is required')],
  });
