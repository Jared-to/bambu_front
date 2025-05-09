import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";

export const ButtonIcon = ({ Icon, colorText = "#000", hoverBg = "#000", handleFunctionButton,title="" }) => {
  return (
    <Tooltip placement="top" title={title}>
      <IconButton
        onClick={handleFunctionButton}
        sx={{
          color: colorText,
          border: '1px solid #dbe0e6',
          borderRadius: 2,
          transition: '0.5s',
          "&:hover": {
            color: 'white',
            bgcolor: hoverBg,
          },
        }}
        aria-label="icon button"
      >
        <Icon sx={{ fontSize: '16px' }} />
      </IconButton>
    </Tooltip>
  );
};

