import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { Address } from '../models/address.model';
import { Coordinates } from '../models/coordinates.model';
import { CollectionService } from '../services/collection.service';
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
    @Input() oCoord: Coordinates;
    @Output() addressEvent = new EventEmitter<Address>();
    @ViewChild('gmap') gmapElement: any;
    private map: google.maps.Map;
    private marker: google.maps.Marker;
    private geocoder: google.maps.Geocoder;
    private oAddress: Address;
    constructor(private _collection: CollectionService) { }
    /**
     * @summary Ejecutado seguido metodo contructor
     */
    ngOnInit() {
        this.oAddress = this._collection.initAddress();
        console.log(this.oCoord);
        if (this.oCoord.latitude == null && this.oCoord.longitude == null) {
            this.initLocation();
        } else {
            this.initMap(new google.maps.LatLng(this.oCoord.latitude, this.oCoord.longitude));
        }
    }
    private initLocation() {
        const coords = new google.maps.LatLng(20.6961778, -103.2992737);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.initMap(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            });
        } else {
            this.initMap(coords);
        }
    }
    private initMap(_coords: google.maps.LatLng): void {
        this.setMap(_coords);
        this.setMapType('roadmap');
        this.addMarker(_coords);
        this.getData(_coords);
        google.maps.event.addListener(this.map, 'click', (event) => {
            this.placeMarker(event);
        });
    }
    private setMap(_coords: google.maps.LatLng): void {
        const mapProp = {
            center: _coords,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
    private setMapType(_type: string) {
        this.map.setMapTypeId(_type);
    }
    private addMarker(_coords: google.maps.LatLng) {
        this.marker = new google.maps.Marker({
            position: _coords,
            map: this.map
        });
    }
    private placeMarker(_e) {
        if (this.oCoord.marker) {
            const coords = new google.maps.LatLng(_e.latLng.lat(), _e.latLng.lng());
            this.oAddress.latitud = Number(coords.lat());
            this.oAddress.longitud = Number(coords.lng());
            if (this.marker) {
                this.marker.setMap(null);
            }
            this.addMarker(coords);
            this.getData(coords);
            this.map.setCenter(coords);
        }
    }
    private getData(_coords: google.maps.LatLng) {
        this.oAddress.latitud = Number(_coords.lat());
        this.oAddress.longitud = Number(_coords.lng());
        this.geocoder = new google.maps.Geocoder();
        const location: google.maps.GeocoderRequest = { 'location': _coords };
        this.geocoder.geocode(location, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results) {
                    if (results.length > 0) {
                        this.getAddress(results);
                    }
                }
            }
        });
    }
    public codeAddress(_address) {
        this.geocoder = new google.maps.Geocoder();
        const address: google.maps.GeocoderRequest = { 'address': _address };
        this.geocoder.geocode(address, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results) {
                    if (results.length > 0) {
                        console.log(results);
                    }
                }
            }
        });
    }
    private getAddress(_array: google.maps.GeocoderResult[]): void {
        this.oAddress.direccionCompleta = _array[0].formatted_address;
        _array[0].address_components.forEach((_item, index) => {
            _item.types.forEach(_type => {
                switch (_type) {
                    case 'street_number':
                        this.oAddress.numero = _item.long_name;
                        break;
                    case 'route':
                        this.oAddress.calle = _item.long_name;
                        break;
                    case 'sublocality':
                        this.oAddress.colonia = _item.long_name;
                        break;
                    case 'locality':
                        this.oAddress.municipio = _item.long_name;
                        break;
                    case 'administrative_area_level_1':
                        this.oAddress.estado = _item.long_name;
                        break;
                    case 'postal_code':
                        this.oAddress.cp = _item.long_name;
                        break;
                }
            });
        });
        this.addressEvent.emit(this.oAddress);
    }
}
