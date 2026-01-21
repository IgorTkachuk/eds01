const sql = `
ALTER SEQUENCE postgres.performer_id_seq
	RESTART 1;

  INSERT INTO postgres."performer" ("name") VALUES
	 ('Клочун Андрій Федорович'),
	 ('Бабан Денис Валерійович'),
	 ('Губчак Петро Васильович'),
	 ('Бурлака Сергій Володимирович'),
	 ('Чорней Віктор Іванович'),
	 ('Тягій Андрій Іванович'),
	 ('Залужний Сергій Михайлович'),
	 ('Ісак Андрій Миколайович')
`;

export default sql;
