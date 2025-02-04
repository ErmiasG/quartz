import React, { FC } from 'react';
import { Box, Flex } from 'rebass';
import { Button } from '../../button';

// Components
import Popup, { PopupProps } from '../index';
import Subtitle from '../../typography/subtitle';
import Text from '../../typography/text';
import { ButtonProps } from '../../..';

export interface TinyPopupProps
  extends Omit<
    PopupProps,
    'css' | 'children' | 'disabledMainButton' | 'disabledSecondaryButton'
  > {
  title: string;
  secondaryText: string;
  mainButtonProps?: ButtonProps;
  secondaryButtonProps?: ButtonProps;
  tertiaryButtonProps?: ButtonProps;
  onClose?: () => void;
  children?: React.ReactNode;
  contentHeight?: string;
}

const TinyPopup: FC<TinyPopupProps> = ({
  title,
  secondaryText,
  onClose = () => {},
  mainButtonProps,
  secondaryButtonProps,
  tertiaryButtonProps,
  children,
  contentHeight,
  sx,
  ...props
}: TinyPopupProps) => {
  return (
    <Popup
      p="20px"
      width="fit-content"
      sx={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        ...sx,
      }}
      onClose={onClose}
      {...props}
    >
      <Subtitle pb="20px" lineHeight="22px">
        {title}
      </Subtitle>
      {!!secondaryText && (
        <Text lineHeight="14px" pb="20px">
          {secondaryText}
        </Text>
      )}
      <Box sx={contentHeight ? { height: contentHeight } : {}}>{children}</Box>
      <Flex>
        <Flex width="100%" sx={{ gap: '20px', justifyContent: 'flex-end' }}>
          {tertiaryButtonProps && (
            <Button intent="secondary" {...tertiaryButtonProps} />
          )}
          {secondaryButtonProps && (
            <Button intent="secondary" {...secondaryButtonProps} />
          )}
          {mainButtonProps && <Button {...mainButtonProps} />}
        </Flex>
      </Flex>
    </Popup>
  );
};

export default TinyPopup;
