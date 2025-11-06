import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, output, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  DynamicFormComponent,
  DynamicFormConfig,
  DynamicFormService,
  DynamicSelectConfig,
} from '@olafvv/ngx-dynamic-form';
import { map, take } from 'rxjs';
import { FormModel } from '../../../models/form-model.type';
import { MoveItem } from '../../../models/move-item.model';
import {
  CATEGORY_FIELD,
  DECISION_FIELD,
  NAME_FIELD,
} from '../../../models/new-item-form.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-new-item',
  imports: [
    MatIconModule,
    DynamicFormComponent,
    MatButtonModule,
    MatBottomSheetModule,
  ],
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
  public onMobile: Signal<boolean>;

  constructor(
    private dynamicFormService: DynamicFormService,
    private categoryService: CategoryService,
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet
  ) {
    this.onMobile = toSignal(
      this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map((r) => r.matches)),
      { initialValue: false }
    );

    const categoryOptions = this.dynamicFormService.toDynamicOptionListObs(
      toObservable(this.categoryService.categories),
      (category) => category.name,
      (category) => category.id
    );

    this.formConfig = [
      [
        NAME_FIELD(),
        CATEGORY_FIELD({ options: categoryOptions } as Pick<
          DynamicSelectConfig<string>,
          'options'
        >),
        DECISION_FIELD(),
      ],
    ];

    this.formGroup = this.dynamicFormService.createFormGroup(this.formConfig);
  }

  public startAddingItem(): void {
    if (this.onMobile()) {
      this.bottomSheet
        .open(AddNewItemSheetComponent, { autoFocus: true, disableClose: true })
        .afterDismissed()
        .pipe(take(1))
        .subscribe((res: MoveItem) => {
          if (res) {
            this.newItem.emit(res);
          }
        });

      return;
    }

    this.addingItem.set(true);
  }

  public addItem() {
    const newItem = this.formGroup.value as MoveItem;
    this.newItem.emit(newItem);
    this.formGroup.reset();
    this.addingItem.set(false);
  }
}

@Component({
  imports: [DynamicFormComponent, MatBottomSheetModule, MatButtonModule],
  selector: 'add-new-item-sheet',
  templateUrl: './add-new-item-sheet.component.html',
  styles: `
    .new-item-sheet {
      padding: 1rem;
    }

    .buttons {
      display: flex;
      gap: .5rem;
      margin-top: 1rem;

      button {
        flex: 1;
      }
    }
    
    ::ng-deep .dynamic-form-row{
      margin: 8px 0;
    }
  `,
})
export class AddNewItemSheetComponent {
  public formConfig: DynamicFormConfig;
  public formGroup: FormGroup<
    FormModel<Pick<MoveItem, 'name' | 'categoryId' | 'state'>>
  >;

  constructor(
    private dynamicFormService: DynamicFormService,
    private categoryService: CategoryService,
    private bottomSheetRef: MatBottomSheetRef<AddNewItemSheetComponent>
  ) {
    const categoryOptions = this.dynamicFormService.toDynamicOptionListObs(
      toObservable(this.categoryService.categories),
      (category) => category.name,
      (category) => category.id
    );

    this.formConfig = [
      [NAME_FIELD()],
      [
        CATEGORY_FIELD({ options: categoryOptions } as Pick<
          DynamicSelectConfig<string>,
          'options'
        >),
      ],
      [DECISION_FIELD()],
    ];

    this.formGroup = this.dynamicFormService.createFormGroup(this.formConfig);
  }

  public addItem() {
    const newItem = this.formGroup.value as MoveItem;
    this.formGroup.reset();
    this.bottomSheetRef.dismiss(newItem);
  }

  public cancel() {
    this.bottomSheetRef.dismiss();
  }
}
