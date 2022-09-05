select * from dbo.preguntas
where deleted = 1;

delete from dbo.preguntas where pregunta_id in (7,8,9,10,11,12);

insert dbo.preguntas (pregunta_descripcion) values ('Pregunta 1'),
													('Pregunta 2'),
													('Pregunta 3'),
													('Pregunta 4'),
													('Pregunta 5'),
													('Pregunta 6');

select * from dbo.valor where deleted =1;

insert dbo.valor(descripcion, valor) values ('Triste', 2),
											('Medio Triste', 3),
											('Indiferente', 5),
											('Enojado',1),
											('Medio Feliz', 6),
											('Feliz', 10);


select * from dbo.pregunta_valor;


insert into dbo.pregunta_valor(pregunta_id, valor_id) values (1,1),
															 (1,2),
															 (2,1),
															 (1,1),
															 (1,1),
															 (4,2),
															 (5,1);


select pv.valorpregunta_id as ID,p.*, v.* from pregunta_valor pv 
join preguntas p on pv.pregunta_id = p.pregunta_id
join valor v on pv.valor_id = v.valor_id;

delete from pregunta_valor;