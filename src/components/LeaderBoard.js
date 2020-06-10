import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { getArrayFromDictionary, sortByAnswersCount } from '../util/util';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 280,

  },
});

export function LeaderBoard(props) {
  const classes = useStyles();
  const { login, users } = props;
  const usersArray = (users && users.users) && (sortByAnswersCount(getArrayFromDictionary(users.users)));

  return (
    <div>
      {login.isAuthenticated && (
        <div className="leaderboard-cards">
          {usersArray.map(user => {
            const unansweredQuestionsTotal = Object.keys(user.answers).length;

            return (
              <Card key={user.id} className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={user.avatarURL}
                    title="Cuser avatar"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {unansweredQuestionsTotal} Questions answered
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {user.questions.length} Questions asked
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })
          }
        </div>
      )}
      {!login.isAuthenticated && (
        <h3>You need to select a user to view this page.</h3>
      )}
    </div>
  )
}


function mapStateToProps({ login, users }) {
  return {
    login,
    users,
  }
}

export default connect(mapStateToProps)(LeaderBoard);
