import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

export default class RoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
    };

    this.roomCode = this.props.match.params.roomCode;

    this._getRoomInfo();

    this._leaveRoom = this._leaveRoom.bind(this);
    this._updateShowSettings = this._updateShowSettings.bind(this);
    this._updateRoom = this._updateRoom.bind(this);
  }

  _getRoomInfo() {
    fetch(`/api/get-room?code=${this.roomCode}`)
      .then((response) => {
        if (!response.ok) {
          this.props.clearRoomCode();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  _leaveRoom() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then(() => {
      this.props.clearRoomCode();
      this.props.history.push("/");
    });
  }

  _updateShowSettings(bool) {
    this.setState({ showSettings: bool });
  }

  _updateRoom() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: {
        code: this.roomCode,
      },
    };
    fetch("/api/update-room", requestOptions)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this._updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h5" component="h5">
            Votes: {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h5" component="h5">
            Is Host: {this.state.isHost.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h5" component="h5">
            Can Pause: {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={this._leaveRoom}>
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}
