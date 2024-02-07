import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SORT } from "../constants";
export default function BasicSelect() {
  const [sort, setSort] = React.useState(SORT.ASCENDING);

  const handleChange = (event) => {
    setSort(event.target.value);
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
          <MenuItem value={SORT.ASCENDING}>Date : {SORT.ASCENDING}</MenuItem>
          <MenuItem value={SORT.DESCENDING}>Date : {SORT.DESCENDING}</MenuItem>
          <MenuItem value={SORT.ASCENDING}>ID : {SORT.ASCENDING}</MenuItem>
          <MenuItem value={SORT.DESCENDING}>ID : {SORT.DESCENDING}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
