class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не передан в TransactionsWidget');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * соответствующего окна
   * */
  registerEvents() {
    const incomeButton = this.element.querySelector('.create-income-button');
    const expenseButton = this.element.querySelector('.create-expense-button');

    // Открытие модального окна "Новый доход"
    incomeButton.addEventListener('click', () => {
      const modal = App.getModal('newIncome');
      modal.open();
    });

    // Открытие модального окна "Новый расход"
    expenseButton.addEventListener('click', () => {
      const modal = App.getModal('newExpense');
      modal.open();
    });
  }
}

