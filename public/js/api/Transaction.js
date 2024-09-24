/**
 * Класс Transaction наследуется от Entity.
 * Управляет транзакциями пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
    /**
     * Устанавливаем базовый URL для работы с транзакциями
     * через API.
     */
    static URL = '/transaction';
  }
  