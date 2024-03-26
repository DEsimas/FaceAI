import { MAX_IMAGE_HEIGHT } from '../Constants';
import type { Item } from '../Components/Gallery';

export function getRowHeight(width: number, items: Item[], margin: number) {
    return Math.min((width - items.length*margin) / items.reduce((sum, item) => sum += item.width / item.height, 0), MAX_IMAGE_HEIGHT);
}
