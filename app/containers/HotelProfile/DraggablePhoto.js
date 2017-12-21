/* eslint-disable react/no-find-dom-node */
import React from 'react';
import styled from 'styled-components';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { DRAGGABLE_PHOTO } from './constants';

const Container = styled.div`
  width: 180px;
  height: 180px;
  margin-bottom: 15px;
`;

function Photo({
  children,
  connectDragSource,
  connectDropTarget,
  isEditingMode,
}) {
  if (!isEditingMode) {
    return (
      <Container>
        {children}
      </Container>
    );
  }
  return (
    <Container
      innerRef={instance => {
        const domNode = findDOMNode(instance);
        connectDropTarget(domNode);
        connectDragSource(domNode);
      }}
    >
      {children}
    </Container>
  );
}

// React DND stuff

const photoSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const photoTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    // Time to actually perform the action
    props.movePhoto(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DraggablePhoto = DragSource(
  DRAGGABLE_PHOTO,
  photoSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)(Photo);

export default DropTarget(DRAGGABLE_PHOTO, photoTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(DraggablePhoto);
