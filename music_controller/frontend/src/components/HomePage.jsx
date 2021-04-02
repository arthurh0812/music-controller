import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { Button, Grid, Typography, ButtonGroup } from "@material-ui/core";

import RoomPage from "./RoomPage.jsx";
import RoomJoinPage from "./RoomJoinPage.jsx";
import RoomCreatePage from "./RoomCreatePage.jsx";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
    };

    this._clearRoomCode = this._clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            Houseparty
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="primary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  _clearRoomCode() {
    this.setState({
      roomCode: "",
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return this.state.roomCode ? (
                <Redirect to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              );
            }}
          ></Route>
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={RoomCreatePage} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return (
                <RoomPage {...props} clearRoomCode={this._clearRoomCode} />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}
