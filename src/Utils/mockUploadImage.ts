import { v4 } from 'uuid';
import type { FacesCoordinates, FacesCoordinatesWithId, ImageFiles } from '../App';

export function mockUploadImage(images: ImageFiles): FacesCoordinatesWithId[] {
    const res: FacesCoordinatesWithId[] = [];
    for (let i = 0; i < images.length; i++) {
        let faces: FacesCoordinates = [];
        switch (`${images[i].resolution.width}x${images[i].resolution.height}`) {
        case '262x175':
            faces = [[[107,60], [150,111]]];
            break;
        case '1280x853':
            faces = [[[452,131], [800,607]]];
            break;
        case '853x1280':
            faces = [[[327,404], [537,692]]];
            break;
        case '958x1280':
            faces = [[[357,342], [569,594]]];
            break;
        case '1554x1200':
            faces = [[[532,314], [1056,943]]];
            break;
        case '1280x964':
            faces = [[[391,145], [583,406]], [[764,218], [914,436]], [[1073,285], [1258,508]]];
            break;
        case '1024x683':
            faces = [[[346,209], [373,251]], [[507,338], [544,367]], [[639,191], [679,239]]];
            break;
        case '1280x960':
            faces = [[[333,260], [396,345]], [[480,224], [521,305]], [[572,281], [616,348]], [[668,303], [708,377]], [[737,284], [776,354]], [[880,248], [917,306]], [[984,314], [1033,372]]];
            break;
        case '1920x1080':
            faces = [[[641,164], [1149,961]]];
            break;
        case '720x1280':
            faces = [[[153,183], [520,764]]];
            break;
        case '1000x1000':
            faces = [];
            break;
        default:
            throw 'No mock for this image';
        }
        res.push({
            localId: images[i].localId,
            serverId: v4(),
            faces,
        });
    }
    return res;
}
