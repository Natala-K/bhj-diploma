// Modal.js

class Modal {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не передан');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const dismissElements = this.element.querySelectorAll('[data-dismiss="modal"]');
    dismissElements.forEach(el => {
      el.addEventListener('click', (event) => this.onClose(event));
    });
  }

  onClose(event) {
    event.preventDefault();
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.display = 'none';
  }
}
