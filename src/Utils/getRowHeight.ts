import type { Item } from '../Components/Gallery';

const MAX_IMAGE_HEIGHT = 500;

export function getRowHeight(width: number, items: Item[], margin: number) {
    return Math.min((width - items.length*margin - 1) / items.reduce((sum, item) => sum += item.width / item.height, 0), MAX_IMAGE_HEIGHT);
}
