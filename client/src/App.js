import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
//import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';




const styles = theme => ( {
  root: {
    width: '100%',
    marginTop: theme.spacing.units * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit *2
  }
})

// const customers = [
//   {
//     'id' : 1,
//     'image' : 'https://placeimg.com/64/64/1',
//     'name' : '홍길동',
//     'birthday' : '961222',
//     'gender' : '남자',
//     'job' : '대학생'
//   },
//   {
//     'id' : 2,
//     'image' : 'https://placeimg.com/64/64/2',
//     'name' : '이순신',
//     'birthday' : '991222',
//     'gender' : '남자',
//     'job' : '대학생'
//   },
//   {
//     'id' : 3,
//     'image' : 'https://placeimg.com/64/64/3',
//     'name' : '강감찬',
//     'birthday' : '941222',
//     'gender' : '여자',
//     'job' : '대학생'
//   }
// ]
/****/
class App extends Component {

  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers2');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 }); 
  }


  render() {
    const { classes } = this.props;
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableHead>
            <TableBody>
              {
                this.state.customers? this.state.customers.map( 
                  c => { 
                          return( <Customer key = {c.id} id = {c.id} image = {c.image} name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); 
                      }
                )
                : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>      
      );
  }
}
/****/
/**
function App() {
    return (
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableHead>
          <TableBody>
            {
              customers.map( 
                c => { 
                        return( <Customer key = {c.id} id = {c.id} image = {c.image} name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); 
                    }
              )
            }
          </TableBody>
        </Table>
      </Paper>      
    );
}
/**/
export default withStyles(styles)(App);
