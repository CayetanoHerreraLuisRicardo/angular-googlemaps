/**
 * Interfaz utilizada para el componente de map.component.ts ==> para pasar las coordenadas
 * y colocar el marcador en modo editar o consultar.
 */
export interface Coordinates {
    /**
     * Latitud
     */
    latitude: number;
    /**
     * Longitud
     */
    longitude: number;
    /**
     * Para poder mover el marcador de google
     */
    marker: boolean;
}
