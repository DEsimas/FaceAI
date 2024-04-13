import React, { useEffect } from 'react';
import { classnames } from '@bem-react/classnames';
import { MAXIMUM_AMOUNT_OF_SELECTED_FACES } from '../../Constants';
import { Image } from '../Image/Image';
import { cnImageModal, cnImageModalContent } from './ImageModal.classnames';
import type { ImageModalProps } from './ImageModal.typings';

import './ImageModal.scss';

export function ImageModal(props: ImageModalProps) {
    const { onClose, selectedCounter, selectFace, image, className} = props;

    useEffect(() => {
        function handleKeyUp(event: KeyboardEvent) {
            switch (event.key) {
            case 'Escape':
                onClose();
                break;
            }
        }

        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    });

    return (
        <div
            className={classnames(cnImageModal, className)}
            onClick={onClose}
        >
            <div
                className={cnImageModalContent}
                style={{
                    width: `${0.8*window.innerHeight*image.resolution.width/image.resolution.height}px`
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    selectedIndexes={[...image.selectedIndexes]}
                    image={image}
                    selectFace={selectFace}
                    key={image.localId}
                    disabled={selectedCounter >= MAXIMUM_AMOUNT_OF_SELECTED_FACES}
                    hideButtons
                />
            </div>
        </div>
    );
}
