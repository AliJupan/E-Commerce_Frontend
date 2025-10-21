import {
  OutlinedInput,
  InputAdornment,
  FormControl,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Bar({
  placeholder,
  width,
  Icon = SearchIcon,
  color = "white",
  IconColor = "white",
  showIcon = true,
  backgroundColor = "black",
  type = "text",
  onIconClick,
  onChange, // 👈 add this
  value, // 👈 add this
}) {
  return (
    <FormControl sx={{ mt: 2, width }}>
      <OutlinedInput
        type={type}
        placeholder={placeholder}
        value={value} // 👈 pass controlled value
        onChange={onChange} // 👈 pass change handler
        sx={{
          borderRadius: "42px",
          color: color,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: color },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: color },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: color,
          },
          "& input": { color: color },
        }}
        endAdornment={
          showIcon && Icon ? (
            <InputAdornment
              position="end"
              sx={{
                backgroundColor: backgroundColor,
                padding: "0px",
                borderRadius: "24px",
                cursor: "pointer",
              }}
            >
              {onIconClick ? (
                <IconButton onClick={onIconClick}>
                  <Icon sx={{ color: IconColor }} />
                </IconButton>
              ) : (
                <Icon sx={{ color: IconColor }} />
              )}
            </InputAdornment>
          ) : null
        }
      />
    </FormControl>
  );
}

export default Bar;
