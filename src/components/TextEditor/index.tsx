import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';

const quilModule = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ],
};

const TextEditor = ({
  value,
  onChange,
  placeholder = 'Enter description',
  readonly = false,
  containerSx,
}: {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
  readonly?: boolean;
  containerSx?: SxProps<Theme>;
}) => {
  return (
    <Box
      sx={{
        '&.MuiBox-root .ql-editor': {
          height: readonly ? 'auto' : 150,
        },
        ...containerSx,
      }}
    >
      <ReactQuill
        theme={readonly ? 'bubble' : 'snow'}
        placeholder={placeholder}
        modules={quilModule}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};

export default TextEditor;
