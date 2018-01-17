export type Constructor<T> = Function & { new(...args: any[]): T, prototype: T };

function isConstructedBy<T>(instance: any, klass: Constructor<T>): instance is T {
    return instance instanceof klass;
}

function allAre<V>(instanceArray: any[], typeCheck: (t: any, v: Constructor<V>) => t is V, thing: Constructor<V>): instanceArray is V[] {
    for (let instance of instanceArray) {
        if (!typeCheck(instance, thing)) {
            return false;
        }
    }
    return true;
}

export class SimpleDOMError extends Error {}
export class NotFound extends SimpleDOMError {}
export class TypeMismatch extends SimpleDOMError {}

/**
 * Return the first element of type `kind` that matches `selector` from the document.
 * 
 * If the first element that matches `selector` is not of type `kind`, an exception is thrown.
 * 
 * @param kind the class of element to look for (HTMLCanvasElement, HTMLInputElement, etc...)
 * @param selector CSS selector to use for the search
 */
export function one<T extends Element>(kind: Constructor<T>, selector: string): T {
    return oneFrom(document, kind, selector);
}

/**
 * Return the first element of type `kind` that matches `selector` from the `root` node.
 * 
 * If the first element that matches `selector` is not of type `kind`, an exception is thrown.
 * 
 * @param root the element or document subtree to search
 * @param kind the class of element to look for (HTMLCanvasElement, HTMLInputElement, etc...)
 * @param selector CSS selector to use for the search
 */
export function oneFrom<T extends Element>(root: Element | Document, kind: Constructor<T>, selector: string): T {
    var el = root.querySelector(selector);
    if (el === null) {
        throw new NotFound(`Selector "${selector}" not found`);
    }
    if (!isConstructedBy(el, kind)) {
        throw new TypeMismatch(`Element at selector "${selector}" is not a ${kind.name}`);
    }
    return el;
}

/**
 * Return all of the elements of type `kind` that match `selector` from the `document`.
 * 
 * If any of the elements that match `selector` is not of type `kind`, an exception is thrown.
 * 
 * @param kind the class of element to look for (HTMLCanvasElement, HTMLInputElement, etc...)
 * @param selector CSS selector to use for the search
 */
export function all<T extends Element>(kind: Constructor<T>, selector: string): T[] {
    return allFrom(document, kind, selector);
}

/**
 * Return all of the elements of type `kind` that match `selector` from the provided `root` node.
 * 
 * If any of the elements that match `selector` is not of type `kind`, an exception is thrown.
 * 
 * @param root the element or document subtree to search
 * @param kind the class of element to look for (HTMLCanvasElement, HTMLInputElement, etc...)
 * @param selector CSS selector to use for the search
 */
export function allFrom<T extends Element>(root: Element | Document, kind: Constructor<T>, selector: string): T[] {
    var els = Array.from(root.querySelectorAll(selector));
    if (!allAre<T>(els, isConstructedBy, kind)) {
        throw new TypeMismatch(`Element at selector "${selector}" is not a ${kind.name}`);
    }
    return els;
}

/**
 * Listen for DOM events that bubble up (or capture) through `root` of type
 * `type` that are from a source within the set of subtrees that match
 * `selector`.
 * 
 * @param root element that is the root of events to care about
 * @param type the event type to listen for
 * @param kind the class of element to look for (HTMLCanvasElement, HTMLInputElement, etc...)
 * @param selector CSS selector to refine the source of events
 * @param handler the event handler
 * @param options the third parameter to addEventListener (for capture, etc...)
 * @return a function that removes the added event handler from the DOM
 */
export function on<E extends Element, K extends keyof DocumentEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: DocumentEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof ElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: ElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof HTMLBodyElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: HTMLBodyElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof HTMLElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: HTMLElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof HTMLFrameElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: HTMLFrameElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof HTMLFrameSetElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: HTMLFrameSetElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof HTMLIFrameElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: HTMLIFrameElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof HTMLMarqueeElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: HTMLMarqueeElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof HTMLMediaElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: HTMLMediaElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof HTMLVideoElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: HTMLVideoElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof SVGElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: SVGElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof SVGSVGElementEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: SVGSVGElementEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element, K extends keyof WindowEventMap>(
    root: Element | Document,
    type: K,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: WindowEventMap[K], selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element>(
    root: Element | Document,
    type: string,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: Event, selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void;
export function on<E extends Element>(
    root: Element | Document,
    type: string,
    kind: Constructor<E>,
    selector: string,
    handler: (this: E, ev: any, selected: E) => any,
    options?: boolean | AddEventListenerOptions | undefined
): () => void {
        function listener(event: Event) {
        for (let potential of allFrom(root, kind, selector)) {
            if (potential.contains(event.target as Node)) {
                return handler.call(potential, event, potential);
            }
        }
        return false;
    }
    root.addEventListener(type, listener, options);
    return () => root.removeEventListener(type, listener);
}

/**
 * Build a DOM subtree that has a single root from an html string.
 * 
 * @param html a valid HTML string
 * @param doc the owning document of the DOM subtree (defaults to `document`)
 */
export function build(html: string, doc: Document=document): Element {
    var container = doc.createElement('div');
    container.innerHTML = html;
    if (container.children.length != 1) {
        throw new Error(`HTML contained more than one root`);
    }
    var child = container.children[0];
    container.removeChild(child);
    return child;
}

/**
 * Build a DOM subtree that has any number of roots from an html string.
 * 
 * @param html a valid HTML string
 * @param doc the owning document of the DOM subtree (defaults to `document`)
 */
export function buildMany(html: string, doc: Document=document): DocumentFragment {
    var container = doc.createElement('div');
    container.innerHTML = html;
    var fragment = doc.createDocumentFragment();
    while (container.childNodes.length > 0) {
        let child = container.childNodes[0];
        container.removeChild(child);
        fragment.appendChild(child);
    }
    return fragment;
}