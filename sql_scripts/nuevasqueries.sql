select * from encuestas;
select * from preguntas;

select preguntas.* from encuesta_pregunta
join encuestas on encuestas.encuesta_id = encuesta_pregunta.encuesta_id
join preguntas on preguntas.pregunta_id = encuesta_pregunta.pregunta_id
where encuestas.encuesta_id = 1;

insert into encuesta_pregunta(encuesta_id, pregunta_id) values (1,1),
															   (1,2),
															   (1,3),
															   (1,4),
															   (1,5),
															   (1,6);

select * from encuestas;
select * from usuarios;
select encuestas.* from usuario_encuesta
join encuestas on encuestas.encuesta_id = usuario_encuesta.encuesta_id
join usuarios on usuarios.usuario_id = usuario_encuesta.usuario_id
where usuarios.usuario_id = 1;

update encuestas set deleted = 1 where encuesta_id = 2;

insert into usuario_encuesta (usuario_id, encuesta_id) values (1,1),
															  (1,2);
