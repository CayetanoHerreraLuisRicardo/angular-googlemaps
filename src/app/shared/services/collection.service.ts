import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
@Injectable()
export class CollectionService {
    constructor() { }
    /**
     * @summary Inicializa el objeto Address.
     * @returns Objecto de typo Address
     */
    public initAddress(): Address {
        const oAddress: Address = {
            numero: '',
            calle: '',
            colonia: '',
            municipio: '',
            estado: '',
            cp: '',
            direccionCompleta: '',
            latitud: null,
            longitud: null,
        };
        return oAddress;
    }
}
