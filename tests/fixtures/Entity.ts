namespace MyNamespace {

    export class EntityClass {
        static #userCount = 0;
        public name: string;
        trustMe!: string;
        readonly ro = 'yes';
        optional?: string;
        protected prot1: Map<any, any>;
        private p1: boolean;  // type-only private
        #p2 = false; // runtime private

        constructor() {
            this.name = 'Arezoo';
            console.log(this.#p2);
        }

        public move(): void {
            this.move2('my family ' + this.p1);
        }

        private move2(family: string): void {
            var Str1: string = 'hi' + family;
            this.name = family + Str1;
        }

        static {
            this.#userCount++;
            console.log(this.#userCount);
        }
    }

    class class2 extends EntityClass {
        public cls2: number;
    }

    namespace Nsp2 {
        class clsInNsp {
            public static aStaticMethod() {
                const e = new EntityClass();
            }

            public udf2(): string {
                return 'Hiiii';
            }
        }
    }

}

class clsOutNsp {
    public att1: number = 10;

    public udf(): string {
        return 'Hiiii in out of namespace';
    }
}

namespace Nsp3 {
    class clsInNsp3 {
        public udf3(): string {
            return 'Hiiii';
        }
    }
}

// global scope
var globalA = 'yes';

function globalFunc(a: number) {
    return globalA == 'yes' ? a - 10 : 0;
}
