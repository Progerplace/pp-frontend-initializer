function build(Vue, componentFields = {}) {
    let counter = -1;
    const idStr = 'kvazar_vue_initializer_elem_';

    /**
     * @param Component
     * @param dataset
     * @returns {Vue} инстанс компонента
     */
    function initComponent(Component, dataset = {}) {
        Component = Object.assign(Component, componentFields, {dataset});

        return new Vue(Component);
    }

    function getId() {
        counter++;

        return `${idStr}${counter}`;
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
         * Селектором для инициализации будет [data-component="название компонента в kebab"]
         *
         * @param {Object|Object[]} Components
         * @returns {Object} ключи - названия компонента, значения - массив инстансов компонента
         */
        initByDataComponentName(Components) {
            let res = {};
            const items = argsToArray(Components);

            for (const Item of items) {
                if (!Item.name) {
                    console.Error('Отсутствует поле name');
                }

                const name = camelCaseToKebab(Item.name);
                const selector = `[data-component="${name}"]`;

                res[Item.name] = this.initBySelector(selector, Item);
            }

            return res;
        },

        /**
         * В конец body будет добавлен элемент с уникальным id. Id будет использован как селектор для инициализации.
         * Подходит для инициализации модальных окон.
         *
         * @param {Object|Object[]}  Components
         * @returns {Vue[]} инстансы компонента
         */
        initInline(Components) {
            let res = [];
            const items = argsToArray(Components);

            for (const Item of items) {
                const id = getId();

                document.querySelector('body').insertAdjacentHTML('beforeend', `<div id="${id}"></div>`);
                Item.el = `#${id}`;
                Item.dataset = {};
                const component = initComponent(Item);
                res.push(component);
            }

            return res;
        },

        /**
         *
         * @param selector
         * @param Component
         * @returns {Vue[]} массив инстансов компонента
         */
        initBySelector(selector, Component) {
            let res = [];

            document.querySelectorAll(selector).forEach(elem => {
                const id = getId();
                elem.setAttribute('id', id);
                Component.el = `#${id}`;
                Component.dataset = elem.dataset;
                const component = initComponent(Component, {...elem.dataset});
                res.push(component);
            });

            return res;
        },
    }
}


export default build;