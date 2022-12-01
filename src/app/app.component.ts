import { Component } from '@angular/core';
import * as math from 'mathjs';
import { ArgumentOutOfRangeError, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  funcion = 'sin(x)';
  iteraciones = 10;
  variable = 'x';
  guardarFunciones: number[] = [];

  //añadir función
  addFunction(dato: number) {
    this.guardarFunciones.push(dato);
  }

  deleteUpperCase(){
    this.funcion = this.funcion.toLowerCase();
    this.variable = this.variable.toLowerCase();

  }

  newtonRaphson() {
    if (this.iteraciones <= 0 || this.funcion.length == 0 || this.variable.length <= 0 || this.variable.length >= 2) {
      (this.iteraciones <= 0) ?
        alert('iteraciones no puede ser menor o igual a 0') : (this.funcion.length == 0) ?
          alert('no hay función') : (this.variable.length <= 0) ?
            alert('no hay variable') : (this.variable.length >= 2) ?
              alert('más de un caracter en la variable') : '';
    } else {
      this.deleteUpperCase();
      console.log(this.variable,this.funcion);
      let resultador = 1;
      let f = math.parse(this.funcion);
      let variable = math.parse(this.variable);
      let fx = math.derivative(f, variable);
      let funcion = f.compile();
      let derivada = fx.compile();
      var scope = { x: resultador };
      this.deleteFunction();
      for (let i = 0; i < this.iteraciones; i++) {
        var resultadorTemporal = parseFloat(resultador.toFixed(10));
        this.addFunction(resultadorTemporal);
        resultador = resultador - (funcion.evaluate(scope) / derivada.evaluate(scope));
        scope.x = resultador;
      }
      //console.log(resultador);
    }
  }

  deleteFunction() {
    for (let i = 0; i < this.guardarFunciones.length; i++) {
      this.guardarFunciones.splice(0,this.guardarFunciones.length);
    }
  }

}
