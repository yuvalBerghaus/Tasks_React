import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SORT, TASK_OBJ } from "../constants";
export default function BasicSelect(props) {
  const { ASCENDING, DESCENDING } = SORT;
  const { ID, CREATED_AT, CHECKED } = TASK_OBJ;
  const [sort, setSort] = React.useState(ASCENDING + "_" + CREATED_AT);
  const handleChange = (event) => {
    setSort(event.target.value);
    props.OnSortChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={`${ASCENDING}_${CREATED_AT}`}>
            {CREATED_AT} : {ASCENDING}
          </MenuItem>
          <MenuItem value={`${DESCENDING}_${CREATED_AT}`}>
            {CREATED_AT} : {DESCENDING}
          </MenuItem>
          <MenuItem value={`${ASCENDING}_${ID}`}>
            {ID} : {ASCENDING}
          </MenuItem>
          <MenuItem value={`${DESCENDING}_${ID}`}>
            {ID} : {DESCENDING}
          </MenuItem>
          <MenuItem value={`${DESCENDING}_${CHECKED}`}>
            {CHECKED} : {DESCENDING}
          </MenuItem>
          <MenuItem value={`${ASCENDING}_${CHECKED}`}>
            {CHECKED} : {ASCENDING}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
