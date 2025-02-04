import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { Box, BoxProps } from 'rebass';
import * as R from 'ramda';

// Hooks
import useKeyUp from '../../utils/useKeyUp';
// Styles
import getStyles, { backdropStyles } from './popup.styles';
import { IconName } from '../icon';
import IconButton from '../icon-button';

export interface PopupProps extends Omit<BoxProps, 'css'> {
  children: React.ReactNode;
  variant?: 'primary';
  hasBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  left?: string;
  top?: string;
  bottom?: string;
  right?: string;
  isOpen?: boolean;
  onBackdropClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
  onClose?: () => void;
  disabledMainButton?: boolean;
  footer?: React.ReactNode;
  disabledSecondaryButton?: boolean;
  hasCloseButton?: boolean;
  backdropSx?: BoxProps['sx'];
}

const Popup: FC<PopupProps> = ({
  children,
  left,
  top,
  bottom,
  right,
  variant = 'primary',
  hasBackdrop = true,
  isOpen = false,
  onBackdropClick,
  closeOnBackdropClick = true,
  footer,
  onClose = () => {},
  hasCloseButton = false,
  backdropSx = {},
  sx,
  ...props
}: PopupProps) => {
  const style = useMemo(
    () => getStyles({ left, top, bottom, right }),
    [left, top, bottom, right],
  );
  const openRef = useRef<boolean>(isOpen);

  useKeyUp(() => {
    if (openRef.current) {
      onClose();
    }
  });

  const handleBackdropClick = useCallback(
    (event: React.SyntheticEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick) {
        onClose();
      }

      if (onBackdropClick) {
        onBackdropClick(event);
      }
    },
    [onClose, onBackdropClick, closeOnBackdropClick],
  );

  useEffect(() => {
    openRef.current = isOpen;
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <React.Fragment>
      <Box
        minWidth="417px"
        minHeight="141px"
        tx="variants.popup"
        variant={variant}
        sx={R.mergeDeepRight(style as object, sx ?? {})}
        overflowX="visible"
        {...props}
      >
        {hasCloseButton && (
          <IconButton
            icon={IconName.cross}
            sx={{ position: 'absolute', right: 10, top: 10 }}
            size="lg"
            onClick={onClose}
          />
        )}
        {children}
        {footer && (
          <Box width="100%" backgroundColor="grayShade3">
            {footer}
          </Box>
        )}
      </Box>
      {/* Backdrop */}
      {hasBackdrop && (
        <Box
          sx={R.mergeDeepRight(backdropStyles as object, backdropSx as object)}
          onClick={handleBackdropClick}
        />
      )}
    </React.Fragment>
  );
};

export default Popup;
