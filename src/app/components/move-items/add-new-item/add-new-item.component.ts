import { Component, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  DynamicButtonToggles,
  DynamicFormComponent,
  DynamicFormConfig,
  DynamicFormService,
  DynamicFormValidators,
  DynamicInput,
  DynamicSelect,
} from '@olafvv/ngx-dynamic-form';
import { of } from 'rxjs';
import { FormModel } from '../../../models/form-model.type';
import { MoveItem } from '../../../models/move-item.model';
import { MOVE_DECISIONS } from '../../../models/move-state.enum';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-new-item',
  imports: [MatIconModule, DynamicFormComponent, MatButtonModule],
  templateUrl: './add-new-item.component.html',
  styleUrl: './add-new-item.component.scss',
})
export class AddNewItemComponent {
  public newItem = output<MoveItem>();

  public addingItem = signal(false);

  public formConfig: DynamicFormConfig;
  public formGroup: FormGroup<
    FormModel<Pick<MoveItem, 'name' | 'categoryId' | 'state'>>
  >;

  constructor(
    private dynamicFormService: DynamicFormService,
    private categoryService: CategoryService
  ) {
    this.formConfig = [
      [
        new DynamicInput({
          inputType: 'text',
          name: 'name',
          label: 'Item name',
          validators: [DynamicFormValidators.required('Item name is required')],
        }),
        new DynamicSelect({
          name: 'categoryId',
          label: 'Category',
          options: this.dynamicFormService.toDynamicOptionListObs(
            toObservable(this.categoryService.categories),
            (category) => category.name,
            (category) => category.id
          ),
          validators: [DynamicFormValidators.required('Category is required')],
        }),
        new DynamicButtonToggles({
          name: 'state',
          options: this.dynamicFormService.toDynamicOptionListObs(
            of(MOVE_DECISIONS),
            (decision) => decision.label,
            (decision) => decision.value
          ),
        }),
      ],
    ];
    this.formGroup = this.dynamicFormService.createFormGroup(this.formConfig);
  }

  public startAddingItem(): void {
    this.addingItem.set(true);
  }

  public addItem() {
    const newItem = this.formGroup.value as MoveItem;
    this.newItem.emit(newItem);
    this.formGroup.reset();
    this.addingItem.set(false);
  }
}
