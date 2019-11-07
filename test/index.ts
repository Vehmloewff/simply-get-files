import { it, Assertion, addAssertion } from 'zip-tap';
import getFiles from '../src';
import { resolve } from 'path';

addAssertion((actual: any, expected: any[]) => {
	let matches = true;

	if (!(actual instanceof Array)) throw new Error(`actual value is not an array`);

	expected.forEach((val) => {
		if (!actual.find((pred) => pred === val)) matches = false;
	});

	actual.forEach((val) => {
		if (!expected.find((pred) => pred === val)) matches = false;
	});

	return {
		ok: matches,
		actual,
		expected,
	};
}, `toMatchArray`);

it(`should read the directory`, async (expect) => {
	const data = await getFiles(resolve(`test/fixture`));
	expect(data).custom(`toMatchArray`, [
		`inner-fixture1/inner-inner1/file.js`,
		`inner-fixture1/outside-inner-file.js`,
		`inner-fixture2/file1.js`,
		`inner-fixture2/file2.js`,
		`fixture1.js`,
		`fixture2.js`,
	]);
});
