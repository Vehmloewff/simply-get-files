import { readdir } from 'fs';

async function forEach(
	array: any[],
	callback: (val?: any, index?: number, array?: any[]) => Promise<any>
): Promise<void> {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

const readdirAsync = (dir: string): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		readdir(dir, 'utf-8', (err, files) => {
			if (err) {
				if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return resolve(null);
				else reject(err);
			} else resolve(files);
		});
	});
};

export default async (dir: string = process.cwd()): Promise<string[]> => {
	let unfinishedFinds: string[];
	const finds: string[] = [];

	const firstDepthFiles = await readdirAsync(dir);
	if (firstDepthFiles) unfinishedFinds = firstDepthFiles.map((val) => `${dir}/${val}`);
	else return [];

	await findFiles();

	async function findFiles() {
		await forEach(unfinishedFinds, async (find, index) => {
			const children = await readdirAsync(find);

			unfinishedFinds.splice(index, 1);

			if (!children) finds.push(find);
			else
				children.forEach((child) => {
					unfinishedFinds.push(`${find}/${child}`);
				});
		});

		if (unfinishedFinds.length !== 0) await findFiles();
	}

	return finds.map((find) => find.replace(`${dir}/`, ''));
};
