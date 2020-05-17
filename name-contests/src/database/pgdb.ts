import { Pool } from 'pg';
import { camelizeKeys } from 'humps';

export default (pgPool: Pool) => {
  return {
    async getUser(apiKey: string) {
      const response = await pgPool.query(
        `
            select * from users
            where api_key = $1`,
        [apiKey],
      );

      return camelizeKeys(response.rows[0]);
    },
    async getContests(user) {
      const response = await pgPool.query(
        `
      select * from contests
      where created_by = $1`,
        [user.id],
      );

      return camelizeKeys(response.rows);
    },
  };
};