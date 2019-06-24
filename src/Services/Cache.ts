//#region Global Imports
import redis from 'redis';
import { promisify } from 'util';
//#endregion Global Imports

//#region Local Imports
//#endregion Local Imports

//#region Interface Imports
//#endregion Interface Imports

export namespace CacheService {
	export const client = redis.createClient({
		host: '',
		db: 0,
	});

	const getAsync = promisify(client.get).bind(client);
	const setAsync = promisify(client.set).bind(client);
	const lpushAsync = promisify(client.lpush).bind(client);
	const lpopAsync = promisify(client.lpop).bind(client);
	const setZAddAsync = promisify(client.zadd).bind(client);
	const getZRankAsync = promisify(client.zrank).bind(client);
	const getZInterAsync = promisify(client.zinterstore).bind(client);
	const getZRangeAsync = promisify(client.zrange).bind(client);
	const getExistsAsync = promisify(client.exists).bind(client);
	const incrAsync = promisify(client.incr).bind(client);
	const incrByAsync = promisify(client.incrby).bind(client);
	const setExpire = promisify(client.expire).bind(client);
	const delAsync = promisify(client.del).bind(client);

	export const Get = async <T>(key: string): Promise<T> => {
		const response = await getAsync(key);

		return JSON.parse(response) as T;
	};

	export const Set = async (key: string, data: any, expiryMin: number = 0): Promise<boolean> => {
		const response = await (expiryMin > 0
			? setAsync(key, JSON.stringify(data), 'EX', expiryMin * 60000)
			: setAsync(key, JSON.stringify(data)));

		return true;
	};

	export const PushItemToQueue = async (cacheStore: string, item: any): Promise<boolean> => {
		const result = lpushAsync(cacheStore, JSON.stringify(item));

		return result;
	};

	export const PopItemToQueue = async <T>(cacheStore: string): Promise<T> => {
		const result = (await lpopAsync(cacheStore)) as string;

		return JSON.parse(result) as T;
	};

	export const SetItemsToSortedSet = async (
		cacheStore: string,
		items: string[],
	): Promise<boolean[]> => {
		const results = [];

		for (const item of items) {
			const result = await setZAddAsync(cacheStore, 0, item);
			results.push(result);
		}

		return results;
	};

	export const SortedSetContainedValues = async (
		cacheStore: string,
		items: string[],
	): Promise<string[]> => {
		const containedValues = [];

		for (const item of items) {
			const isMember = await getZRankAsync(cacheStore, item);

			if (isMember !== null) {
				containedValues.push(item);
			}
		}

		return containedValues;
	};

	export const Exists = async (cacheKey: string): Promise<boolean> => {
		const result = await getExistsAsync(cacheKey);

		if (result) {
			return true;
		}

		return false;
	};

	export const SortedSetStoreIntersect = async (set: string, sets: string[]): Promise<number> => {
		const result = await getZInterAsync(set, 1, ...sets);

		return result;
	};

	export const SortedSetAllItems = async (cacheKey: string): Promise<string[]> => {
		const result = await getZRangeAsync(cacheKey, 0, -1);

		return result;
	};

	export const IncrementValue = async (cacheKey: string): Promise<number> => {
		const result = await incrAsync(cacheKey);

		return result;
	};
	export const Expire = async (cacheKey: string, expiryMin: number = 0): Promise<boolean> => {
		const result = await setExpire(cacheKey, expiryMin * 60000);

		return result;
	};

	export const IncrementByValue = async (cacheKey: string, val: number): Promise<number> => {
		const result = await incrByAsync(cacheKey, val);

		return result;
	};

	export const AddFriend = async (
		UserId: number,
		With: number,
		AddToOnlineFriends: boolean,
	): Promise<void> => {
		const trans = client.multi();

		trans.zadd(CacheHelper.Key(CacheStore.SortedSet_Friends, UserId.toString()), 0, With);

		if (AddToOnlineFriends) {
			trans.zadd(
				CacheHelper.Key(CacheStore.SortedSet_OnlineFriends, UserId.toString()),
				0,
				With,
			);
		}

		trans.exec();
	};

	export const Delete = async (key: string): Promise<number> => {
		const result = await delAsync(key);

		return result;
	};
}
