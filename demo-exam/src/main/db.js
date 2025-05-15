import { Client } from 'pg';

const connectionDataBase = async () => {
  const client = new Client({
    user: 'postgres',
    password: '1234',
    host: '172.28.32.1',  // 172.28.35.82  172.28.32.1
    port: '5432',
    database: 'officedb',
  });

  await client.connect();
  return client;
};

export default connectionDataBase;
