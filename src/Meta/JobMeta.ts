import { Job } from '@Interfaces';
import { EnumValues } from 'enum-values';

const JobList = [
];

export module JobMeta {

	export const Name = (job: Job): string => {
		let selectedJob = '';

		for (const item of JobList) {

			for (const jobItem in item) {
				if (Number(jobItem) === Number(job)) {
					selectedJob = item[jobItem];
				}
			}
		}

		return selectedJob;
	};

	export const All = (): Array<{ Name: string, Id: number }> => {

		const jobsArray = [];

		for (const item of JobList) {
			Object.keys(item).forEach(itemKey => jobsArray.push({ Name: item[itemKey], Id: Number(itemKey) }));
		}

		return jobsArray;
	};

}
