import { Component } from '@angular/core';
import * as math from 'mathjs';
import { ArgumentOutOfRangeError, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //Datos
  funcion = 'sin(x)';
  iteraciones = 10;
  variable = 'x';
  guardarResultados: number[] = [];

  //Guardar resultados en el array
  addFunction(dato: number) {
    this.guardarResultados.push(dato);
  }

  //Eliminar resultados del array
  deleteFunction() {
    this.guardarResultados.splice(0, this.guardarResultados.length);
  }

  //Eliminar mayúsculas para evitar errores
  deleteUpperCase() {
    this.funcion = this.funcion.toLowerCase();
    this.variable = this.variable.toLowerCase();
  }

  newtonRaphson() {
    //Validación de datos
    if (this.iteraciones <= 0 || this.funcion.length == 0 || this.variable.length <= 0 || this.variable.length >= 2) {
      (this.iteraciones <= 0) ?
        alert('iteraciones no puede ser menor o igual a 0') : (this.funcion.length == 0) ?
          alert('no hay función') : (this.variable.length <= 0) ?
            alert('no hay variable') : (this.variable.length >= 2) ?
              alert('más de un caracter en la variable') : '';
    } else {
      this.deleteUpperCase();
      let resultador = 1;//X0 = 1 para la forumla de newton-raphson

      //Convertir el string en un objeto para poder aplicar los métodos (String to functionNode)
      let f = math.parse(this.funcion);
      let variable = math.parse(this.variable);
      let fx = math.derivative(f, variable);

      //Prepara al objeto para la evaluación de las variables que tenga
      let funcion = f.compile();
      let derivada = fx.compile();

      //Se crea un objeto que posee el/los valores para evaluar la función  f(scope) y f'(scope)
      let scope = { x: resultador };
      this.deleteFunction();

      for (let i = 0; i < this.iteraciones; i++) {
        let resultadorTemporal = parseFloat(resultador.toFixed(10));
        this.addFunction(resultadorTemporal);
        resultador = resultador - (funcion.evaluate(scope) / derivada.evaluate(scope));
        scope.x = resultador;

        //Errores aqui
        if(isNaN(scope.x)){
          this.addFunction(NaN);
          break;
        }else
        if(scope.x == Number.POSITIVE_INFINITY || scope.x == Number.NEGATIVE_INFINITY){
          this.addFunction(Infinity);
          break;
        }

      }
    }
  }

}
