Апи, доступное лишь администратору:

#/node/api-gm/content/all - GET
Получить полный список статических страниц, параметры:
session_hash
limit
offset

#/node/api-gm/content/add - POST
Добавить новую страницу, параметры:
session_hash
title
page_data
alias
area_id

#/node/api-gm/content/update/:page_id - POST
изменить существующую страницу, параметры:
:page_id - секция УРЛа, ид страницы
session_hash
title
page_data
alias
area_id

#/node/api-gm/content/status/:page_id - POST
изменить статус страницы, параметры:
:page_id - секция УРЛа, ид страницы
session_hash
status - можно менять статус только на 1 - активный.2 - неактивный, 9 - удалена