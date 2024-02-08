import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SORT, TASK_OBJ } from "../constants";
export default function BasicSelect(props) {
  const [sort, setSort] = React.useState(
    SORT.ASCENDING + "_" + TASK_OBJ.CREATED_AT
  );
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
          <MenuItem value={`${SORT.ASCENDING}_${TASK_OBJ.CREATED_AT}`}>
            {TASK_OBJ.CREATED_AT} : {SORT.ASCENDING}
          </MenuItem>
          <MenuItem value={`${SORT.DESCENDING}_${TASK_OBJ.CREATED_AT}`}>
            {TASK_OBJ.CREATED_AT} : {SORT.DESCENDING}
          </MenuItem>
          <MenuItem value={`${SORT.ASCENDING}_${TASK_OBJ.ID}`}>
            {TASK_OBJ.ID} : {SORT.ASCENDING}
          </MenuItem>
          <MenuItem value={`${SORT.DESCENDING}_${TASK_OBJ.ID}`}>
            {TASK_OBJ.ID} : {SORT.DESCENDING}
          </MenuItem>
          <MenuItem value={`${SORT.DESCENDING}_${TASK_OBJ.CHECKED}`}>
            {TASK_OBJ.CHECKED} : {SORT.DESCENDING}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
