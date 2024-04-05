import React, { useEffect } from 'react';
import { classnames } from '@bem-react/classnames';
import { MAXIMUM_AMOUNT_OF_SELECTED_FACES } from '../../Constants';
import { Image } from '../Image/Image';
import { cnImageModal, cnImageModalButton, cnImageModalContent, cnImageModalImage } from './ImageModal.classnames';
import type { ImageModalProps } from './ImageModal.typings';

import './ImageModal.scss';

import WhiteClose from './../../Assets/WhiteClose.png';

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
        <div className={classnames(cnImageModal, className)}>
            <button
                className={cnImageModalButton}
                onClick={onClose}
            >
                <img
                    className={cnImageModalImage}
                    src={WhiteClose}
                />
            </button>
            <div
                className={cnImageModalContent}
                style={{
                    width: `${0.8*window.innerHeight*image.resolution.width/image.resolution.height}px`
                }}
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
