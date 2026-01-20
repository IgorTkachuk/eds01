const sql = `
ALTER SEQUENCE postgres.pressure_id_seq
	RESTART 1;

  INSERT INTO postgres."pressure" ("name") VALUES
	 ('Високий'),
	 ('Середній'),
	 ('Низький'),
	 ('Середній-Низький')
`;

export default sql;
