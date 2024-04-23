import React, { useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { classnames } from '@bem-react/classnames';
import { Image } from '../Image/Image';
import { cnImageModal, cnImageModalButton, cnImageModalContent } from './ImageModal.classnames';
import type { ImageModalProps } from './ImageModal.typings';

import CloseWhite from './../../Assets/CloseWhite.png';

import './ImageModal.scss';

export function ImageModal(props: ImageModalProps) {
    const { onClose, selectedCounter, selectFace, image, className, maximumFaces} = props;

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
    }, []);

    return (
        <div
            className={classnames(cnImageModal, className)}
            onClick={onClose}
        >
            <RemoveScroll>
                <div/>
            </RemoveScroll>
            <div
                className={cnImageModalContent}
                style={{
                    width: `${0.8*window.innerHeight*image.resolution.width/image.resolution.height}px`
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    className={cnImageModalButton}
                    alt='close'
                    onClick={onClose}
                    src={CloseWhite}
                    draggable={false}
                />
                <Image
                    selectedIndexes={[...image.selectedIndexes]}
                    image={image}
                    selectFace={selectFace}
                    key={image.localId}
                    disabled={selectedCounter >= maximumFaces}
                    hideButtons
                    modalOffset
                />
            </div>
        </div>
    );
}
