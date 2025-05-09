
import { Tooltip, Typography } from '@mui/material';

export const TruncateText = ({ text, maxLength, fontFamily, color, fontSize }) => {

  if (!text) {
    return;
  }
  const truncatedText = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <Tooltip title={text} placement="top">
      <Typography
        fontFamily={fontFamily}
        color={color}
        fontSize={fontSize}
        fontWeight={600}
        sx={{
          textTransform: 'uppercase',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {truncatedText}
      </Typography>
    </Tooltip>
  )
}
