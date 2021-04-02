import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

export default class RoomCreatePage extends Component {
  defaultVotes = 2;
  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };

    this._handleVotesChange = this._handleVotesChange.bind(this);
    this._handleGuestCanPauseChange = this._handleGuestCanPauseChange.bind(
      this
    );
    this._handleRoomButtonClicked = this._handleRoomButtonClicked.bind(this);
  }

  _handleVotesChange(e) {
    this.setState({
      votesToSkip: parseInt(e.target.value, 10),
    });
  }

  _handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value == "true" ? true : false,
    });
  }

  _handleRoomButtonClicked() {
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/room/" + data.code));
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={this._handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={this.defaultVotes}
              inputProps={{
                min: 1,
                style: {
                  textAlign: "center",
                },
              }}
              onChange={this._handleVotesChange}
            />
            <FormHelperText>
              <div align="center">Votes required to Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this._handleRoomButtonClicked}
          >
            Create a Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="default" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
