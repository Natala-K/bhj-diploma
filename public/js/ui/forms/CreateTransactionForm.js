class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list({}, (err, response) => {
      if (response && response.success && response.data.length > 0) {
        const select = this.element.querySelector('select[name="account_id"]');
        select.innerHTML = ''; // Очищаем старые опции
  
        response.data.forEach(account => {
          const option = document.createElement('option');
          option.value = account.id;
          option.textContent = account.name;
          select.appendChild(option);
        });
      } else {
        console.error('Ошибка при загрузке счетов или нет доступных счетов', err);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();  // Сброс формы
        App.update();  // Обновление интерфейса
        const modal = App.getModal(this.element.dataset.modalId);  // Получение модального окна по ID
        modal.close();  // Закрытие модального окна
      } else {
        console.error('Ошибка при создании транзакции', err);
      }
    });
  }
}
