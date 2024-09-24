// TransactionsPage.js

class TransactionsPage {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не передан');
    }
    this.element = element;
    this.registerEvents();
  }

  update() {
    this.render(this.lastOptions);
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.remove-account')) {
        this.removeAccount();
      } else if (event.target.closest('.transaction__remove')) {
        const id = event.target.closest('.transaction__remove').dataset.id;
        this.removeTransaction(id);
      }
    });
  }

  removeAccount() {
    if (confirm('Вы действительно хотите удалить счёт?')) {
      const currentAccount = this.lastOptions.account_id;
      Account.remove({ id: currentAccount }, (err, response) => {
        if (response.success) {
          App.updateWidgets();
          App.updateForms();
          this.clear();
        }
      });
    }
  }

  removeTransaction(id) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove({ id }, (err, response) => {
        if (response.success) {
          this.update();
          App.updateWidgets();
        }
      });
    }
  }

  render(options) {
    this.lastOptions = options;
    Account.get(options.account_id, (err, response) => {
      this.renderTitle(response.data.name);
    });

    Transaction.list(options, (err, response) => {
      this.renderTransactions(response.data);
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
  }

  renderTitle(name) {
    this.element.querySelector('.content-title').textContent = name;
  }

  formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleString('ru-RU', options);
  }

  getTransactionHTML(item) {
    return `
      <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">${item.sum} ₽</div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>`;
  }

  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    
    // Используем reduce для накопления всей разметки
    const html = data.reduce((acc, item) => acc + this.getTransactionHTML(item), '');
    
  
  }
  
  
}