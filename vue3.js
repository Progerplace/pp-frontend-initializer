export default function build(createApp, initCallback = null) {
    let counter = -1;
    const idStr = 'kvazar_vue_initializer_elem';

    function initBySelector(Component, selector) {
        document.querySelectorAll(selector).forEach(elem => {
            const id = getId();
            elem.setAttribute('id', id);
            Component.dataset = elem.dataset;

            initComponent(Component, id);
        });
    }

    function initComponent(Component, id) {
        const app = createApp(Component);

        if (initCallback) {
            initCallback(app);
        }

        app.mount(`#${id}`);
    }

    function getId() {
        counter++;

        return `${idStr}_${counter}`;
    }

    function camelCaseToKebab(str) {
        return str.replace(/[A-Z]/g, (letter, index) => {
            return index === 0 ? letter.toLowerCase() : '-' + letter.toLowerCase();
        });
    }

    function argsToArray(args) {
        return Array.isArray(args)
            ? args
            : [args];
    }

    return {
        /**
         * Компонент будет инициализирован для всех элементов [data-component="название компонента в kebab"]
         * Для каждого элемента будет добавлен id (используется в качестве селектора для инициализации)
         *
         * @param {Object|Object[]} Components
         */
        initByDataComponentName(Components) {
            const items = argsToArray(Components);

            for (const Component of items) {
                if (!Component.name) {
                    console.error('Отсутствует поле name');

                    continue;
                }

                const name = camelCaseToKebab(Component.name);
                const selector = `[data-component="${name}"]`;

                initBySelector(Component, selector);
            }
        },

        /**
         * В конец body будет добавлен элемент с уникальным id. Id будет использован как селектор для инициализации.
         * Подходит для инициализации модальных окон.
         *
         * @param {Object|Object[]}  Components
         */
        initInline(Components) {
            const items = argsToArray(Components);

            for (const Component of items) {
                const id = getId();

                document.querySelector('body').insertAdjacentHTML('beforeend', `<div id="${id}"></div>`);
                Component.dataset = {};

                initComponent(Component, id);
            }
        },
    }
}