const sql = `
ALTER SEQUENCE postgres.material_id_seq
	RESTART 1;

  INSERT INTO postgres."material" ("name") VALUES
	 ('Сталь'),
	 ('Поліетілен')
`;

export default sql;
