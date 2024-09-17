// AccountsWidget.js

class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не передан');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    this.element.querySelector('.create-account').addEventListener('click', () => {
      App.getModal('createAccount').open();
    });

    this.element.addEventListener('click', (event) => {
      const accountEl = event.target.closest('.account');
      if (accountEl) {
        this.onSelectAccount(accountEl);
      }
    });
  }

  update() {
    const user = User.current();
    if (user) {
      Account.list({}, (err, response) => {
        if (response && response.success) {  // Сначала проверяем наличие response, а потом его свойства success
          this.clear();
          response.data.forEach(account => this.renderItem(account));
        }
      });
    }
  }

  clear() {
    this.element.querySelectorAll('.account').forEach(el => el.remove());
  }

  onSelectAccount(element) {
    this.element.querySelectorAll('.account').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    App.showPage('transactions', { account_id: element.dataset.id });
  }

  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
        </a>
      </li>`;
  }

  renderItem(data) {
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }
}