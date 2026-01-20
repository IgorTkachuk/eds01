const sql = `
ALTER SEQUENCE postgres.pipe_laying_type_id_seq
	RESTART 1;

  INSERT INTO postgres."pipe_laying_type" ("name") VALUES
	 ('Надземний'),
	 ('Підземний'),
	 ('Внутришньобудинковий')
	 `;

export default sql;
