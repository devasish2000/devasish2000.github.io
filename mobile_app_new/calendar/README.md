# calendarJs
> Autor - Yordanch Vargas Velasque

> Calendario realizado con Con jquery, moment.js y bootstrap, facil de personalizar
 
> Muestra
 
> ![Muestra](https://github.com/yordanch/calendarJs/blob/master/img/muestra.JPG)
### Uso básico
- Inicializacion
```bash
   calendar = new CalendarYvv()
   calendar.etiqueta = "#etiqueta" // algun atributo de la etiqueta dónde imprimir
   calendar.diaSeleccionado = "2018-18-11" // alguna fecha en especial
   calendar.primerDia = "lunes" // algun día de la semana
   calendar.createCalendar() // ejecución del calendario
```
### Uso avanzado
- Métodos
```bash
   calendar.funcPer = funcion_personalizada // función que se lanzara al hacer click en el día
   calendar.funcNext = funcion_personalizada // funcion que se ejecutará al hacer click en siguiente (>)
   calendar.funcPrev = funcion_personalizada // funcion que se ejecutará al hacer click en anterior (<)
```
- Atributos
```bash
   calendar.diasResal = [1,2,3] // días que serán resaltadas
   calendar.colorResal = "#28a7454d" // color de los dias importantes (exadecimal) con transparencia
   calendar.textResalt = "#28a745" // color de los dias importantes (exadecimal)
   
   calendar.bg = "bg-dark"; // color de fondo de la cabecera
   calendar.textColor = "text-white"; // color de texto en la cabecera
   calendar.btnH = "btn-outline-light"; // color de boton normal
   calendar.btnD = "btn-rounded-success"; // color de boton al pasar el mouse
```
