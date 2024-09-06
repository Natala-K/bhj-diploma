// AsyncForm.js

class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не передан');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(options) {
    // Переопределяется в наследниках
  }

  submit() {
    this.onSubmit(this.getData());
  }
}