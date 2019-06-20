import { FriendSql } from '@Interfaces';
import { Friend } from '@Repositories/Models';

export module FriendRepository {
	export const IsFriend = async (userid: number, toUserId: number): Promise<boolean> => {
		const friend = await (await Friend.Model()).findOne({
			where: { touserid: toUserId, fromuserid: userid }
		}) as FriendSql;

		if (friend) {
			return true;
		}

		return false;
	};

	export const Get = async (userid: number, toUserId: number): Promise<FriendSql> => {
		const friend = await (await Friend.Model()).findOne({
			where: { touserid: toUserId, fromuserid: userid }
		}) as FriendSql;

		return friend;
	};

	export const Upsert = async (userId: number, toUserId: number, date: Date): Promise<void> => {
		const model = await Friend.Model();
		const row = await model.findOne({ where: { touserid: toUserId, fromuserid: userId } });

		if (row) {
			await model.update({ date }, { where: { touserid: toUserId, fromuserid: userId } });

			return;
		}

		await model.create({
			date,
			fromuserid: userId,
			touserid: toUserId
		});

	};

	export const Count = async (userId: number): Promise<number> => {
		const model = await Friend.Model();

		const count = await model.count({ where: { fromuserid: userId } });

		return count;
	};

	export const DeleteOldest = async (userId: number): Promise<number> => {
		const model = await Friend.Model();

		const oldest: any = await model.findOne({
			where: { fromuserid: userId },
			order: [
				['date', 'ASC']
			],
			limit: 1
		});

		const result = await model.destroy({where: { fromuserid: userId, touserid: oldest.touserid}});

		return result;
	};

	export const List = async (userId: number, page: number, count: number) => {

		const result = await (await Friend.Model()).findAll({
			where: {
				fromuserid: userId
			},
			order: [
				['date', 'DESC']
			],
			limit: count,
			offset: page * count
		}) as Array<FriendSql>;

		return result;
	};

	export const Remove = async (userId: number, users: string): Promise<boolean> => {
		const temp: Array<string> = SplitHelper.SplitString(users);

		const query = await (await Friend.Model()).destroy(
			{ where: { fromuserid: userId, touserid: temp.map(u => Number(u)) } }
		);

		return query ? true : false;
	};

}
