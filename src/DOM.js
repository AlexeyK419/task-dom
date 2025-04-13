/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.textContent = content;
        document.body.appendChild(element);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    if (level < 1) return null;

    const createNode = (currentLevel) => {
        const node = document.createElement('div');
        node.className = `item_${currentLevel}`;

        if (currentLevel < level) {
            for (let i = 0; i < childrenCount; i++) {
                const child = createNode(currentLevel + 1);
                node.appendChild(child);
            }
        }

        return node;
    };

    return createNode(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = generateTree(2, 3);

    const replaceDivsWithSections = (node) => {
        if (node.className === 'item_2') {
            const section = document.createElement('section');
            section.className = node.className;

            while (node.firstChild) {
                section.appendChild(node.firstChild);
            }

            return section;
        }

        const children = Array.from(node.children);
        for (const child of children) {
            const replaced = replaceDivsWithSections(child);
            if (replaced !== child) {
                node.replaceChild(replaced, child);
            }
        }

        return node;
    };

    return replaceDivsWithSections(tree);
}
