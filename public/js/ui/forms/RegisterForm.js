class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState('user-logged')
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response && response.success) {
        // Устанавливаем состояние пользователя как залогиненного
        App.setState('user-logged');
        // Сбрасываем форму
        this.element.reset();
        // Закрываем модальное окно регистрации
        App.getModal('register').close();
      } else {
        // Обрабатываем ошибку через консоль
        console.error(err || response.error);
      }
    });
  }
}
