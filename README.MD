# ШРИ 2018 - третье задание

## Как запустить

Сделать экспорт функции solution из файла index.js и вызвать, передав нужные входные данные.

## Цель задания

Реализовать алгоритм работы «умного дома», который будет производить расчёт стоимости потребляемой электроэнергии в день и возвращать рекомендованное расписание использования электроприборов, оптимизируя денежные затраты.

На вход подаются данные о тарифах, электроприборах и их максимальной потребляемой мощности.

Тарифы — это периоды в сутках, для которых задана отдельная стоимость киловатт-часа.

Приборы — это набор подключенных к «умному дому» электроприборов, для которых известна потребляемая мощность, длительность цикла работы, а также время дня, когда они используется. Каждый прибор должен отработать один цикл в сутки. Максимально потребляемая мощность указывается в ватт-часах.

На выходе должно получиться суточное расписание включения электроприборов. Каждый прибор за сутки должен отработать один цикл, а суммарная стоимость потраченной электроэнергии должна быть минимальной.

При значении mode — day период с 07:00 до 21:00.
При значении mode — night период с 21:00 до 07:00 следующего дня.
При значении mode — undefined период отсутствует, прибор может работать в любой промежуток времени.
