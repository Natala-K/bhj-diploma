// RegisterForm.js

/**
 * Класс RegisterForm управляет формой регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response && response.success) {
        // Сбрасываем форму
        this.element.reset();
        // Устанавливаем состояние приложения
        App.setState('user-logged');
        // Закрываем окно с формой
        const modalElement = this.element.closest('.modal');
        if (modalElement) {
          Modal.close(modalElement.dataset.modalId);
        }
      } else {
        // Обрабатываем ошибки (например, выводим сообщение об ошибке)
        alert(response.error);
      }
    });
  }
}
