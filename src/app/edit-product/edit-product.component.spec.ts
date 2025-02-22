import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';
import { By } from '@angular/platform-browser';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductComponent, FormsModule],
      declarations: [EditProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;

    // Initialize a sample product for testing
    component.product = {
      productId: 1,
      title: 'Test Product',
      description: 'Test Description',
      estimatedComplexity: 'Medium',
      status: 'Active',
      targetCompletionDate: new Date('2025-01-01'), // Use Date object
      actualCompletionDate: new Date('2025-01-15'), // Use Date object
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial product values in the form', () => {
    const titleInput: HTMLInputElement = fixture.debugElement.query(By.css('#title')).nativeElement;
    expect(titleInput.value).toBe('Test Product');

    const descriptionTextarea: HTMLTextAreaElement = fixture.debugElement.query(By.css('#description')).nativeElement;
    expect(descriptionTextarea.value).toBe('Test Description');

    const estimatedComplexitySelect: HTMLSelectElement = fixture.debugElement.query(By.css('#estimatedComplexity')).nativeElement;
    expect(estimatedComplexitySelect.value).toBe('Medium');

    const statusSelect: HTMLSelectElement = fixture.debugElement.query(By.css('#status')).nativeElement;
    expect(statusSelect.value).toBe('Active');

    const targetCompletionDateInput: HTMLInputElement = fixture.debugElement.query(By.css('#targetCompletionDate')).nativeElement;
    expect(targetCompletionDateInput.value).toBe('2025-01-01');

    const actualCompletionDateInput: HTMLInputElement = fixture.debugElement.query(By.css('#actualCompletionDate')).nativeElement;
    expect(actualCompletionDateInput.value).toBe('2025-01-15');
  });

  it('should display error message for invalid target completion date', () => {
    const targetCompletionDateInput: HTMLInputElement = fixture.debugElement.query(By.css('#targetCompletionDate')).nativeElement;
    targetCompletionDateInput.value = '2035-01-01'; // Invalid date
    targetCompletionDateInput.dispatchEvent(new Event('input'));
    targetCompletionDateInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('#targetCompletionDate + .text-danger'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('Date must be between 1940 and 2030.');
  });

  it('should disable save button when form is invalid', () => {
    const targetCompletionDateInput: HTMLInputElement = fixture.debugElement.query(By.css('#targetCompletionDate')).nativeElement;
    targetCompletionDateInput.value = '2035-01-01'; // Invalid date
    targetCompletionDateInput.dispatchEvent(new Event('input'));
    targetCompletionDateInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const saveButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should call saveProduct method when save button is clicked', () => {
    spyOn(component, 'saveProduct');
    const saveButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    saveButton.click();
    expect(component.saveProduct).toHaveBeenCalled();
  });

  it('should call cancelEdit method when delete button is clicked', () => {
    spyOn(component, 'cancelEdit');
    const deleteButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="button"].btn-danger')).nativeElement;
    deleteButton.click();
    expect(component.cancelEdit).toHaveBeenCalled();
  });
});