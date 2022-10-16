import { FamixRepository } from '@blok-codes/famix/dist/FamixRepository';
import { Class } from '@blok-codes/famix/dist/FamixTypeScript/Class';
import { Method } from '@blok-codes/famix/dist/FamixTypeScript/Method';
import { inject, injectable } from 'inversify';
import {
    ClassDeclaration,
    FunctionDeclaration,
    MethodDeclaration,
    ModuleDeclaration,
    Project,
    SourceFile,
    Statement,
    SyntaxKind,
    VariableDeclaration,
    VariableStatement,
} from 'ts-morph';
import { Logger } from 'winston';

import { isProcessableStatement } from '../Helpers';

@injectable()
export class RedTwig {
    @inject('Logger')
    private readonly logger!: Logger;

    @inject('Project')
    private readonly project!: Project;

    @inject('FamixRepository')
    private readonly repository!: FamixRepository;

    // todo: delete these fields - placeholders until famix elements are created and stored in the repository
    private readonly classes: ClassDeclaration[] = [];
    private readonly declarations: VariableDeclaration[] = [];

    private readonly functions: FunctionDeclaration[] = [];
    private readonly methods: MethodDeclaration[] = [];

    private readonly variables: VariableDeclaration[] = [];
    private readonly variableStatements: VariableStatement[] = [];

    public readonly import = (paths: string[]): void => {
        this.logger.info(`Importing project at `, paths);
        this.repository.toJSON(); // todo: remove this line - just to compile

        const files = this.project.addSourceFilesAtPaths(paths);
        files.forEach((sourceFile: SourceFile) => this.process(sourceFile));

        this.report(); // todo: delete this line - just to debug for now
    };

    // todo: delete this method - just to debug for now
    private readonly report = (): void => {
        this.logger.info(`\nClasses:`);
        this.classes.forEach((c) => this.logger.debug(c.getName()));

        this.logger.info(`\nVariables:`);
        this.variables.forEach((v) => this.logger.debug(v.getName()));

        this.logger.info(`\nVariable Statements:`);
        this.variableStatements.forEach((vs) => this.logger.debug(vs.getDeclarations()[0].getName()));

        this.logger.info(`\nFunctions:`);
        this.functions.forEach((f) => this.logger.debug(f.getName()));

        this.logger.info(`\nMethods:`);
        this.methods.forEach((f) => this.logger.debug(f.getName()));

        this.logger.info(`\nVariable Declarations:`);
        this.declarations.forEach((v) => this.logger.debug(v.getName()));
    };

    private readonly process = (sourceFile: SourceFile): void => {
        this.logger.info(`----------Finding Classes:`);
        sourceFile.getClasses().forEach((declaration) => this.processClassDeclaration(declaration));

        this.logger.info(`----------Finding VariableStatements:`);
        sourceFile.getVariableStatements().forEach((statement) => this.processVariableStatement(statement));

        this.logger.info(`----------Finding VariableDeclarations:`);
        sourceFile.getVariableDeclarations().forEach((declaration) => this.processVariableDeclaration(declaration));

        this.logger.info(`----------Finding Functions:`);
        sourceFile.getFunctions().forEach((declaration) => this.processFunctionDeclaration(declaration));

        this.logger.info(`----------Finding Modules:`);
        sourceFile.getModules().forEach((declaration) => this.processModuleDeclaration(declaration));
    };

    private readonly processClassDeclaration = (declaration: ClassDeclaration): void => {
        this.classes.push(declaration);
        const clazz = this.repository.createOrGetFamixClass(declaration.getName());

        this.repository.addElement(clazz);
        declaration.getMethods().forEach((method) => this.processMethodDeclaration(method, clazz));

        this.logger.debug(
            `class: ${declaration.getName()} (${declaration.getType().getText()}), fqn = ${declaration
                .getSymbol()
                ?.getFullyQualifiedName()}`
        );
    };

    private readonly processMethodDeclaration = (declaration: MethodDeclaration, clazz: Class): void => {
        this.methods.push(declaration);
        this.logger.debug(`method: ${declaration.getName()}`);

        const method = new Method(this.repository);
        method.isAbstract = declaration.isAbstract();

        clazz.addMethods(method);
    };

    private readonly processFunctionDeclaration = (declaration: FunctionDeclaration): void => {
        this.functions.push(declaration);
        this.logger.debug(`function: ${declaration.getName()}`);

        declaration.getVariableStatements().forEach((statement) => this.processVariableStatement(statement));
        declaration.getVariableDeclarations().forEach((variable) => this.processVariableDeclaration(variable));

        this.processStatements(declaration.getStatements());
        declaration.getFunctions().forEach((func) => this.processFunctionDeclaration(func));
    };

    private readonly processModuleDeclaration = (declaration: ModuleDeclaration): void => {
        this.logger.debug(`Module "${declaration.getName()}":`);

        this.logger.info(`----------Finding Classes in Module "${declaration.getName()}":`);
        declaration.getClasses().forEach((clazz) => this.processClassDeclaration(clazz));

        this.logger.info(`----------Finding VariableStatements in Module "${declaration.getName()}":`);
        declaration.getVariableStatements().forEach((statement) => this.processVariableStatement(statement));

        this.logger.info(`----------Finding VariableDeclarations in Module "${declaration.getName()}":`);
        declaration.getVariableDeclarations().forEach((variable) => this.processVariableDeclaration(variable));

        this.logger.info(`----------Finding Functions in Module "${declaration.getName()}":`);
        declaration.getFunctions().forEach((func) => this.processFunctionDeclaration(func));
    };

    private readonly processVariableDeclaration = (declaration: VariableDeclaration): void => {
        this.variables.push(declaration);
        this.logger.debug(
            `variable: ${declaration.getName()} (${declaration.getType().getText()}), fqn = ${declaration
                .getSymbol()
                ?.getFullyQualifiedName()}`
        );
    };

    private readonly processVariableStatement = (statement: VariableStatement): void => {
        this.variableStatements.push(statement);
        this.logger.debug(
            `Variable statement: ${statement.getDeclarationKindKeyword().getText()} ${statement
                .getDeclarations()[0]
                .getName()}`
        );
    };

    private readonly processStatements = (statements: Statement[]): void => {
        this.logger.debug(`processing statements...`);

        statements
            .filter((statement) => isProcessableStatement(statement))
            .forEach((statement) => {
                this.logger.debug(`variables in ${statement.getKindName()}`);

                statement
                    .getDescendantsOfKind(SyntaxKind.VariableDeclaration)
                    .forEach((declaration: VariableDeclaration) => {
                        this.processVariableDeclaration(declaration);
                        this.declarations.push(declaration);
                    });
            });
    };
}
