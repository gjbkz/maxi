import * as assert from 'assert';
import {IMAXIJSRootPackageJSON} from './types';

export const validateRootPackageJSON = async (
    rootPackageJSON: IMAXIJSRootPackageJSON,
): Promise<void> => {
    assert.deepEqual(
        new Set(Object.keys(rootPackageJSON)),
        new Set([
            'private',
            'license',
            'scripts',
            'devDependencies',
            'eslintConfig',
            'ava',
            'commitlint',
            'husky',
            'renovate-config',
        ]),
        `The package.json at the root directory is invalid.`,
    );
    assert.equal(
        rootPackageJSON.private,
        true,
        `(package.json).private is invalid: ${rootPackageJSON.private}`,
    );
    assert.equal(
        typeof rootPackageJSON.license,
        'string',
        `(package.json).license is invalid: ${rootPackageJSON.license}`,
    );
};