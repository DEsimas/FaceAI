import type { Rectangle, Resolution } from '../App';
import type { Size } from '../Components/Image';

export function getScaledCoordinates(resolution: Resolution, coordinates: Rectangle, size: Size): Rectangle {
    const x = size.width / resolution.width;
    const y = size.height / resolution.height;
    return [[coordinates[0][0] * x, coordinates[0][1] * y], [coordinates[1][0] * x, coordinates[1][1] * y]];
}
