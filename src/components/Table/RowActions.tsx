'use client';
import { IconButton, Tooltip } from '@mui/material';
import { Edit, Save, Cancel, Delete } from '@mui/icons-material';

interface Props {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function RowActions({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: Props) {
  return (
    <>
      {isEditing ? (
        <>
          <Tooltip title="Save">
            <IconButton color="primary" size="small" onClick={onSave}>
              <Save fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton color="warning" size="small" onClick={onCancel}>
              <Cancel fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Edit">
            <IconButton color="primary" size="small" onClick={onEdit}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" size="small" onClick={onDelete}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
}