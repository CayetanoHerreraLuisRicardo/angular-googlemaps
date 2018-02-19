import { Component, OnInit } from '@angular/core';
import { Address } from './shared/models/address.model';
import { Coordinates } from './shared/models/coordinates.model';
import { CollectionService } from './shared/services/collection.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public oAddress: Address;
  public oCoord: Coordinates;
  private form: FormGroup;
  constructor(private _collection: CollectionService, private formBuilder: FormBuilder) { }

    /**
     * @summary Ejecutado seguido del método contructor
     */
    ngOnInit() {
      this.oAddress = this._collection.initAddress();
      this.oCoord = { latitude: null, longitude: null, marker: true };
      this.initForm();
  }
  /**
   * @summary Extrae los datos de Direcciones del componente de Google Maps
   * @param _e: Objeto Address
   */
  private getAddress(_e: Address): void {
      this.oAddress = _e;
      console.log(this.oAddress);
      this.setValues(this.oAddress);
  }
  private setValues(_address: Address) {
    this.form.controls['direccion'].setValue(_address.direccionCompleta);
    this.form.controls['calle'].setValue(_address.calle);
    this.form.controls['colonia'].setValue(_address.colonia);
    this.form.controls['estado'].setValue(_address.estado);
    this.form.controls['cp'].setValue(_address.cp);
    this.form.controls['latitud'].setValue(_address.latitud);
    this.form.controls['longitud'].setValue(_address.longitud);
  }
  private initForm() {
    this.form = this.formBuilder.group({
      direccion: [''],
      calle: [''],
      colonia: [''],
      estado: [''],
      cp: [''],
      latitud: [''],
      longitud: [''],
    });
  }
}
