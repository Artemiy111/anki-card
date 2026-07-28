# Трекер задач: GitHub

Задачи и PRD этого репозитория хранятся в GitHub Issues. Для всех операций используйте CLI `gh`.

## Соглашения

- **Создать задачу**: `gh issue create --title "..." --body "..."`. Для многострочного описания используйте heredoc.
- **Прочитать задачу**: `gh issue view <number> --comments`, отфильтровав комментарии через `jq` и также получив метки.
- **Показать список задач**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` с подходящими фильтрами `--label` и `--state`.
- **Добавить комментарий**: `gh issue comment <number> --body "..."`
- **Добавить или удалить метки**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Закрыть задачу**: `gh issue close <number> --comment "..."`

Определяйте репозиторий через `git remote -v` — при запуске внутри клона `gh` делает это автоматически.

## Pull request как источник запросов для триажа

**PRs as a request surface: no.** _(Установите `yes`, если в этом репозитории внешние pull request рассматриваются как запросы на новые возможности; навык `/triage` читает этот флаг.)_

Если установлено значение `yes`, pull request проходят через те же метки и состояния, что и задачи, с использованием соответствующих команд `gh pr`:

- **Прочитать pull request**: `gh pr view <number> --comments`, а для просмотра изменений — `gh pr diff <number>`.
- **Показать внешние pull request для триажа**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`, затем оставить только значения `authorAssociation`: `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR` или `NONE`; исключить `OWNER`, `MEMBER` и `COLLABORATOR`.
- **Комментировать, помечать или закрывать**: `gh pr comment`, `gh pr edit --add-label` / `--remove-label`, `gh pr close`.

GitHub использует общее пространство номеров для задач и pull request, поэтому ссылка вида `#42` может указывать на любой из этих объектов. Сначала выполните `gh pr view 42`, а при неудаче — `gh issue view 42`.

## Когда навык просит опубликовать результат в трекере задач

Создайте задачу в GitHub Issues.

## Когда навык просит получить связанную задачу

Выполните `gh issue view <number> --comments`.

## Операции навигации

Используются навыком `/wayfinder`. **Карта** представляет собой одну задачу, а её **дочерние задачи** — отдельные тикеты.

- **Карта**: одна задача с меткой `wayfinder:map`, содержащая в описании разделы Notes, Decisions-so-far и Fog. Создаётся командой `gh issue create --label wayfinder:map`.
- **Дочерняя задача**: задача, связанная с картой как подзадача GitHub через `gh api` и endpoint подзадач. Если подзадачи недоступны, добавьте дочернюю задачу в список задач в описании карты и поместите строку `Part of #<map>` в начало её описания. Метки: `wayfinder:<type>`, где тип — `research`, `prototype`, `grilling` или `task`. После принятия задачи она назначается ведущему разработчику.
- **Блокировка**: нативные зависимости задач GitHub — каноническое и видимое в интерфейсе представление. Добавьте связь командой `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, где `<blocker-db-id>` — числовой идентификатор блокирующей задачи в базе данных (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`), а не номер `#number` и не `node_id`. GitHub возвращает `issue_dependencies_summary.blocked_by`, учитывая только открытые блокирующие задачи. Если зависимости недоступны, добавьте в начало описания дочерней задачи строку `Blocked by: #<n>, #<n>`. Задача считается разблокированной, когда закрыты все блокирующие её задачи.
- **Поиск следующей задачи**: получите открытые дочерние задачи карты через `gh issue list --state open`, ограничив выборку подзадачами или списком задач карты. Исключите задачи с открытыми блокировками (`issue_dependencies_summary.blocked_by > 0` либо открытая задача в строке `Blocked by`) и уже назначенные задачи. Выберите первую оставшуюся задачу в порядке карты.
- **Взять задачу**: `gh issue edit <n> --add-assignee @me` — первая операция записи в сессии.
- **Завершить задачу**: добавьте ответ через `gh issue comment <n> --body "<answer>"`, закройте задачу командой `gh issue close <n>`, затем добавьте в раздел Decisions-so-far карты указатель на контекст — gist и ссылку.
