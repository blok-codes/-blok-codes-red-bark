import { FamixBaseElement } from '@blok-codes/famix/dist/FamixBaseElement';
import { FamixRepository as AbstractFamixRepository } from '@blok-codes/famix/dist/FamixRepository';
import { Class } from '@blok-codes/famix/dist/FamixTypeScript/Class';
import { Namespace } from '@blok-codes/famix/dist/FamixTypeScript/Namespace';
import { decorate, injectable } from 'inversify';

decorate(injectable(), AbstractFamixRepository);

@injectable()
export class FamixRepository extends AbstractFamixRepository {
    private static instance: FamixRepository;
    protected counter = 0;

    protected readonly records = {
        classes: new Set<Class>(),
        elements: new Set<FamixBaseElement>(),
        namespaces: new Set<Namespace>(),
    };

    public static readonly getInstance = (): FamixRepository => {
        if (!FamixRepository.instance) {
            FamixRepository.instance = new FamixRepository();
        }

        return FamixRepository.instance;
    };

    public readonly addElement = (element: FamixBaseElement): void => {
        if (element instanceof Class) {
            this.records.classes.add(element);
        } else if (element instanceof Namespace) {
            this.records.namespaces.add(element);
        } else {
            this.records.elements.add(element);
        }

        element.id = ++this.counter;
    };

    public static readonly clear = (): void => {
        FamixRepository.instance = new FamixRepository();
    };

    public readonly createOrGetFamixClass = (name: string, isAbstract = false): Class => {
        let instance = this.getFamixClass(name);

        if (!instance) {
            instance = new Class(this);

            instance.name = name;
            instance.isStub = true;

            instance.isAbstract = isAbstract;
        }

        return instance;
    };

    public readonly getFamixClass = (name: string): Class | undefined =>
        Array.from(this.records.classes.values()).find((c) => c.name === name);

    public readonly getFamixElementById = (id: number): FamixBaseElement | undefined =>
        Array.from(this.records.elements.values()).find((e) => e.id === id);

    public readonly getFamixElementsByType = (type: string): Set<FamixBaseElement> =>
        new Set(Array.from(this.records.elements.values()).filter((e) => e.constructor.name === type));

    public readonly getFamixFunction = (namespace: string, regex: string): FamixBaseElement | undefined =>
        Array.from(this.records.elements).find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (e) => e instanceof Function && e.name.match(regex) && (e as any).namespace
        );

    public readonly getFamixNamespace = (name: string): Namespace | undefined =>
        Array.from(this.records.namespaces.values()).find((n) => n.name === name);

    public readonly toJSON = (): string => {
        let buffer = '[';

        for (const clazz of this.records.classes) {
            buffer = buffer + clazz.toJSON() + ',';
        }

        for (const element of this.records.elements) {
            buffer = buffer + element.toJSON() + ',';
        }

        buffer = buffer.substring(0, buffer.length - 1);
        return buffer + ']';
    };
}
