import test from 'ava';
import {IHeader} from './types';
import {filterHeaders, IHeaders} from './filterHeaders';

interface ITest {
    input: IHeader,
    expected: IHeaders,
}

([
    {
        input: {},
        expected: {
            headers: {},
            multiValueHeaders: {},
        },
    },
    {
        input: {
            foo: null,
        },
        expected: {
            headers: {},
            multiValueHeaders: {},
        },
    },
    {
        input: {
            foo: undefined,
        },
        expected: {
            headers: {},
            multiValueHeaders: {},
        },
    },
    {
        input: {
            foo: 1,
        },
        expected: {
            headers: {
                foo: 1,
            },
            multiValueHeaders: {},
        },
    },
    {
        input: {
            foo: '1',
        },
        expected: {
            headers: {
                foo: '1',
            },
            multiValueHeaders: {},
        },
    },
    {
        input: {
            foo: ['1'],
        },
        expected: {
            headers: {
                foo: '1',
            },
            multiValueHeaders: {},
        },
    },
    {
        input: {
            foo: ['1', 0, undefined, null],
        },
        expected: {
            headers: {},
            multiValueHeaders: {
                foo: ['1', 0],
            },
        },
    },
] as Array<ITest>).forEach(({input, expected}, index) => {
    test(`#${index} ${JSON.stringify(input)} → ${JSON.stringify(expected)}`, (t) => {
        t.deepEqual(filterHeaders(input), expected);
    });
});
