import React from 'react';
//mui stuff
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//popup css
import '../popup.css';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

export default function CustomizedTables(props) {
  const classes = useStyles();
  const rows = props.items;
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            
            <StyledTableCell align="right">ID</StyledTableCell>
            <StyledTableCell align="right">Name&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">USN&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">category&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Sub-Category&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">message&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.idgi}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.usn}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.subcategory}</StyledTableCell>
              <StyledTableCell align="right">{ <div className="popup" onClick={myFunction}>{row.message}
          <span className="popuptext" id="myPopup">{row.message}</span>
</div> }</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
