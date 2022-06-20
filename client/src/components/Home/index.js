import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Mui from '@material-ui/core';

const serverURL = "http://ov-research-4.uwaterloo.ca:3010"; //enable for deployed mode; Change PORT to the port number given to you;


const fetch = require("node-fetch");


const movies = [
  "cars 2",
  "cars 3",
  "skrt skrt",
  "mmmm armpit",
  "epic movie wow !"
]

export default function Home() {
  const [reviews, setReviews] = useState([])

  function addReview(review){
    setReviews([review, ...reviews]);
  }

  return (
    <Mui.Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >

      <Mui.Typography
        variant="h3"
      >
        Eric's Ebic Movie Reviews
      </Mui.Typography>

      <Review
        addReview={addReview}
      >
      </Review>

      {
        reviews.length !== 0
        &&
        <ReviewDisplayContainer reviews={reviews}>
        </ReviewDisplayContainer>
      }
  
    </Mui.Grid>
  )
}


Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const Review = ({addReview}) => {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [movieRating, setMovieRating] = useState(0);

  const [validTitle, setValidTitle] = useState(false);
  const [validBody, setValidBody] = useState(false);
  const [validRating, setValidRating] = useState(false);

  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [checkedFormValidity, setCheckedFormValidity] = useState(false);

  function handleSelectMovieChange(event){
    setSelectedMovie(event.target.value);
    setDisplaySuccess(false)
    if (checkedFormValidity){
      setCheckedFormValidity(false)
    }
  }

  function handleReviewTitleChange(event){
    setReviewTitle(event.target.value);
    setDisplaySuccess(false)
    if (checkedFormValidity){
      setCheckedFormValidity(false)
    }
  }

  function handleReviewBodyChange(event){
    setReviewBody(event.target.value);
    setDisplaySuccess(false)
    if (checkedFormValidity){
      setCheckedFormValidity(false)
    }
  }

  function handleRatingChange(event){
    setMovieRating(parseInt(event.target.value)); 
    setDisplaySuccess(false)
    if (checkedFormValidity){
      setCheckedFormValidity(false)
    }
  }

  function handleSubmit(){
    let valid = true

    if (reviewTitle.trim().length){
      setValidTitle(true)
    }
    else{
      setValidTitle(false)
      valid = false
    }

    if (reviewBody.trim().length){
      setValidBody(true)
    }
    else{
      setValidBody(false)
      valid = false
    }

    if (ratings.indexOf(movieRating) !== -1){
      setValidRating(true)
    }
    else{
      setValidRating(false)
      valid = false
    }

    if (valid){
      const review = {
        movie: selectedMovie,
        title: reviewTitle,
        body: reviewBody,
        rating: movieRating
      }
      addReview(review)

      setDisplaySuccess(true)

      // reset
      setMovieRating(0)
      setReviewBody("")
      setReviewTitle("")
      setValidRating(false)
      setValidBody(false)
      setValidTitle(false)

    }
    else {
      setCheckedFormValidity(true)
    }
    
  }

  return (
    <Mui.Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="left"
      style={{
        margin: "1rem",
        boxSizing: "border-box",
        maxWidth: "90vw",
        gap: 20
      }}
    >
      <MovieSelection 
        item
        selectedMovie={selectedMovie}
        handleChange={handleSelectMovieChange}
      >
      </MovieSelection>

      <ReviewTitle
        item
        reviewTitle={reviewTitle}
        handleChange={handleReviewTitleChange}
        invalid={checkedFormValidity && !validTitle}
      >
      </ReviewTitle>
      
      <ReviewBody
        reviewBody={reviewBody}
        handleChange={handleReviewBodyChange}
        invalid={checkedFormValidity && !validBody}
      >
      </ReviewBody>

      <ReviewRating
        movieRating={movieRating}
        handleChange={handleRatingChange}
        invalid={checkedFormValidity && !validRating}
      >

      </ReviewRating>

      <Mui.Button
        onClick={handleSubmit}
        variant="contained"
        fullWidth={false}
      >
        Submit Review
      </Mui.Button>
      {
        displaySuccess 
        &&
        <Mui.Typography
          variant="p"
          align="center"
        >
          Your review has been received
        </Mui.Typography>
      }
    </Mui.Grid>
  ) 
}

const MovieSelection = ({selectedMovie, handleChange}) => {

  return (
    <Mui.Grid
      container
      direction="column"
    >
      <Mui.FormLabel>Movie</Mui.FormLabel>
      <Mui.Select 
        labelId="label" 
        id="selectMovie" 
        value={selectedMovie} 
        onChange={handleChange}
      >
        {
          movies.map((movie) => {
            return <Mui.MenuItem value={movie}>{movie}</Mui.MenuItem>
          })
        }
      </Mui.Select>
    </Mui.Grid>
  )
}

const ReviewTitle = ({reviewTitle, handleChange, invalid}) => (
  <Mui.Grid
      container
      direction="column"
  >
    <Mui.FormLabel>Review Title</Mui.FormLabel>
    <Mui.TextField 
        required
        id="movieReviewTitle"
        value={reviewTitle}
        onChange={handleChange}
        error={invalid}
        helperText={invalid && "Please enter your review title"}
      >

    </Mui.TextField>
  </Mui.Grid>
)

const ReviewBody = ({reviewBody, handleChange, invalid}) => {
  return (
    <Mui.Grid
      container
      direction="column"
    >
      <Mui.FormLabel>Review Body</Mui.FormLabel>
      <Mui.TextField
        multiline
        id="movieReviewBody"
        value={reviewBody}
        onChange={handleChange}
        minRows={3}
        error={invalid}
        helperText={invalid && "Please enter your review"}
        inputProps={{ maxLength: 200 }}
      >

      </Mui.TextField>
    </Mui.Grid>
  )
}

const ReviewRating = ({movieRating, handleChange, invalid}) => {
  return (
    
    <Mui.Grid
      container
      direction="column"
    >
    
      <Mui.FormLabel>Rating</Mui.FormLabel>
      <Mui.Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Mui.FormControl
          error={invalid}
        >
          <Mui.RadioGroup
            row
            onChange={handleChange}
            value={movieRating}
          >
            {
              ratings.map((rating) => {
                return (
                  <Mui.FormControlLabel 
                    value={rating} 
                    control={<Mui.Radio />} 
                    label={rating}
                    labelPlacement="top"
                  />
                )
              })
            }
          </Mui.RadioGroup>
          <Mui.FormHelperText>{invalid && "Please select the rating"}</Mui.FormHelperText>
        </Mui.FormControl>
      </Mui.Grid>
    </Mui.Grid>
    
  )
}

const ReviewDisplayContainer = ({reviews}) => {
  return (
    <Mui.Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="left"
      style={{
        margin: "1rem",
        boxSizing: "border-box",
        maxWidth: "40vw",
        gap: 20,
        padding: "0.5rem",
        border: "2px solid black" 
      }}
    >
      {
        reviews.map((review) => {
          return (
            <ReviewDisplay review={review}>
            </ReviewDisplay>
          )
        })
      }
    </Mui.Grid>
  )
}

const ReviewDisplay = ({review}) => {
  return (
    <div style={{display: 'flex'}}>
      <div style={{display: 'flex', flexDirection: 'column', marginRight: '0.5rem'}}>
        <b>Movie:</b>
        <b>Title: </b>
        <b>Body: </b>
        <b>Rating: </b>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <b>{review.movie}</b>
        <b>{review.title}</b>
        <b>{review.body}</b>
        <b>{review.rating}.0/5.0</b>
      </div>

    </div>
  )
}
const ratings = [1, 2, 3, 4, 5]
