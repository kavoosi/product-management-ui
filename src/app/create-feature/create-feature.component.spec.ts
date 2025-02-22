import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFeatureComponent } from './create-feature.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CreateFeatureComponent', () => {
  let component: CreateFeatureComponent;
  let fixture: ComponentFixture<CreateFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFeatureComponent, FormsModule],
      declarations: [CreateFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message for invalid target completion date', () => {
    const targetCompletionDateInput: HTMLInputElement = fixture.debugElement.query(By.css('[name="targetCompletionDate"]')).nativeElement;
    targetCompletionDateInput.value = '2035-01-01'; // Invalid date
    targetCompletionDateInput.dispatchEvent(new Event('input'));
    targetCompletionDateInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('[name="targetCompletionDate"] + .text-danger'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('Date must be between 1940 and 2030.');
  });

  it('should disable create button when form is invalid', () => {
    const targetCompletionDateInput: HTMLInputElement = fixture.debugElement.query(By.css('[name="targetCompletionDate"]')).nativeElement;
    targetCompletionDateInput.value = '2035-01-01'; // Invalid date
    targetCompletionDateInput.dispatchEvent(new Event('input'));
    targetCompletionDateInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const createButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(createButton.disabled).toBeTruthy();
  });

  it('should call onSubmit method when create button is clicked', () => {
    spyOn(component, 'onSubmit');
    component.feature = {
      title: 'Test Feature',
      description: 'Test Description',
      estimatedComplexity: 'M',
      status: 'New',
      targetCompletionDate: new Date('2025-01-01'),
      actualCompletionDate: new Date('2025-01-15'),
    };
    fixture.detectChanges();

    const createButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    createButton.click();
    expect(component.onSubmit).toHaveBeenCalled(); // Correct usage
  });

  it('should call onCancel method when cancel button is clicked', () => {
    spyOn(component, 'onCancel');
    const cancelButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="button"].btn-secondary')).nativeElement;
    cancelButton.click();
    expect(component.onCancel).toHaveBeenCalled(); // Correct usage
  });
});