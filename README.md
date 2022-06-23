# Progerplace frontend initializer

Инициализация приложений vue на странице.

## Установка

    npm install -S pp-frontend-initializer

## Использование

### Vue 3

```js
import Initializer from "pp-frontend-initializer/vue3";
import {createApp} from "vue";
import store from "./store";

const initializer = new Initializer(createApp, (app) => {
    app.use(store);
});

initializer.initByDataComponentName([
    Component1,
    Component2
]);

fi.initInline([
    ModalComponent1,
    ModalComponent2
]);
```

При инициализации с существующим элементом DOM data-атрибуты элемента доступны в поле `$options.dataset`

### Vue 2

```js
import Initializer from "pp-frontend-initializer/vue2";
import Vue from "vue";
import store from "./store";

const initializerelds = {
    store,
    someField: ''
}
const initializer = new Initializer(Vue, fields);

initializer.initByDataComponentName([
    Component1,
    Component2
]);

initializer.initInline([
    ModalComponent1,
    ModalComponent2
]);
```

При инициализации с существующим элементом DOM data-атрибуты элемента доступны в поле `$options.dataset`