import { memo, useRef } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import { MdOutlineExpandCircleDown, MdDragIndicator } from 'react-icons/md';

export interface IDragDropItem {
  id: number;
  index: number;
}

interface ICateItem {
  type: string;
  id: number | 'new' | 'all';
  index: number;
  title: string;
  active: boolean;
  onClick: () => void;
  findCard?: (id: string) => {
    index: number;
  };
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DragableListItem = ({
  type,
  id,
  index,
  title,
  active,
  onClick,
  findCard,
  moveCard,
  onMenuClick,
}: ICateItem) => {
  const listItemRef = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type,
      item: { id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, index, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: type,
      hover(item: IDragDropItem, monitor) {
        if (item.id !== id && findCard) {
          const { index: overIndex } = findCard(id.toString());
          moveCard && moveCard(+item.id, overIndex);
          item.index = overIndex;
        }
      },
      drop: (item) => {
        return item;
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;

  preview(drop(listItemRef));

  return (
    <ListItem
      ref={listItemRef}
      disablePadding
      key={id}
      sx={{
        '&>.MuiListItemSecondaryAction-root': {
          right: [-8, -8, 8],
        },
        opacity,
      }}
      secondaryAction={
        <Stack direction='row' spacing={0.25} color='text.secondary'>
          {onMenuClick && (
            <IconButton
              id={id.toString()}
              color='inherit'
              size='small'
              onClick={onMenuClick}
            >
              <MdOutlineExpandCircleDown />
            </IconButton>
          )}
          {moveCard && (
            <IconButton
              color='inherit'
              size='small'
              ref={drag}
              sx={{
                cursor: 'move',
              }}
            >
              <MdDragIndicator />
            </IconButton>
          )}
        </Stack>
      }
    >
      <ListItemButton
        onClick={onClick}
        sx={{
          px: [0, 0, 2],
          bgcolor: active ? 'background.paper' : '',
          color: active ? 'primary.main' : '',
        }}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            noWrap: true,
            sx: { maxWidth: '90%' },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
export default memo(DragableListItem);
