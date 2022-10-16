class AccessClassForTesting {
    public publicAttribute: string = 'FamixTypeScript.Access';
    private privateAttribute: number = 42;

    public returnAccessName(): string {
        this.privateMethod();
        return this.publicAttribute;
    }

    private privateMethod() {
        this.privateAttribute++;
    }
}
