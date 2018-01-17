# simpledom

A simple typescript-oriented DOM manipulation API.

```typescript
declare namespace simpledom {
    /**
     * Return the first element of type `kind` that matches `selector` from the document.
     *
     * If the first element that matches `selector` is not of type `kind`, an exception is thrown.
     *
     * @param kind the class of element to look for (HTMLCanvasElement, HTMLInputElement, etc...)
     * @param selector CSS selector to use for the search
     */
    function one<T extends Element>(kind: Constructor<T>, selector: string): T;

    /**
     * Return the first element of type `kind` that matches `selector` from the `root` node.
     *
     * If the first element that matches `selector` is not of type `kind`, an exception is thrown.
     *
     * @param kind the class of element to look for (HTMLCanvasElement, HTMLInputElement, etc...)
     * @param root the element or document subtree to search
     * @param selector CSS selector to use for the search
     */
    function oneFrom<T extends Element>(
        kind: Constructor<T>,
        root: Element | Document,
        selector: string
    ): T;

    /**
     * Return all of the elements of type `kind` that match `selector` from the `document`.
     *
     * If any of the elements that match `selector` is not of type `kind`, an exception is thrown.
     *
     * @param kind the class of element to look for (HTMLCanvasElement, HTMLInputElement, etc...)
     * @param selector CSS selector to use for the search
     */
    function all<T extends Element>(kind: Constructor<T>, selector: string): T[];

    /**
     * Return all of the elements of type `kind` that match `selector` from the provided `root` node.
     *
     * If any of the elements that match `selector` is not of type `kind`, an exception is thrown.
     *
     * @param kind the class of element to look for (HTMLCanvasElement, HTMLInputElement, etc...)
     * @param root the element or document subtree to search
     * @param selector CSS selector to use for the search
     */
    function allFrom<T extends Element>(
        kind: Constructor<T>,
        root: Element | Document,
        selector: string
    ): T[];

    /**
     * Listen for DOM events that bubble up (or capture) through `root` of type
     * `type` that are from a source within the set of subtrees that match
     * `selector`.
     *
     * @param root element that is the root of events to care about
     * @param type the event type to listen for
     * @param selector CSS selector to refine the source of events
     * @param handler the event handler
     * @param options the third parameter to addEventListener (for capture, etc...)
     * @return a function that removes the added event handler from the DOM
     */
    function on<K extends keyof ElementEventMap>(
        root: Element | Document,
        type: K,
        selector: string,
        handler: (this: Element, ev: ElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions | undefined
    ): () => void;

    /**
     * Build a DOM subtree that has a single root from an html string.
     *
     * @param html a valid HTML string
     * @param doc the owning document of the DOM subtree (defaults to `document`)
     */
    function build(html: string, doc?: Document): Element;

    /**
     * Build a DOM subtree that has any number of roots from an html string.
     *
     * @param html a valid HTML string
     * @param doc the owning document of the DOM subtree (defaults to `document`)
     */
    function buildMany(html: string, doc?: Document): DocumentFragment;
}
```
